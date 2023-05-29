function save_options() {
  var encoding = document.getElementById("encoding").value;
  chrome.storage.sync.set(
    {
      encoding: encoding,
    },
    function () {
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}
function restore_options() {
  chrome.storage.sync.get(
    {
      encoding: "default",
    },
    function (items) {
      document.getElementById("encoding").value = items.encoding;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
