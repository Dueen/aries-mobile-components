import type { BarCodeScanningResult } from "expo-camera"

import BarcodeMask from "react-native-barcode-mask"

import { Camera } from "./Camera"
import { Pressable, View, Text, StyleSheet } from "react-native"

type QrScannerOptions = {
  onScan: (result: string) => void
  onCancel: () => void
  cancelText?: string
  headerText?: string
}

export const QrScanner: React.FunctionComponent<QrScannerOptions> = ({
  onScan,
  onCancel,
  cancelText = "cancel",
  headerText,
}) => {
  const onBarCodeScanned = (event: BarCodeScanningResult) => onScan(event.data)

  return (
    <Camera onBarCodeScanned={onBarCodeScanned}>
      <BarcodeMask showAnimatedLine={false} edgeBorderWidth={0} height={280} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>{headerText}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.backContainer}>
          <Pressable onPress={onCancel}>
            <Text>{cancelText}</Text>
          </Pressable>
        </View>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 3,
  },
  backContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
})
