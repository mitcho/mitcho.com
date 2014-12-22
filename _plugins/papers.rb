module Jekyll

  class PaperPage < Page
    def initialize(site, base, dir, slug, bibdata)
      @site = site
      @base = base
      @dir = dir
      @name = slug + '.html'
      
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'paper.html')
      self.data['paper'] = bibdata
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