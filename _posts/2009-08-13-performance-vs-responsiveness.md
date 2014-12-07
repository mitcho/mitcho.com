---
title: Performance vs Responsiveness —or— How I Made the Parser Twice As Fast in One Day
layout: post
comments: true
permalink: /blog/projects/performance-vs-responsiveness/
categories:
  - projects
tags:
  - code
  - JavaScript
  - Mozilla Planet
  - optimization
  - parser
  - performance
  - response
  - responsiveness
  - ubiquity
  - UI
---
Since we [launched Ubiquity 0.5][1], the issue of Parser 2 performance has been brought up [over][2] and [over][3] within the community. By virtue of having a [more flexible and localizable design][4], Parser 2 was expected to be slower than our original parser, but its current implementation felt noticeably—perhaps unnecessarily—slow compared to Parser 1. Parser 2 performance has been identified as [one of the blockers][5] for pushing Ubiquity 0.5+ to all of our 0.1.x users, and has thus been one of my recent foci.

### The short story:

Inspired by some comments by [Blair][6], yesterday I was able to make significant (roughly 100%) performance gains in Parser 2, resulting in 40-60% faster parses, depending on the query. This change [has been committed][7] and will be released as part of our forthcoming minor update, Ubiquity 0.5.4. Yay!

<!--more-->

### The long story: asynchronous parsing

Given that parsing in Ubiquity, combined with the post-parse of displaying suggestions, takes a good few dozen milliseconds, it is important to make sure it doesn&#8217;t block the main execution thread in order for the UI to stay responsive throughout. In other words, we needed to make it asynchronous.[^1]

When we began work on Parser 2 a few months ago, [Blair][6] stepped up to the plate to make it run asynchronously. For various reasons, the parser doesn&#8217;t run in a Worker thread for truer threading. Instead, what we did was to put the parser&#8217;s steps into a [generator][8] called `_yieldingParse`. The keyword `yield` is scattered in points throughout this generator.

<pre lang='javascript'>function _yieldingParse(...) {
  // step 1
  ...
  yield true;</p>

<p>
  // step 2
    ...
    {
      ...
      yield true;
    }
    ...
</p>



<p>
  }
  </pre>
</p>



<p>
  We then iterate over a <code>_yieldingParse</code> object in a function called <code>doAsyncParse</code>. Each time we go invoke <code>doAsyncParse</code>, it invokes <code>next</code> which advances from the last <code>yield</code> point of the parse to the next one. <code>doAsyncParse</code> checks after each step whether we should <code>keepworking</code> or not and then asynchronously advances to the next step by calling itself with a <code>setTimeout</code>. (Note the code below is a simplification.)
</p>



<p>
  <pre lang='javascript'>
var parseGenerator = _yieldingParse();</p>

<p>
  function doAsyncParse() {
    var ok = parseGenerator.next();
    if (ok && keepworking)
      Utils.setTimeout(doAsyncParse,0);
  }
</p>



<p>
  // get this party started
  Utils.setTimeout(doAsyncParse,0);
  </pre>
</p>



<p>
  The more often we <code>yield</code>, the more responsive the UI would be. However, there is a certain overhead to <code>yield</code>ing each time due to the <code>setTimeout</code>s we call. This point hit home when Blair told me the other day that the parser was much faster without any of the <code>setTimeout</code>s. Indeed, in my own testing running queries completely synchronously (replacing out all the <code>setTimeout</code>s), parses would run in roughly half the original time. However, by virtue of being completely synchronous, the parser would then completely lock up the UI.
</p>



