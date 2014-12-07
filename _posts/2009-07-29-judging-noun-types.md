---
title: Judging Noun Types
layout: post
comments: true
permalink: /blog/projects/judging-noun-types/
categories:
  - projects
tags:
  - arguments
  - code
  - design
  - Mozilla Planet
  - nountypes
  - scoring
  - ubiquity
---
### Introduction

Different arguments are classified into different kinds of nouns in Ubiquity using *noun types*.[^1] For example, a string like &#8220;Spanish&#8221; could be construed as a language, while &#8220;14.3&#8221; should not be. These kinds of relations are then used by the parser to introduce, for example, language-related verbs (like `translate`) using the former argument, and number-related verbs (like `zoom` or `calculate`) based on the latter. Ubiquity nountypes aren&#8217;t exclusive—a single string can count as valid for a number of different nountypes and in particular the &#8220;arbitrary text&#8221; nountype (`noun_arb_text`) will always accept any string given.

In addition to the [various built-in nountypes][1], Ubiquity lets command authors [write their own nountypes][2] as well.

### The functions of a noun type

Nountypes have two functions: the first is **accepting and suggesting** suggestions and the second is **scoring**.

<!--more-->

#### Accepting and suggesting

Nountypes don&#8217;t just have to accept the exact string they were given—they can also return suggestions which are based on that input. For example, the `noun_type_language` can take the input &#8220;span&#8221; and return &#8220;Spanish.&#8221; A nountype can return multiple suggestions which may or may not include the trivial suggestion, i.e. the original input as is. If there is no way that that input could possibly be part of an accepted value, it should return no suggestions, i.e. `[]`.[^3]

#### Scoring

Ubiquity 0.5 with Parser 2 introduced the notion of a nountype suggestion *score*. For example, two different nountypes can accept the same input, but with different scores. Scores range from 0 to 1 where 1 is a perfect or exact suggestion and 0.1 or so is a very very improbable suggestion.[^2] These scores are used in the [scoring of parses][3]. Because verbs specify certain nountypes for each of their arguments, the scores that individual nountypes return for each argument are a crucial component of the scoring algorithm and can even determine whether a parse is returned or not.

With this in mind, you may be tempted to make your nountype return a score of 1 on any input so your verb will show up in the suggestions highly. While this would work, it will only act to make your verb annoying and a poor Ubiquity citizen. Appropriate scores must be given to noun suggestions, with higher values reflecting confidence and lower values reflecting imprecision. *But how exactly do you figure out what&#8217;s an appropriate value?*

### Judging nountypes with the Nountype Tuner

The Nountype Tuner is a new tool I&#8217;ve been building to help both Ubiquity core developers and command authors to check their nountypes against others and to &#8220;tune&#8221; their behavior and scores. The nountype tuner will take your input and throw it against all of the nountypes referenced in your active verbs and display the suggestions returned with their scores. You can think of it as [the Playpen][4]&#8217;s little sister.

<img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner.png" alt="tuner.png" border="0" width="650" height="646" />

The Nountype Tuner can be found at <chrome://ubiquity/content/tuner.html>, though I am pretty sure it is broken in Ubiquity 0.5 and 0.5.1. It has been fixed now and I will make sure it&#8217;s in good shape for 0.5.2.

The heart and soul of the Nountype Tuner is this scale:

<center>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
</center>

This scale tells you, *in plain English*, what different scores represent and correspond to, in two sets of vocabulary: &#8220;in terms of a guess&#8221; and &#8220;in terms of a match.&#8221; While still subjective, this scale helps developers just different input/output pairs and their scores. For example, &#8220;lian&#8221; → &#8220;http://lian&#8221; is given 0.5, so it&#8217;s an okay guess or a possible match&#8230; does that seem right to you? Or &#8220;lian&#8221; → &#8220;Italian&#8221; being between &#8220;okay&#8221; and &#8220;good.&#8221; Appropriate? We can look at such statements, decide how we feel about them, and tweak if necessary.

### Good nountype scores have roots

<img src="http://mitcho.com/blog/wp-content/uploads/2009/07/roots.jpg" alt="roots.jpg" border="0" width="650" height="300" />

<small>CC-BY <a href="http://www.flickr.com/photos/aaronescobar/2569091622/">Aaron Escobar</a></small>

&#8230;not that kind of root, but more like [this kind of root][5]&#8230; let me explain&#8230;

When comparing the scores that individual nountypes return for different inputs, we must compare those scores *within the same nountype&#8217;s family of suggestions* to see if higher scores truly correspond to higher confidence. For example, the language nountype should give the suggestion &#8220;French&#8221; for both the inputs &#8220;f&#8221; and &#8220;fren,&#8221; but the scores of these suggestions should be different—i.e. the score of &#8220;f&#8221; → &#8220;French&#8221; should be much lower than the score for &#8220;fren&#8221; → &#8220;French,&#8221; reflecting the additional informational value. We refer to this relation of the scores of successive prefixes of a single suggestion all returning that same suggestion as the *score curve* and in general it should be non-decreasing.[^4]

