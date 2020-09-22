const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const Terminal = require('./Terminal');
const Constants = require('./constants');
const torrent_main = require('./torrent_search/torrent_main');
const permission = require('./permissions/permission_main');
const admin_main = require('./admin/admin_main');

const bot = new TelegramBot(Constants.TOKEN, {polling: true});



var users = {};



var logger = function(msg){
    if(Constants.USE_LOGGER) {
        console.log(Terminal.COLOURS.BrownOrange + "Log @" + new Date() + " From " + Terminal.COLOURS.Cyan + msg.from.first_name + Terminal.COLOURS.BrownOrange + " || " + Terminal.COLOURS.Cyan + msg.from.username + Terminal.COLOURS.BrownOrange + " (" + msg.from.id + ")\n" + "\tChat: " + Terminal.COLOURS.LightPurple + msg.chat.title + Terminal.COLOURS.BrownOrange + " || " + msg.chat.type + " (" + msg.chat.id + ")\n" + "Query: " + Terminal.COLOURS.Green + msg.text.replace(Constants.BOT_NAME, '') + Terminal.COLOURS.NC + "\n----------------------------------------------------------");

        if (msg.chat.id !== Constants.LOGGING_CHANNEL) {
            //temp = new Date() + " From <i>" + msg.from.first_name + "</i> || <i>" + msg.from.username + "</i> (" + msg.from.id + ")<pre>\n" + "\tChat: </pre><b>" + msg.chat.title + "</b><pre> || " + msg.chat.type +" (" + msg.chat.id + ")" + "\nQuery: </pre><b>" + msg.text.replace(Constants.BOT_NAME,'') + "</b>"
            bot.sendMessage(Constants.LOGGING_CHANNEL, "<pre>" + new Date() + "</pre> <i>" + msg.from.first_name + "</i> || <i>" + msg.from.username + "</i> (" + msg.from.id + ")" + " ------> <b>" + msg.chat.title + "</b> || " + msg.chat.type + " (" + msg.chat.id + ")" + "<pre>\n" + msg.text.replace(Constants.BOT_NAME, '') + "</pre>", {parse_mode: "HTML"});
        }
    }
};

var help_main = function(current_chat){
    bot.sendMessage(current_chat, Constants.HELP_PAGE_MAIN, {parse_mode : "HTML"});
};

var deal_with_message = function(msg){
    if (msg.text.includes(Constants.BOT_NAME)) {

        if (msg.text.length <= 90){
            let user_id = msg.from.id;
            //check if text message is properly formatted
            let user_name = msg.from.first_name;
            let current_chat = msg.chat.id;

            logger(msg);


            var input_array = msg.text.replace(Constants.BOT_NAME,'').split(/(\s+)/).filter( e => e.trim().length > 0);
            temp = input_array.shift(); //gets which command to run
            //console.log("main menu option= ",temp);

            switch (temp) {
                case "-t":
                    if(permission.check_permissions(user_id,"-t", current_chat, user_name, bot)){
                        torrent_main.tmain({
                            user_id:user_id,
                            user_name:user_name,
                            current_chat:current_chat,
                            users:users,
                            input_array: input_array,
                            bot: bot
                        });
                    }
                    break;
                case "-p":
                    if(permission.check_permissions(user_id,"-p", current_chat, user_name, bot)) {
                        permission.permission_main({
                            user_id:user_id,
                            user_name:user_name,
                            current_chat:current_chat,
                            users:users,
                            input_array: input_array,
                            bot: bot
                        });
                    }
                    break;
                case "-a":
                    if(permission.check_permissions(user_id,"-a", current_chat, user_name, bot)) {
                        if(msg.reply_to_message){
                            user_id = msg.reply_to_message.from.id;
                        }else{
                            user_id = false;
                        }

                        admin_main.admin_main({
                            user_id:user_id,
                            user_name:user_name,
                            current_chat:current_chat,
                            users:users,
                            input_array: input_array,
                            bot: bot
                        });
                    }
                    break;    
                case "-p_ask":
                    if(permission.check_permissions(user_id,"-p_ask", current_chat, user_name, bot)) {
                        permission.request_permission(user_name,user_id,bot,current_chat, input_array.shift());
                    }
                    break;
                case "-h":
                    if(permission.check_permissions(user_id,"-h", current_chat, user_name, bot)) {
                        help_main(current_chat);
                    }
                    break;
                case "pinned":
                    if(permission.check_permissions(user_id,"pinned", current_chat, user_name, bot)) {
                        bot.forwardMessage(current_chat,Constants.YOUTUBE_CHANNEL,Constants.YOUTUBE_CHANNEL_PINNED_MSG_ID);
                    }
                    break;
                case "whois":
                    if(permission.check_permissions(user_id,"whois", current_chat, user_name, bot)) {
                        if(msg.reply_to_message){
                            permission.whois(bot, current_chat, msg.reply_to_message.from.id);
                        }else{
                            permission.whois(bot, current_chat, input_array.shift());                    
                        }
                    }
                    break;
                default:
                    console.log("default statement do nothing");
            }

            //console.log(users);

        }else{
            bot.sendMessage(current_chat, "<b>"+user_name+" that query is too long what are you trying to do you smelly teapot?</b>", {parse_mode : "HTML"});
        }


    }else{

        if(msg.text[0] === '/'){
            user_slash_functions(msg);
        }else{
            let ban_words = [ "hack", "hax", "whatsapp", "invest", "trading", "money" ];
            // let words = msg.text.toLowerCase().split(" ");
            let text = msg.text.toLowerCase();
            for(let i=0; i<ban_words.length; i++){
                if(text.includes(ban_words[i])){
                    var options = {
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{text: 'ban', callback_data:""+msg.from.id+" ban"}]
                            ]
                        }),
                        parse_mode: "HTML",
                        disable_web_page_preview:true,
                        reply_to_message_id: msg.message_id
                    };

                    bot.sendMessage(msg.chat.id,
                        "@Terminal_Heat_Sink"+
                        "<pre>\n" + "ban situation triggered \n" +

                        "user_id="+msg.from.id+"\n" +
                        "user_name="+msg.from.username+"\n" +
                        "ban text=: "+ msg.text +
                        "</pre>",
                        options);
                    break;
                }
            }


        }
        if(msg.text.includes("spagett")){

        }


    }
};


