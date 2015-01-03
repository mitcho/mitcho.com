---
title: Beginning development with Jetpack SDK 0.2
layout: post
comments: true
permalink: /blog/how-to/develop-with-jetpack-sdk-0-2/
categories:
  - how to
tags:
  - Jetpack
  - Jetpack SDK
  - Mozilla Labs
  - Mozilla Planet
  - Windows
---

*This article is a translation of a [recent article in Japanese][1] by fellow Jetpack Ambassador [Gomita][2] which was published [on the Mozilla Labs Jetpack blog][3]. I&#8217;m cross-posting it here for posterity.*

Mozilla Labs recently released [version 0.2][4] of the Jetpack SDK, which fixes some issues of the 0.1 release such as a glitch regarding development with Windows. SDK 0.2 doesn&#8217;t include the planned APIs for rapid development of new browser functionality, but you can still play with SDK 0.2 to get a flavor for development with the Jetpack SDK.

In this article we begin by setting up an SDK 0.2 development environment and explain the steps required to develop a simple, practical add-on using SDK 0.2. The instructions here are for Windows, but the basic steps are the same in every platform.

<!--more-->

### Installing Python

The first step to using the Jetpack SDK is to install Python. How to install Python depends on your OS, but in Windows you can choose the &#8220;Python 2.6.5 Windows installer&#8221; from the [Python][5] site and follow the installation wizard. Here, I&#8217;ll use `C:\Python26\` as the installation path.

