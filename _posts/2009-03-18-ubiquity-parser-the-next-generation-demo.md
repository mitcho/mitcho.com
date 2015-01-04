---
title: 'Ubiquity Parser: The Next Generation Demo'
layout: post
comments: true
permalink: /blog/projects/ubiquity-parser-the-next-generation-demo/
categories:
  - projects
tags:
  - algorithm
  - arguments
  - California
  - code
  - interface
  - JavaScript
  - Mozilla Planet
  - overlord verbs
  - parser
  - photo
  - proposal
  - semantic role
  - ubiquity
  - verb-final
  - verbs
---
<a href='/static/uploads/2009/03/parserdesign.jpg' rel='lightbox[parser]'><img src="/static/uploads/2009/03/parserdesign.jpg" alt="parserdesign" title="parserdesign" width="600" height="450" class="limages" /></a>

A week or two ago while visiting California, [Jono][1] and I had a productive charrette, resulting in a new architecture proposal for the Ubiquity parser, as laid out in [Ubiquity Parser: The Next Generation][2]. The new architecture is designed to support (1) the use of [overlord verbs][3], (2) [writing verbs by semantic roles][4], and (3) better suggestions for [verb-final languages][5] and other argument-first contexts. I&#8217;m happy to say that I&#8217;ve spent some time putting a proof-of-concept together.

I&#8217;ve implemented the basic algorithm of this parser for [[left-branching]] languages (like English) and also implemented some fake English verbs, noun types, and semantic roles. This demo should give you a basic sense of how this parser will attempt to identify different types of arguments and check their noun types even without clearly knowing the verb. This should make the suggestion ranking much smarter, particularly for verb-final contexts. (For a good example, try `from Tokyo to San Francisco`.)

### [➔ Check out the Ubiquity next-gen parser demo][6]

<!--more-->

Clicking on the *environment info* will give you some information on the specific verbs, noun types, and roles implemented. You can also scroll through the *current parse* section to see the step by step derivation of how the suggested parses were constructed.

I&#8217;ll be flying about 15 hours in the next hour as I make my way back to Japan&#8230; hopefully I&#8217;ll make some more progress on the plane! I&#8217;ll look forward to your comments! *For those of you interested in checking out the code yourself, you can find it on [BitBucket][7].*

 [1]: http://jonoscript.wordpress.com
 [2]: https://wiki.mozilla.org/User:Mitcho/ParserTNG
 [3]: http://jonoscript.wordpress.com/2009/01/24/overlord-verbs-a-proposal/
 [4]: http://mitcho.com/blog/projects/writing-commands-with-semantic-roles/
 [5]: http://mitcho.com/blog/projects/ubiquity-in-firefox-japanese/
 [6]: http://mitcho.com/code/ubiquity/parser-demo/
 [7]: http://bitbucket.org/mitcho/ubiquity-playground/