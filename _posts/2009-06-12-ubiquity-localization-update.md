---
title: Ubiquity Localization Update
layout: post
comments: true
permalink: /blog/projects/ubiquity-localization-update/
categories:
  - projects
tags:
  - code
  - commands
  - gettext
  - i18n
  - internationalization
  - JavaScript
  - l10n
  - language
  - localization
  - Mozilla Planet
  - ubiquity
---
As we move closer and closer to shipping a Ubiquity with [there is still much work to be done][1], particularly in the area of localization. [In a recent Ubiquity meeting][2] we laid out the explicit localization goals and non-goals of as follows:

*   Goals for 0.5 
    *   Parser 2 (on by default)
    *   underlying support for localization of commands
    *   localization of standard feed commands for a few languages
    *   Parser 2 language files for those same languages
*   Nongoals for 0.5 
    *   distribution/sharing of localizations
    *   localization of nountypes 

The overall goal for this release of Ubiquity is to come up with a format and standard for localization. Localizations in Ubiquity 0.5 will only apply to commands bundled with Ubiquity, and the localization files themselves will be distributed with Ubiquity. In a future release we will tackle the problem of localizations for [commands in the wild][3] and truly croud-source[^1] this process.

<!--more-->

### Localization Architecture

The localization of Ubiquity commands will use a [[gettext]]-style approach where localization files list key-value pairs for different properties and messages of the commands. For Ubiquity 0.5, where we only deal with the standard command feeds bundled Ubiquity, we can simply place all the localization files in [`ubiquity/standard-feeds/localization`][4]. Localization files are organized by source feed, with one localization file per source feed, per language.

The localizable components of commands will include the `names`, `contributors`, and `help` properties, as well as any localizable strings in the command&#8217;s `preview()` and `execute()` methods. To make strings localizable in `preview()` and `execute()`, they must be wrapped in the localize function, `_()`.[^2]

Other localizable components, like `names`, `contributors`, and `help` will not need to be wrapped in the `_()` function. In addition, as the localization files can only hold values of strings, for values such as names and contributors, the delimiter `|` can be used to delimit multiple values.

<pre code='javascript'>zoom.names=ズーム|ズームして|ズームする|ズームしろ</pre>

### The Localization Experience

[One tool we have planned][5] to help kickstart the localization process is a tool that will automatically create a template of strings that need localization in a user&#8217;s commands. I took a first stab at this tool today. Clicking on the &#8220;get localization template&#8221; link next to each feed in the [Ubiquity command list][6] will give you a template which you can then copy into a text file:

<a class='limages' href='/static/uploads/2009/06/localization-template.png' rel='lightbox'><img src="/static/uploads/2009/06/localization-template-smaller.png" alt="localization-template-smaller.png" border="0" width="600" height="437" /></a>

Additionally, instructions will later be added to this page to specify how and where to save localizations to test them or perhaps we can add a button that will automatically save it in the right location.

### Open Questions

#### Localization file formats

There are two kinds of file formats for localizations we are considering: [`.properties`][7] and `.po`, the native [[gettext]] format. As an example, here is the same key-value pair in the two formats:

##### `.properties`:

<pre># This is a comment
welcomeMessage=Hello, world!</pre>

##### `.po`:

<pre>#. This is a comment (the . is actually optional)
msgid "welcomeMessage"
msgstr "Hello, world!"</pre>

