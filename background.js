chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explainCode",
    title: "Explain Code",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async(info, tab) => {
    console.log(info.selectionText);
    await chrome.sidePanel.open({tabId:tab.id});
   
    setTimeout(() => {
    chrome.runtime.sendMessage({ action: "selectedText", selectedText: info.selectionText });
}, 500);
});