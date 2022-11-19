#!/bin/sh
docker system prune -a
git submodule init
git submodule update --recursive --remote
docker compose up