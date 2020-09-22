#!/usr/bin/env bash

while true; do
  python Api.py
  echo "should be ended"
  kill -9 $(ps -aux | grep 'node ./bot.js' | awk '{print $2}' | head -n1)
  sleep 1

done