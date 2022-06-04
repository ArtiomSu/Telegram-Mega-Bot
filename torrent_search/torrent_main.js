const request = require('request');
const Constants = require('../constants');
const Notes = require('../notes');

let messages_to_delete = [];

handleDeleteMessagesInQueue = (bot) => {
    messages_to_delete.forEach((message, index, object) => {
        bot.deleteMessage(message.chat, message.id).then(success =>{
            object.splice(index,1);
        }).catch(err => {
        })
    })
}

handleMagnet = (data, d_amount, torrent_url = false) => {

    if(data.users[data.user_id]){
        //existing user user
        if(data.users[data.user_id].running_search){
            data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am already searching something for you, why dont you relax and play with your boi? </b>", {parse_mode: "HTML"});
            return 1;
        }
    }else{
        data.users[data.user_id] = {
            user_name: data.user_name,
            running_search: false,
            old_search_exists: false,
            old_search_term: "",
            results: {}
        };
    }


    if(data.users[data.user_id].results[d_amount-1] != undefined || torrent_url != NaN){
        data.users[data.user_id].running_search = true;
        if(torrent_url && data.urls.length < torrent_url){
            data.bot.sendMessage(data.current_chat, "<b>Url cache is reset. You will need to search again</b>", {parse_mode: "HTML"});
            data.users[data.user_id].running_search = false;
            return 1;
        }
        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am Retrieving your magnet link, chill for a while...</b>", {parse_mode: "HTML"}).then(message =>{
            messages_to_delete.push({id: message.message_id, chat: message.chat.id});
        });
        const url_to_use = torrent_url ? data.urls[torrent_url-1] : data.users[data.user_id].results[d_amount-2].url;
        request({
            url: Constants.MAGNET_URL,
            method: "POST",
            json: true,
            body: {url: url_to_use}
        }, function (error, response, body){
            //console.log(response);
            if(error || body.error){
                //unable to get content
                console.log(error);
                data.users[data.user_id].running_search = false;
                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I had trouble getting your magnet link because </b>\n<pre>"+body.error+"</pre>", {parse_mode: "HTML"});
                return 1;
            }else{
                if (body.data.length === 0){
                    data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I couldn't find a magnet link for some reason </b>", {parse_mode: "HTML"});
                } else {
                    data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I retrieved your magnet link from <a href=\""+url_to_use+"\">here</a> successfully!!! </b><pre>\n"+body.data+"</pre>", 
                        {parse_mode: "HTML", 
                        reply_markup: JSON.stringify({
                                            inline_keyboard: [[{text:'delete this', callback_data:"deleteTMsg"+" "+data.user_id}]]
                                    }),
                        }).then(message => {
                            handleDeleteMessagesInQueue(data.bot);
                    })
                }
                data.users[data.user_id].running_search = false;
                return 1;
            }
        });
    }else{
        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " that id does not exist you donkey choose 1 - "+(data.users[data.user_id].results.length+1) +"</b>", {parse_mode: "HTML"});
        return 1;
    }
}


