console.log("Content Script is Running")
const HTML = document.documentElement;

let menu = {
    "hide_feed": {name: "Hide Home Page Feed"},
    "hide_home_page_left_sidebar": {name: "Hide Home Left Sidebar"},
    "hide_sidebar": {name: "Hide Video Right Sidebar"},
    "hide_comments": {name: "Hide Comments"},
    "hide_end_screen_feed": {name: "Hide Video End Feed"},
    "hide_end_screen_video_cards": {name: "Hide Video End Cards"},
    "hide_best_of_youtube": {name: "Hide Best of Youtube"},
    "hide_explore": {name: "Hide Explore Button"},
    "hide_subscriptions": {name: "Hide Subscriptions Button"},
    "hide_search_suggestions": {name: "Hide Search Suggestions"},
    "hide_people_also_watched": {name: "Hide People also Watched"},
    "hide_like_button": {name: "Hide Like Button"},
    "hide_dislike_button": {name: "Hide Dislike Button"},
    "hide_playlist": {name: "Hide Playlist"},
    "hide_mixes" : {name: "Hide Mixes"},
    "hide_autoplay": {name: "Disable Autoplay"},
    "hide_description": {name: "Hide Video Description"}
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    HTML.setAttribute(request.attributeKey, request.attributeValue)
    return true;
});

Object.keys(menu).forEach((menuItemKey) => {
    chrome.storage.local.get([menuItemKey], function(result) {
        if(result[menuItemKey] == undefined || result[menuItemKey] == false)
        {
            HTML.setAttribute(menuItemKey, false)
        }
        else
        {
            HTML.setAttribute(menuItemKey, true)
        }
    })
});