import type { BarCodeScanningResult } from 'expo-camera'
import React from 'react'
import BarcodeMask from 'react-native-barcode-mask'
import { Camera } from './Camera'
import { Pressable, View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'

type QrScannerOptions = {
  onScan: (result: string) => void
  onCancel: () => void
  cancelText?: string
  headerText?: string
  headerStyle?: StyleProp<TextStyle>
  cancelStyle?: StyleProp<TextStyle>
}

/**
 * A simple QrScanner that can be used for out-of-band invitations
 *
 * @remarks
 * It simply returns whatever is being scanned inside the `onScan` callback
 * There is no parsing or validation happening
 *
 * @param onScan - Callback that receives a string of the scanned data
 * @param onCancel - Callback that will be called when the `cancel` button is pressed
 * @param cancelText - Displayed text in the cancel button
 * @param headerText - Text displayed at the top of the QrScanner
 * @param cancelStyle - Custom styling for the text inside the cancel button
 * @param headerStyle - Custom styling for the header text
 *
 */
export const QrScanner: React.FunctionComponent<QrScannerOptions> = ({
  onScan,
  onCancel,
  cancelText = 'cancel',
  headerText,
  cancelStyle,
  headerStyle,
}) => {
  const onBarCodeScanned = (event: BarCodeScanningResult) => onScan(event.data)

  return (
    <Camera onBarCodeScanned={onBarCodeScanned}>
      {/* We ignore as `BarcodeMask is not seen as a valid component, type-wise.
          This is however not the case and works like how it is supposed to. */}
      {/* @ts-ignore */}
      <BarcodeMask showAnimatedLine={false} edgeBorderWidth={0} height={280} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={headerStyle ?? styles.header}>{headerText}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.backContainer}>
          <Pressable onPress={onCancel}>
            <Text style={cancelStyle ?? styles.cancel}>{cancelText}</Text>
          </Pressable>
        </View>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  spacer: {
    flex: 3,
  },
  backContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cancel: {
    fontSize: 18,
    color: 'white',
  },
})
