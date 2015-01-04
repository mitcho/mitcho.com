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

<script>
function clean(text) {
  var nodeList = {};
  var headList = {};
  var nodes = text.split(/[^\w']+/);
  for (var i in nodes) {
    var node = nodes[i];
    if (node == '')
      continue;
    var match = /^(\w+?)(\d+)?([P']+)?$/.exec(node);
    var nodeHead = match[1];
    var nodeType = match[3] || '';
    var nodeNum = match[2] || '';
    if (nodeNum) {
      nodeList[node] = true;
      continue;
    } else if (!(node in nodeList)) {
      headList[nodeHead] = 1;
    } else if ((nodeHead + headList[nodeHead] + nodeType) in nodeList) {
      headList[nodeHead]++;
    }
    nodeList[node] = true;
    nodeList[(nodeHead + headList[nodeHead] + nodeType)] = true;
    text = text.replace(new RegExp('([. ])'+nodeHead+nodeType+' '),'$1'+nodeHead+headList[nodeHead]+nodeType+' ');
  }
  return text;
}

function process() {
  text = $('textarea').val();
  hideError();
  $('#clean').text(clean(text));
  $('#a').html('');
  $('#da').html('');

  var tree = createTree($('#clean').text());
  if (!tree)
    return false;
  var pairs = getPairsOfAsymmetricallyCCommandingNonTerminalNodes(tree,$('.everyClause:checked').val(),$('.exclusionClause:checked').val());

  $('#a').html(pairs.map(function(pair){ return '&lt;'+pair[0].label+','+pair[1].label+'&gt;' }).join(', '));

  var orderPairs = [];
  for (var i in pairs) {
    var pair = pairs[i];
    orderPairs = orderPairs.concat(image(pair[0],pair[1],$('.imageClause:checked').val() == 'complete'));
  }

  printDA(orderPairs);
  styleDuplicates();
  var linearizations = linearize(orderPairs);
  $('#l').html('');
  for (var i in linearizations) {
    var lin = linearizations[i];
    $('#l').append($('<li>'+lin.join(' ')+'</li>'));
  }
//  $('#l').text(lin.join(' '));
}

function linearize(orderPairs) {
  var words = {};
  for (var i in orderPairs) {
    words[orderPairs[i][0]] = true;
    words[orderPairs[i][1]] = true;
  }

  var completeLinearizations = [];

  var linearization = [];
  var linearizeChoices = [];
  var flatWords = [word for (word in words)];
  while (linearization.length < flatWords.length) {
    var wordNumber = linearization.length;
  
    var foundOne = false;
    for (var i in flatWords) {
      var word = flatWords[i];
      if (i <= linearizeChoices[wordNumber]*1 + 1) // we already tried this word.
        continue;
      if (linearization.indexOf(word) > -1) // don't reuse words
        continue;
      
      var thisLinearization = [].concat(linearization);
      thisLinearization.push(word);
      // suppose word is the next word in the linearization.
      
      // make sure the linearization with this "word" is compatible with all orders
      var badChoice = false;
      for (var j in orderPairs) {
        var orderPair = orderPairs[j];
        var pos1 = thisLinearization.indexOf(orderPair[0].label);
        var pos2 = thisLinearization.indexOf(orderPair[1].label);

        if (pos1 == -1 && pos2 != -1) {
          badChoice = true;
          continue;
        }

        if (pos1 == -1 || pos2 == -1)
          continue;
          
        if (pos1 >= pos2) {
          // bad choice!
          badChoice = true;
          continue;
        }
      }
      
      if (!badChoice) { // we'll choose you
        linearization[wordNumber] = word;
        linearizeChoices[wordNumber] = i;
        foundOne = true;
        break;
      }
    }

    var completedOne = false;    
    if (linearization.length == flatWords.length) {
      completeLinearizations.push([].concat(linearization));
      completedOne = true;
    }
    
    // if we ended up here, that means we made a bad step a little while back, or that we finished one and want to keep going.
    if (!foundOne || completedOne) {
      if (linearization.length == 0)
        return completeLinearizations;
      pop = linearization.pop();
      linearizeChoices = linearizeChoices.slice(0,linearization.length + 1);
    }
    
  }
  return completeLinearizations;
}

function printDA(imageOfPairs) {
  var uniqueHtml = {};
  var allHtml = [];
  for (var i in imageOfPairs) {
    var leafPair = imageOfPairs[i];
    var thisHtml = '&lt;'+leafPair[0]+','+leafPair[1]+'&gt;';
    if (!(thisHtml in uniqueHtml)) {
      uniqueHtml[thisHtml] = true;
    } else {
      thisHtml = '<span class="nonunique">'+thisHtml+'</span>';
    }
    allHtml.push(thisHtml);
  }
  $('#da').html(allHtml.join(', '));
}

function getPairsOfAsymmetricallyCCommandingNonTerminalNodes(tree,everyClause,exclusionClause) {
  // get all the nodes
  var nodes = tree.dominatees();
  nodes.push(tree);
  
  var pairs = [];
  
  for (var i in nodes) {
    for (var j in nodes) {
      if (nodes[i].isLeaf() || nodes[j].isLeaf())
        continue;
      if (nodes[i].cCommand(nodes[j],everyClause,exclusionClause))
        if (!nodes[j].cCommand(nodes[i],everyClause,exclusionClause))
          pairs.push([nodes[i],nodes[j]]);
    }
  }
  return pairs;
}

function createTree(text) {
  var tree = null;
  var current = tree;
  var nodes = text.split(/ +/);
  for (var i in nodes) {
    var node = nodes[i];
    if (node.indexOf('[.') === 0) { // create a new node.
      var label = node.replace('[.','');
      if (tree == null) {
        tree = new TreeNode(label,null);
        current = tree;
      } else
        current = current.addChild(label);
    } else if (node == ']') { // go back up one level
      current = current.parent;
    } else {
      label = node;
      current.addChild(label);
    }

    if (current == null && i < (nodes.length-1)) {
      showError("There's more than one tree here! Make sure to balance your braces.");
      return false;
    }
  }
  
  if (current != null) {
    showError("This tree is incomplete! Make sure to balance your braces.");
    return false;
  }
  
  return tree;
}

var TreeNode = function(label,parent) {
  this.parent = parent;
  this.label = label;
  this.children = [];
}
TreeNode.prototype = {
  parent: null,
  label: null,
  children: [],
  addChild: function(label) {
    var child = new TreeNode(label,this);
    this.children.push(child);
    return child;
  },
  toString: function() {
    if (!this.isLeaf())
      return "[."+this.label+" "+this.children.join(' ')+" ]";
    else
      return this.label;
  },
  headLabel: function() {
    var match = /^(\w+?)(\d+)?([P']+)?$/.exec(this.label);
    if (!match || !match[1] || !match[2]) {
      showError("I can't parse the label "+this.label+'.');
      throw Error();
    }
    return match[1]+match[2];
  },
  
  
  isBar: function() {
    return (this.label.indexOf("'") > 0);
  },
  isPhrase: function() {
    var unnumberedLabel = this.label.replace(/\d/g,'');
    if (unnumberedLabel.length == 1)
      return false;
    return (unnumberedLabel.substr(unnumberedLabel.length-1,1) == 'P');
  },
  isLeaf: function() {
    return (this.children.length == 0);
  },
  isHead: function() {
    return (!this.isBar() && !this.isPhrase() && !this.isLeaf());
  },
  isCategory: function() {
    return (!this.isBar() && !this.isLeaf());
  },  
  
  segments: function() {
    // if it's a head, then you are your own only segment.
    if (this.isHead())
      return [this];

    var segments = [];
    var current = this.head();
    while (current.parent != null && current.parent.headLabel() == this.headLabel()) {
      // not sure if we need this if statement
      if (current.parent.isBar() || current.parent.isPhrase())
        segments.push(current.parent);
      current = current.parent;
    }
    return segments;
  },
  head: function() {
    if (!this.isBar() && !this.isPhrase())
      return this;
    var headLabel = this.headLabel();
    var current = this;
    for (var i in current.children) {
      var child = current.children[i];
      if (child.label == headLabel)
        return child;
      if (child.headLabel() == headLabel)
        return child.head();
    }
    showError(this.label+" doesn't have a head!");
    return false;
  },
  cCommand: function(target,everyClause,exclusionClause) {
    // neither alpha nor beta is an X' (that is, both are either heads or maximal projections)
    if (this.isBar() || target.isBar())
      return false;
    // every node that dominates alpha dominates beta
    var alphaDom, betaDom;
    if (everyClause == 'complete') {
      alphaDom = this.completeDominators();
      betaDom = target.completeDominators();
    } else if (everyClause == 'node') {
      alphaDom = this.dominators();
      betaDom = target.dominators();
    }

    for (var i in alphaDom) {
      var thisDom = alphaDom[i];
      if (betaDom.indexOf(thisDom) < 0) // if this dominator of alpha is not a dominator of beta
        return false;
    }
    // alpha does not dominate beta
    if (exclusionClause == 'domination' && this.dominate(target))
      return false;
    // alpha does not dominate beta
    if (exclusionClause == 'complete' && this.completelyDominate(target))
      return false;
    // or alpha does excludes beta
    if (exclusionClause == 'exclusion' && !this.exclude(target))
      return false;
    return true;
  },
  dominate: function(target) {
    return (this.toString().indexOf(target.toString()) > -1);
  },
  completelyDominate: function(target) {
//    if (!this.isPhrase()) // only phrases can completely dominate things (?)
//      return false;
    var segments = this.segments();
    for (var i in segments) {
      if (!segments[i].dominate(target))
        return false;
    }
    return true;
  },
  exclude: function(target) {
    var segments = this.segments();
    for (var i in segments) {
      if (segments[i].dominate(target))
        return false;
    }
    return true;
  },
  
  dominators: function() {
    var dominators = [];
    var current = this;
    while (current.parent != null) {
      dominators.push(current.parent);
      current = current.parent;
    }
    return dominators;
  },
  completeDominators: function() {
    var dominators = this.dominators();
    var completeDominators = [];
    for (var i in dominators) {
      if (dominators[i].completelyDominate(this))
        completeDominators.push(dominators[i]);
    }
    return completeDominators;
  },
  categoryDominators: function() {
    return this.dominators().filter(function(x){return x.isCategory()});
  },
  dominatees: function() {
    if (this.isLeaf())
      return [];
    var ret = [];
    for (var i in this.children) {
      var child = this.children[i];
      ret.push(child);
      ret = ret.concat(this.children[i].dominatees());
    }
    return ret;
  },
  completeDominatees: function() {
    // get the lowest segment of this node, in case it has multiple segments
    // and then return that node's dominatees.
    
    var segments = this.segments();
    var lowestSegment = segments[0];
    if (!lowestSegment)
      return [];
    for (var i in segments) {
      var seg = segments[i];
      if (lowestSegment.dominate(seg))
        lowestSegment = seg;
    }
    return lowestSegment.dominatees();
  },
  image: function(complete) {
    if (complete)
      return this.completeDominatees().filter(function(x){return x.isLeaf()});
    else
      return this.dominatees().filter(function(x){return x.isLeaf()});
  },
  
  find: function(label) {
    var nodes = ([this].concat(this.dominatees())).filter(function(x){return x.label == label});
    if (nodes.length != 1)
      return false;
    return nodes[0];
  }
}

function image(alpha,beta,complete) {
  if (beta == null)
    return alpha.image(complete);
  var imageAlpha = alpha.image(complete);
  var imageBeta = beta.image(complete);

  var image = [];
  for (var i in imageAlpha)
    for (var j in imageBeta)
      image.push([imageAlpha[i],imageBeta[j]])

  return image;
}

$(document).ready(function(){
  $('textarea').keyup(process);
  process();
  $('.exclusionClause').change(process);
  $('.imageClause').change(process);
  $('.everyClause').change(process);
  $('#dup').change(styleDuplicates);
});

function styleDuplicates() {
  if ($('#dup:checked').length)
    $('.nonunique').show();
  else
    $('.nonunique').hide();    
}

function showError(text) {
  $('#error').text(text).show();
}

function hideError(text) {
  $('#error').hide();
}
</script>

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

<span id='clean'>&lt;</span>

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