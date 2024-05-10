---
layout: post
title: 'Maps of Hyderabad Cinema History'
caption:  Making printable maps of hyderabadi cinema halls through the decades
description: >
 Conducted in collaboration with the Center for Pastoralism (CfP), the endeavor was part of a larger initiative to analyze the impact of the pandemic on pastoralist livelihoods.
image: 
  path: /assets/img/projects/2024-01-01-Mapping-History-of-Cinema/e4fe9b0bde5cc60671cde313f37e7f27_MD5.jpeg
date: '10-05-2024'
sitemap: true

---
This was a project to create print-ready maps of the cinema halls that existed in Hyderabad from 1936 to 2018. The data was curated by Dr. Yamini and they approached me to make some printable maps. The challenge was to create a visually appealing and informative map that highlighted cinema halls with labels, specific localities like Abids, Musheerabad, and Khairatabad—areas known for their rich history of cinema. The centerpiece of the map was Hussain Sagar, a landmark that helps orient anyone familiar with Hyderabad to the map.

### The Mapping Process

<a class="spotlight" href="/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/e4fe9b0bde5cc60671cde313f37e7f27_MD5.jpeg"> ![Image 1 Description](/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/e4fe9b0bde5cc60671cde313f37e7f27_MD5.jpeg) </a> Image 1 Description {:.figcaption} 
#### Step 1: Stylizing the Map in Mapbox
The first step involved using Mapbox, a powerful tool for custom map design. The objective was to simplify the map to enhance its aesthetic appeal and readability. This was achieved by:
- **Color Stylization:** Choosing a color palette that was visually pleasing yet functional.
- **Hiding Unnecessary Layers:** Removing layers that cluttered the map, such as minor settlements, road names, and highway icons.
- **Filtering Specific Features:** Ensuring that important features like Abids, Hussain Sagar, and the Outer Ring Roads were prominently visible.

<a class="spotlight" href="/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/8e0d88668c4521c62c62f7240aeae4f5_MD5.jpeg"> ![Image 2 Description](/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/8e0d88668c4521c62c62f7240aeae4f5_MD5.jpeg) </a> Image 2 Description {:.figcaption} 
#### Step 2: Exporting and Georeferencing
Once the map was stylized:
- **Export as PNG:** The map was exported from Mapbox as a PNG file.
- **Georeferencing in QGIS:** The PNG file was then imported into QGIS, a free and open-source geographic information system, where it was georeferenced to align with geographical data accurately.

<a class="spotlight" href="/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/dc219fb4923ac748e9cfeaf724e923a4_MD5.jpeg"> ![Image 3 Description](/assets/img/projects/2024-01-01-Mapping-History-of-Cinema/dc219fb4923ac748e9cfeaf724e923a4_MD5.jpeg) </a> Image 3 Description {:.figcaption}
#### Step 3: Enhancing Map Details in QGIS
In QGIS, further enhancements were made:
- **Stylizing Labels:** Labels were styled using callouts and offsets to improve visibility amidst a high density of points.
- **Manual Adjustments:** Labels were manually adjusted to avoid overlap and ensure clarity.
- **Creating a Layout:** A layout was designed, incorporating a scale and map title for professional presentation.

#### Step 4: Final Touches in Inkscape
The map underwent final refinements in Inkscape, a vector graphics editor:
- **Importing the Map:** The QGIS-exported PNG was imported into Inkscape.
- **Adding a Legend:** For labels that could not fit directly on the map, a legend was created to accommodate them, ensuring no information was lost.