The advantage of `.properties` over `.po` is that Mozilla natively supports this format with an XUL/XPCOM interface called [stringbundle][8] and it is what is used to localize JavaScript in Firefox itself. We actually already have the `_()` localization function working with the properties file format, following [gomita&#8217;s great instructions][9] (Japanese) on how to load properties files in using Mozilla&#8217;s native [stringbundle][8] tools via JavaScript.

The advantage of `.po` over `.properties` is that it is the de-facto standard in localization, particularly in the UNIX world. Lots of great tools have been written for it. The adoption of `.po` could make Ubiquity localization more accessible for more people. Another advantage is that `.po` files can have keys with spaces, as I note below.

If we do opt to work with `.po` files, the two libraries I see out in the wild for dealing with `.po` files are [gettext-js][10] (MIT) and [jsgettext][11] (LGPL). While I haven&#8217;t looked at the libraries in depth yet, so far jsgettext seems to be the winner, as some sections of gettext-js require the use of the [prototype.js][12] library.

#### A &#8220;key&#8221; question

<img src="/static/uploads/2009/06/icanhaskeyplz.jpg" alt="icanhaskeyplz.jpg" border="0" width="650" height="416" />

In either file format, we need a unique way to refer to each localizable string—a key format. As each localization file refers to a command feed, the first collision we must avoid is the command name. With this in mind, we can come up with some trivial keys for the localizable properties: (here, consider the command `hello`)

*   `hello.names`
*   `hello.contributors`
*   `hello.help`

However, we run into difficulty when we try to come up with keys for the arbitrary text in `preview`s and `execute`s. For example, for a message like &#8220;Hello world!&#8221; in the preview, we could simply make the key `hello.preview.Hello world!` but this may be unruly and be prone to typos. In addition, in `.properties` files keys cannot have certain characters in them, like spaces, so we would have to make the key something like `hello.preview.Hello_world!` or, stripping symbols and standardizing case, `hello.preview.HELLO_WORLD`.

Keys could also get very long with this type of key format, although here again `.po` files may have an advantage as they can stay relatively more legible even with long keys. One option to deal with this would be to optionally supply a key argument to `_()` so that it is used instead of the automatic key. For example, suppose the `hello` command&#8217;s `preview()` included this code:

<pre lang='javascript'>_('This is a really long greeting message. Hello there!','longmessage')</pre>

then a localizer would only have to refer to `hello.preview.longmessage`, not `hello.preview.THIS_IS_A_REALLY_LONG_GREETING_MESSAGE_HELLO_THERE`.

[satyr][13] points out that some commands use another function to incorporate similar actions and messages in both `preview()` and `execute()`. In this case, he argues, it wouldn&#8217;t make sense to have to keep both localizations (`hello.preview.`&#8230; and `hello.execute.`&#8230;). He suggests that optional keys (mentioned above) could be used without the `preview.` or `execute.` infixes, as in `hello.longmessage`. By taking out the `preview` and `execute` namespacing in the localization keys, though, it becomes the command author&#8217;s responsibility to not accidentally use strings named &#8220;names&#8221;, &#8220;help&#8221;, etc. that will have unintended consequences.

### Conclusion

I hope that this blog post gives people an idea of the progress we&#8217;ve made in the localization area and gets people thinking about the challenges we still face. **We&#8217;d love to get your feedback on the localization format and process in Ubiquity, as well as the open problems of the file format and keys.**

[^1]:    
    Or &#8220;cloud-source&#8221;&#8230; finally a Japanese accent joke that&#8217;s semantically stable!

[^2]:    
    This function currently also has the ability to do simple [[printf]]-formatted string replacements:  
    <pre code='javascript'>_('This is a %S.',['test'])</pre>
    
      
    Whether this format will replace support for `CmdUtils.renderTemplate` remains to be seen and is definitely worthy of discussion. If we move away from [properties files][7], in particular, we may keep `renderTemplate()` in lieu of the [[printf]] format. Mozilla&#8217;s built-in [stringbundle handling][8] just gave us a fast and free implementation of [[printf]]-style replacement.

 [1]: https://labs.mozilla.com/2009/05/ubiquity-05-call-for-participation/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Meetings/2009-05-27_Weekly_Meeting
 [3]: https://ubiquity.mozilla.com/herd/
 [4]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/file/tip/ubiquity/standard-feeds/localization
 [5]: https://ubiquity.mozilla.com/trac/ticket/739
 [6]: chrome://ubiquity/content/cmdlist.html
 [7]: https://developer.mozilla.org/En/XUL_Tutorial/Property_Files
 [8]: https://developer.mozilla.org/En/XUL/Stringbundle
 [9]: http://www.xuldev.org/blog/?p=45
 [10]: http://code.google.com/p/gettext-js/
 [11]: http://jsgettext.berlios.de/
 [12]: http://www.prototypejs.org/
 [13]: http://twitter.com/m_satyr