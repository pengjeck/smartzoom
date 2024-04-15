export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "zoomIn",
      title: "放大",
      contexts: ['all']
    })
  })

  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "zoomIn" && tab !== undefined && tab.id !== undefined) {
      browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        if (tabs == undefined || tabs.length == 0 || tabs[0].id == undefined) return
        console.log("send message to zoomIn")
        browser.tabs.sendMessage(tabs[0].id, { action: "zoomIn" });
      })

    }
  })
  console.log('Hello background!', { id: browser.runtime.id });
});
