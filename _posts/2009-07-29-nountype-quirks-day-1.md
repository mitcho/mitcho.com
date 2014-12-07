---
title: 'Nountype Quirks: Day 1'
layout: post
comments: true
permalink: /blog/projects/nountype-quirks-day-1/
categories:
  - projects
tags:
  - algorithm
  - arguments
  - code
  - design
  - Mozilla Planet
  - nountypes
  - scoring
  - ubiquity
---
Today I began the process of going through all of the nountypes built-in to [Ubiquity][1] using [the principles and criteria I laid out yesterday][2]—a task I&#8217;ve had [in planning][3] for a while now. As I explained yesterday, improved suggestions and scoring from the built-in nountypes could directly translate to better and smarter suggestions, resulting in a better experience for all users. Here I&#8217;ll document some of the nountype quirks I&#8217;ve discovered so far and what remedy has been implemented or is planned.

*Note: this blog post includes a number of graphs using HTML/CSS formatting. If you are reading this article through a feed reader or planet, I invite you to read it [on my site][4].*

<!--more-->

### `noun_type_percentage`

Here&#8217;s what a few different inputs originally returned:

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td>
      20
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      20%
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      0.2
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      0.2%
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      20.0
    </td>
    
    <td>
      2000%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      2 hens in the garden
    </td>
    
    <td>
      2%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
</table>

Let me highlight a couple obvious quirks:

