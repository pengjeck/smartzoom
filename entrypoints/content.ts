import zoom from './zoom'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const zoom_op = zoom(document)

    let lastRightClickedElement: EventTarget | null = null;
    document.addEventListener('contextmenu', function (event) {
      lastRightClickedElement = event.target;
    })

    document.addEventListener('keyup', function(event) {
      console.log("keypress key=", event.key)
      if (event.key === 'Escape') {
        zoom_op.out({})
      }
    })

    browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        console.log(request)
        if (request.action === "zoomIn" && lastRightClickedElement) {
          if (lastRightClickedElement && lastRightClickedElement instanceof HTMLElement) {
            zoom_op.to({
              element: lastRightClickedElement,
            })
          } else {
            console.error("No valid element selected")
          }
        }
      }
    );
  },
});
