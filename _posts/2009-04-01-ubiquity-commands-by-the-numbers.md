---
title: Ubiquity Commands by The Numbers
layout: post
comments: true
permalink: /blog/projects/ubiquity-commands-by-the-numbers/
categories:
  - projects
tags:
  - arguments
  - code
  - data
  - herd
  - localization
  - Mozilla Planet
  - nountypes
  - parser
  - ubiquity
  - verbs
---
Recent work in the Ubiquity internationalization realm has focused on the upcoming Ubiquity parser which will bring some great new features to Ubiquity, including support for [overlord verbs][1] and [semi-automatic localization of commands via semantic roles][2]. It&#8217;s possible, though, that these new features will break backwards compatibility of the current command specification and noun types. [[Creative destruction]] for the win.

As we look to [move forward][3] with incorporating [the next generation parser][4] into Ubiquity proper, it thus becomes important to take a look at the current command ecosystem to see how possibly disruptive this move will be. To this end last night I wrote a quick perl script to scrape the commands cached on [the herd][5] and get some quantitative answers to my questions.

<!--more-->

(1577 different verbs were analyzed. None of these computations below are weighted by feed popularity.)

### Q: Are there a lot of commands which use more than one argument?

A: The vast majority (>85%) of commands take one or no arguments, requiring no modifiers. Only those remaining 15% will require a switch to refer to different arguments by [semantic role][2].

<center>
  <img src="/static/uploads/2009/03/herdcommands.png" alt="herdcommands.png" border="0" width="500" height="355" />
</center>

### Q: Do many commands introduce custom noun types?

A: 147 different noun types (lumping anonymous inline objects as one type) were detected. The vast majority of all `takes` (direct object) arguments were of type `noun_arb_text`, although many `modifiers` arguments used custom noun types. The other standard (built-in) noun types are well represented as well, with `noun_type_language` coming in at second place. Here&#8217;s a chart with all the noun types which had more than one use.

<div style='overflow-y: auto; max-height: 300px;'>
  <center>
    <img src="/static/uploads/2009/03/herdnountypes1.png" alt="herdnountypes.png" border="0" width="550" height="846" />
  </center>
</div>

### Q: Are commands with `modifiers` using natural-language delimiters?

A: Most of the modifiers detected were English prepositions such as &#8220;from&#8221;, &#8220;to&#8221;, &#8220;as&#8221;, &#8220;with&#8221;, but other words were also seen such as &#8220;title&#8221;, &#8220;type&#8221;, &#8220;username&#8221;, and &#8220;message&#8221; and even a handful of commands with symbols such as &#8220;@&#8221;, &#8220;>&#8221;, or &#8220;#&#8221;.

 [1]: http://jonoscript.wordpress.com/2009/01/24/overlord-verbs-a-proposal/
 [2]: http://mitcho.com/blog/projects/writing-commands-with-semantic-roles/
 [3]: http://groups.google.com/group/ubiquity-i18n/browse_thread/thread/22fa223f43ef6262
 [4]: http://mitcho.com/code/ubiquity/parser-demo/
 [5]: http://ubiquity.mozilla.com/herd/