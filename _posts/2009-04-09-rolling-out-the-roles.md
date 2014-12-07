---
title: Rolling out the Roles
layout: post
comments: true
permalink: /blog/projects/rolling-out-the-roles/
categories:
  - projects
tags:
  - argument structure
  - arguments
  - code
  - Mozilla Planet
  - parser
  - proposal
  - semantic role
  - ubiquity
---
Jono and I have recently been working to incorporate the [Parser The Next Generation][1] into Ubiquity proper, and this of course involves the process of [retooling the standard commands with semantic roles][2]. The first step, however, is to come up with a list of universal semantic roles which the verbs will be rewritten to use and individual languages&#8217; parsers will be built to identify. Today I have just such a proposal.

<!--more-->

### Something to consider&#8230;

As we rewrite these current commands to specify semantic roles instead of specific modifiers, it is important to distinguish between synonymous prepositions in English which actually map to different semantic roles. Here are two examples:

*   `with`: English &#8220;with&#8221; can refer to one of two relations: &#8220;together-with&#8221; as in &#8220;share this with Jono&#8221; and &#8220;using-with&#8221; as in &#8220;share this with delicious&#8221; or &#8220;eat this with a fork.&#8221;
*   `in`: &#8220;in&#8221;, similarly, can refer to two different relations: &#8220;location-in&#8221; as in &#8220;find mexican food in Tokyo&#8221; and &#8220;format-in&#8221; as in &#8220;search Moscow in Russian&#8221; or &#8220;save this page in PDF.&#8221;

A quick test for such cases is &#8220;would these markers translate to the same markers in a different language?&#8221; It&#8217;s easy to find a language where the two different &#8220;with&#8221;s and the two different &#8220;in&#8221;s are expressed using different words. *With semantic roles in Parser TNG, it&#8217;s okay for multiple semantic roles to share the same delimiters/markers.*

### A proposed set of semantic roles

Here is a set of semantic roles which I would like to propose. *Keep in mind that these roles should map to morphological features in languages, not necessarily to the type of content in the argument (which is why we also will keep the noun types).*

*   `object`: direct object (the default or unmarked argument)
*   `goal`: the goal or end point of (metaphorical) movement or transition 
    *   example: in English, arguments marked by &#8220;to&#8221;, &#8220;into&#8221;, &#8220;toward&#8221;, etc.
*   `source`: the source or starting point of (metaphorical) movement or transition[^1] 
    *   example: in English, arguments marked by &#8220;from&#8221;, &#8220;by&#8221;, etc.
*   `position`: refers to a (metaphorical) location which defines the scope of an action, in contrast to `goal` and `source`. 
    *   example: in English, arguments marked by &#8220;in&#8221;, &#8220;at&#8221;, &#8220;near&#8221;, etc.
*   `instrument`: a tool or intermediary to be used 
    *   example: in English, arguments marked by &#8220;using&#8221; or &#8220;with&#8221;, as in &#8220;bookmark this with delicious.&#8221;
*   `format`: describes the intended or expected form of the result 
    *   example: in English, arguments marked by &#8220;in&#8221; as in &#8220;in PDF form&#8221; or &#8220;in German&#8221;
*   `alias`: a name or reference to 
    *   example: in English, arguments marked by &#8220;as&#8221; as in &#8220;tag this as new&#8221; or &#8220;login to mail as aza.&#8221;

Note that all three locational roles, `goal`, `source`, and `location` may be used for both times and places as the morphological marking of temporal and spacial expressions are often conflated in language. The appropriate type of referent (time or space) can then be specified with the noun type.

As a quick sanity check of this proposal, here are all the standard feeds built into Ubiquity which have multiple arguments together with what semantic role is appropriate for each argument:

<table>
  <tr>
    <th>
      command
    </th>
    
    <th>
      current modifier
    </th>
    
    <th>
      semantic role
    </th></thead> 
    
    <tr>
      <th>
        convert
      </th>
      
      <td>
        to
      </td>
      
      <td>
        goal, format
      </td>
    </tr>
    
    <tr>
      <th>
        email
      </th>
      
      <td>
        to
      </td>
      
      <td>
        goal
      </td>
    </tr>
    
    <tr>
      <th rowspan='2'>
        translate
      </th>
      
      <td>
        to
      </td>
      
      <td>
        goal, format
      </td>
    </tr>
    
    <tr>
      <td>
        from
      </td>
      
      <td>
        source
      </td>
    </tr>
    
    <tr>
      <th>
        search
      </th>
      
      <td>
        with
      </td>
      
      <td>
        instrument
      </td>
    </tr>
    
    <tr>
      <th>
        wikipedia
      </th>
      
      <td>
        in
      </td>
      
      <td>
        format
      </td>
    </tr>
    
    <tr>
      <th>
        yelp
      </th>
      
      <td>
        near
      </td>
      
      <td>
        position
      </td>
    </tr>
    
    <tr>
      <th>
        weather
      </th>
      
      <td>
        in
      </td>
      
      <td>
        location
      </td>
    </tr>
    
    <tr>
      <th>
        twitter
      </th>
      
      <td>
        as
      </td>
      
      <td>
        alias
      </td>
    </tr>
    
    <tr>
      <th rowspan='2'>
        share-on-delicious
      </th>
      
      <td>
        tagged
      </td>
      
      <td>
        alias
      </td>
    </tr>
    
    <tr>
      <td>
        entitled
      </td>
      
      <td>
        alias
      </td>
    </tr></table> 
    
    <p>
      The only problematic standard command, then, is the <code>share-on-delicious</code> command which can take both tags and a title, both of which would most naturally correspond to the <code>alias</code> role. <strong>If you have a suggestion for how best to deal with this type of case, I&#8217;d love to hear your suggestions!</strong>
    </p>
    
    <p>
      We&#8217;d love to get your feedback to this proposed set of semantic roles. <strong>How do you feel about the proposed set of semantic roles laid out here?</strong> In particular, if you have a command or can envision a command which would like to use a semantic role which does not fit any of these roles or would take multiple arguments of the same role, please let us know! ^^
    </p>
    
    <footnotes>
      <fn name="1">
        <p>
          The <a href="http://scholar.google.com/scholar?q=&quot;types+of+lexical+information&quot;+fillmore">Filmore (1971)</a> semantic role of &#8220;result&#8221; may also be lumped into this.
        </p>
      </fn>
    </footnotes>

 [1]: http://mitcho.com/blog/projects/ubiquity-parser-the-next-generation-demo/
 [2]: http://mitcho.com/blog/projects/writing-commands-with-semantic-roles/