---
layout: page
title: Search
permalink: /search/
---

<div class="search-page" data-index-url="{{ '/search-data.json' | relative_url }}">
  <label class="search-label" for="search-input">Search the toolkit</label>
  <div class="search-input-row">
    <input
      type="search"
      id="search-input"
      class="search-input"
      placeholder="e.g. security, git, docker, logging…"
      autocomplete="off"
      aria-label="Search toolkit items"
    >
  </div>
  <p class="search-hint">Search across agents, slash commands, hooks, and skills.</p>
  <div id="search-status" class="search-status" role="status" aria-live="polite"></div>
  <div id="search-results" class="search-results" role="list"></div>
</div>

<script src="{{ '/assets/search.js' | relative_url }}" defer></script>
