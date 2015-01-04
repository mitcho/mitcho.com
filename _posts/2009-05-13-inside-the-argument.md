---
title: Inside the Argument
layout: post
comments: true
permalink: /blog/projects/inside-the-argument/
categories:
  - projects
tags:
  - argument
  - Catalan
  - code
  - Mozilla Planet
  - parser
  - ubiquity
---
Here&#8217;s a little picture of the different sections of text in a single parsed argument and which properties of the resultant argument object they are assigned to.

<img src="/static/uploads/2009/05/insidetheargument.jpg" alt="insidetheargument.jpg" border="0" width="650" height="350" />

You&#8217;ll see, from left to right, `outerSpace`, `modifier`, `innerSpace`, `inactivePrefix`, `input`/`data`, `inactiveSuffix`.

The example text is from the Catalan example, &#8220;compra mitjons amb el Google,&#8221; meaning &#8220;buy socks with Google.&#8221; You&#8217;ll notice the argument &#8220;amb el Google&#8221; is literally &#8220;with the Google.&#8221; The `normalizeArgument()` method of the Catalan parser, as [I described earlier this week][1], strips the article &#8220;el &#8221; and puts it in the `inactivePrefix` property of the argument.

I&#8217;m going to spend the rest of the day updating [Parser 2 design doc][2] and related documentation so they match these and other recent developments in the parser.

 [1]: http://mitcho.com/blog/projects/solving-a-romantic-problem/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2