---
title: Big Issues and Small Issues with Parser 2
layout: post
comments: true
permalink: /blog/projects/big-issues-and-small-issues-with-parser-2/
categories:
  - projects
tags:
  - code
  - Dutch
  - German
  - Greek
  - i18n
  - internationalization
  - l10n
  - localization
  - Mozilla Planet
  - parser
  - ubiquity
---
[Jono][1] and I had a good conversation this morning on [IRC][2] about the remaining Big Issues which are blocking the release of Parser 2 as the default parser for [Ubiquity][3]. Here are our **Top 4 Big Issues**:

1.  **Some commands&#8217; `preview`&#8217;s and `execute`&#8217;s are not working properly** ([trac #652][4]). This could be an underlying issue with some pipes not rerouted correctly in Parser 2, or it could be that the commands have not been rewritten correctly to take advantage of Parser 2.
2.  **Flesh out how to localize resources, like commands and nountypes.** We [started a conversation][5] on this subject a few weeks ago but we never reached a resolution. This blocks issues 3 and 4 below.
3.  **We need to standardize a format for commands for Parser 2.** As [noted in last week&#8217;s meeting][6] (among other places) Parser 2 will require at least some modification to all commands. Jono and I came up with a simple hybrid format for commands which specify `takes` and `modifiers` for Parser 1 and `arguments` for Parser 2, but until we figure out how exactly the localization of commands will work, we can&#8217;t write a definitive standard.
4.  **Enable nountype localization.** While the most popular nountypes used are those that ship with Ubiquity, it is important to come up with a localization process which can apply to custom nountypes as well. Nountype localizations need the ability to either (1) replace the `_name` only, or (2) replace both the `_name` and the `suggest()` logic, as both cases will be necessary.

Given that Big Issue 3 and Big Issue 4 are both dependent on Big Issue 2, there clearly needs to be a continued public discussion of how we should make these resources localizable. **I look forward to this discussion taking place [at tomorrow&#8217;s joint (general + i18n) Ubiquity meeting][7].**

In other news, here are some **<small>Small Issues</small>**:

1.  **Add a switch for parser version and language settings**: Jono&#8217;s already made a space for this in the new &#8220;Settings and Skins&#8221; page in `about:ubiquity`. He&#8217;s on it. Like a bonnet.
2.  **Magic word (anaphor) substitution is not yet working properly.** This needs to work both when there is an explicit magic word and when there are simply missing arguments.
3.  **The position of suggested verbs is always sentence-initial** ([trac #655][8]). This also requires that we can specify whether verb name localizations are sentence-initial forms or sentence-final forms.[^1]
4.  [&#8230;][9]

Let&#8217;s hit the code!

[^1]:    
    German, Dutch, and Greek, for example, are all languages where there are both command verb forms which are sentence-initial and sentence-final.

 [1]: http://jonoscript.wordpress.com/
 [2]: irc://irc.mozilla.org/ubiquity
 [3]: http://ubiquity.mozilla.com
 [4]: http://ubiquity.mozilla.com/trac/ticket/653
 [5]: http://groups.google.com/group/ubiquity-i18n/browse_thread/thread/ab4d876b1ea02d4
 [6]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-05-13_Weekly_Meeting#Notes
 [7]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-05-20_Weekly_Meeting
 [8]: http://ubiquity.mozilla.com/trac/ticket/655
 [9]: http://ubiquity.mozilla.com/trac/search?ticket=on&q=new-parser