tmain = (data) => {

    if(data.users[data.user_id]){
        //existing user user
        if(data.users[data.user_id].running_search){
            data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am already searching something for you, why dont you relax and play with your boi? </b>", {parse_mode: "HTML"}).then(message =>{
            messages_to_delete.push({id: message.message_id, chat: message.chat.id});
        });
            return 1;
        }

    }else{
        data.users[data.user_id] = {
            user_name: data.user_name,
            running_search: false,
            old_search_exists: false,
            old_search_term: "",
            results: {}
        };
    }

        //console.log("input array = ",data.input_array);
        var sort_amount = null;
        var limit_amount = null;
        var output_mode = 'n';
        var d_amount = null;
        var need_help = false;
        var snext = false;
        var lnext = false;
        var dnext = false;
        var onext = false;
        var search_term = "";
        var ok_to_grab = true;

        while(data.input_array.length !==0 ){
            let temp = data.input_array.shift();
            //console.log(data.input_array);
            let ok_to_grab = true;
            if(temp === "-l"){
                limit_amount = -1;
                lnext = true;
                ok_to_grab = false;
            } else if(temp === "-s"){
                sort_amount = -1;
                snext = true;
                ok_to_grab = false;
            } else if(temp === "-d"){
                d_amount = -1;
                dnext = true;
                ok_to_grab = false;
            } else if(temp === "-o"){
                output_mode = 'n';
                onext = true;
                ok_to_grab = false;
            } else if(snext && !isNaN(temp)){
                snext = false;
                sort_amount = Number(temp);
                ok_to_grab = false;
            }else if(lnext && !isNaN(temp)){
                lnext = false;
                limit_amount = Number(temp);
                ok_to_grab = false;
            }else if(dnext && !isNaN(temp)){
                dnext = false;
                d_amount = Number(temp);
                ok_to_grab = false;
            }else if(onext && temp === 'o' || temp === 'n'){
                onext = false;
                output_mode = temp;
                ok_to_grab = false;
            }else if(temp === "-h"){
                need_help = true;
                break;
            }
            if(ok_to_grab){
                search_term = search_term + " " + temp;
            }

        }

        if(need_help){
            data.bot.sendMessage(data.current_chat, Notes.HELP_PAGE_TORRENT, {parse_mode : "HTML"});
            return 1;
        } else{

            var invalid_input = false;
            // remove first space from search
            search_term = search_term.substr(1);

            if(limit_amount === null && sort_amount === null && d_amount == null){
                invalid_input = false;
            }

            if(limit_amount === null && sort_amount === null && d_amount == null && search_term.length === 0){
                invalid_input = true;
            }

            if(limit_amount === null && sort_amount === null && d_amount && search_term.length === 0){
                invalid_input = false;
            }


            if (invalid_input || (d_amount == null && search_term.length <= 2)) {
                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Notes.HELP_PAGE_TORRENT, {parse_mode: "HTML"});
                return 1;

            }else {
                //call the api.
                if(d_amount === 0 || d_amount){
                    //console.log(d_amount);
                    if(!data.users[data.user_id].old_search_exists){
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + ", search first then you can query, you donkey</b>", {parse_mode: "HTML"}).then(message =>{
                            messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                        });
                        return 1;
                    }else {
                        handleMagnet(data, d_amount);
                    }


                }else{

                    if(sort_amount === null){
                        sort_amount = 1; // default
                    } else if(isNaN(sort_amount) || Number(sort_amount) <= 0 || Number(sort_amount) >=9 ){
                        sort_amount = 1;
                        //console.log("sort amount was too high");
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Notes.HELP_PAGE_TORRENT, {parse_mode: "HTML"}).then(message =>{
                            messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                        });
                        return 1;
                    }

                    if(limit_amount == null){
                        limit_amount = 6;
                    }else if(isNaN(limit_amount) || Number(limit_amount) <= 0 || Number(limit_amount) >=300){
                        limit_amount = 6;
                        //console.log("limit_amount was too high");
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Notes.HELP_PAGE_TORRENT, {parse_mode: "HTML"}).then(message =>{
                            messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                        });
                        return 1;
                    }


                    data.users[data.user_id].running_search = true;
                    data.users[data.user_id].old_search_term = search_term;
                    var myJSONObject = {query:search_term,sort:sort_amount};
                    data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am searching for </b><i>"+data.users[data.user_id].old_search_term+"</i><b>, as per your request. this might take a while so chill and take the pill...</b>", {parse_mode: "HTML"}).then(message =>{
                        messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                    });
                    request({
                        url: Constants.SEARCH_URL,
                        method: "POST",
                        json: true,
                        body: myJSONObject
                    }, function (error, response, body){
                        //console.log(response);
                        if(error || body.error){
                            //unable to get content
                            console.log(error);
                            data.users[data.user_id].running_search = false;
                            data.users[data.user_id].old_search_term = "";
                            if(error){
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not get your results because the API is down... CALL 911</b>", {parse_mode: "HTML"}).then(message =>{
                                messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                            });
                            }else{
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not get your results because:  "+body.error+"</b>", {parse_mode: "HTML"}).then(message =>{
                                    messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                                });
                            }

                            return 1;
                        }else{
                            //console.log(body.data);

                            if (body.data.length === 0){
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not find anything for </b><i>"+data.users[data.user_id].old_search_term+"</i><b> maybe try a more generic search?</b>", {parse_mode: "HTML"}).then(message =>{
                                    messages_to_delete.push({id: message.message_id, chat: message.chat.id});
                                });
                            } else {
                                if(output_mode === 'n'){
                                    let list_keyboard = [];


                                    body.data.forEach(function (torrent, index){
                                        if(index < limit_amount){ //  
                                            data.urls.push(torrent.url);
                                            const url = torrent.url;
                                            const name = torrent.name;
                                            const extra_info = "se: "+torrent.seeders+" | le: "+torrent.leechers+" | date: "+torrent.date+" | size: "+torrent.size; 
                                            list_keyboard.push([{
                                                text: name,
                                                callback_data: "magnet"+" "+data.urls.length
                                            }])
                                            list_keyboard.push([{
                                                text: ''+(index+1)+': '+extra_info,
                                                url: torrent.url,
                                            }])
                                            if(index !== limit_amount - 1){
                                                list_keyboard.push([{
                                                    text: '                         ',
                                                    callback_data: "magnet"+" "+"none"
                                                }])
                                            }else if(index === limit_amount -1){
                                                list_keyboard.push([
                                                    {text: 'delete this', callback_data:"deleteTMsg"+" "+data.user_id}
                                                ])
                                            }
                                        }
                                    });

                                    var options = {
                                        reply_markup: JSON.stringify({
                                            inline_keyboard: list_keyboard
                                        }),
                                        parse_mode: "HTML",
                                        disable_web_page_preview:true
                                    };

                                    data.bot.sendMessage(data.current_chat,
                                        "<b>" + data.user_name + " Here is what I found for </b><i>"+data.users[data.user_id].old_search_term+"</i>",
                                        options).then(message => {
                                            handleDeleteMessagesInQueue(data.bot);
                                        })
                                    

                                }else {
                                    var message_content = "";
                                    body.data.forEach(function (torrent, index){
                                        if(index < limit_amount){ //  
                                            message_content = message_content + "<b>" + (index+1) +"</b>: " + "<a href=\""+torrent.url+"\">"+torrent.name+"</a><pre>\nse: "+torrent.seeders+" | le: "+torrent.leechers+" | date: "+torrent.date+" | size: "+torrent.size+"\n\n_</pre>";
                                        }
                                    });
                                    //console.log(message_content);
                                    const pre_message = "<b>" + data.user_name + " Here is what I found for </b><i>"+data.users[data.user_id].old_search_term+"</i><pre>\n</pre>";
                                    data.bot.sendMessage(data.current_chat, pre_message+message_content, {parse_mode: "HTML",disable_web_page_preview:true}).then(message =>{
                                        handleDeleteMessagesInQueue(data.bot);
                                    });
                                }
                                data.users[data.user_id].results = body.data;
                                data.users[data.user_id].old_search_exists = true;
                            }
                            data.users[data.user_id].running_search = false;

                            return 1;
                        }

                    });

                }

            }

        }


};

module.exports = {
    tmain: tmain,
    handleMagnet: handleMagnet
};