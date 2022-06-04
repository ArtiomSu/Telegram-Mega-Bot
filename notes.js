// const INLINE_OBJECT = {
//     title: "",
//     notes: [
//         {url: '', text: ''},
//     ]
// }

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
    "        -o (n|o): how to output the results. (n) default will use the layout allowing you to click buttons. (o) will use the old layout where it just lists \n" +
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
    "        -a gets you into the admin functions\n" +
    "        -a -h to see help page for admin\n" +
    "\n" +
    "        -p gets you into permissions manager\n" +
    "        -p -h shows help for permissions manager\n\n" +
    "        -p_ask allows you to request permissions\n" +
    "        -p_ask -t for example allows you to request\n" +
    "                  permissions to use torrent search\n\n" +
    "        Current requestable permissions are:\n" +
    "        ____________________________________\n" +
    "        -t for torrent searching\n" +
    "        -a for admin functions\n" +
    "        -p allows you to grant or remove\n" +
    "           permissions from users\n\n" +
    "        whois id lets you see info about users\n"+
    "              replying to a user with whois will\n"+
    "              do the same\n\n" +
    "        pinned forwards the saved message" +
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

const NOTES_ROG_PHONE_2_GUIDES_INLINE_OBJECT = {
    title: "Rog Phone 2 Guides",
    notes: [
        {url: 'https://www.youtube.com/watch?v=pgqboLXMSuk', text: 'How to root stock android 9 and 10'},
        {url: 'https://www.youtube.com/watch?v=uONJrZrHWxI', text: 'How to unbrick ( stuck in edl mode )'},
        {url: 'https://www.youtube.com/watch?v=Ro62pAF1RBU', text: 'Custom Kernel for stock ROM'},
        {url: 'https://www.youtube.com/watch?v=k4ESk9VCgI0', text: 'How to update to android 10 stock from android 9 and keep root'},
        {url: 'https://www.youtube.com/watch?v=eteK_mhAcyw', text: 'How to downgrade from android 10 to android 9'},
        {url: 'https://www.youtube.com/watch?v=uGdSWUK9vNw', text: 'How to use payload dumper, setup platform tools and patch boot image using magisk ( kinda all in one vid lol )'},
        {url: 'https://www.youtube.com/watch?v=t5AJCwmGbXM', text: 'How to backup using TWRP and TitaniumBackup'},
        {url: 'https://www.youtube.com/watch?v=_94R7ZY5zaY', text: 'How to fix safetynet while the magisk bois work on a proper fix'},
        {url: 'https://www.youtube.com/watch?v=dKehBkHtbEI', text: 'dirty flashing havoc os update'},
        {url: 'https://www.youtube.com/watch?v=4N05Ny8jAtA', text: 'Up to date kernel flashing'},
        {url: 'https://www.youtube.com/watch?v=Xo3ZtxFkPbI', text: 'omni rom flashing (old)'},
        {url: 'https://www.youtube.com/watch?v=MAz_Vqaxd14', text: 'omni android 12 flashing from scratch'},
        {url: 'https://www.youtube.com/watch?v=wQULU-3BWvg', text: 'Omni android 11 flashing from scratch'},
        {url: 'https://www.youtube.com/watch?v=3HqnSKmTCLM', text: 'Things to do after flashing omni 11'},
        {url: 'https://www.youtube.com/watch?v=LsfM4Wms4GQ', text: 'making omni 11 look good with gravitybox'},
        {url: 'https://www.youtube.com/watch?v=KQgoJCRTSsw', text: 'making omni 12 look good part 1'},
        {url: 'https://www.youtube.com/watch?v=TTXu9NA1cLk', text: 'making omni 12 look good part 2'},
        {url: 'https://www.youtube.com/watch?v=IEnnVAPLSeg', text: 'havoc flashing'},
        {url: 'https://www.youtube.com/watch?v=8vhocq5UWJQ', text: 'MSM flashing'},
        {url: 'https://www.youtube.com/watch?v=7_PtEwdZvGo', text: 'flashing stock rom in twrp'},
        {url: 'https://www.youtube.com/watch?v=gh7b9AH51k4', text: 'Improve battery life'},
    ]
}


