
### Terminal **A**

*This window is used to compile, deploy and control the contract*
- Environment
  ```sh
  export CONTRACT=        # depends on deployment

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  ```

- Commands
  ```sh
  1.dev-deploy.sh               # compile and deploy contract
  2.create-list-event.sh        # create and list new event
  3.donate.sh                   # donate an event
  3.cleanup.sh                  # reset environment
  ```

### Terminal **B**

*This window is used to render the contract account storage*
- Environment
  ```sh
  export CONTRACT=        # depends on deployment

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  ```

- Example usage

    bash scripts/dev-deploy.sh
    # bash create-list-event.sh name tag detail isDonatable subaccount(or main account)
    bash create-list-event.sh NearCON blockchain eventdetails true fatihkoc.testnet
    bash donate.sh
    bash cleanup.sh