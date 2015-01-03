#! /bin/bash
# deploy script

echo "Deploying to server..."
rsync -rzcp --chmod=a+r --delete _site/ root@mitcho.com:/var/www/mitcho.com/html
echo "Deploy complete!"

echo "Updating redirects file"
rsync -zcp --chmod=a+r _site/redirects.conf root@mitcho.com:/var/www/mitcho.com/conf/redirects.conf
echo "Kicking nginx"
ssh root@mitcho.com 'service nginx configtest'
ssh root@mitcho.com 'service nginx reload'
