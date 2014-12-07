---
title: Adding Your Language to Ubiquity Parser 2
layout: post
comments: true
permalink: /blog/how-to/adding-your-language-to-ubiquity-parser-2/
categories:
  - how to
tags:
  - argument structure
  - arguments
  - case marking
  - code
  - French
  - i18n
  - JavaScript
  - l10n
  - linguistics
  - localization
  - Mozilla Planet
  - parser
  - semantic roles
  - ubiquity
---
**NOTE: This blog post has now been added to the Ubiquity wiki and is updated there. Please disregard this article and instead follow [these instructions][1].**

You&#8217;ve [seen the video][2]. You speak another language. And you&#8217;re wondering, **&#8220;how hard is it to add my language to Ubiquity with Parser 2?&#8221;** The answer: **not that hard.** With a little bit of JavaScript and knowledge of and interest in your own language, you&#8217;ll be able to get at least rudimentary Ubiquity functionality in your language. Follow along in this step by step guide and please [submit your (even incomplete) language files][3]!

*As Ubiquity Parser 2 evolves, there is a chance that this specification will change in the future. Keep abreast of such changes on the [Ubiquity Planet][4] and/or [this blog][5] ([RSS][6]).*

<!--more-->

### Set up your environment

If you&#8217;re new to Ubiquity core development, you&#8217;ll want to first read the [Ubiquity 0.1 Development Tutorial][7] to learn how to get a live copy of the Ubiquity repository using [[Mercurial]]. Once you&#8217;ve set up your Firefox profile to use this development version, make sure to try changing the `extensions.ubiquity.parserVersion` value to 2 in `about:config` (as seen in [this demo video][8]) to verify that Parser 2 is working for you.

As you read along, you may find it beneficial to follow along in the languages currently included in Parser 2: [English][9], [Japanese][10], [Portuguese][11], and [Swedish][12] (and the incomplete [Chinese][13] and [French][14]).

### The structure of the language file

Each language in Parser 2 gets its own file which acts as a [JavaScript module][15]. You&#8217;ll need to look up the [[List of ISO 639-1 codes|ISO 639-1 code for your language]]&#8230; Here we&#8217;ll use English (code `en`) as an example here and the JavaScript language file would then be called `en.js` and go in the `/ubiquity/modules/parser/new/` directory of the repository.

Here is the basic template for a Ubiquity Parser 2 language file:

<pre lang='JavaScript' line='1'>var EXPORTED_SYMBOLS = ["makeEnParser"];</p>

<p>
  if ((typeof window) == 'undefined') // kick it chrome style
    Components.utils.import("resource://ubiquity/modules/parser/new/parser.js");
</p>



<p>
  function makeEnParser() {
    var en = new Parser('en');
</p>



<p>
  ...
</p>



<p>
  return en;
  };
  </pre>
</p>



<p>
  After lines 1-4 which set up the <a href="https://developer.mozilla.org/En/Using_JavaScript_code_modules">JavaScript module</a>, everything else is wrapped in a factory function called <code>makeLaParser</code> (for Latin) or <code>makeEnParser</code> (for English, <code>en</code>) or <code>makeFrParser</code> (for French, <code>fr</code>), etc. This function initializes the new <code>Parser</code> object (line 7) with the appropriate language code, sets a bunch of parameters (elided above) and returns it. That&#8217;s it!
</p>



<p>
  Now let&#8217;s walk through some of the parameters you must set to get your language working. For reference, the properties the language parser object is required to have are: <code>branching</code>, <code>anaphora</code>, and <code>roles</code>.
</p>



<h3>
  Identifying your branching parameter
</h3>



<p>
  <pre lang='JavaScript'>  en.branching = 'right'; // or 'left'</pre>
</p>



<p>
  One of the first things you&#8217;ll have to set for your parser is <strong>the <code>branching</code> parameter</strong>. Ubiquity Parser 2 uses the branching parameter to decide which direction to look for an argument after finding a delimiter or &#8220;role marker&#8221; (most often, these are [[adposition|prepositions or postpositions]]. For example, in English &#8220;from&#8221; is a delimiter for the <code>goal</code> role and its argument is on its right.
</p>



<table>
  <tr>
    <td>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td colspan='2' style='background: transparent url(http://mitcho.com/i/cccarrow-right.png) no-repeat right bottom'>
      &nbsp;
    </td>
  </tr>
  
  
  <tr>
    <td>
      <b>to</b>
    </td>
    
    <td>
      Mary
    </td>
    
    <td>
      <b>from</b>
    </td>
    
    <td>
      John
    </td>
  </tr>
  
