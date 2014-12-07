---
title: Ubiquity in Italian!
layout: post
comments: true
permalink: /blog/projects/ubiquity-in-italian-2/
categories:
  - projects
tags:
  - code
  - Italian
  - Mozilla Planet
  - parser
  - ubiquity
---
Thanks to the great work of Sandro Della Giustina, we now have a preliminary Italian parser for use with Ubiquity Parser 2. Sandro brought up a good point, however, about Italian prepositions which contract with the article *and* the head noun. For example,

<pre lang='it'>traduci   dall'inglese     al     cinese
translate from=the=English to=the Chinese</pre>

One current solution is to add [[zero-width space|zero-width spaces]] after these contracted articles, *all&#8217;* and *dall&#8217;*.[^1] The appropriate way to add this to the parser is by defining a custom `wordBreaker()` method.

<pre lang='javascript'>it._patternCache.contractionMatcher = new RegExp('(^| )(all\'|dall\')','g');
it.wordBreaker = function(input) {
  return input.replace(this._patternCache.contractionMatcher,'$1$2\u200b');
};
</pre>

Grazie Sandro!

[^1]:    
    As [John Daggett][1] pointed out to me, in the future we may have to add an intermediate shallow parse instead of adding characters (in this case, the zero-width space) to the modified input.

 [1]: http://blog.mozilla.com/nattokirai/