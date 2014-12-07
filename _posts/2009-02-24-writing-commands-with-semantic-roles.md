---
title: Writing commands with semantic roles
layout: post
comments: true
permalink: /blog/projects/writing-commands-with-semantic-roles/
categories:
  - projects
tags:
  - argument structure
  - arguments
  - code
  - coding properties
  - Mozilla Planet
  - parser
  - proposal
  - semantic role
  - ubiquity
  - verbs
---
*Thank you to everyone who contributed data to [how your language identifies its arguments][1]! The data collection is ongoing so please contribute data points for languages you know!*

### How Ubiquity identifies its arguments

Currently [when writing a command][2] in Ubiquity you must specify two properties for each argument: a modifier (the appropriate [[adposition]]—the direct object excluded) and the [noun type][3]. Here are some quick examples from the standard commands:

`email`:

*   direct object (`noun_arb_text`)
*   `to` (`noun_type_contact`)

`translate`:

*   direct object (`noun_arb_text`)
*   `to` (`noun_type_language`)
*   `from` (`noun_type_language`)

This way of specifying arguments has a few shortcomings. First of all, it requires you to identify each type of argument by unique adposition, which does not support languages with [[case marking]] nor languages with sets of synonymous adpositions (e.g. French {à la, au, aux}). Second, as we saw in [how your language identifies its arguments][1] some languages don&#8217;t mark semantic roles on the arguments at all and the current system of specifying arguments is completely incompatible with these languages. Third, the current specification requires command authors to make localized versions of their commands, specifying the language-appropriate modifiers.

<!--more-->

In a perfect world the last issue could be solved (at least for languages which mark semantic roles with adpositions) by a mapping of English prepositions to the target language adpositions. Indeed, for some adpositions in some languages this may be possible:

<table border='0'>
  <tr>
    <th colspan='2'>
      English/Ubiquity
    </th>
    
    <th>
      Chinese
    </th>
    
    <th>
      Japanese
    </th>
  </tr>
  
  <tr>
    <td>
      to
    </td>
    
    <td rowspan='2'>
      =>
    </td>
    
    <td>
      到 (dào)
    </td>
    
    <td>
      -に (-ni)
    </td>
  </tr>
  
  <tr>
    <td>
      from
    </td>
    
    <td>
      从 (cóng)
    </td>
    
    <td>
      -から (-kara)
    </td>
  </tr>
</table>

However, some English prepositions do not cleanly map to a particular adpositions. Take, for example, English &#8220;with.&#8221; This &#8220;with&#8221; may map to different markings in Chinese and Japanese depending on the sentence:

<table border='0'>
  <tr>
    <th colspan='2'>
      English
    </th>
    
    <th>
      Chinese
    </th>
    
    <th>
      Japanese
    </th>
  </tr>
  
  <tr>
    <td>
      share <strong>with</strong> Jono
    </td>
    
    <td rowspan='2'>
      =>
    </td>
    
    <td>
      跟 (gēn)
    </td>
    
    <td>
      -と (-to)
    </td>
  </tr>
  
  <tr>
    <td>
      translate <strong>with</strong> Google
    </td>
    
    <td>
      用 (yòng)
    </td>
    
    <td>
      -で (-de)
    </td>
  </tr>
</table>

Note, however, that which set of markings &#8220;with&#8221; maps to is predictable, as there is a salient semantic difference. The first &#8220;with&#8221; could be referred to as *together-with* while the second is a *using-with*. With this distinction, we can easily predict which paradigm the &#8220;with&#8221; in &#8220;search **with** Google&#8221; should use, because these two &#8220;with&#8221; arguments represent two different *semantic roles*.

### A proposal: identifying arguments by semantic role[^1]

Suppose commands could specify their arguments by referring to these *semantic roles* in lieu of adpositions as they currently do. This way, we would be able to automatically map commands into different languages. For example, you could write a new command called `move` with the following argument structure:

`move`:

*   `role_object` (`noun_arb_text`)
*   `role_goal` (`noun_type_geolocation`)
*   `role_source` (`noun_type_geolocation`)

The English mapping of &#8221; => `role_object`, &#8216;to&#8217; => `role_goal`, &#8216;from&#8217; => `role_source` could be used to parse the command

<pre lang='English'>move truck from Tokyo to Paris</pre>

In addition, with the Japanese mapping of &#8216;が&#8217; => `role_object`, &#8216;に&#8217; => `role_goal`, &#8216;から&#8217; => `role_source`, you could immediately use the command in Japanese as well:

<pre lang='Japanese'>東京からパリにトラックをmoveして</pre>

In essence, this proposal would let command authors get their commands localized *for free*, as long as they stick to a predefined set of semantic roles. For more complex commands and legacy commands, of course, commands could optionally specify particular English modifiers, but then Ubiquity would simply not attempt to localize those commands.

In addition, each language specific parser would determine how to identify its arguments. This would allow languages with case marking or no role marking on arguments at all to handle their own mapping of arguments to semantic roles and still use shared commands. Even parsers such as English would benefit by letting the parser deal with synonymous prepositions and possibly even argument structure alternations (such as English [[ditransitive alternations]]).

As a starting point, we could use argument types based on the list of semantic roles given in [Fillmore (1971)][4]:

*   Object: the entity that moves or changes or whose position or existence is in consideration
*   Result: the entity that comes into existence as a result of the action
*   Instrument: the stimulus or immediate physical cause of an event
*   Source: the place from which something moves
*   Goal: the place to which something moves
*   Experiencer: the entity which receives or accepts or experiences or undergoes the effect of an action &#8230;

### Comments welcome!

**As command authors and Ubiquity users, how do you feel about this proposal? How might this affect, simplify, or complicate the localization of Ubiquity into your language?** Thank you in advance! ^^

[^1]:    
    Thank you to [Jono][5] and [Blair][6] whose comments in [our i18n meeting][7] helped shape this proposal.

 [1]: http://mitcho.com/blog/projects/contribute-how-your-language-identifies-its-arguments/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.1_Author_Tutorial
 [3]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.1_Nountypes_Reference
 [4]: http://scholar.google.com/scholar?q="types+of+lexical+information"+fillmore
 [5]: http://jonoscript.wordpress.com
 [6]: http://theunfocused.net/
 [7]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-02-23_i18n_Meeting