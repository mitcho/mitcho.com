---
title: Better Linguist List RSS Feeds
layout: post
comments: true
permalink: /blog/projects/better-linguist-list-rss-feeds/        
categories:
  - projects
tags:
  - annoyances
  - code
  - Linguist List
  - linguistics
  - RSS
---
[<img src="http://mitcho.com/blog/wp-content/uploads/2010/04/linguistlist.png" alt="" title="linguistlist" width="268" height="99" class="alignright size-full wp-image-3556" />][1]

Everyone I know in linguistics uses the [LINGUIST List][2] website to a greater or lesser degree. Linguist List began as a mailing list in the 90&#8217;s, with book, job, and dissertation announcements, call-for-papers, and general academic discussions.

Nowadays many people follow the various announcements on Linguist List using an RSS feed reader such as [Google Reader][3] or my personal favorite [NetNewsWire][4].

Unfortunately, the Linguist List RSS feeds (at least recently) don&#8217;t include the full text of the articles and have a few other quirks as well. It&#8217;s often hard to judge based on the title whether it&#8217;s really something I&#8217;m interested or not, so I&#8217;ve spent a lot of time frustratedly opening any possibly interesting-looking entry in a separate NetNewsWire tab. Today I decided enough was enough: I just wrote a script which parses each of the Linguist List RSS feeds, finds the actual descriptions and interleaves them.[^1] It&#8217;s working remarkably well so far:

<!--more-->

<a rel='imagebox' href="http://mitcho.com/blog/wp-content/uploads/2010/04/Screen-shot-2010-04-26-at-6.41.07-PM.png"><img src="http://mitcho.com/blog/wp-content/uploads/2010/04/Screen-shot-2010-04-26-at-6.41.07-PM.png" alt="" title="Screen shot 2010-04-26 at 6.41.07 PM" width="650" height="365" class="alignright size-full wp-image-3557" /></a>

Here are all the RSS links for all of you to subscribe to. I plan on keeping this up and maintained for the foreseeable future (or, until Linguist List improves their own RSS feeds!) so feel free to subscribe to it. Please do let me know if you run into any issues or have a suggestion. <img src="http://mitcho.com/blog/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />

<table>
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListMostRecent" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Most recent issues</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListMostRecent"><img src="http://feeds.feedburner.com/~fc/LinguistListMostRecent?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListAll" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> All (announcements)</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListAll"><img src="http://feeds.feedburner.com/~fc/LinguistListAll?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListBooks" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Book announcements</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListBooks"><img src="http://feeds.feedburner.com/~fc/LinguistListBooks?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListCalls" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Call for papers</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListCalls"><img src="http://feeds.feedburner.com/~fc/LinguistListCalls?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListConfs" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Conference announcements</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListConfs"><img src="http://feeds.feedburner.com/~fc/LinguistListConfs?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListDisc" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Discussions</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListDisc"><img src="http://feeds.feedburner.com/~fc/LinguistListDisc?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListDiss" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Dissertation announcements</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListDiss"><img src="http://feeds.feedburner.com/~fc/LinguistListDiss?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListFYI" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> FYI</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListFYI"><img src="http://feeds.feedburner.com/~fc/LinguistListFYI?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListJobs" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Job announcements</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListJobs"><img src="http://feeds.feedburner.com/~fc/LinguistListJobs?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListMedia" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Topics in the Media</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListMedia"><img src="http://feeds.feedburner.com/~fc/LinguistListMedia?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListQs" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Queries</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListQs"><img src="http://feeds.feedburner.com/~fc/LinguistListQs?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListReview" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Book reviews</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListReview"><img src="http://feeds.feedburner.com/~fc/LinguistListReview?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSoftware" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Software announcements</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSoftware"><img src="http://feeds.feedburner.com/~fc/LinguistListSoftware?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSum" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Summaries of Query Responses</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSum"><img src="http://feeds.feedburner.com/~fc/LinguistListSum?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSupport" type="application/rss+xml"><img src='http://feedburner.google.com/fb/lib/images/icons/feed-icon-12x12-orange.gif' /> Support for Students</a>
    </td>
    
    <td>
      <a href="http://feeds.feedburner.com/LinguistListSupport"><img src="http://feeds.feedburner.com/~fc/LinguistListSupport?bg=99CCFF&#038;fg=444444&#038;anim=0" height="26" width="88" style="border:0" alt="" /></a>
    </td>
  </tr>
</table>

You can find descriptions of the content of each of these feeds [on Linguist List&#8217;s RSS feeds page][5].

<a href="http://www.feedburner.com" target="_blank"><img src="http://www.feedburner.com/fb/images/pub/i_heart_fb.gif" alt="Powered by FeedBurner" style="border:0" /></a>

Perhaps in the future I&#8217;ll do a &#8220;how to&#8221; post as well with the code I use to make this happen. I&#8217;ll note that it&#8217;s just 70 lines of PHP (including whitespace) and could no doubt be tightened up. <img src="http://mitcho.com/blog/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />

[^1]:    
    Veteran Linguist List RSS subscribers will also note that I&#8217;m adding the full title to the entry title for the Conferences and Calls lists as well.

 [1]: http://mitcho.com/blog/wp-content/uploads/2010/04/linguistlist.png
 [2]: http://linguistlist.org/
 [3]: http://google.com/reader
 [4]: http://netnewswireapp.com/
 [5]: http://linguistlist.org/issues/rss/topics.cfm