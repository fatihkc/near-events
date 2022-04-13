# near-meet
Explore online events 

Basic application created. Donation and more details coming soon.

    near call $CONTRACT create '{"name":"NearCON","tag":"near, online" ,"detail":"NearCON at 24-25th April at near.org!","IsDonatable": true}' --accountId fatihkoc.testnet

    near view $CONTRACT getById '{"id":188421397}' --accountId fatihkoc.testnet

    near view $CONTRACT get '{"offset":0}' --accountId fatihkoc.net

    near call $CONTRACT deleteById '{"id":188421397 }' --accountId fatihkoc.testnet

Donate 1 NEAR token

    near call $CONTRACT donate '{"id":188421397,"amount":"1000000000000000000000000"}' --accountId fatihkoc.testnet