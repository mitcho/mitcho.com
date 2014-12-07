---
title: 'Exploring Command Chaining in Ubiquity: Part 2'
layout: post
comments: true
permalink: /blog/projects/exploring-command-chaining-in-ubiquity-part-2/
categories:
  - projects
tags:
  - Chinese
  - code
  - English
  - Japanese language
  - Mandarin
  - Mozilla Planet
  - natural syntax
  - serial verb construction
  - syntax
  - ubiquity
---
### Introduction

I recently have begun giving serious thought to what **command chaining** might look like in Ubiquity and the various considerations which must be made to make it happen. The &#8220;command chaining,&#8221; or &#8220;piping,&#8221; described here always involves (at least) two verbs acting sequentially on a passed target—that is, the first command performs some action or lookup and the second command acts on the first command&#8217;s output.

A few days ago I penned some initial [technical considerations regarding command chaining][1]. In this post I&#8217;ll be point out some linguistic considerations involved in supporting a [natural syntax][2] for chaining.

<!--more-->

### Simple syntaxes: sequential vs embedding strategies

When it comes to creating a natural language interface, there&#8217;s always a decision to make between requiring a certain kind of input, or working a little harder to understand the user&#8217;s natural input. From an implementation point of view, adopting certain programmatic conventions is of course simpler and to this end, there have been a couple different &#8220;unnatural&#8221; command chaining syntaxes suggested. While these both go against Ubiquity&#8217;s basic tenet of [natural syntax][2] — that is, to not introduce rules which contradict the user&#8217;s natural language — which gives Ubiquity its strengths of usability and memorability, I&#8217;ll entertain them here as they illustrate two different structural relationships that we will want to consider.

[<img src="http://mitcho.com/blog/wp-content/uploads/2009/08/not-pipe.gif" alt="not-pipe.gif" border="0" width="480" height="329" />][3]

The first suggestion is to adopt the \[[Pipeline_(Unix)|shell pipe]\] (|), which would lead to input such as

<pre lang='ubiquity' line='1'>translate hello to Spanish | email to Jono
</pre>

While this itself is pretty unnatural unless you speak shell, note that this syntax is similar to the more natural &#8220;, and&#8221; syntax, yielding `translate hello to Spanish, and email to Jono`, which we will consider below. I&#8217;ll refer to this strategy as the **sequential** strategy.

Another [very interesting proposal][4] by Alex Fritze is to embed each subordinate computation into an argument position, marked by parentheses. This could also be parsed relatively straightforwardly by writing a noun type which first checks for parentheses and then runs the content of the argument through another [ParseQuery][5].

<pre lang='ubiquity' line='2'>email (translate hello to Spanish) to Jono
</pre>

I&#8217;ll refer to this pattern as the **embedding** strategy.

### Sequential and embedding strategies in natural language

What&#8217;s interesting about the two proposals above is that both strategies are seen in natural language. The sequential strategy could correspond to the following linguistic phenomena:

1.  [[coordination (linguistics)|coordination]]: a non-hierarchical joining of two or more [[clauses (linguistics)|clauses]], often marked by a [[conjunction]]. Here&#8217;s an example from English: 
    *   &#8220;[I made a sandwich] and [you will eat it]&#8221; where [] represent clause boundaries. Here, &#8220;and&#8221; is the conjunction.
2.  [[serial verb construction|serial verb]] and [[converb|converb]] constructions: a joining of multiple verbs or verb phrases within a single clause, with shared subject and tense/aspect values, with no particular conjugation or delimiter between them. Such constructions are common in many African and east Asian languages. Here are two examples:[^1]  
    

*   A converbal construction in Japanese:  
    <pre lang='ja' line='3'>僕は     サンドイッチを 作って     食べる
boku-wa sandiʔchi-o  tsuku-ʔte tabe-ru
I-TOP   sandwich-ACC make-CON  eat
</pre>
    
      
    &#8220;I (will) make a sandwich and eat [it].&#8221; (Here, \`TOP\` = topic, \`ACC\` = accusative, \`CON\` = converbal ending)[^3]
