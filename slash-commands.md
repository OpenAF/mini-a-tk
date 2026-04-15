---
layout: page
title: Slash Commands
permalink: /slash-commands/
---

Slash command templates live in `~/.openaf-mini-a/commands/<name>.md`. They support Handlebars-style placeholders for arguments.

```bash
# Use a slash command in interactive mode
/<name> arg1 arg2

# Run non-interactively
mini-a exec="/<name> arg1 arg2"

# Load a custom commands directory
mini-a extracommands=/path/to/team-commands
```

**Placeholders:** `{{args}}` · `{{argv}}` · `{{argc}}` · `{{arg1}}`, `{{arg2}}`, …

---

<div class="category-grid">
{%- for item in site.data.slash_commands -%}
{%- assign item_id = "slash-command-" | append: item.name | append: "-" | append: item.title | slugify -%}
<div class="gallery-card" data-type="slash-command" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}" data-tags="{{ item.tags | join: ' ' }}" data-gallery-id="{{ item_id }}">
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
</div>

<script src="{{ '/assets/code-copy.js' | relative_url }}" defer></script>
<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>
