(function () {
  var grid = document.getElementById("gallery-grid");
  var emptyMsg = document.getElementById("gallery-empty");
  var filterBtns = document.querySelectorAll(".filter-btn");
  var searchInput = document.getElementById("gallery-search");

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".gallery-card"));
  var codeDetails = Array.prototype.slice.call(grid.querySelectorAll(".card-code-details"));
  var activeType = "all";
  var activeQuery = "";

  function normalize(str) {
    return (str || "").toLowerCase();
  }

  function cardMatchesType(card) {
    if (activeType === "all") return true;
    return card.dataset.type === activeType;
  }

  function cardMatchesQuery(card) {
    if (!activeQuery) return true;
    var haystack = [
      card.dataset.name,
      card.dataset.title,
      card.dataset.description,
      card.dataset.tags,
      card.dataset.type
    ].join(" ");
    return normalize(haystack).indexOf(activeQuery) !== -1;
  }

  function applyFilters() {
    var visible = 0;

    cards.forEach(function (card) {
      var show = cardMatchesType(card) && cardMatchesQuery(card);
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (emptyMsg) {
      emptyMsg.style.display = visible === 0 ? "" : "none";
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeType = btn.dataset.type || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeQuery = normalize(searchInput.value.trim());
      applyFilters();
    });
  }

  codeDetails.forEach(function (details) {
    details.addEventListener("toggle", function () {
      if (!details.open) return;

      codeDetails.forEach(function (other) {
        if (other !== details) {
          other.open = false;
        }
      });
    });
  });

  applyFilters();
})();