const NOTES_ROG_PHONE_2_GUIDES = "<b>Rog Phone 2 Guides</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=pgqboLXMSuk\">How to root stock android 9 and 10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uONJrZrHWxI\">How to unbrick ( stuck in edl mode )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Ro62pAF1RBU\">Custom Kernel for stock ROM</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=k4ESk9VCgI0\">How to update to android 10 stock from android 9 and keep root</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=eteK_mhAcyw\">How to downgrade from android 10 to android 9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uGdSWUK9vNw\">How to use payload dumper, setup platform tools and patch boot image using magisk ( kinda all in one vid lol )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=t5AJCwmGbXM\">How to backup using TWRP and TitaniumBackup</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=_94R7ZY5zaY\">How to fix safetynet while the magisk bois work on a proper fix</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=dKehBkHtbEI\">dirty flashing havoc os update</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=4N05Ny8jAtA\">Up to date kernel flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Xo3ZtxFkPbI\">omni rom flashing (old)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=MAz_Vqaxd14\">omni android 12 flashing from scratch</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=wQULU-3BWvg\">Omni android 11 flashing from scratch</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=3HqnSKmTCLM\">Things to do after flashing omni 11</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=LsfM4Wms4GQ\">making omni 11 look good with gravitybox</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=KQgoJCRTSsw\">making omni 12 look good part 1</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=TTXu9NA1cLk\">making omni 12 look good part 2</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=IEnnVAPLSeg\">havoc flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=8vhocq5UWJQ\">MSM flashing</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=7_PtEwdZvGo\">flashing stock rom in twrp</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=gh7b9AH51k4\">Improve battery life</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";


