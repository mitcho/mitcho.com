#! /bin/bash
# deploy script

echo "Deploying to server..."
rsync -vrzc --delete _site/ root@mitcho.com:/var/www/mitcho.com/html
echo "Deploy complete!"

echo "Updating redirects file"
rsync -vzc _site/redirects.conf root@mitcho.com:/var/www/mitcho.com/conf/redirects.conf
echo "Kicking nginx"
ssh root@mitcho.com 'service nginx reload'
