const HTML = document.documentElement;

let menu = {
    "hide_feed": {name: "Hide Home Page Feed"},
    "hide_home_page_left_sidebar": {name: "Hide Home Left Sidebar"},
    "hide_sidebar": {name: "Hide Video Right Sidebar"},
    "hide_thumbnail": {name : "Hide Thumbnail"},
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

//Create Buttons Dynamically
function createListItem(menuItemKey) {
    let listItem = document.createElement("li");
    let label = document.createElement("label");
    let labelSpan = document.createElement("span");
    let labelInput = document.createElement("input");
    let labelDiv = document.createElement("div");

    label.className = "switch";
    labelSpan.innerText = menu[menuItemKey].name;
    labelInput.type = "checkbox";
    labelInput.id = menuItemKey
    labelDiv.className = "slider";

    label.appendChild(labelSpan);
    label.appendChild(labelInput);
    label.appendChild(labelDiv);

    listItem.appendChild(label);

    return listItem;
}

let ul = document.createElement("ul");
const menuDiv = document.querySelector("#menu");
Object.keys(menu).forEach((menuItemKey) => {
    ul.appendChild(createListItem(menuItemKey))
})
menuDiv.appendChild(ul);

//update toggle switch status when popup opened
Object.keys(menu).forEach((menuItemKey) => {
    chrome.storage.local.get([menuItemKey], function(result) {
        let menuItem = document.getElementById(menuItemKey);
        if(result[menuItemKey] === undefined || result[menuItemKey] === false)
        {
            console.log("removed")
            menuItem.removeAttribute("checked")
        }
        else
        {
            console.log("added")
            menuItem.setAttribute("checked", "true")
        }
    })
});

//Add Event Listener and Save to Storage when clicked
Object.keys(menu).forEach(menuItemKey => {
    let menuItem = document.getElementById(menuItemKey);
    menuItem.addEventListener("click", function() {

        //Save to local storage
        chrome.storage.local.set({[menuItemKey]: menuItem.checked}, () => {
            console.log(menuItemKey)
            console.log(menuItem.checked)
        })
        updatePage(menuItemKey, menuItem.checked)
    })
})

//Update Youtube Page Content
function updatePage(attributeKey, attributeValue)
{
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
            if(tab.url.indexOf("youtube.com") > -1)
            {
                chrome.tabs.sendMessage(tab.id, {
                    "attributeKey": attributeKey,
                    "attributeValue": attributeValue
                });
            }
        })
    });
}