import { Tabs } from "wxt/browser";

export default defineBackground({
  main() {
    browser.commands.onCommand.addListener(function (command, tab: Tabs.Tab | undefined) {
      if (tab == undefined || tab.id == undefined) {
        return
      }

      if (command === "zoomAction") {
        console.log('Command + A is triggered!');
        browser.tabs.sendMessage(tab.id, {
          action: "zoomIn"
        })
      }
    });
  }
})