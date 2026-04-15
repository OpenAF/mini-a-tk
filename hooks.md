---
layout: page
title: Hooks
permalink: /hooks/
---

Hooks run shell commands automatically before or after agent events. Place YAML hook files in `~/.openaf-mini-a/hooks/`.

**Supported events:** `before_goal` · `after_goal` · `before_tool` · `after_tool` · `before_shell` · `after_shell`

```bash
# Load extra hook directories
mini-a extrahooks=/path/to/team-hooks,/path/to/project-hooks
```

**Available environment variables inside hook commands:**

| Variable | Set during |
|---|---|
| `$MINI_A_GOAL` | `before_goal`, `after_goal` |
| `$MINI_A_RESPONSE` | `after_goal` |
| `$MINI_A_TOOL_NAME` | `before_tool`, `after_tool` |
| `$MINI_A_TOKENS_IN` | `after_tool` |
| `$MINI_A_TOKENS_OUT` | `after_tool` |
| `$MINI_A_SHELL_COMMAND` | `before_shell`, `after_shell` |

---

<div class="category-grid">
{%- for item in site.data.hooks -%}
{%- assign item_id = "hook-" | append: item.title | slugify -%}
<div class="gallery-card" data-type="hook" data-title="{{ item.title }}" data-description="{{ item.description }}" data-tags="{{ item.tags | join: ' ' }}" data-gallery-id="{{ item_id }}">
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
</div>

<script src="{{ '/assets/code-copy.js' | relative_url }}" defer></script>
<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>
