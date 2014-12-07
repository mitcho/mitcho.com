---
title: 'Localizing Ubiquity: commands and nountypes'
layout: post
comments: true
permalink: /blog/projects/localizing-ubiquity-commands-and-nountypes/
categories:
  - projects
tags:
  - code
  - i18n
  - internationalization
  - JavaScript
  - l10n
  - localization
  - Mozilla Planet
  - ubiquity
---
Now that [Parser 2][1] is in decent shape and a number of parsing problems in different languages have been tackled, the focus has now shifted to coming up with an approach for localizing Ubiquity commands and nountypes. At last week&#8217;s weekly Ubiquity meeting we had a great conversation on this subject, which then has [continued on the Google group][2].

I&#8217;ve been framing this problem as two subproblems:

1.  What will be the data structure of localized commands/nountypes within Ubiquity?
2.  How do we distribute/share these localizations?

We&#8217;ve mostly been discussing the first problem, weighing the merits of unified objects (with different localized text as different JS properties) as opposed to a [[gettext]]-style approach, and noting that our requirements for commands and nountypes may be different. I hope we can discuss the second issue more in the coming week.

Should everything go through the command author? Should localization be centralized through some web tool? Should it be completely distributed like commands currently are? **I invite you to join us in this conversation on the [Google group][3].** ^^

 [1]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [2]: http://groups.google.com/group/ubiquity-i18n/browse_thread/thread/56b97b6ed10d0d1a
 [3]: http://groups.google.com/group/ubiquity-i18n