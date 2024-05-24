---
layout: post
title: 'IIIF images: Overview'
caption: 
description: >
date: '01-05-2024'
sitemap: true
---
# Why Use IIIF?

Many digital archives have adopted the International Image Interoperability Framework (IIIF) due to its numerous advantages over traditional high-resolution images. Unlike heavy images that often lack metadata, are difficult to zoom or pan, load slowly, break at higher zoom levels, and suffer from website compression, IIIF offers a more efficient and versatile solution. 

>Note: For non-developers, replace API with "method"

## Image API - Hosting and Serving Images

When it comes to hosting and serving images using IIIF, there are two main options: static tiles and image servers.

### Static Tiles
Static tiles are pre-generated and not created on the fly. Here are some key points about using static tiles:
- **Options**: Tools like [biiif](https://github.com/IIIF-Commons/biiif) or the [11ty-IIIF-Manifest-Generator](https://github.com/hmmlsystems/11ty-IIIF-Manifest-Generator) can be used.
- **Ease of Implementation**: Static tiles are generally easy to implement.
- **Current Limitation**: These methods currently don’t seem to work well with manifest editors like those from Bodleian or Digirati in my editing.

### Image Server
Image servers can dynamically manipulate images (such as applying filters, cropping, tiling, etc.) and serve them as requested. Here are the options for image servers:
- **Free Hosting**: You can host images on platforms like the Internet Archive for free.
- **Self-Hosting**: Tools like Cantaloupe allow for self-hosting.
- **Paid Options**: There are also various paid options available for hosting images.

## From Image API to Presentation API

The input to an image API is an image, and the output is a URL. This URL is special because it can be used in viewers like Universal Viewer or Mirador to display the original image as specified by the URL parameters. For every image, there exists a URL framework that corresponds to that image. These URLs can be organized using the Presentation API.

## Presentation API - Structure

The Presentation API is used to structure collections and manifests. Here’s how it works:
- **Collections**: Each collection contains manifests.
- **Manifests**: Each manifest contains sequenced or non-sequenced canvases.
- **Canvases**: Each canvas can contain one or more audio-visual artifacts.

### Tools for Structuring
- **biiif**: This tool assumes structure through folder hierarchy and is quite extensive.
- **11ty-IIIF-Manifest-Generator**: This tool also assumes structure through folder hierarchy, though in different ways.
- **Manual Method**: You can manually add images to manifest editors like those from Digirati or Bodleian.

## Publish

Once your images are structured using the Presentation API, you can view them in viewers like Mirador or Universal Viewer. Alternatively, you can use OpenSeadragon, which offers a variety of plugins for enhanced functionality.

By leveraging IIIF, digital archives can provide a more interactive, accessible, and metadata-rich experience for their users.