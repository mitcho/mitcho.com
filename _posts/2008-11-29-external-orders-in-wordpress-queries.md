---
title: External orders in WordPress queries
layout: post
comments: true
permalink: /blog/how-to/external-orders-in-wordpress-queries/
comments: true
categories:
  - how to
tags:
  - algorithm
  - code
  - filter
  - hook
  - MySQL
  - order
  - PHP
  - plugin
  - query_posts
  - ranking
  - suggestions
  - WordPress
  - WordPress Planet
  - WP_Query
  - YARPP
---
The advanced WordPress user is intimately familiar with [`query_posts`][1], the function which controls which posts are displayed in &#8220;The Loop.&#8221; `query_posts` gives plugin and theme writers the ability to display only posts written in Janary (`query_posts("monthnum=1")`) or disallow posts from a certain category (`query_posts("cat=-529")`[^1]). One of the parameters you can set here is `orderby` which affects the ordering of the posts returned, with allowed values such as `author`, `date`, or `title`. But what if you want to order your posts in some other order, defined outside of your `wp_posts` table? Here I&#8217;m going to lay out some thoughts on rolling your own external ordering source for WordPress queries.

In order to introduce an external ordering source, we need to do four things: 1. create the external ordering source, 2. hook up (read &#8220;`join`&#8221;) the external ordering source 3. make sure we use that order, and 4. make it play nice. ^^

By the way, I&#8217;m going to assume you, dear reader, are PHP-savvy, proficient in MySQL, and already know a little about WordPress. This how-to is not for the PHPhobic.

<!--more-->

### The ordering source

For this example, suppose we want to display posts by order of &#8220;interestingness.&#8221; We&#8217;ll just create a table called `wp_interestingness` with two columns, `ID` and `interestingness` and populate it with some data. We&#8217;ll even be nice to our database by making sure the `ID` is the primary key. Easy.

### Hook up the external ordering source

When you run a query through `query_posts()` (or use `WP_Query`&#8217;s `query` method[^2]), what it&#8217;s doing is taking your special request and translating it into a MySQL statement. This means a query like `"monthnum=1"` is turned into `SELECT ... wp_posts.* FROM wp_posts WHERE 1=1 AND MONTH(wp_posts.post_date)='1' ...`. Every different query introduces something new to the basic `SELECT` command—in this case, the `AND MONTH(wp_posts.post_date)='1'`.

We first want to introduce the `interestingness` for each post and that means `join`ing the new table into the query. We&#8217;ll do this using the `posts_join` [filter][2]. This filter lets you add a `join` statement to the MySQL request.

{% highlight php startinline %}
add_filter('posts_join','my_join_filter');
function my_join_filter($arg) {
    $arg .= " natural join wp_interestingness ";
    return $arg;
}
{% endhighlight %}

Note that here we&#8217;re using `natural join` as `wp_posts` and `wp_interestingness` have only one key in common, `ID`, and that&#8217;s exactly the column we want to join them on.

### Use the new order

Now that we&#8217;ve `join`ed `wp_interestingness` in, we can refer to `wp_interestingness.interestingness` in our query. Note now that, by default, an `$wpdb->posts.post_date` will be used to order the posts. We&#8217;ll use another filter here; this time `posts_orderby`, to patch this part of the query. We&#8217;ll search for the default `ORDER BY` value and replace it with our own `interestingness`.

{% highlight php startinline %}
add_filter('posts_orderby','my_orderby_filter');
function my_orderby_filter($arg) {
    global $wpdb;
    $arg = str_replace("$wpdb->posts.post_date","wp_interestingness.interestingness",$arg);
    return $arg;
}
{% endhighlight %}

By the way, you can now check the resulting MySQL query by `echo`ing `$wp_query->request`. (If you&#8217;re using the `WP_Query` method I advocated below in footnote (2), you&#8217;ll of course have to change `$wp_query` to the `WP_Query` object you&#8217;re using.)

### Learn to play nice ^^

The instructions above do indeed work, but they also cause some major breakdowns in other functions of your blog. Why? That&#8217;s because the current code will edit your queries for every instance of The Loop: your index page, your archives, and your RSS feeds. You probably only want to search by interestingness in certain situations. What we need is a way to tell our (admittedly stupid) `my_join_filter` and `my_orderby_filter` when they should apply their `interestingness` magic and when they shouldn&#8217;t. There are several ways to set up such a system but here I&#8217;ll lay out one that I feel is particularly elegant. We&#8217;ll set it up so you can actually use `query_posts("orderby=interestingness")` and it&#8217;ll know what you&#8217;re talking about.

One of the first things that happens in `query_posts`—indeed, way before even the `posts_join` and `posts_orderby` filters—is an action hook called `parse_query`. This lets us look at the initial state of the `WP_Query` object as it starts to run. In particular, we can look at the `orderby` query variable and see if we want to order by `interestingness`. If we do, we&#8217;ll set a global variable called `$use_interestingness_flag` to be `true`.

{% highlight php startinline %}
add_action('parse_query','set_use_interestingness_flag');
function set_use_interestingness_flag($query) {
	global $use_interestingness_flag;
	if ($query->query_vars['orderby'] == 'interestingness')
		$yarpp_score_override = true;
	else
		$yarpp_score_override = false;
}
{% endhighlight %}

Now we just have to edit our filters so they only run when `$use_interestingness_flag == true`. We also will make sure to turn the flag back off in `my_orderby_filter`, as it&#8217;s our last filter to run during each query. It&#8217;s just like putting the seat back down after using a unisex bathroom.[^3]

{% highlight php startinline %}
add_filter('posts_join','my_join_filter');
function my_join_filter($arg) {
    global $use_interestingness_flag;
    if ($use_interestingness_flag)
        $arg .= " natural join wp_interestingness ";
    return $arg;
}
add_filter('posts_orderby','my_orderby_filter');
function my_orderby_filter($arg) {
    global $wpdb, $use_interestingness_flag;
    if ($use_interestingness_flag)
        $arg = str_replace("$wpdb->posts.post_date","wp_interestingness.interestingness",$arg);
    $use_interestingness_flag = false;
    return $arg;
}
{% endhighlight %}

This method has a great advantage as you can just set it up once and invoke it whenever you want, even together with other parameters, without any additional code. For example, you can try `query_posts("monthnum=1&orderby=interestingness")` or `query_posts("cat=-529&orderby=interestingness")`.

### Conclusion

Adding an external ordering source to your WordPress post queries can be relatively straightforward if you understand what `query_posts` does and take advantage of its [hooks][3]. This tutorial can also serve as the basis for many other patches to `WP_Query`, not just the `orderby` parameter. To better understand the way WordPress builds its MySQL queries and the many `posts_*` filters which you can take advantage of, go to the source: `wp-includes/query.php`. Finally, you can use the special `parse_query` hook and global variables as flags to only apply the filters when necessary.

[^1]:    
    This, incidentally, is precisely what I do to hide, by default, [my tweets][4] in my `index.php` and `archives.php`.

[^2]:    
    If you&#8217;re going to get serious about rolling your WordPress queries I highly recommend you follow [Mark Ghosh&#8217;s advice][5] on initializing another object of the `WP_Query` class and using the `query` method, rather than just using the global `query_posts` function.

[^3]:    
    The perceptive reader will note that we are still searching for the string `"$wpdb->posts.post_date"` in `my_orderby_filter`, instead of something like `"$wpdb->posts.interestingness"`. That&#8217;s because the `orderby` value of `interestingness` is not one of the allowed `orderby` values (search for `$allowed_keys` in `wp-includes/query.php` to see the list). Thus the MySQL `ORDER BY` value is set to the default of `"$wpdb->posts.post_date"` before it gets to the `posts_orderby` filter. Now you know.

 [1]: http://codex.wordpress.org/Template_Tags/query_posts
 [2]: http://codex.wordpress.org/Plugin_API/Filter_Reference
 [3]: http://codex.wordpress.org/Plugin_API
 [4]: http://twitter.com/mitchoyoshitaka/
 [5]: http://weblogtoolscollection.com/archives/2008/04/13/define-your-own-wordpress-loop-using-wp_query/