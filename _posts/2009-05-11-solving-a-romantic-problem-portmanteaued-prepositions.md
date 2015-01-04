---
title: 'Solving a Romantic Problem: Portmanteau&#8217;ed Prepositions'
layout: post
comments: true
permalink: /blog/projects/solving-a-romantic-problem-portmanteaued-prepositions/
categories:
  - projects
tags:
  - arguments
  - Catalan
  - French
  - Italian
  - linguistics
  - Mozilla Planet
  - parser
  - portmanteau
  - romance languages
  - ubiquity
---
### The problem:

In many [[romance languages]], prepositions and articles often form [[portmanteau|portmanteau morphs]], combining to form a single word.[^2] Some examples include (French) à + le > au, de + le > du, (Catalan) a + el > al, de + les > dels, per + el > pel. Italian has a particularly productive system of portmanteau&#8217;ed prepositions and articles&#8230; I refer you to the [[Contraction (grammar)#Italian|contraction]] article on Wikipedia.

As I [noted a couple weeks ago][1], however, some combinations do not form portmanteaus.[^1]

<!--more-->

**French:**

1.  à + le > au
2.  à + la > à la

The problem with this is that if we use both *à* and *au* as delimiters, we may end up passing the definite article to the verb as part of the argument in some cases, but not in other cases.

1.  &#8220;**à** la table&#8221; = &#8220;**to** the table&#8221;
2.  &#8220;**au** chat&#8221; = &#8220;**to the** cat&#8221;

### The solution:

The solution is a new step in [the Parser 2 process][2] which normalizes the form of arguments. Each language&#8217;s parser can now optionally define a `normalizeArgument()` method which takes an argument and returns a list of normalized alternates. Normalized arguments are returned in the form of `{prefix: '', newInput: '', suffix: ''}`. For example, if you feed &#8220;la table&#8221; to the French `normalizeArgument()`, it ought to return

<pre lang='javascript'>[{prefix: 'la ', newInput: 'table', suffix: ''}]</pre>

If there are no possible normalizations, `normalizeArgument()` should simply return `[]`. Each alternative returned by `normalizeArgument()` is substituted into a copy of the possible parses just before nountype detection. The prefixes and suffixes are stored in the argument (as `inactivePrefix` and `inactiveSuffix`) so they can be incorporated into the suggestion display.

Here, for example, is how the inactive prefix &#8220;l&#8217;&#8221; is displayed in [the parser demo][3]. This way the user is told that the &#8220;l&#8217;&#8221; prefix is being ignored, and the nountype detection and verb action can act on the argument &#8220;English&#8221;.[^3] (In the future, of course, we could teach this nountype to accept the Catalan &#8220;anglès&#8221;.)

<center>
  <img src="/static/uploads/2009/05/picture-1.png" alt="Picture 1.png" border="0" width="320" height="29" />
</center>

The easiest way to produce this output is to use the [`String.match()`][4] method. For example `normalizeArgument()` code, I refer you to the [Catalan][5] and [French][6] parser files.

I hope that this solution will help make Ubiquity with Parser 2 feel [more natural][7] for many romance languages.

[^2]:    
    Thanks to [Jeremy O&#8217;Brien][8] for helping me figure out how to refer to this phenomenon.

[^1]:    
    This also relates to the issue of [parsing multi-word delimiters][9], though the argument normalization strategy covered here should reduce the necessity of multi-word delimiters.

[^3]:    
    Thank you to contributor [Toni Hermoso Pulido][10] for our first attempt at a Catalan parser!

 [1]: http://mitcho.com/blog/how-to/adding-your-language-to-ubiquity-parser-2/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [3]: chrome://parser-demo/content/index.html
 [4]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/match
 [5]: http://ubiquity.mozilla.com/hg/ubiquity-firefox/file/12f5d9abf011/ubiquity/modules/parser/new/ca.js
 [6]: http://ubiquity.mozilla.com/hg/ubiquity-firefox/file/12f5d9abf011/ubiquity/modules/parser/new/fr.js
 [7]: http://mitcho.com/blog/projects/how-natural-should-a-natural-interface-be/
 [8]: http://people.ucsc.edu/~jpobrien/
 [9]: http://ubiquity.mozilla.com/trac/ticket/671
 [10]: http://www.cau.cat/blog/