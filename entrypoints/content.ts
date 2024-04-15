import zoom from './zoom'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const zoom_op = zoom(document)

    let zoomed = false;
    let lastRightClickedElement: EventTarget | null = null;
    document.addEventListener('contextmenu', function (event) {
      lastRightClickedElement = event.target;
    })

    document.addEventListener('keyup', function(event) {
      console.log("keypress key=", event.key)
      if (zoomed && event.key === 'Escape') {
        zoom_op.out({})
        zoomed = false;
        event.stopImmediatePropagation();
      }
    })

    document.addEventListener('keydown', function(event) {
      if (zoomed && event.key === 'Escape') {
        event.stopImmediatePropagation();
      }
    })

    document.addEventListener('keypress', function(event) {
      if (zoomed && event.key === 'Escape') {
        event.stopImmediatePropagation();
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
            zoomed = true;
          } else {
            console.error("No valid element selected")
          }
        }
      }
    );
  },
});
