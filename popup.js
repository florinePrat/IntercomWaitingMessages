let inputMessage = document.getElementById('getInputMessage');
var paused = false;

inputMessage.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file : "main.js"});
    });

};

let pauseMode = document.getElementById('startPause');


pauseMode.onclick = function(element) {
    paused=!paused;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,{code : 'var paused = '+ paused}, function () {
            chrome.tabs.executeScript(tabs[0].id,{file : "pauseMode.js"})
        });
    });
};

