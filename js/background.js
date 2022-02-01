chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create(
        {
            url: "https://github.com/Srinivasareddy2018/Feedider"
        }, function () {   }
    );
});