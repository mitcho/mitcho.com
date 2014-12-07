---
title: 'Talking Ubiquity in Japan: 拡張機能勉強会にて発表'
layout: post
comments: true
permalink: /blog/projects/talking-ubiquity-in-japan-%e6%8b%a1%e5%bc%b5%e6%a9%9f%e8%83%bd%e5%8b%89%e5%bc%b7%e4%bc%9a%e3%81%ab%e3%81%a6%e7%99%ba%e8%a1%a8/
categories:
  - projects
tags:
  - Japan
  - Japanese language
  - Mozilla Planet
  - parser
  - presentation
  - talk
  - teaching
  - Tokyo
  - ubiquity
---
Yesterday I presented on Ubiquity internationalization and the [new parser design][1] at the [Mozilla Extension Development Meeting][2] (Japanese), a community event organized by some extension developers in Japan. There were a couple other Ubiquity-related &#8220;lightning talks&#8221; as well, so I&#8217;ll summarize some of the interesting ideas from those talks below.

昨日[第11回Mozilla拡張機能勉強会][2]で Ubiquity の国際化と[次世代パーサ][1]について発表してきました。色々鋭いコメントをいただき、僕も良い勉強になりました。^^ スライドの方を[slideshare][3]に載せたので、是非参考にまた見てみてください。ライトニングトークでも Ubiquity の話で盛り上がったので、そのLTの内容で特に面白いと僕が思ったものを下に英語でちょっとまとめてみます。

<div style="width:646px;text-align:left" id="__ss_1216991">
  <a style="font:14px Helvetica,Arial,Sans-serif;display:block;margin:12px 0 3px 0;text-decoration:underline;" href="http://www.slideshare.net/mitcho/mozilla-ubiquity?type=powerpoint" title="Mozilla Ubiquity の国際化と次世代パーサ">Mozilla Ubiquity の国際化と次世代パーサ</a>
</div>

<!--more-->

1.  [mar][4] of Japanese [SuMo][5] fame (not [[sumo|that sumo]]) presented on his foray into the development of an improved Japanese parser based on Jono&#8217;s. One interesting approach his parser took was to split up the input on delimiters like commas and parse each &#8220;clause&#8221; and then combining the arguments for one execution. This allows certain types of fronting constructions. For example:
    
    <pre lang='ja'>...を   送って、 dynamisに
...-NOM send, dynamis-to</pre> &#8220;To dynamis, send &#8230;&#8221; 
    
    This type of input, aside from being pretty natural in Japanese, has the advantage of offering the parser an unambiguous argument parse within each clause, cutting down on the possible ambiguities.
    
    mar&#8217;s discussion, however, also naturally touched on the limitations of [the current NLParser implementation][6], making localization of individual commands and the suggestion of verbs quite difficult.

2.  [Hitoshi SASAKI][7] of the Sasaki Lab at [[Takushoku University]] discussed some possible applications of Ubiquity in an educational context. In particular he demoed a \`hiragana\` command which takes some sentence in [[kanji]] and rewrites it in [[hiragana]], the Japanese phonetic alphabet. What&#8217;s more, the command lets you specify the appropriate grade level for the substitution, making it appropriate for elementary school kids and non-native speakers alike. Sasaki thought the ability to access this kind of functionality right from the content page was of great benefit to this application.

Thanks to [dynamis][8] for supporting my Japanese presentation and making this happen! ^^

 [1]: http://mitcho.com/blog/projects/this-week-on-ubiquity-parser-the-next-generation/
 [2]: http://wiki.mozilla.gr.jp/wiki.cgi?page=%C2%E811%B2%F3Mozilla%B3%C8%C4%A5%B5%A1%C7%BD%CA%D9%B6%AF%B2%F1
 [3]: http://www.slideshare.net/mitcho/mozilla-ubiquity?type=powerpoint
 [4]: http://blog8.fc2.com/chimantaea/
 [5]: http://support.mozilla.com/ja/
 [6]: https://wiki.mozilla.org/Labs/Ubiquity/Parser_Documentation
 [7]: http://www.takushoku-u.ac.jp/lectures/html/kyoin/e0033.html
 [8]: http://dynamis.jp