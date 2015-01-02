// Michael Yoshitaka Erlewine <mitcho@mitcho.com>
// Dedicated to the public domain, 2014

var parser = require('bibtex-parser-js'),
	format = require('jsonf'),
	fs = require('fs'),
	util = require('util');

var path = '/Users/mitcho/Dropbox/academic/paperarchive/paperarchive.bib';
var paperarchive = fs.readFileSync(path).toString();

paperarchive = paperarchive.replace(/@comment{BibDesk Static Groups{(.|\n)*}}/m, '');

var bib = parser.toJSON(paperarchive);

var authorUrls = {
	'van Urk, Coppe': 'http://web.mit.edu/cvanurk/www/',
	'Levin, Theodore': 'https://sites.google.com/site/tfranklevin/',
	'Kotek, Hadas': 'http://hkotek.com'
};

function cleanup(text) {
 	text = text.replace('\\&','&amp;');

 	text = text.replace("``",'&#8220;');
 	text = text.replace("''",'&#8221;');
 	text = text.replace("`",'&#8216;');
 	text = text.replace("'",'&#8217;');
 	
	text = text.replace('\\VAN{Urk}', 'van Urk'); // for Coppe

	text = text.replace(/\\href{([^}]*)}{([^}]*)}/g,'<a href="$1">$2</a>');
	text = text.replace(/{\\em ([^}]*)}/g,'<em>$1</em>');
	text = text.replace(/{(.+?)}/g,'$1');
	
	return text;
}

function parseAuthors(text) {
	var rawAuthors = text.split(' and ');
	var authors = [];
	for ( i in rawAuthors ) {
		var author = rawAuthors[i];
		var authorParts = author.split(', ');
		var item = {
			'name': author,
			'lastName': authorParts[0],
			'displayName': authorParts[1] + ' ' + authorParts[0]
		};
		if ( author in authorUrls ) {
			item.url = authorUrls[author];
		}
		authors.push(item);
	}
	return authors;
}

function authorsHtml(authors) {
	var html = [];
	var first = true;
	for ( i in authors ) {
		var author = authors[i];
		var item = '';
		
		if ( first ) {
			item = author.name;
			first = false;
		} else {
			item = author.displayName;
		}
		
		if ( authors.length > 1 && author.name == 'Erlewine, Michael Yoshitaka' )
			item = '<strong>' + item + '</strong>';
		
		if ( 'url' in author )
			item = '<a href="' + encodeURI(author.url) + '">' + item + '</a>';
		
		html.push(item);
	}
	return html;
}

function convertItem(item) {
	var newItem = {
		citationKey: item.citationKey.toLowerCase(),
		entryType: item.entryType.toLowerCase(),
		keywords: [],
		authors: []
	};
	var keys = ['AUTHOR', 'EDITOR', 'TITLE', 'URL', 'NOTE', 'YEAR', 'ABSTRACT', 'BOOKTITLE', 'JOURNAL', 'VOLUME', 'PAGES', 'SCHOOL'];
	for (i in keys) {
		if (keys[i] in item.entryTags)
			newItem[keys[i].toLowerCase()] = cleanup(item.entryTags[keys[i]], keys[i]);
	}
	
	if ('AUTHOR' in item.entryTags) {
		newItem['authors'] = parseAuthors(cleanup(item.entryTags['AUTHOR']));
		newItem['authorsHtml'] = authorsHtml(newItem['authors']);
	}
	
	if ('KEYWORDS' in item.entryTags) {
		newItem.keywords = item.entryTags.KEYWORDS.split(/, */);
		for (i in newItem.keywords) {
			if (newItem.keywords[i].search(/^project:/) > -1) {
				newItem.project = newItem.keywords[i].replace(/^project:/,'');
				newItem.keywords.splice(i, 1);
			}
		}
	}
	
	if ('url' in newItem) {
		newItem.files = [{
			title: newItem.title,
			url: newItem.url,
			type: (newItem.url.search(/\.pdf$/) > -1 ? 'pdf' : null)
		}];
	}
	
	return newItem;
}

// now filter for my stuff
var mybib = [];
for (i in bib) {
	var item = bib[i];
// 	console.log(item);
	if (!('entryTags' in item))
		continue;
	
	if (!('AUTHOR' in item.entryTags && item.entryTags.AUTHOR.search('Erlewine') > -1) &&
		!('EDITOR' in item.entryTags && item.entryTags.EDITOR.search('Erlewine') > -1))
		continue;
	
	mybib.push(convertItem(item));
}

util.print(format(JSON.stringify(mybib)));