1.  In certain cases, where the numerical expression includes a decimal and is less than one, it is interpreted as a proportional, rather than percent, value, e.g. &#8220;0.2&#8221; → &#8220;20%&#8221;. &#8220;0.2%&#8221; is not even an option. This is the case even when explicitly adding a % sign.
2.  All suggestions, including those where the numeral was extracted from a long string of text (e.g. &#8220;2 hens in the garden&#8221;), get the same score of 1.

I just [committed a fix][5] so `noun_type_percentage` now&#8230;

1.  Counts the number of characters in the input which match `[\d.%]` and caps the score by (number of acceptable characters)/(length of input).
2.  Strings which do not include &#8220;%&#8221; get a 10% penalty.
3.  In the case of decimals less than 1 without a % sign, the proportion interpretation is also suggested (e.g. &#8220;0.2&#8221; → &#8220;20%&#8221;) in addition to the original suggestion (&#8220;0.2%&#8221;), but with a slight penalty.

Here is what they now return:

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td>
      20
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
  
  <tr>
    <td>
      20%
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      0.2
    </td>
    
    <td>
      0.2%
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
  
  <tr>
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:405px'></span> 0.81
    </td>
  </tr>
  
  <tr>
    <td>
      0.2%
    </td>
    
    <td>
      0.2%
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      20.0
    </td>
    
    <td>
      20%
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
  
  <tr>
    <td>
      2 hens in the garden
    </td>
    
    <td>
      2%
    </td>
    
    <td>
      <span class='scorebar' style='width:25px'></span> 0.05
    </td>
  </tr>
</table>

### `noun_type_tag`

Here&#8217;s what a few different inputs originally returned. Keep in mind that currently in this test profile, the preexisting tags are &#8220;animal&#8221;, &#8220;help&#8221;, &#8220;test&#8221;, and &#8220;ubiquity&#8221;.

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td>
      animal
    </td>
    
    <td>
      animal
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td>
      mineral
    </td>
    
    <td>
      mineral
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      anim
    </td>
    
    <td>
      animal
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      anim
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      help, test, ubiq
    </td>
    
    <td>
      help,test,ubiquity
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      help,test,ubiq
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      google, yahoo, ubiq
    </td>
    
    <td>
      google,yahoo,ubiquity
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      google,yahoo,ubiq
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td>
      google, , yahoo
    </td>
    
    <td>
      google,yahoo
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
</table>

Here are a few of `noun_type_tag`&#8217;s quirks:

1.  There are only two scores ever given out: 0.3 and 0.7.
2.  Only the last tag in the list and whether it exists or not is taken into account.
3.  When the last tag is incomplete, the completion is suggested with a higher score, but if the last tag is *exactly* equal to an existing tag, it gets the lower score.

Ideally, we want `noun_type_tag` to look at each of the tags given to it, with higher scores for when there are more preexisting tags and fewer new ones. Keep in mind, though, that we only have to suggest the completion of the very last tag as that may be one where the user hasn&#8217;t completed typing yet&#8230; for earlier tags, we can assume (safely or not) that the user placed the comma where they meant to. We can&#8217;t teach Ubiquity to read minds, after all.[^1]

With this in mind, I [just made a change][6] to `noun_type_tag` which aims to follow these principles. The basic idea is that we start with a base score of 0.3 but then raise it via [[nth root|*n*th root]] for every tag in the sequence which is preexisting. Here&#8217;s what the same inputs return now. Recall that the preexisting tags are &#8220;animal&#8221;, &#8220;help&#8221;, &#8220;test&#8221;, and &#8220;ubiquity&#8221;.

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td>
      animal
    </td>
    
    <td>
      animal
    </td>
    
    <td>
      <span class='scorebar' style='width:275px'></span> 0.55
    </td>
  </tr>
  
  <tr>
    <td>
      mineral
    </td>
    
    <td>
      mineral
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      anim
    </td>
    
    <td>
      animal
    </td>
    
    <td>
      <span class='scorebar' style='width:275px'></span> 0.55
    </td>
  </tr>
  
  <tr>
    <td>
      anim
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      help, test, ubiq
    </td>
    
    <td>
      help,test,ubiquity
    </td>
    
    <td>
      <span class='scorebar' style='width:430px'></span> 0.86
    </td>
  </tr>
  
  <tr>
    <td>
      help,test,ubiq
    </td>
    
    <td>
      <span class='scorebar' style='width:370px'></span> 0.74
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      google, yahoo, ubiq
    </td>
    
    <td>
      google,yahoo,ubiquity
    </td>
    
    <td>
      <span class='scorebar' style='width:275px'></span> 0.55
    </td>
  </tr>
  
  <tr>
    <td>
      google,yahoo,ubiq
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td>
      google, , yahoo
    </td>
    
    <td>
      google,yahoo
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
</table>

### `noun_type_awesomebar`

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td rowspan='4'>
      moz
    </td>
    
    <td class="sugg">
      http://www.mozilla.com/
    </td>
    
    <td class="score">
      <span style="width: 400px;" class="scorebar">&nbsp;</span> 0.8
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      https://wiki.mozilla.org/Labs/Ubiquity/ Parser_2_API_Conversion_Tutorial
    </td>
    
    <td class="score">
      <span style="width: 400px;" class="scorebar">&nbsp;</span> 0.8
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.start3.mozilla.com/ firefox?client=firefox-a&#038;rls= org.mozilla:en-US:official
    </td>
    
    <td class="score">
      <span style="width: 400px;" class="scorebar">&nbsp;</span> 0.8
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.www.mozilla.com/en-US/firefox/about/
    </td>
    
    <td class="score">
      <span style="width: 400px;" class="scorebar">&nbsp;</span> 0.8
    </td>
  </tr>
</table>

There are a couple quirks here:

1.  All suggestions are returned with the same scores.
2.  The nountype returns the URL of the entry as the HTML-formatted result and the title as the text-formatted result, which clearly does not make sense. However, it&#8217;s not clear to me whether the title, URL, or some combination of both is what we should be returning as the suggestion text presented to the user.[^2]

I [just rewrote `noun_type_awesomebar`][7] to actually do some differential scoring. This new version also presents the URL or title depending on whichever had a better match using the `matchScore` function.[^3]

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td rowspan='4'>
      moz
    </td>
    
    <td class="sugg">
      www.mozilla.com
    </td>
    
    <td class="score">
      <span style="width: 350px;" class="scorebar">&nbsp;</span> 0.7
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      https://wiki.mozilla.org/Labs/Ubiquity/ Parser_2_API_Conversion_Tutorial
    </td>
    
    <td class="score">
      <span style="width: 315px;" class="scorebar">&nbsp;</span> 0.63
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.start3.mozilla.com/ firefox?client=firefox-a&#038;rls= org.mozilla:en-US:official
    </td>
    
    <td class="score">
      <span style="width: 305px;" class="scorebar">&nbsp;</span> 0.61
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.www.mozilla.com/en-US/firefox/about/
    </td>
    
    <td class="score">
      <span style="width: 300px;" class="scorebar">&nbsp;</span> 0.6
    </td>
  </tr>
</table>

### `noun_type_url`

The purpose of `noun_type_url`&#8217;s suggest function is two-fold: first, to accept strings which may look like a URL and, second, to suggest URL&#8217;s from the history just like `noun_type_url`, but only based on URL matches and not title matches.[^4] Here are a few sample inputs:

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td rowspan='5'>
      moz
    </td>
    
    <td class="sugg">
      http://www.mozilla.com/
    </td>
    
    <td class="score">
      <span style="width: 450px;" class="scorebar">&nbsp;</span> 0.9
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://moz
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      https://wiki.mozilla.org/Labs/Ubiquity/ Parser_2_API_Conversion_Tutorial
    </td>
    
    <td class="score">
      <span style="width: 450px;" class="scorebar">&nbsp;</span> 0.9
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.start3.mozilla.com/ firefox?client=firefox-a&#038;rls= org.mozilla:en-US:official
    </td>
    
    <td class="score">
      <span style="width: 450px;" class="scorebar">&nbsp;</span> 0.9
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.www.mozilla.com/en-US/firefox/about/
    </td>
    
    <td class="score">
      <span style="width: 450px;" class="scorebar">&nbsp;</span> 0.9
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      test
    </td>
    
    <td class="sugg">
      http://test
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      http://
    </td>
    
    <td class="sugg">
      http://
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      http:
    </td>
    
    <td class="sugg">
      http:
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      http
    </td>
    
    <td class="sugg">
      http
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      _test
    </td>
    
    <td class="sugg">
      http://_test
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      hello world!
    </td>
    
    <td class="sugg">
      http://hello world!
    </td>
    
    <td class="score">
      <span style="width: 250px;" class="scorebar">&nbsp;</span> 0.5
    </td>
  </tr>
</table>

Oh, where to begin!? Here are some initial quirks&#8230; it&#8217;s possible that you could think of more!

1.  There is no differential scoring&#8230; only 0.9 for suggestions from history and 0.5 for URL-like strings.
2.  A number of invalid domain names are being accepted and turned into suggestions (&#8220;hello world!&#8221;, &#8220;_test&#8221;, etc.).
3.  It&#8217;s trying to be smart by suggesting &#8220;http://&#8221; as a default [[URI scheme]] but doing so even for prefixes (initial substrings) of the word &#8220;http&#8221; itself.

With these thoughts in mind, I [just took a first stab][8] at improving this situation. Here are some features of the new implementation:

1.  History entries are scored in the same way as in `noun_type_awesomebar`, using `matchScore`.
2.  URLs without an explicit \[[URI scheme]\] (like &#8220;http://&#8221;) get a 10% penalty.
3.  &#8220;http://&#8221; is only suggested if one of a long list of common URI schemes are not detected.
4.  It repairs schemes which are missing a slash or two, suggesting for example &#8220;http:hello.com&#8221; → &#8220;http://hello.com&#8221;.
5.  It actually uses Firefox&#8217;s own [IDNService][9] to check if the domain name is a valid [[internationalized domain name]]. If it&#8217;s an IDN as opposed to LDH (&#8220;letters, digits, and hyphens&#8221;), it gets a 10% penalty. If it&#8217;s not even a valid IDN, it is ruled out (see last two example inputs below).
6.  There are also penalties for only being a domain name with no path and for the domain not having any periods (.) in it.

Here is what our suggestions now look like:

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="500" height="30" />
    </th>
  </tr>
  
  <tr>
    <td rowspan='5'>
      moz
    </td>
    
    <td class="sugg">
      http://www.mozilla.com/
    </td>
    
    <td class="score">
      <span style="width: 300px;" class="scorebar">&nbsp;</span> 0.6
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://moz
    </td>
    
    <td class="score">
      <span style="width: 325px;" class="scorebar">&nbsp;</span> 0.65
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      https://wiki.mozilla.org/Labs/Ubiquity/ Parser_2_API_Conversion_Tutorial
    </td>
    
    <td class="score">
      <span style="width: 315px;" class="scorebar">&nbsp;</span> 0.63
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.start3.mozilla.com/ firefox?client=firefox-a&#038;rls= org.mozilla:en-US:official
    </td>
    
    <td class="score">
      <span style="width: 305px;" class="scorebar">&nbsp;</span> 0.61
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://en-us.www.mozilla.com/en-US/firefox/about/
    </td>
    
    <td class="score">
      <span style="width: 300px;" class="scorebar">&nbsp;</span> 0.6
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      test
    </td>
    
    <td class="sugg">
      http://test
    </td>
    
    <td class="score">
      <span style="width: 325px;" class="scorebar">&nbsp;</span> 0.65
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      http://
    </td>
    
    <td class="sugg">
      http://
    </td>
    
    <td class="score">
      <span style="width: 500px;" class="scorebar">&nbsp;</span> 1
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      shttp://
    </td>
    
    <td class="score">
      <span style="width: 375px;" class="scorebar">&nbsp;</span> 0.75
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      http:
    </td>
    
    <td class="sugg">
      http://
    </td>
    
    <td class="score">
      <span style="width: 450px;" class="scorebar">&nbsp;</span> 0.9
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      shttp://
    </td>
    
    <td class="score">
      <span style="width: 350px;" class="scorebar">&nbsp;</span> 0.7
    </td>
  </tr>
  
  <tr>
    <td rowspan='4'>
      http
    </td>
    
    <td class="sugg">
      http://
    </td>
    
    <td class="score">
      <span style="width: 360px;" class="scorebar">&nbsp;</span> 0.72
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      https://
    </td>
    
    <td class="score">
      <span style="width: 355px;" class="scorebar">&nbsp;</span> 0.71
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      shttp://
    </td>
    
    <td class="score">
      <span style="width: 340px;" class="scorebar">&nbsp;</span> 0.68
    </td>
  </tr>
  
  <tr>
    <td class="sugg">
      http://http
    </td>
    
    <td class="score">
      <span style="width: 325px;" class="scorebar">&nbsp;</span> 0.65
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      _test
    </td>
    
    <td class="sugg">
      <i>none</i>
    </td>
    
    <td class="score">
      &nbsp;
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      hello world!
    </td>
    
    <td class="sugg">
      <i>none</i>
    </td>
    
    <td class="score">
      &nbsp;
    </td>
  </tr>
</table>

### See you tomorrow~

Alright, enough nountype wrangling for one day. I&#8217;ll be back again tomorrow for another installment.

[^1]:    
    If we could make assumptions about what tags look like, for example that they are always pretty short, or use certain character classes, we could use such factors as well to judge non-preexisting tags for &#8220;tagginess&#8221; but unfortunately it&#8217;s possible (though unlikely) that a user would prefer really long tag strings and of course Firefox allows tags in any unicode code range. The only strings we can immediately rule out as impossible are ones which are purely whitespace.

[^2]:    
    It&#8217;s actually unclear whether the method we&#8217;re using ([`nsIAutoCompleteSearch`][10]) is actually searching titles or not&#8230; it currently looks like it&#8217;s only looking at the URL&#8217;s. Perhaps the title query is what we&#8217;re supposed to enter in [the mystery parameter][11].

[^3]:    
    I hope to discuss the `matchScore` function in a separate blog post later.

[^4]:    
    While writing up this section I ran into a bug whereby when both `noun_type_awesomebar` and `noun_type_url` are active, only one of their async callbacks from `Utils.history.search` are returned. Thus, if lucky, only one of the nountypes will return the history results and if unlucky the parse query will not complete. Filed as [trac #845][12].

 [1]: http://ubiquity.mozilla.com
 [2]: http://mitcho.com/blog/projects/judging-noun-types/
 [3]: http://ubiquity.mozilla.com/trac/ticket/746
 [4]: http://mitcho.com/blog/projects/nountype-quirks-day-1/
 [5]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/c3cd4af0f06a
 [6]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/54e6a232ec3a
 [7]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/cb98c72364db
 [8]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/26f179661107
 [9]: https://developer.mozilla.org/en/nsIIDNService
 [10]: https://developer.mozilla.org/en/nsIAutoCompleteSearch
 [11]: https://bugzilla.mozilla.org/show_bug.cgi?id=507315
 [12]: http://ubiquity.mozilla.com/trac/ticket/845