var user_slash_functions = (msg) =>{
    if(msg.reply_to_message && msg.text.toLowerCase().startsWith("/report")){
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'ban', callback_data:""+msg.reply_to_message.from.id+" ban"},{text: 'delete', callback_data:""+msg.reply_to_message.message_id+" deletem"},{text: 'delete report', callback_data:""+msg.message_id+" deletem"}],
                    [{text: 'delete this', callback_data:""+msg.reply_to_message.message_id+" delete"}]
                ]
            }),
            parse_mode: "HTML",
            disable_web_page_preview:true,
            reply_to_message_id: msg.reply_to_message.message_id
        };

        bot.sendMessage(msg.chat.id,
            //"<pre>\n______________________________\n</pre>"+
            "@Terminal_Heat_Sink Report submitted for<pre>" + " \n" +
            "user_id="+msg.reply_to_message.from.id+"\n" +
            "user_name="+msg.reply_to_message.from.username+"\n\n" +
            "report by="+ msg.from.id + "\n" +
            "user_name=="+ msg.from.username+ "\n"+
            "</pre>"+"Reason: "+ msg.text.toLowerCase().split("/report")[1],
            options);
    }else if(msg.text.toLowerCase().startsWith("/donate")){
        bot.sendMessage(msg.chat.id,Constants.DONATE,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/notes")){
        bot.sendMessage(msg.chat.id,Constants.NOTES,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/all")){
        //bot.sendMessage(msg.chat.id,Constants.NOTES,{parse_mode: "HTML", disable_web_page_preview:true,});
        bot.forwardMessage(msg.chat.id,Constants.YOUTUBE_CHANNEL,Constants.YOUTUBE_CHANNEL_PINNED_MSG_ID);
    }else if(msg.text.toLowerCase().startsWith("/rogphone2rgb")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_ROGPHONE2RGB,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/rogphone2")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_ROG_PHONE_2_GUIDES,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/raw")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_RAW,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/relock")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_RAW,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/apps")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_APPS,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/psvita")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_PSVITA,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/qmk")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_QMK,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/edxposed")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_Edxposed,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/lineage")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_LINEAGE,{parse_mode: "HTML", disable_web_page_preview:true,});
    }else if(msg.text.toLowerCase().startsWith("/flasher")){
        bot.sendMessage(msg.chat.id,Constants.NOTES_FLASHING_SCRIPT,{parse_mode: "HTML", disable_web_page_preview:true,});
    }

};