*   A serial verb construction in Mandarin Chinese:  
    <pre lang='zh' line='6'>我 作   三明治      吃
wǒ zùo  sānmíngzhì chī
I  make sandwich   eat
</pre>
    
      
    &#8220;I (will) make a sandwich and eat [it]&#8221; or &#8220;I (will) make a sandwich [in order to] eat [it].&#8221;

  
Note that in both the converb and serial verb construction, the second verb (eat) takes shares its object (sandwich) with the first verb and there is no need for a pronoun such as &#8220;it&#8221; to introduce that argument as it is with coordination, above.[^2]

The embedding strategy is observed in natural language as well, in the form of the following phenomena:

1.  [[embedded clauses]]: a sentence is itself the argument of another verb. Example:  
    

*   &#8220;John says [he likes sandwiches].&#8221;

  
Embedded clauses, however, clearly have no relation to command chaining and does not require our attention. 2. [[relative clauses]]: a partial sentence[^5] is attached to a noun in order to describe it or distinguish it from other possible referents. Example:

*   &#8220;You ate the sandwich that I made&#8221; where &#8220;sandwich&#8221; is called the &#8220;head&#8221; of the relative clause, and &#8220;I made&#8221; is what I here call the &#8220;partial sentence&#8221; (see footnote). The &#8220;relative clause&#8221; is used here to distinguish &#8220;the sandwich that I made&#8221; from other sandwiches.

### The natural syntax of chaining

So **which strategy is used in complex natural language commands:** the sequential strategy or the embedding strategy? Both the sequential strategy and embedding strategy can be involved with commands:

<pre lang='en' line='9'>[Make a sandwich] and [eat it]!
Eat (the sandwich that I made)!
</pre>

These two commands do not mean the same thing, though, and only (9) is the kind of command we would want to give Ubiquity. The problem with relative clauses, as in (10), is that it *[[presupposition|presupposes]] the existence of the sandwich in the context*. If we both know you just made a sandwich, saying (10) is perfectly appropriate, but out of the blue it doesn&#8217;t make sense. For this reason, **only the sequential strategy is used in the natural syntax of chaining.**

### Parsing the sequential strategy

In natural language, unlike the initial simple proposals laid out above, there is often no clear delimiter marking the boundary between the two parts in a sequential relation (e.g. examples (3) and (6) above, particularly given that neither Japanese and Chinese normally break words with spaces). **How would we parse a sequential string of commands?**

Let&#8217;s assume for our purposes here that we can identify find all verbs within the input string.[^4] Parsing a sequential strategy string is not particularly difficult if we can also assume that the verb in any particular language is either always verb-initial or always verb-final. Let&#8217;s look at both cases:

*   Always verb-initial: Mandarin Chinese:  
    <pre lang='zh' line='11'>翻譯       hello 到  西班牙語   送    給  Juanito
fānyì     hello dào xībānyáyǔ sòng gěi Juanito
translate hello to  Spanish   send to  Juanito</pre>
    
      
    &#8220;Translate hello to Spanish [and] send [it] to Juanito&#8221; 
    1.  find every possible verb:  
        **翻譯**hello到西班牙語**送**給Juanito
    2.  as every verb marks the beginning of a sentence, we now have our two commands: &#8220;**翻譯**hello到西班牙語&#8221; (translate hello to Spanish) and &#8220;**送**給Juanito&#8221; (send to Juanito).
*   Always verb-final: Japanese  
    <pre lang='ja' line='14'>helloを スペイン語に 訳して Juanitoに 送って
hello-o supeingo-ni yakus-ite Juanito-ni oku-ʔte
hello-ACC Spanish-DAT translate-CON Juanito-DAT send-CON
</pre>
    
      
    &#8220;Translate hello to Spanish [and] send [it] to Juanito&#8221; 
    1.  find every possible verb:  
        helloをスペイン語に**訳して**Juanitoに**送って**
    2.  as every verb marks the end of a sentence, we now have our two commands: &#8220;helloをスペイン語に**訳して**&#8221; (translate hello to Spanish) and &#8220;Juanitoに**送って**&#8221; (send to Juanito).

