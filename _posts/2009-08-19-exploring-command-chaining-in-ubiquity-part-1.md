---
title: 'Exploring Command Chaining in Ubiquity: Part 1'
layout: post
comments: true
permalink: /blog/projects/exploring-command-chaining-in-ubiquity-part-1/
categories:
  - projects
tags:
  - algorithm
  - asynchronous
  - code
  - JavaScript
  - Mozilla Planet
  - nountypes
  - ubiquity
  - verbs
---
Since the [dawn of time][1] people have been asking about command chaining in Ubiquity. If you have a `translate` command and an `email` command, it would be great to be able to, for example, `translate hello to Spanish and email to Juanito`. This is what we call **command chaining** or **[[Pipeline_(Unix)|piping]]**: in a single complex query, specifying multiple (probably two) actions and using the first&#8217;s output as the second&#8217;s input.[^1]

Today I hope to cover some of the technical considerations required in implementing command chaining in Ubiquity, and I will follow up soon with a blog post on the linguistic considerations required as well.

<!--more-->

### Technical considerations: hooking the pipes together

I&#8217;d first like to lay out some technical challenges and questions. These can be broken into two different categories: (1) how the parse and display of suggestions is affected and (2) how the execution is affected.

#### Matching inputs and outputs

We&#8217;ll first consider how command chaining may affect the parsing. Ubiquity commands each specify the types of argument inputs that it expects using different **noun types**, such as `noun_arb_text` which accepts anything, `noun_type_number` which accepts numbers, or `noun_type_language`, which takes the name of a language. For example, the `translate` verb takes maximally three arguments: a `noun_arb_text` object, a `noun_type_language` goal (the language to translate into), and a `noun_type_language` source (the source language). In implementing command chaining, it will be necessary to identify the appropriate noun types for the *output* of a command.

The first question we must address here is **&#8220;what is the chaining output of a command&#8221;?** Is it the preview text? Some text output from the execution?

[<img src="http://mitcho.com/blog/wp-content/uploads/2009/08/2851415655_1012a4cce0_o.jpg" alt="2851415655_1012a4cce0_o.jpg" border="0" width="650" height="226" />][2]  
<small><a href='http://www.flickr.com/photos/joemud/2851415655/'>Big fish eat da lil fish</a> by joemud, CC-SA-NC</small>

To put this question into perspective, we note that Ubiquity commands can be broadly classified into two types: **lookup** and **action execution**. Here&#8217;s a classification which I believe to be exhaustive:[^2]

<td rowspan='4'>
  lookup
</td>

<td rowspan='4'>
  data lookup
</td>

| classification               | preview                                                    | execution                                                            | example                            |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| inserting result into page   | `translate`                                                |
| opening a website            | `weather`, most search commands                            |
| copying result to pasteboard | `get email address`                                        |
| nothing                      | ``                                                         |
| action                       | nothing (maybe a description  
of what the action will do) | an action which changes some state   
(in the browser or on the web) | `quit firefox`, `email`, `twitter` |

In light of this classification I believe we can say that lookup commands are much more likely to be the first verb in a command chain—conversely, chains such as `email hello to Blair and then do ...` or `twitter hello and then ...` are quite unlikely. What is much more likely is for the first verb to be a lookup function.