const NOTES_APPS_INLINE_OBJECT = {
    title: "APPs And Other Misc",
    notes: [
        {url:'https://t.me/Terminal_Heat_Sink_Group/2540', text:'Viperfx (old)'},
        {url:'https://t.me/Terminal_Heat_Sink_Group/2769', text:'viperfx irs and ddc collection'},
        {url:'https://t.me/Terminal_Heat_Sink_Group/3001', text:'Gcam (old)'},
        {url:'https://forum.xda-developers.com/apps/magisk/collection-magisk-modules-v2-t3575758/post72542167#post72542167', text:'Uninstall magisk modules using twrp'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb', text:'Asus Rog Phone RGB'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.keyboardpickershortcut', text:'Keyboard picker shortcut'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.openwithcopyurl', text:'Open With Copy Url'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.terminal_keyboard', text:'Ergonomic Terminal Keyboard'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.bringbacknfcquicksettings', text:'Bring Back NFC Quick Settings'},
        {url:'https://play.google.com/store/apps/details?id=terminalheatsink.nixieface', text:'Nixie face wearos watch face'},
        {url:'https://github.com/ArtiomSu/AndroidClassicPowerMenuTweaks', text:'My fork of Classic Power Menu with super privacy and transparency'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.donateterminalheatsink', text:'Donate using google play store balance app'},
    ]
}


const NOTES_APPS = "<b>APPs And Other Misc</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/2540\">Viperfx (old)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/2769\">viperfx irs and ddc collection</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/3001\">Gcam (old)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/apps/magisk/collection-magisk-modules-v2-t3575758/post72542167#post72542167\">Uninstall magisk modules using twrp</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb\">Asus Rog Phone RGB</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.keyboardpickershortcut\">Keyboard picker shortcut</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.openwithcopyurl\">Open With Copy Url</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.terminal_keyboard\">Ergonomic Terminal Keyboard</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.bringbacknfcquicksettings\">Bring Back NFC Quick Settings</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminalheatsink.nixieface\">Nixie face wearos watch face</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/AndroidClassicPowerMenuTweaks\">My fork of Classic Power Menu with super privacy and transparency</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.donateterminalheatsink\">Donate using google play store balance app</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_PSVITA_INLINE_OBJECT = {
    title: "PSVITA",
    notes: [
        {url:'https://t.me/Terminal_Heat_Sink_Group/23593', text:'custom theme: red cyber'},
        {url:'https://www.youtube.com/watch?v=WBBfPrQsiA8', text:'Matrix Custom boot animation video'},
        {url:'https://t.me/c/1201136003/35', text:'Matrix Custom boot image download'},
    ]
}

const NOTES_PSVITA = "<b>PSVITA</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/23593\">custom theme: red cyber</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=WBBfPrQsiA8\">Matrix Custom boot animation video</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/35\">Matrix Custom boot image download</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_RAW = "<b>FLASH Raw Firmware</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">find raw a10 or a9 on this channel</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/6723\">raw a10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/rog-phone-2/how-to/guide-convert-cn-to-ww-rom-26-08-t3961042\">raw a9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://drive.google.com/drive/folders/0B16KcYGeJ8Q9fml4MzdQUFA3Z29aS3Jkd01iY3oyT09zaWwzaldFZl9tV0JXNG9jUEdkSFE\">raw a9 and 10 thank to Vietnam bois</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/uONJrZrHWxI?t=664\">If you want to see how flashing raw firmware looks like in a video click on this and skip to 11:03</a>" +
    "<pre>\n" +
    "_______________________________________\n\n</pre>"+

    "<b>FLASH RAW</b>" +
    "<pre>\n"+
    "_______________________________________\n</pre>" +
    "1. Download raw firmware from above" +
    "<pre>\n</pre>" +
    "2. Extract the zip two times. You should see a file called flashall.bat or flashall_AFT.cmd." +
    "<pre>\n</pre>" +
    "3. Put phone into fastboot mode ( this is where you will see large green start text )" +
    "<pre>\n</pre>" +
    "4. Double Click on flashall.bat or flashall_AFT.cmd this should open up a cmd window. If it doesnt just run the file in cmd by typing flashall.bat or flashall_AFT.cmd" +
    "<pre>\n</pre>" +
    "5. Leave the phone for 20 minutes. It will restart when fully Flashed" +
    "<pre>\n</pre>" +
    "6. Turn of your phone when it reboots ( by holding power + both volume keys ) and reboot into recovery ( by holding power + volume up key to get into fastboot and then use volume keys to select recovery ) and select factory reset ( Your phone will not work properly if you dont  )" +
    "<pre>\n" +
    "_______________________________________</pre>";


const NOTES_RELOCK = "<b>Relock Bootloader</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">find raw a10 or a9 on this channel</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/Terminal_Heat_Sink_Group/6723\">raw a10</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://forum.xda-developers.com/rog-phone-2/how-to/guide-convert-cn-to-ww-rom-26-08-t3961042\">raw a9</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://drive.google.com/drive/folders/0B16KcYGeJ8Q9fml4MzdQUFA3Z29aS3Jkd01iY3oyT09zaWwzaldFZl9tV0JXNG9jUEdkSFE\">raw a9 and 10 thank to Vietnam bois</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/uONJrZrHWxI?t=664\">If you want to see how flashing raw firmware looks like in a video click on this and skip to 11:03</a>" +
    "<pre>\n" +
    "_______________________________________\n\n</pre>"+

    "<b>Lock Bootloader</b>" +
    "<pre>\n"+
    "_______________________________________\n</pre>" +
    "1. Download raw firmware from above" +
    "<pre>\n</pre>" +
    "2. Extract the zip two times. You should see a file called flashall.bat or flashall_AFT.cmd." +
    "<pre>\n</pre>" +
    "3. Put phone into fastboot mode ( this is where you will see large green start text )" +
    "<pre>\n</pre>" +
    "4. Double Click on flashall.bat or flashall_AFT.cmd this should open up a cmd window. If it doesnt just run the file in cmd by typing flashall.bat or flashall_AFT.cmd" +
    "<pre>\n</pre>" +
    "5. Leave the phone for 20 minutes. It will restart when fully Flashed" +
    "<pre>\n</pre>" +
    "6. Turn of your phone when it reboots ( by holding power + both volume keys ) and run this command to lock <pre>fastboot oem asus-csc_lk</pre>" +
    "<pre>\n</pre>" +
    "7. You can do a factory reset" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_QMK_INLINE_OBJECT = {
    title: "QMK",
    notes: [
        {url:'https://www.youtube.com/watch?v=x6pWqjC39_I', text:'Custom RGB Animations'},
        {url:'https://www.youtube.com/watch?v=I5HsfuSsXSQ', text:'QMK calculator feature'},
        {url:'https://www.youtube.com/watch?v=1OD1ulmc71I&list=PLnn9-6POoRYjRVMKyUz1B_gH8U6bbUT_J&index=7', text:'QMK delete current word feature'},
        {url:'https://github.com/ArtiomSu/qmk_firmware/tree/artiom', text:'Github link Ergodox Ez QMK Layout'},
        {url:'https://github.com/ArtiomSu/qmk_firmware/tree/macropad_artiomsu', text:'Github link macropad QMK Layout'},
    ]
}


const NOTES_QMK = "<b>QMK</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=x6pWqjC39_I\">Custom RGB Animations</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=I5HsfuSsXSQ\">QMK calculator feature</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=1OD1ulmc71I&list=PLnn9-6POoRYjRVMKyUz1B_gH8U6bbUT_J&index=7\">QMK delete current word feature</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/qmk_firmware/tree/artiom\">Github link Ergodox Ez QMK Layout</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/qmk_firmware/tree/macropad_artiomsu\">Github link macropad QMK Layout</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_LINEAGE = "<b>Lineage Guides (Old)</b>" +
    "<pre>\n\n</pre>" +
    "<pre>\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=f7gZO9qn0gM\">How to install lineage os:</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=2byAysSYRIg\">How to root lineage os: </a>" +
    "<pre>\n" +
    "_______________________________________\n\n</pre>"+

    "<b>Flash using twrp</b>" +
    "<pre>\n"+
    "_______________________________________\n</pre>" +
    "1. Extract rom.zip" +
    "<pre>\n</pre>" +
    "2. Edit the metadata file in the META-INF ROM and overwriting pre-device=I001D with pre-device=WW_I001D" +
    "<pre>\n</pre>" +
    "3. Wipe data/internal after flash success." +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_FLASHING_SCRIPT_INLINE_OBJECT = {
    title: "RogPhone2Flasher",
    notes: [
        {url:'https://www.youtube.com/watch?v=-M_MJUzCuvM', text:'youtube video'},
        {url:'https://youtu.be/pvhuMtJstaU', text:'How to run on windows'},
        {url:'https://youtu.be/Hz2166j1zhE', text:'Dual boot'},
        {url:'https://github.com/ArtiomSu/RogPhone2Flasher', text:'Github'},
    ]
}

const NOTES_FLASHING_SCRIPT = "<b>RogPhone2Flasher</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=-M_MJUzCuvM\">youtube video</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/pvhuMtJstaU\">How to run on windows</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://youtu.be/Hz2166j1zhE\">Dual boot</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/RogPhone2Flasher\">Github</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_ROGPHONE2RGB_INLINE_OBJECT = {
    title: "Asus ROG Phone 2 RGB",
    notes: [
        {url:'https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB/releases', text:'Download From Github'},
        {url:'https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb', text:'Download From PlayStore'},
        {url:'https://www.youtube.com/watch?v=WONmNu35GFM', text:'Latest Guide'},
    ]
}


