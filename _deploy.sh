#! /bin/bash
# deploy script

echo "Deploying to server..."
rsync -vrzc --delete _site/ root@mitcho.com:/var/www/mitcho.com/html
echo "Deploy complete!"
