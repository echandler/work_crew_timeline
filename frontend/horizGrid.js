(function() {
    var defaultCssText = document.body.style.cssText;
    var body = document.body;

    (function() {
        var button = document.createElement("button");
        var lineHeight = "1.5rem";
        button.innerText = "H Grid";

        button.style.cssText = "position: absolute; top: 0px; padding: 0.2em;";
        button.onclick = function() {
            if (body.style.cssText.indexOf("linear-gradient") === -1) {
                body.style.cssText += `
                    background: linear-gradient(rgba(255, 0, 0, 0.15),
                                rgba(255, 0, 0, 0.15) 1px, transparent 1px);
                    background-size: 1px ${lineHeight};
                `;
            } else {
                body.style.cssText = defaultCssText;
            }
        };
        body.appendChild(button);
        button.click();
    })();
})();