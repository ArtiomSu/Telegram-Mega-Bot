const token = process.env.BOT_TOKEN;
const torrent_api_url = process.env.API_URL;
const BOT_NAME = process.env.BOT_NAME;
const SEARCH_URL = torrent_api_url+"/search";
const MAGNET_URL = torrent_api_url+"/magnet";
const use_logger=false;
const LOGGING_CHANNEL = parseInt(process.env.LOGGING_CHANNEL); // logs channel
const ROOT_USER = parseInt(process.env.ROOT_USER);


// used to deal with new channel member so custom welcome message
const YOUTUBE_CHANNEL = parseInt(process.env.YOUTUBE_CHANNEL);
// used to forward pinned message
const YOUTUBE_CHANNEL_PINNED_MSG_ID = parseInt(process.env.YOUTUBE_CHANNEL_PINNED_MSG_ID);


const help_page = "    <b>t80search_bot V0.0.5 Torrents help</b>" +
    "    <pre>\n" +
    "        currently only 1337x.to is used.....\n" +
    "\n" +
    "        options:\n" +
    "        -l n:  limits results to n results\n" +
    "               default is 6\n" +
    "        -s n: sort results by parameters (must be number)\n" +
    "            *   1 - by size decending (default)\n" +
    "            *   2 - by size ascending\n" +
    "            *   3 - by time descending\n" +
    "            *   4 - by time ascending\n" +
    "            *   5 - by seeders descending\n" +
    "            *   6 - by seeders ascending\n" +
    "            *   7 - by leechers descending\n" +
    "            *   8 - by leechers ascending\n" +
    "        -d n: shows url and magnet link for torrent this is only possible after searching. n will be displayed in the first column of search results (0 - n..)\n" +
    "        -h : displays this page\n" +
    "\n" +
    "        basic usage: @t80search_bot ubuntu 16.04\n" +
    "        advanced usage - find ubuntu with most seeders and show only top 3 results\n" +
    "        @t80search_bot -s 5 -l 3 ubuntu 16.04\n" +
    "\n" +
    "        get magnet link - use 0 for first result, 1 for second...\n" +
    "        @t80search_bot -d 1\n" +
    "    </pre>";

const help_page_main = "    <b>t80search_bot V0.0.5</b>" +
    "    <pre>\n" +
    "        -t gets you into the torrent functions\n" +
    "        -t -h to see help page for torrent\n" +
    "\n" +
    "        -p gets you into permissions manager\n" +
    "        -p -h shows help for permissions manager\n\n" +
    "        -p_ask allows you to request permissions\n" +
    "        -p_ask -t for example allows you to request\n" +
    "                  permissions to use torrent search\n\n" +
    "        Current requestable permissions are:\n" +
    "        ____________________________________\n" +
    "        -t for torrent searching\n" +
    "        -p allows you to grant or remove\n" + 
    "           permissions from users\n\n" +
    "        whois id lets you see info about users\n"+ 
    "              replying to a user with whois will\n"+ 
    "              do the same\n" +
    "    </pre>";

const help_page_permissions = "    <b>t80search_bot V0.0.5 Permissions</b>" +
    "    <pre>\n" +
    "        -l lists all permission requests\n" +
    "        -lg lists all granted permissions\n" +
    "        -g allows you to grant permissions so like\n" +
    "        -g -t 123456789 grants the user whose id is 123456789 torrent access\n" +
    "        -r removes permission from user in the same way as granting\n" +
    "        -h displays this help\n" +
    "    </pre>";

const HELP_PAGE_ADMIN = "    <b>t80search_bot V0.0.5 Admin</b>" +
    "    <pre>\n" +
    "        These can either be replies to a message\n"+
    "        or just send the id directly\n\n" +
    "        ban (id) bans a user from the group\n" +
    "        unban (id) unbans a user from the group\n" +
    "        promote (id) makes a user admin\n" +
    "        gen_link generates invite link\n" +
    "        restrict (id) user cant do anything\n" +
    "        unrestrict (id) user is back to normal\n" +
    "        -h displays this help\n" +
    "    </pre>";   

module.exports = {
    TOKEN: token,
    BOT_NAME: BOT_NAME,
    SEARCH_URL: SEARCH_URL,
    MAGNET_URL: MAGNET_URL,
    USE_LOGGER: use_logger,
    LOGGING_CHANNEL: LOGGING_CHANNEL,
    HELP_PAGE_TORRENT: help_page,
    HELP_PAGE_MAIN: help_page_main,
    ROOT_USER: ROOT_USER,
    HELP_PAGE_PERMISSIONS: help_page_permissions,
    HELP_PAGE_ADMIN: HELP_PAGE_ADMIN,
    YOUTUBE_CHANNEL: YOUTUBE_CHANNEL,
    YOUTUBE_CHANNEL_PINNED_MSG_ID: YOUTUBE_CHANNEL_PINNED_MSG_ID
};