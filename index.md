---
layout: default.liquid
title: Bring Back BYOD at MCCTC
---

<section class="hero">
  <p class="eyebrow">Student-led petition</p>
  <h2>Help restore a bring-your-own-device policy at MCCTC.</h2>
  <p>We believe students should be trusted to use the same digital tools they already rely on outside the classroom to learn inside it.</p>
  <div class="actions">
    <a class="button primary" href="/petition/">Sign the petition</a>
    <a class="button secondary" href="/about/">Learn why it matters</a>
  </div>
</section>

<section class="card-grid">
  <article class="card">
    <h3>Why now</h3>
    <p>Students already use laptops, tablets, and phones to research, create, and collaborate. A modern school policy should reflect that reality.</p>
  </article>

  <article class="card">
    <h3>What we want</h3>
    <p>A clear, responsible BYOD policy that supports learning while giving teachers the flexibility to guide when devices are appropriate.</p>
  </article>

  <article class="card">
    <h3>What students gain</h3>
    <p>Better access to learning tools, stronger digital habits, and a classroom experience that matches the real world.</p>
  </article>
</section>

<section class="quote">
  <p>“A BYOD policy is not about distraction — it is about access, flexibility, and preparing students for the future.”</p>
</section>

<section class="post-preview">
  <h2>Recent updates</h2>

  {% for post in collections.posts.pages %}
    <article class="post-list-item">
      <h3><a href="{{ post.permalink }}">{{ post.title }}</a></h3>
      <p>{{ post.description }}</p>
    </article>
  {% endfor %}
</section>
