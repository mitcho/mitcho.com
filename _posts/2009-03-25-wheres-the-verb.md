---
title: 'Where&#8217;s The Verb?'
layout: post
comments: true
permalink: /blog/observation/wheres-the-verb/
categories:
  - observation
tags:
  - commands
  - infinitive
  - linguistics
  - Mozilla Planet
  - parser
  - subjunctive
  - typology
  - ubiquity
  - verb-final
  - verbs
---
Ubiquity&#8217;s [proposed new parser design][1] is based on a [[principles and parameters]] philosophy: we can build an underlying universal parser and, for each individual language, we simply set some &#8220;parameters&#8221; to tell the parser how to act. As we consider the design&#8217;s pros and cons, it&#8217;s important to reflect back on the linguistic data and see if this architecture can adequately handle the range of linguistic data attested in our languages.

Today I&#8217;ll examine highlight some disparate typological data to help us understand these questions: **where&#8217;s the verb?** and **what does the verb look like?** <!--more--> There are broadly three different verb forms taken in commands in different languages:

[^1]

1.  the [[infinitive]],
2.  [[subjunctive mood]], or
3.  a special verb form such as [[imperative]], [[participial]], or conjunctive (such as Japanese [[Japanese verb conjugations#Te_form|て form]])

Let&#8217;s give an example of each:

**Infinitive** (English):[^2] <pre lang="English" line='1'>Hit me!</pre>

**Subjunctive mood** (Modern Greek): &#8220;Eat it all!&#8221; <pre lang="English" line='2'>Na   to fas olo!
SUBJ it eat all</pre>

**Imperative form** (French): &#8220;Eat it!&#8221; <pre lang="French" line='4'>Mange   -le!
eat.IMP it</pre>

It&#8217;s important to note that some languages have *multiple forms available* for the same command. For example:

**Dutch**: three ways to say &#8220;watch out!&#8221; with the same verb

1.  Infinitive: `Oppassen!`
2.  Imperative: `Pas op!`
3.  Participial: `Opgepast!`

Similarly, I received [a great comment by PhiliKON][2] on German and [associated data by Robert Kaiser][3] on my blog post yesterday:

**German**: &#8220;search hello with google&#8221;

1.  Infinitive: `hello mit google suchen`
2.  Imperative: `suche hello mit google`

In addition, German and Dutch are interesting as they are [[V2 word order|verb second (V2)]] languages, so the verb may surface at the beginning or the end of the sentence, depending on the form.

The [new parser design][1] (which [you can demo][4]) assumes for simplicity that the verb should be found at the beginning or the end of the input, which is consistent with the data I&#8217;ve seen (modulo [[Clitic#Clitics\_in\_Romance_languages|clitics]]). Multiple verb forms could be accounted for by supporting &#8220;synonyms&#8221; of the verbs.

**What are the different ways verbs are expressed in commands in your language? Is the verb always found at the beginning or the end of the sentence? Is it ever somewhere in the middle?**

[^1]:    
    Some of the data and theoretical support for this section comes from, among other sources, Sabine Iatridou&#8217;s [De Modo Imperativo][5] lecture notes.

[^2]:    
    Many refer to this in English as an &#8220;imperative form,&#8221; but in Modern English this is arguably the same as the infinitive.

 [1]: https://wiki.mozilla.org/User:Mitcho/ParserTNG
 [2]: http://mitcho.com/blog/projects/ubiquity-i18n-questions-to-ask/#comment-974
 [3]: http://mitcho.com/blog/projects/ubiquity-i18n-questions-to-ask/#comment-980
 [4]: http://mitcho.com/code/ubiquity/parser-demo/
 [5]: http://web.mit.edu/linguistics/people/faculty/iatridou/de_modo_imperativo.pdf