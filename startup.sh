#!/bin/sh

cmd="$@"

npx prisma migrate deploy
npx prisma generate

exec $cmd
