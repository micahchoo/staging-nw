---
layout: post
title: Adding Bluesky comments to your Jekyll Site
description: Emily and then Cory demonstrated a way to add Bluesky comments and replies to a post as comments to your blog. I tried to add it to the Hydejack site
date: 25-11-2024
image: 
 path: /assets/img/projects/Bluesky-comments-hydejack.png
sitemap: true
---

[Original post](https://www.coryzue.com/writing/bluesky-comments/)

Add this to your includes/my-scripts.html
```
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/bluesky-comments@0.3.0/dist/bluesky-comments.umd.js"></script>
```

Add this to your includes/my-head.html
```
<link rel="stylesheet" href="https://unpkg.com/bluesky-comments@0.3.0/dist/bluesky-comments.css">
```

On your markdown post, in the frontmatter replace the url and add
```
bluesky_post_uri: https://bsky.app/profile/khattamicah.xyz/post/3lbqas73nd225
```

in includes folder, create a file called bluesky-comments.html
```
<div id="bluesky-comments"></div>

<script>
  document.getElementById('_pushState').addEventListener('hy-push-state-load', function() {
    const uri = '{{ page.bluesky_post_uri }}';
    console.log(uri);
    if (uri) {
      initBlueskyComments('bluesky-comments', uri);
    }
  });
</script>
```

In the layouts/post.html add this 
```
{% include bluesky-comments.html %}
```

before this line
```
{% include components/dingbat.html %}
```