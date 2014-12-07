---
title: 'Great news! You can opt-out from Omniture&#8217;s 192.168.112.2o7.net'
layout: post
comments: true
permalink: /blog/observation/great-news-you-can-opt-out-from-omnitures-1921681122o7net/
enclosure:
  - |
    http://movies.apple.com/movies/us/apple/getamac/apple-getamac-security_480x376.mov

    3591501

    video/quicktime
categories:
  - observation
tags:
  - Daring Fireball
  - iTunes
---
Omniture&#8217;s disgusting `192.168.112.2o7` tracking url and Adobe CS3&#8217;s use of it has been picking up some dirt recently, starting with [uneasysilence][1], and propagated through [DF][2], [ZDnet][3], and more.[^1] And then it was discovered that [the Apple iTunes MiniStore does the same][4]. But [ValleyWag gives you the good news][5]:

> Don&#8217;t want to be their guinea pig? Omniture lets you opt out.

Oh wait, really? You can? That&#8217;s great! This [opt-out link][6] gives you a [[cookie]] called `omniture_optout` on `.2o7.net` with a `1` value. But wait, it&#8217;s a cookie? That means&#8230;

[Omniture opt-out][7] explains (emphasis mine):

> &#8230;it is necessary to install a cookie *on your browser*. This cookie identifies that you have opted-out. If you delete the opt-out cookie, or if you change computers or *Web browsers*, you will need to opt-out again.

That&#8217;s right. Cookies are stored in your *browser*. So if you opt-out in Safari or FF, will you be opted-out in a CS3 app? Um, no. Or in the iTunes MiniStore? No.

In the case of the MiniStore, you can just [turn it off][8]. But in the CS3 case (and for any other apps that build such communications in) things are trickier. As a commenter suggests on the ValleyWag, it looks like [Little Snitch][9] is the best way of clearly opting-out of communications like this. Unless, of course, you want to [switch to Vista][10].

[^1]:    
    It&#8217;s important to give props to our man [John Gruber][2]. The ZDNet article jumps on the [John Nack][11] train of &#8220;you can&#8217;t call this disgraceful without looking into it!&#8221; But you clearly can see something is suspicious about a `192.168.112.2o7` url, which was the main impetus for Gruber&#8217;s harsh claims. [John Nack hath since repented][12].

 [1]: http://uneasysilence.com/archive/2007/12/12789/
 [2]: http://www.daringfireball.net
 [3]: http://blogs.zdnet.com/Apple/?p=1140
 [4]: http://www.since1968.com/article/155/omniture-itunes
 [5]: http://valleywag.com/338011/wear-tinfoil-hats-when-using-adobe-products
 [6]: http://www.112.2o7.net/optout.html?omniture=1&popup=1&locale=en_US&optout=1
 [7]: http://www.112.2o7.net/optout.html?omniture=1&popup=1&locale=en_US
 [8]: http://docs.info.apple.com/article.html?artnum=303066
 [9]: http://obdev.at/products/littlesnitch/index.html
 [10]: http://movies.apple.com/movies/us/apple/getamac/apple-getamac-security_480x376.mov
 [11]: http://blogs.adobe.com/jnack/2007/12/adobe_ate_me_ba.html
 [12]: http://blogs.adobe.com/jnack/2007/12/whats_with_adob.html