<p>
  I thus set out to strike a balance between performance and responsiveness by taking out and moving some of the <code>yield</code>s in our <code>_yieldingParse</code> (<a href="http://ubiquity.mozilla.com/trac/ticket/856">#856</a>).
</p>



<h3>
  Tests, tests, tests
</h3>



<p>
  <a href='http://twitter.com/progrium/status/3273910705'><img src="http://mitcho.com/blog/wp-content/uploads/2009/08/Screen-shot-2009-08-12-at-4.38.50-PM.png" alt="Screen shot 2009-08-12 at 4.38.50 PM.png" border="0" width="641" height="206" /></a>
</p>



<p>
  Keeping this in mind, I ran a number of tests as I proceeded with my &#8220;refactoring.&#8221;
</p>



<p>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/08/notes1.jpg" alt="notes.jpg" border="0" width="649" height="327" />
</p>



<p>
  Here are some final parse time results:<fnref target="2" />
</p>



<p>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/08/beforeafter1.png" alt="beforeafter.png" border="0" width="576" height="344" />
</p>



<p>
  Four different queries (&#8220;hello to span&#8221;, &#8220;goo hello&#8221;, &#8220;22.7&#8221;, &#8220;tw as test&#8221; with a selection context of &#8220;hello world&#8221;) were run using each algorithm. The blue bar is the performance of the algorithm prior to adjustment of <code>setTimeout</code>s—that of Ubiquity 0.5.3. The gold bar is the time from a completely synchronous parse where all the <code>setTimeout</code>s were replaced. This algorithm completely locks up the UI, but is clearly the fastest, and should be seen as a baseline for all other yielding optimizations. The green bar is our new algorithm. As you can see, <strong>the parser is now roughly twice as fast.</strong>
</p>



<p>
  Moreover, the average time difference between <code>yield</code>s went from 0.7ms to 3.9ms which still should be no problem in terms of responsiveness.
</p>



<h3>
  Cancellability
</h3>



<p>
  This <code>doAsyncParse</code> is also the key for cancellability of the query. When a user changes the input or closes Ubiquity while a query is in progress, we want to cancel that query as soon as possible so the user and UI can advance. <code>keepworking</code> is set to false when the query is cancelled, so making sure that we <code>yield</code> early enough and often enough in the parse are important for issues like <a href="http://ubiquity.mozilla.com/trac/ticket/741">keystrokes being lost when typing too fast</a>.
</p>



<p>
  While the parser was indeed <code>yield</code>ing often enough (in fact, more often than necessary) before, I noticed that our first <code>yield</code> was often 15-20&#160;ms into the parse. This was because step 1 of our parse derivation was happening outside of the <code>doAsyncParse</code> loop. By moving this into that loop, I was able to bring this initial synchronous time down to around 10&#160;ms. Of course, setting up the parse generator itself takes a little overhead, so this can never go down to 0, but perhaps this will improve <a href="http://ubiquity.mozilla.com/trac/ticket/741">the keystroke issue</a> as well. <strong>I&#8217;d love to get anecdotal feedback on whether this update improves the disappearing keystrokes issue from 0.5.4 users.</strong>
</p>



<footnotes>
  <fn name="1">
    <p>
      This is analogous to <a href="http://shawnwilsher.com/archives/279">a recent discussion of the asynchronous AwesomeBar</a>.
    </p>
    
  </fn>
  
  <fn name="2">
    <p>
      A note on methodology: the Parser 2 Playpen (<a href="chrome://ubiquity/content/playpen.html">chrome://ubiquity/content/playpen.html</a>) was used for all testing and timing. All tests were in Firefox 3.5 on Mac OS X Leopard. My machine is a 2.4&#160;GHz Intel Core 2 Duo MacBook Pro. No other (non-OS/daemon) apps were running. No other tabs were open and no other add-ons were installed.
    </p>
    
  </fn>
</footnotes>

 [1]: http://labs.mozilla.com/2009/07/ubiquity-0-5/
 [2]: http://groups.google.com/group/ubiquity-firefox/browse_thread/thread/b0dfa649dda77a2c#
 [3]: http://groups.google.com/group/ubiquity-firefox/browse_thread/thread/13bc9ade35c8b708#
 [4]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [5]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-08-05_Weekly_Meeting#Notes
 [6]: http://theunfocused.net
 [7]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/77156d689b26
 [8]: https://developer.mozilla.org/en/New_in_JavaScript_1.7#Generators_and_iterators