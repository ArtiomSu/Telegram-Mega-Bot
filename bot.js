const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const fs = require('fs');
const async = require('async');

const Terminal = require('./Terminal');
const Constants = require('./constants');
const Notes = require('./notes');
const torrent_main = require('./torrent_search/torrent_main');
const permission = require('./permissions/permission_main');
const admin_main = require('./admin/admin_main');

const bot = new TelegramBot(Constants.TOKEN, {polling: true});

var users = {};
var history = {};
var history_write_counter =0;
var t_urls = [];

try {
    const file = fs.readFileSync('simple_history.json');
    history = JSON.parse(file.toString());
    console.log("history is read");
} catch (error) {
    console.log("failed to read history");
    console.error(error);
}

stats = () => {
    const stats = {
        chatCount: 0,
        chats: []
    };

    Object.keys(history).forEach((chatId) => {
        stats.chatCount++;
        let messages = history[chatId];
        var sortable = [];
        for (var count in messages) {
            sortable.push([count, messages[count]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let output_top = [];
        for(let i=0;i<sortable.length;i++){
            if(i>10){
                break;
            }
            output_top.push({user: sortable[i][0], count: sortable[i][1] });
        } 
        stats.chats.push({chat: chatId, users: output_top});
    });
    return stats;
}

apiGetUser = (chatId, userId) => {
    return bot.getChatMember(chatId,userId);
}

function write_history(){
    try {
        fs.writeFileSync('simple_history.json', JSON.stringify(history));
        console.log("JSON data is saved.");
    } catch (error) {
        console.log("failed to save history");
        console.error(error);
    }
}


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
    bot.sendMessage(current_chat, Notes.HELP_PAGE_MAIN, {parse_mode : "HTML"});
};

var deal_with_message = function(msg){
    if (msg.text.includes(Constants.BOT_NAME)) {

        if (msg.text.length <= 200){
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
                    if(permission.check_permissions(user_id,"-t")){
                        torrent_main.tmain({
                            user_id:user_id,
                            user_name:user_name,
                            current_chat:current_chat,
                            users:users,
                            input_array: input_array,
                            bot: bot,
                            urls: t_urls
                        });
                    }
                    break;
                case "-p":
                    if(permission.check_permissions(user_id,"-p")) {
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
                    if(permission.check_permissions(user_id,"-a")) {
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
                    if(permission.check_permissions(user_id,"-p_ask")) {
                        permission.request_permission(user_name,user_id,bot,current_chat, input_array.shift());
                    }
                    break;
                case "-h":
                    if(permission.check_permissions(user_id,"-h")) {
                        help_main(current_chat);
                    }
                    break;
                case "pinned":
                    if(permission.check_permissions(user_id,"pinned")) {
                        bot.forwardMessage(current_chat,Constants.YOUTUBE_CHANNEL,Constants.YOUTUBE_CHANNEL_PINNED_MSG_ID);
                    }
                    break;
                case "whois":
                    if(permission.check_permissions(user_id,"whois")) {
                        if(msg.forward_from){
                            permission.whois(bot, current_chat, msg.forward_from.id, null);
                        } else if(msg.reply_to_message){
                            permission.whois(bot, current_chat, msg.reply_to_message.from.id, null);
                        }else{
                            let this_chat = input_array.shift();
                            let other_chat = input_array.shift() || null;
                            permission.whois(bot, current_chat, this_chat, other_chat);
                        }
                    }
                    break;
                case "shutup":
                    if(permission.check_permissions(user_id,"shutup")){
                        Constants.USE_AUTO_HELP = !Constants.USE_AUTO_HELP;
                        bot.sendMessage(current_chat, "<b>Auto Helper is: "+Constants.USE_AUTO_HELP+"</b>", {parse_mode : "HTML"});
                    }
                    break
                default:
                    console.log("default statement do nothing: ", temp);
            }

            //console.log(users);

        }else{
            bot.sendMessage(current_chat, "<b>"+user_name+" that query is too long what are you trying to do you smelly teapot?</b>", {parse_mode : "HTML"});
        }


    }else if(msg.text[0] === '/'){
        user_slash_functions(msg);
    }else if(auto_help_notes(msg)){
    }else{
        if(parseInt(msg.chat.id) === Constants.LOGGING_CHANNEL ){
            if(msg.forward_from){
                permission.whois(bot, Constants.LOGGING_CHANNEL, msg.forward_from.id, null);
            }
        }
    }
};

send_notes_func = (note_to_send, chat_id, reply_id = false) => {
    let text_to_send = '';
    let options = {parse_mode: "HTML", disable_web_page_preview:true};
    if(reply_id){
        options.reply_to_message_id = reply_id;
    }
    if(typeof note_to_send === 'string' || note_to_send instanceof String){
        text_to_send = note_to_send;
    }else{
        text_to_send = "<b>"+note_to_send.title+"</b>";
        let list_keyboard = [];
        note_to_send.notes.forEach(function (note, index){
            list_keyboard.push([note]);
        });
        options.reply_markup = JSON.stringify({inline_keyboard: list_keyboard});
    }

    bot.sendMessage(chat_id,text_to_send,options);
}

let auto_help_notes = (msg) => {
    if(! Constants.USE_AUTO_HELP || msg.from.id === Constants.ROOT_USER){
        return false;
    }
    let text = msg.text.toLowerCase();
    for(let trig in Notes.NOTES_KEYWORDS_AUTO_HELP_TRIGGER){
        if(text.includes(Notes.NOTES_KEYWORDS_AUTO_HELP_TRIGGER[trig])){
            for(let key in Notes.NOTES_KEYWORDS_AUTO_HELP_DICTIONARY){
                for(let pattern in Notes.NOTES_KEYWORDS_AUTO_HELP_DICTIONARY[key]){
                    if(text.includes(Notes.NOTES_KEYWORDS_AUTO_HELP_DICTIONARY[key][pattern])){
                        const note_to_send = Notes.NOTES_DICTIONARY[key];
                        send_notes_func(note_to_send, msg.chat.id, msg.message_id);
                        return true;
                    }
                }
            }
            return false;
        }
    }
    return false;
};

var check_user_ban = (msg) => {
    //console.log(msg,"\n\n\n");
    let ban_words = [ "hack", "hax", "whatsapp", "invest", "trading", "money", "crypto", "forex", "hak", "cheat", "cheet", "cash", "refer", "share this", "click here" ];

    let banned_words_used = 0;
    let message_forwarded = 0;
    let message_has_media = 0;
    let message_has_urls = 0;
    let user_posted_messages = get_messages_count_for_user(msg);
    //check ban words
    let message_text = "";
    let message_entities = null;

    //check if message is some media
    if(msg.photo || msg.video || msg.document || msg.audio || msg.sticker || msg.voice || msg.video_note || msg.animation || msg.contact || msg.location){
        message_has_media = 1;
        if(msg.caption){
            message_text = msg.caption.toLowerCase();
        }

        if(msg.document){
            message_text = message_text + " " + msg.document.file_name.toLowerCase();
        }

        if(msg.caption_entities){
            message_entities = msg.caption_entities;
        }

    }


    if(msg.text){
        message_text = msg.text.toLowerCase();
        if(msg.entities){
            message_entities = msg.entities;
        }
    }

    if(message_text !== ""){
        for(let i=0; i<ban_words.length; i++){
            if(message_text.includes(ban_words[i])){
                banned_words_used++;
            }
        }
    }

    if(message_entities !== null){
        for(x in message_entities){
            if(message_entities[x].type === 'url'){
                message_has_urls++;
            }
        }
    }



    //check if message is forwarded
    if(msg.forward_from){
        message_forwarded = 1;
    }



    const banned_words_used_weight = 60;
    const message_forwarded_weight = 30;
    const message_has_photo_weight = 30;
    const message_has_urls_weight = 30;

    //heavy penealty for new users
    let user_posts_score = 70;
    if(user_posted_messages < 3){
        let triggers = 0;
        if(message_forwarded === 1){
            //user_posts_score = user_posts_score * message_has_urls_weight;
            triggers++;
        }
        if(message_has_media === 1){
            //user_posts_score = user_posts_score * message_has_photo_weight;
            triggers++;
        }
        if(message_has_urls >= 1){
            //user_posts_score = user_posts_score * message_has_urls_weight * message_has_urls;
            triggers++;
        }
        if(banned_words_used >= 1){
            //user_posts_score = user_posts_score * banned_words_used * banned_words_used_weight;
            triggers+=1;
        }
        user_posts_score = 100 + (161*triggers);
    }


    let score = (banned_words_used * banned_words_used_weight) + (message_forwarded * message_forwarded_weight) + (message_has_media * message_has_photo_weight) + (message_has_urls * message_has_urls_weight) + user_posts_score;

    let severity_category = 0;
    let severity_text = "";

    if(score <= 100){
        //safe
    }else if(score > 100 && score <= 130){
        //potential ban
        severity_category = 1;
        severity_text = "Most likely a false positive (severity 1)";
    }else if(score > 130 && score <= 160){
        //probable ban
        severity_category = 2;
        severity_text = "Something strange is happening (severity 2)";
    }else if(score > 160 && score <= 190){
        //almost certain ban
        severity_category = 3;
        severity_text = "Ok what is this? (severity 3)";
    }else{
        //total ban
        severity_category = 4;
        severity_text = "Hmmmmmmmmmmmmmmmmmmmmmmmmmmmmm (severity 4)";
    }

    // console.log("########################## check user ban #######################");
    // console.log("banned_words_used: ",banned_words_used);
    // console.log("message_forwarded: ",message_forwarded);
    // console.log("message_has_media: ",message_has_media);
    // console.log("message_has_urls: ",message_has_urls);
    // console.log("user_posted_messages: ",user_posted_messages);
    // console.log("score: ",score);
    // console.log("severity_category: ", severity_category);
    // console.log("########################## check user ban #######################");


    if(severity_category > 0){
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'ban', callback_data:""+msg.from.id+" ban"+" "+msg.chat.id},{text: 'delete', callback_data:""+msg.message_id+" deletem"+" "+msg.chat.id},{text: 'delete this', callback_data:""+msg.message_id+" delete"+" "+msg.chat.id}]
                ]
            }),
            parse_mode: "HTML",
            disable_web_page_preview:true,
            reply_to_message_id: msg.message_id
        };

        let send_to_chat = msg.chat.id;
        //if(severity_category !== 4){
            //send_to_chat = Constants.LOGGING_CHANNEL;
            options.reply_to_message_id = null;
        //}

        bot.sendMessage(Constants.LOGGING_CHANNEL,
            "@Terminal_Heat_Sink bot experiment triggered "+
            "<pre>\n</pre>"+
            severity_text+
            "<pre>\n</pre>"+
            "<b>Do not worry this doesnt ban anyone just an experiment</b>"+
            "<pre>\n\n"+
            "score="+score+"\n"+
            "cat="+severity_category+"\n"+
            "bwu="+banned_words_used+"\n"+
            "mf= "+message_forwarded+"\n"+
            "mhm="+message_has_media+"\n"+
            "mhu="+message_has_urls+"\n"+
            "upm="+user_posted_messages+"\n\n"+
            "user_id=    "+msg.from.id+"\n" +
            "user_name=  "+msg.from.username+"\n" +
            "first_name= "+msg.from.first_name+"\n" +
            "last_name=  "+msg.from.last_name+"\n\n" +
            "chat_id=    "+msg.chat.id+"\n"+
            "chat_title= "+msg.chat.title+"\n\n"+
            "text=       "+ message_text +
            "</pre>",
            options);

        if(severity_category === 4){
            bot.deleteMessage(msg.chat.id, msg.message_id);
        }    
    }


};


