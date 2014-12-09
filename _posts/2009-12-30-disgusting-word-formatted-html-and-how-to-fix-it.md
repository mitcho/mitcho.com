---
title: Disgusting Word-formatted HTML and how to fix it
layout: post
comments: true
permalink: /blog/projects/disgusting-word-formatted-html-and-how-to-fix-it/
categories:
  - observation
  - projects
tags:
  - code
  - HTML
  - markup
  - microsoft
  - MITWPL
  - Office
  - perl
  - word
---

In working on a new website for the MIT Working Papers in Linguistics, I recently inherited a collection of HTML files with all of our books' abstracts. To my dismay (but not surprise) the markup in these files were horrendous. Here are some of the cardinal sins of markup that I saw committed in these files:

1. **Confusing `id`s and `class`es.** `id`s should be unique on the page... but here's an instance of using multiple instances of the same `id` in order to format them together.
	{% highlight html %}
	<div id="number">4.2.1</div> <div id="page">161</div> <div id="section">Old French (Adams 1987)</div>
	</div> <div id="indent"> <div id="number">4.2.2</div> <div id="page">164</div> <div id="section">The evolution of the dialects of northern Italy</div>
	{% endhighlight %}
2. **Putting a class on every instance of something.** Everything paragraph should be formatted equivalently. We get the point.
	{% highlight html %}
	<pre lang='html'><p class=MsoNormal><b>The English Noun Phrase in Its Sentential Aspect</b></p>
	<p class=MsoNormal>Steven Paul Abney</p>
	<p class=MsoNormal>May 1987</p>
	{% endhighlight %}
3. **Using blank space for formatting.**
	{% highlight html %}
	<p class=MsoNormal><o:p>&amp;nbsp;</o:p></p>
	{% endhighlight %}
4. **CSS styles that don't exist.** Browsers just ignore these anyway...
	{% highlight html %}
	<p class=MsoNormal>One factor in determining which worlds a modal quantifies over is the temporal argument of the modal’s accessibility relation.<span style='mso-spacerun:yes'>  </span>It is well-known that a higher tense affects the accessibility relation of modals.<span style='mso-spacerun:yes'> </span>What is not well-known is that there are aspectual operators high enough to affect the accessibility relation of modals.<span style='mso-spacerun:yes'></span>
	{% endhighlight %}

### The solution

My solution was to write a perl script which takes care of a number of these issues. It's not foolproof and doesn't involve any voodoo—for example, it can't retypeset things which were formatted using whitespace—but it does a good job as a first pass.

<div class="files">
<div class="file">
<a href="/blog/wp-content/uploads/2009/12/cleanwordhtml.pl_.txt">cleanwordhtml.pl</a><br/>
<span class="specs">perl</span>
</div>
</div>

You can run the script by making it executable (`chmod +x cleanwordhtml.pl`) then specifying a target filename as an argument. For example, 

{% highlight bash %}
./cleanwordhtml.pl source.html > clean.html
{% endhighlight %}

I used this with a simple bash for loop to run over all my files:

{% highlight bash %}
for f in */*.html; do ./cleanwordhtml.pl $f > ${f%.html}-clean.html; done;
{% endhighlight %}

Hopefully someone else can benefit from my experience.