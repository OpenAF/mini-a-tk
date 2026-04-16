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

**Skill formats** (precedence order — first match wins):

| Format | Path | Notes |
|--------|------|-------|
| `SKILL.yaml` | `~/.openaf-mini-a/skills/<name>/SKILL.yaml` | Self-contained: body + refs bundled in one file |
| `SKILL.yml` | `~/.openaf-mini-a/skills/<name>/SKILL.yml` | Same as YAML |
| `SKILL.json` | `~/.openaf-mini-a/skills/<name>/SKILL.json` | JSON equivalent |
| `SKILL.md` | `~/.openaf-mini-a/skills/<name>/SKILL.md` | Classic folder skill |
| `skill.md` | `~/.openaf-mini-a/skills/<name>/skill.md` | Lowercase alias |
| `<name>.md` | `~/.openaf-mini-a/skills/<name>.md` | Single-file skill |

**YAML skills** bundle the prompt body and all `@`-referenced files into a single portable file — no supporting folder required. Print a starter template with `mini-a --skills`.

```yaml
schema: mini-a.skill/v1
name: my-skill
summary: Short description shown by /skills

body: |
  You are a specialized assistant for {{arg1}}.
  @context.md

refs:
  context.md: |
    Add context here.
```

**Placeholders** work in all formats: `{{args}}` · `{{argv}}` · `{{argc}}` · `{{arg1}}`, `{{arg2}}`, …

Inside folder skills, relative `@file.md` attachments resolve against the skill folder. In YAML skills, `@`-references resolve from the embedded `refs` map first, then fall back to the filesystem.

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