var user_slash_functions = (msg) =>{
    if(msg.reply_to_message && msg.text.toLowerCase().startsWith("/report")){
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'ban', callback_data:""+msg.reply_to_message.from.id+" ban"+" "+msg.chat.id},{text: 'delete', callback_data:""+msg.reply_to_message.message_id+" deletem"+" "+msg.chat.id},{text: 'delete report', callback_data:""+msg.message_id+" deletem"+" "+msg.chat.id}],
                    [{text: 'delete this', callback_data:""+msg.reply_to_message.message_id+" delete"+" "+msg.chat.id}]
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
            "first_name="+msg.reply_to_message.from.first_name+"\n" +
            "last_name="+msg.reply_to_message.from.last_name+"\n" +
            "user_name="+msg.reply_to_message.from.username+"\n\n" +
            "report by="+ msg.from.id + "\n" +
            "user_name=="+ msg.from.username+ "\n"+
            "</pre>"+"Reason: "+ msg.text.toLowerCase().split("/report")[1],
            options);
    }else if(msg.text.toLowerCase() in Notes.NOTES_DICTIONARY){
        const note_to_send = Notes.NOTES_DICTIONARY[msg.text.toLowerCase()];
        send_notes_func(note_to_send, msg.chat.id, msg.message_id);
    }
    else if(msg.text.toLowerCase().startsWith("/all")) {
            bot.forwardMessage(msg.chat.id, Constants.YOUTUBE_CHANNEL, Constants.YOUTUBE_CHANNEL_PINNED_MSG_ID);
    }else if(msg.text.toLowerCase().startsWith("/top") && permission.check_permissions(msg.from.id,"-a")){
        let chat_id = msg.chat.id;
        let chat_title = msg.chat.title;
        let chat_type = msg.chat.type;
        let top_users_for_chat = chat_id;
        try{
            let other_chat = msg.text.split(" ")[1];
            if(other_chat.toString() in history){
                top_users_for_chat = other_chat
            }
        }catch (e) {}
        let messages = history[top_users_for_chat.toString()];
        var sortable = [];
        for (var count in messages) {
            sortable.push([count, messages[count]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let output_top = "<pre>";
        for(let i=0;i<sortable.length;i++){
            if(i>10){
                break;
            }
            output_top+=sortable[i][0] + ": " + sortable[i][1] + "\n";
        }
        output_top+="</pre>";

        bot.sendMessage(chat_id, "<pre>"+
            "\chat_id      " + chat_id +
            "\nchat_title: " + chat_title +
            "\nchat_type:  " + chat_type +
            "\n\nTop Users in "+top_users_for_chat+"</pre>" +
            output_top, {parse_mode: "HTML"});
    }else if(msg.text.toLowerCase().startsWith("/n")){
        let notes_array = [];
        let temp = [];
        for(let key in Notes.NOTES_DICTIONARY){
            temp.push({'text':key});
            if(temp.length === 2){
                notes_array.push(temp);
                temp = [];
            }
        }
        if(temp.length !== 0){
            notes_array.push(temp);
        }
        var options = {
            reply_markup: JSON.stringify({
                keyboard: notes_array,
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    selective: true
            }),
            parse_mode: "HTML",
            disable_web_page_preview:true,
            reply_to_message_id: msg.message_id
        };
        let user_name = msg.from.username || msg.from.first_name;
        let output = "@"+user_name+" pick a note from the custom keyboard";
        bot.sendMessage(msg.chat.id,output,options);
    }
};

const checkUserName = (msg) =>{
    const username =  msg.new_chat_members[0].username ?  msg.new_chat_members[0].username.toLowerCase() : '';
    const firstname = msg.new_chat_members[0].first_name ? msg.new_chat_members[0].first_name.toLowerCase() : '';
    const lastname = msg.new_chat_members[0].last_name ? msg.new_chat_members[0].last_name.toLowerCase() : '';

    let ban_words = [ "hack", "invest", "trading", "money", "crypto", "forex", "hak", "cheat", "cheet", "cash", "free"];

    for(let i=0; i<ban_words.length; i++){
        if(username.includes(ban_words[i]) || firstname.includes(ban_words[i]) || lastname.includes(ban_words[i])){
            return true;
        }
    }

    return false;
}

shuffle_array = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

create_captcha_func = () => {
    const allowed_operation = [
        {op: '+', text: 'plus'},
        {op: '-', text: 'minus'},
        {op: '*', text: 'multiply'},
    ]
    const random_number_1 = Math.floor(Math.random() * 100) + 1;
    const random_number_2 = Math.floor(Math.random() * 100) + 1;
    const operation = allowed_operation[Math.floor(Math.random() * 3)];
    const answer = eval(random_number_1 + operation.op + random_number_2);

    const captcha_text = 'To be able to send messages in this group you need to solve the following ( ' + random_number_1 + ' ' + operation.text + ' ' + random_number_2 + ' ) by pressing on the correct number bellow';

    // generate fake answers that are close to the real answer
    let answers = [
        answer + Math.floor(Math.random() * 10) + 1,
        answer - Math.floor(Math.random() * 10) - 1,
        answer + Math.floor(Math.random() * 10) + 1,
        answer - Math.floor(Math.random() * 10) - 1,
        answer
    ];

    // check for duplicates
    for(let i=0; i<answers.length; i++){
        for(let j=i+1; j<answers.length; j++){
            if(answers[i] === answers[j]){
                answers[j] = answer + Math.floor(Math.random() * 10) + 1;
            }
        }
    }

    const shuffled_answers = shuffle_array(answers);

    return {
        captcha_text: captcha_text,
        answers: shuffled_answers,
        answer: answer
    }
}

var deal_with_new_member = function(msg){
    chat_id = msg.chat.id;
    user_id = msg.new_chat_members[0].id;
    username = msg.new_chat_members[0].username || msg.new_chat_members[0].first_name;
    chat_title = msg.chat.title;

    if(checkUserName(msg)){
        bot.banChatMember(chat_id,user_id, {revoke_messages:true}).then(status =>{
            if(status){
                bot.sendMessage(chat_id,":)",{parse_mode: "HTML", disable_web_page_preview:true});
            }else{
                bot.sendMessage(chat_id,":(",{parse_mode: "HTML", disable_web_page_preview:true});
            }
        });    
        return;
    }

    bot.deleteMessage(chat_id,msg.message_id);

    const captcha = create_captcha_func();

    let capcha_keyboard = [];

    captcha.answers.forEach(answer => {
        capcha_keyboard.push({text: answer, callback_data: user_id+ " captcha"+ " " + answer+ " " + captcha.answer + " " + chat_id});
    })
    
    bot.restrictChatMember(chat_id,user_id,{permissions:{can_send_messages:false,can_send_media_messages:false,can_send_polls:false,can_send_other_messages:false,can_add_web_page_previews:false,can_change_info:false,can_invite_users:false,can_pin_messages:false}});

    // bot.getChat(chat_id).then(chat => {
    //     console.log("chat:" + JSON.stringify(chat.permissions));
    // })

    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'I am an intelligent bot please ban me', callback_data: user_id+ " captcha"+ " " + "1"+ " " + "2" + " " + chat_id}],
                [{text: 'Other Groups And Channels on Telegram', callback_data:""+user_id+" channels"+" "+chat_id}],
                [{ text: 'Notes', callback_data:""+user_id+" notes"+" "+chat_id},{ text: 'Donate', callback_data:""+user_id+" donate"+" "+chat_id},{text: 'Youtube', url: 'https://www.youtube.com/c/TerminalHeatSink'}],
                capcha_keyboard,
                [{text: 'My PlayStore Apps', url: 'https://play.google.com/store/apps/developer?id=Terminal+Heat+Sink'}, {text: 'My Awful Website', url: 'https://artiomsu.github.io'}]
            ]
        }),
        parse_mode: "HTML",
        disable_web_page_preview:true
    };

    bot.sendMessage(chat_id, "<b>" + username +" (" + user_id + ")"  + " Welcome to " + chat_title + "</b>"+
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
        "<pre>\n</pre>"+
        "<pre>"+captcha.captcha_text+"</pre>"
        ,
        options); 
};

