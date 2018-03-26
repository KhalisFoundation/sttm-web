#!/usr/bin/env sh
ssh -p $PORT $REMOTE_USER@$REMOTE_HOST "deploy-$1"
