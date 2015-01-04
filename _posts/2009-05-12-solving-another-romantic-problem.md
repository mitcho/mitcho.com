---
title: 'Solving Another Romantic Problem: Weak Pronouns'
layout: post
comments: true
permalink: /blog/projects/solving-another-romantic-problem/
categories:
  - projects
tags:
  - Catalan
  - French
  - Italian
  - Modern Greek
  - Mozilla Planet
  - parser
  - Portuguese
  - romance languages
  - Spanish
  - ubiquity
---
*Yesterday I blogged on [how to deal with portmanteau&#8217;ed prepositions in Ubiquity Parser 2][1], a common problem in various romance languages. Today I&#8217;ll propose an approach to another romantic problem.*

### The problem:

Weak pronouns in \[[romance languages]\] (as well as some other languages) have a special property where they *cliticize* to the verb, moving from its regular argument position to a position next to the verb. For example, in French, we have an imperative like (1) with gloss as (2):

<pre line='1' lang='fr'>Envoyez  le  lettre à  Pierre!
send.IMP the letter to Pierre
</pre>

If we replace *le lettre* or *à Pierre* with a preposition (*le*, &#8220;it&#8221;, or *lui*, &#8220;to him&#8221;, respectively), those weak pronouns move next to the verb—in particular, (5) exemplifies the change in word order. Replacing both arguments with prepositions creates the stacked clitic form of (7).[^3]

<pre line='3' lang='fr'>Envoyez-la à  Pierre!
send   -it to Pierre
Envoyez-lui la  lettre!
send   -him the letter
Envoyez-le-lui!
send   -it-him
</pre>

The fact that these weak pronouns are attached to the verb and lack separate delimiters mean that we will need a separate mechanism to parse these arguments: indeed, this functionality has been planned in [Ubiquity Parser 2][2] as &#8220;step 3&#8221;. Here I&#8217;ll examine some data and discuss a strategy for the parsing of weak pronouns.

<!--more-->

### Weak pronouns in Ubiquity

In Ubiquity the only pronoun we currently deal with is the deictic `object`-role anaphor, like &#8220;it,&#8221; &#8220;this,&#8221; etc. in English.[^1] In addition, as these weak pronoun clitics cannot by definition be embedded within a larger noun phrase, its referent would constitute the entire `object` argument. As such, it is most logical to place clitic handling before argument structure parsing and simply hand the argument parser the argument string without the clitic.

### Marking the clitic

We can classify languages with cliticized weak pronouns into two cases based on their processing considerations: languages that overtly mark the clitic and those which do not.

#### Languages which delimit the clitic

Some languages such as French (see above) clearly mark the boundary between the verb and the clitic. It will be relatively easy to parse weak pronouns in such languages as we can simply [insert a no-width space][3] between the verb and the clitic. A list of clitics can then be designated in the parser (much like anaphora are now) and these weak pronouns can be interpreted as the selection (or &#8220;this&#8221;-referent).[^2]

**Portuguese:** (from [Cysouw 2003][4])

<pre lang='pr'>Come-o
eat -it
</pre>

**Catalan:** (from [Toni Hermoso Pulido][5])

<pre lang='ca'>Cerca-ho
search-it
</pre>

**Modern Greek:** (from [Rivero and Terzi 1995][6]; I know, I know, Greek&#8217;s not a romance language, but it has weak pronoun clitics too&#8230; it&#8217;s all good.)

Modern Greek actually inserts a space between the verb and weak pronouns.

<pre lang='ca'>Diavase to
read   -it
</pre>

#### Languages which do not delimit the clitic

Some languages do not insert any delimiter between the verb and the weak pronoun, essentially entering them as a single word (in the string sense, at least). These cases may be more difficult to parse, especially as there may be sound changes to the verb stem itself.

**Italian:** (first example from [Kayne 1994][7])

Italian is a case where some verbs actually conjoin with the verb in imperatives, much like their prepositions which I noted yesterday have an elaborate system of portmanteau&#8217;ed forms.

<pre lang='it'>Fallo
do-it
Mangialo
eat  -it</pre>

**Spanish:** (first example from [Rivero and Terzi 1995][6], second from [Toni Hermoso Pulido][5])

Spanish is the same way:

<pre lang='es'>Léelo
read-it
Búscalo
search-it
</pre>

### Displaying the suggestion

The current Ubiquity handling of anaphora (aka &#8220;magic words&#8221;) involves a display of the selection (replacement) text in a stylized way. One problem with clitics may be how to visually present this replacement to the user.

<center>
  <img src="/static/uploads/2009/05/picture-11.png" alt="Picture 1.png" border="0" width="284" height="160" />
</center>

For languages with a delimiter such as French we could simply present the selection as an object right after the verb, without the hyphen.

<table>
  <tr>
    <th>
      input:
    </th>
    
    <td>
      traduisez-le (translate-it)
    </td>
  </tr>
  
  <tr>
    <th>
      suggestion:
    </th>
    
    <td>
      traduisez <span style='  padding: 2px;
  -moz-border-radius: 3px;
  display: inline-block;
  font-variant: small-caps;
  background-color: #BBB;
  color: #333;
  position: relative;
  top: -2px;
  font-size: 8pt;
  font-weight: normal;
  border: 1px solid #777;'>selection</span>
    </td>
  </tr>
</table>

Things may be more complicated, however, in languages where the clitic is not delimited from the verb, or where the verb form itself has changed due to the attachment of the clitic.

### Conclusion

In this blog post I&#8217;ve tried to lay out some of the weak pronoun phenomena relevant to Ubiquity with some ideas on how to implement its parsing. I believe parsing weak pronouns should be relatively straightforward in languages with delimiters—for those which do not have delimiters, some creativity may be required in how building regular expressions or rules to detect the clitics and in presenting these suggestions to the user.

**Does your language have weak pronoun clitics? What do you think will be the challenges in trying to parse these arguments?**

[^3]:    
    Note that the reverse order of &#8220;Envoyez-lui-le&#8221; is ungrammatical&#8230; fortunately we most likely will not have to deal with multiple clitics&#8230; see footnote two below.

[^1]:    
    This is not so much an informed decision that we should not do different kinds of anaphors but simply that we haven&#8217;t gotten around to implementing it. I personally am not sure, however, whether there is a real need for parsing for anaphors for roles other than `object` (for example, French *lui* as seen above which would be a `goal` anaphor).

[^2]:    
    There is, however, a question of whether weak pronoun replacement should be obligatory or not: that is, if we see a regular anaphor right now such as &#8220;this,&#8221; we make two copies of the parse: one with the replacement, one without. In the case where we detect an anaphor, should the replacement be obligatory? I believe it should be, though, as with many other Parser 2 features, I believe we can continue to parse other options with no replacement but let the scoring system kill those parses off. If a verb has a clitic attached to it but we do not remove it, it most likely will do very poorly in scoring anyway.

 [1]: http://mitcho.com/blog/projects/solving-a-romantic-problem-portmanteaued-prepositions/
 [2]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_2
 [3]: http://ubiquity.mozilla.com/trac/ticket/665
 [4]: http://email.eva.mpg.de/~cysouw/pdf/cysouwDGFS.pdf
 [5]: http://www.cau.cat/blog/
 [6]: http://aix1.uottawa.ca/~romlab/pubs/RiveroTerzi.1995.pdf
 [7]: http://books.google.com/books?id=tnXJVbGpMfEC