const NOTES_ROGPHONE2RGB = "<b>Asus ROG Phone 2 RGB</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB/releases\">Download From Github</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb\">Download From PlayStore</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=WONmNu35GFM\">Latest Guide</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_ROOT_INLINE_OBJECT = {
    title: "Rooting Guides",
    notes: [
        {url:'https://www.youtube.com/watch?v=uGdSWUK9vNw', text:'Magisk Patched boot method ( payload dumper )'},
        {url:'https://www.youtube.com/watch?v=pgqboLXMSuk', text:'Using TWRP to root'},
        {url:'https://www.youtube.com/watch?v=Jq3aCh5d8ng', text:'Rooting WearOS ( Ticwatch E )'},
    ]
}

const NOTES_ROOT = "<b>Rooting Guides</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uGdSWUK9vNw\">Magisk Patched boot method ( payload dumper )</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=pgqboLXMSuk\">Using TWRP to root</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=Jq3aCh5d8ng\">Rooting WearOS ( Ticwatch E )</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_CTS = "<b>Passing SafetyNet</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>\n" +
    "If you are using the old magisk manager then in magisk manager settings enable magisk hide and reboot"+
    "<pre>\n\n</pre>"+
    "For the new one enable Zygisk and enable Enforce DenyList. reboot then select Configure DenyList. At the top right click on show system apps. Search for gms and check everything that shows up"+
    "<pre>\n\n</pre>"+
    "<a href=\"https://www.youtube.com/watch?v=wXJzQcD1AdI\">Passing Safetynet with Zygisk</a>" +
    "<pre>\n\n</pre>" +
    "If the above doesn't work you can try using some safetynet fix magisk modules." +
    "<pre>\n" +
    "_______________________________________</pre>";