var history_update = (msg) =>{
    if (Object.keys(history).includes(msg.chat.id.toString())){
        //check user
        if(Object.keys(history[msg.chat.id.toString()]).includes(msg.from.id.toString())){
            // increase history count
            history[msg.chat.id.toString()][msg.from.id.toString()] = history[msg.chat.id.toString()][msg.from.id.toString()] + 1;
        }else{
            //new user
            history[msg.chat.id.toString()][msg.from.id.toString()] = 0;
        }
    }else{
        //create new group
        history[msg.chat.id.toString()] = {};
        history[msg.chat.id.toString()][msg.from.id.toString()] = 0
    }
};

var get_messages_count_for_user = (msg) => {
    if (Object.keys(history).includes(msg.chat.id.toString())){
        if(Object.keys(history[msg.chat.id.toString()]).includes(msg.from.id.toString())){
            return history[msg.chat.id.toString()][msg.from.id.toString()];
        }else{
            return 0;
        }
    }else{
        return 0;
    }
};


bot.on('message', (msg) => {
    //console.log(msg);

    if(!Constants.APPROVED_CHANNELS.includes(parseInt(msg.chat.id) )){
        console.log("inside wrong channel leaving:", msg.chat.id, " ", msg.chat.title);
        return bot.leaveChat(msg.chat.id);
    }

    history_update(msg);
    //console.log("######### messages_count_for user: ", get_messages_count_for_user(msg));

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

    if(! permission.check_permissions(msg.from.id,"-a")) {
        check_user_ban(msg);
    }

    history_write_counter++;
    if(history_write_counter > 10){
        history_write_counter = 0;
        write_history();
        console.log("saving history");
    }

});

