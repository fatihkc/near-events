#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variables"
echo ---------------------------------------------------------
echo

[ -z "$1" ] && echo "Missing id" && exit 1
[ -z "$2" ] && echo "Missing amount" && exit 1
[ -z "$3" ] && echo "Missing subaccount" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo ---------------------------------------------------------
echo "Step 1: Donate event $1"
echo ---------------------------------------------------------
echo

near call $CONTRACT donate '{"id":'$1',"amount":'$2'}' --accountId $3