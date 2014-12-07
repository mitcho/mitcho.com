---
title: 'Ubiquity Localization: What&#8217;s New, What&#8217;s Next'
layout: post
comments: true
permalink: /blog/projects/ubiquity-localization-whats-new-whats-next/
categories:
  - projects
tags:
  - command
  - i18n
  - internationalization
  - l10n
  - linguistics
  - localization
  - Mozilla Planet
  - nountype
  - parser
  - participate
  - ubiquity
  - verb
---
Yesterday we [released Ubiquity 0.5][1], a major update to the already popular Ubiquity platform. Among [numerous other features][2], Ubiquity 0.5 includes the first fruit of [months of research on building a multilingual parser and natural language interface][3]. In this blog post I&#8217;ll give a quick overview of new internationalization-related features in Ubiquity 0.5 as well as a quick roadmap of future considerations.

Of course, one of the best ways to learn about the new features is to experience them&#8230; try Ubiquity 0.5 now!

<a href="https://ubiquity.mozilla.com/xpi/0.5/ubiquity-0.5.xpi" style="cursor:pointer;background: #01d835;border: 1px solid;border-color:#01d835 #4ece71 #4ece71 #01d835;-moz-border-radius:4px;padding:10px;text-transform:uppercase;font-size:1.3em;color:white;text-shadow:#1e792c 1px 1px 1px;">Install now!</a>

<!--more-->

### Preface: What&#8217;s What

To give users a completely localized experience, there are many different components that need to be made to work with different languages. In a single Ubiquity input, like

<pre lang='en' line='1'>translate hello from English to Spanish</pre>

there are actually many different components that need to all be localized in order to comprehend the equivalent sentence in a different language. The diagram below will give you a sense for the different components that need to be localized: the parser, verbs, and nountypes.

<table>
  <tr>
    <th>
      input:
    </th>
    
    <td>
      translate
    </td>
    
    <td>
      hello
    </td>
    
    <td>
      from
    </td>
    
    <td>
      English
    </td>
    
    <td>
      to
    </td>
    
    <td>
      Spanish
    </td>
  </tr>
  
  <tr>
    <th>
      element type:
    </th>
    
    <td>
      verb
    </td>
    
    <td>
      free argument
    </td>
    
    <td>
      delimiter
    </td>
    
    <td>
      structured argument
    </td>
    
    <td>
      delimiter
    </td>
    
    <td>
      structured argument
    </td>
  </tr>
  
  <tr>
    <th>
      component to localize:
    </th>
    
    <td>
      verb name
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      parser
    </td>
    
    <td>
      nountype
    </td>
    
    <td>
      parser
    </td>
    
    <td>
      nountype
    </td>
  </tr>
</table>

### What&#8217;s New

Ubiquity 0.5&#8217;s improved language support can be thought of as the product of two more or less orthogonal developments: the brand-new parser, Parser 2, as well as local command localization support.

#### Parser 2

Parser 2 (née [Parser: The Next Generation][4]) is a completely new parser designed to support different languages easily. Taking a serious look at the similarities and differences between different languages, we created a universal [parser design][5] which takes a minimal set of settings for particular languages to &#8220;learn&#8221; that language&#8217;s grammar.

The key insight to Parser 2&#8217;s design is that, for the limited range of inputs Ubiquity should understand, languages deal with them in remarkably similar ways. The input we&#8217;re dealing with here are all commands or actions without quantification or negation. These are all comprised of a single verb and a series of arguments with certain markings to designate their roles in the sentence. For example, here&#8217;s our example Ubiquity input:

<pre lang='en' line='1'>translate hello from English to Spanish</pre>

In this example, &#8220;translate&#8221; is the verb, which we recognize by looking at our bank of known verbs, and the rest of the input can be split up into three different arguments: &#8220;hello,&#8221; &#8220;from English,&#8221; and &#8220;to Spanish.&#8221; Of these, the markers &#8220;from&#8221; and &#8220;to&#8221; tell us that &#8220;English&#8221; is a *source* of some sort and &#8220;Spanish&#8221; is a *goal*, while the unmarked &#8220;hello&#8221; is simply an *object*—the target of the action. By identifying arguments by these abstract [*semantic roles*][6], we&#8217;re able to quickly identify different kinds of arguments in different languages. For example, the following is the exact same example but using the Japanese syntax and markers:

<pre lang='en' line='2'>helloをEnglishからSpanishにtranslate</pre>

Ubiquity knows what the different markers mean in Japanese, like &#8220;を&#8221; > `object`, &#8220;から&#8221; > `source`, &#8220;に&#8221; > `goal`, and can easily interpret this to mean the exact same command as (1). With just a few lines of code, [you can teach][7] Ubiquity how to recognize these different semantic roles in your language. This innovation also means that Ubiquity commands can be [written once for one language and automatically used with another language&#8217;s parser][8], bringing us half-way to the goal of command localization.

Note also that Japanese (as in example (2)) is verb-final and uses no spaces between words. We&#8217;ve tried to make Parser 2 itself agnostic towards these types of different ways in which languages vary.

Parser 2 also adds [better argument-first suggestions][9], inspired by some [earlier thoughts on Ubiquity in Japanese][10]. Ubiquity will now start to parse arguments in the input even if a verb isn&#8217;t found, and suggest verbs based on that input. For example, if you enter &#8220;hello to Spanish,&#8221; it&#8217;ll recognize that you have an *object* of &#8220;hello&#8221; and a *goal* of &#8220;Spanish&#8221; which can be understood as a language name, so it&#8217;ll suggest the verb &#8220;translate.&#8221; This is the way it should be. <img src="http://mitcho.com/blog/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />

<small>For more information and background, feel free to check out some of my previous blog posts <a href="http://mitcho.com/blog/tag/ubiquity+parser/">on the new parser</a> and <a href="http://mitcho.com/blog/tag/ubiquity+linguistics/">on the different linguistic considerations</a>. I also have a four-page academic paper giving an overview of some innovations in the parser—email me at <code>x@x.com</code> where <code>x=mitcho</code> if you&#8217;d like to get a copy.</small>

#### Internationalization of bundled commands

The move to use [semantic roles][6] in the [new command API][11], described above, means that the same Ubiquity command code can be used with inputs in different languages. Two things are left, then, to make a completely localized input work: (1) translation (localization) of different strings in the commands and (2) localization of the nountypes.

In Ubiquity 0.5, we built a localization infrastructure for commands (1, above) but have not yet tackled the nountypes (2). Ubiquity 0.5 uses the [[gettext]] `po` (portable object) file format for localizations, which many localizers in the UNIX world are very familiar with. This [choice of file format][12] potentially opens Ubiquity localization up to many who are new to localization or are unfamiliar with other Mozilla localization. Ubiquity is able to produce localization templates by itself and we also have [a great tool][13] to check the completeness of different localizations.

A huge caveat, however, is that this localization support currently only works with the commands bundled with Ubiquity itself.

### What&#8217;s Next

We&#8217;re going to continue working to make Ubiquity [more natural][14] for more users. The tasks we have ahead of us are the localization of nountypes and community commands.

#### Nountype localization

With the new semantic role argument specifications, command localization simply became a question of translating some strings, which many localizers are used to. After all, we want localizations to affect the *presentation* of commands, not the logic of the commands. When it comes to nountypes, however, it is quite possible that we would actually want the nountype localization to affect its behavior.

Consider, for example, an imaginary `day_of_the_week` nountype. In English, this nountype might accept or suggest strings like &#8220;Monday&#8221; or &#8220;Tuesday,&#8221; while a French localization would accept &#8220;lundi&#8221; or &#8220;mardi.&#8221; More complicated still, consider a `date` nountype. In English this nountype may have custom logic to parse strings like &#8220;June 1st&#8221; while another language may have to parse very different kinds of strings. These nountype localizations thus involve not just string translations, but actual changes in their *logic*, making the `po` format approach we took to command localization a poor fit.

Making nountypes localizable, however, will make Ubiquity significantly more &#8220;natural&#8221; for many users. In the coming weeks and months we&#8217;ll be discussing and debating different options to accomplish this.

