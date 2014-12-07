---
title: 'Nountype Quirks: Day 3: Geo Day'
layout: post
comments: true
permalink: /blog/projects/nountype-quirks-day-3/
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
It&#8217;s time for one more installment of Nountype Quirks, where I review and tweak [Ubiquity][1]&#8217;s built-in nountypes. For an introduction to this effort, please read [Judging Noun Types][2] and my updates from [Day 1][3] and [Day 2][4].

Today I ended up spending most of the day attempting to implement (but not yet completing) major improvements to the geolocation-related nountypes whose plans I lay out here.

*Note: this blog post includes a number of graphs using HTML/CSS formatting. If you are reading this article through a feed reader or planet, I invite you to read it [on my site][5].*<!--more-->

### `noun_type_geolocation`

`noun_type_geolocation` is the nountype used by the `weather` command for its location argument in input like &#8220;weather near Chicago&#8221;. The neat feature of `noun_type_geolocation` is that it has a smart default value which uses Firefox&#8217;s geolocation system to give you your current location by default, so I can enter &#8220;weather&#8221; and get the suggestion &#8220;weather near Broomfield, Colorado&#8221; (not completely correct, but close enough for the weather). Otherwise, however, `noun_type_geolocation` does not do too hot&#8230; for any input you give it, it&#8217;ll just accept it with a score of 0.3, much like `noun_arb_text`. We could do better.

One issue with this `noun_type_geolocation` is a conceptual one. Is this nountype supposed to accept only municipalities? Countries? Or should it accept landmarks or addresses as well? Part of the issue is that it&#8217;s only used by one built-in command in Ubiquity now, `weather`. But to be called a general &#8220;geolocation&#8221; nountype, its output should not be specific to `weather`&#8217;s usage, which is to throw the result at the [Weather Underground][6] API.

I propose that we change this to be something like `noun_type_geo_town` and also make similar nountypes like `noun_type_geo_country`, `noun_type_geo_region`, going all the way down to `noun_type_address` (which already exists—see below). All of the nountypes in this family could use a geocoding API such as [Google&#8217;s][7] or [Yahoo&#8217;s][8]. Their `data` properties could include all of this geocoded geographic data (in English) and also the latitude/longitude coordinate data.

The `weather` command could then accept `noun_type_geo_town` but, as some municipalities are not in Weather Underground or, for some countries, it is only as granular as administrative districts, we could just display the results of the geocoding API but then give Weather Underground the geocoded latitude/longitude data.

### `noun_type_async_address`

`noun_type_async_address` attempts to do exactly what I&#8217;ve laid out above for the most granular level: that of geolocations with data all the way down to the street level. This is the nountype which is used for the built-in `map` command and uses the [Yahoo geocoding service][8] to accomplish this. Let&#8217;s see what kinds of results it returns:

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
      mitcho
    </td>
    
    <td>
      mitcho
    </td>
    
    <td>
      <span class='scorebar' style='width:250px'></span> 0.5
    </td>
  </tr>
  
  <tr>
    <td rowspan='1'>
      grenada
    </td>
    
    <td>
      grenada
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
  
  <tr>
    <td>
      jono
    </td>
    
    <td>
      jono
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
  
  <tr>
    <td>
      mountain view
    </td>
    
    <td>
      mountain view
    </td>
    
    <td>
      <span class='scorebar' style='width:450px'></span> 0.9
    </td>
  </tr>
</table>

Let&#8217;s lay out some immediate quirks:

1.  All scores are either 0.5 or 0.9. In general, if the Yahoo API returns some geocoded interpretation, it gets 0.9, but otherwise it accepts everything with 0.5.
2.  The results that came back from the Yahoo service doesn&#8217;t add any useful information like the country or administrative region. Even the case stays lowercase.
3.  Since when is Jono a location!? I&#8217;ll get back to this later.

For starters, the Yahoo! Maps API terms of service dictate that we can&#8217;t use its geocoding service if we&#8217;re not also displaying Yahoo maps, so I rewrote it using the Google API which also had the advantage of offering JSON output.

One quirk of the Google Geocoding API, though, is that all of the resulting municipality names are only in English. Try for example queries for [Wien][9] or [東京 (Tokyo)][10]. Since we want our suggestions to only add information to our input, not replace the input entirely (and especially not in another language), we&#8217;ll then only take results which have the input as an initial substring. On the other hand, if none of the results have the input as a proper prefix of the return value, we will take the geocoding information from the first result but with the original input as the display text. Such results will have a markedly lower score.[^1]

As this is the `address` nountype, we&#8217;ll penalize results which do not have detailed information such as street address or town-level information. All of this is very easy to judge as every result from the API has a [geocoding accuracy][11] value.

### The best laid plans of mice and men&#8230;

I spent a good few hours this afternoon and evening [attempting to implement][12] this new family of nountypes, including this new `nountype_geo_address`, but also `nountype_geo_subregion`, `nountype_geo_region`, and `nountype_geo_country`. Some of the quirks of the `weather` and `map` commands, however, have prevented me from completely replacing the legacy `noun_type_address` and `noun_type_geolocation` described above. I hope to continue this work again soon and actually make this transition, ideally before 0.5.2.

Look forward to one (or maybe two?) more episode(s) of Nountype Quirks where I hope to definitively explain, analyze, and tweak `matchScore`, the scoring algorithm which underlies the majority of the nountypes in Ubiquity. As always, I look forward to your comments and feedback.

### Bonus: Where&#8217;s Jono?

It turns out that `noun_type_async_address` was recognizing &#8220;Jono&#8221; as an address because Jono is actually a location afterall! Not only that, but Jono is in Japan!!

<img src="http://mitcho.com/blog/wp-content/uploads/2009/08/Picture-31.png" alt="Picture 3.png" border="0" width="594" height="525" />

You clearly [can&#8217;t take Japan out of Jono][13], but it turns out you can&#8217;t take Jono out of Japan either.

[^1]:    
    If this crazy algorithm raises a red flag for anyone, you&#8217;re not alone&#8230; if you think of a more elegant solution, please let me know. This will no doubt be an issue when it comes to localizing the `address` nountype as well. I wish we could specify an output language for the Google Geocoding API&#8230; :(

 [1]: http://ubiquity.mozilla.com
 [2]: http://mitcho.com/blog/projects/judging-noun-types/
 [3]: http://mitcho.com/blog/projects/nountype-quirks-day-1/
 [4]: http://mitcho.com/blog/projects/nountype-quirks-day-2/
 [5]: http://mitcho.com/blog/projects/nountype-quirks-day-3/
 [6]: http://wunderground.com
 [7]: http://code.google.com/apis/maps/documentation/geocoding/index.html
 [8]: http://developer.yahoo.com/maps/rest/V1/geocode.html
 [9]: http://maps.google.com/maps/geo?q=Wien&output=json&oe=utf8&sensor=false
 [10]: http://maps.google.com/maps/geo?q=%E6%9D%B1%E4%BA%AC&output=json&oe=utf8&sensor=false
 [11]: http://code.google.com/intl/ja/apis/maps/documentation/geocoding/index.html#GeocodingAccuracy
 [12]: https://ubiquity.mozilla.com/hg/ubiquity-firefox/rev/377daf3fe57a
 [13]: http://jonoscript.files.wordpress.com/2009/06/ubiquity_japanese.png