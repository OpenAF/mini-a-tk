---
layout: home
permalink: /
---

<div class="hero">
  <h1><span style="color: #62bb47;">mini</span><span style="color: #e594ac;">-a</span> <span style="color: #68d391;">toolkit</span></h1>
  <p class="tagline">Agents, slash commands, hooks &amp; skills — ready to use.</p>
  <p class="hero-description">
    A curated gallery of reusable <a href="{{ '/agents' | relative_url }}">agents</a>,
    <a href="{{ '/slash-commands' | relative_url }}">slash commands</a>,
    <a href="{{ '/hooks' | relative_url }}">hooks</a>, and
    <a href="{{ '/skills' | relative_url }}">skills</a> for
    <a href="https://mini-a.ai">mini-a</a>.
    Browse, search, and copy-paste straight into your projects.
  </p>
  <div class="cta-buttons">
    <a href="{{ '/search' | relative_url }}" class="btn btn-primary">Search Toolkit</a>
    <a href="https://github.com/OpenAF/mini-a-tk" class="btn btn-secondary">GitHub</a>
  </div>
</div>

---

<div class="numbers-bar">
  <div class="number-item">
    <span class="number">{{ site.data.agents | size }}</span>
    <span class="label">Agents</span>
  </div>
  <div class="number-item">
    <span class="number">{{ site.data.slash_commands | size }}</span>
    <span class="label">Slash Commands</span>
  </div>
  <div class="number-item">
    <span class="number">{{ site.data.hooks | size }}</span>
    <span class="label">Hooks</span>
  </div>
  <div class="number-item">
    <span class="number">{{ site.data.skills | size }}</span>
    <span class="label">Skills</span>
  </div>
</div>

---

## Browse the Gallery
{: .section-title}

<div class="gallery-controls">
  <div class="filter-row">
    <button class="filter-btn active" data-type="all">All</button>
    <button class="filter-btn" data-type="agent">Agents</button>
    <button class="filter-btn" data-type="slash-command">Slash Commands</button>
    <button class="filter-btn" data-type="hook">Hooks</button>
    <button class="filter-btn" data-type="skill">Skills</button>
  </div>
  <div class="search-row">
    <input type="search" id="gallery-search" class="gallery-search-input" placeholder="Filter by name, tag or description…" aria-label="Filter gallery items">
  </div>
</div>

<div id="gallery-grid" class="gallery-grid">

  {%- for item in site.data.agents -%}
  <div class="gallery-card" data-type="agent" data-tags="{{ item.tags | join: ' ' }}" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}">
    <div class="card-header">
      <span class="type-badge type-agent">agent</span>
      <h3 class="card-title">{{ item.title }}</h3>
    </div>
    <p class="card-description">{{ item.description }}</p>
    <div class="card-tags">
      {%- for tag in item.tags -%}
      <span class="tag">{{ tag }}</span>
      {%- endfor -%}
    </div>
    <div class="card-code">
{% highlight markdown %}{{ item.code }}{% endhighlight %}
    </div>
    <div class="card-usage">
      <code>{{ item.usage }}</code>
    </div>
  </div>
  {%- endfor -%}

  {%- for item in site.data.slash_commands -%}
  <div class="gallery-card" data-type="slash-command" data-tags="{{ item.tags | join: ' ' }}" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}">
    <div class="card-header">
      <span class="type-badge type-slash-command">slash command</span>
      <h3 class="card-title">{{ item.title }}</h3>
    </div>
    <p class="card-description">{{ item.description }}</p>
    <div class="card-tags">
      {%- for tag in item.tags -%}
      <span class="tag">{{ tag }}</span>
      {%- endfor -%}
    </div>
    <div class="card-code">
{% highlight markdown %}{{ item.code }}{% endhighlight %}
    </div>
    <div class="card-usage">
      <code>{{ item.usage }}</code>
    </div>
  </div>
  {%- endfor -%}

  {%- for item in site.data.hooks -%}
  <div class="gallery-card" data-type="hook" data-tags="{{ item.tags | join: ' ' }}" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}">
    <div class="card-header">
      <span class="type-badge type-hook">hook</span>
      <h3 class="card-title">{{ item.title }}</h3>
    </div>
    <p class="card-description">{{ item.description }}</p>
    <div class="card-tags">
      {%- for tag in item.tags -%}
      <span class="tag">{{ tag }}</span>
      {%- endfor -%}
    </div>
    <div class="card-code">
{% highlight yaml %}{{ item.code }}{% endhighlight %}
    </div>
    <div class="card-usage">
      <strong>Event:</strong> <code>{{ item.event }}</code>
    </div>
  </div>
  {%- endfor -%}

  {%- for item in site.data.skills -%}
  <div class="gallery-card" data-type="skill" data-tags="{{ item.tags | join: ' ' }}" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}">
    <div class="card-header">
      <span class="type-badge type-skill">skill</span>
      <h3 class="card-title">{{ item.title }}</h3>
    </div>
    <p class="card-description">{{ item.description }}</p>
    <div class="card-tags">
      {%- for tag in item.tags -%}
      <span class="tag">{{ tag }}</span>
      {%- endfor -%}
    </div>
    <div class="card-code">
{% highlight markdown %}{{ item.code }}{% endhighlight %}
    </div>
    <div class="card-usage">
      <code>{{ item.usage }}</code>
    </div>
  </div>
  {%- endfor -%}

</div>

<p id="gallery-empty" class="gallery-empty" style="display:none;">No items match your filter.</p>

<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>

---

<div class="cta-section">
  <h2>Add Your Own</h2>
  <p>Have an agent, slash command, hook or skill worth sharing? Open a pull request on GitHub.</p>
  <div class="cta-buttons">
    <a href="https://github.com/OpenAF/mini-a-tk" class="btn btn-primary">Contribute on GitHub</a>
    <a href="https://mini-a.ai" class="btn btn-secondary">mini-a docs</a>
  </div>
</div>
