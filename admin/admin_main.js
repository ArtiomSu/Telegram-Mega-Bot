const Notes = require('../notes');

var ban = (bot,chat,intended_for_user_id,callbackQuery) =>{
    const action = callbackQuery.data;
    let user_id = parseInt(callbackQuery.from.id);
    let user_name = callbackQuery.from.username;
    let banned_user_name = "unknown";
    let banned_text = "none";
    if(callbackQuery.message && callbackQuery.message.reply_to_message && callbackQuery.message.reply_to_message.from){
        banned_user_name = callbackQuery.message.reply_to_message.from.username;
        banned_text = callbackQuery.message.reply_to_message.text;
    }


    bot.banChatMember(chat,intended_for_user_id, {revoke_messages:true}).then(status =>{
        if(status){
            let output = "<pre>" + "Banned \n" +
                "data="+action+" \n" +
                "user_id="+intended_for_user_id+"\n" +
                "user_name="+banned_user_name+"\n" +
                "text banned for="+banned_text+"\n\n"+

                "ban by: "+ user_id + "\n"+
                user_name +
                "</pre>";
            var options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'unban', callback_data:""+intended_for_user_id+" unban"+" "+chat}]
                    ]
                }),
                parse_mode: "HTML",
                disable_web_page_preview:true
            };
            bot.sendMessage(callbackQuery.message.chat.id, output, options);

        }else{
            data.bot.sendMessage(callbackQuery.message.chat.id,"Couldn't ban this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
        }
    });
};

var unban = (bot,chat,user_id,send_to_chat_id) =>{
    bot.unbanChatMember(chat,user_id).then(status =>{
        if(status){
            var options = {
                parse_mode: "HTML",
                disable_web_page_preview:true
            };
            bot.sendMessage(send_to_chat_id,
                "<pre>" + "UnBanned " + user_id +
                "</pre>",
                options);
        }else{
            data.bot.sendMessage(send_to_chat_id,"Couldn't unban this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
        }
    });
};

var admin_main = function(data){

    //console.log("input array = ",data.input_array);

    let temp = data.input_array.shift();
    let user_id_ok = false;
    if(! data.user_id){
        data.user_id = parseInt(data.input_array.shift());
    }

    if(Number(data.user_id)){
            user_id_ok = true;
    }

    //console.log("input array = ",temp, " ", user_id_ok, " ", data.user_id);
    switch (temp) {
        case "ban": 
            if(user_id_ok){
                data.bot.banChatMember(data.current_chat,data.user_id, {revoke_messages:true}).then(status =>{
                    if(status){
                        data.bot.sendMessage(data.current_chat,"Banned successfully",{parse_mode: "HTML", disable_web_page_preview:true});
                    }else{
                        data.bot.sendMessage(data.current_chat,"Couldn't ban this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
                    }
                });    
            }
            break;
        case "unban": 
            if(user_id_ok){
                data.bot.unbanChatMember(data.current_chat,data.user_id).then(status =>{
                    if(status){
                        data.bot.sendMessage(data.current_chat,"unBanned successfully",{parse_mode: "HTML", disable_web_page_preview:true});
                    }else{
                        data.bot.sendMessage(data.current_chat,"Couldn't unban this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
                    }
                });    
            }
            break;    
        case "promote": 
            if(user_id_ok){
                data.bot.promoteChatMember(data.current_chat,data.user_id,{can_promote_members:true,can_delete_messages:true,can_restrict_members:true,can_invite_users:true}).then(status =>{
                    if(status){
                        data.bot.sendMessage(data.current_chat,"promoted successfully",{parse_mode: "HTML", disable_web_page_preview:true});
                    }else{
                        data.bot.sendMessage(data.current_chat,"Couldn't promote this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
                    }
                }); 
            }
            break;   
        case "gen_link": 
            data.bot.exportChatInviteLink(data.current_chat).then(link =>{
                data.bot.sendMessage(data.current_chat,link,{parse_mode: "HTML", disable_web_page_preview:true});
            });
            return 1;  
        case "unrestrict": 
            if(user_id_ok){
                data.bot.restrictChatMember(data.current_chat,data.user_id,{can_send_messages:true,can_send_media_messages:true,can_send_polls:false,can_send_other_messages:true,can_add_web_page_previews:true,can_change_info:false,can_invite_users:false,can_pin_messages:false}).then(status =>{
                    if(status){
                        data.bot.sendMessage(data.current_chat,"unrestricted successfully",{parse_mode: "HTML", disable_web_page_preview:true});
                    }else{
                        data.bot.sendMessage(data.current_chat,"Couldn't unrestrict this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
                    }
                });
            }
            break;       
        case "restrict": 
            if(user_id_ok){
                data.bot.restrictChatMember(data.current_chat,data.user_id,{permissions:{can_send_messages:false,can_send_media_messages:false,can_send_polls:false,can_send_other_messages:false,can_add_web_page_previews:false,can_change_info:false,can_invite_users:false,can_pin_messages:false}}).then(status =>{
                    if(status){
                        data.bot.sendMessage(data.current_chat,"restricted successfully",{parse_mode: "HTML", disable_web_page_preview:true});
                    }else{
                        data.bot.sendMessage(data.current_chat,"Couldn't restrict this is sad",{parse_mode: "HTML", disable_web_page_preview:true});
                    }
                });            
            }
            break;
        case "-h":
            
            data.bot.sendMessage(data.current_chat, Notes.HELP_PAGE_ADMIN, {parse_mode: "HTML"});
            break;
        default:
            console.log("default admin statement do nothing");
    }

};

module.exports = {
    admin_main: admin_main,
    ban: ban,
    unban: unban
};
