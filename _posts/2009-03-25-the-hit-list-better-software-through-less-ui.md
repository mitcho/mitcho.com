---
title: 'The Hit List: Better Software Through Less UI'
layout: post
comments: true
permalink: /blog/link/the-hit-list-better-software-through-less-ui/
categories:
  - link
tags:
  - AppleScript
  - design
  - interface
  - language
  - Mac OS X
  - Mozilla Planet
  - natural syntax
  - tasks
  - thought process
  - ubiquity
---
[The Hit List][1] is a to-do list app for Mac OS X with a beautiful interface and some nice features. Creator Andy Kim&#8217;s latest blog post ([Better Software Through Less UI][2]) is excellent reading for the Ubiquity community. He describes the thought process behind the design of a new clean and &#8220;frictionless&#8221; interface for specifying how tasks are repeated. After throwing out the regular combinations and templates of different input widgets, *his solution was to implement a partial natural language input interface:*

![][3]

> There is no myriad of buttons and fields to choose from. All the user has to do is directly type in what he wants.

Here are a couple other choice quotes which will ring true for the Ubiquity users and internationalization folks in the audience:

> For this to work without driving the user mad, the natural language parser has to be near perfect. The last thing I want is for this to come out smelling like AppleScript.

<span></span>

> **Problems**  
> This design isn&#8217;t perfect as it has two glaring problems. One is that the user has no easy way of discovering how complex the recurrence rules can be. This isn&#8217;t such a huge problem, but a way to solve this is to include a help button to show example rules or to include an accompanying iCal style UI to let the user setup the recurrence rule in a more typical fashion. I didn&#8217;t include these in the initial implementation though because I wanted to see how users would react to this kind of UI.  
> Another problem is localization. Even if I write parsers for a few more popular languages, it won&#8217;t accommodate the rest of the users in the world. Again, the solution is an accompanying traditional UI, but for now, I&#8217;m leaving it the way it is until I get some feedback.

There&#8217;s a trend in the wind, my friends: the incorporation of near-natural language for more [humane][4] interfaces.

 [1]: http://www.potionfactory.com/thehitlist/
 [2]: http://www.potionfactory.com/blog/2009/03/10/better-software-through-less-ui
 [3]: http://www.potionfactory.com/files/blog/2009/03/repeating_task_1.png
 [4]: http://humanized.com/weblog/2006/06/01/why_humane_is_a_better_word_than_usable/