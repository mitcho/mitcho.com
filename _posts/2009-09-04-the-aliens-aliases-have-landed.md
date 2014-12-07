---
title: 'The <strike>Aliens</strike> Aliases Have Landed'
layout: post
comments: true
permalink: /blog/projects/the-aliens-aliases-have-landed/
categories:
  - projects
tags:
  - alias
  - arguments
  - command
  - i18n
  - internationalization
  - l10n
  - localization
  - Mozilla Planet
  - ubiquity
  - verb
---
<img src="http://mitcho.com/blog/wp-content/uploads/2009/09/close-encounters.jpg" alt="close-encounters.jpg" border="0" width="640" height="300" />

This week [I implemented][1] a new way to customize and extend Ubiquity commands: `CmdUtils.CreateAlias`.

### The use case for and importance of `CreateAlias`

`CreateAlias` lets you easily create a special-case alias of another, more generic verb. Ubiquity comes bundled with useful verbs like `translate` and `search` which can be used for a number of different uses based on their arguments. In some cases, and in some languages, though, typing out `translate to English` or `search with Google` is [unnatural][2], though, as there is a more succinct and direct way to make that request. For example, in English one could say &#8220;anglicize&#8221; or &#8220;google&#8221;, respectively, for the verbs and arguments above. Indeed, in order to support both `search with Google` and `google`, Ubiquity traditionally has implemented two different verbs, `search` and `google`, which duplicate functionality and code.

`CreateAlias` lets us create such natural aliases [[Don&#8217;t\_repeat\_yourself|without repeating ourselves]]. We can easily create an `anglicize` verb which, in one word, does the work of `translate to English`, or `google` which is semantically equivalent to `search with Google`.

These sorts of aliases become particularly important in our perpetual quest to internationalize Ubiquity. One discussion that came up early on on our [Ubiquity-i18n][3] list is the fact that not all languages have the verb &#8220;Google&#8221;: in many languages it is necessary to explicitly say &#8220;search with Google&#8221;. Moreover, other languages may have other domain-specific verbs which English doesn&#8217;t have either. Maybe some language has a special verb for &#8220;email with Hotmail&#8221; or &#8220;map Denmark&#8221;. Who knows? With `CreateAlias` we can easily enable such localizations based on the more generic commands bundled with Ubiquity.

### Creating an alias

`CreateAlias` was designed to be incredibly simple to use. Here&#8217;s an example that will be bundled (but not installed by default) in Ubiquity:

<pre lang='javascript'>CmdUtils.CreateAlias({
  names: ["anglicize"],
  verb: "translate",
  givenArgs: { goal: "English" }
});
</pre>

As you see, this syntax is incredibly straightforward. There are two required properties, `names`, an array of names for the alias, and `verb`, a reference to the target verb that this alias should use.[^1]

The alias can also have a `givenArgs` property which is a hash of pre-specified arguments with their [semantic roles][4]. Because `translate` takes three arguments (an `object` text, a `goal` language, and a `source` language) but we have pre-specified a `goal` in the `givenArgs`, the new `anglicize` command will only take two arguments: the `object` text and a `source` language. Of course, if you specify no `givenArgs`, you&#8217;ll get a simple synonym without having access to the original verb&#8217;s code.

<img src="http://mitcho.com/blog/wp-content/uploads/2009/09/anglicize1.png" alt="anglicize.png" border="0" width="650" height="152" />

As you see, the preview of this command is simply the preview of the `translate` verb. Its preview and execution is just as if you had entered `translate こんにちは to English`.

Just like other commands created with `CreateCommand`, the object specifying the alias can also have properties like `help`, `description`, `author` information, and so on. I used the `icon` property to add a [[Union Jack]] to it so that it was easily identifiable.

### Bonus: using `CmdUtils.previewCommand` and `CmdUtils.executeCommand`

On the road to implementing `CreateAlias`, I also implemented the `CmdUtils.previewCommand` and `CmdUtils.executeCommand` functions. The majority of this code comes from previous work by [Louis-Rémi Babé][5], though I adapted it to the modern Ubiquity system. Using `previewCommand` and `executeCommand` you can take advantage of the preview or execute functionality of another command. In the new [alias-commands][6] feed I included a command called `germanize` which essentially is a straightforward analogy to `anglicize`, seen above, but using these functions within a `CreateCommand`. While `CreateAlias` is much more straightforward for simple aliases, for more complex subcommands where you would like to adapt another verb&#8217;s execution or preview, or only take one of those but re-implement the other part, `previewCommand` and `executeCommand` are the way to go.

[^1]:    
    The `verb` reference can be the canonical or *reference name* of a command, which is the first name in the `names` of a command (also the name listed in the command list when Ubiquity is running in English) or the actual internal ID of the command, which looks like `resource://ubiquity/standard-feeds/general.html#translate`.

 [1]: http://ubiquity.mozilla.com/trac/ticket/201
 [2]: http://mitcho.com/blog/projects/how-natural-should-a-natural-interface-be/
 [3]: http://groups.google.com/group/ubiquity-i18n
 [4]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2/Semantic_Roles
 [5]: http://groups.google.com/group/ubiquity-firefox/browse_thread/thread/993411167fc6f165
 [6]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/raw-file/tip/ubiquity/standard-feeds/alias-commands.js