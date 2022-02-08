console.log("Content Script is Running")
const HTML = document.documentElement;

let menu = {
    "hide_feed": {name: "Home Page Feed"},
    "hide_home_page_left_sidebar": {name: "Left Sidebar"},
    "hide_sidebar": {name: "Video Right Sidebar"},
    "hide_comments": {name: "Comments"},
    "hide_end_screen_feed": {name: "Video End Feed"},
    "hide_end_screen_video_cards": {name: "Video End Cards"},
    "hide_best_of_youtube": {name: "Best of Youtube"},
    "hide_explore": {name: "Explore Button"},
    "hide_subscriptions": {name: "Subscriptions Button"},
    "hide_search_suggestions": {name: "Search Suggestions"},
    "hide_people_also_watched": {name: "People also Watched"},
    "hide_like_button": {name: "Like Button"},
    "hide_dislike_button": {name: "Dislike Button"},
    "hide_mixes": {name: "Hide Mixes"},
    "hide_description": {name: "Description"}
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