After `npm install` vulnerabilities were reported
.....
.....
added 3 packages from 1 contributor and audited 92 packages in 13.484s
found 6 vulnerabilities (3 moderate, 3 high)
  run `npm audit fix` to fix them, or `npm audit` for details

```bash
$ npm audit
                                                                                
                       === npm audit security report ===                        
                                                                                
# Run  npm update elliptic --depth 4  to resolve 6 vulnerabilities
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Signature Malleability                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-lib                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-lib > bip32 > tiny-secp256k1 > elliptic            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1547                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Signature Malleability                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-lib                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-lib > tiny-secp256k1 > elliptic                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1547                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Signature Malleability                                       │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-message                                            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-message > secp256k1 > elliptic                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1547                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Moderate      │ Use of a Broken or Risky Cryptographic Algorithm             │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-lib                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-lib > bip32 > tiny-secp256k1 > elliptic            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1648                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Moderate      │ Use of a Broken or Risky Cryptographic Algorithm             │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-lib                                                │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-lib > tiny-secp256k1 > elliptic                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1648                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Moderate      │ Use of a Broken or Risky Cryptographic Algorithm             │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ elliptic                                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ bitcoinjs-message                                            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ bitcoinjs-message > secp256k1 > elliptic                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1648                            │
└───────────────┴──────────────────────────────────────────────────────────────┘


found 6 vulnerabilities (3 moderate, 3 high) in 92 scanned packages
  run `npm audit fix` to fix 6 of them.

$ npm update elliptic --depth 4
npm WARN project_1@1.0.0 No repository field.

+ elliptic@6.5.4
added 2 packages from 1 contributor, updated 1 package and audited 95 packages in 2.502s
found 0 vulnerabilities

$ npm audit
                                                                                
                       === npm audit security report ===                        
                                                                                
found 0 vulnerabilities
 in 94 scanned packages
```