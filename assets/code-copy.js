(function () {
  function isStandaloneCodeBlock(block) {
    return !block.closest(".card-code");
  }

  function getCopyTarget(block) {
    return block.querySelector("pre code") || block.querySelector("code");
  }

  function showCopiedState(button) {
    var originalLabel = button.getAttribute("data-label") || "Copy";
    button.textContent = "Copied";
    button.classList.add("is-copied");

    window.setTimeout(function () {
      button.textContent = originalLabel;
      button.classList.remove("is-copied");
    }, 1600);
  }

  function addCopyButton(block) {
    if (block.dataset.copyReady === "true") return;

    var code = getCopyTarget(block);
    if (!code) return;

    block.dataset.copyReady = "true";
    block.classList.add("code-copy-block");

    var button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-button";
    button.textContent = "Copy";
    button.setAttribute("data-label", "Copy");
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", function () {
      var text = code.innerText.replace(/\n$/, "");

      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        return;
      }

      navigator.clipboard.writeText(text).then(function () {
        showCopiedState(button);
      });
    });

    block.appendChild(button);
  }

  function initCodeCopyButtons() {
    document.querySelectorAll(".card-code").forEach(addCopyButton);

    document
      .querySelectorAll(".highlighter-rouge, pre.highlight")
      .forEach(function (block) {
        if (isStandaloneCodeBlock(block)) {
          addCopyButton(block);
        }
      });
  }

  // Re-run when <details> elements are opened (gallery cards use <details>)
  document.addEventListener("toggle", function (event) {
    if (event.target && event.target.tagName === "DETAILS" && event.target.open) {
      event.target.querySelectorAll(".card-code").forEach(addCopyButton);

      event.target
        .querySelectorAll(".highlighter-rouge, pre.highlight")
        .forEach(function (block) {
          if (isStandaloneCodeBlock(block)) {
            addCopyButton(block);
          }
        });
    }
  }, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCodeCopyButtons);
  } else {
    initCodeCopyButtons();
  }
})();
