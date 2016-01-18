# add a list to copy: in the file yaml and those files will be copied into the local dir
# allows * globbing

module Jekyll
  module Ink
    Jekyll::Hooks.register :pages, :post_write do |page|
      if page.data.key? 'copy'
        page.data['copy'].each do |copy|
#           puts "looking for #{copy}..."
          Dir.glob(copy).each do |source|
            target = File.join(page.site.dest, page.dir, File.basename(source))
            FileUtils.cp(source, target)
            puts "cp #{source} #{target}"
          end
        end
      end
    end
  end
end