const DONATE = "<b>Donate</b>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://paypal.me/artiomSudo\">Paypal</a>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.patreon.com/user?u=28429069\">Patreon</a>"+
    "<pre>\n\n</pre>" +
    "<a href=\"https://play.google.com/store/apps/details?id=terminal_heat_sink.donateterminalheatsink\">Google Pay Billing App</a>"+
    "<pre>\n\n" +
    "        Crypto Currencies\n\n" +
    "BTC : 3McWRwH6sf3bBgtSXsGvta5nR1ZKLvoP6M \n\n" +
    "XMR : 8AgA9hRFbE69gaP5mBjB4y93J1MarAuyRRopN4SD5FLbGbrHB6GPc4ojZ2vAhD1zThFGboFqvumYKQ7xhRmJUMgdK3MdRE5 \n\n" +
    "LTC : Lh2EqWsGgNrHV5Wo28CoW1PbsseXZqpYeN \n\n" +
    "ETH : 0xcbdc5105efb30823e0b20492970b059e28242034 \n\n" +
    "DASH: XyGj3RP2MRqtFqyAg3p1RVFnet34juyd5H \n\n" +
    "        Thank you\n" +
    "</pre>";

const NOTES_CHANNELS_INLINE_OBJECT = {
    title: "Other Telegram Groups and Channels",
    notes: [
        {url:'https://t.me/ROGPhoneSeriesDiscussion', text:'Global Discussion group for ASUS ROG Phone series'},
        {url:'https://t.me/omnirog2', text:'Omni ROM for Rog 2'},
        {url:'https://t.me/msmrog2support', text:'MSM, Ancient, Bliss, Havoc Roms for Rog 2'},
        {url:'https://t.me/rogseriesgcam', text:'Google Cam for rog'},
        {url:'https://t.me/shady_mods_releases', text:'Shady Mods channel (best recents mod)'},
        {url:'https://t.me/rogphonevietnam2', text:'Vietnam Channel for rog phones (raw firmware and stuff)'},
    ]
}

const NOTES_CHANNELS = "<b>Other Telegram Groups and Channels</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/ROGPhoneSeriesDiscussion\">Global Discussion group for ASUS ROG Phone series</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/omnirog2\">Omni ROM for Rog 2</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/msmrog2support\">MSM, Ancient, Bliss, Havoc Roms for Rog 2</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/rogseriesgcam\">Google Cam for rog</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/shady_mods_releases\">Shady Mods channel (best recents mod)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/rogphonevietnam2\">Vietnam Channel for rog phones (raw firmware and stuff)</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_PROGRAMS_INLINE_OBJECT = {
    title: "Programs",
    notes: [
        {url:'https://t.me/c/1201136003/16', text:'Assassins Creed Valhala Auto Save Backup'},
        {url:'https://t.me/c/1201136003/40', text:'CyberDunk 2077 Auto Save Backup'},
        {url:'https://github.com/ArtiomSu/MoviePickerZSH', text:'MoviePicker'},
        {url:'https://github.com/ArtiomSu/Python-Troll-Server', text:'Python Troll Server'},
        {url:'https://github.com/ArtiomSu/kensington-expert-trackball-linux-config', text:'kensington expert trackball linux config'},
        {url:'https://github.com/ArtiomSu/Auto-Suspend-Current-Window', text:'Auto Suspend Current Window'},
        {url:'https://github.com/ArtiomSu/wabbajack-nexus-free-helper', text:'wabbajack nexus free helper'},
        {url:'https://github.com/ArtiomSu/TicWatch-All-In-One-Tool', text:'TicWatch E All In One Tool'},
        {url:'https://github.com/ArtiomSu/PS4-controller-arduino-scuff-mod', text:'PS4 controller arduino scuff mod'},
        {url:'https://github.com/ArtiomSu/Openvpn-connector-script-server', text:'Openvpn connector script'},
        {url:'https://github.com/ArtiomSu/Arduino_Custom_Multilayer_Mouse', text:'Arduino Custom Multilayer Mouse'},
        {url:'https://github.com/ArtiomSu/Python-key-sequence-app-restarter', text:'Python key sequence app restarter'},
        {url:'https://github.com/ArtiomSu/Steam-Pin-To-Start', text:'Steam Pin To Start'},
        {url:'https://github.com/ArtiomSu/PSP-Video-Converter-2020', text:'PSP Video Converter 2020'},
        {url:'https://github.com/ArtiomSu/qmk_to.html', text:'QMK to HTML table web app. handy for printing layout'},
        {url:'https://github.com/ArtiomSu/ly-display-manager', text:'My fork of ly display manager (coolest display manager ever)'},
        {url:'https://github.com/ArtiomSu/selenium_skribbl_io_bot', text:'skribbl io bot'},
    ]
}