After the install, you can activate the `python` command in your command line by adding `C:\Python26` to the Windows `Path` preference. (If there is already another value, delimit with a semicolon: &#8220;;&#8221;.) Run the command &#8220;cmd&#8221; from the Start menu to start the command prompt and run `python -V` to confirm the Python version, `Python 2.6.2`: 
<pre>C:\&gt;python -V
Python 2.6.2
</pre> Note, the 

[Jetpack SDK Docs][6] state that Python 2.5+ is required, but there seem to be some incompatibilities with Python 3.0.1 at this time. In addition, in my experience the SDK worked fine without the &#8220;Python for Windows extensions.&#8221;

### Setting up the Jetpack SDK

Next, we set up the Jetpack SDK. Download the Jetpack SDK 0.2 package from the [Jetpack site][7], unzip it, and place it somewhere convenient. Here, I used `C:\jetpack-sdk-0.2`.

To use the Jetpack SDK, it must be &#8220;activated.&#8221; From the command prompt, go to the Jetpack SDK folder and run `bin\activate`: 

{% highlight console %}
C:\jetpack-sdk-0.2&gt;bin\activate
Welcome to the Jetpack SDK. Run 'cfx docs' for assistance.
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2&gt;
{% endhighlight %}

Next, run `cfx docs` to open the SDK documentation in the browser. The SDK documentation starts a local server on port 8888. 

{% highlight console %}
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2&gt;cfx docs
One moment.
Opening web browser to http://127.0.0.1:8888.
{% endhighlight %}

### The package directory structure

Addons built with the Jetpack SDK are called &#8220;packages.&#8221; Let&#8217;s try building a simple &#8220;hello world&#8221;-style package, but first let&#8217;s see what the final directory structure of this package will look like:

<table style="height: 279px; margin: 0pt 0pt 10px 80px;" width="450">
  <tr>
    <th>
      <span style="float: left;">directory/file</span>
    </th>
    
    <th>
      <span style="float: left;">Note</span>
    </th>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px;" src="http://www.xuldev.org/common/folder.png" alt="フォルダ" width="16" height="16" />jetpack-sdk-0.2
    </td>
    
    <td>
      the Jetpack SDK folder
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:21px;" src="http://www.xuldev.org/common/folder.png" alt="フォルダ" width="16" height="16" />packages
    </td>
    
    <td>
      the main packages folder
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:37px;" src="http://www.xuldev.org/common/folder.png" alt="フォルダ" width="16" height="16" />hello-world
    </td>
    
    <td>
      package root
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:53px;" src="http://www.xuldev.org/common/file.png" alt="ファイル" width="16" height="16" />package.json
    </td>
    
    <td>
      package manifest file
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:53px;" src="http://www.xuldev.org/common/file.png" alt="ファイル" width="16" height="16" />README.md
    </td>
    
    <td>
      package documentation
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:53px;" src="http://www.xuldev.org/common/folder.png" alt="フォルダ" width="16" height="16" />lib
    </td>
    
    <td>
      the package code directory
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:69px;" src="http://www.xuldev.org/common/file.png" alt="ファイル" width="16" height="16" />main.js
    </td>
    
    <td>
      main program code
    </td>
  </tr>
  
  <tr>
    <td>
      <img style="float: left; margin: 4px 5px; margin-left:69px;" src="http://www.xuldev.org/common/file.png" alt="ファイル" width="16" height="16" />simple-dialog.js
    </td>
    
    <td>
      a custom code library
    </td>
  </tr>
</table>

The package&#8217;s root directory is placed in the &#8220;packages&#8221; directory in the Jetpack SDK folder, and includes the `package.json` manifest file and the `README.md` documentation file. The `lib` folder includes the package&#8217;s main program code and any custom libraries used by our addon.

### Creating the package

We begin by creating the `hello-world` directory in `C:\jetpack-sdk-0.2\packages` . Next the manifest file `package.json` is created. The manifest file includes metadata about our package in JSON format. If you&#8217;ve ever created a XUL-style addon before, you can think of this as similar to the `install.rdf` file. Here, I used the following as the manifest: 

{% highlight json %}
{
    "id": "helloworld@xuldev.org",
    "version": "0.1",
    "description": "This is my first package.",
    "author": "Gomita &lt;gomita@xuldev.org&gt;"
}
{% endhighlight %}

The `id` property is used as a unique ID for all addons including Jetpack packages and is often formatted as an email address. This corresponds to XUL-based addons&#8217; `&lt;em:id&gt;` tag.

Next, reload the SDK documentation in the browser and confirm that &#8220;hello-world&#8221; shows up under &#8220;Package Reference.&#8221;

### Writing the main code

The next step is to add some working code to the hello-world package. Create a `lib` folder under the package root and create a `main.js` under `lib` with the following code: 

{% highlight javascript %}
exports.main = function(options, callbacks) {
    console.log("Hello, World!");
};
{% endhighlight %}

The main program code is always loaded as a module called `main`. This `main` property is made accessible from outside code using the [CommonJS][8]-style code `exports.main = ...`. `console.log` is a global function made available by Jetpack and the SDK prints the string to the command prompt.

It&#8217;s worth noting that, in the current Jetpack SDK, calling &#8220;`console.log("こんにちは");`&#8221; doesn&#8217;t yield the expected Japanese output. In the future such output will be handled through the planned [localization API][9].

### Testing our package

With some simple code in our `main` function, it&#8217;s time to try this code out. To test this code, we run `cfx run -a firefox` in the command prompt. By running `cfx run` with the `-a firefox` option, we load our package into a brand new Firefox profile and launch Firefox. 

{% highlight console %}
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2>cd packages\hello-world
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2\packages\hello-world>cfx run -a firefox
info: Hello, World!
OK
Total time: 1.531000 seconds
Program terminated unsuccessfully.
{% endhighlight %}

After Firefox loads, confirm that the command prompt reads `info: Hello, World!` When you quit Firefox, the testing will end.

### Using a standard library

Now we&#8217;ll edit our code to invoke the timer library which is one of the Jetpack SDK&#8217;s standard libraries. The timer library is a module which abstracts various timer-related functionality, similar to the DOM&#8217;s `window.setTimeout`, `window.clearTimeout`. Details on this library are available in the <a href="https://jetpack.mozillalabs.com/sdk/0.2/docs/#module/jetpack-core/timer">SDK documentation</a>. Moreover, although not in the documentation, `timer.setInterval` and `timer.clearInterval` also work in this version.

To use this library in our main program code, we first must invoke this library with the CommonJS require function. We modify the `main.js` file as follows:

{% highlight javascript %}
var timer = require("timer");
exports.main = function(options, callbacks) {
    timer.setInterval(function() {
        console.log(new Date().toLocaleTimeString());
    }, 1000);
};
{% endhighlight %}

After this change, run `cfx run -a firefox` in the command prompt to test it. Check to make sure that the current time is being printed to the command prompt once a second:

{% highlight console %}
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2\packages\hello-world&gt;cfx run -a firefox
info: 10:37:21
info: 10:37:22
info: 10:37:23
info: 10:37:24
info: 10:37:25
{% endhighlight %}

### Creating a custom library

Next we&#8217;ll create a custom library to add some functionality not currently included in the Jetpack standard library. Implementing advanced functionality in add-ons, like filesystem access, involves using <a href="https://developer.mozilla.org/en/XPCOM">XPCOM</a> components. Jetpack encourages seprarating the use of XPCOM components into separate modules which are then used by the main program code. The Jetpack SDK doesn&#8217;t currently disallow direct XPCOM access within Jetpack add-on code, but such a restriction is forthcoming. Modularizing XPCOM code into separate libraries now allow you to easily migrate to equivalent standard libraries in the future.

Let&#8217;s create a `simple-dialog` library to display a modal dialog much like `window.alert` does. The Jetpack code&#8217;s runtime environment doesn&#8217;t include access to the regular `window` or `document` objects, so just calling `window.alert` doesn&#8217;t work. To create an alert from this context, we use the `&lt;a href="https://developer.mozilla.org/en/nsIPromptService"&gt;nsIPromptService&lt;/a&gt;` XPCOM component. In our package&#8217;s `lib` folder, create a `simple-dialog.js` file. Just like our main program code, we implement this library as a CommonJS module using `exports.&lt;em&gt;methodname&lt;/em&gt; = function(...){...}`.

The simple-dialog library will have these two methods:

<table style="margin: 0 0 10px 80px;">
  
  <tr>
    <th>
      <span style="float: left;">Method</span>
    </th>
    
    
    <th>
      <span style="float: left;">Note</span>
    </th>
    
  </tr>
  
  
  <tr>
    <td>
      `alert(&lt;em>text&lt;/em>)`
    </td>
    
    
    <td>
      Displays an alert dialog with the string in <em>text</em> and an OK button. Equivalent to the DOM&#8217;s `window.alert`.
    </td>
    
  </tr>
  
  
  <tr>
    <td>
      `confirmYesNo(&lt;em>text&lt;/em>)`
    </td>
    
    
    <td>
      Displays a confirmation dialog with the string in <em>text</em> and Yes and No buttons. The method returns `true` if the user presses &#8220;yes&#8221; and `false` if &#8220;no.&#8221;
    </td>
    
  </tr>
  
  
</table>

Here is the code for `simple-dialog.js`:

{% highlight javascript %}
var promptSvc = Cc["@mozilla.org/embedcomp/prompt-service;1"].
                getService(Ci.nsIPromptService);

exports.alert = function(text) {
    promptSvc.alert(null, "[Jetpack]", text);
};

exports.confirmYesNo = function(text) {
    var pos = promptSvc.confirmEx(
        null, "[Jetpack]", text, promptSvc.STD_YES_NO_BUTTONS,
        null, null, null, null, {}
    );
    return pos == 0;
};
{% endhighlight %}

Lines 1-2 are for calling `nsIPromptService`. Note that `Cc`, `Ci` are aliases for `Components.classes` and `Components.interfaces`, respectively, and are made available by Jetpack as global variables. Lines 4-6 implement the alert method for showing alert dialogs using `nsIPromptService`&#8217;s `alert` method. Lines 8-14 implement `simple-dialog`&#8217;s `confirmYesNo` method using `nsIPromptService`&#8217;s `confirmEx` method to display the dialog with yes and no buttons. `nsIPromptservice`&#8217;s `confirmEx` method returns 0 if the user presses &#8220;yes&#8221; and 1 if &#8220;no&#8221;, so we modify this value and return it.


### Using our custom library

Let&#8217;s call this new custom library from our main program code and verify that it works. Here&#8217;s our updated `main.js` file:


{% highlight javascript %}
var simpleDialog = require("simple-dialog");

exports.main = function(options, callbacks) {
    var adult = simpleDialog.confirmYesNo("Are you over 18 years old?");
    if (adult) {
        simpleDialog.alert("Welcome!");
    }
    else {
        simpleDialog.alert("Good bye!");
    }
};
{% endhighlight %}

Run `cfx run -a firefox` and confirm that a confirmation dialog is displayed. Pressing &#8220;yes&#8221; and &#8220;no&#8221; should give you the appropriate alert dialogs as well.


### Implementing a network status observer



Now let&#8217;s use this hello-world package as a foundation for a more practical add-on. Using the `&lt;a href="https://jetpack.mozillalabs.com/sdk/0.2/docs/#module/jetpack-core/observer-service"&gt;observer-service&lt;/a&gt;` module included with the Jetpack SDK, we can monitor Firefox&#8217;s online/offline network status changes.



Firefox internally broadcasts various application events to observers via the `&lt;a href="https://developer.mozilla.org/ja/NsIObserverService"&gt;nsIObserverService&lt;/a&gt;` XPCOM component. When Firefox goes offline, a `network:offline-status-changed` notification is broadcast. To subscribe this notification and act on it, we use the `observer-service` library&#8217;s `add` method. `add`&#8217;s first argument is the name of the notification we want to subscribe to and the second argument is a callback function. The callback function is given two arguments, of which the second is a string equal to either &#8220;online&#8221; or &#8220;offline.&#8221; In our add-on, we&#8217;ll check this value and display an appropriate alert using `simple-dialog`.

{% highlight javascript %}
var simpleDialog = require("simple-dialog");
var observer = require("observer-service");

exports.main = function(options, callbacks) {
    observer.add("network:offline-status-changed", function(sbj, data) {
        if (data == "online") {
            simpleDialog.alert("Firefox is now online.");
        }
        else if (data == "offline") {
            simpleDialog.alert("Firefox is now offline.");
        }
    });
};
{% endhighlight %}

Launch Firefox by running `cfx run -a firefox` and then choose &#8220;File&#8221; > &#8220;Work Offline&#8221; and you should get a notification:

<a href="http://mozillalabs.com/jetpack/files/2010/04/offline-en.png"><img class="alignnone size-medium wp-image-270" title="offline-en" src="http://mozillalabs.com/jetpack/files/2010/04/offline-en-300x225.png" alt="" width="300" height="225" /></a>


### Adding documentation

If you add documentation to a package, you can view it by clicking that package in the SDK Documentation. To add documentation, create a `README.md` file in the package root directory. `README.md` is written in Markdown format which looks like this:

{% highlight text %}
This is my *first* package.
* foo
* bar
* baz
{% endhighlight %}

Now if you load the SDK documentation using `cfx docs` and click on the &#8220;hello-world&#8221; link, you&#8217;ll see this documentation together with the package metadata.

### Exporting an install package

Jetpack add-ons which are created in this way can then be exported into Firefox-standard XPI files. To export an XPI, go to the package&#8217;s root directory in the command prompt and run `cfx xpi`.

{% highlight console %}
(C:\jetpack-sdk-0.2) C:\jetpack-sdk-0.2\packages\hello-world&gt;cfx xpi
Exporting extension to hello-world.xpi.
{% endhighlight %}

This creates an XPI file called `hello-world.xpi`. Opening this file in any Firefox profile will let you install it using the regular add-on install mechanism.

 [1]: http://www.xuldev.org/blog/?p=513
 [2]: http://www.xuldev.org/blog/
 [3]: http://mozillalabs.com/jetpack/2010/04/13/develop-with-jetpack-sdk-0-2/
 [4]: http://mozillalabs.com/jetpack/2010/03/26/announcing-jetpack-sdk-0-2/
 [5]: http://www.python.org/download/
 [6]: https://jetpack.mozillalabs.com/sdk/0.2/docs/#guide/getting-started
 [7]: https://jetpack.mozillalabs.com/
 [8]: http://commonjs.org/
 [9]: https://wiki.mozilla.org/Labs/Jetpack/Reboot/JEP/113