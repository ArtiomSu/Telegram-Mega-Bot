const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const Terminal = require('./Terminal');
const Constants = require('./constants');
const torrent_main = require('./torrent_search/torrent_main');
const permission = require('./permissions/permission_main');

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
                default:
                    console.log("default statement do nothing");
            }

            //console.log(users);

        }else{
            bot.sendMessage(current_chat, "<b>"+user_name+" that query is too long what are you trying to do you smelly teapot?</b>", {parse_mode : "HTML"});
        }


    }
};

var deal_with_new_member = function(msg){
    chat_id = msg.chat.id;
    user_id = msg.new_chat_members[0].id;
    username = msg.new_chat_members[0].username || msg.new_chat_members[0].first_name;
    chat_title = msg.chat.title;
    //console.log(chat_id, " ", user_id, " ", username, " ", chat_title);
    if(parseInt(chat_id) === Constants.YOUTUBE_CHANNEL) {
        bot.sendMessage(chat_id, "<b>" + username + " Welcome to " + chat_title + "</b>"+
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
            "<b>Click </b><a href=\"https://t.me/Terminal_Heat_Sink_Group/1514\">👉 This 👈</a><b> For all guides, links to downloads and so on. It should have everything you need :) </b>",
            {parse_mode: "HTML", disable_web_page_preview:true}); // last argument to diable link previews https://core.telegram.org/bots/api#sendmessage
    }else{
        bot.sendMessage(chat_id, "<b>" + username + " Welcome to " + chat_title + "</b>"+
            //"<pre>\n______________________________\n</pre>"+
            "<pre>" +
            "\n" +
            "    _    _ _____ \n" +
            "   | |  | |_   _|\n" +
            "   | |__| | | |  \n" +
            "   |  __  | | |  \n" +
            "   | |  | |_| |_ \n" +
            "   |_|  |_|_____|\n"+
            "</pre>",
            {parse_mode: "HTML", disable_web_page_preview:true}); // last argument to diable link previews https://core.telegram.org/bots/api#sendmessage
    }
};

// bot.on('new_chat_members', (ctx) => {
// });



bot.on('message', (msg) => {
    //console.log(msg);



    if(msg.text){
        deal_with_message(msg);
    }else if(msg.new_chat_members){
        deal_with_new_member(msg);
    }


   //
});



// bot.on('left_chat_member', (ctx) => {
//     console.log("member left", ctx);
//     // user_id = ctx.new_chat_members[0].id;
//     // username = ctx.new_chat_members[0].username || ctx.new_chat_members[0].first_name;
//     // chat_id = ctx.chat.id;
//     // chat_title = ctx.chat.title;
// });

bot.on('polling_error', (error) => {
    if( error.code ){
        if(error.code !== 'EFATAL'){
            console.log("error code: ", error);
        }
    }else{
        console.log("error code: ", error);
    }
});

