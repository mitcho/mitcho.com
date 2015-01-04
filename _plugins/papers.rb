module Jekyll

  class PaperPage < Page
    def initialize(site, base, dir, slug, bibdata)
      @site = site
      @base = base
      @dir = dir
      @name = slug + '.html'
      
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'paper.html')
      self.data['title'] = bibdata['title']
      self.data['paper'] = bibdata
      if bibdata.key? 'abstract'
        self.data['excerpt'] = bibdata['abstract']
      else
        self.data['excerpt'] = ''
      end
    end
    
    def write(dest)
      path = destination(dest)
      FileUtils.mkdir_p(File.dirname(path))

      ['paper','handout','slides'].each do |type|
        if data['paper'].key? type and data['paper'][type].key? 'source'
          source = data['paper'][type]['source']
          target = File.join(site.dest, data['paper'][type]['target'])
          FileUtils.cp(source, target)
          puts "cp #{source} #{target}"
        end
      end

      File.open(path, 'wb') do |f|
        f.write(output)
      end
    end

    # Override so that we can control where the destination file goes
    def destination(dest)
      # The url needs to be unescaped in order to preserve the correct filename.
      path = File.join(dest, @dir, @name )
#       path = File.join(path, "index.html") if self.url =~ /\/$/
      path
    end     
  end

  class PaperPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'paper'
        dir = 'research'
        site.data['bib'].each do |bibdata|
          slug = Utils.slugify(bibdata['citationKey'])
          site.pages << PaperPage.new(site, site.source, dir, slug, bibdata)
        end
      end
    end
  end

end