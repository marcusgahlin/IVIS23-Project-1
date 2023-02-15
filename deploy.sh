#!/usr/bin/env sh

# abort on errors
set -e

# checkout on master???
git checkout master

# build the static app
npm run build

cd dist

# bypass Jekyll processing
echo > .nojekyll


# Provide a helpful timestamp to commits 
# this initiates a sub-git-repo (uggly work-around) to make sure we only get the dist files in the commit to github-pages
git init
# create a branch in sub-git-repo
git checkout -B main
# do the commit (only contains dist)
git add -A
git commit -m "GitHub Pages deploy script
[$(date '+%F@%T (%Z)')]"

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# push the contents of the main (branch in sub-git-repo) to gh-pages branch. We need to specify the git@github address because in the sub-repo we don't have this as origin
git push -f git@github.com:marcusgahlin/IVIS23-Project-1.git main:gh-pages

cd -