#### Community command localization

Even though the file format and infrastructure for command localization itself has been fleshed out with Ubiquity 0.5, the distributed nature of all these community commands adds an additional complication. Do we want community command localizations to be completely distributed, or should they be centralized? If they&#8217;re distributed, how do you find them? These are the types of questions we&#8217;ll need to ask and answer. The ease of creating a new Ubiquity command and sharing it with the world is a huge asset of the platform, so we&#8217;ll definitely be thinking about how best to localize these community commands as well. In the next day or two I&#8217;ll be writing up a more detailed blog post on what we need from a good community command localization solution.

### Summary

For the more visually inclined (including myself), here&#8217;s a handy diagram to summarize what components are localizable now, what will be in the future, and what this means for Ubiquity users of different languages.

<table>
  <tr>
    <th rowspan='2'>
      localized components
    </th>
    
    <th rowspan='2'>
      Japanese input that Ubiquity will understand
    </th>
    
    <th colspan='2'>
      support coverage
    </th>
  </tr>
  
  <tr>
    <th>
      for bundled commands
    </th>
    
    <th>
      for community commands
    </th>
  </tr>
  
  <tr>
    <th>
      <i>no localization</i>
    </th>
    
    <td>
      translate hello from English to Spanish
    </td>
    
    <th rowspan='3' style='background: #99ff99'>
      Ubiquity 0.5!
    </th>
    
    <th rowspan='2' style='background: #99ff99'>
      Ubiquity 0.5!</td></tr> <tr>
        <th>
          parser
        </th>
        
        <td>
          helloをEnglishからSpanishにtranslate
        </td>
      </tr>
      
      <tr>
        <th>
          parser + verbs
        </th>
        
        <td>
          helloをEnglishからSpanishに訳す
        </td>
        
        <th rowspan='2' style='background: #f99'>
          <i>the future</i>
        </th>
      </tr>
      
      <tr>
        <th>
          parser + verbs + nountypes
        </th>
        
        <td>
          helloを英語からスペイン語に訳す
        </td>
        
        <th rowspan='1' style='background: #f99'>
          <i>the future</i>
        </th>
      </tr></table> 
      
      <h3>
        Get Involved
      </h3>
      
      <p>
        Whether you&#8217;re a speaker of an as-yet unsupported language, a veteran localization contributor, or simply interested in seeing how we can offer this natural language interface to more languages and more users, there are lots of ways to get involved. If you have some JavaScript experience and want to teach Ubiquity your native languages&#8217; grammar, read our <a href="https://wiki.mozilla.org/Labs/Ubiquity/Parser_2/Localization_Tutorial">parser localization tutorial</a>. If you would like to contribute localizations for our built-in commands, there&#8217;s a <a href="https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.5_Command_Localization_Tutorial">command localization tutorial</a>. To discuss how best to localize nountypes and community commands, or to ask questions about or discuss command and parser localization, join us on the <a href="http://groups.google.com/group/ubiquity-i18n">Ubiquity-i18n mailing list</a>.
      </p>

 [1]: https://labs.mozilla.com/2009/07/ubiquity-0-5/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_0.5_Release_Notes
 [3]: http://mitcho.com/blog/tag/ubiquity/
 [4]: http://mitcho.com/blog/projects/this-week-on-ubiquity-parser-the-next-generation/
 [5]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [6]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2/Semantic_Roles
 [7]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2/Localization_Tutorial
 [8]: http://mitcho.com/blog/projects/writing-commands-with-semantic-roles/
 [9]: http://mitcho.com/blog/projects/a-demonstration-of-ubiquity-parser-2/
 [10]: http://mitcho.com/blog/projects/ubiquity-in-firefox-japanese/
 [11]: https://wiki.mozilla.org/Labs/Ubiquity/Ubiquity_Source_Tip_Author_Tutorial
 [12]: http://groups.google.com/group/ubiquity-i18n/browse_thread/thread/79c7cea117ad04bb#
 [13]: http://geeksbynature.dk/?p=35
 [14]: http://mitcho.com/blog/projects/how-natural-should-a-natural-interface-be/