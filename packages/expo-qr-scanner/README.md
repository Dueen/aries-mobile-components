# @aries-components/expo-qr-scanner

> TODO: this depends on an Alpha version of `@aries-framework/core`, this MUST
> be updated when `@aries-framework/core` is stable on 0.2.0.

This is a simple camera view, with barcode cut-out, to scan qrcodes. It uses
`expo-camera` under the hood and is customizable. Please check the
documentation inside the component for more information.

## Installation

**yarn**

```console
yarn add @aries-components/expo-qr-scanner
```

**npm**

```console
npm install @aries-components/expo-qr-scanner
```

#### Usage

```tsx
import React from 'react'
import { QrScanner } from '@aries-components/expo-qr-scanner'

export const CustomScanner = () => {
  // This callback will be called with a string from whatever the QR scanner
  // scanned.
  const onScan = (result: string) => console.log(`Result: ${result}`)

  // This callback will be called when the user presses the `cancel` button
  // It is common practise to hide the view here or navigate back
  const onCancel = () => console.log('navigate back!')

  return <QrScanner onScan={onScan} onCancel={onCancel} />
}
```
