---
title: Attachment Ambiguity—or—when is the gyudon cheap?
layout: post
comments: true
permalink: /blog/observation/attachment-ambiguity/
dsq_thread_id:
  - 3288215804
categories:
  - life
  - observation
tags:
  - arguments
  - attachment ambiguity
  - food
  - Japanese culture
  - Japanese language
  - linguistics
  - Mozilla Planet
  - parser
  - syntax
  - Tokyo
  - ubiquity
---
<img src="http://mitcho.com/blog/wp-content/uploads/2009/04/yoshinoya.jpg" alt="yoshinoya.jpg" border="0" width="650" height="328" />

Every day on the way to work I walk by a fine establishment known as \[[Yoshinoya]\] (吉野家), Japan&#8217;s largest *gyudon* (牛丼) chain restaurant. For those of you whose lives have yet to be graced by [[gyudon]], it&#8217;s a bowl of rice topped with beef and onions stewed in a sweet-savory soy-based sauce. Loving gyudon and being a cheapskate, I naturally noticed the recent 50 yen off gyudon promotion at Yoshinoya. The above photo is a photo of part of that sign.

Part of this sign, though, made me think about our [new Ubiquity parser][1]. In particular, it was the **attachment ambiguity** in the end date of the promotion. The text in the photo above literally is &#8220;April 15th (Wed.) 8PM until&#8221;. (Note that Japanese is a strongly head-final language, and that the &#8220;until&#8221; is a postposition.) There are two possible readings for this expression, as illustrated by the two [[principle of compositionality|composition]] trees below.

<!--more-->

<center>
  <img src="http://mitcho.com/blog/wp-content/uploads/2009/04/yoshinoya-trees.jpg" alt="yoshinoya-trees.jpg" border="0" width="658" height="157" />
</center>

The first tree, on the left, represents the reading &#8220;until (April 15th 8PM)&#8221;, while the second represents two arguments: &#8220;on April 15th&#8221; and &#8220;until 8PM&#8221;. In other words, in the first reading, the promotion begins at some earlier date and extends until April 15th at 8PM while, in the second reading, the promotion is one day only, on April 15th, until 8pm. Such syntactic ambiguities are called &#8220;attachment ambiguities&#8221; in linguistics as it is an ambiguity of where different arguments &#8220;attach&#8221; in a tree representation.

This attachment ambiguity was possible because there was no clear [marker][2] on &#8220;April 15th,&#8221; which may have disambiguated it as &#8220;on April 15th&#8221;. In fact, in many languages this time position argument comes with no case marker or preposition, or it&#8217;s optional, making parsing for them difficult. If such a sentence is entered with spaces, the [Ubiquity Parser: The Next Generation][1] would try a parse where &#8220;8PM&#8221; is the &#8220;until&#8221; or `goal` argument and &#8220;April 15th&#8221; is an `object` argument, but it will only check its noun type, not put it in [the correct semantic role][3] (`position`). Perhaps this is something to think about in the future.

These types of situations will surely come up as we continue work on the Ubiquity parser, making it essential to look at different languages. **Are there certain kinds of arguments in your language that do not have any word-external markers such as case or prepositions/postpositions?**

 [1]: http://mitcho.com/blog/projects/foxkeh-demos-ubiquity-parser-the-next-generation/
 [2]: http://mitcho.com/blog/projects/three-ways-to-argue-over-arguments/
 [3]: http://mitcho.com/blog/projects/rolling-out-the-roles/