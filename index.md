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

## Add Them To mini-a
{: .section-title}

Use the default home folder when you want the customization available in every session:

```bash
mkdir -p ~/.openaf-mini-a/commands ~/.openaf-mini-a/skills ~/.openaf-mini-a/hooks
```

<details><summary><strong>1. Add a slash command</strong></summary><p>Create a markdown template in <code>~/.openaf-mini-a/commands/&lt;name&gt;.md</code>:</p><pre><code class="language-markdown">Follow these instructions exactly.

Target: &#123;&#123;arg1&#125;&#125;
Raw args: &#123;&#123;args&#125;&#125;
Parsed args: &#123;&#123;argv&#125;&#125;</code></pre><p>Run it in the console:</p><pre><code class="language-bash">/my-command repo-a --fast "include docs"</code></pre><p>Run it directly from the CLI:</p><pre><code class="language-bash">mini-a exec="/my-command repo-a --fast \"include docs\""</code></pre><p>Load commands from extra directories:</p><pre><code class="language-bash">mini-a extracommands=/path/to/team-commands,/path/to/project-commands</code></pre><p>Notes:</p><ul><li>Default commands in <code>~/.openaf-mini-a/commands/</code> win over <code>extracommands</code>.</li><li>Earlier <code>extracommands</code> paths win over later ones.</li><li>Built-ins such as <code>/help</code> still win over custom commands.</li></ul></details>

<details><summary><strong>2. Add a skill</strong></summary><p>mini-a supports two skill layouts:</p><pre><code>~/.openaf-mini-a/skills/my-skill/SKILL.md
~/.openaf-mini-a/skills/my-skill.md</code></pre><p>Example single-file skill:</p><pre><code class="language-markdown">Review the current change carefully.
Focus on correctness, edge cases, and missing tests.</code></pre><p>Invoke it with either form:</p><pre><code class="language-bash">/my-skill src/auth
$my-skill src/auth</code></pre><p>Load skills from extra directories:</p><pre><code class="language-bash">mini-a extraskills=/path/to/shared-skills,/path/to/project-skills</code></pre><p>Notes:</p><ul><li>Default skills in <code>~/.openaf-mini-a/skills/</code> win over <code>extraskills</code>.</li><li>If a skill and a slash command share the same name, the skill wins.</li><li>Use <code>/skills</code> or <code>/skills &lt;prefix&gt;</code> to list discovered skills.</li></ul></details>

<details><summary><strong>3. Add a hook</strong></summary><p>Create a hook definition in <code>~/.openaf-mini-a/hooks/*.yaml</code>, <code>*.yml</code>, or <code>*.json</code>:</p><pre><code class="language-yaml">name: block-dangerous-shell
event: before_shell
command: "echo \"$MINI_A_SHELL_COMMAND\" | grep -E '(rm -rf|mkfs|dd if=)' &gt;/dev/null &amp;&amp; exit 1 || exit 0"
timeout: 1500
failBlocks: true</code></pre><p>Common hook events:</p><ul><li><code>before_goal</code></li><li><code>after_goal</code></li><li><code>before_tool</code></li><li><code>after_tool</code></li><li><code>before_shell</code></li><li><code>after_shell</code></li></ul><p>Load hooks from extra directories:</p><pre><code class="language-bash">mini-a extrahooks=/path/to/team-hooks,/path/to/project-hooks</code></pre><p>Notes:</p><ul><li>Hooks are additive. mini-a merges hooks from the default folder and all <code>extrahooks</code> paths.</li><li>Matching hooks from multiple directories all run; hooks do not override each other the way commands and skills do.</li></ul></details>

<details><summary><strong>4. Keep custom files in your repo instead of your home folder</strong></summary><p>This is useful for team-shared skills, commands, and hooks:</p><pre><code class="language-bash">mini-a \
  extracommands=.mini-a/commands \
  extraskills=.mini-a/skills \
  extrahooks=.mini-a/hooks</code></pre><p>You can combine repo-local folders with the defaults in <code>~/.openaf-mini-a/</code> on the same run.</p></details>

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

<script src="{{ '/assets/code-copy.js' | relative_url }}" defer></script>
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
