export default defineContentScript({
  matches: ['<all_urls>'],

  main() {
    browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        if (request.action === "zoomIn") {
          document.body.style.transform = "scale(1.5)";
          document.body.style.transformOrigin = "center";
        }
      }
    );
  },
});
