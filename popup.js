let inputMessageFR = document.getElementById('getInputMessageFR');
let inputMessageEN = document.getElementById('getInputMessageEN');
var paused = false;

inputMessageFR.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,{code : 'var lang = "FR"'}, function () {
            chrome.tabs.executeScript(tabs[0].id, {file: "main.js"});
        });
    });
};
inputMessageEN.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id,{code : 'var lang = "EN"'}, function () {
            chrome.tabs.executeScript(tabs[0].id, {file: "main.js"});
        });
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

