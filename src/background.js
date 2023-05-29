// Activates when extension is first installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

var url = "";
// Activates when Omnibox is used
chrome.omnibox.onInputEntered.addListener(function (text) {
  // Test if URL is valid
  if (
    /^(?:https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/.test(
      text
    )
  ) {
    url =
      text.startsWith("http://") || text.startsWith("https://")
        ? text
        : "http://" + text;
  } else {
    url = "https://www.google.com/search?q=" + text;
  }

  // Encoding Settings
  chrome.storage.sync.get(
    {
      encoding: "default",
    },
    function (items) {
      switch (items.encoding) {
        // Open requested URL
        case "default":
          chrome.tabs.create({
            url: "https://browse.projectocasta.org/main/" + url,
          });
          break;
        case "b64":
          url = btoa(url);
          chrome.tabs.create({
            url: "https://browse.projectocasta.org/b64/" + url,
          });
          break;
      }
    }
  );
});
