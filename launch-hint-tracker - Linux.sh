#!/bin/sh
set -eu

DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if command -v python3 >/dev/null 2>&1; then
  exec python3 "$DIR/app/launch-local-server.py"
fi

if command -v python >/dev/null 2>&1; then
  exec python "$DIR/app/launch-local-server.py"
fi

echo "Python 3 is required to launch Wind Waker Randomizer Hint Tracker on macOS/Linux."
echo "Install Python 3, then run this launcher again."
exit 1
