---
title: How natural should a natural interface be?
layout: post
comments: true
permalink: /blog/projects/how-natural-should-a-natural-interface-be/
categories:
  - projects
tags:
  - AppleScript
  - code
  - interface
  - language
  - Mozilla
  - Mozilla Planet
  - natural syntax
  - tasks
  - ubiquity
---
*I&#8217;m very happy to announce that, starting today, I will be working full-time on [Ubiquity][1], a [Mozilla Labs][2] experiment to connect the web with language. I&#8217;ll be heading up research on different linguistic issues of import to a linguistic user interface and blogging about these topics here. If you&#8217;re interested, please subscribe to [my blog&#8217;s RSS feed][3] or [the RSS feed for only Ubiquity-related items][4]. Commenting is encouraged! ^^*

Every day, more users are trying out Ubiquity, the Mozilla Labs experiment that lets users accomplish common Internet tasks faster through a natural language interface. As we live more and more of our lives on the web, there is a huge appeal to—and need for—a faster way to access and mashup our information.

But what exactly do we mean by a &#8220;natural language interface&#8221;? Is it just another programming language with lots of English keywords? Should the final goal be a computer that understands everything we tell it?

<img src="http://mitcho.com/blog/wp-content/uploads/2009/02/ubiqhal2.jpg" alt="Ubiquity is not HAL" title="I'm sorry Dave, I'm afraid I can't do that." width="650" height="220" />

As we think about the future directions and possibilities of Ubiquity, we need to go back to our roots and understand the project&#8217;s motivations. With that in mind, here are some initial thoughts on the advantages of a natural language interface. The ultimate goal here is to refine the notion of natural language interface and to come up with a set of principles that we can follow in pushing Ubiquity further, into other languages and beyond.

<!--more-->

### Why language?

In his [2008 article in interactions][5], [Aza][6] describes a clear need for modern UI to move beyond monolithic do-everything apps into efficient, granular commands that can be connected to accomplish tasks. Hierarchical menus with an application&#8217;s every possible function are great for discoverability, but slow and inefficient as they grow. Aza advocates for the use of a familiar subset of natural language to this end. In his own words,

> Words can capture abstractions that pictures cannot because language has an immense amount of descriptive and differentiating power. Abstract thoughts are exactly represented by the words that give them names. It is this power that comes to the rescue in specifying functionality.

In other words, language gives us the descriptive power to succinctly and creatively express our will, far faster than a series of menus, and with more freedom than a series of shortcuts or gestures. In addition, by tapping into the lexicon of our every day language, we make a direct attack on the learnability problem.[^1]

### The natural syntax test

The ability to string different commands together is not a novel one—indeed, this is what more traditional command lines and programming languages offer. However, these technologies present a huge barrier to the layperson, even for languages with many keywords from English or English-like syntax.

Programming languages can be such teases in this way. Often the first bits of code in a language look remarkably similar to natural language ([[Python]]):

<pre lang='python'>print "Hello World"</pre>

&#8230;but the young coder is quickly disappointed:

<pre lang='python'>print map(lambda x: x*2, [1,2,3])</pre>

[[AppleScript]] is a language which tries to take this idea further and, indeed, sometimes AppleScript code constitutes readable English.

<pre lang='AppleScript'>print pages 1 thru 5 of document 2</pre>

Dig a little deeper, though, and AppleScript also fails the &#8220;natural syntax&#8221; test. In fact, it can be argued that a language that *looks* like a natural language but differs in some important details can be even more difficult to use than one that is completely novel. Bill Cook, one of the original developers of [[AppleScript]], makes this point in [his history of AppleScript][7]: &#8220;in hindsight, it is not clear whether it is easier for novice users to work with a scripting language that resembles natural language, with all its special cases and idiosyncrasies.&#8221;

**If the interface&#8217;s syntax is too restrictive or, worse, conflicts with a user&#8217;s natural intuitions about their natural language, it immediately fails to be &#8220;natural&#8221;, no matter how similar the keywords or grammar is.**[^2]