<table>
  <tr>
    <th>
      first verb type
    </th>
    
    <th>
      second verb type
    </th>
    
    <th>
      example
    </th>
  </tr>
  
  <tr>
    <td>
      lookup
    </td>
    
    <td>
      action
    </td>
    
    <td>
      <code>translate this to Spanish and email to Aza</code>
    </td>
    
    <tr>
      <td>
        lookup
      </td>
      
      <td>
        lookup
      </td>
      
      <td>
        <code>translate this to English and then find it with Amazon</code>
      </td>
      
      <tr>
        <td>
          action
        </td>
        
        <td>
          action/lookup
        </td>
        
        <td>
          <i>no use case?</i>
        </td></table> 
        
        <p>
          Thus in the same way that not all commands have a useful execution<fnref target="3" /> <strong>perhaps only lookup commands will have a chainable output: the results of the lookup.</strong> Even with this restriction, we will most likely need to implement a new &#8220;chainable output&#8221; method or getter in these commands. This means that commands will need to opt-in to become chainable, but I believe this is a necessary evil.
        </p>
        
        <p>
          The second question we must address is <strong>&#8220;when do we establish the noun type of a command&#8217;s chainable output?&#8221;</strong> One unsung but crucial feature of the way Ubiquity works now is that suggestions&#8217; previews are not computed until that suggestion is selected (except for the first suggestion, which in most skins gets previewed immediately). Should we wait for all of the first verbs&#8217; chainable output to be computed and then run them through the <a href="http://mitcho.com/blog/projects/judging-noun-types/">noun type detection system</a>? Or should verbs with chainable output also <em>a priori</em> specify what noun types their output will be?
        </p>
        
        <p>
          Both of these approaches have their problems. If we compute the chainable output of the first verb, run a noun type detection on it and <em>then</em> suggest the full combination if it matches what the second verb was expecting, this will have clear performance implications, not to mention that it could greatly complicate our <a href="https://wiki.mozilla.org/Labs/Ubiquity/Parser_2">parsing algorithm</a>. While the latter approach doesn&#8217;t have these performance implications, it does mean that it will have to list (by name or reference) the noun types that will match its output, meaning that if a command author is unaware of someone else&#8217;s noun type, that chain will be impossible, even if the chainable output itself does indeed match that noun type. The <em>a posteriori</em> approach would never have this issue. <strong>What other benefits or problems do you forsee with either of these approaches? Is there another approach which avoids these pitfalls?</strong>
        </p>
        
        <h4>
          (A)synchronous composability
        </h4>
        
        <p>
          Once we have the noun types, parsing, and suggestions down, all that remains is to compute the previews and implement the composite execution. Since the Ubiquity command manager already wraps the preview and execute functions in a wrapper to facilitate localization, among other uses, it would be easy to make the command manager <a href="http://www.croczilla.com/blog/16">compose asynchronous processes pseudo-synchronously</a>. No major changes should be necessary to do the previews and executions, though, again, there will be a performance cost.
        </p>
        
        <h3>
          Conclusion
        </h3>
        
        <p>
          There are a number of technical questions which must be answered, mostly in the parsing/suggesting stage. The key questions to answer are:
        </p>
        
        <ol>
          <li>
            What is the chaining output of a command?
          </li>
          <li>
            When do we establish the noun type of a command&#8217;s chainable output?
          </li>
        </ol>
        
        <p>
          I&#8217;ll make another post soon on the linguistic considerations necessary in making command chaining happen in a <a href="http://mitcho.com/blog/projects/how-natural-should-a-natural-interface-be/">natural</a> fashion.
        </p>
        
        <footnotes>
          <fn name="1">
            <p>
              We&#8217;re going to limit our discussion here to this restriction that the two verbs are not simply two simultaneous commands, but two commands which operate successively on an input, i.e., that it is true piping. This for example rules out input such as <code>google dogs and translate cat to Spanish</code>, as the second command&#8217;s execution does not semantically depend on the first&#8217;s execution. This (hopefully uncontroversial) decision also affects the linguistic considerations to be made in my next post.
            </p>
          </fn>
          
          <fn name="2">
            <p>
              If you know of a command which doesn&#8217;t neatly fit into &#8220;lookup&#8221; or &#8220;action&#8221;, please let me know.
            </p>
          </fn>
          
          <fn name="3">
            <p>
              I believe we should mark these no-execution lookup commands visually so the user does not expect anything to happen if they execute it. This is <a href="http://ubiquity.mozilla.com/trac/ticket/651">trac #651</a>.
            </p>
          </fn>
        </footnotes>

 [1]: http://labs.mozilla.com/2008/08/introducing-ubiquity/
 [2]: http://www.flickr.com/photos/joemud/2851415655/