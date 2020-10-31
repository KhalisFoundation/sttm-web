#!/usr/bin/env sh
if [[ $TRAVIS_PULL_REQUEST != "false" && $TRAVIS_PULL_REQUEST_SLUG != "$TRAVIS_REPO_SLUG" ]]
then
    # Only run this pushes to branches in main repo and not on forks and pull requests.
    openssl aes-256-cbc -K $encrypted_1454d8bcbe1b_key -iv $encrypted_1454d8bcbe1b_iv -in deploy.enc -out scripts/deploy -d
fi