---
title: 'Nountype Quirks: Day 2'
layout: post
comments: true
permalink: /blog/projects/nountype-quirks-day-2/
categories:
  - projects
tags:
  - algorithm
  - arguments
  - code
  - design
  - localization
  - Mozilla Planet
  - nountypes
  - scoring
  - ubiquity
---
Today I&#8217;m continuing the process of reviewing and tweaking all of the nountypes built-in to [Ubiquity][1]. For a more respectable introduction to this endeavor, please read my blog post from a couple days ago, [Judging Noun Types][2] and my status update from yesterday, [Nountype Quirks: Day 1][3].

*Note: this blog post includes a number of graphs using HTML/CSS formatting. If you are reading this article through a feed reader or planet, I invite you to read it [on my site][4].*

<!--more-->

### `noun_type_twitter_user`

Let&#8217;s begin again by considering the suggestions and scores that a variety of different inputs to this nountype return and see what quirks we find.

To test this nountype, I made sure I had logged into [Twitter][5] once with the login [`mitchoyoshitaka`][6].

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
    <td rowspan='2'>
      mitcho
    </td>
    
    <td>
      mitchoyoshitaka
    </td>
    
    <td>
      <span class='scorebar' style='width:425px'></span> 0.85
    </td>
  </tr>
  
  <tr>
    <td>
      mitcho
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      mitchoyoshi
    </td>
    
    <td>
      mitchoyoshitaka
    </td>
    
    <td>
      <span class='scorebar' style='width:470px'></span> 0.94
    </td>
  </tr>
  
  <tr>
    <td>
      mitcho
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td>
      test
    </td>
    
    <td>
      test
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td>
      テスト
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      hello world
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      @test
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
</table>

[As nountypes go][3], this is looking pretty good. For usernames which look like logins we&#8217;ve saved before, we&#8217;re using `matchScore` to get decent differential scores.[^1] It&#8217;s even ruling out impossible twitter username strings, according to Twitter&#8217;s own restriction:

<img src="http://mitcho.com/blog/wp-content/uploads/2009/07/twitter-usernames.png" alt="twitter-usernames.png" border="0" width="574" height="75" />

One possible improvement we could make is to let @ strings be accepted. I [went ahead and made this improvement][7]. The initial @ will be stripped off and then will be checked as normal, but the final score will receive a slight boost using an [[nth_root|*n*th root]] formula. The `twitter` command was also updated to deal with inputs with and without the initial @.

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
    <td rowspan='2'>
      mitcho
    </td>
    
    <td>
      mitchoyoshitaka
    </td>
    
    <td>
      <span class='scorebar' style='width:425px'></span> 0.85
    </td>
  </tr>
  
  <tr>
    <td>
      mitcho
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='2'>
      @mitcho
    </td>
    
    <td>
      @mitchoyoshitaka
    </td>
    
    <td>
      <span class='scorebar' style='width:440px'></span> 0.88
    </td>
  </tr>
  
  <tr>
    <td>
      @mitcho
    </td>
    
    <td>
      <span class='scorebar' style='width:285px'></span> 0.57
    </td>
  </tr>
  
  <tr>
    <td>
      test
    </td>
    
    <td>
      test
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td>
      @test
    </td>
    
    <td>
      @test
    </td>
    
    <td>
      <span class='scorebar' style='width:285px'></span> 0.57
    </td>
  </tr>
</table>

Although the `noun_type_twitter_user` nountype is currently most used by the built-in `twitter` command to specify the user&#8217;s username, in theory it could also be used for example in a command which pulls up another user&#8217;s tweets. With that in mind, perhaps in the future we could check the browser history and/or bookmarks for entries of the form `http://twitter.com/...` and suggest those as well ([trac #846][8]).

### `noun_type_number`

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
    <td rowspan='1'>
      text
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      0.5
    </td>
    
    <td>
      0.5
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      0.5.1
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
</table>

This nountype has an incredibly simple job and does it with ease. I&#8217;m going to leave it alone.

### `noun_type_date` and `noun_type_time`

`noun_type_date` and `noun_type_time` both use the magical [Date.parse][9] method to parse date- and time-like strings. Let&#8217;s first take a look at some of its suggestions:

<table style='border:0' class='scoretable'>
  <tr>
    <th>
      input
    </th>
    
    <th>
      <code>date</code> suggestion
    </th>
    
    <th>
      <code>time</code> suggestion
    </th>
    
    <th>
      <img src="http://mitcho.com/blog/wp-content/uploads/2009/07/tuner-top.png" alt="tuner-top.png" border="0" width="250" height="15" />
    </th>
  </tr>
  
  <tr>
    <td rowspan='1'>
      June 8th 5pm
    </td>
    
    <td>
      2009-06-08
    </td>
    
    <td>
      05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      5pm
    </td>
    
    <td>
      2009-07-30
    </td>
    
    <td>
      05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      5
    </td>
    
    <td>
      2009-07-05
    </td>
    
    <td>
      12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      June 8th
    </td>
    
    <td>
      2009-06-08
    </td>
    
    <td>
      12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      today
    </td>
    
    <td>
      2009-07-30
    </td>
    
    <td>
      12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      now
    </td>
    
    <td>
      2009-07-30
    </td>
    
    <td>
      02:40 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      5pm is a good time
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
</table>

The quirks in these outputs can be summed up into these two factors:

1.  There is no differential scoring at all.
2.  Both nountypes parse the input with [Date.parse][9] and then just spit out the date or time components of the result. Thus time-only inputs get the default date and date-only inputs get the default time with equal scores.

I just rewrote both nountypes and also added a new `noun_type_date_time`. Here are some of the features of the new implementation:

1.  If the input only contains digits and spaces, it is marked down.
2.  With the exception of the outputs &#8216;today&#8217; and &#8216;now&#8217;, if the resulting `Date` object&#8217;s date is today, its date suggestion is scored lower; equivalently for time being the default value, &#8220;12:00 AM&#8221;.
3.  Scores (with the exception of &#8216;today&#8217; and &#8216;now&#8217;) which are shorter than the output string get a slight penalty. This factor reflects the intuition that a longer output than input means some generic information was added and thus there is less confidence in the output.

Here&#8217;s what some of the inputs give now:

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
    <td rowspan='3'>
      June 8th 5pm
    </td>
    
    <td>
      <code>date</code>: 2009-06-08
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-06-08&#160;05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:430px'></span> 0.86
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      5pm
    </td>
    
    <td>
      <code>date</code>: 2009-07-30
    </td>
    
    <td>
      <span class='scorebar' style='width:135px'></span> 0.27
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:405px'></span> 0.81
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-07-30&#160;05:00 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:245px'></span> 0.49
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      5
    </td>
    
    <td>
      <code>date</code>: 2009-07-05
    </td>
    
    <td>
      <span class='scorebar' style='width:265px'></span> 0.53
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:95px'></span> 0.19
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-07-05&#160;12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:170px'></span> 0.34
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      June 8th
    </td>
    
    <td>
      <code>date</code>: 2009-06-08
    </td>
    
    <td>
      <span class='scorebar' style='width:475px'></span> 0.95
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:175px'></span> 0.35
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-06-08&#160;12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:170px'></span> 0.58
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      today
    </td>
    
    <td>
      <code>date</code>: 2009-07-30
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:225px'></span> 0.45
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-06-08&#160;12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td rowspan='3'>
      now
    </td>
    
    <td>
      <code>date</code>: 2009-07-30
    </td>
    
    <td>
      <span class='scorebar' style='width:350px'></span> 0.7
    </td>
  </tr>
  
  <tr>
    <td>
      <code>time</code>: 12:00 AM
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td>
      <code>date_time</code>: 2009-06-08&#160;04:34 PM
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
</table>

In addition, looking to the future we&#8217;d [like to make nountypes localizable][10] as well, and these two nountypes in particular will surely require some good thinking and planning to make localizable.

### `noun_type_email` and `noun_type_contact`

`noun_type_email` and `noun_type_contact` are two closely related nountypes. `noun_type_email` simply validates email address-looking strings, while `noun_type_contact` will return the `noun_type_email` suggestions and additionally return contacts from GMail if available.

The first thing to note is that I&#8217;ve often found the GMail contact lookup to be finicky in my own use. Reading through the code, I discovered the solution: GMail must either be open in a tab or you must use the &#8220;stay signed in&#8221; option and close the GMail tab.[^2] With this mystery solved, and [some code cleanup done to this contact fetching][11], let&#8217;s take a look at some example suggestions: (suggestions overlapping with `noun_type_email` are not listed here)

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
    <td rowspan='1'>
      aza@m
    </td>
    
    <td>
      aza@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:210px'></span> 0.42
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      jono
    </td>
    
    <td>
      jdicarlo@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:140px'></span> 0.28
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      jdicarlo
    </td>
    
    <td>
      jdicarlo@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:95px'></span> 0.19
    </td>
  </tr>
</table>

In general, we see that these scores all look pretty poor. In particular, though, note that the &#8220;jono&#8221; input yielded a higher score for the same suggestion than &#8220;jdicarlo&#8221;, even though &#8220;jdicarlo&#8221; is longer and thus, intuitively, has more informational content and should maybe do better. Digging into the code I realized why this is. It was computing the scores by comparing &#8220;jono&#8221; and &#8220;jdicarlo&#8221; not simply to &#8220;Jono DiCarlo&#8221; and &#8220;jdicarlo@mozilla.com&#8221; respectively, but to the combined string &#8220;Jono DiCarlo <jdicarlo@mozilla.com>&#8221;. Now with [this change][12] in place, both the email address and name are analyzed individually and, due to the way nountype detection works in Parser 2, no duplicates are returned. Here are the updated results:

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
    <td rowspan='1'>
      jono
    </td>
    
    <td>
      jdicarlo@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:415px'></span> 0.83
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      jdicarlo
    </td>
    
    <td>
      jdicarlo@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:425px'></span> 0.85
    </td>
  </tr>
</table>

That&#8217;s much better!

Now let&#8217;s consider the suggestions from `noun_type_email`. Here are what they originally looked like:

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
    <td rowspan='1'>
      bpung
    </td>
    
    <td>
      <i>none</i>
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      bpung@m
    </td>
    
    <td>
      bpung@m
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      bpung@mozilla.com
    </td>
    
    <td>
      bpung@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
</table>

`noun_type_email` is based on [a very robust regular expression][13] for [RFC 2822][14]. Unfortunately this means that it completely rules out strings such as &#8220;bpung&#8221; which could be a proper prefix of an email address—something that I&#8217;ve advocated for avoiding before (see footnote 2 of [Judging Noun Types][2]). Moreover, due to a quirk of how nountypes based on regular expressions are scored, all results are given the score of 1.

I [just committed a change][15] so that this behavior is improved. The new version accepts strings which match the username part of the email address spec sans @ and domain, but with a great score penalty.[^3] Moreover, domains which do not have a final label (the [[top level domain]]) with more than one letter (unless it&#8217;s an IP address) or do not have any periods (.) in the domain will be penalized as well. Here&#8217;s what the same inputs produce now:

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
    <td rowspan='1'>
      bpung
    </td>
    
    <td>
      bpung
    </td>
    
    <td>
      <span class='scorebar' style='width:150px'></span> 0.3
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      bpung@m
    </td>
    
    <td>
      bpung@m
    </td>
    
    <td>
      <span class='scorebar' style='width:400px'></span> 0.8
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      bpung@mozilla.com
    </td>
    
    <td>
      bpung@mozilla.com
    </td>
    
    <td>
      <span class='scorebar' style='width:500px'></span> 1
    </td>
  </tr>
</table>

### Same time, same channel

I hope this post sheds light on the many changes I made together as well as the underlying thought process. If you don&#8217;t agree with any particular fix or analysis, please comment! I&#8217;ll be back again tomorrow with another installment of Nountype Quirks. Stay tuned!

[^1]:    
    Again, `matchScore` will be the subject of another blog post in the near future.

[^2]:    
    Moreover, due to the way `noun_type_contact` caches the contact list internally, as long as GMail&#8217;s contacts are available once, you should be able to continue accessing those contacts&#8217; suggestions after logging out of GMail. There are also great performance benefits to this caching. The downside is that we currently have no way to know when to clear the cache, so even if you update your contacts in GMail, those new contacts won&#8217;t appear in Ubiquity until you restart Firefox.

[^3]:    
    Perhaps this is a horrible idea, because if executed or previewed, any verb which uses these nountypes would have to deal with arguments which are not valid email addresses. In my mind, though, as long as it doesn&#8217;t actually cause any error, this should be okay. Keep in mind that, given the very low scores given to these suggestions, parses using it would most likely only show up if the verb which requires these nountypes was explicitly given and there are other arguments as well, for example in input like &#8220;email hello to bpung&#8221;. In such a situation, we would rather this suggestion not disappear until we type &#8220;@m&#8221;. If executed, the built-in email verb, for instance, will deal with this gracefully by simply putting the incomplete email address in the To field.

 [1]: http://ubiquity.mozilla.com
 [2]: http://mitcho.com/blog/projects/judging-noun-types/
 [3]: http://mitcho.com/blog/projects/nountype-quirks-day-1/
 [4]: http://mitcho.com/blog/projects/nountype-quirks-day-2/
 [5]: http://twitter.com
 [6]: http://twitter.com/mitchoyoshitaka/
 [7]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/97871e3a453c
 [8]: http://ubiquity.mozilla.com/trac/ticket/846
 [9]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/parse
 [10]: http://mitcho.com/blog/projects/ubiquity-localization-whats-new-whats-next/
 [11]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/8478c7103753
 [12]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/0877848192f2
 [13]: http://blog.livedoor.jp/dankogai/archives/51190099.html
 [14]: http://www.ietf.org/rfc/rfc2822.txt
 [15]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/0d1803104c7d