const NOTES_PROGRAMS = "<b>Programs</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/16\">Assassins Creed Valhala Auto Save Backup</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/40\">CyberDunk 2077 Auto Save Backup</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/MoviePickerZSH\">MoviePicker</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Python-Troll-Server\">Python Troll Server</a>" +

    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/kensington-expert-trackball-linux-config\">kensington expert trackball linux config</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Auto-Suspend-Current-Window\">Auto Suspend Current Window</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/wabbajack-nexus-free-helper\">wabbajack nexus free helper</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/TicWatch-All-In-One-Tool\">TicWatch E All In One Tool</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/PS4-controller-arduino-scuff-mod\">PS4 controller arduino scuff mod</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Openvpn-connector-script-server\">Openvpn connector script</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Arduino_Custom_Multilayer_Mouse\">Arduino Custom Multilayer Mouse</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Python-key-sequence-app-restarter\">Python key sequence app restarter</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/Steam-Pin-To-Start\">Steam Pin To Start</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/PSP-Video-Converter-2020\">PSP Video Converter 2020</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/qmk_to.html\">QMK to HTML table web app. handy for printing layout</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/ly-display-manager\">My fork of ly display manager (coolest display manager ever)</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://github.com/ArtiomSu/selenium_skribbl_io_bot\">skribbl io bot</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_CUSTOM_BOOT_ANIMATION_INLINE_OBJECT = {
    title: "Custom Boot Animations",
    notes: [
    {url:'https://t.me/c/1201136003/15', text:'Matrix Boot Animation'},
    {url:'https://t.me/c/1201136003/14', text:'Make Your Own Custom Boot Animation Template'},
    {url:'https://t.me/c/1201136003/12', text:'One Plus 8t CyberPunk Boot Animations Preview'},
    {url:'https://t.me/c/1201136003/9', text:'One Plus 8t CyberPunk Boot Animations Download'},
    ]
}

const NOTES_CUSTOM_BOOT_ANIMATION = "<b>Custom Boot Animations</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/15\">Matrix Boot Animation</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/14\">Make Your Own Custom Boot Animation Template</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/12\">One Plus 8t CyberPunk Boot Animations Preview</a>" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://t.me/c/1201136003/9\">One Plus 8t CyberPunk Boot Animations Download</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_UNBRICK = "<b>Unbrick</b>" +
    "<pre>\n\n"+
    "_______________________________________\n</pre>" +
    "You will need to use a program called miflash and you will need to be able to get into edl mode. This can be done using an edl cable bought from a legitimate website or you can make your own by stripping a usb 2 cable" +
    "<pre>\n\n</pre>" +
    "<a href=\"https://www.youtube.com/watch?v=uONJrZrHWxI\">Click Here For Video Guide</a>" +
    "<pre>\n" +
    "_______________________________________</pre>";

const NOTES_FASTBOOT_NO_DETECT = "<b>Fastboot not detecting</b>" +
"<pre>\n"+
"_______________________________________\n\n</pre>" +
"<b>Steps for Windows Normies</b>" +
"<pre>\n\n</pre>" +
"1. Use the side port on the phone" +
"<pre>\n\n</pre>" +
"2. Try using different USB cables" +
"<pre>\n\n</pre>" +
"3. Try using different USB ports on PC" +
"<pre>\n\n</pre>" +
"4. Download and install <a href=\"https://forum.xda-developers.com/t/official-tool-windows-adb-fastboot-and-drivers-15-seconds-adb-installer-v1-4-3.2588979/\">15 second adb and fastboot drivers</a>" +
"<pre>\n\n</pre>" +
"5. Go into windows update and install any additional drivers/updates available" +
"<pre>\n\n</pre>" +
"6. Try with another pc" +
"<pre>\n\n</pre>" +
"7. Install Linux and live a happy life" +
"<pre>\n\n</pre>" +

