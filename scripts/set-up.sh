#!/usr/bin/env sh
if [[ "$TRAVIS_PULL_REQUEST" == "false" && "$TRAVIS_REPO_SLUG" == "KhalisFoundation/sttm-web" && "$TRAVIS_PULL_REQUEST_SLUG" == '' ]]
then
    # Only run this pushes to branches in main repo and not on forks and pull requests.
    chmod 600 scripts/deploy && mv scripts/deploy ~/.ssh/id_rsa
fi