---
layout: page
title: Agents
permalink: /agents/
---

Agent files package a full mini-a configuration — model, tools, rules, persona — into a single portable `.agent.md` file.

```bash
# Run an agent file
mini-a agent=my-agent.agent.md goal="your goal here"

# Print a starter template
mini-a --agent > my-agent.agent.md
```

See the [mini-a agent file docs](https://mini-a.ai/agents) for the full frontmatter reference.

---

<div class="category-grid">
{%- for item in site.data.agents -%}
<div class="gallery-card">
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
  <details class="card-code-details">
    <summary>View code</summary>
    <div class="card-code">
{% highlight markdown %}{{ item.code }}{% endhighlight %}
    </div>
  </details>
  <div class="card-usage">
    <code>{{ item.usage }}</code>
  </div>
</div>
{%- endfor -%}
</div>

<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>
