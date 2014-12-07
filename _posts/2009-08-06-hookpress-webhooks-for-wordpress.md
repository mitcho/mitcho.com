---
title: 'HookPress: Webhooks for WordPress'
layout: post
comments: true
permalink: /blog/projects/hookpress-webhooks-for-wordpress/
categories:
  - projects
tags:
  - code
  - mashups
  - Mozilla Planet
  - PHP
  - plugin
  - webhooks
  - WordPress
  - WordPress Planet
---
I recently have spent a little time putting together a new WordPress plugin called HookPress. [HookPress][1] lets you add [webhooks][2] to WordPress, letting you easily develop push notifications or extend WordPress in languages other than PHP.

WordPress itself is built on a [powerful plugin API][3] which provides [**actions**][4] and [**filters**][5]. Actions correspond to events, so you can set a webhook to fire when a post is published or a comment is made.[^1] Filters let you modify some text when it is saved or displayed, so you can have your external webhook script reformat some text or insert some other content dynamically. Not all actions and filters are supported at this time, but I will continue to add more in.

There&#8217;s a [webhooks meetup in San Francisco][6] today but I unfortunately left SF this morning, so I created a video which will be played there as a lightning talk. A demo of both types of webhooks are in the video as well.



[HookPress: add webhooks to WordPress][7] from [mitcho][8] on [Vimeo][9].

I&#8217;m really excited by this very simple but potentially high-impact plugin. I&#8217;d love to get your comments and feedback on this new plugin and hope to hear how you&#8217;re using HookPress!

ADDENDUM: Please also [follow HookPress on twitter][10]!

[^1]:    
    My friend Abi actually has already blogged about [HookPress and how it can be used to tweet on post publication][11].

 [1]: http://wordpress.org/extend/plugins/hookpress/
 [2]: http://webhooks.org
 [3]: http://codex.wordpress.org/Plugin_API
 [4]: http://codex.wordpress.org/Plugin_API/Action_Reference
 [5]: http://codex.wordpress.org/Plugin_API/Filter_Reference
 [6]: http://upcoming.yahoo.com/event/4049111
 [7]: http://vimeo.com/5905102
 [8]: http://vimeo.com/mitchoyoshitaka
 [9]: http://vimeo.com
 [10]: http://twitter.com/hookpress/
 [11]: http://blog.abi.sh/2009/tweeting-your-blog-with-hookpress/