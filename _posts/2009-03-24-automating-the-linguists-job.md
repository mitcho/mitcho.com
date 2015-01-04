---
title: 'Automating the Linguist&#8217;s Job'
layout: post
comments: true
permalink: /blog/projects/automating-the-linguists-job/
categories:
  - projects
tags:
  - analogy
  - automation
  - code
  - data
  - deduction
  - Dutch
  - linguistics
  - Mozilla Planet
  - parser
  - patterns
  - ubiquity
---
At the end of [my blog post yesterday][1] I hinted at an exciting possible approach to Ubiquity&#8217;s localization:

> In the future we ideally could build a web-based system to collect these &#8220;utterances.&#8221; We could &#8230; generate parser parameters based on those sentences. That would essentially reduce the parser-construction process to a more run-of-the-mill string translation process.

If we build this type of &#8220;command-bank&#8221; of common Ubiquity input translated into various languages, we could build a tool to learn various features of each language and generate each parser, essentially *learning the language based on data*. Today I&#8217;ll elaborate on how I believe this could be possible, by analogy to another language learning device: **the human**.

<!--more-->

### Step 1: learning words

How does a human learn language? Without getting into any [[language acquisition|details or theory]], we can say that the input for a language learner is always a combination of *linguistic input and a referent*. In the case of a child, this could be a pairing of linguistic input with *real world stimulus*:

<center>
  </p> <table style='border:none;'>
    <tr>
      <th>
        input
      </th>
      
      <th>
        referent
      </th>
    </tr>
    
    <tr>
      <td style='font-size:2em;color:orange;font-weight:bold;text-align:center;'>
        “taiyaki!”
      </td>
      
      <td>
        <img src='http://farm4.static.flickr.com/3543/3357452751_977fcce70c.jpg?v=0' width='300' /><br /> by <a href='http://www.flickr.com/photos/makitani/3357452751/'>makitani</a> via <a href='http://creativecommons.org'>creative commons</a>.
      </td>
    </tr>
    
    <tr>
      <td style='font-size:2em;color:orange;font-weight:bold;width:50%;text-align:center;'>
        “cat!”
      </td>
      
      <td>
        <img src='http://farm4.static.flickr.com/3285/2387513295_2768ddf662.jpg?v=0' width='300' /><br /> by <a href='http://www.flickr.com/photos/victoriachan/2387513295/in/set-72157604986983169/'>victoriachan</a> via <a href='http://creativecommons.org'>creative commons</a>.
      </td>
    </tr>
  </table>
  
  <p>
    </center>
  </p>
  
  <p>
    The human child will hear &#8220;cat&#8221; while looking at the cat and, with time and repetition, learn that that thing is called a &#8220;cat,&#8221; and [[taiyaki|some other thing]] is called &#8220;taiyaki.&#8221;
  </p>
  
  <p>
    Similarly, we could take single-verb data points from our command-bank to match new words with a know referent—in this case, the base English string. Here&#8217;s an example from <a href="http://jan.moesen.nu/">Jan&#8217;s</a> comment on <a href="http://mitcho.com/blog/projects/ubiquity-i18n-questions-to-ask/">yesterday&#8217;s sample survey</a>.
  </p>
  
  <p>
    <center>
      </p> <table style='border:none;'>
        <tr>
          <th>
            input (Dutch)
          </th>
          
          <th>
            referent (English)
          </th>
        </tr>
        
        <tr>
          <td style='font-size:2em;color:orange;font-weight:bold;text-align:center;'>
            zoek
          </td>
          
          <td style='font-size:2em;color:blue;font-weight:bold;text-align:center;'>
            search
          </td>
        </tr>
      </table>
      
      <p>
        </center>
      </p>
      
      <h3>
        Step 2: deduction
      </h3>
      
      <p>
        Now suppose we know some single words like &#8220;taiyaki&#8221; and &#8220;cat.&#8221; Consider the two situations. Given the first sentence and referent &#8220;mitcho&#8217;s eating a taiyaki,&#8221; the child could intuit the appropriate linguistic representation for the latter situation.
      </p>
      
      <p>
        <center>
          </p> <table style='border:none;'>
            <tr>
              <th>
                input
              </th>
              
              <th>
                referent
              </th>
            </tr>
            
            <tr>
              <td style='font-size:2em;color:orange;font-weight:bold;width:50%;text-align:center;'>
                “mitcho&#8217;s eating a taiyaki!”
              </td>
              
              <td>
                <img src="/static/uploads/2009/03/eattaiyaki.jpg" alt="eattaiyaki.jpg" border="0" width="300" height="225" />
              </td>
            </tr>
            
            <tr>
              <td style='font-size:2em;color:red;font-weight:bold;text-align:center;'>
                ???
              </td>
              
              <td>
                <img src="/static/uploads/2009/03/eatcat.jpg" alt="eatcat.jpg" border="0" width="300" height="225" />
              </td>
            </tr>
          </table>
          
          <p>
            </center>
          </p>
          
          <p>
            The process is simple. First note that there is only one variable changed between the two situations: the taiyaki has been replaced by a cat head. You can then construct the correct utterance <em>by analogy</em>, replacing &#8220;taiyaki&#8221; with &#8220;cat,&#8221; yielding &#8220;mitcho&#8217;s eating a cat!&#8221;<fnref target="2" />
          </p>
          
          <p>
            Similarly, we could build a tool to analyze the data in a translated command-bank to identify particular features of each language, generating at least basic parsers for each language. Such a task would require a number of <em>[[minimal pairs]]</em> in our data set—here&#8217;s one such example from yesterday&#8217;s survey (with Dutch data from <a href="http://jan.moesen.nu/">Jan</a>):
          </p>
          
          <p>
            <center>
              </p> <table style='border:none;'>
                <tr>
                  <th>
                    input (Dutch)
                  </th>
                  
                  <th>
                    referent (English)
                  </th>
                </tr>
                
                <tr>
                  <td style='font-size:1.5em;color:orange;font-weight:bold;text-align:center;'>
                    zoek HELLO met Google
                  </td>
                  
                  <td>
                    <span style='font-size:1.5em;color:blue;font-weight:bold;'>search HELLO with Google</span><br /> <code>
