module Jekyll

  class PaperPage < Page
    def initialize(site, base, dir, slug, bibdata)
      @site = site
      @base = base
      @dir = dir
      @name = sanitize_filename(slug) + '.html'
      
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

    private
    # copied from Jekyll
    def sanitize_filename(name)
      name = name.gsub(/[^\w\s_-]+/, '')
      name = name.gsub(/(^|\b\s)\s+($|\s?\b)/, '\\1\\2')
      name = name.gsub(/\s+/, '_')
    end
  end

  class PaperPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'paper'
        dir = 'research'
        site.data['bib'].each do |bibdata|
          slug = bibdata['citationKey'].sub(':','-')
          site.pages << PaperPage.new(site, site.source, dir, slug, bibdata)
        end
      end
    end
  end

end