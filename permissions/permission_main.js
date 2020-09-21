const Constants = require('../constants');

var permissions = {
    torrents:[],
    grant_permissions:[],
    admin:[]
};

var permissions_requests = [];

permissions.torrents.push(Constants.ROOT_USER);
permissions.torrents.push(Constants.CATHAL_USER);
permissions.grant_permissions.push(Constants.ROOT_USER);
permissions.admin.push(Constants.ROOT_USER);


var permission_main = function(data){

    //console.log("input array = ",data.input_array);

    let temp = data.input_array.shift();
    switch (temp) {
        case "-l": //list permissions
            if(permissions_requests.length === 0){
                data.bot.sendMessage(data.current_chat, "No permission requests available", {parse_mode : "HTML"});
                return 1;
            }
            var outString="<b>Permissions requests</b><pre>\n";
            permissions_requests.forEach( perm =>{
                outString = outString +"   "+perm.perm_type+" || "+ perm.user_name+" || "+ perm.user_id+"\n";
            });
            outString = outString +"</pre>";
            data.bot.sendMessage(data.current_chat, outString, {parse_mode : "HTML"});
            return 1;
        case "-lg": //list granted permissions
            var outString="<b>Permissions granted</b><pre>\n";
            permissions.torrents.forEach( perm =>{
                outString = outString +"-t   "+perm+"\n";
            });
            permissions.grant_permissions.forEach( perm =>{
                outString = outString +"-p   "+perm+"\n";
            });
            permissions.admin.forEach( perm =>{
                outString = outString +"-a   "+perm+"\n";
            });
            outString = outString +"</pre>";
            data.bot.sendMessage(data.current_chat, outString, {parse_mode : "HTML"});
            return 1;   
        case "-g": //give permisions
            //console.log("give permission");
            perm_type_give = data.input_array.shift();
            user_id_give = data.input_array.shift();
            console.log(perm_type_give+"|"+user_id_give);
            let perm_ok_give = false;
            switch (perm_type_give) {
                case "-t":
                    if(! permissions.torrents.includes(user_id_give)){
                        permissions.torrents.push(parseInt(user_id_give));
                        console.log("perm t ok");
                    }
                    perm_ok_give = true;
                    break;
                case "-p":
                    if(! permissions.grant_permissions.includes(user_id_give)){
                        permissions.grant_permissions.push(parseInt(user_id_give));
                    }
                    perm_ok_give = true;
                    break;
                case "-a":
                    if(! permissions.admin.includes(user_id_give)){
                        permissions.admin.push(parseInt(user_id_give));
                    }
                    perm_ok_give = true;
                    break;    
                default:
                    perm_ok_give = false;
            }

            if(perm_ok_give){
                for (var i =0; i < permissions_requests.length; i++)
                    if (permissions_requests[i].user_id === parseInt(user_id_give)) {
                        permissions_requests.splice(i,1);
                        break;
                    }
                //permissions_requests = permissions_requests.filter(function(user) { return user.user_id !== user_id_give; });

                data.bot.sendMessage(data.current_chat, "<b>\nPermission request granted</b>", {parse_mode: "HTML"});

            }else{
                data.bot.sendMessage(data.current_chat, "<b>\nCannot grand an invalid permission request</b>", {parse_mode: "HTML"});
            }

            break;
        case "-r": //remove permissions
            console.log("remove permission");
            break;
        case "-h": //help
            data.bot.sendMessage(data.current_chat, Constants.HELP_PAGE_PERMISSIONS, {parse_mode: "HTML"});
            break;
        default:
            console.log("default permissions statement do nothing");
    }

};

var request_permission = function(user_name, user_id, bot, current_chat, perm_type){
    let perm_ok = false;
    switch (perm_type) {
        case "-t":
            perm_ok = true;
            break;
        case "-p":
            perm_ok = true;
            break;
        case "-a":
            perm_ok = true;
            break;    
        default:
            perm_ok = false;
    }

    if(perm_ok){
        if(permissions_requests.some(user => user.user_id === user_id && user.perm_type === perm_type)){
            bot.sendMessage(current_chat, "<i>" + user_name + "</i>" + "<b>\nYou Have already submitted a permissions request wait for approval</b>", {parse_mode: "HTML"});
        }else{
            permissions_requests.push({user_id: user_id, user_name: user_name, perm_type:perm_type});
            bot.sendMessage(current_chat, "<i>" + user_name + "</i>" + "<b>\nRequest submitted wait for approval</b>", {parse_mode: "HTML"});

        }
    }else{
        bot.sendMessage(current_chat, "<i>" + user_name + "</i>" + "<b>\nYou Have submitted an invalid permissions request see bellow for valid</b><pre>\n-t : for torrents\n-p : to grant permissions\n-a : for admin</pre>", {parse_mode: "HTML"});
    }

};

var check_permissions = function(user_id, perm_type, current_chat, user_name, bot){
    //console.log("checking user "+user_id+"users in torrents= "+ permissions.torrents);
    let granted = false;
    switch (perm_type) {
        case "-t":
            if(permissions.torrents.includes(user_id)){
                granted = true;
            }
            break;
        case "-p":
            if(permissions.grant_permissions.includes(user_id)){
                granted = true;
            }
            break;
        case "-a":
            if(permissions.admin.includes(user_id)){
                granted = true;
            }
            break;    
        case "-h":
            granted = true;
            break;
        case "-p_ask":
            granted = true;
            break;
        case "pinned":
            granted = true;
            break;
        case "whois":
            if(permissions.grant_permissions.includes(user_id)){
                granted = true;
            }
            break;    
        default:
            granted = false;
    }

    if (!granted){
        bot.sendMessage(current_chat, "<i>" + user_name + "</i>" + "<b>\nYou Do not have Permissions for this action ask @Terminal_Heat_Sink nicely and he might give it to you </b>", {parse_mode: "HTML"});
        return false;
    }else{
        return true;
    }


};

var whois = function(bot, current_chat, user_id){

    bot.getChatMember(current_chat,user_id).then(user =>{
        bot.sendMessage(current_chat, "<pre>"+
            "\nid:         " + user.user.id +
            "\nis_bot:     " + user.user.is_bot +
            "\nfirst_name: " + user.user.first_name +
            "\nusername:   " + user.user.username +
            "\nstatus:     " + user.status +
            "</pre>", {parse_mode: "HTML"});
    }).catch(err =>{
        bot.sendMessage(current_chat, "<i>Couldn't find user "+user_id+"</i>", {parse_mode: "HTML"});
    });
};

module.exports = {
    permission_main: permission_main,
    request_permission: request_permission,
    check_permissions: check_permissions,
    whois: whois
};

