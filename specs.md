# Rubric

## Create Your Own Private Blockchain

### Complete unfinished block.js implementation

#### Modify the `validate()` function to validate if the block has been tampered or not.

- [x] Return a new promise to allow the method be called asynchronous.
- [x] Create an auxiliary variable and store the current hash of the block in it (this represent the block object)
- [x] Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
- [x] Compare if the auxiliary hash value is different from the calculated one.
- [x] Resolve true or false depending if it is valid or not.

#### Modify the 'getBData()' function to return the block body (decoding the data)

- [x] Use hex2ascii module to decode the data
- [x] Because data is a javascript object use JSON.parse(string) to get the Javascript Object
- [x] Resolve with the data and make sure that you don't need to return the data for the genesis block OR reject with an error.


### Complete unfinished blockchain.js implementation

#### Modify the '_addBlock(block)' function to store a block in the chain

- [x] Must return a Promise that will resolve with the block added OR reject if an error happen during the execution.
- [x] height must be checked to assign the previousBlockHash
- [x] Assign the timestamp & the correct height
- [x] Create the block hash and push the block into the chain array.
- [x] Don't for get to update the `this.height`

#### Modify 'requestMessageOwnershipVerification(address)' to allow you to request a message that you will use to sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)

- [x] must return a Promise that will resolve with the message to be signed

#### Modify 'submitStar(address, message, signature, star)' function to register a new Block with the star object into the chain

- [x] must resolve with the Block added or reject with an error.
- [x] time elapsed between when the message was sent and the current time must be less that 5 minutes
- [x] must verify the message with wallet address and signature: bitcoinMessage.verify(message, address, signature)
- [x] must create the block and add it to the chain if verification is valid

#### Modify the 'getBlockHeight(hash)' function to retrieve a Block based on the hash parameter

- [x] must return a Promise that will resolve with the Block

#### Modify the 'getStarsByWalletAddress (address)' function to return an array of Stars from an owners collection

- [x] must return a Promise that will resolve with an array of the owner address' Stars from the chain

#### Modify the 'validateChain()' function

- [x] must return a Promise that will resolve with the list of errors when validating the chain
- [x] must validate each block using validateBlock()
- [x] Each Block should check with the previousBlockHash
- [x] execute the validateChain() function every time a block is added
- [x] create an endpoint that will trigger the execution of validateChain()

### Test your App functionality

Use 'POSTMAN' or similar service to test your blockchains endpoints and send screenshots of each call

#### Mandatory Test steps

- [x] must use a GET call to request the Genesis block
- [x] must use a POST call to requestValidation
- [x] must sign message with your wallet
- [x] must submit your Star
- [x] must use GET call to retrieve starts owned by a particular address

### Testscript

1. Verify application started up. Console should say:
```plain
/usr/bin/node ./app.js
Server Listening for port: 8000                                   app.js:51
```
2. Place get call to http://127.0.0.1:8000/block/height/0
Add screenshots of the request and response
3. Post a JSON document to http://127.0.0.1:8000/requestValidation
    ```json
    {
      "address" : "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj"
    }
    ```
    other addresses:
    ```json
    {
      "address": "mpFgDU3GJZ2NVrtTGnfLxZ3bBLLTmymTG5"
    }
    ```
    ```json
    {
      "address": "mgSmQhW9fYKgNNHiDCogQS3d4PEFP4W3UM"
    }
    ```
   Add screenshot of the request and response
4. Take a screenshot of signing with wallet 
5. Submit the star
     * Record 1: Castor

    ```json
    {
      "address": "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj",
      "signature": "",
      "message": "",
      "star": {
        "dec": "31° 53' 18.0\"",
        "ra" : "07h 34m 36.0s",
        "story": "Castor: Testing story 5.01"
      }
    }
    ```

