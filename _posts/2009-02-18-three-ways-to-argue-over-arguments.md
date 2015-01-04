---
title: Three ways to argue over arguments
layout: post
comments: true
permalink: /blog/projects/three-ways-to-argue-over-arguments/
dsq_thread_id:
  - 3288215412
categories:
  - projects
tags:
  - agreement
  - ambiguity
  - Ancient Greek
  - argument structure
  - arguments
  - case
  - Chinese
  - coding properties
  - English
  - grammatical relations
  - Hungarian
  - Japanese language
  - linguistics
  - Mandarin
  - Mozilla Planet
  - ubiquity
  - verbs
  - word order
---
*UPDATE: Contribute information on how your language identifies its arguments [here][1].*

When we execute a command in Ubiquity, in very simple terms, we&#8217;re hoping to do something (a verb) to some arguments (the nouns). Every sentence in every language uses some method to encode which arguments correspond to which roles of the verb. Here are a couple examples:

<pre lang='english' line='1'>He sees Mary.
彼が Maryを 見る。 (Kare-ga Mary-o miru.)</pre>

As speakers of English, you can read sentence (1) above and know exactly who is doing the seeing and who is being seen and speakers of Japanese can get the same information from (2). **How do different languages code for arguments in different roles?** There are, broadly speaking, three different ways:

<center>
  <img src="/static/uploads/2009/02/threeways.png" alt="three ways to code for arguments in different roles" border="0" width="536" height="284" />
</center>

We&#8217;ll take a brief look today at these three different strategies, all of which [a localizeable natural language interface][2] will surely encounter.

<!--more-->

### Word order

In many languages, the position of the arguments relative to one another and to the verb determine the roles which each argument will play. Mandarin Chinese is a good example of such a language:

<pre lang='chinese' line='3'>他 喜欢 Mary (Ta xihuan Mary)
Mary 喜欢 他 (Mary xihuan ta)</pre>

Here, sentence (3) says &#8220;he likes Mary&#8221; while sentence (4) says &#8220;Mary likes him&#8221;. Simply reversing the positions of &#8220;he/him&#8221; and &#8220;Mary&#8221; we&#8217;re able to flip the roles that they fill in the sentence: that of the person who does the liking and the person who is being liked. Now take a look at sentence (5) which means &#8220;John says &#8216;hello&#8217; to Mary.&#8221;

<pre lang='chinese' line='5'>John 告诉 Mary "你 好" (John gaosu Mary "ni hao")</pre>