"<b>Steps for Linux Chads</b>" +
"<pre>\n\n</pre>" +
"1. If on Arch based distro <pre>sudo pacman -S android-tools</pre>" +
"<pre>\n\n</pre>" +
"2. If on Debian/Ubuntu based distro <pre>sudo apt update && sudo apt install android-tools-adb android-tools-fastboot -y</pre>" +
"<pre>\n\n</pre>" +
"<pre>_______________________________________</pre>";   

const NOTES_MY_ROG_PHONE_2_SETUP = "<b>Personal Rog Phone 2 Setup</b>" +
"<pre>\n"+
"_______________________________________\n\n</pre>" +
"<b>ROM</b>" +
"<pre>\n\n</pre>" +
"Latest Omni android 12" +
"<pre>\n\n</pre>" +

"<b>Launcher</b>" +
"<pre>\n\n</pre>" +
"Smart Launcher 5 with Azure theme and Viral icon pack" +
"<pre>\n\n</pre>" +

"<b>Magisk Modules</b>" +
"<pre>\n\n</pre>" +
"1. ACC" +
"<pre>\n\n</pre>" +
"2. Zygisk LSPOSED" +
"<pre>\n\n</pre>" +
"3. ClearLineage" +
"<pre>\n\n</pre>" +
"4. omni-asus-services-disabler (my own module)" +
"<pre>\n\n</pre>" +
"5. Terminal Heat Sinks custom cyberpunk boot animation (my own module)" +
"<pre>\n\n</pre>" +
"6. Basic Call Recorder by chenxiaolong" +
"<pre>\n\n</pre>" +

"<b>LSPOSED Modules</b>" +
"<pre>\n\n</pre>" +
"1. Classic Power Menu" +
"<pre>\n\n</pre>" +
"2. XprivacyLua" +
"<pre>\n\n</pre>" +

"<pre>_______________________________________</pre>";   

const NOTES = "<b>Notes</b>" +
    "<pre>\n</pre>"+
    "To see the notes just type one of the following into the chat"+
    "<pre>\n_______________________________________\n</pre>" +
    "<pre>/notes\n\n</pre>" +

    "( sick shortcut for notes so you dont have to type them out (uses custom keyboard) )" +
    "<pre>\n</pre>"+
    "<pre>/n\n\n</pre>" +

    "<pre>/donate\n\n</pre>" +

    "( report bois by replying this to their message )" +
    "<pre>\n</pre>"+
    "<pre>/report\n\n</pre>" +

    "( essentially all rog phone 2 guides )" +
    "<pre>\n</pre>"+
    "<pre>/rogphone2\n\n</pre>" +

    "<pre>/rogphone2rgb\n\n</pre>" +

    "( dual boot script for rog 2 )" +
    "<pre>\n</pre>"+
    "<pre>/flasher\n\n</pre>" +

    "( flashing raw )" +
    "<pre>\n</pre>"+
    "<pre>/raw\n\n</pre>" +

    "( relock the bootloader )" +
    "<pre>\n</pre>"+
    "<pre>/relock\n\n</pre>" +

    "<pre>/apps\n\n</pre>" +
    "<pre>/root\n\n</pre>" +
    "<pre>/safetynet\n\n</pre>" +
    "<pre>/psvita\n\n</pre>" +

    "( keyboard custom firmware )" +
    "<pre>\n</pre>"+
    "<pre>/qmk\n\n</pre>" +

    "<pre>/unbrick\n\n</pre>" +
    "<pre>/lineage\n\n</pre>" +
    "<pre>/fastboot_no_detect\n\n</pre>" +
    "<pre>/my_rog_phone_setup\n\n</pre>" +

    "( Telegram Channels and groups that you will find interesting )" +
    "<pre>\n</pre>"+
    "<pre>/channels\n\n</pre>" +
    "<pre>/programs\n\n</pre>" +
    "<pre>/boot_animations\n\n</pre>" +

    "( old pinned message (handy if you are following a youtube vid and I posted something here) )" +
    "<pre>\n</pre>"+
    "<pre>/all\n</pre>" +
    "<pre>" +
    "_______________________________________</pre>";

