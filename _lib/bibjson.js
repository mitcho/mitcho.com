// Michael Yoshitaka Erlewine <mitcho@mitcho.com>
// Dedicated to the public domain, 2014

var parser = require('bibtex-parser-js'),
	format = require('jsonf'),
	fs = require('fs'),
	util = require('util'),
	path = require('path');

var bibpath = '/Users/mitcho/Dropbox/academic/paperarchive/paperarchive.bib';
var paperarchive = fs.readFileSync(bibpath).toString();

paperarchive = paperarchive.replace(/@comment{BibDesk Static Groups{(.|\n)*}}/m, '');

var bib = parser.toJSON(paperarchive);

var authorUrls = {
	'van Urk, Coppe': 'http://web.mit.edu/cvanurk/www/',
	'Levin, Theodore': 'https://sites.google.com/site/tfranklevin/',
	'Kotek, Hadas': 'http://hkotek.com',
	'Sudo, Yasutada': 'http://web.mit.edu/ysudo/www/',
	'Gould, Isaac': 'https://linguistics.ku.edu/isaac-gould'
};

function cleanup(text) {
 	text = text.replace('\\&','&amp;');

 	text = text.replace("---",'&mdash;');
 	
	text = text.replace('\\VAN{Urk}', 'van Urk'); // for Coppe

	text = text.replace(/\\href{([^}]*)}{([^}]*)}/g,'<a href="$1">$2</a>');

	text = text.replace(/\v \i/g,'ǐ');
	text = text.replace(/\`\i/g,'ì');
	text = text.replace(/\' e/g,'é');
	text = text.replace(/\v o/g,'ǒ');
	text = text.replace(/\"u/g, 'ü');
	text = text.replace(/\'C/g, 'Ć');
	
	text = text.replace(/{\\em ([^}]*?)}/g,'<em>$1</em>');
	text = text.replace(/\\textit{([^}]*?)}/g,'<em>$1</em>');
	text = text.replace(/\\textbf{([^}]*?)}/g,'<strong>$1</strong>');
	text = text.replace(/{\\ja ([^}]*?)}/g,'<span lang="ja">$1</span>');
	text = text.replace(/{(.+?)}/g,'$1');

	// faux markdown
	text = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
	text = text.replace(/\*([^*]*?)\*/g,'<em>$1</em>');
	text = text.replace(/\[([^*]*?)\]\(([^)\s]*?)\)/g,'<a href="$2">$1</a>');

 	text = text.replace(/``/,'&#8220;');
 	text = text.replace(/''/g,'&#8221;');
 	text = text.replace(/`/g,'&#8216;');
 	text = text.replace(/'/g,'&#8217;');
		
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

function authorsHtml(authors, short) {
	var html = [];
	var first = true;
	for ( i in authors ) {
		var author = authors[i];
		var item = '';
		
		if (short) {
			item = author.lastName;
			if ( item == 'van Urk' )
				item = 'Van Urk';
		} else {
			if ( first ) {
				item = author.name;
				first = false;
			} else {
				item = author.displayName;
			}
		}
		
// 		if ( authors.length > 1 && author.name == 'Erlewine, Michael Yoshitaka' )
// 			item = '<strong>' + item + '</strong>';
		
		if ( 'url' in author )
			item = '<a href="' + encodeURI(author.url) + '">' + item + '</a>';
		
		html.push(item);
	}
	return html;
}

function othersHtml(authors) {
	var html = [];
	var first = true;
	for ( i in authors ) {
		var author = authors[i];
		if ( author.name == 'Erlewine, Michael Yoshitaka' )
			continue;

		var item = author.displayName;
		
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
		authors: [],
		projects: []
	};
	var keys = ['AUTHOR', 'EDITOR', 'TITLE', 'URL', 'NOTE', 'YEAR', 'ABSTRACT', 'BOOKTITLE', 'JOURNAL', 'VOLUME', 'PAGES', 'SCHOOL', 'PAPER', 'POSTER', 'HANDOUT', 'SLIDES', 'PUBLISHER', 'AUTHOR-JA', 'WEBNOTE', 'PREPRINT'];
	for (i in keys) {
		if (keys[i] in item.entryTags)
			newItem[keys[i].toLowerCase()] = cleanup(item.entryTags[keys[i]], keys[i]);
	}
	
	if ('AUTHOR' in item.entryTags) {
		newItem['authors'] = parseAuthors(cleanup(item.entryTags['AUTHOR']));
		newItem['authorsHtml'] = authorsHtml(newItem['authors']);
		newItem['shortHtml'] = authorsHtml(newItem['authors'], true);
		newItem['othersHtml'] = othersHtml(newItem['authors']);
	}

	if ('EDITOR' in item.entryTags) {
		newItem['editors'] = parseAuthors(cleanup(item.entryTags['EDITOR']));
		newItem['editorsHtml'] = authorsHtml(newItem['editors']);
	}
	
	var tmpkeywords = [];
	if ('KEYWORDS' in item.entryTags) {
		tmpkeywords = item.entryTags.KEYWORDS.split(/, */);
		tmpkeywords.forEach(function(word) {
			if (word.search(/^project:/) > -1) {
				newItem.projects.push(word.replace(/^project:/,''));
				return;
			}
			
			// srps is a magic keyword; skip it
			if (word === 'srps') {
				return;
			}
			
			// book reviews change the entryType
			if (word === 'book review') {
				newItem.entryType = 'bookreview';
			}
			
			newItem.keywords.push(word);
		});
	}
	
	newItem.files = [];
	if ('url' in newItem) {
		newItem.files.push({
			title: newItem.title,
			event: newItem.citationKey,
			url: newItem.url,
			type: path.extname(newItem.url).replace(/^\./,'')
		});
	}
	
	// find local files
	var fileKeys = ['paper','preprint','poster','handout','slides'];
	var associated = ('url' in newItem);
	for ( i in fileKeys ) {
		var fileType = fileKeys[i];
		if ( !(fileType in newItem) )
			continue;

		var newFile = {}

		// if there's a local file:
		if ( newItem[fileType].search('file://') > -1 ) {
			newFile.source = newItem[fileType].replace('file://', '').replace('%20', ' ');
			newFile.target = '/research/' + (fileType != 'paper' ? fileType + '-' : '') + newItem.citationKey.replace('talk:', '') + path.extname(newItem[fileType]);
	
			if ( !fs.existsSync(newFile.source) ) {
				console.error('Could not find ' + fileType + ': ' + newFile.source);
				continue;
			}
			
			newFile.event = path.parse(newFile.target).name;
		} else {
			newFile.target = newItem[fileType];
			if ( newFile.target[0] = '/' ) // if actually local:
				newFile.event = path.parse(newFile.target).name;
			else
				newFile.event = 'external: ' + newFile.target;
		}
		
		newItem[fileType] = newFile;
				
		var fileTitle = (associated ? 'Associated ' : '') + fileType;
		// If we already have a url for the official paper, the associated paper is the preprint.
		if ( associated && fileType == 'paper' && 
			( newItem.entryType == 'article' || newItem.entryType == 'incollection' ) )
			fileTitle = 'Preprint';
		// Capitalize initial:
		fileTitle = fileTitle.replace(/^(\w)/, function(x) {return x.toUpperCase();});
		
		if ( !associated && fileType == 'paper' ) {
			fileTitle = newItem.title;
			associated = true;
		}
		
		newItem.files.push({
			title: fileTitle,
			event: newFile.event,
			url: newFile.target,
			type: path.extname(newFile.target).replace(/^\./,'')
		});

	}
	
	// for now, setting both a paper and url is unsupported.
	if ( !('url' in newItem) && newItem.files.length )
		newItem.url = newItem.files[0].url;
	
	if ( 'pages' in newItem && newItem.pages.search(/-+/) > -1 )
		newItem.pageRange = newItem.pages.split(/-+/);
	
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

console.log(format(JSON.stringify(mybib)));
