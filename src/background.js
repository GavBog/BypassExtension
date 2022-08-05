// Activates when extension is first installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});

var url = "";
// Activates when Omnibox is used
chrome.omnibox.onInputEntered.addListener(function (text) {
    // Test if url is valid
    if (/^https?:\/\/?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(text)) {
        url = text;
    } else if (/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(text)) {
        url = "http://" + text;
    } else {
        url = "https://www.google.com/search?q=" + text;
    }

    // Open new tab with url
    chrome.tabs.create({ url: "https://browse.projectocasta.org/main/" + url });
});