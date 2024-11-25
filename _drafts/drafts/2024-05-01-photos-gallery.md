---
layout: post
title: "Photo gallery test"
date: 2024-11-15
author: "John Doe"
intro: "Join us as we explore the serene beauty of the mountains in this photo story. From dawn till dusk, nature unveils its wonders."
image: 
 path: /assets/img/projects/Karwaan.png
photos:
  - url: "/assets/img/projects/presentations.jpg"
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
<section> <header> <h1>{{ page.title }}</h1> <p><time datetime="{{ page.date | date_to_xmlschema }}">{{ page.date | date: "%B %d, %Y" }}</time> by {{ page.author }}</p> <div> <img src="{{ page.intro_image }}" alt="Intro image for {{ page.title }}" style="width: 100%; max-width: 864px; height: auto;" /> </div> <p>{{ page.intro }}</p> </header> <h2>Gallery</h2> <div class="spotlight-group"> {% for photo in page.photos %} <figure class="gallery-item" style="margin: 10px; text-align: center;"> <a href="{{ photo.url }}" class="spotlight" data-caption="{{ photo.caption }}"> <img src="{{ photo.url }}" alt="{{ photo.alt }}" style="width: 100%; max-width: 600px; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;" /> </a> <figcaption style="margin-top: 5px; font-style: italic;">{{ photo.caption }}</figcaption> </figure> {% endfor %} </div> <footer> {% if page.credits %} <h3>Credits</h3> <p>{{ page.credits }}</p> {% endif %} </footer> </section> <script src="https://cdn.jsdelivr.net/npm/spotlight.js/dist/spotlight.bundle.min.js"></script> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spotlight.js/dist/spotlight.min.css">