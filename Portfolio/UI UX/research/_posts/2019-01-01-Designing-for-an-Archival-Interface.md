---
layout: post
title: 'Designing a Connected Archive'
caption:  Thoughts on designing a democratic archive
description: >
  During our time at Milli.Tech, we aimed to design a platform that democratized access to archives.
date: '01-02-2019'
categories: [UX Design]
image: 
  path: /assets/img/projects/Milli/Milli (13).png
sitemap: true
---
# Designing a Connected Archive
## Introduction to Archives, Archival Processes and Archival Interface Design

* seed
{:toc}

Archives are fascinating vessels of history, embodying a rich mosaic of artifacts that range from private letters to copyrighted films, from land records to propaganda materials, and even taboo items. The task of an archivist involves categorizing, storing, and preserving these historical documents based on the specific orientation of the archive. However, this multifaceted array of artifacts doesn't just represent historical records; they embody diverse narratives, interests, and stakeholders, all coalescing into what we term the **Archival Record**. 

The establishment and functioning of an archive often inspire key queries around ownership, usage, description, and interpretation. Delving into these questions helps to illuminate the negotiations, conflicts, and complexities that swirl around the archival process. The nature and contents of an archive are significantly influenced by these negotiations and the changing environments, as archives are meant to serve as long-term repositories.

## Archival Items and Collections

Archival items are the building blocks of an archive, taking diverse forms such as images, apps, songs, logos, clothes, and even other archives. But, an archive is more than a mere collection of individual items. It's a curated and organized assembly of these items, wherein collections themselves become individual entities. 

Consider an archive centered around the Indian Partition. Its hierarchical structure might look like this: 
- Found objects
  - Letters and Correspondence
    - 1950-1960
      - Ismat and Issac

In this structure, a specific item like a letter from Issac to Ismat dated July 23, 1956, resides within the "Ismat and Issac" collection. 

## Two Facets of Archival Items

An archivist analyses an archival item, such as the mentioned letter, on two levels: 

1. The Content: The actual substance of the letter. 
2. The Context: The surrounding questions about the item - who wrote it, when and where it was composed, its physical properties, the historical backdrop of its creation, and so on. 

These facets play an integral part in the archival processes of accessioning, surveying, arrangement, description, ingestion, creating access points, etc. 

## Archival Processes and Workflows

Effective management of an archive involves systematic workflows. To get a more detailed understanding of these workflows, resources like the University of Florida's [Archival Processing guidelines](https://guides.uflib.ufl.edu/archivalprocessing/docs) provide insightful templates and forms. 