var deal_with_new_member = function(msg){
    chat_id = msg.chat.id;
    user_id = msg.new_chat_members[0].id;
    username = msg.new_chat_members[0].username || msg.new_chat_members[0].first_name;
    chat_title = msg.chat.title;
    //console.log(chat_id, " ", user_id, " ", username, " ", chat_title);
    //if(parseInt(chat_id) === Constants.YOUTUBE_CHANNEL) {
        bot.deleteMessage(chat_id,msg.message_id);

        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'MSM', url: 'https://t.me/msmrog2support'},{text: 'OMNI', url: 'https://t.me/omnirog2'},{text: 'ROG GLOBAL', url: 'https://t.me/ROGPhoneSeriesDiscussion'}],
                    [{ text: 'Notes', callback_data:""+user_id+" notes"},{ text: 'Donate', callback_data:""+user_id+" donate"}]
                ]
            }),
            parse_mode: "HTML",
            disable_web_page_preview:true
        };

        bot.sendMessage(chat_id, "<b>" + username +" (" + user_id + ")"  + " Welcome to " + chat_title + "</b>"+
            //"<pre>\n______________________________\n</pre>"+
            "<pre>" +
            "\n"+
            "    _______ _    _  _____ \n" +
            "   |__   __| |  | |/ ____|\n" +
            "      | |  | |__| | (___  \n" +
            "      | |  |  __  |\\___ \\ \n" +
            "      | |  | |  | |____) |\n" +
            "      |_|  |_|  |_|_____/ \n" +
            "                          \n" +
            "</pre>"+
            "<b>Click on the Notes bellow or type /notes for all guides, links to downloads and so on. It should have everything you need :) </b>",
            options); // last argument to diable link previews https://core.telegram.org/bots/api#sendmessage
    // }else{
    //     bot.deleteMessage(chat_id,msg.message_id);
    //     bot.sendMessage(chat_id, "<b>" + username +" (" + user_id + ")" + " Welcome to " + chat_title + "</b>"+
    //         //"<pre>\n______________________________\n</pre>"+
    //         "<pre>" +
    //         "\n" +
    //         "    _    _ _____ \n" +
    //         "   | |  | |_   _|\n" +
    //         "   | |__| | | |  \n" +
    //         "   |  __  | | |  \n" +
    //         "   | |  | |_| |_ \n" +
    //         "   |_|  |_|_____|\n"+
    //         "</pre>",
    //         {parse_mode: "HTML", disable_web_page_preview:true}); // last argument to diable link previews https://core.telegram.org/bots/api#sendmessage
    // }
};

// bot.on('new_chat_members', (ctx) => {
// });



bot.on('message', (msg) => {
    //console.log(msg);



    if(msg.text){
        deal_with_message(msg);
    }else if(msg.new_chat_members){
        deal_with_new_member(msg);
    }else if(msg.left_chat_member){
        bot.deleteMessage(msg.chat.id,msg.message_id);
        bot.sendMessage(msg.chat.id,
            "<pre>User left: " + msg.left_chat_member.username + " " + msg.left_chat_member.first_name + " " + msg.left_chat_member.last_name + " (" + msg.left_chat_member.id + ")" + "</pre>",
            {parse_mode: "HTML", disable_web_page_preview:true}); // last argument to diable link previews https://core.telegram.org/bots/api#sendmessage
    }


   //
});

bot.on('callback_query', (callbackQuery) => {
    //console.log(callbackQuery);

    const action = callbackQuery.data;
    let user_id = parseInt(callbackQuery.from.id);
    let user_name = callbackQuery.from.username;

    let intended_for_user_id = parseInt(action.split(" ")[0]);
    let type_of_action = action.split(" ")[1];

    //admin actions
    if(permission.check_permissions(user_id,"-a", callbackQuery.message.chat.id, user_name, bot)) {
        switch (type_of_action){
            case "test":
                var options = {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{text: 'delete', callback_data:""+user_id+" delete"}]
                        ]
                    }),
                    parse_mode: "HTML",
                    disable_web_page_preview:true
                };
                let intended = intended_for_user_id === user_id ? " Yes" : " No";
                bot.sendMessage(callbackQuery.message.chat.id,
                    //"<pre>\n______________________________\n</pre>"+
                    "<pre>" + "callback response \n" +
                    "data="+action+" \n" +
                    "user_id="+user_id+"\n" +
                    "user_name="+user_name+"\n" +
                    "intended for this user: "+ intended +
                    "</pre>",
                    options);
                break;
            case "delete":
                bot.deleteMessage(callbackQuery.message.chat.id,callbackQuery.message.message_id);
                break;
            case "deletem":
                bot.deleteMessage(callbackQuery.message.chat.id,intended_for_user_id);
                break;
            case "ban":
                admin_main.ban(bot,callbackQuery.message.chat.id,callbackQuery);
                break;
            case "unban":
                admin_main.unban(bot,callbackQuery.message.chat.id,intended_for_user_id);
                break;
            default:
                break;
        }
    }else{
        //for normal users
        switch (type_of_action){
            case "notes":
                bot.sendMessage(callbackQuery.message.chat.id,Constants.NOTES,{parse_mode: "HTML", disable_web_page_preview:true,});
                break;
            case "donate":
                bot.sendMessage(callbackQuery.message.chat.id,Constants.DONATE,{parse_mode: "HTML", disable_web_page_preview:true,});
                break;
            default:
                break;
        }
    }






    // bot.sendMessage(msg.chat.id,
    //     //"<pre>\n______________________________\n</pre>"+
    //     "<pre>" + "callback response \n" +
    //     "data="+action+" \n" +
    //     "user_id="+user_id+"\n" +
    //     "user_name="+user_name+"\n" +
    //     "</pre>",
    //     {parse_mode: "HTML", disable_web_page_preview:true});


    bot.answerCallbackQuery(callbackQuery.id);
});



bot.on('polling_error', (error) => {
    if( error.code ){
        if(error.code !== 'EFATAL'){
            console.log("error code: ", error);
        }
    }else{
        console.log("error code: ", error);
    }
});

