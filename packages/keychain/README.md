# @aries-components/keychain

A simple package that allows you to use secure storage to set and get a Key

In order to use `useKeychain` the outer component MUST be wrapped inside a `<KeychainProvider />`

### Installation

**yarn**

```console
yarn add @aries-components/keychain
```

**npm**

```console
npm install @aries-components/keychain
```

### Usage

```tsx
import React from 'react'
import { KeychainProvider, useKeychain } from '@aries-components/keychain'

// The `KeychainProvider` should be above the components where you would like to
// use the keychain
export const Wrapped = () => (
  <KeychainProvider service="mock_service">
    <App />
  </KeychainProvider>
)

// ...

// Get the keychain accessor
const keychain = useKeychain()

// Set your wallet key in the secure storage
await keychain.setWalletKey('my-custom-password') // This will be derived with argon2i for security

// Get your wallet key from secure storage
const myDerivedPassword = await keychain.getWalletKey()

// Reset your wallet key
keychain.resetWalletKey(false) // Accepts a boolean whether to reset the salt used in the key derivation
```
