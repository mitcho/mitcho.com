require 'fileutils'
require 'digest/md5'

PYGMENTS_CACHE_DIR = File.expand_path('../../_cache', __FILE__)
FileUtils.mkdir_p(PYGMENTS_CACHE_DIR)

Jekyll::Tags::HighlightBlock.class_eval do
  def original_render_pygments(code, is_safe)
    require 'pygments'
    @options[:encoding] = 'utf-8'
    highlighted_code = Pygments.highlight(
      code,
      :lexer => @lang,
      :options => sanitized_opts(@options, is_safe)
    )
    if highlighted_code.nil?
      Jekyll.logger.error "There was an error highlighting your code:"
      puts
      Jekyll.logger.error code
      puts
      Jekyll.logger.error "While attempting to convert the above code, Pygments.rb" +
        " returned an unacceptable value."
      Jekyll.logger.error "This is usually a timeout problem solved by running `jekyll build` again."
      raise ArgumentError.new("Pygments.rb returned an unacceptable value when attempting to highlight some code.")
    end
    highlighted_code
  end

  def render_pygments(code, is_safe)
    if defined?(PYGMENTS_CACHE_DIR)
      path = File.join(PYGMENTS_CACHE_DIR, "#{@lang}-#{Digest::MD5.hexdigest(code)}.html")
      if File.exist?(path)
        highlighted_code = File.read(path)
      else
        highlighted_code = original_render_pygments(code, is_safe)
        File.open(path, 'w') {|f| f.print(highlighted_code) }
      end
    else
      highlighted_code = original_render_pygments(code, is_safe)
    end
    
    highlighted_code
#     output = add_code_tags(highlighted_code, @lang)
#     output = context["pygments_prefix"] + output if context["pygments_prefix"]
#     output = output + context["pygments_suffix"] if context["pygments_suffix"]
#     output
  end  
end