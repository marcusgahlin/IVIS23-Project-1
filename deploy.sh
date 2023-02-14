#!/usr/bin/env sh

# abort on errors
set -e

# checkout on master???
git checkout master

# build the static app
npm run build

# bypass Jekyll processing
echo > dist/.nojekyll


# Provide a helpful timestamp to commits 
# this initiates a sub-git-repo (uggly work-around) to make sure we only get the dist files in the commit to github-pages
# git init
# create a branch in sub-git-repo
# git checkout -B main
# do the commit (only contains dist)
# git add -A
#

git add .
git commit -m "GitHub Pages deploy script
# [$(date '+%F@%T (%Z)')]"

#
git subtree push --prefix dist origin remotes/origin/gh-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# push the contents of the main (branch in sub-git-repo) to gh-pages branch
# git push -f origin main:gh-pages

# cd -