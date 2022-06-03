import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react-native'
import { QrScanner } from '@aries-components/expo-qr-scanner'
import { action } from '@storybook/addon-actions'

const QrScannerMeta: ComponentMeta<typeof QrScanner> = {
  title: 'QrScanner',
  component: QrScanner,
  argTypes: {
    onScan: { action: 'Scanned the QR code' },
    onCancel: { action: 'Cancelled the QR scanner' },
    cancelText: { description: 'Displayed text at the cancel button' },
    cancelStyle: { description: 'Styles of the cancelText' },
    headerText: { description: 'Text that can be displayed above the barcode mask' },
    headerStyle: {
      description: 'Style of the headerText',
    },
  },
  args: {
    basic: {
      onScan: action('onScan'),
      onCancel: action('onCancel'),
    },
    custom: {
      onScan: action('onScan'),
      onCancel: action('onCancel'),
      cancelText: 'Custom cancel text',
      cancelStyle: { color: 'blue', fontSize: 20 },
      headerText: 'Custom header text',
      headerStyle: { color: 'pink', fontSize: 25 },
    },
  },
}

export default QrScannerMeta

type QrScannerStory = ComponentStory<typeof QrScanner>

export const Basic: QrScannerStory = (args) => <QrScanner {...args.basic} />
export const Custom: QrScannerStory = (args) => <QrScanner {...args.custom} />
