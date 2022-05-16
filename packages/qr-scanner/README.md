# @aries-components/qr-scanner

This is a simple camera view, with barcode cut-out, to scan qrcodes. It uses `expo-camera` under the hood and is customizable.
Please check the documentation inside the component for more information.

## Installation

**yarn**

```sh
yarn add @aries-components/qr-scanner
```

**npm**

```sh
npm install @aries-components/qr-scanner
```

#### Usage

```tsx
import { QrScanner } from "@aries-components/qr-scanner"

export const CustomScanner = () => {
  const onScan = console.log
  const onCancel = () => console.log("navigate back!")

  return <QrScanner onScan={onScan} onCancel={onCancel} />
}
```
