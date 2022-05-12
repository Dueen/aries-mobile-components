import React, { FC, useEffect, useState } from "react"
import { Text, Button, StyleSheet, View } from "react-native"
import { KeychainProvider, useKeychain } from "./packages/keychain/KeychainContext"
import { QrScanner } from "./packages/qrscanner"

const App = () => {
  const [shouldShowCamera, setShouldShowCamera] = useState(false)
  const keychain = useKeychain()

  const onCancel = () => setShouldShowCamera(false)
  const onScan = console.log

  useEffect(() => {
    keychain
      .storeAgentKey("password123")
      .then((x) => console.log("set! + ", x))
      .catch(console.error)
    keychain
      .getAgentKey()
      .then((x) => console.log("Get: +  ", x))
      .catch(console.error)
  }, [])

  return (
    <View style={styles.container}>
      {!shouldShowCamera && <Button title="Show camera" onPress={() => setShouldShowCamera(true)} />}
      {shouldShowCamera && <QrScanner onScan={onScan} onCancel={onCancel} cancelText="cancel" headerText="Header" />}
    </View>
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

const wApp = () => (
  <KeychainProvider service="mock_service">
    <App />
  </KeychainProvider>
)

export default wApp