&lt;pre>Parse {
  verb:      'search',
  arguments: {
    object:  ['HELLO'],
    service: 'Google'
  }
}&lt;/pre>
</code>
                  </td>
                </tr>
                
                <tr>
                  <td style='font-size:1.5em;color:orange;font-weight:bold;text-align:center;'>
                    zoek dit met Google
                  </td>
                  
                  <td>
                    <span style='font-size:1.5em;color:blue;font-weight:bold;'>search this with Google</span><br /> <code>
&lt;pre>Parse {
  verb:      'search',
  arguments: {
    object:  ['this'],
    service: 'Google'
  }
}&lt;/pre>
</code>
                  </td>
                </tr>
              </table>
              
              <p>
                </center>
              </p>
              
              <p>
                A simple string analysis<fnref target="3" /> would tell us that the text <code>HELLO</code> was replaced by <code>dit</code> in the latter Dutch sentence. Meanwhile, since the English reference sentence is chosen manually, we also know the appropriate parses for each of those sentences. An object difference operation would note that the <code>object</code> property was changed from a value of <code>'HELLO'</code> to <code>'this'</code>. We could then map <code>dit</code> to the English <code>this</code>. We&#8217;ve now learned one (of perhaps many) Dutch deictic pronouns (aka &#8220;magic words&#8221;).
              </p>
              
              <p>
                Given <a href="http://mitcho.com/code/ubiquity/parser-demo/">an adequately universal but customizable parser design</a>, we can then develop tests for various parameters by constructing appropriate [[minimal pairs]] in the base sentences and having them translated.<fnref target="1" /> As noted yesterday, such a system could reduce the laborious task of writing individual parsers to a task of string translation, which <a href="https://wiki.mozilla.org/L10n:Home_Page">our community does exceedingly well</a>. <strong>I&#8217;m eager to hear what others think of this approach. What concerns would you have for this approach? What potential benefits do you see?</strong>
              </p>
              
              <footnotes>
                <fn name="2">
                  <p>
                    I mean no offense to human children with this simplified example. Surely you can learn more than just string replacements.
                  </p>
                </fn>
                
                <fn name="3">
                  <p>
                    I started building some string analysis toys in JavaScript today, such as a <a href="http://mitcho.com/code/ubiquity/levenshtein/">Levenshtein difference demo</a>.
                  </p>
                </fn>
                
                <fn name="1">
                  <p>
                    The linguists in the audience may note that this parser&#8217;s modular design is indeed in the spirt of the [[principles and parameters]] framework.
                  </p>
                </fn>
              </footnotes>

 [1]: http://mitcho.com/blog/projects/ubiquity-i18n-questions-to-ask/