For digital archiving, a unique set of workflows is required, for which platforms like the National Archives of the UK provide comprehensive [digital preservation workflows](https://www.nationalarchives.gov.uk/archives-sector/projects-and-programmes/plugged-in-powered-up/digital-preservation-workflows/).

#### See Also
- [South Asia - Awesome Digital History  A curated list of awesome things related to South Asian digital history. - micahchoo.github.io](https://micahchoo.github.io/awesome-digital-history-South-Asia/)

## Archival Interface Design: Building Interconnections and Facilitating Annotations
See the design showcase [here](https://khattamicah.tumblr.com/post/711988990811783168/designing-milli-an-open-source-cross-annotation)

## Milli.Tech
**The Scene: [Milli](https://milli.link)**

After the International Archives Week 2020, a collaboration formed between Venkat from NCBS, Dinesh and Bhanu from Janastu, and Prasoon, formerly of QAMRA. Together, they set out to build a platform and create a consortium of archives under the banner of **Milli**. Shafali and I joined as UX Designers during this period. Milli.Tech operated from September 2020 to October 2021.

<a class="spotlight" href="/assets/img/projects/Milli/Milli (12).png">![How to structure such an archive](/assets/img/projects/Milli/Milli (12).png)</a>How to structure such an archive
{:.figcaption}

<a class="spotlight" href="/assets/img/projects/Milli/Milli (4).png">![The Archive for who?](/assets/img/projects/Milli/Milli (4).png)</a>The Archive for who?
{:.figcaption}

During our time at Milli.Tech, we aimed to design a platform that democratized access to archives.
 This is the story of our journey, focusing specifically on my experience with the topic.
When I started, I had a vague understanding of what an archive was, and I still find it difficult to differentiate between an archive, a museum, and a library. However, I understood that Milli wanted archives to be more like libraries or the inside of a well-loved book—a place for marginalia, play, learning, and creativity.

<a class="spotlight" href="/assets/img/projects/Milli/Milli (8).png">![Initial principles](/assets/img/projects/Milli/Milli (8).png)</a>
Initial principles
{:.figcaption}
## The Process

We considered various aspects, starting with user stories based on the following hypothesis:
> As a [type of user or role], I want [some goal] so that [some reason].

### Milli User Stories

1. As a science student, I want better finding aids to browse the metadata descriptions of different archives.
2. As a research associate, I want to add tags to specific archive item metadata descriptions so that I can easily browse my tags later.
3. As a researcher, I want to add text comments to specific archive item metadata descriptions to quote them in my research paper.
4. As a science journalist, I want to link two archival items with custom relationships to analyze emerging patterns for stories.
5. As an archivist, I want to create categories to organize archival research.
6. As the owner of the Milli platform, I want to create new sites/accounts to manage contracts, policies, and interactions with other institutions, archives, or formal organizations.
7. As the technical administrator of Milli, I want to set up background processes or jobs for data exchange, parsing, or other adapters.
8. As the site (account) administrator of Milli, I want to create and manage users.
9. As a site administrator of Milli, I want to approve or reject annotations (tags, comments) to prevent spam.

Our overarching goal was to create interconnections among diverse archives, be it private, institutional, governmental, or personal. We aimed to foster a community of users who annotate, discover, and narrate stories using collections of annotations, thus transforming the archival landscape into an interactive space. 

<a class="spotlight" href="/assets/img/projects/Milli/Milli (3).png">![Possibilities - Hyperlocal Storytelling](/assets/img/projects/Milli/Milli (3).png)</a>
Possibilities - Hyperlocal Storytelling
{:.figcaption}

During our user research, we gleaned several key insights that shaped our design:

1. **Focus on Metadata:** Most archives prefer to share only their metadata. Consequently, we aimed to create an interface that enabled users to annotate this metadata. 

<a class="spotlight" href="/assets/img/projects/Milli/Milli (1).png">![What is the Milli Contolled vocabulary](/assets/img/projects/Milli/Milli (1).png)</a>
What is the Milli Contolled vocabulary
{:.figcaption}

2. **Flexible Annotation Mechanism:** Users might want to annotate different archival items for various purposes. This was also highlighted in the W3C Standards for Web Annotation. 
3. 
<a class="spotlight" href="/assets/img/projects/Milli/Milli (2).png">![How to capture why someone annotates](/assets/img/projects/Milli/Milli (2).png)</a>
How to capture the reason why someone annotates
{:.figcaption}

3. **Metadata Standard Agnostic:** We observed that different archives employ different metadata standards, such as EAD, FOAF, and Dublincore. As a result, our import mechanism needed to be agnostic to these varying standards.

Based on these insights, we concentrated on several key areas:

## Archival Object Page

The archival object page is the focal point of interaction. We sought to create a design that would clearly indicate:

- Which fields are annotable,
- What fields act as access points to other objects in the archive,
- The hierarchy of the current object,
- User flows for private curation, notetaking, and collection, including mechanisms to subscribe to new annotations, make private annotations, and save objects to a 'jhola' (a metaphor for a bag).

## Annotation Widget
<a class="spotlight" href="/assets/img/projects/Milli/Milli (5).png">![Different types of annotable selectors for metadata and data](/assets/img/projects/Milli/Milli (5).png)</a>
Different types of annotable selectors for metadata and data
{:.figcaption}

Mocking up what search results would look like
The annotation widget is the tool that enables users to interact with the archival items. We aimed to create a design that would allow:

- Each annotation to be structured broadly as a key-value pair,
- Annotation of the entire object and also parts of the object’s description.

## Search Hits

<a class="spotlight" href="/assets/img/projects/Milli/Milli (6).png">![Mocking up what search results would look like](/assets/img/projects/Milli/Milli (6).png)</a>
Mocking up what search results would look like
{:.figcaption}


When users search for archival items, the results need to provide rich context. We aimed to improve this area by:

- Using the metadata categorization made for the Archival Object page to add more context in an accordion on the results card,
- Indicating whether the search had hits on the annotations in the object.

In summary, we focused on making archival items interactive, facilitating annotations on metadata, and ensuring the user interface is intuitive and informative. This endeavor aims to transform the archival landscape into a more connected, accessible, and engaging space.

<a class="spotlight" href="/assets/img/projects/Milli/Milli (9).png">![Thinking through different access types in search results](/assets/img/projects/Milli/Milli (9).png)</a>
Thinking through different access types in search results
{:.figcaption}





