---
title: 'Ubiquity in Firefox: Focus on Japanese'
layout: post
comments: true
permalink: /blog/projects/ubiquity-in-firefox-japanese/
categories:
  - projects
tags:
  - argument structure
  - arguments
  - design
  - Firefox
  - interface
  - Japanese language
  - linguistics
  - mockup
  - Mozilla Planet
  - parser
  - ubiquity
  - verbs
---
One of the eventual goals of the [Ubiquity project][1] is to bring some of its functionality and ideas to Firefox proper. To this end, [Aza][2] has been exploring some possible options for what that would look like ([round 1][3], [round 2][4]). All of his mockups, however, use English examples. I&#8217;m going to start exploring what Ubiquity in Firefox might look like in different kinds of languages. Let&#8217;s kick this off with my mother tongue, Japanese.[^1]

*今後多様な言語に対応したFirefox内のUbiquityを検討していきますが、その中でも今日は日本語をとりあげます。後日日本語で同じ内容を投稿するつもりです。^^* **日本語でのコメントも大歓迎です！**

<!--more-->

### What commands look like in Japanese

Japanese is not only just a verb-final language but it is strongly [[head-final]], meaning it has postpositions instead of prepositions, direct objects come before verbs, and adjectives precede nouns. In terms of [how it identifies its arguments][5], every argument has a postposition/case marker (called a *particle* in the Japanese literature) which marks its role in the sentence.

A couple common particles we&#8217;ll look at in this example include -を (*-o*) which marks the direct object (accusative case, you might say) and -に (*-ni*) which acts like English &#8220;to&#8221; (dative case). The example sentence we&#8217;ll look at today is:

<table border='0'>
  <tr>
    <td>
      ケーキを
    </td>
    
    <td>
      ブレアに
    </td>
    
    <td>
      送って
    </td>
    
    <td>
      (ください)
    </td>
  </tr>
  
  <tr>
    <td>
      <em>kēki-o</em>
    </td>
    
    <td>
      <em>burea-ni</em>
    </td>
    
    <td>
      <em>okuʔte</em>
    </td>
    
    <td>
      <em>kudasai</em>
    </td>
  </tr>
  
  <tr>
    <td>
      cake.ACC
    </td>
    
    <td>
      Blair.DAT</em>
    </td>
    
    <td>
      send.IMP
    </td>
    
    <td>
      &#8220;please&#8221;
    </td>
  </tr>
  
  <tr>
    <td colspan='4'>
      &#8220;Please send a cake to Blair.&#8221;
    </td>
  </tr>
</table>

(Note: ʔ is a [[glottal stop]]. ACC=accusative, DAT=dative, and IMP=imperative form.)

That final ください is often dropped in very casual speech and, as it adds no new information, we&#8217;ll assume today that the user will not enter it. Finally, Japanese doesn&#8217;t use spaces in their orthography, so the actual input would be &#8220;ケーキをブレアに送って&#8221;.

### Mockup 1: Particle identification

One of the major hurdles in working with Japanese is that there are no spaces between the words. The natural first step is to split the sentence up into words, but this is a very difficult problem in [[Natural Language Processing|NLP]] which [big name research groups][6] actively work on.