//prevent spam bot buttons
var callback_notes_used = {
    user_id: null,
    notes_used: false,
    donate_used: false,
    channels_used: false
};

async function handle_welcome_message_callbacks(callbackQuery, user_id, intended_for_user_id, type_of_action, action){
        //for normal users
        if (user_id === intended_for_user_id) {
            let send_notes = true;
            let send_donation = true;
            let send_channels = true;
            if (callback_notes_used.user_id !== intended_for_user_id) {
                callback_notes_used.user_id = intended_for_user_id;
            } else {
                if (callback_notes_used.notes_used) {
                    send_notes = false;
                }
                if (callback_notes_used.donate_used) {
                    send_donation = false;
                }
                if (callback_notes_used.channels_used) {
                    send_channels = false;
                }
            }

            // check if user has permissions to type, if they don't, don't allow them to use buttons.
            if(type_of_action !== 'captcha'){
                const member = await bot.getChatMember(callbackQuery.message.chat.id,user_id);
                if(member && member.can_send_messages === false){
                    return bot.answerCallbackQuery(callbackQuery.id, {
                        text: "Solve the captcha first!!!",
                        show_alert: true
                    });
                }
            }
            switch (type_of_action) {
                case "notes":
                    if (send_notes) {
                        callback_notes_used.notes_used = true;
                        bot.sendMessage(callbackQuery.message.chat.id, Notes.NOTES, {
                            parse_mode: "HTML",
                            disable_web_page_preview: true,
                        });
                    } else {
                        return bot.answerCallbackQuery(callbackQuery.id, {
                            text: "Please dont spam bot buttons. If you badly want to see notes again type /notes",
                            show_alert: true
                        });
                    }
                    break;
                case "donate":
                    if (send_donation) {
                        callback_notes_used.donate_used = true;
                        bot.sendMessage(callbackQuery.message.chat.id, Notes.DONATE, {
                            parse_mode: "HTML",
                            disable_web_page_preview: true,
                        });
                    } else {
                        return bot.answerCallbackQuery(callbackQuery.id, {
                            text: "Please dont spam bot buttons. If you badly want to see donation again type /donate",
                            show_alert: true
                        });
                    }
                    break;
                case "channels":
                    if (send_channels) {
                        callback_notes_used.channels_used = true;
                        const note_to_send = Notes.NOTES_CHANNELS;
                        send_notes_func(note_to_send, callbackQuery.message.chat.id);
                    } else {
                        return bot.answerCallbackQuery(callbackQuery.id, {
                            text: "Please dont spam bot buttons. If you badly want to see them channels again type /channels",
                            show_alert: true
                        });
                    }
                    break;
                case "captcha":
                    const captcha_user_id = parseInt(action.split(" ")[0]);
                    const guess = action.split(" ")[2];    
                    const answer = action.split(" ")[3];
                    const chat = action.split(" ")[4];

                    if(guess === answer){
                        bot.restrictChatMember(chat,captcha_user_id,{can_send_messages:true,can_send_media_messages:true,can_send_polls:true,can_send_other_messages:true,can_add_web_page_previews:true,can_change_info:false,can_invite_users:false,can_pin_messages:false}).then(result => {
                          //console.log("result: "+result); // true
                        })
                        //update the reply keyboard to hide the answers.
                        const updatedKeyboard = callbackQuery.message.reply_markup;
                        updatedKeyboard.inline_keyboard.forEach((key, index) =>{
                            if(key.length === 5){
                                updatedKeyboard.inline_keyboard.splice(index,1);
                            }else if(key[0].text.includes("ban me")){
                                updatedKeyboard.inline_keyboard.splice(index,1);
                            }
                        });
                        var options = {
                            reply_markup: updatedKeyboard,
                            parse_mode: "HTML",
                            disable_web_page_preview:true,
                            chat_id: callbackQuery.message.chat.id,
                            message_id: callbackQuery.message.message_id
                        };
                        const username = callbackQuery.from.username || callbackQuery.from.first_name;
                        const chat_title = callbackQuery.message.chat.title;
                        const updatedMessage = "<b>" + username +" (" + user_id + ")"  + " Welcome to " + chat_title + "</b>"+
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
                            "<b>Click on the Notes bellow or type /n for a cool custom keyboard</b>"+
                            "<pre>\n</pre>";

                        bot.editMessageText(updatedMessage, options);
                    }else{
                        bot.banChatMember(chat, captcha_user_id, {revoke_messages:true}).then(result => {
                            let output = "<pre>" + "Banned \n" +
                                "data="+action+" \n" +
                                "user_id="+captcha_user_id+"\n" +
                                "user_name="+callbackQuery.message.from.user_name+"\n" +
                                "banned for=Failed captcha. guessed "+guess+" should have been "+answer+
                                "</pre>";
                            var options = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: [
                                        [{text: 'unban', callback_data:""+captcha_user_id+" unban"+" "+chat}]
                                    ]
                                }),
                                parse_mode: "HTML",
                                disable_web_page_preview:true
                            };
                            bot.sendMessage(constants.LOGGING_CHANNEL,output, options);
                            bot.deleteMessage(chat,callbackQuery.message.message_id);
                        })
                    }

                default:
                    break;
            }
        } else {
            return bot.answerCallbackQuery(callbackQuery.id, {
                text: "This messages was not meant for you. Type /notes or whatever",
                show_alert: true
            });
        }
        bot.answerCallbackQuery(callbackQuery.id);
}

bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    let user_id = parseInt(callbackQuery.from.id);
    let user_name = callbackQuery.from.username || callbackQuery.from.first_name;

    let intended_for_user_id = parseInt(action.split(" ")[0]);
    let type_of_action = action.split(" ")[1];
    let intended_for_channel = parseInt(action.split(" ")[2]);

    let done_task = true;
    let admin_tasks_found = true;
    let torrent_tasks_found = true;
    //admin actions
    if(permission.check_permissions(user_id,"-a")) {
        switch (type_of_action){
            case "test":
                var options = {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{text: 'delete', callback_data:""+user_id+" delete"+" "+callbackQuery.message.chat.id}]
                        ]
                    }),
                    parse_mode: "HTML",
                    disable_web_page_preview:true
                };
                let intended = intended_for_user_id === user_id ? " Yes" : " No";
                bot.sendMessage(callbackQuery.message.chat.id,
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
                bot.deleteMessage(intended_for_channel,intended_for_user_id);
                break;
            case "ban":
                admin_main.ban(bot,intended_for_channel,intended_for_user_id,callbackQuery);
                break;
            case "unban":
                admin_main.unban(bot,intended_for_channel,intended_for_user_id,callbackQuery.message.chat.id);
                break;
            default:
                admin_tasks_found = false;
                break;
        }
    }else{
        admin_tasks_found = false;
    }

    if(!admin_tasks_found && permission.check_permissions(user_id, "-t")) {
        switch (action.split(" ")[0]){
            case "magnet":
                if(action.split(" ")[1] !== 'none'){
                    torrent_main.handleMagnet({
                        user_id:user_id,
                        user_name:user_name,
                        current_chat:callbackQuery.message.chat.id,
                        users:users,
                        input_array: [],
                        bot: bot,
                        urls: t_urls
                    }, 0, parseInt(action.split(" ")[1]));
                }
                break;
            case "deleteTMsg":
                if(user_id.toString() === action.split(" ")[1]){
                    bot.deleteMessage(callbackQuery.message.chat.id,callbackQuery.message.message_id);
                }else{
                    torrent_tasks_found = false;
                }
                break;
            default:
                torrent_tasks_found = false;
                break;
        }
    }else{
        torrent_tasks_found = false;
    }

    if(!admin_tasks_found && !torrent_tasks_found){
        done_task = false;
    }
    if(!done_task) {
        handle_welcome_message_callbacks(callbackQuery, user_id, intended_for_user_id, type_of_action, action);
    }else{
        bot.answerCallbackQuery(callbackQuery.id);
    }

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

var api = require('./api');
const constants = require('./constants');
const { type } = require('express/lib/response');
const e = require('express');
api.set_save_function(write_history);
api.set_exit_function(exitHandler);
api.set_bot_send_function(bot);
api.set_stats_function(stats);
api.set_getUser_function(apiGetUser);

if(Constants.REBOOT_AFTER_1_HOUR){
    setTimeout(function (){
        exitHandler({exit:true},null);
    },3600000);
}

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit){
        console.log("needs to exit");
        //console.log("history\n");
        //console.log(JSON.stringify(history));

        write_history();

        process.exit();
    }

}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
