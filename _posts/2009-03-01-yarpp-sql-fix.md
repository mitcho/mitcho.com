---
title: YARPP SQL fix
layout: post
comments: true
redirect_from: /code/yarpp/sql.php/index.html
permalink: /blog/projects/yarpp-sql-fix/
categories:
  - projects
tags:
  - code
  - SQL
  - plugin
  - WordPress

---

If you receive an error like "The YARPP database has an error which could not be fixed." after installing YARPP, it is likely that your database user doesn't have the proper permissions to make the necessary changes to your database. Edit the database prefix below and execute the following four SQL queries. (It is possible that the first two will return errors as they have already been executed correctly.)

<label for='wp_prefix'>database prefix:</label> <input id='wp_prefix' value='wp_' type='text'/>

<script language='javascript'>
function setprefix () {
	$('.wp_prefix').text($('#wp_prefix').val());
}

$(document).ready(function() {
	$('#wp_prefix').keyup(setprefix);
	setprefix();
});
</script>

<pre>ALTER TABLE <span class='wp_prefix'></span>posts ADD FULLTEXT `yarpp_title` ( `post_title`)</pre>

<pre>ALTER TABLE <span class='wp_prefix'></span>posts ADD FULLTEXT `yarpp_content` ( `post_content`)</pre>

<pre>CREATE TABLE IF NOT EXISTS `<span class='wp_prefix'></span>yarpp_keyword_cache` (
  `ID` bigint(20) unsigned NOT NULL default '0',
  `body` text collate utf8_unicode_ci NOT NULL,
  `title` text collate utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
COMMENT='YARPP''s keyword cache table';</pre>
			
<pre>CREATE TABLE IF NOT EXISTS `<span class='wp_prefix'></span>yarpp_related_cache` (
  `reference_ID` bigint(20) unsigned NOT NULL default '0',
  `ID` bigint(20) unsigned NOT NULL default '0',
  `score` float unsigned NOT NULL default '0',
  `date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`reference_ID`,`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;</pre>