Fortunately, however, in [&#8220;Solving the &#8216;It&#8217; Problem&#8221;][7] Aza suggests that, when we encounter ambiguity in our input, we can *go ask the user*. Great minds think alike, and computer scientist [[Jean E. Sammet]] suggested the same idea [way back in 1953][8]:

> Using English [or any other natural language] definitely involves the requirement for the computer (or more accurately its programming system) to query the user about any possible ambiguity.

Parsing a sentence into words, in the limited context of Ubiquity, is really about identifying the particles which mark the end of each argument. Here&#8217;s a mockup of an application of the Sammet-Raskin Method to this problem:

<center>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/02/particle-id.png" alt="particle-id.png" border="0" />
</center>

**Pros:** This completely takes care of the word-breaking problem, with minimal arbitration from the user. The parser knows *exactly* what arguments it&#8217;s dealing with and the visual feedback means the user won&#8217;t be surprised by the parse.

**Cons:** Most of the particles/postpositions we&#8217;d have to deal with are a single character, so they may show up pretty often within words, in which case it would be quite annoying to have to press escape after each one.

An even smarter system, when wanting to mark a character as a particle, would first check to see that the argument (before the particle) is a valid argument type for that particle. If the check fails, it doesn&#8217;t have to bother with suggesting that character as a particle. This may cut down on the false positives.

### Smart suggestions: what works, what doesn&#8217;t

One of the key suggestions in Aza&#8217;s mockups include a way to choose the prepositions while entering your arguments, based on the current verb.

For example, here, the `translate` command accepts a direct object, a *to*-object, and a *from*-object, so little `to` and `from` markers magically show up on the right side, making the appropriate prepositions (and by extension the appropriate arguments) discoverable. I think this line of thinking is a really good one, at least for English.

<center>
  <a class='limages' rel='lightbox[verbfinal]' href='http://farm4.static.flickr.com/3359/3272673947_05b4a21881_o.jpg'><img src='http://farm4.static.flickr.com/3359/3272673947_14b59c2aa1.jpg' /></a>
</center>

**In a verb-final language, however, you enter the arguments first and then the verb, making this strategy of suggesting appropriate arguments impossible.** Note that in the user-contributed spreadsheet of [how languages identify their arguments][9] we see that about a quarter of the languages we looked at are verb-final—that is, with Subject-Object-Verb canonical word order.

Instead of seeing this as a disadvantage, however, let&#8217;s see what verb-final order *allows* us to do.

### Mockup 2: A different kind of suggestion

Not all verbs allow for every different kind of particle. For example, it doesn&#8217;t make sense to have a -に (*-ni*, &#8220;to&#8221; or dative) argument for a verb like 検索して (*kensaku-shite*, &#8220;search for&#8221;). In English we used this to suggest different types of arguments given a specific verb. In a verb-final language, we could do this *backwards*.

<center>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/02/verb-suggestion.png" alt="verb-suggestion.png" border="0" />
</center>

**Pros:** This makes verbs highly discoverable, given a certain argument structure. For example, if you enter a few arguments, like a direct object, a &#8220;to&#8221; argument, and a &#8220;from&#8221; argument, it&#8217;ll suggest verbs that will do something to an object from somewhere to somewhere else. This way, you can easily try out verbs you didn&#8217;t even know existed. It&#8217;ll only give you verbs appropriate for your arguments, reducing the chance of writing a an infelicitous command.

**Cons:** Without knowing what kinds of actions are available, it may be difficult to know what kinds of arguments to enter in the first place. If you have a specific verb or service you want to use it may be counterintuitive or downright tricky to start by guessing the right set of arguments.

In addition, from a technical point of view, this requires much of the prediction algorithms in English Ubiquity to run backwards. Ideally, there would be a closed (predetermined) class of particles and a predefined set of noun types. Verbs would not be able to define their own modifiers and noun classes as easily or freely as they can now.

### Conclusion

The properties and challenges of Japanese grammar require that we not try to outright copy the English behavior but to think about what really makes sense in that language and that may be an important lesson as we move toward designing a localizable Ubiquity. Please post your questions and criticisms of this design or post your own mockups!

[^1]:    
    Happy [International Mother Language Day][10]! ^^

 [1]: http://ubiquity.mozilla.com
 [2]: http://azarask.in
 [3]: http://www.azarask.in/blog/post/ubiquity-in-firefox-round-1/
 [4]: http://www.azarask.in/blog/post/ubiquity-in-the-firefox-round-2/
 [5]: http://mitcho.com/blog/projects/three-ways-to-argue-over-arguments/
 [6]: http://research.microsoft.com/en-us/projects/japanesenlp/default.aspx
 [7]: http://www.azarask.in/blog/post/solving-the-it-problem/
 [8]: http://doi.acm.org/10.1145/365230.365274
 [9]: http://mitcho.com/blog/projects/contribute-how-your-language-identifies-its-arguments/
 [10]: http://www.un.org/depts/dhl/language/index.html