### Towards a natural (and forgiving) syntax

Aza similarly laments the relegation of text-based interfaces to the higher echelons of geekdom in his 2008 paper: &#8220;if commands were memorable, and their syntax *forgiving*, perhaps we wouldn&#8217;t be so scared to reconsider these interface paradigms.&#8221;

The key word &#8220;forgiving&#8221; above (emphasis mine) is two-ways ambiguous, both of which we want a natural language interface to be:

1.  *Forgiving* as in &#8220;not difficult to learn and remember&#8221;: the syntax must be easy and natural for the user, encouraging experimentation and intuitive application;
2.  *Forgiving* as in &#8220;not correcting or prescriptive&#8221;: the system should try its darndest to accept the user&#8217;s input, even if it&#8217;s not the most &#8220;well-formed.&#8221;

From an implementation point of view, (2) above can also be an advantage. There are many grammatical restrictions in natural language which, as long as the command is unambiguous, Ubiquity need not enforce on the user. Take, for example, the two statements:

<pre lang='ubiquity' line='1'>print two copy
print two copies</pre>

I feel that Ubiquity should execute both of these statements with equal ease. The numeral &#8220;two&#8221; makes the user&#8217;s intent very clear, even though the plural of &#8220;copy&#8221; should indeed be &#8220;copies.&#8221; It need not be the job of the interface to decide whether a sentence is &#8220;correct English.&#8221; By assuming that the user is trying to communicate a valid and possible task, rather than throwing up an error, the system will be more flexible and more forgiving in the inevitable case of human error. **The ultimate goal should be to help the user accomplish their task.**

### Conclusion

By developing a language interface which truly *feels* natural to the user, we can successfully bring the power of text-based interfaces to the masses. I feel the key to this &#8220;natural-ness&#8221; is a less restrictive and in fact *forgiving* syntax. While this goal akin to [[natural language programming]] may be daunting from an implementation angle, and it may indeed prove impossible, as long as the goal is to execute simple imperative commands, the scope of the target syntactic structures is limited.

Ubiquity as it stands is many different things for many people. The natural language guidelines above may feel too restrictive to many current developers for whom Ubiquity is simply a convenient new way to extend Firefox.[^3] This discussion also seems orthogonal to the [mouse-based Ubiquity experiments][8]. **As users and developers, how do you feel about the potential benefits and downsides of these natural syntax guidelines?** In the coming days I&#8217;ll look at some concrete examples of what this &#8220;forgiving&#8221; syntax would demand of Ubiquity.

[^1]:    
    The learnability problem of a linguistic interface, particularly in light of the usability vs. discoverability paradigm, is a topic for a future post. ;)

[^2]:    
    It&#8217;s important to note that the &#8220;restrictions&#8221; I&#8217;m concerned with here are syntactic ones, not lexical ones. That is, if either of the Ubiquity commands below fail because we don&#8217;t have a &#8220;pass&#8221; verb, that&#8217;s fine. But if Ubiquity can only allow one string but not the other, that&#8217;s a syntactic restriction which goes against our English intuition. <pre lang='ubiquity' line='1'>pass Jono the ball
pass the ball to Jono</pre> I&#8217;ll cover this in a future post.

[^3]:    
    In fact, I myself am also guilty of this&#8230; my [select command][9] for SQL queries clearly does not encourage a natural language-compatible syntax.

 [1]: http://ubiquity.mozilla.com
 [2]: http://labs.mozilla.com
 [3]: http://mitcho.com/blog/feed/blog-only/
 [4]: http://mitcho.com/blog/tag/ubiquity/feed/
 [5]: http://doi.acm.org/10.1145/1330526.1330535
 [6]: http://azarask.in
 [7]: http://www.cs.utexas.edu/~wcook/Drafts/2006/ashopl.pdf
 [8]: http://www.azarask.in/blog/post/can-ubiquity-be-used-only-with-the-mouse/
 [9]: http://mitcho.com/code/select/