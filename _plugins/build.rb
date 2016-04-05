module Jekyll
  # run bibjson at the beginning of build
  Jekyll::Hooks.register :site, :pre_render do |site|
    puts "bibjson..."
    # todo what happens if there's an error?
    `node _lib/bibjson.js > _data/bib.json`
  end

  # copy cv at the end
  Jekyll::Hooks.register :site, :post_write do |site|
    source = '/Users/mitcho/Dropbox/academic/cv/erlewine-cv.pdf'
    target = File.join(site.dest, '/erlewine-cv.pdf')
    FileUtils.cp(source, target)
    puts "cp cv #{target}"
  end

  # not working... todo fixme
  class MitchoComDeployCommand < Jekyll::Command
    class << self
      def init_with_program(prog)
        prog.command(:new) do |c|
          c.syntax "deploy [options]"
          c.description 'Deploy to mitcho.com.'

          # c.option 'dest', '-d DEST', 'Where the site should go.'

          c.action do |args, options|
            # options['dest']
          
            puts "Deploying to server..."
            `rsync -rzcp --chmod=a+r --delete _site/ root@mitcho.com:/var/www/mitcho.com/html`
            puts "Deploy complete!"

            puts "Updating redirects file"
            `rsync -zcp --chmod=a+r _site/redirects.conf root@mitcho.com:/var/www/mitcho.com/conf/redirects.conf`
            puts "Kicking nginx"
            `ssh root@mitcho.com 'service nginx configtest'`
            `ssh root@mitcho.com 'service nginx reload'`
          end
        end
      end
    end
  end
end
