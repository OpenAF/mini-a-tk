---
layout: page
title: Skills
permalink: /skills/
---

Skills are prompt templates that extend mini-a's behaviour. They live in `~/.openaf-mini-a/skills/` and can be invoked with `/<name>` or `$<name>`.

```bash
# Invoke a skill in interactive mode
/<skill-name> arg1 arg2

# Load extra skill directories
mini-a extraskills=/path/to/shared-skills
```

**Skill layouts:**
- `~/.openaf-mini-a/skills/<name>/SKILL.md`
- `~/.openaf-mini-a/skills/<name>.md`

---

<div class="category-grid">
{%- for item in site.data.skills -%}
{%- assign item_id = "skill-" | append: item.name | append: "-" | append: item.title | slugify -%}
<div class="gallery-card" data-type="skill" data-name="{{ item.name }}" data-title="{{ item.title }}" data-description="{{ item.description }}" data-tags="{{ item.tags | join: ' ' }}" data-gallery-id="{{ item_id }}">
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

<script src="{{ '/assets/code-copy.js' | relative_url }}" defer></script>
<script src="{{ '/assets/gallery.js' | relative_url }}" defer></script>
