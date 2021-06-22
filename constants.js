const token = process.env.BOT_TOKEN;
const torrent_api_url = process.env.API_URL;
const BOT_NAME = process.env.BOT_NAME;
const SEARCH_URL = torrent_api_url+"/search";
const MAGNET_URL = torrent_api_url+"/magnet";
const use_logger=false;
const LOGGING_CHANNEL = parseInt(process.env.LOGGING_CHANNEL); // logs channel
const ROOT_USER = parseInt(process.env.ROOT_USER);
const CATHAL_USER = parseInt(process.env.CATHAL_USER);

// used to deal with new channel member so custom welcome message
const YOUTUBE_CHANNEL = parseInt(process.env.YOUTUBE_CHANNEL);
// used to forward pinned message
const YOUTUBE_CHANNEL_PINNED_MSG_ID = parseInt(process.env.YOUTUBE_CHANNEL_PINNED_MSG_ID);

const TESTING_CHANNEL_1 = parseInt(process.env.TESTING_CHANNEL_1);
const TESTING_CHANNEL_2 = parseInt(process.env.TESTING_CHANNEL_2);

const APPROVED_CHANNELS = [ LOGGING_CHANNEL, YOUTUBE_CHANNEL, TESTING_CHANNEL_1, TESTING_CHANNEL_2 ];

let USE_AUTO_HELP = true;



module.exports = {
    TOKEN: token,
    BOT_NAME: BOT_NAME,
    SEARCH_URL: SEARCH_URL,
    MAGNET_URL: MAGNET_URL,
    USE_LOGGER: use_logger,
    LOGGING_CHANNEL: LOGGING_CHANNEL,
    ROOT_USER: ROOT_USER,
    CATHAL_USER: CATHAL_USER,
    YOUTUBE_CHANNEL: YOUTUBE_CHANNEL,
    YOUTUBE_CHANNEL_PINNED_MSG_ID: YOUTUBE_CHANNEL_PINNED_MSG_ID,
    APPROVED_CHANNELS,
    USE_AUTO_HELP: USE_AUTO_HELP
};