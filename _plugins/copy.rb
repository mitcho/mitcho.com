# add a list to copy: in the file yaml and those files will be copied into the local dir
# allows * globbing

module Jekyll
  module Ink
    Jekyll::Hooks.register :pages, :post_write do |page|
#       @regenerator = page.site.regenerator
      if page.data.key? 'copy'
        page.data['copy'].each do |copy|
          Dir.glob(copy).each do |source|

#             if !page.site.config["incremental"] || @regenerator.modified?(source)
              target = File.join(page.site.dest, page.dir, File.basename(source))
              if page.site.config.verbose
                puts "cp '#{source}' '#{File.join(page.dir, File.basename(source))}'"
#                 puts File.size(source)
#                 @regenerator.add(source)
              end
              FileUtils.cp(source, target)
#             end
          end
        end
      end
    end
  end
end
