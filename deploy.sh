#!/usr/bin/env sh

# abort on errors
set -e

# checkout on master???
git checkout master

# build the static app
npm run build

# navigate into the build output directory
cd dist

# bypass Jekyll processing
echo > .nojekyll

# Provide a helpful timestamp to commits 
git add -A
git commit -m "GitHub Pages deploy script
[$(date '+%F@%T (%Z)')]"

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git subtree push --prefix dist origin gh-pages

cd -