#! /bin/bash
# Build the site

PROJECTS='/Users/mitcho/Dropbox/academic/projects/'
CV='/Users/mitcho/Dropbox/academic/cv/erlewine-cv.pdf'

# only locally:
if [ -d $PROJECTS ]; then
	echo 'bibjson...'
	node _lib/bibjson.js > _data/bib.json
fi

echo 'jekyll...'
jekyll build

if [ -f $CV ]; then
	echo 'cp cv...'
	cp $CV _site/erlewine-cv.pdf
fi
