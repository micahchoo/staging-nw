---
layout: post
title: 'IIIF images: Overview'
caption: 
description: >
date: '01-05-2024'
sitemap: true
---

For the last few years, I have been in search of a way to host images, text and other types of content on the internet in a no-code or low-code but organized and categorized setup. This has led me to many interesting places and ways of doing this. In this article, I want to talk about hosting images using self-hostable tools.

To briefly talk about why I set about looking for such solutions - I am part of few collectives that work with cultural and creative practice-based research in Karnataka, India. As is, in the course of our work, we come across some interesting collections and collectors of images for different purposes. A few examples include a researcher studying Memes and Dissent in India looking to have large hoards of images annotated as a community, a 70-year old collector with pictures of a place from a time when very very few pictures exist and a group of dargahs with objects of centuries-old storied traditions. 

Each of these examples, require a hosting and publishing solution customizable and annotable metadata and a relatively simple user-management featureset. Back in 2020, I experienced how arbitrary and niche creating a panable, zoomable and annotable image was. I was using OpenSeadragon and Annotorious as a way to create the map in [this Compost.mag piece.](https://one.compost.digital/fertile-technofutures-from-bidar/)It seemed that every new image I wanted to use this in way would need its own unique workflow. This felt wrong, that something like this wasn't a native web standard, but could only easily be made in walled-garden platforms. 

While working through this problem, what started standing out as having potential in 2020 was this framework called IIIF (triple-eye-eff) - International Image Interoperability Framework. Many digital archives have adopted the International Image Interoperability Framework (IIIF) due to its numerous advantages over traditional high-resolution images. Unlike heavy images that often lack metadata, are difficult to zoom or pan, load slowly, break at higher zoom levels, and suffer from website compression, IIIF offers a more efficient and versatile solution. 

 For a non-technical person like me, it was quite a dense topic to understand so I kept it as one of those topics that I learn in very small doses over a long period of time. Exploring options, I found a promising solution in the IIIF (International Image Interoperability Framework). IIIF’s robust API suite allows us to store, manage, and display images with intricate metadata, supporting high-resolution viewing, customizable access controls, and detailed annotations. This framework makes it possible to structure and search extensive image collections efficiently, making it ideal for handling complex cultural archives while maintaining accessibility for public engagement or research purposes.

* seed
{:toc}

## Grappling with the complexity of IIIF

<a class="spotlight" href="/assets/img/projects/IIIF%20system.png">
  <img src="/assets/img/projects/IIIF%20system.png" alt="A limited explanation of IIIF" style="width:300px">
</a>


Schematic of how images are requested for and served
{:.figcaption}

This image is a diagram illustrating how the IIIF (International Image Interoperability Framework) works to manage, display, and secure digital images in an online setting. The process begins with the IIIF Image Server, where image files and accompanying metadata files (info.json) are stored. This server has the capability to transform images (e.g., resizing, zooming) based on user needs and is typically accessible over a network. The images are then made available through an Image API that enables users to retrieve images in different sizes and formats without needing separate versions of each file. This capability allows users to zoom into detailed sections of images, which is especially useful for high-resolution images of artwork or historical documents. In another location on the internet, the users create Manifest.json files and stored as bundles that collect images, metadata (e.g., title, description), and structural information (e.g., page order) to organize images or collections for online display. These manifest files are passed to a IIIF viewer in a web browser or application, allowing users to view images with embedded metadata. The IIIF viewer can utilize additional APIs, such as the Authentication API for access control to restrict certain content and the Search API to enable text searching within images (e.g., searching for keywords in handwritten documents). Finally, the Presentation API provides display instructions to ensure the images and metadata are presented cohesively. This API supports annotations and custom display settings.

As far as my usecases go, this was overkill and far too complicated of a individual or small archive. So I was looking for opportunities to simplify the stack of things that had to be put together.

As I saw it there 3 main areas where the complexity was really high

### The Image Server - 
The traditional IIIF image server is a dynamically serving images, cut up into tiles (like maps) - so that they can be viewed at a high resolution. 

<a class="spotlight" href="/assets/img/projects/IIIF%20URL%20processing.png"> <img src=" assets/img/projects/IIIF%20URL%20processing.png" alt="Dynamic images and how URLs like these fetch them" style="width:300px"></a>


A simplification that was offered online was to serve static tiles of that don't do any transformations. If you think of using Google Maps with a slow network, the squares often take time to load when zooming in or out of the map. Google maps to some extent is dynamically creating these square tiles with upto 22 levels of zoom. However, if you were able to limit the viewing to 1 or 2 zoom levels, the tiles can be created once and reused again and again. This is hitting the tradeoff between performance and memory usage.

 A github repo with the images and corresponding tiles and info.jsons could behave like an IIIF image server. This also removes the need for the image URL to be complicated and can be generated according to a formula around the filename. 


### Manifest Creation: 
The process of putting together Manifests for large quantities of images, as of 2024, still doesn't have a generic solution. To make matters even more complicated - Manifests are only part of the picture in terms of the structuring required.


#### Resource Types - Structuring the objects from the image server: 
The IIIF Presentation API defines several resource types to structure and present complex multimedia objects. This however means, that it adds to the complexity of the Manifest Creation process.
- At the top level is the **Collection**, which groups multiple **Manifests** (representing individual compound objects like books or albums) and/or other Collections in a hierarchical way for navigation or organization. 
- Each **Manifest** describes a single compound object, including its metadata and layout instructions for displaying the content. 
- Within a Manifest, **Canvases** represent individual views or “pages” of the object, providing a space for arranging content resources (e.g., images, audio, or video) through **Annotations**. **Ranges** allow Canvases or sections of them to be grouped into logical sections, like chapters or scenes.
- **Annotations** link content resources to Canvases, creating a flexible and distributed system for adding layers of information such as translations or commentary. 
- An **Annotation Page** organizes a list of Annotations on a Canvas, while **Annotation Collections** group Annotation Pages at a higher level, allowing different types of commentary or translations to be kept separate.

#### Creating the Manifests - Organizing the collection
The process of bundling the metadata with the images is also a labour-intensive task. Most institutions that are switching to IIIF for their collections use custom-built software to create manifests. They might also use an Archival Content Management Tool like Islandora, Arches or Omeka. This is however, much harder to do for smaller archivists. Currently, there exists no generic way to set up metadata in a spreadsheet(as non-technical people will want to do) and have it converted to a manifest. 


#### Creating Annotations - User-generated metadata
A little less intimidating problem but equally as important is the user-generated metadata or Annotations. How do we enable viewers and end users to create Annotations on these images and have these annotations reflect when viewing them.

***Still exploring this, more to come***

#### Hosting the archive itself
In this configuration, there are a few storage locations that we need to solve.
1. Where the images are stored and served from
2. Where the annotations are stored and served from
3. Where the manifests are stored and served from
4. Where is the viewer and archive stored


## A simple user-hosted IIIF archive
A few attempts have been made to simplify the IIIF archive with different opinions on how to simplify this process. A massive simplification is to use github pages

### Digirati Manifest Editor
[The editor](https://manifest-editor.digirati.services/)
For a smaller dataset, the Manifest Editor is a great tool, if you are willing to organise the images one after another. You are able to annotate and organize the images all in the editor and download the manifest and host it with the images and the html file with the IIIF viewer.
Its fairly simple to use, you create or open a manifest, add canvases, add content to these canvases, add annotations and other metadata - preview what it looks like in different IIIF viewers. 
The viewers that support text-on-image annotations through this method are Theseus and Annona *(as of Nov 2024)*

### BIIIF (Build IIIF)
[Github Repo](https://github.com/IIIF-Commons/biiif/)
This method seeks to use folder hierarchy as a way to quickly organise the collection and generate the manifests. The way it does this is to use a naming convention as a symbol of the various resource types defined in the Presentation API

<a class="spotlight" href="/assets/img/projects/Presentation%20API%20Resource%20types.png"> <img src="/assets/img/projects/Presentation%20API%20Resource%20types.png" alt="How the different types of resources in the Presentation API are structured" style="width:300px"></a>


These are the conventions
<a class="spotlight" href="/assets/img/projects/Biiif%20folder%20naming%20conventions.png"> <img src="/assets/img/projects/Biiif%20folder%20naming%20conventions.png" alt="How to name folder hierarchy in to create manifests" style="width:300px"></a>
[Read more here](https://github.com/IIIF-Commons/biiif/tree/master?tab=readme-ov-file#conventions)
After organising the files and folders, the script should create manifests as 'index.json' in each "manifest" folder.

To view these manifests, we need to have it on the internet with a URL. This is possible to do with github pages. However, storing the images on a github repository and the manifest, with an html file in which you pass the url of the manifest to the IIIF viewer embedded in the webpage.


### Tropy and Tropiiify
See my test demo [here](https://github.com/micahchoo/Tropiiify-test) 
This option seems to be the most promising in terms of the performance and flexibility. When combined with github CI/CD, it can be a complete solution on its own.

There are a few steps to follow
1. Install Tropy
2. Download the tropiiify plugin as .zip
3. Install the plugin to tropy in the Preferences menu
4. Create a repo and activate it in github pages
5. In the plugin settings change the base ID to the github pages url till 1 level above the index.json
6. Import items to Tropy, add annotations
7. For every item, add a unique number in the identifier field
8. Export>tropiify
9. Upload this folder to the github repo you created
10. Go to [Digirati Manifest editor](https://manifest-editor.digirati.services/)>Open manifest url>Paste the URL of the manifest.json file from your github pages site
11. Preview or download the json
12. Create an html page with one of the viewers embedded and pass it the url of the manifest.json



## Upcoming Sections

Tropy and collaboration - September 4 comment about collaboration - [Collaborative project? - Question - forums.tropy.org](https://forums.tropy.org/t/collaborative-project/4394)
Alternatives to Github CI/CD 
- Someone smarter than me can browse the build logs for my github pages and implement it for Gitlab CI/CD
~~biiif~~
~~tropy~~
- wax(?)
- mirador-annotot
- how to store and serve annotations
~~digirati-manifest editor~~