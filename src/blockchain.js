/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');
const hex2ascii = require('hex2ascii');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if (this.height === -1) {
            let block = new BlockClass.Block({ data: 'Genesis Block' });
            // (node:547420) UnhandledPromiseRejectionWarning: block 0 hash is invalid
            // <node_internals>/internal/process/warning.js:25
            // (node:547420) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
            // <node_internals>/internal/process/warning.js:25
            // (node:547420) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
            // `await` only handles the resolved promise. Since _addblock can reject a promise,
            // as per spec, we have to deal with it either wrap in a try-catch
            // or deal with it as promise.
            this._addBlock(block).then(b => {
                return
            }).catch(e => {
                throw e
            });
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            // TODO: This is a bit of an issue. Technically I think we need a
            // semaphore to synchronize setting the block height and updating
            // the chain.height
            // Did some addtional testing and nodejs can and will service multiple
            // requests when async calls are made. Two clients can interfere updating
            // a value just read by another client: data consistency issue.
            // Set block time
            block.time = (new Date()).getTime().toString().slice(0, -3)
            // Block height is determined by the chain height
            block.height = self.height + 1
            // If this is not the Genesis block (Block Height = 0)
            // add the hash from the previous block
            if (block.height > 0) {
                block.previousBlockHash = self.chain[block.height - 1].hash
            }
            // Determine the hash of the block 
            block.hash = SHA256(JSON.stringify(block)).toString()
            // Add it to the chain
            self.chain.push(block)
            // Adjust the block height
            ++self.height
            self.validateChain().then(errorList => {
                if (errorList.length !== 0) {
                    // when there are errors
                    //    * roll this block back
                    //    * reject the addition
                    // the assumption is that the probability that the rest
                    // of the blocks are good is high, since chain is tested
                    // after every addition.
                    --self.height
                    let trash = self.chain.pop()
                    reject(errorList.join("\n"))
                }
                // Make the block available to the then function
                resolve(block)
            }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        // resolve with the appropriately formatted string
        // from spec: <WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry
        return new Promise((resolve) => {
            resolve(`${address}:${(new Date()).getTime().toString().slice(0, -3)}:starRegistry`)
        })
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            // both parseInt and bitcoinmessage.verify can throw something
            // so wrap in try-catch
            try {
                // store message time
                let mtime = parseInt(message.split(':')[1])  // can throw an error
                // store current time
                let ctime = (new Date()).getTime().toString().slice(0, -3)
                // from spec: 5 mins = 300 seconds
                if (ctime - mtime >= 300) {
                    throw 'too late, message expiration time 5 mins'
                }
                // Verify validity of signature
                if (!bitcoinMessage.verify(message, address, signature)) { // can throw an error
                    throw 'message verification failed'
                }
                // Create the block
                let block = new BlockClass.Block({ owner: address, star: star })
                // Add the block and pass it on to the then step in line 
                self._addBlock(block).then(function (b) {
                    resolve(b)
                }).catch(err => {
                    reject(err)
                })
            } catch (error) {
                // report the boo-boo
                reject(error)
            }
        })
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            // considered Array.filter, rejected
            // * No requirements for constant time
            // * There is only one match, so we can break after finding it
            // * Average search time = .5 * height
            let block = null
            for (var i = 0; i < self.chain.length; i++) {
                if (self.chain[i].hash === hash) {
                    block = Object.create(self.chain[i])
                    break
                }
            }
            if (block)
                resolve(block)
            else
                reject(`No block with hash: ${hash}`)
        })
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if (block) {
                resolve(block);
            } else {
                resolve(null);
            }
        })
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress(address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            for (var i = 1; i < self.chain.length; i++) { // Start at block 1, skip genesis
                let block = self.chain[i]
                block.getBData().then(star => {
                    if (star.owner === address) {
                        stars.push(star)
                    }
                }, err => {
                    reject(err)
                })
                //let r = JSON.parse(hex2ascii(self.chain[i].body))
                //if (r.owner === address) {
                //    stars.push(r)
                //}
            }
            resolve(stars)
        })
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < self.chain.length; i++) {
                // check the block
                self.chain[i].validate().then(isOk => {
                    if (!isOk) {
                        errorLog.push(`block ${i} hash is invalid`)
                    }
//                }).catch(err => {
//                    reject(err)
                })
                // check previous block hash
                if (i > 0) {
                    if (self.chain[i].previousBlockHash !== self.chain[i - 1].hash) {
                        errorLog.push(`block ${i} previous block hash is not equal to block ${i} hash`)
                    }
                }
                // check the time and the height
                if (self.chain[i].height != i || (i > 0 && self.chain[i].time < self.chain[i - 1].time)) {
                    errorLog.push(`Chain appears out of order at block ${i}`)
                }
            }
            resolve(errorLog)
        })
    }

}

module.exports.Blockchain = Blockchain;
