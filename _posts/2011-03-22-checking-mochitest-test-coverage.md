---
title: Checking mochitest test coverage
layout: post
comments: true
permalink: /blog/projects/checking-mochitest-test-coverage/
categories:
  - how to
  - projects
tags:
  - Firefox
  - JavaScript
  - mochitest
  - Mozilla Planet
  - Panorama
---
<a href="http://www.mozilla.org/firefox?WT.mc_id=aff_en08&WT.mc_ev=click" style="float: right;margin-left:10px;"><img border="0" alt="Firefox Download Button" src="http://www.mozilla.org/contribute/buttons/120x240arrow_b.png" /></a>One of the last bugs for Firefox Panorama was [bug 625818: &#8220;Check Panorama mochitest test suite coverage&#8221;][1]. Our automated tests ensure that we do not regress on existing functionality, but it&#8217;s only as good as its coverage: how much of the Panorama code base is actually being &#8220;hit&#8221; through the process of running the test suite.

Panorama went through a pretty rapid development cycle, making it into [Firefox 4][2] which was [released today][3] (yay!). Moreover, for a while we were developing outside of mozilla-central, without the regular &#8220;patches require tests&#8221; requirement. This makes checking its test coverage particularly important.

Check out the final result, the [Panorama test coverage report][4]. The good news: our code coverage is 86%! (Some notes on what improvements can be made are in [the bug][1].)

[<img src="/static/uploads/2011/03/Screen-shot-2011-03-22-at-6.59.26-PM.png" alt="code coverage report" border="0" width="600" height="260" />][4]

PhiliKON had previously worked on hooking into the [JS Debugger service][5]&#8217;s `interruptHook` to test [`xpcshell` tests][6]. I modified this code to run instead in the [Mochitest browser chrome tests][7]. This code can be found [on the bug][1].

With this patch applied, I invoked the test suite with the following code: `TEST_PATH=browser/base/content/tests/tabview COVERAGE_FILTER="*tabview*" COVERAGE=true make -C obj-ff-dbg mochitest-browser-chrome` . That&#8217;s a regular `mochitest-browser-chrome` invocation with the `COVERAGE=true` flag which turns on code coverage checking, and `COVERAGE_FILTER=*tabview*` which filters out results from files which don&#8217;t have &#8220;tabview&#8221; in their paths. This creates a file called `coverage.json` in the working directory *of the test suite*, meaning, for me, `obj-ff-dbg/_tests/testing/mochitest/`.

This JSON file is a multidimensional array, with file paths and then line numbers as keys. The file paths here, as best as possible, have been converted into local filesystem paths. PhiliKON built a script which produces beautiful reports based on this output.

A word of warning: running with this JSD `interruptHook` is ridiculously slow. A number of tests for Panorama are timing-dependent (drag-drop tests, for example), making some of them fail, but that&#8217;s okay&#8230; as long as it completed not via a timeout, it actually did run through all the code. In order to get this to run through everything with some degree of control, I split up the mochitest tabview suite in to a few chunks. I then took the multiple resulting `coverage.json` files and passed them into another script, in `tools/coverage/aggregate.py`, which takes multiple JSON results like this and puts them together into a single JSON file. I then passed this aggregate JSON file to PhiliKON&#8217;s wonderful report script and—voila—the [Panorama test coverage report][4]! Easy as pie.

 [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=625818
 [2]: http://firefox.com
 [3]: http://blog.mozilla.com/blog/2011/03/22/mozilla-launches-firefox-4-and-delivers-a-fast-sleek-and-customizable-browsing-experience-to-more-than-400-million-users-worldwide-2/
 [4]: http://mitcho.com/code/panorama-coverage/
 [5]: https://developer.mozilla.org/en/Code_snippets/JavaScript_Debugger_Service
 [6]: https://developer.mozilla.org/en/Writing_xpcshell-based_unit_tests
 [7]: https://developer.mozilla.org/en/Browser_chrome_tests