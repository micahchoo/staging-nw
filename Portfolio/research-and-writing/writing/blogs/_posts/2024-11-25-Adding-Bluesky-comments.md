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

<!-- Add this new module script -->
<script type="module">
  import BlueskyComments from 'https://unpkg.com/bluesky-comments@0.4.0/dist/bluesky-comments.es.js';
  
  // For Hydejack's push state
  document.getElementById('_pushState').addEventListener('hy-push-state-load', function() {
    const author = 'your-handle.bsky.social'; // Replace with your Bluesky handle
    if (author) {
      BlueskyComments.init('bluesky-comments', {author});
    }
  });
</script>

```

Add this to your includes/my-head.html
```
<link rel="stylesheet" href="https://unpkg.com/bluesky-comments@0.3.0/dist/bluesky-comments.css">

<!-- Add this new importmap before any other scripts -->
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18",
    "react-dom": "https://esm.sh/react-dom@18"
  }
}
</script>
```

On your markdown post, in the frontmatter replace the url and add
```
bluesky_post_uri: https://bsky.app/profile/khattamicah.xyz/post/3lbqas73nd225
```


In the layouts/post.html add this 
```
  <div id="bluesky-comments"></div>
  ```

before this line
```
{% include components/dingbat.html %}
```

