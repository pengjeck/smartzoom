export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "zoomIn",
      title: "zoomIn",
      contexts: ['all']
    })
  })

  browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log("info", info)
    if (info.menuItemId === "zoomIn" && tab !== undefined && tab.id !== undefined) {
      browser.tabs.sendMessage(tab.id, { action: "zoomIn", tmp: "123", targetElementId: info.targetElementId });
    }
  })
  console.log('Hello background!', { id: browser.runtime.id });
});
