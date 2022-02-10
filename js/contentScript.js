import menu from "./menu.js"

console.log("Content Script is Running")
const HTML = document.documentElement;

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