</table>



<p>
  So &#8220;John&#8221; is a possible argument for the <code>source</code> role, but &#8220;Mary&#8221; should not be. Ubiquity can figure this out because English has the property <code>en.branching = 'right'</code>.
</p>



<p>
  In Japanese, on the other hand, the argument of a delimiter like から (&#8220;from&#8221;) is found on the left of that delimiter, so <code>en.branching = 'left'</code>.
</p>



<table>
  <tr>
    <td colspan='2' style='background: transparent url(http://mitcho.com/i/cccarrow-left.png) no-repeat left bottom'>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
  </tr>
  
  
  <tr>
    <td>
      メアリー
    </td>
    
    <td>
      <b>-から</b>
    </td>
    
    <td>
      ジョン
    </td>
    
    <td>
      <b>-に</b>
    </td>
  </tr>
  
  
  <tr>
    <td>
      Mary
    </td>
    
    <td>
      <b>from</b>
    </td>
    
    <td>
      John
    </td>
    
    <td>
      <b>to</b>
    </td>
  </tr>
  
</table>



<p>
  In general, if your language has prepositions, you should use <code>.branching = 'right'</code> and if your language has postpositions, you can use <code>.branching = 'left'</code>.
</p>



<p>
  <strong>For more info</strong>:
</p>



<ul>
  <li>
    see [[Branching (linguistics)|branching]] on Wikipedia.
  </li>
  
</ul>



<h3>
  Defining your roles
</h3>



<p>
  <pre lang='JavaScript'>  en.roles = [
    {role: 'goal', delimiter: 'to'},
    {role: 'source', delimiter: 'from'},
    {role: 'position', delimiter: 'at'},
    {role: 'position', delimiter: 'on'},
    {role: 'alias', delimiter: 'as'},
    {role: 'instrument', delimiter: 'using'},
    {role: 'instrument', delimiter: 'with'}
  ];</pre>
</p>



<p>
  The second required property is the inventory of semantic roles and their corresponding delimiters. Each entry has a <code>role</code> from the <a href="http://mitcho.com/blog/projects/rolling-out-the-roles/">inventory of semantic roles</a> and a corresponding delimiter. Note that this mapping can be [[many-to-many (data model)|many-to-many]], i.e., each role can have multiple possible delimiters and different roles can have shared delimiters. Try to make sure to cover all of the roles in the <a href="http://mitcho.com/blog/projects/rolling-out-the-roles/">inventory of semantic roles</a>.
</p>



<p>
  <strong>For more info:</strong>
</p>



<ul>
  <li>
    <a href="http://mitcho.com/blog/projects/writing-commands-with-semantic-roles/">Writing commands with semantic roles</a>
  </li>
  
  <li>
    <a href="http://mitcho.com/blog/projects/rolling-out-the-roles/">the proposed inventory of semantic roles</a>
  </li>
  
  <li>
    Wikipedia entry on [[thematic relations]]
  </li>
  
</ul>



<h3>
  Entering your anaphora (&#8220;magic words&#8221;)
</h3>



<p>
  <pre lang='JavaScript'>
  en.anaphora = ["this", "that", "it", "selection", "him", "her", "them"];
</pre>
</p>



<p>
  The final required property is the <code>anaphora</code> property which takes a list of &#8220;magic words&#8221;. Currently there is no distinction between all the different [[deixis|deictic]] [[anaphora (linguistics)|anaphora]] which might refer to different things.
</p>



<h3>
  Special cases
</h3>



<p>
  Some special language features can be handled by overriding the default behavior from <code>Parser</code>. Many of these features are still in the works, however, so we&#8217;d love to get your comments!
</p>



<h4>
  Languages with no spaces
</h4>



<p>
  If your language does not delimit arguments (or words, more generally) with spaces, there will be a need to write a custom <code>wordBreaker()</code> function and set <code>usespaces = false</code> and <code>joindelimiter = ''</code>. For an example, please take a look at the <a href="https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/ja.js">Japanese</a> or <a href="https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/zh.js">Chinese</a>.
</p>



<h4>
  Case marking languages
</h4>



<p>
  <strike>If you have a strongly [[grammatical case|case-marked]] language, you&#8217;ll have to write some rules to identify those different cases in <code>wordBreaker()</code> and then add some extra <code>roles</code> for these case markers, but for a number of languages the current design does not allow an elegant solution for parsing such arguments. Updates to this issue will be posted to <a href="http://ubiquity.mozilla.com/trac/ticket/663">this trac ticket</a>.
</p>



<p>
  In the mean time, however, if you could write a parser even with only the prepositions/postpositions in your language, that would be a great benefit in getting started in your language.</strike> <strong>UPDATE</strong>: a proposal on how to deal with strongly case-marked languages has been written here: <a href="http://mitcho.com/blog/projects/in-case-of-case/">In Case of Case&#8230;</a>.
</p>



<h4>
  Stripping articles
</h4>



<p>
  Some languages have some delimiters which combine with articles. For example, in French, the preposition &#8220;à&#8221; combines with the masculine definite article &#8220;le&#8221; but not &#8220;la&#8221;:
</p>



<ol>
  <li>
    à + la = à la
  </li>
  
  <li>
    à + le = au
  </li>
  
</ol>



<p>
  You can add both &#8220;à&#8221; and &#8220;au&#8221; as delimiters of the <code>goal</code> role, but then you will get feminine arguments back with the determiner (e.g. &#8220;la table&#8221;) while masculine arguments would be parsed without a determiner (e.g. &#8220;chat&#8221;).
</p>



<ol>
  <li>
    &#8220;<b>à</b> la table&#8221; = &#8220;<b>to</b> the table&#8221;
  </li>
  
  <li>
    &#8220;<b>au</b> chat&#8221; = &#8220;<b>to the</b> cat&#8221;
  </li>
  
</ol>



<p>
  <strike>One possible solution to this is to write a custom <code>cleanArgument()</code> method. After arguments have been parsed and placed in their appropriate roles, each argument text (say, &#8220;la table&#8221; or &#8220;chat&#8221;) are passed to <code>cleanArgument()</code>. You can simply write a <code>cleanArgument()</code> to strip off any &#8220;la &#8221; at the beginning of the input and return it and both example inputs will get normalized arguments: &#8220;table&#8221; and &#8220;chat&#8221;, respectively.</strike> <strong>UPDATE</strong>: For more up-to-date information on how to deal with these types of articles, please see <a href="http://mitcho.com/blog/projects/solving-a-romantic-problem/">Solving a Romance Problem</a>.
</p>



<h3>
  Test your parser
</h3>



<p>
  Now you can go into <code>about:config</code> and change <code>extensions.ubiquity.language</code> to be your language code and restart. All the verbs and nountypes at this point will remain the same as in the English version, but it should obey the argument structure (the word order and delimiters) of your language.<fnref target="1" /> If you run into any trouble, feel free to ask for help on the <a href="http://groups.google.com/group/ubiquity-i18n">Ubiquity i18n listhost</a> or find me on the Ubiquity IRC channel (mitcho @ irc.mozilla.org#ubiquity). Of course, once you&#8217;re at a good stopping point, please <a href="http://ubiquity.mozilla.com/trac/ticket/662">contribute your language file to Ubiquity</a>!
</p>



<h3>
  More to come&#8230;
</h3>



<p>
  At this point, you&#8217;ve only localized the [[argument structure]] of your language&#8230; additional work will be required to localize the nountypes and verb names, which is <a href="http://groups.google.com/group/ubiquity-i18n/browse_thread/thread/ab4d876b1ea02d4">the subject of ongoing discussion</a>&#8230; <a href="http://groups.google.com/group/ubiquity-i18n">join the Google Group</a> to get in on the discussion!
</p>



<footnotes>
  <fn name="1">
    <p>
      At this point in time it&#8217;s also possible to test your parser at <code>chrome://parser-demo/content/index.html</code> if you make a couple other changes to your code&#8230; for more information, watch the <a href="http://mitcho.com/blog/projects/foxkeh-demos-ubiquity-parser-the-next-generation/">Foxkeh demos Ubiquity Parser TNG</a> video. This option gives you more debug info as well.
    </p>
    
  </fn>
</footnotes>

 [1]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2/Localization_Tutorial
 [2]: http://mitcho.com/blog/projects/a-demonstration-of-ubiquity-parser-2/
 [3]: http://ubiquity.mozilla.com/trac/ticket/662
 [4]: http://ubiquity.mozilla.com/planet/
 [5]: http://mitcho.com/blog/
 [6]: http://mitcho.com/blog/feed/blog-only/
 [7]: http://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.1_Development_Tutorial
 [8]: (http://mitcho.com/blog/projects/a-demonstration-of-ubiquity-parser-2/)
 [9]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/en.js
 [10]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/ja.js
 [11]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/pt.js
 [12]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/sv.js
 [13]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/zh.js
 [14]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/08cf861ba79a/ubiquity/modules/parser/new/fr.js
 [15]: https://developer.mozilla.org/En/Using_JavaScript_code_modules