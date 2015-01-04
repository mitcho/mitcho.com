---
title: 'User-Aided Disambiguation: a demo'
layout: post
comments: true
permalink: /blog/projects/user-aided-disambiguation-a-demo/
categories:
  - projects
tags:
  - ambiguity
  - arguments
  - code
  - interface
  - Japanese language
  - JavaScript
  - jQuery
  - language
  - Mozilla Planet
  - natural syntax
  - parser
  - ubiquity
---
A few weeks ago I made some visual mockups of [how Ubiquity could look and act in Japanese][1]. Part of this proposal was what I called &#8220;particle identification&#8221;: that is, immediate in-line identification of delimiters of arguments, which can be overridden by the user:

<center>
  <img src='/static/uploads/2009/02/particle-id.png' />
</center>

The inspiration for this idea came from Aza&#8217;s blog post [&#8220;Solving the &#8216;it&#8217; problem&#8221;][2] which advocates for this type of quick feedback to the user in cases of ambiguity. Such a method would help both the user better understand what is being interpreted by the system, as well as offer an opportunity for the user to correct improper parses. I just tried mocking up such an input box using [jQuery][3].

### ➔ [Try the User-Aided Disambiguation Demo][4]

If you have any bugfixes to submit or want to play around with your own copy, the demo code is [up on BitBucket][5]. ^^ Let me know what you think!

 [1]: http://mitcho.com/blog/projects/ubiquity-in-firefox-japanese/
 [2]: http://www.azarask.in/blog/post/solving-the-it-problem/
 [3]: http://jquery.com
 [4]: http://mitcho.com/code/ubiquity/ambiguity-demo/
 [5]: http://bitbucket.org/mitcho/ubiquity-parser-tng/