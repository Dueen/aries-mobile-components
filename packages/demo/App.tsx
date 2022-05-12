import React, { FC, useState } from "react"
import { Text, Button, StyleSheet, View } from "react-native"
import { KeychainProvider } from "./packages/keychain/KeychainContext"
import { QrScanner } from "./packages/qrscanner"

const App = () => {
  const [shouldShowCamera, setShouldShowCamera] = useState(false)

  const onCancel = () => setShouldShowCamera(false)
  const onScan = console.log

  return (
    <KeychainProvider service="mock-service">
      <View style={styles.container}>
        {!shouldShowCamera && <Button title="Show camera" onPress={() => setShouldShowCamera(true)} />}
        {shouldShowCamera && <QrScanner onScan={onScan} onCancel={onCancel} cancelText="cancel" headerText="Header" />}
      </View>
    </KeychainProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App
