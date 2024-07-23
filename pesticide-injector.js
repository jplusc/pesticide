(function() {
  'use strict';

  function toggleAssets() {
    var pesticideCSS = document.getElementById("pesticideCSS");
    var pesticideJS = document.getElementById("pesticideJS");
    var pesticideResult = document.getElementById("pesticide-for-chrome-result");

    if (pesticideCSS && pesticideJS && pesticideResult) {
      console.log('pesticide OFF.');
      pesticideCSS.remove();
      pesticideJS.remove();
      pesticideResult.remove();
    } else {
      console.log('pesticide ON.');
      pesticideCSS = document.createElement("link");
      pesticideCSS.rel = "stylesheet";
      pesticideCSS.type = "text/css";
      pesticideCSS.href = chrome.runtime.getURL("pesticide.min.css");
      pesticideCSS.id = "pesticideCSS";
      document.head.appendChild(pesticideCSS);

      pesticideJS = document.createElement("script");
      pesticideJS.type = "text/javascript";
      pesticideJS.src = chrome.runtime.getURL("pesticide.js");
      pesticideJS.id = "pesticideJS";
      document.head.appendChild(pesticideJS);

      pesticideResult = document.createElement("div");
      pesticideResult.id = "pesticide-for-chrome-result";
      document.body.appendChild(pesticideResult);
    }
  }

  // Ensure the function is executed only once 
  if (!window.pesticideInjected) {
    console.log('injecting pesticide...');
    window.pesticideInjected = true;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggle') {
        toggleAssets();
      }
    });
  }

})();
