(function () {
  var grids = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-grid, .category-grid")
  );
  var galleryStateKey = "__galleryState";

  if (!grids.length) return;

  function normalize(str) {
    return (str || "").toLowerCase();
  }

  function slugify(str) {
    return normalize(str)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function parseHash() {
    var match = window.location.hash.match(/^#item=(.+)$/);
    if (!match) return null;

    try {
      return decodeURIComponent(match[1]);
    } catch (err) {
      return null;
    }
  }

  function setHash(itemId) {
    var nextUrl = window.location.pathname + window.location.search;
    if (itemId) {
      nextUrl += "#item=" + encodeURIComponent(itemId);
    }
    return nextUrl;
  }

  function restoreScroll(scrollY) {
    if (typeof scrollY !== "number") return;

    window.requestAnimationFrame(function () {
      window.scrollTo(0, scrollY);
    });
  }

  function setupGallery(grid, index) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".gallery-card"));
    var emptyMsg = document.getElementById("gallery-empty");
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
    var searchInput = document.getElementById("gallery-search");
    var showMoreWrap = document.createElement("div");
    var showMoreButton = document.createElement("button");
    var initialVisibleCount = 12;
    var gridId = grid.id || "gallery-" + index;
    var activeType = "all";
    var activeQuery = "";
    var isolatedItemId = null;
    var visibleCount = initialVisibleCount;
    var knownIds = {};

    if (!cards.length) return;

    showMoreWrap.className = "gallery-more";
    showMoreButton.type = "button";
    showMoreButton.className = "gallery-more-btn";
    showMoreButton.textContent = "Show more";
    showMoreWrap.appendChild(showMoreButton);
    grid.parentNode.insertBefore(showMoreWrap, grid.nextSibling);

    cards
      .slice()
      .sort(function (a, b) {
        var titleA = normalize(a.dataset.title || a.textContent);
        var titleB = normalize(b.dataset.title || b.textContent);
        return titleA.localeCompare(titleB);
      })
      .forEach(function (card) {
        grid.appendChild(card);
      });

    cards = Array.prototype.slice.call(grid.querySelectorAll(".gallery-card"));

    cards.forEach(function (card, cardIndex) {
      var baseId = card.dataset.galleryId || slugify(
        [
          card.dataset.type || "",
          card.dataset.name || "",
          card.dataset.title || "",
          card.querySelector(".card-title") ? card.querySelector(".card-title").textContent : ""
        ].join("-")
      ) || "item-" + cardIndex;
      var uniqueId = baseId;
      var suffix = 2;

      while (knownIds[uniqueId]) {
        uniqueId = baseId + "-" + suffix;
        suffix += 1;
      }

      knownIds[uniqueId] = true;
      card.dataset.galleryId = uniqueId;
      card.classList.add("gallery-card--interactive");

      var closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "gallery-card-close";
      closeButton.setAttribute("aria-label", "Back to gallery");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (
          history.state &&
          history.state[galleryStateKey] &&
          history.state[galleryStateKey].gridId === gridId &&
          history.state[galleryStateKey].view === "item"
        ) {
          window.history.back();
          return;
        }

        isolatedItemId = null;
        applyState();
        window.history.replaceState(
          buildHistoryState("grid"),
          "",
          setHash(null)
        );
      });

      card.insertBefore(closeButton, card.firstChild);
    });

    function getCardById(itemId) {
      return cards.find(function (card) {
        return card.dataset.galleryId === itemId;
      }) || null;
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
        card.dataset.type,
        card.textContent
      ].join(" ");
      return normalize(haystack).indexOf(activeQuery) !== -1;
    }

    function setActiveFilterButton(type) {
      filterBtns.forEach(function (btn) {
        btn.classList.toggle("active", (btn.dataset.type || "all") === type);
      });
    }

    function buildHistoryState(view) {
      return {
        galleryPath: window.location.pathname,
        [galleryStateKey]: {
          gridId: gridId,
          view: view,
          activeType: activeType,
          activeQuery: activeQuery,
          visibleCount: visibleCount,
          isolatedItemId: isolatedItemId,
          scrollY: window.scrollY
        }
      };
    }

    function syncCurrentHistoryState() {
      if (!window.history.replaceState) return;

      var currentUrl = isolatedItemId ? setHash(isolatedItemId) : setHash(null);
      window.history.replaceState(
        buildHistoryState(isolatedItemId ? "item" : "grid"),
        "",
        currentUrl
      );
    }

    function applyState() {
      var isolatedCard = isolatedItemId ? getCardById(isolatedItemId) : null;
      var showIsolated = Boolean(isolatedCard);
      var filteredCards = cards.filter(function (card) {
        return cardMatchesType(card) && cardMatchesQuery(card);
      });
      var effectiveVisibleCount = Math.min(visibleCount, filteredCards.length);

      grid.classList.toggle("gallery-grid--isolated", showIsolated);
      showMoreWrap.style.display = !showIsolated && filteredCards.length > effectiveVisibleCount ? "" : "none";
      showMoreButton.textContent = "Show " + Math.min(initialVisibleCount, filteredCards.length - effectiveVisibleCount) + " more";

      cards.forEach(function (card) {
        var show = showIsolated
          ? card === isolatedCard
          : filteredCards.indexOf(card) >= 0 && filteredCards.indexOf(card) < effectiveVisibleCount;
        var codeBlock = card.querySelector(".card-code");

        card.style.display = show ? "" : "none";
        card.classList.toggle("gallery-card--isolated", showIsolated && card === isolatedCard);

        if (codeBlock) {
          var isVisibleCode = showIsolated && card === isolatedCard;
          codeBlock.classList.toggle("card-code--visible", isVisibleCode);

          if (isVisibleCode && window.addCodeCopyButton) {
            window.addCodeCopyButton(codeBlock);
          }
        }

      });

      if (emptyMsg) {
        emptyMsg.style.display = !showIsolated && filteredCards.length === 0 ? "" : "none";
      }
    }

    function restoreGridState(state, options) {
      var nextState = state || {};
      var shouldRestoreScroll = !options || options.restoreScroll !== false;

      activeType = nextState.activeType || "all";
      activeQuery = nextState.activeQuery || "";
      visibleCount = nextState.visibleCount || initialVisibleCount;
      isolatedItemId = null;

      if (searchInput) {
        searchInput.value = activeQuery;
      }

      setActiveFilterButton(activeType);
      applyState();

      if (shouldRestoreScroll) {
        restoreScroll(nextState.scrollY || 0);
      }
    }

    function openItem(itemId, options) {
      var item = getCardById(itemId);
      if (!item) return;

      isolatedItemId = itemId;
      applyState();

      if (options && options.pushHistory === false) return;

      window.history.replaceState(buildHistoryState("grid"), "", setHash(null));
      window.history.pushState(buildHistoryState("item"), "", setHash(itemId));
      restoreScroll(item.offsetTop - 16);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeType = btn.dataset.type || "all";
        visibleCount = initialVisibleCount;
        isolatedItemId = null;
        setActiveFilterButton(activeType);
        applyState();
        syncCurrentHistoryState();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        activeQuery = normalize(searchInput.value.trim());
        visibleCount = initialVisibleCount;
        isolatedItemId = null;
        applyState();
        syncCurrentHistoryState();
      });
    }

    showMoreButton.addEventListener("click", function () {
      visibleCount += initialVisibleCount;
      isolatedItemId = null;
      applyState();
      syncCurrentHistoryState();
    });

    cards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (isolatedItemId) return;
        if (window.getSelection && window.getSelection().toString()) return;
        if (event.target.closest("a, button, input, textarea, select, summary, details, pre, code")) {
          return;
        }

        openItem(card.dataset.galleryId);
      });
    });

    window.addEventListener("popstate", function (event) {
      var state = event.state && event.state[galleryStateKey];
      if (!state || state.gridId !== gridId) {
        if (!parseHash()) {
          restoreGridState({}, { restoreScroll: false });
        }
        return;
      }

      if (state.view === "item" && state.isolatedItemId) {
        isolatedItemId = state.isolatedItemId;
        activeType = state.activeType || "all";
        activeQuery = state.activeQuery || "";
        visibleCount = state.visibleCount || initialVisibleCount;
        if (searchInput) {
          searchInput.value = activeQuery;
        }
        setActiveFilterButton(activeType);
        applyState();
        restoreScroll(state.scrollY);
        return;
      }

      restoreGridState(state);
    });

    setActiveFilterButton(activeType);

    var initialItemId = parseHash();
    if (initialItemId && getCardById(initialItemId)) {
      var initialItem = getCardById(initialItemId);
      activeType = "all";
      activeQuery = "";
      if (searchInput) {
        searchInput.value = "";
      }
      setActiveFilterButton(activeType);
      isolatedItemId = initialItemId;
      applyState();
      if (initialItem) {
        restoreScroll(Math.max(0, initialItem.offsetTop - 16));
      }
      window.history.replaceState(buildHistoryState("item"), "", setHash(initialItemId));
      return;
    }

    applyState();
    window.history.replaceState(buildHistoryState("grid"), "", setHash(null));
  }

  grids.forEach(setupGallery);
})();