We note here that, while in English we used a different strategy of marking one argument (we marked the &#8220;hello&#8221; argument with &#8220;to&#8221;), Chinese doesn&#8217;t mark either of the arguments. There is, however, a clearly defined order to the arguments, which you might encode this way:

<pre lang='code'>say [who you're speaking to] [what you're saying]</pre>

If you swap the order of the two objects in this sentence, it becomes ungrammatical. (**Note:** the asterisk * here means the sentence is *ungrammatical*.)

<pre lang='chinese' line='5'>* John 告诉 "你 好" Mary (John gaosu "ni hao" Mary)</pre>

Here, the word order dictates that &#8220;你好&#8221; must be &#8220;who you&#8217;re speaking to&#8221; and &#8220;Mary&#8221; must be &#8220;what you&#8217;re saying,&#8221; but that doesn&#8217;t make sense, so the sentence is ungrammatical.

### Marking the arguments

Another possible strategy is to mark each argument (or some of the arguments) so that each argument&#8217;s role is clear. In many languages this is done with [[case marking]]. Take for example this Ancient Greek sentence with its English gloss on line (6). Here, NOM refers to [[nominative case]] and ACC refers to [[accusative case]].[^2]

<pre lang='ancient-greek' line='5'>ho  didaskal-os  paideuei to  paidi-on  (SVO)
the teacher -NOM teaches  the boy  -ACC</pre>

This sentence means &#8220;the teacher instructs the boy.&#8221; While sentence (5) is in Subject-Verb-Object order, any of the six possible orderings of {subject, verb, object} are also grammatical and mean the same thing:[^1]

<pre lang='ancient-greek' line='7'>ho didaskalos to paidion paideuei (SOV)
paideuei ho didaskalos to paidion (VSO)
paideuei to paidion ho didaskalos (VOS)
to paidion ho didaskalos paideuei (OSV)
to paidion paideuei ho didaskalos (OVS)</pre>

Many languages also use \[[adposition|adpositions]\] (prepositions and/or postpositions) to further clarify the role of an argument in addition to case (like English does) or in lieu of case marking altogether. The idea is the same, though: you want to clarify the roles of the arguments so you morphologically mark the arguments with their roles.

### Marking the verb

Many languages mark the verb with some information about the argument in a certain role, so that we can properly identify the argument&#8217;s roles. This kind of phenomenon is called *agreement*.

The most common type of verbal agreement is subject agreement, where the verb is marked by a specific form depending on some features of the subject. Anyone who&#8217;s taken French 101 will recognize this verb conjugation paradigm:

<table>
  <tr>
    <th>
    </th>
    
    <th>
      subject
    </th>
    
    <th>
      être (to be)
    </th>
  </tr>
  
  <tr>
    <td rowspan='3'>
      singular
    </td>
    
    <td>
      je (I)
    </td>
    
    <td>
      suis
    </td>
  </tr>
  
  <tr>
    <td>
      tu (you)
    </td>
    
    <td>
      es
    </td>
  </tr>
  
  <tr>
    <td>
      il/elle (he/she)
    </td>
    
    <td>
      est
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      plural
    </td>
    
    <td>
      nous (we)
    </td>
    
    <td>
      sommes
    </td>
  </tr>
  
  <tr>
    <td>
      vous (plural you)
    </td>
    
    <td>
      êtes
    </td>
  </tr>
  
  <tr>
    <td>
      ils (they)
    </td>
    
    <td>
      sont
    </td>
  </tr>
</table>

With this paradigm, if you hear or see &#8220;suis&#8221; in a French sentence, you immediately know that &#8220;je&#8221; (*I*) must be the subject and if you see &#8220;sommes,&#8221; &#8220;nous&#8221; (*we*) is the subject, etc. [[Standard Average European]] languages tend to exhibit this sort of subject-verb agreement.

Features of the subject position aren&#8217;t the only thing that can be marked on the verb, though. Hungarian, for example, has a type of object agreement. Specifically, the verb marks whether the object is definite or not (in linguistics lingo, &#8220;the verb agrees with the object&#8217;s definiteness feature&#8221;).

<pre lang='hungarian' line='12'>John lát  egy almát.
John sees an  apple
John látja az  almát.
John sees  the apple</pre>

Notice that in sentence (12) (glossed in (13)) the verb for &#8220;see&#8221; is realized as &#8220;lát,&#8221; while in (14) it&#8217;s &#8220;látja.&#8221; A speaker can use that agreement to see whether the object is definite or not and thus limit the possible object arguments out of all the nouns in the sentence.

### All of the above

[<img src="/static/uploads/2009/02/whom.gif" alt="whom.gif" border="0" width="650" height="442" />][3]

Most languages do not use only one of these strategies, but a combination of them. English is a very good example. In a sentence like (12) below the main coding of grammatical roles seems to be word order alone. By reversing the word order into (13), we can effectively swap the argument&#8217;s roles.

<pre lang='english' line='12'>John likes Mary.
Mary likes John.</pre>

However, this doesn&#8217;t work with pronominal arguments. Swapping the arguments in (14) yields (15) which is ungrammatical due to the case marking on the pronouns.

<pre lang='english' line='14'>He likes her.
* Her likes he.</pre>

In addition, the verb in English must agree with the subject&#8217;s number (singular or plural):

<pre lang='english' line='16'>John likes them.
* They likes John.
They like John.</pre>

In this way, English exhibits all three strategies: word order, case marking, and agreement, although often only word order is actively used to disambiguate the roles of arguments.

**Question:** What strategies are used by your language to mark the roles of different arguments?

[^2]:    
    The following example is from [Holger Diessel][4].

[^1]:    
    &#8220;Mean the same thing&#8221; here means that the teacher is always instructing and the boy is always being instructed. The sentences may differ in when or how they are used depending on which argument is being talked about or what the implications of the utterance are. The formal notion is *truth-conditional equivalence*.

 [1]: http://mitcho.com/blog/projects/contribute-how-your-language-identifies-its-arguments/
 [2]: http://www.azarask.in/blog/post/scaling-ubiquity-to-60-languages-we-need-your-help/
 [3]: http://www.qwantz.com/
 [4]: http://www.personal.uni-jena.de/~x4diho/LingTyp%20Grammatical%20relations.ppt