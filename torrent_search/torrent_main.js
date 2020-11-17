const request = require('request');
const Constants = require('../constants');


var tmain = function (data) {

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

        //console.log("input array = ",data.input_array);
        var sort_amount = null;
        var limit_amount = null;
        var d_amount = null;
        var need_help = false;
        var snext = false;
        var lnext = false;
        var dnext = false;
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
            }else if(temp === "-h"){
                need_help = true;
                break;
            }
            if(ok_to_grab){
                search_term = search_term + " " + temp;
            }

        }

        if(need_help){
            data.bot.sendMessage(data.current_chat, Constants.HELP_PAGE_TORRENT, {parse_mode : "HTML"});
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
                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Constants.HELP_PAGE_TORRENT, {parse_mode: "HTML"});
                return 1;

            }else {
                //call the api.
                if(d_amount === 0 || d_amount){
                    //console.log(d_amount);
                    if(!data.users[data.user_id].old_search_exists){
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + ", search first then you can query, you donkey</b>", {parse_mode: "HTML"});
                        return 1;
                    }else {
                        if(data.users[data.user_id].results[d_amount-1]){
                            data.users[data.user_id].running_search = true;
                            data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am Retrieving your magnet link, chill for a while...</b>", {parse_mode: "HTML"});
                            request({
                                url: Constants.MAGNET_URL,
                                method: "POST",
                                json: true,
                                body: {url: data.users[data.user_id].results[d_amount-1].url}
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
                                        //data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I retrieved your magnet link successfully!!! </b>: " + "<a href=\""+body.data+"\">Click on me if your OS supports link associations</a><pre>\n"+body.data+"</pre>", {parse_mode: "HTML"});
                                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I retrieved your magnet link successfully!!! </b><pre>\n"+body.data+"</pre>", {parse_mode: "HTML"});
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


                }else{

                    if(sort_amount === null){
                        sort_amount = 1; // default
                    } else if(isNaN(sort_amount) || Number(sort_amount) <= 0 || Number(sort_amount) >=9 ){
                        sort_amount = 1;
                        //console.log("sort amount was too high");
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Constants.HELP_PAGE_TORRENT, {parse_mode: "HTML"});
                        return 1;
                    }

                    if(limit_amount == null){
                        limit_amount = 6;
                    }else if(isNaN(limit_amount) || Number(limit_amount) <= 0 || Number(limit_amount) >=300){
                        limit_amount = 6;
                        //console.log("limit_amount was too high");
                        data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " those are invalid arguments read the help page you donkey</b>"+ Constants.HELP_PAGE_TORRENT, {parse_mode: "HTML"});
                        return 1;
                    }


                    data.users[data.user_id].running_search = true;
                    data.users[data.user_id].old_search_term = search_term;
                    var myJSONObject = {query:search_term,sort:sort_amount};
                    data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I am searching for </b><i>"+data.users[data.user_id].old_search_term+"</i><b>, as per your request. this might take a while so chill and take the pill...</b>", {parse_mode: "HTML"});
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
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not get your results because the API is down... CALL 911</b>", {parse_mode: "HTML"});
                            }else{
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not get your results because:  "+body.error+"</b>", {parse_mode: "HTML"});
                            }

                            return 1;
                        }else{
                            //console.log(body.data);
                            var message_content = "";

                            if (body.data.length === 0){
                                data.bot.sendMessage(data.current_chat, "<b>" + data.user_name + " I could not find anything for </b><i>"+data.users[data.user_id].old_search_term+"</i><b> maybe try a more generic search?</b>", {parse_mode: "HTML"});
                            } else {
                                body.data.forEach(function (torrent, index){
                                    if(index < limit_amount){ //  
                                        message_content = message_content + "<b>" + (index+1) +"</b>: " + "<a href=\""+torrent.url+"\">"+torrent.name+"</a><pre>\nse: "+torrent.seeders+" | le: "+torrent.leechers+" | date: "+torrent.date+" | size: "+torrent.size+"\n\n_</pre>";
                                    }
                                });
                                //console.log(message_content);
                                const pre_message = "<b>" + data.user_name + " Here is what I found for </b><i>"+data.users[data.user_id].old_search_term+"</i><pre>\n</pre>";
                                data.bot.sendMessage(data.current_chat, pre_message+message_content, {parse_mode: "HTML",disable_web_page_preview:true});
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
    tmain: tmain
};