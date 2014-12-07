---
title: Localizing Commands for Ubiquity 0.5
layout: post
comments: true
permalink: /blog/projects/localizing-commands-for-ubiquity-0-5/
categories:
  - projects
tags:
  - commands
  - i18n
  - internationalization
  - l10n
  - localization
  - Mozilla Planet
  - participate
  - po
  - ubiquity
---
As many of you know, earlier this week we released a preview of version 0.5 (0.5pre). We&#8217;re going to stress test and refine this release through the weekend and push the official 0.5 out next Tuesday. This release will have fully localized commands for Danish and Japanese, as well as parser settings for a number of other languages. Read [this Labs blog post][1] to learn more about the 0.5 release and how to test it.

It&#8217;s not too late to add localizations for other languages to 0.5, though. Localizations help make Ubiquity more &#8220;natural&#8221; for more users, offering a new level of ease and familiarity to the already powerful Ubiquity. We have [a new tutorial to help you localize commands][2].

To help encourage command localization, we now have [[gettext]]-style `po` template files for all the bundled command feeds in the hg repository. You can find these files in the `ubiquity/localization/templates` directory of the repository, or [on our online hg repository][3].

If you complete some localizations (even incomplete) for your language and would like to submit them into the repository, for the time being, you can post them on [this trac ticket][4].[^1]

I&#8217;ll be looking forward to seeing your localizations! If you have any questions, feel free to ask on the [ubiquity-i18n Google group][5] or on [irc.mozilla.org#ubiquity][6]. ^^

[^1]:    
    In the post-0.5 future we&#8217;ll be rethinking how best to organize these localization files and give commit access to as many localizers as possible.

 [1]: https://labs.mozilla.com/2009/06/ubiquity-0-5-preview-release/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.5_Command_Localization_Tutorial
 [3]: http://ubiquity.mozilla.com/hg/ubiquity-firefox/file/tip/ubiquity/localization/templates
 [4]: http://ubiquity.mozilla.com/trac/ticket/712
 [5]: http://groups.google.com/group/ubiquity-i18n/
 [6]: irc://irc.mozilla.org#ubiquity