6. Submit following stars for owners

    * Record 2: Ksenia

    ```json
    {
      "address": "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj",
      "signature": "",
      "message": "",
      "star": {
        "dec": "30° 14' 43.0\"",
        "ra" : "07h 11m 08.4s",
        "story": "Ksenia: Testing story 6.02"
          }
    }
    ```

    * Record 3: Mebsuta

    ```json
    {
      "address": "mpFgDU3GJZ2NVrtTGnfLxZ3bBLLTmymTG5",
      "signature": "",
      "message": "",
      "star": {
        "dec": "25° 07' 52.0\"",
        "ra" : "06h 43m 55.9s",
        "story": "Mebsuta: Testing story 6.03"
      }
    }
    ```

    * Record 4: Tejat

    ```json
    {
      "address": "mgSmQhW9fYKgNNHiDCogQS3d4PEFP4W3UM",
      "signature": "",
      "message": "",
      "star": {
        "dec": "22° 30' 49.0\"",
        "ra" : "06h 22m 57.6s",
        "story": "Tejat: Testing story 6.04"
      }
    }
    ```

    * Record 5: Propus

    ```json
    {
      "address": "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj",
      "signature": "",
      "message": "",
      "star": {
        "dec": "22° 30' 24.0\"",
        "ra" : "06h 14m 52.6s",
        "story": "Propus: Testing story 6.05"
      }
    }
    ```

    * Record 6: Nucatel

    ```json
    {
      "address": "mpFgDU3GJZ2NVrtTGnfLxZ3bBLLTmymTG5",
      "signature": "",
      "message": "",
      "star": {
        "dec": "20° 12' 44.0\"",
        "ra" : "06h 28m 57.8s",
        "story": "Nucatel: Testing story 6.06"
      }
    }
    ```

    * Record 7: Athena

    ```json
    {
      "address": "mgSmQhW9fYKgNNHiDCogQS3d4PEFP4W3UM",
      "signature": "",
      "message": "",
      "star": {
        "dec": "16° 23' 57.0\"",
        "ra" : "06h 37m 42.7s",
        "story": "Athena: Testing story 6.07"
      }
    }
    ```

    * Record 8: Alzir

    ```json
    {
      "address": "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj",
      "signature": "",
      "message": "",
      "star": {
        "dec": "12° 53' 44.0\"",
        "ra" : "06h 45m 17.4s",
        "story": "Alzir: Testing story 6.08"
      }
    }
    ```

    * Record 9: Mekbuda

    ```json
    {
      "address": "mpFgDU3GJZ2NVrtTGnfLxZ3bBLLTmymTG5",
      "signature": "",
      "message": "",
      "star": {
        "dec": "20° 34' 13.0\"",
        "ra" : "07h 04m 06.5s",
        "story": "Mekbuda: Testing story 6.09"
      }
    }
    ```

    * Record 10: Wasat

    ```json
    {
      "address": "mgSmQhW9fYKgNNHiDCogQS3d4PEFP4W3UM",
      "signature": "",
      "message": "",
      "star": {
        "dec": "21° 58' 56.0\"",
        "ra" : "07h 20m 07.4s",
        "story": "Wasat: Testing story 6.10"
      }
    }
    ```

    * Record 11: Kebash

    ```json
    {
      "address": "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj",
      "signature": "",
      "message": "",
      "star": {
        "dec": "16° 32' 25.0\"",
        "ra" : "07h 18m 05.6s",
        "story": "Kebash: Testing story 6.11"
      }
    }
    ```

    * Record 12: Al Kirbab

    ```json
    {
      "address": "mpFgDU3GJZ2NVrtTGnfLxZ3bBLLTmymTG5",
      "signature": "",
      "message": "",
      "star": {
        "dec": "24° 23' 53.0\"",
        "ra" : "07h 44m 26.8s",
        "story": "Al Kirbab: Testing story 6.12"
      }
    }
    ```

    * Record 13: Pollux

    ```json
    {
      "address": "mgSmQhW9fYKgNNHiDCogQS3d4PEFP4W3UM",
      "signature": "",
      "message": "",
      "star": {
        "dec": "28° 01' 34.0\"",
        "ra" : "07h 45m 18.9s",
        "story": "Pollux: Testing story 6.13"
      }
    }
    ```

7. Request stars owned by "muHo1zGJXjLo1Rq5Ji9YGGNrCt5edZsgMj"
    Expected list of stars: Castor, Tejat, Athena, Wasat, Pollux 
8. Call validateChain endpoint
    Expected valid and 14 records.