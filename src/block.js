/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
class Block {

    // Constructor - argument data will be the object containing the transaction data
    constructor(data, optProps, nullifyHash) {
        // initialize optional vars
        let o = optProps == null ? {} : optProps
        let nh = nullifyHash == null ? true : false
        this.hash = o.hasOwnProperty("hash") && !nh                        // Hash of the block
            ? o.hash
            : null
        this.height = o.hasOwnProperty("height") ? o.height : 0            // Block Height (consecutive number of each block)
        this.body = o.hasOwnProperty("body")                               // Will contain the transactions stored in the block, by default it will encode the data
            ? o.body
            : Buffer.from(JSON.stringify(data)).toString('hex')
        this.time = o.hasOwnProperty("time") ? o.time : 0;                 // Timestamp for the Block creation
        this.previousBlockHash = o.hasOwnProperty("previousBlockHash")     // Reference to the previous Block Hash
            ? o.previousBlockHash
            : null
    }

    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     *  Steps:
     *  1. Return a new promise to allow the method be called asynchronous.
     *  2. Save the in auxiliary variable the current hash of the block (`this` represent the block object)
     *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
     *  4. Compare if the auxiliary hash value is different from the calculated one.
     *  5. Resolve true or false depending if it is valid or not.
     *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
     */
    validate() {
        // create a new block from `this`. The hash of the block will be empty
        let self = new Block('', this)
        // Save in auxiliary variable the current block hash
        let _bhash = this.hash
        return new Promise(function (resolve, reject) {
            // Recalculate the hash of the Block
            // self.hash = null because of the copy
            let _vhash = SHA256(JSON.stringify(self)).toString()
            // Comparing if the hashes changed
            if (_vhash !== _bhash) {
                // Returning the Block is not valid
                resolve(false)
            }
            // Returning the Block is valid
            resolve(true)
        })
    }


    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
    getBData() {
        // Getting the encoded data saved in the Block
        let _body = this.body
        // Making previous block hash available in promise
        let _height = this.height
        return new Promise(function (resolve, reject) {
            // Because JSON.parse can throw an error, wrap the
            // operations in a try-catch
            try {
                // Check if it is the Genesis block
                if (_height === 0) {
                    throw 'Eyes only. Genesis block'
                }
                // Decoding the data to retrieve the JSON representation of the object
                // Parse the data to an object to be retrieve.
                // Resolve with the data if the object isn't the Genesis block
                // hex2ascii mangles the characters
                // let o = JSON.parse(hex2ascii(_body))
                let o = JSON.parse((Buffer(_body, 'hex')).toString('utf8'))
                resolve(o)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports.Block = Block;                    // Exposing the Block class as a module
