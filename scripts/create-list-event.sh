#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variables"
echo ---------------------------------------------------------
echo

[ -z "$1" ] && echo "Missing name" && exit 1
[ -z "$2" ] && echo "Missing tag" && exit 1
[ -z "$3" ] && echo "Missing detail" && exit 1
[ -z "$4" ] && echo "Missing IsDonable" && exit 1
[ -z "$5" ] && echo "Missing subaccount" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo ---------------------------------------------------------
echo "Step 1: Create event $1"
echo ---------------------------------------------------------
echo

near call $CONTRACT create '{"name":"'$1'","tag":"'$2'" ,"detail":"'$3'","IsDonatable": '$4'}' --accountId $5

echo
echo ---------------------------------------------------------
echo "Step 2: List all events $1"
echo ---------------------------------------------------------
echo
near view $CONTRACT get '{"offset":0}' --accountId $5