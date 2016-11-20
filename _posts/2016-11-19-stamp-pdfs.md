---
title: Stamping PDFs in bulk
layout: post
comments: true
permalink: /blog/how-to/stamp-pdfs/
categories:
  - how-to
tags:
  - pdf
  - code
---

I recently put [the program and abstracts](https://lingconf.com/glowinasia2017/program/) online for the [GLOW in Asia](https://lingconf.com/glowinasia2017/) conference that we're hosting in Singapore next February. In my experience, conference abstract PDFs easily come up on web searches and you want it to be immediately obvious whose work it is. Some conferences ask for updated abstracts with author names, but I didn't want to deal with that. I instead chose to programmatically "stamp" each abstract PDF with the author names. Here are my notes on how I did that.

## Adding text to a single PDF

First, I had to figure out how to add some text to a PDF from the command line. I followed [these useful instructions](http://www.commandlinefu.com/commands/view/9984). For me, this involved installing the `enscript` utility (which I did using Homebrew: `brew install enscript`), which can create simple PostScript from plain text, and [PDFtk server](https://www.pdflabs.com/tools/pdftk-server/), which is a neat command line package for manipulating PDFs. The PDFtk website doesn't link to the latest build but I found some discussion which helpfully posted [the link to the latest build](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk_server-2.02-mac_osx-10.11-setup.pkg) which installed cleanly on Sierra.

With these installed, you can add a line of text to the top of an existing PDF as follows:

```bash
echo "text to add" | enscript -B -f Helvetica12 -o- | ps2pdf - | pdftk in.pdf stamp - output out.pdf
```

where `in.pdf` is the original PDF and `out.pdf` is what will be written. I played around briefly with font options, but Helvetica 12 looked fine for my purposes. You'll notice that I've done nothing to specify *where* the text should be stamped on the PDF. While this can probably be controlled (probably by learning some PostScript), the default output was good enough so I went with it.

(I'm not thrilled about relying on this free but closed-source PDFtk tool, and perhaps that step will stop working with future OS updates... If you know of another way to stamp PDFs from the command line, please do share!)

Once I figured this part out, now I just needed to write a quick script to automate the process of applying this to the dozens of PDFs that I wanted to put online.

## Programmatically adding text to multiple PDFs

What you get from EasyChair is a folder full of PDFs which are (or should be) anonymous and are organized by EasyChair ID.

![original PDFs]({{post.url}}easychair.png)

I created a csv file with three columns:
1. EasyChair ID number (to find the right abstract PDF)
2. Desired filename (lowercased family names with hyphens, using *-etal* for more than two authors)
3. Author names

I easily pulled columns 1 and 3 from the EasyChair website and quickly added in the second column. All of these fields are in plain text. Here's what that looked like:

![a csv with id information]({{post.url}}ids.png)

I wrote [**this python script**](https://gist.github.com/mitcho/26f3376da07b65e1872227176574ceda) which takes such a csv file, goes to find the appropriate PDF from the folder full of EasyChair abstracts, stamps the author names and "GLOW in Asia XI" on it, and saves it into another folder with the desired file name. In a matter of seconds, I had a folder full of de-anonymized abstracts, which I then put online:

![the resulting files]({{post.url}}result.png)

## The results

You can see the resulting PDFs by looking at some of the abstracts on the [the GLOW in Asia program](https://lingconf.com/glowinasia2017/program/). The results aren't beautiful --- for some abstracts, the placement of the text isn't very pretty, and it definitely has a "robotically stamped" quality --- but it did save me a heck of a lot of time.