const NOTES_DICTIONARY = {
    '/donate':DONATE,
    '/notes':NOTES,
    '/rogphone2rgb':NOTES_ROGPHONE2RGB_INLINE_OBJECT,
    '/rogphone2':NOTES_ROG_PHONE_2_GUIDES_INLINE_OBJECT,
    '/raw':NOTES_RAW,
    '/apps':NOTES_APPS_INLINE_OBJECT,
    '/psvita':NOTES_PSVITA_INLINE_OBJECT,
    '/qmk':NOTES_QMK_INLINE_OBJECT,
    '/lineage':NOTES_LINEAGE,
    '/flasher':NOTES_FLASHING_SCRIPT_INLINE_OBJECT,
    '/root':NOTES_ROOT_INLINE_OBJECT,
    '/relock':NOTES_RELOCK,
    '/safetynet':NOTES_CTS,
    '/channels': NOTES_CHANNELS_INLINE_OBJECT,
    '/programs': NOTES_PROGRAMS_INLINE_OBJECT,
    '/boot_animations': NOTES_CUSTOM_BOOT_ANIMATION_INLINE_OBJECT,
    '/unbrick': NOTES_UNBRICK,
    '/fastboot_no_detect': NOTES_FASTBOOT_NO_DETECT,
    '/my_rog_phone_setup': NOTES_MY_ROG_PHONE_2_SETUP
};

const NOTES_KEYWORDS_AUTO_HELP_DICTIONARY = {
    '/rogphone2rgb':["rgb"],
    '/fastboot_no_detect': ["not detect"],
    '/raw':["flash raw", "raw", "bootloader"],
    '/unbrick': ["brick"],
    '/qmk':["qmk", "keyboard"],
    '/lineage':["lineage"],
    '/flasher':["flasher", "dual boot"],
    '/root':["root", "twrp"],
    '/relock':["lock"],
    '/safetynet':["cts", "safety net", "safetynet"],
    '/channels': ["channel"],
    '/programs': ["programs"],
    '/boot_animations': ["animation"],
    '/rogphone2':["rog phone 2", "rog 2", "rog"],
    '/donate':["donate"],
    '/notes':["notes"],
    '/apps':["apps"],
    '/psvita':["psvita"],
    '/my_rog_phone_setup': ["what is your rog phone 2 setup"]
};

const NOTES_KEYWORDS_AUTO_HELP_TRIGGER = [
    "help", "how", "download", "want", "problem"
];

module.exports = {
    HELP_PAGE_TORRENT: help_page,
    HELP_PAGE_MAIN: help_page_main,
    HELP_PAGE_PERMISSIONS: help_page_permissions,
    HELP_PAGE_ADMIN: HELP_PAGE_ADMIN,
    DONATE: DONATE,
    NOTES: NOTES,
    NOTES_ROG_PHONE_2_GUIDES: NOTES_ROG_PHONE_2_GUIDES_INLINE_OBJECT,
    NOTES_APPS: NOTES_APPS_INLINE_OBJECT,
    NOTES_PSVITA: NOTES_PSVITA_INLINE_OBJECT,
    NOTES_RAW: NOTES_RAW,
    NOTES_QMK: NOTES_QMK_INLINE_OBJECT,
    NOTES_LINEAGE: NOTES_LINEAGE,
    NOTES_FLASHING_SCRIPT: NOTES_FLASHING_SCRIPT_INLINE_OBJECT,
    NOTES_ROGPHONE2RGB: NOTES_ROGPHONE2RGB_INLINE_OBJECT,
    NOTES_RELOCK: NOTES_RELOCK,
    NOTES_ROOT: NOTES_ROOT_INLINE_OBJECT,
    NOTES_CTS: NOTES_CTS,
    NOTES_DICTIONARY: NOTES_DICTIONARY,
    NOTES_CHANNELS: NOTES_CHANNELS_INLINE_OBJECT,
    NOTES_PROGRAMS: NOTES_PROGRAMS_INLINE_OBJECT,
    NOTES_CUSTOM_BOOT_ANIMATION: NOTES_CUSTOM_BOOT_ANIMATION_INLINE_OBJECT,
    NOTES_UNBRICK: NOTES_UNBRICK,
    NOTES_KEYWORDS_AUTO_HELP_DICTIONARY: NOTES_KEYWORDS_AUTO_HELP_DICTIONARY,
    NOTES_KEYWORDS_AUTO_HELP_TRIGGER: NOTES_KEYWORDS_AUTO_HELP_TRIGGER
};