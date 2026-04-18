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

The `mini-a:` frontmatter section can override defaults that were not explicitly set on the CLI, including values injected by mode presets. Explicit CLI flags still take precedence.

See the [mini-a agent file docs](https://mini-a.ai/agents) for the full frontmatter reference.

The gallery below also includes the shipped starters from `examples/*.agent.md` in the main mini-a repository, so the toolkit stays aligned with the built-in templates.

---

<div class="category-grid">
{%- for item in site.data.agents -%}
{%- assign item_id = "agent-" | append: item.name | append: "-" | append: item.title | slugify -%}
<div class="gallery-card" data-type="agent" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}" data-tags="{{ item.tags | join: ' ' }}" data-gallery-id="{{ item_id }}">
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
</div>

<script src="{{ '/assets/code-copy.js' | relative_url }}" defer></script>
<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>
