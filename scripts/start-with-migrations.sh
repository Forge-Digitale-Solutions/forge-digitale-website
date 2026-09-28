#!/bin/sh
set -eu

node scripts/clear-dev-push-marker.mjs
node node_modules/payload/bin.js migrate
# Replace the shell so `next start` is PID 1 and receives Docker signals.
exec node node_modules/next/dist/bin/next start -H 0.0.0.0 -p 3000
