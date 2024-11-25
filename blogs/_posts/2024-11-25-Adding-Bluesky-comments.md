---
layout: post
title: Adding Bluesky comments to your Jekyll Site
description: > Emily and then Cory demonstrated a way to add Bluesky comments and replies to a post as comments to your blog. I tried to add it to the Hydejack site
date: 01-12-2023
links:
  - title: Original post
    url: https://www.coryzue.com/writing/bluesky-comments/
sitemap: true
---

Add this to your includes/my-scripts.html
```
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/bluesky-comments@0.3.0/dist/bluesky-comments.umd.js"></script>
```

Add this to your includes/my-head.html
```
<link rel="stylesheet" href="https://unpkg.com/bluesky-comments@0.3.0/dist/bluesky-comments.css">
<script>
  document.addEventListener('DOMContentLoaded', function() {
const uri = '{{ page.bluesky_post_uri }}';
		console.log(uri);

if (uri) {
  initBlueskyComments('bluesky-comments', uri);
} 
});
</script>
```

On your markdown post, in the frontmatter replace the url and add
```
bluesky_post_uri: https://bsky.app/profile/khattamicah.xyz/post/3lbqas73nd225
```

in your markdown, where you want the comments to appear
```
bluesky_post_uri: https://bsky.app/profile/khattamicah.xyz/post/3lbqas73nd225
```