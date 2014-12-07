---
title: 'Ubiquity i18n: questions to ask'
layout: post
comments: true
permalink: /blog/projects/ubiquity-i18n-questions-to-ask/
categories:
  - projects
tags:
  - collaboration
  - commands
  - contribute
  - data
  - linguistics
  - Mozilla Planet
  - parser
  - survey
  - ubiquity
---
I recently have traveled a fair deal and have met many people excited about [the Ubiquity project][1] and [its localization efforts][2]. &#8220;I want to help,&#8221; say the people, but many are unsure where to start.

As a linguist, studying a language involves looking at instances of that language as data. To this end, we as Ubiquity internationalizers need to get at some examples of *target utterances*. Here&#8217;s an example survey which could be a good starting point for native speakers who want to contribute information on their language, based on [Blair&#8217;s list of common Ubiquity verbs][3].

<!--more-->

<hr style='border-top: 2px gray dashed; height: 0; color: white;' />

## A survey for Ubiquity localization

### Instructions

How would you express the following commands in your language? The words in CAPITAL LETTERS do not need to be translated. Feel free to give multiple possible answers for each command.

Try to express the same command rather than forcing a &#8220;literal translation&#8221;; for example, if there&#8217;s no &#8220;map&#8221; verb in your language, you could translate example (8) as `lookup a map of PLACE`. Please keep in mind that the [[addressee]] is a computer.

### Basic word order / argument structure

1.  `search HELLO`
2.  `search HELLO with google`
3.  `translate HELLO from English to French`
4.  `lookup the weather for PLACE`
5.  `shop for SHOES with Amazon`
6.  `email HELLO to Bill`
7.  `email HELLO to ADDRESS`
8.  `map PLACE`
9.  `find HELLO`
10. `tab to HELLO` or `switch to HELLO tab`

&#8230;

### Pronominal/deictic arguments (aka &#8220;magic words&#8221;)

1.  `search this with google`
2.  `translate this to French`
3.  `bookmark this tab`

&#8230;

<hr style='border-top: 2px gray dashed; height: 0; color: white;' />

### How this data is used

Responses to these surveys would be used to identify certain salient features of the language, such as [how the language codes for its arguments][4] (for example using [[adpositions]], [[case marking]], or word order), whether the commands tend to be verb-inital or -final. Individual case markings, for example, can be identified by comparing *[[minimal pairs]]*—for example, by comparing item (1) and (2), we can learn how `google` in an instrumental role is marked, or by comparing example (2) and the &#8220;magic word&#8221; example (1), we can identify the appropriate &#8220;magic word&#8221; and determine whether the language uses any [[clitics]] or not.

### Data collection

In the future we ideally could build a web-based system to collect these &#8220;utterances.&#8221; We could also use such a system to automatically test our parsers in different languages against the sentences in the *command-bank,* or ultimately even generate parser parameters based on those sentences. That would essentially reduce the parser-construction process to a more run-of-the-mill string translation process.

 [1]: http://ubiquity.mozilla.com
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/i18n
 [3]: https://wiki.mozilla.org/Taskfox/Verbs
 [4]: http://mitcho.com/blog/projects/three-ways-to-argue-over-arguments/