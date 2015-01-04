---
title: 'Testing Google&#8217;s Language Detection'
layout: post
permalink: /blog/observation/testing-googles-language-detection/
categories:
  - observation
tags:
  - Chinese
  - Chinese characters
  - code
  - computational linguistics
  - Google
  - Japanese language
  - language
  - language detection
  - linguistics
  - Mandarin
---
<img src="/static/uploads/2008/05/google-code.png" alt="google code" title="google-code" width="156" height="57" />

As [Google adds ten more languages to its machine translation service][1], it seems to be on its way to becoming the most convenient [[universal translator]] of the world&#8217;s popular languages. Google&#8217;s handling of languages of course isn&#8217;t perfect, however—in particular, I&#8217;ve been complaining to friends for a while about the weaknesses of Google&#8217;s handling of queries in Chinese character ([[Chinese characters|漢字/汉字]]) scripts. In this post, I run some tests using Google&#8217;s [Language Detection service][2] to try to better understand its handling of Chinese character queries.

### Background

Chinese characters have been used all across East Asia, most notably in Chinese, Japanese, Korean, and Vietnamese (the &#8220;CJKV&#8221;). Prescriptivist writing reforms in Communist China and Japan have simplified many characters, though. Some characters were simplified in the same way, some in different ways, and some in only one country but not the other. For more information, there&#8217;s [[Chinese character|Wikipedia]] or [Ken Lunde&#8217;s CJKV Information Processing][3].

### The problem

The issue comes up when you try to search for a word in Chinese characters which clearly came from one Chinese character-using language. From my experience, **Google doesn&#8217;t consider which language you are a user of, based on the query, and returns many results in other Chinese character-using languages as well.**[^1]

<!--more-->

Take, for example, a query like &#8220;七面鳥&#8221;, meaning &#8216;turkey&#8217; in Japanese. While all characters are very common in traditional Chinese (鳥 is simplified to 鸟 in China), the combination &#8220;七面鳥&#8221; is quite rare in Chinese. However, when you search for &#8220;七面鳥,&#8221; many of the first results are in Chinese and only two of the first ten results are in Japanese.

Does Google&#8217;s corpus not identify &#8220;七面鳥&#8221; as a primarily Japanese word? Google does indeed attest to this fact: searching for &#8220;七面鳥&#8221; and limiting to a certain language yields the following number of hits. A similar effect can be seen with Japanese words such as &#8220;芝生&#8221; (&#8216;grass&#8217;) or &#8220;泥棒&#8221; (&#8216;burglar&#8217;). The &#8220;Japanese on first page&#8221; column gives the number of results that are in Japanese which come up in a language-unspecified search from the US.

<table style="margin-left: auto; margin-right: auto;">
  <tr>
    <th>
      &nbsp;
    </th>
    
    <th>
      Chinese (simplified)
    </th>
    
    <th>
      Chinese (traditional)
    </th>
    
    <th>
      Japanese
    </th>
    
    <th>
      Japanese on<br />first page
    </th>
  </tr>
  
  <tr>
    <th>
      七面鳥
    </th>
    
    <td>
      786
    </td>
    
    <td>
      926
    </td>
    
    <td>
      395,000
    </td>
    
    <td>
      2/10
    </td>
  </tr>
  
  <tr>
    <th>
      芝生
    </th>
    
    <td>
      55,600
    </td>
    
    <td>
      216,000
    </td>
    
    <td>
      2,230,000
    </td>
    
    <td>
      0/10
    </td>
  </tr>
  
  <tr>
    <th>
      泥棒
    </th>
    
    <td>
      13,500
    </td>
    
    <td>
      22,500
    </td>
    
    <td>
      10,400,000
    </td>
    
    <td>
      3/10
    </td>
  </tr>
</table>

In a perfect world, I would like Google to **identify the language that the query is in**, and then **weigh results that are in that language higher** in the results list. So the issue comes down to one of **language detection**.

There are broadly two different approaches to language detection and, indeed, all natural language processing problems: *parsing* and *counting*. In this case, parsing involves trying to break apart the query into words and then computing how likely such a string of *words* is in each given language. Counting simply takes an inventory of the characters given and compares them to their frequencies in each language, computing how likely such a string of *characters* is in each language. Parsing is the &#8220;smarter&#8221; approach, but more difficult and computationally intensive.

Google was kind enough to give us an [language detection AJAX service][2] so we can get a sense for how their language detection works. This service also gives a &#8220;confidence&#8221; value on the detection result. For the rest of this entry, we&#8217;ll test some hypotheses against this service and conclude at the end.

### Do spaces matter?

**No.** While spaces are sometimes used in Japanese and Chinese writing to represent word boundaries, especially around numbers and roman letters, they also are seen on the web to encourage line breaks. It would make sense for Google&#8217;s language detection service to ignore spaces in Chinese character queries and that does seem to be the case. All tests I ran with Chinese character queries gave the same result with same confidence with and without spaces in random places.

### Does order matter?

**No.** This was slightly disappointing to see. I took the Japanese string &#8220;骨粗鬆症&#8221; (&#8216;osteoporosis&#8217;, if you&#8217;re curious) and ran every permutation against the language detector and got the same results, including the same confidence values. This is a clear indicator that Google uses only counting, not parsing, in their parser.

### Does repetition matter?

**Yes.** Now that it seems that Google does not use any parsing and only uses character frequencies in identifying the source language, let&#8217;s see how repetition can affect the detection service.

First, I took some Chinese character strings and ran them through the detection service with different numbers of repetitions, e.g. &#8220;参加&#8221;, &#8220;参加参加&#8221;, &#8220;参加参加参加&#8221;, &#8220;参加参加参加参加&#8221;&#8230; The queries I used were the following:

<table style="margin-left: auto; margin-right: auto;">
  <tr>
    <th>
      &nbsp;
    </th>
    
    <th>
      Chinese (traditional)
    </th>
    
    <th>
      Japanese
    </th>
    
    <th>
      Chinese (simplified)
    </th>
  </tr>
  
  <tr>
    <th>
      木
    </th>
    
    <td>
      X
    </td>
    
    <td>
      X
    </td>
    
    <td>
      X
    </td>
  </tr>
  
  <tr>
    <th>
      漢字
    </th>
    
    <td>
      X
    </td>
    
    <td>
      X
    </td>
    
    <td>
      &nbsp;
    </td>
  </tr>
  
  <tr>
    <th>
      氣
    </th>
    
    <td>
      X
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
  </tr>
  
  <tr>
    <th>
      參加
    </th>
    
    <td>
      X
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
  </tr>
  
  <tr>
    <th>
      参加
    </th>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      X
    </td>
    
    <td>
      X
    </td>
  </tr>
  
  <tr>
    <th>
      気
    </th>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      X
    </td>
    
    <td>
      &nbsp;
    </td>
  </tr>
  
  <tr>
    <th>
      气
    </th>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      &nbsp;
    </td>
    
    <td>
      X
    </td>
  </tr>
</table>

For each token type, the detection service made up its mind quite quickly. Its confidence, however, was more interesting.

<center>
  <img src="/static/uploads/2008/05/picture-7.png" alt="" title="repetition vs. confidence" />
</center>

Each of the confidence values dips sharply after three, five, or ten repetitions. Note, however, the length of the tokens which dipped at each of those points. I interpret this to mean that **there is a different parser for less than ten characters and ten or more characters.** However, the detection service did not change its answer after this point on any of the tokens.

Second, I took two characters, &#8220;簡&#8221; and &#8220;体,&#8221; and crossed different numbers of them together to see how that would affect the language detected. Note that &#8220;簡&#8221; is used in traditional Chinese and Japanese, while &#8220;体&#8221; is used in simplified Chinese and Japanese.



<table style="margin-left:auto;margin-right:auto;">
  <tr>
    <th>
      &nbsp;
    </th>
    
    <th>
      簡x0
    </th>
    
    <th>
      簡x1
    </th>
    
    <th>
      簡x2
    </th>
    
    <th>
      簡x3
    </th>
    
    <th>
      簡x4
    </th>
    
    <th>
      簡x5
    </th>
    
    <th>
      簡x6
    </th>
    
    <th>
      簡x7
    </th>
    
    <th>
      簡x8
    </th>
    
    <th>
      簡x9
    </th>
  </tr>
  
  <tr>
    <th>
      体x0
    </th>
    
    <td>
      &nbsp;
    </td>
    
    <td class='zh'>
      0.995
    </td>
    
    <td class='zh'>
      0.998
    </td>
    
    <td class='zh'>
      0.998
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
  </tr>
  
  <tr>
    <th>
      体x1
    </th>
    
    <td class='zh-Hant'>
      0.995
    </td>
    
    <td class='ja'>
      0.998
    </td>
    
    <td class='ja'>
      0.998
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
    
    <td class='zh'>
      0.999
    </td>
  </tr>
  
  <tr>
    <th>
      体x2
    </th>
    
    <td class='zh-Hant'>
      0.998
    </td>
    
    <td class='ja'>
      0.998
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='zh'>
      0.531
    </td>
  </tr>
  
  <tr>
    <th>
      体x3
    </th>
    
    <td class='zh-Hant'>
      0.998
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.52
    </td>
    
    <td class='ja'>
      0.568
    </td>
  </tr>
  
  <tr>
    <th>
      体x4
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.516
    </td>
    
    <td class='ja'>
      0.565
    </td>
    
    <td class='ja'>
      0.613
    </td>
  </tr>
  
  <tr>
    <th>
      体x5
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.512
    </td>
    
    <td class='ja'>
      0.561
    </td>
    
    <td class='ja'>
      0.609
    </td>
    
    <td class='ja'>
      0.657
    </td>
  </tr>
  
  <tr>
    <th>
      体x6
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.507
    </td>
    
    <td class='ja'>
      0.556
    </td>
    
    <td class='ja'>
      0.605
    </td>
    
    <td class='ja'>
      0.653
    </td>
    
    <td class='ja'>
      0.702
    </td>
  </tr>
  
  <tr>
    <th>
      体x7
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='ja'>
      0.999
    </td>
    
    <td class='ja'>
      0.502
    </td>
    
    <td class='ja'>
      0.551
    </td>
    
    <td class='ja'>
      0.6
    </td>
    
    <td class='ja'>
      0.649
    </td>
    
    <td class='ja'>
      0.697
    </td>
    
    <td class='ja'>
      0.746
    </td>
  </tr>
  
  <tr>
    <th>
      体x8
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='ja'>
      1
    </td>
    
    <td class='ja'>
      0.545
    </td>
    
    <td class='ja'>
      0.595
    </td>
    
    <td class='ja'>
      0.644
    </td>
    
    <td class='ja'>
      0.693
    </td>
    
    <td class='ja'>
      0.741
    </td>
    
    <td class='ja'>
      0.79
    </td>
  </tr>
  
  <tr>
    <th>
      体x9
    </th>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      0.999
    </td>
    
    <td class='zh-Hant'>
      1
    </td>
    
    <td class='ja'>
      0.539
    </td>
    
    <td class='ja'>
      0.589
    </td>
    
    <td class='ja'>
      0.638
    </td>
    
    <td class='ja'>
      0.687
    </td>
    
    <td class='ja'>
      0.736
    </td>
    
    <td class='ja'>
      0.785
    </td>
    
    <td class='ja'>
      0.834
    </td>
  </tr>
</table>

<table style="margin-left:auto;margin-right:auto;">
  <tr>
    <td class="ja">
      Japanese
    </td>
    
    <td class='zh-Hant'>
      Chinese (traditional)
    </td>
    
    <td class='zh'>
      Chinese (simplified)
    </td>
  </tr>
</table>

### Conclusion

For Chinese character-based languages, Google&#8217;s language detection algorithm uses simple counting rather than parsing, identifying languages by looking at the *frequency of characters* rather than the *frequency of words*. As such, the algorithm simply acts as a **script detector, not a language detector.** Moreover, as a simple counting method is used, duplicating characters used in one language but not another can very easily skew the resulting output.

As a trivial aside, it seems that Google&#8217;s algorithm is slightly different for strings less than ten characters, as can be seen in a dip and then rise of confidence values after ten characters.

[^1]:    
    Just to complicate matters further, there&#8217;s also the issue of where you&#8217;re accessing Google from. For example, accessing from the US (or via my friend [VPN][4]), a query for the Japanese-simplified &#8220;天気&#8221; seems to only return Japanese pages. However, accessing from Taiwan, Google assumes you may have meant the full-form &#8220;天氣&#8221;, giving you pages with both &#8220;天気&#8221; and &#8220;天氣&#8221;. As a result, Yahoo Japan weather is the first result from the US and third from Taiwan, while Yahoo Taiwan weather is first in Taiwan and doesn&#8217;t even show up from the US. This default character substitution in Taiwan is one of my least-favorite Google &#8220;features.&#8221;  
    <a rel="lightbox[google]" href='/static/uploads/2008/05/picture-1.png'><img class="images" src="/static/uploads/2008/05/picture-1-300x256.png" alt="" title="picture-1" /></a><a rel="lightbox[google]" href='/static/uploads/2008/05/picture-2.png'><img class="images" src="/static/uploads/2008/05/picture-2-300x256.png" alt="" title="picture-2" /></a>  
    Similar effects can most likely be seen between the US and China. In the rest of this post, all queries will be made from the US.

 [1]: http://googleblog.blogspot.com/2008/05/google-translate-adds-10-new-languages.html
 [2]: http://googleblog.blogspot.com/2008/03/new-google-ajax-language-api-tools-for.html
 [3]: http://books.google.com/books?id=htlttpi1KOoC
 [4]: http://support.uchicago.edu/docs/network/vpn/