//When on same page update in real time
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.attributeKey == "hide_autoplay")
    {
        updateAutoplay();
    }
    return true;
});


//When refreshed or navigated
function updateAutoplay() {
    chrome.storage.local.get(["hide_autoplay"], function(result) {
        if(result["hide_autoplay"] == undefined || result["hide_autoplay"] == false)
        {
            let label = "off";
            let oppositeLabel = "on"
            toggleAutoplayButton(label, oppositeLabel)
        }
        else
        {
            let label = "on";
            let oppositeLabel = "off"
            toggleAutoplayButton(label, oppositeLabel)
        }
    })
}

function toggleAutoplayButton(label, oppositeLabel) {
    let autoplayButton = window.document.querySelector("button.ytp-button[data-tooltip-target-id='ytp-autonav-toggle-button']" ); // get the button
    let autoplayPeriodCheck = window.setInterval(function(window) {
        if (autoplayButton.getAttribute("aria-label") == "Autoplay is " + label) {
            autoplayButton.click();
        }
        if (autoplayButton.getAttribute("aria-label") == "Autoplay is " + oppositeLabel) {
            window.clearInterval(autoplayPeriodCheck);
        }
    }, 1000, window);
}

updateAutoplay();