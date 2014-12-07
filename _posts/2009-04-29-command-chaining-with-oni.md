---
title: Command Chaining with Oni?
layout: post
comments: true
permalink: /blog/link/command-chaining-with-oni/
categories:
  - link
tags:
  - asynchronous
  - code
  - composition
  - JavaScript
  - Mozilla Planet
  - recursion
  - ubiquity
---
There are two challenges to implementing so-called [command chaining][1], but only one of them is choosing a linguistically appropriate structural standard and parsing it. The other is the underlying difficulty of processing each individual &#8220;clause&#8221; in sequence, asynchronously. [Alex Fritze][2] blogged about how a project like his own [Oni][3] could dramatically simplify this underlying process.

[Ubiquity, Oni, and Composability][4]:

> but I cannot instruct it to give me list of translated google results: 
> <pre>translate (google foo) to German  // doesn't work</pre> Or email me the resulting list: 
> 
> <pre>email(translate (google foo) to German) // doesn't work</pre> &#8230;So how does Oni relate to this? Oni is a browser-based &#8220;embedded structured concurrency framework&#8221;. It allows you to write asynchronous code as if it was synchronous, adding back the kind-of composibility that is lost when juggling concurrent strands of execution (such as e.g. pending XMLHttpRequests) with &#8216;conventional&#8217; sequential languages.

 [1]: https://ubiquity.mozilla.com/trac/ticket/255
 [2]: http://www.croczilla.com
 [3]: http://www.croczilla.com/oni
 [4]: http://www.croczilla.com/blog/16