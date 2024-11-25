---
layout: post
title: "Photo and text test"
date: 2024-11-15
author: "John Doe"
intro: "Join us as we explore the serene beauty of the mountains in this photo story. From dawn till dusk, nature unveils its wonders."
image: 
 path: /assets/img/projects/Karwaan.png
photos:
  - url: "/assets/img/projects/Presentations.jpg"
    alt: "A winding path through the mountains."
    caption: "The path less traveled."
  - url: "/assets/img/projects/ROplant.jpg"
    alt: "Sunset over a tranquil mountain lake."
    caption: "Reflections of the setting sun."
  - url: "/assets/img/projects/RMPL.png"
    alt: "A clear night sky filled with stars."
    caption: "Under the stars."
credits: "Photography by Jane Doe and John Doe."
addons: "about,newsletter"
---
<section style="padding: 20px; max-width: 1200px; margin: auto; color: #f0f0f0;">

  <hr style="border: none; border-top: 1px solid #444; margin: 40px 0;" />

  <div style="display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between;">
    <!-- Content Column -->
    <div style="flex: 1; min-width: 320px; max-width: 48%;">
      <h2 style="text-align: left; font-size: 2em; margin-bottom: 20px;">Content</h2>
      <p style="font-size: 1.2em; line-height: 1.8;">{{content }}</p>
    </div>

    <!-- Gallery Column -->
    <div style="flex: 1; min-width: 320px; max-width: 48%;">
      <h2 style="text-align: left; font-size: 2em; margin-bottom: 20px;">Gallery</h2>
      <div class="spotlight-group" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
        {% for photo in page.photos %}
        <figure class="gallery-item" style="text-align: center; margin: 0;">
          <a href="{{ photo.url }}" class="spotlight" data-caption="{{ photo.caption }}" style="display: block;">
            <img src="{{ photo.url }}" alt="{{ photo.alt }}" style="width: 100%; max-width: 100%; height: auto; border: 1px solid #555; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease;">
          </a>
          <figcaption style="margin-top: 10px; font-style: italic; color: #ccc; font-size: 0.9em;">{{ photo.caption }}</figcaption>
        </figure>
        {% endfor %}
      </div>
    </div>
  </div>

  <footer style="text-align: center; margin-top: 50px;">
    {% if page.credits %}
    <h3 style="font-size: 1.5em; margin-bottom: 10px;">Credits</h3>
    <p style="font-size: 1.1em; color: #ccc;">{{ page.credits }}</p>
    {% endif %}
  </footer>
</section>

<script src="https://cdn.jsdelivr.net/npm/spotlight.js/dist/spotlight.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spotlight.js/dist/spotlight.min.css">




"This could be used EVERYWHERE!"
{:.lead}
But I found out soon enough - not really! 


It felt like every new image I wanted to use this in way would need its own unique pipeline and dedicated resources. 

This felt wrong, that something like this wasn't a native web standard like html. If we are able to annotate text this easily why are images so much harder. 

It seemed to be something that could only easily be made in walled-garden platforms. 

---

While working through this problem in 2020, something standing out as having potential was this framework called IIIF (triple-eye-eff) - International Image Interoperability Framework. It was describing a solution that felt a little good to be true. 

Yet I saw [Archive after Archive](https://web.archive.org/web/20200717185455/https://iiif.io/apps-demos/#implementation-demos) listed as examples. I couldn't believe that these viewing experiences weren't custom-built monoliths and were based on a standard implementation that I could use if I tried.

I started reading up about it and coming back to it every two months. For a non-technical person like me, it was quite a dense topic to understand. So I tried to learn it by saturation and osmosis.

It was during that time that I started experimenting with Cantaloupe, a IIIF image server. We self-hosted it on a server that our [collective](https://linktr.ee/llnaf) owned. After getting to the point of being able to serve singular images, I came across the biggest issue. 



* seed
{:toc}

## How do I actually organize, metadatize, annotate and then serve these images?
### Grappling with the complexity of IIIF


<a class="spotlight" href="/assets/img/projects/IIIF%20system.png">![A limited explanation of IIIF](/assets/img/projects/IIIF%20system.png){:.lead width="800" height="100" loading="lazy"}</a>
Schematic of how images are requested for and served
{:.figcaption}

- This image is a diagram illustrating how the IIIF (International Image Interoperability Framework) works to manage, display, and secure digital images in an online setting. 
- The process begins with the [IIIF Image Server](https://github.com/IIIF/awesome-iiif#image-servers), where [image files]() and accompanying metadata files (info.json) are stored. 