For languages where there is a clear conjunction between the two commands, such as English &#8220;and&#8221;, we can also use that conjunction as a delimiter as well. We then simply execute the first command and then execute the second with the first command&#8217;s output in its interpolation context. This way the output of the first command will be picked up both by an overt pronoun such as &#8220;it&#8221; in the second command and without it, such as in the Chinese and Japanese examples above.[^6]

The only potential problem with this approach is in the case of languages where some commands are verb-initial while others are verb-final. I note that such languages do exist in a previous blog post, [Where&#8217;s The Verb][6]. In these languages, commands can be expressed by more than one verb form (such as infinitive, imperative, subjunctive, etc.) and some of those verb forms are sentence-initial while others are sentence-final. Here&#8217;s one such example from German:

&#8220;search hello with google&#8221; (German) 1. Infinitive: hello mit google suchen 2. Imperative: suche hello mit google

Here the verb for &#8220;search&#8221; is &#8220;suchen&#8221; (infinitive) or &#8220;suche&#8221; (imperative). I know that this same type of phenomena occurs in other Germanic languages such as Dutch with infinitive and imperative and also other languages such as Modern Greek with infinitive and subjunctive forms. **If you are a speaker of one of these lanuages (German, Dutch, Greek, etc.) I would love to know whether you can chain verb-final and verb-initial commands together.**

### Conclusion

In this blog post I examined command chaining in natural language, focusing on data from English, Mandarin Chinese, and Japanese, which exhibit three linguistically different approaches to chaining. What we found is that the sequential strategy—that of listing the commands one by one, in order of execution—is what is used in natural languages, rather than any sort of embedding. This fact, combined with the fact that our parser can recognize every available verb, offers a simple approach to doing a naive parse of natural command chains in most languages, even without explicit delimiters.

In a final installation of this series on &#8220;exploring command chaining,&#8221; I hope to consider how the Ubiquity interface itself could present command chains and aid in its input.

[^1]:    
    The distinction between serial verb and converb constructions (as well as other forms of complex predication) hinge on structural distinctions which are not of importance for our purposes.

[^2]:    
    Some people ([Baker 1989][7] and others), in fact, list this object sharing as a necessary part of the notion of a &#8220;serial verb construction.&#8221;

[^5]:    
    &#8220;Partial sentence&#8221; is used in a descriptive sense here to reflect that the relative clause, such as &#8220;I made&#8221; in the example given cannot stand as its own sentence, as the verb&#8217;s argument is clearly missing. This type of pattern is also seen in questions (&#8220;What did [you make]?&#8221;) and topicalization (&#8220;That sandwich, [I made].&#8221;) and is a great focus of theoretical linguistics research. See [[wh-movement]] on wikipedia for more examples and information on theoretical approaches to such constructions.

[^4]:    
    We don&#8217;t do this right now as there hasn&#8217;t been a use for it—right now [Parser 2][8] simply looks for known verbs at the beginning and end of the input. The parser does build a nice regular expression to find known verbs, however, so finding verbs input-medially would also be easy to do, though.

[^6]:    
    Note that even though the linguistic relation between the two commands is non-hierarchical, we interpret the sentences to mean &#8220;translate hello to Spanish and *then* email it to Juanito&#8221;, rather than &#8220;translate hello to Spanish and email it (hello) to Juanito *at the same time*.&#8221; This observed universal property that, ceteris paribus, the linear speech order of verbs reflects the conceptual order of events is known as the Temporal Iconicity Condition ([Li 1993][9] and others).

 [1]: http://mitcho.com/blog/projects/exploring-command-chaining-in-ubiquity-part-1/
 [2]: http://mitcho.com/blog/projects/how-natural-should-a-natural-interface-be/
 [3]: http://www.threadless.com/product/543/This_is_not_a_Pipe?streetteam=mitcho
 [4]: http://www.croczilla.com/blog/16
 [5]: http://ubiquity.mozilla.com/trac/ticket/532
 [6]: http://mitcho.com/blog/observation/wheres-the-verb/
 [7]: http://www.jstor.org/stable/4178644
 [8]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [9]: http://www.jstor.org/pss/416696