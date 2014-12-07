---
title: 'This week on Ubiquity Parser: The Next Generation'
layout: post
comments: true
permalink: /blog/projects/this-week-on-ubiquity-parser-the-next-generation/
categories:
  - projects
tags:
  - code
  - Danish
  - demo
  - French
  - humor
  - i18n
  - Japanese language
  - l10n
  - localization
  - Mozilla Planet
  - parser
  - ubiquity
  - update
---
<img src="http://mitcho.com/blog/wp-content/uploads/2009/03/parsertng.png" alt="parsertng.png" border="0" width="649" height="277" />

[Last week][1] I released [a proof-of-concept demo][2] of the [next generation Ubiquity parser design][3] and it was also the focus of discussion in [our weekly internationalization meeting][4].[^1] Christian Sonne even wrote a Danish plugin for it during the meeting—a testament to the pluggability and of the new parser design.

In addition, at [the Ubiquity weekly meeting][5], pushing this new parser into Ubiquity proper was identified as [a key goal of Ubiquity 0.2][6], making frequent iteration and debate over this parser essential.

To that end, I&#8217;ll highlight some of the changes made to the parser demo [codebase][7] in the past week: <!--more-->

*   [[left-branching]] support and a Japanese parser
*   basic French parser
*   a timer display
*   Danish parser by Christian Sonne
*   synonyms: as an example, you can now use &#8220;purchase&#8221; or &#8220;buy,&#8221; both of which point to the same verb.
*   verb name localizations: you no longer need to use the English verb names with different languages. (Currently only Japanese has any verb localizations.)
*   a number of optimizations and corrections

I encourage you to check out the demo again or [check out the source on BitBucket][7].

### [➔ Ubiquity Parser: The Next Generation demo][2]

I&#8217;d love to get comments, patches, or additional parsers! Thanks! ^^

[^1]:    
    The weekly internationalization meeting, like all Ubiquity weekly meetings, are completely open to the public. We&#8217;d love to hear new voices contribute to the discussion! Take a look at [the schedule of upcoming meetings][8].

 [1]: http://mitcho.com/blog/projects/ubiquity-parser-the-next-generation-demo/
 [2]: http://mitcho.com/code/ubiquity/parser-demo/
 [3]: https://wiki.mozilla.org/User:Mitcho/ParserTNG
 [4]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-03-24_i18n_Meeting
 [5]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-03-25_Weekly_Meeting
 [6]: https://wiki.mozilla.org/Labs/Ubiquity/0.2_Roadmap_Proposals
 [7]: http://bitbucket.org/mitcho/ubiquity-playground/
 [8]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings