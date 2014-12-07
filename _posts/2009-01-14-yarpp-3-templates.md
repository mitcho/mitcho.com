---
title: Using Templates with YARPP 3
layout: post
permalink: /blog/projects/yarpp-3-templates/
comments: true
dsq_thread_id:
  - 3288215337
categories:
  - projects
tags:
  - beta
  - HTML
  - PHP
  - template
  - WordPress
  - WordPress Planet
  - YARPP
  - Yet Another Photoblog
---

{:.warning}
I am no longer maintaining the information here. It is out of date. Please see the [Developing with YARPP][1] section of the YARPP readme. If you have a YARPP support question not directly related to the templating feature, please use [the YARPP support forums][2].


Version 3 of [Yet Another Related Posts Plugin][3] is a major rewrite which adds two new powerful features: caching and templating. Today I&#8217;m going to show you how you can use *templates* to customize the look of your related posts output.

Previously with YARPP you were relatively limited in the ways you could present related posts. You were able to set some HTML tags to wrap your posts in and choose how much of an excerpt (if any) to display. This limited interface worked great for many users&#8212;indeed, these options still exists in YARPP 3.0. However, there&#8217;s also a new option for those of you who want to put your PHP skills to work and have complete control over your related posts display. The option will let you choose any files in the `templates` subdirectory of YARPP.

<img src="http://mitcho.com/blog/wp-content/uploads/2009/01/e38394e382afe38381e383a3-1.png" alt="templates interface" title="templates interface" width="410" height="163" class="alignnone size-full wp-image-1273" />

### The structure of a YARPP template

Let&#8217;s take a look inside the example template, included with YARPP 3 (`yarpp-template-example.php`):

{% highlight php %}
<h3>
  Related Posts
</h3>

<?php if (have_posts()):?>
<ol>
  <?php while (have_posts()) : the_post(); ?>
  <li>
    <a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
  </li>
  <?php endwhile; ?>  
</ol>
<?php else: ?>
<p>No related posts.</p>
<?php endif; ?>
{% endhighlight %}

There are two basic parts to this (and most all) YARPP template: (a) what you display when there are related posts and (b) what you display when there aren&#8217;t. We make this switch with the conditional on line 6. If there are related posts, we introduce an ordered list and use the <code>while</code> loop to loop over all the related posts. For each post, we use the snippet <code>the_post();</code> to load the appropriate post data, then print the line item.[^1]

You&#8217;ll notice that we&#8217;re using familiar template tags here such as <code>the_permalink()</code> and <code>the_title()</code>. If you&#8217;ve ever had to tweak or build a WordPress theme before, you&#8217;ll immediately feel at home. I&#8217;ll touch on this again later.

### The power of PHP

One big advantage of this new templating system is that you can control exactly how the posts are listed, breaking out of all of the previous structural limitations. For example, in the <code>template-list.php</code> template, we put the information for each related post in an array and then concatenate the strings with <code>implode</code>. This way, we produce a comma-separated list for our readers without any stray commas before or after the list, which was impossible until now.

{% highlight php startinline %}
$postsArray = array();
while (have_posts()) : the_post();
    $postsArray[] = '<li>
  <a href="'.get_the_permalink().'" rel="bookmark">'.get_the_title().'</a>
</li>';
endwhile;

echo implode(', ',$postsArray); // print out a list of the related items, separated by commas

{% endhighlight %}

You can also run any arbitrary PHP in the template file—even roll another WP_Query, as in the case of <code>template-random.php</code>, where a random post is returned when there are no related posts.

### Familiar template tags

As mentioned before, the tags we use in these YARPP templates are the same as the template tags used in any WordPress template. In fact, any WordPress <a href="http://codex.wordpress.org/Template_Tags">template tag</a> will work in the YARPP <a href="http://codex.wordpress.org/The_Loop">Loop</a>. You can use these template tags to display the excerpt, the post date, the comment count, or even some custom metadata. I&#8217;ve also written two special template tags which only work within a YARPP Loop: <code>the_score()</code> and <code>get_the_score()</code>. As you may expect, this will print or return the match score of that particular related post.

In addition, template tags from other plugins will also work. For an example, take a look at the <code>yarpp-template-photoblog.php</code> file:

{% highlight php %}
<?php while (have_posts()) : the_post(); ?>

<?php if (function_exists('yapb_is_photoblog_post')): if (yapb_is_photoblog_post()):?>

<li>
  <a href="<?php the_permalink() ?>" rel="bookmark"><?php yapb_get_thumbnail(); ?></a>
</li>

<?php endif; endif; ?>

<?php endwhile; ?>
{% endhighlight %}

In this template&#8217;s YARPP Loop, we use some template tags introduced by the <a href="http://wordpress.org/extend/plugins/yet-another-photoblog/">Yet Another Photoblog</a> plugin. If you have the Yet Another Photoblog plugin installed, you can use this template to display thumbnails of related posts in lieu of the titles. Notice that here we&#8217;re checking first whether each related post is indeed a photo post or not using <code>yapb_is_photoblog_post()</code> and then using the Yet Another Photoblog <code>yapb_get_thumbnail()</code> template tag to get the location of the thumbnail.

Templating in YARPP 3.0 enables the blog admin to uber-customize their related posts display using the lingua franca of PHP and <a href="http://codex.wordpress.org/Template_Tags">template tags</a>. Feel free to comment here with ideas, comments, and of course links to your YARPP-powered blogs. I look forward to seeing what the WordPress community does with this new feature!

[^1]: For those of you interested in the WP and SQL voodoo used to make this happen, I&#8217;ve posted <a href="http://mitcho.com/blog/how-to/external-orders-in-wordpress-queries/">a more technical article</a>.

 [1]: https://wordpress.org/plugins/yet-another-related-posts-plugin/other_notes/
 [2]: https://wordpress.org/support/plugin/yet-another-related-posts-plugin
 [3]: http://mitcho.com/code/yarpp