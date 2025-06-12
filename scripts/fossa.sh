#!/bin/bash

set -e

# Checks if FOSSA_API_KEY is set
if [ -z "$FOSSA_API_KEY" ]; then
  echo "Missing FOSSA_API_KEY"
  exit 1
fi

# Check if fossa is installed, if not install it
# if ! command -v fossa &> /dev/null; then
#   curl -H 'Cache-Control: no-cache' https://raw.githubusercontent.com/fossas/fossa-cli/master/install-latest.sh | bash
#   export PATH=$PATH:/usr/local/bin
# fi

# Verify the current directory and the fossa.yml file
echo "Current directory: $(pwd)"
if [ ! -f ./fossa.yml ]; then
  echo "fossa.yml file not found in $(pwd)"
  exit 1
else
  echo "Found fossa.yml in $(pwd)"
fi

# Run FOSSA analysis with the specified configuration file
fossa analyze -c ./fossa.yml --debug