One could say the most trivial score function then is the linear one. For a series of converging prefixes of the same suggestion (&#8220;Dutch&#8221;), under a linear approach we could naively let the score be (length of the input)/(length of the suggestion), as below:

<center>
  </p> <h4>
    the linear model
  </h4>
  
  <table>
    <tr>
      <th>
        input
      </th>
      
      <td>
        d
      </td>
      
      <td>
        du
      </td>
      
      <td>
        dut
      </td>
      
      <td>
        dutc
      </td>
      
      <td>
        dutch
      </td>
    </tr>
    
    <tr>
      <th>
        output
      </th>
      
      <td>
        Dutch
      </td>
      
      <td>
        Dutch
      </td>
      
      <td>
        Dutch
      </td>
      
      <td>
        Dutch
      </td>
      
      <td>
        Dutch
      </td>
    </tr>
    
    <tr>
      <th>
        score
      </th>
      
      <td>
        0.2
      </td>
      
      <td>
        0.4
      </td>
      
      <td>
        0.6
      </td>
      
      <td>
        0.8
      </td>
      
      <td>
        1
      </td>
    </tr>
  </table>
  
  <p>
    </center>
  </p>
  
  <p>
    This linear model is represented below by the black line.
  </p>
  
  <p>
    <center>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/nth-roots.png" alt="nth-roots.png" border="0" width="299" height="262" />
    </center>
  </p>
  
  <p>
    The problem with the linear model is that earlier transitions (additional keystrokes) <em>add more information</em> than the later ones. Once we&#8217;ve entered &#8220;dutc,&#8221; after all, we would like to be <em>pretty darn sure</em> that we mean &#8220;Dutch,&#8221; so the score difference between &#8220;dutc&#8221; and &#8220;dutch&#8221; should be less than the score difference between, say, &#8220;d&#8221; and &#8220;du.&#8221; We want a score curve that looks more like the solid or dotted red lines above.
  </p>
  
  <p>
    For this reason, <strong>I strongly advocate the incorporation of an <em>n</em>th-root in the score computation</strong>. <em>N</em>th-rooted score functions over [0,1] have the feature that they are increasing but also that earlier transitions affect the score more than later ones, which is exactly what we&#8217;d like to see. (The solid red line above is <code>x^1/2</code> and the dotted one is <code>x^1/3</code>.)<fnref target="5" />
  </p>
  
  <h3>
    Conclusion
  </h3>
  
  <p>
    Properly tuning both the built-in nountypes and custom nountypes is crucial to producing more accurate and relevant parse suggestions. I&#8217;ll be using the principles and criteria laid out above, combined with the new Nountype Tuner, to <a href="http://ubiquity.mozilla.com/trac/ticket/746">tune the built-in nountypes (trac #746)</a> in the coming days in preparation for our <a href="http://tinyurl.com/lgekyh">0.5.2 release</a>. I invite you to use the Nountype Tuner in 0.5.2 to tune your custom nountypes as well.
  </p>
  
  <footnotes>
    <fn name="1">
      <p>
        Or, as I often write them, &#8220;nountypes.&#8221;
      </p>
    </fn>
    
    <fn name="3">
      <p>
        Note that I didn&#8217;t just say &#8220;if the input is not an accepted value&#8230;&#8221; That&#8217;s because, based on the left-to-right nature of text input, an argument may later become a valid input of a certain nountype with a few more keystrokes. For example, if we had a URL nountype which accepted &#8220;http://mitcho.com&#8221; but not &#8220;http://mitcho&#8221;, any command which took this nountype would not show up in the suggestions while we were typing out &#8220;http://mitcho&#8221;&#8230; but would suddenly appear when we completed the &#8220;.com&#8221;. The best practice here is to suggest a valid value for the initial &#8220;http://mitcho&#8221;, like &#8220;http://mitcho.com&#8221;.<br />(In reality, I should have said &#8220;initial-to-later nature&#8221; to be fair to right-to-left languages, but you get the idea. Speaking of which, serious consideration of Ubiquity in right-to-left languages is long overdue.)
      </p>
    </fn>
    
    <fn name="2">
      <p>
        In reality, due to the way parses are scored and the fact that <code>noun_arb_text</code> accepts anything with score 0.3, a suggestion with score below 0.3 is probably not worth even giving out. Notable exceptions are for custom noun types which are used in commands which take multiple arguments&#8230; in these cases, even scores below 0.3 could add up and overtake a <code>noun_arb_text</code> parse, but it&#8217;s rare.
      </p>
    </fn>
    
    <fn name="4">
      <p>
        The idea that successively longer inputs should yield successively higher scores only makes sense (1) when they are converging on the same suggestion output and (2) when these are truly suggestions, not just acceptances. For nountypes which accept the input verbatim, suggestion scores need not increase&#8230; for example &#8220;1&#8221; is just as good a &#8220;number&#8221; as &#8220;1234&#8221; is, so both of their respective suggestions, &#8220;1&#8221; and &#8220;1234&#8221; could be given the same score.
      </p>
    </fn>
    
    <fn name="5">
      <p>
        Unfortunately the Nountype Tuner currently only compares the suggestions of <em>one input</em> across a number of nountypes, not a number of inputs across the same nountype. In the future I&#8217;d like to make the Nountype Tuner be able to produce these sorts of score curves as well.
      </p>
    </fn>
  </footnotes>

 [1]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/tip/ubiquity/modules/nountypes.js
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_Source_Tip_Author_Tutorial#Writing_a_Noun_Type_Object
 [3]: http://mitcho.com/blog/observation/scoring-for-optimization/
 [4]: http://mitcho.com/blog/projects/changes-to-ubiquity-parser-2-and-the-playpen/
 [5]: http://en.wikipedia.org/wiki/Nth_root