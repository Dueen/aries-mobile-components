# Aries Mobile Components

React Native components that will help you build a better wallet.

## Requirements

These components have been tested against React Native `0.66.x` and `0.68.x`. Different minimum versions apply for different packages. But above `0.64.x`
every package should work fine.

## Installation

**yarn**

```sh
yarn add @aries-components/qr-scanner
yarn add @aries-components/keychain
```

**npm**

```sh
npm install @aries-components/qr-scanner
npm install @aries-components/keychain
```

### QrScanner

This is a simple camera view, with barcode cut-out, to scan qrcodes. It uses `expo-camera` under the hood and is customizable.
Please check the documentation inside the component for more information.

#### Usage

```tsx
import { QrScanner } from '@aries-components/qr-scanner'

export const CustomScanner = () => {
  const onScan = console.log
  const onCancel = () => console.log('navigate back!')

  return <QrScanner onScan={onScan} onCancel={onCancel} />
}
```

### Keychain

A simple package that allows you to use secure storage to set and get a Key

In order to use `useKeychain` the outer component MUST be wrapped inside a `<KeychainProvider />`

#### Usage

```tsx
import { KeychainProvider, useKeychain } from '@aries-components/keychain'

const Wrapped = () => (
  <KeychainProvider service="mock_service">
    <App />
  </KeychainProvider>
)

// ...

// Get the keychain accessor
const keychain = useKeychain()

// Set your wallet key in the secure storage
await keychain.setwalletKey('my-custom-password') // This will be derived with argon2i for security

// Get your wallet key from secure storage
const myDerivedPassword = await keychain.getwalletKey()

// Reset your wallet key
keychain.resetWalletKey(false) // Accepts a boolean whether to reset the salt used in the key derivation
```
