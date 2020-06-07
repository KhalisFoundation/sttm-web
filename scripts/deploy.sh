#!/usr/bin/env sh
ssh -o StrictHostKeyChecking=no -p $PORT $REMOTE_USER@$REMOTE_HOST_1 "deploy-$1"
ssh -o StrictHostKeyChecking=no -p $PORT $REMOTE_USER@$REMOTE_HOST_2 "deploy-$1"
