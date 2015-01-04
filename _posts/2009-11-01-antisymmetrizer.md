---
title: The Antisymmetrizer
layout: post
comments: true
categories:
  - projects
tags:
  - code
  - JavaScript
  - linguistics
---

Here's a tool to linearize a tree following Kayne's (1994) Linear Correspondence Algorithm. Enter your tree in qtree bracket notation.

<textarea cols='64' rows='10'>[.DP [.D the ] [.NP [.AP [.A tall ] ] [.N' [.N man ] [.PP [.P in ] [.DP [.D the ] [.NP [.AP [.A yellow ] ] [.N' [.N hat ] ] ] ] ] ] ] ]</textarea>

<div id='error' style='display:none;color: red;background-color: #eee;'>
</div>

## Settings:

<div id='settings' style='border: 1px dashed #ccc; padding: 15px;'>
  <p>
    &alpha; <em>c-commands</em> &beta; iff <ol>
      <li>
        &alpha; and &beta; are categories
      </li>
      <li>
        <input checked='checked' type='radio' name='everyClause' value='node' class='everyClause' />every node that dominates &alpha; dominates &beta;</input><br /><input type='radio' name='everyClause' value='complete' class='everyClause' />every node that completely dominates &alpha; completely dominates &beta; <small>(warning: can be slow with long input)</small></input>, and
      </li>
      <li>
        <input checked='checked' type='radio' name='exclusionClause' value='domination' class='exclusionClause' />&alpha; does not dominate &beta;</input><br /><input type='radio' name='exclusionClause' value='complete' class='exclusionClause' />&alpha; does not completely dominate &beta;</input><br /><input type='radio' name='exclusionClause' value='exclusion' class='exclusionClause' />&alpha; excludes &beta; (no segment of &alpha; dominates &beta;)</input>
      </li>
    </ol>
  </p>
  
  <p>
    The <em>image</em> d(&alpha;) is the set of leaves that are <input type='radio' name='imageClause' value='incomplete' class='imageClause' />dominated by &alpha;</input> or <input checked='checked' type='radio' name='imageClause' value='complete' class='imageClause' />completely dominated by &alpha;</input>.
  </p>
</div>

Here is the tree we will actually antisymmetrize:

<code style='background-color: transparent;'>&lt;span id='clean'>&lt;/span></code>

We first create a list of ordered pairs <&alpha;,&beta;> where &alpha; asymmetrically c-commands &beta;:

<div>
  <strong>A =</strong> {<span id='a'></span>}
</div>

We now compute the image *d* of all pairs: (<input type='checkbox' name='dup' id='dup' /><label for='dup'>Show duplicates</label>)

<div>
  <strong>d(A) =</strong> {<span id='da'></span>}
</div>

Here are any and all final linearizations:

<div>
  <span id='l'></span>
</div>