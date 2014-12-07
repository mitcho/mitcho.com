---
title: Scoring and Ranking Suggestions
layout: post
comments: true
permalink: /blog/observation/scoring-and-ranking-suggestions/
categories:
  - observation
tags:
  - algorithm
  - candidates
  - code
  - constraints
  - JavaScript
  - linguistics
  - Mozilla Planet
  - Optimality Theory
  - order
  - parser
  - ranking
  - score
  - suggestions
  - ubiquity
---
I just spent some time reviewing how Ubiquity currently ranks its suggestions in relation to to [Parser The Next Generation][1] so I thought I&#8217;d put some of these thoughts down in writing.

The issue of ranking Ubiquity suggestions can be restated as predicting an optimal output given a certain input and various conflicting considerations. Ubiquity (1.8, as of this writing) computes four &#8220;scores&#8221; for each suggestion:

<!--more-->

1.  `duplicateDefaultMatchScore`: 100 by default—lowered if an unused argument gets multiple suggestions (in [the words of the code][2]: &#8220;reduce the match score so that multiple entries with the same verb are only shown if there are no other verbs.&#8221;)
2.  `frequencyMatchScore`: a score from the `suggestion memory` of the frequency of the suggestion&#8217;s verb, given the input verb (currently the first word) or nothing, in the case of noun-first suggestions
3.  `verbMatchScore`: float in [0,1]: (as described [here][3]) 
    *   0.75 is returned in case there it is a noun-first suggestion (by virtue of the fact that `String.indexOf('')==0`)
    *   1 if the verb name is equivalent across input-output
    *   in [0.75,1) if the input is a prefix of the suggestion verb name
    *   in [0.5,0.75) if the input is a non-prefix substring of the suggestion verb
    *   in [0.25,0.5] if the input is a prefix of one of the `synonyms`
    *   in [0,0.25) if the input is a non-prefix substring of one of the `synonyms`
4.  `argMatchScore`: the number of arguments with matching &#8220;specific&#8221; nountypes, where &#8220;specific&#8221; is designated by the nountype having property `rankLast=false`.

With the numeric scores for each of these criteria, a partial order of suggestions is constructed using a [[lexicographic order]]: that is, compare candidates first using `duplicateDefaultMatchScore`, break ties using `frequencyMatchScore`, if still tied break using `verbMatchScore`, and if still tied break using `argMatchScore`. This paradigm of constraints is called &#8220;strictly ranked&#8221; and a corollary of this is that lower constraints, no matter how well you score on them, can never overcome a loss at a higher constraint. A crucial corollary of this system is that lower constraints&#8217; scores need not be computed if a higher constraint already dooms it to a lower position.[^1]

### Ranking in The Next Generation

One of the goals of [Parser The Next Generation][1] is to make noun/argument-first input first-class citizens of Ubiquity, improving their suggestions in particular to the benefit of [verb-final languages][4]. Arguments will be split up and tested against different noun types before a verb is even entered into the input, in which case target verbs can be ranked according to the appropriateness of the input&#8217;s arguments. As such, I believe the `argMatchScore` criteria above should either be ranked higher in a strictly ranked model or be allowed to overtake lower scores for the higher constraints in a non-strictly ranked model.

The [Parser The Next Generation][1] proposal and [demo][5] currently orders using a product of various criteria&#8217;s scores, rather than a lexicographic order of strictly ranked constraints. The component factors are:

1.  `0.5` for parses where the verb was suggested
2.  `0.5` for each extra (>1) `object` argument (essentially &#8220;unused words&#8221; in the previous parser)
3.  the score of each argument against that semantic role&#8217;s target noun type
4.  `0.8` for each unset argument of that verb

Each component score is a value in [0,1], so the score is always non-decreasing across the derivation. This offers a natural way to optimize the candidate set creation: if a possible parse ever gets a score below a magic &#8220;threshold&#8221; value, it is immediately thrown away.

A possible problem with the current Parser TNG scoring model is that it will implicitly hinder verbs and parses with more arguments as it could have more sub-1 noun type score factors—this consideration may be great enough that a weighted additive model should be considered over a multiplicative one.

**How do you think we can make Ubiquity&#8217;s suggestion ranking smarter? What other factors should be considered, and what factors could be left out?**

[^1]:    
    For all the linguists in the audience, if this sounds like [[Optimality Theory]], you would be right—there&#8217;s a little bit of [Prince and Smolensky (1993)][6] hanging out [in your browser][7].

 [1]: https://wiki.mozilla.org/User:Mitcho/ParserTNG
 [2]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/file/0aaeae361c33/ubiquity/modules/parser/parser.js#l558
 [3]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_Documentation#Scoring_the_Quality_of_the_Verb_Match
 [4]: http://mitcho.com/blog/projects/ubiquity-in-firefox-japanese/
 [5]: http://mitcho.com/code/ubiquity/parser-demo
 [6]: http://roa.rutgers.edu/view.php3?roa=537
 [7]: http://ubiquity.mozilla.com