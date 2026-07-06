---
layout: default.liquid
title: Updates from the Campaign
permalink: /posts/
---

<p class="lead">Read the latest updates, stories, and reasons the BYOD petition matters.</p>

{% for post in collections.posts.pages %}
  <article class="post-list-item">
    <h3>
      <a href="/{{ post.permalink | remove_first: '' }}">{{ post.title }}</a>
    </h3>
    <p>{{ post.description }}</p>
  </article>
{% endfor %}