//this is using telegrams export feature
const fs = require('fs');

var history = {};

var history_update = (chat_id, user_id) =>{
    if (Object.keys(history).includes(chat_id.toString())){
        //check user
        if(Object.keys(history[chat_id.toString()]).includes(user_id.toString())){
            // increase history count
            history[chat_id.toString()][user_id.toString()] = history[chat_id.toString()][user_id.toString()] + 1;
        }else{
            //new user
            history[chat_id.toString()][user_id.toString()] = 0;
        }
    }else{
        //create new group
        history[chat_id.toString()] = {};
        history[chat_id.toString()][user_id.toString()] = 0
    }
};

function read_results(){
    try {
        const file = fs.readFileSync('result.json');
        data = JSON.parse(file.toString());
        let chat_id = data.id;
        let messages = data.messages;
        console.log("chat id = ", chat_id,"\ntitle=",data.name, "\nmessages count =",messages.length);


        for(let i=0;i<messages.length;i++){
            if(messages[i].type === 'message'){
                history_update(chat_id,messages[i].from_id);
            }
        }


        try {
            fs.writeFileSync('simple_history.json', JSON.stringify(history));
            console.log("JSON data is saved.");
        } catch (error) {
            console.log("failed to save history");
            console.error(error);
        }

    } catch (error) {
        console.log("failed to read history");
        console.error(error);
    }
}

let sort = true;
function show_history(){
    try {
        const file = fs.readFileSync('simple_history.json');
        history = JSON.parse(file.toString());
        console.log("history is read");
        console.log("chat id", Object.keys(history));
        let chat_id = Object.keys(history)[0];
        let messages = history[chat_id.toString()];

        if(sort){
            var sortable = [];
            for (var count in messages) {
                //console.log(count, "  ", messages[count]);
                sortable.push([count, messages[count]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            })
            sortable.forEach(function(item){
                console.log(item);
            })
        }else{
            console.log(JSON.stringify(history, null, 4));
        }

    } catch (error) {
        console.log("failed to read history");
        console.error(error);
    }
}

//read_results();
show_history();

