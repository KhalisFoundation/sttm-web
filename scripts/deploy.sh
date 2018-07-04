#!/usr/bin/env sh
ssh -p $PORT $REMOTE_USER@$REMOTE_HOST_1 "deploy-$1"
ssh -p $PORT $REMOTE_USER@$REMOTE_HOST_2 "deploy-$1"
