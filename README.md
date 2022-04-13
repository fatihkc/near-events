# NEAR Meet

Explore events about NEAR ecosystem! Both online and on-site events can use this smart contract for advertisement and collect donations! Donations are optional.

## Build project

Let's deploy smart contract

    yarn build:release
    near dev-deploy build/release/near-events.wasm
    export CONTRACT=dev-***-***

## Create Subaccount

I will use my account for examples

    near create-account a.fatihkoc.testnet --masterAccount fatihkoc.testnet
    near create-account b.fatihkoc.testnet --masterAccount fatihkoc.testnet

## Functions

Create two events with different owners

    near call $CONTRACT create '{"name":"NearCON","tag":"blockchain, online" ,"detail":"NearCON at 24-25th April at near.org!","IsDonatable": true}' --accountId a.fatihkoc.testnet

    near call $CONTRACT create '{"name":"NearLaw","tag":"law, on-site" ,"detail":"Code is law! 26-27th April at near-law.org!","IsDonatable": false}' --accountId b.fatihkoc.testnet

Get one by id

    near view $CONTRACT getById '{"id":3471649325}' --accountId fatihkoc.testnet

Get all events

    near view $CONTRACT get '{"offset":0}' --accountId fatihkoc.net

Delete second event

    near call $CONTRACT deleteById '{"id":3471649325}' --accountId b.fatihkoc.testnet

Donate 1 NEAR to first event

    near call $CONTRACT donate '{"id":188421397,"amount":"1000000000000000000000000"}' --accountId fatihkoc.testnet