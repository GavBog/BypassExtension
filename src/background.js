// Activates when extension is first installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});

var url = "";
// Activates when Omnibox is used
chrome.omnibox.onInputEntered.addListener(function (text) {
    // Test if url is valid
    if (/^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/.test(text)) {
        url = text;
    } else {
        url = "https://www.google.com/search?q=" + text;
    }

    // Open new tab with url
    chrome.tabs.create({ url: "https://browse.projectocasta.org/main/" + url });
});