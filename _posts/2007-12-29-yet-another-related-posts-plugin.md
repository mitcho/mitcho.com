---
title: Yet Another Related Posts Plugin
layout: post
comments: true
permalink: /blog/projects/yet-another-related-posts-plugin/
dsq_thread_id:
  - 3288214973
categories:
  - metablog
  - projects
tags:
  - algorithm
  - code
  - PHP
  - plugin
  - threshold
  - WordPress
  - WordPress Planet
  - YARPP
---

{:.warning}
This posting is now outdated&#8230; for the latest information on YARPP, please visit [YARPP&#8217;s very own page][1] on my site, or [its page on `wordpress.org`][2]. If you have questions, please submit on [the `wordpress.org` forum][3]. Thanks!

### Description

Today I&#8217;m releasing Yet Another Related Posts Plugin (YARPP[^1]) 1.0 for [WordPress][4]. It&#8217;s the result of some tinkering with [Peter Bowyer&#8217;s version][5] of [Alexander Malov & Mike Lu&#8217;s Related Entries plugin][6]. Modifications made include:

1.  *Limiting by a threshold*: Peter Bowyer did the great work of making the algorithm use [[mysql]]&#8217;s [fulltext search][7] score to identify related posts. But it currently just displayed, for example, the top 5 most &#8220;relevant&#8221; entries, even if some of them weren&#8217;t at all similar. Now you can set a threshold limit[^2] for relevance, and you get more related posts if there are more related posts and less if there are less. Ha!
2.  *Being a better plugin citizen*: now it doesn&#8217;t require the user to click some sketchy button to `alter` the database and enable a `fulltext key`. Using [`register_activation_hook`][8], it does it automagically on plugin activation. Just install and go!
3.  *Miscellany*: a nicer options screen, displaying the fulltext match score on output for admins, an option to allow related posts from the future, a couple bug fixes, etc.

### Installation

Just put it in your `/wp-content/plugins/` directory, activate, and then drop the `related_posts` function in your [WP loop][9]. Change any options in the Related Posts (YARPP) Options pane in Admin > Plugins.

You can override any options in an individual instance of `related_posts` using the following syntax:

{% highlight php startinline %}
related_posts(limit, threshold, before title, after title, show excerpt, len, before excerpt, after excerpt, show pass posts, past only, show score);
{% endhighlight %}

Most of these should be self-explanatory. They&#8217;re also in the same order as the options on the YARPP Options pane.

Example: `related_posts(10, null, 'title: ')` changes the maximum related posts number to 10, keeps the default threshold from the Options pane, and adds `title:` to the beginning of every title.

There&#8217;s also a `related_posts_exist()` function. It has three optional arguments to override the defaults: a threshold, the past only boolean, and the show password-protected posts boolean.

### Examples

For a barebones setup, just drop `<?php related_posts(); ?>` right after `<?php the_content() ?>`.

On my own blog I use the following code with `<li>` and `</li>` as the before/after entry options:

{% highlight php %}
<?php if (related_posts_exist()): ?>
Related posts:
<ol>
  <?php related_posts(); ?>
</ol>
<?php else: ?>
<p>No related posts.</p>
<?php endif; ?>
{% endhighlight %}

### Coming soon (probably)

* Incorporation of tags and categories in the algorithm. I&#8217;ve gotten the code working, but I still need to think about what the most natural algorithm would be for weighing these factors against the mysql fulltext score currently used (and works pretty well, I must say).
* Um, something else! Let me know if you have any suggestions for improvement. ^^

[^1]: Pronounced &#8220;yarp!&#8221;, kind of like this, but maybe with a little more joy:
[^2]: Did you know that threshold has only two h&#8217;s!? I&#8217;m incensed and just went through and replaced all the instances of <code>threshhold</code> in my code. It&#8217;s really not a thresh-hold!?

 [1]: /code/yarpp/
 [2]: http://wordpress.org/extend/plugins/yet-another-related-posts-plugin
 [3]: http://wordpress.org/tags/yet-another-related-posts-plugin
 [4]: http://www.wordpress.org
 [5]: http://peter.mapledesign.co.uk/weblog/archives/wordpress-related-posts-plugin
 [6]: http://wasabi.pbwiki.com/Related%20Entries
 [7]: http://dev.mysql.com/doc/en/Fulltext_Search.html
 [8]: http://codex.wordpress.org/Function_Reference/register_activation_hook
 [9]: http://codex.wordpress.org/The_Loop