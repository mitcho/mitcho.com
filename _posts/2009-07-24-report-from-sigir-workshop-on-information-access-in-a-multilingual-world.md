---
title: Report from SIGIR Workshop on Information Access in a Multilingual World
layout: post
comments: true
permalink: /blog/projects/report-from-sigir-workshop-on-information-access-in-a-multilingual-world/
categories:
  - projects
tags:
  - information access
  - linguistics
  - Mozilla Planet
  - paper
  - presentation
  - SIGIR
  - ubiquity
  - workshop
---
Yesterday I participated in and presented at [a workshop on Information Access in a Multilingual World][1] at [ACM SIGIR][2] in Boston. The focus of the workshop was on \[[cross-language information retrieval]\] (CLIR). Cross-language information retrieval systems enable users to retrieve relevant information across different languages for a certain task or query. Even if you have a budget to translate some documents from a foreign language to your language, how do you find the relevant documents to translate in the first place if you don&#8217;t speak (or read) that source language? This is the type of problem that CLIR aims to solve.

<!--more-->

The keynote speaker was [Ralf Steinberger][3] of the [European Commission&#8217;s Joint Research Centre][4], presenting the [European Media Monitor][5] family of applications. EMM is a suite of different applications all based on a core platform which aggregates news stories from a variety of sources around the world in a few dozen different languages. The system uses various CLIR techniques to then cluster stories by event, regardless of language or source country. Large news agencies and organizations, as well as the European Commission itself, use the system to track upcoming news stories as well as health concerns. In the European Union which has over a dozen different &#8220;official&#8221; languages, there is a great need for this type of service. The applications are available to the public so I invite you to play around with them [at the EMM site][5].[^1]

The workshop&#8217;s paper presentations were quite diverse and all interesting. [Elena Filatova][6] presented an interesting approach to measuring the &#8220;trustworthiness&#8221; of statements in Wikipedia entries, by comparing the overlap in content statements between different language entries (more overlap => more trustworthy) which can be used to create [[inverted pyramid]] summaries. Perspectives from different use cases were also examined through presentations on news analysts and health organizations, patent searches, and medical information for personal use, as well as discussion of the need for CLIR for historical and religious texts.

One interesting thread throughout the day&#8217;s sessions was the issue of loanword processes and the possible use of romanization as an interlingua. Cross-language [[named entity recognition]] is a major problem in CLIR. Many novel words and names (common in news articles) go through processes of loanword adaptation and transliteration and are hard to identify and also are not in the systems&#8217; dictionaries. A few of the talks touched on these problems, including a great talk by Kashif Riaz of [the U of M][7] on the salient (and great) differences between Hindi and Urdu. [Frederic Gey][8] described a number of different approaches to comparing strings via a romanization interlingua.

Another interesting thread was the idea of the target user. The needs of CLIR applications can vary greatly depending on its use case and the users&#8217; savvy. The needs of a patent search office, where many professional searchers are already multilingual, is clearly different from the needs of an executive hoping to stay on top of the world news related to their organization. It was brought up, however, that in this age of open data and API&#8217;s, if a CLIR resource provides a good API, it need not necessarily supply the perfect interface for every type of user, as different third parties could also develop such targeted interfaces.

While most of the presentations and research interests in the room were on users accessing resources in various languages, I presented on [Ubiquity][9]. The talk was intended to highlight the idea that the opposite problem of users with different languages getting at the same kinds of information and getting equally powerful user experiences is also a different but worthwhile problem. Below are the slides from this talk. As a web archive of all the papers will be set up soon, I believe it&#8217;s safe to put up my paper as well, so please check it out. It&#8217;s a good short (four pages) overview of the innovative approaches we&#8217;ve taken to build a localizable natural language interface.

<div style="width:650px;text-align:left" id="__ss_1766079">
  <a style="font:14px Helvetica,Arial,Sans-serif;display:block;margin:12px 0 3px 0;text-decoration:underline;" href="http://www.slideshare.net/mitcho/ubiquity-designing-a-multilingual-natural-language-interface" title="Ubiquity: Designing a Multilingual Natural Language Interface">Ubiquity: Designing a Multilingual Natural Language Interface</a>
</div>

<div class="files">
  <div class="file pdf">
    <a href='http://mitcho.com/academic/erlewine-sigir.pdf'>&#8220;Ubiquity: Designing a Multilingual Natural Language Interface.&#8221;</a> Presented at <a href='http://www.sics.se/events/clir2009'>SIGIR Workshop on Information Access in a Multilingual World</a>, Boston, July 2009. <i>To appear in a proceedings.</i></li> <span class="specs">240&#160;kb - pdf</span>
  </div>
</div>

[^1]:    
    Unfortunately, there is no public API available for these resources. We asked. :)

 [1]: http://www.sics.se/events/clir2009
 [2]: http://sigir2009.org/
 [3]: http://www.linkedin.com/in/ralfsteinberger
 [4]: http://www.jrc.ec.europa.eu/
 [5]: http://emm.jrc.it/overview.html
 [6]: http://storm.cis.fordham.edu/~filatova/
 [7]: http://www.umn.edu
 [8]: http://ucdata.berkeley.edu/gey.html
 [9]: http://ubiquity.mozilla.com