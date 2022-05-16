import React, { useEffect, useState } from "react"
import { Button, StyleSheet, View } from "react-native"
import { KeychainProvider, useKeychain } from "./packages/keychain"
import { QrScanner } from "./packages/qrscanner"

const App = () => {
  const [shouldShowCamera, setShouldShowCamera] = useState(false)
  const keychain = useKeychain()

  const onCancel = () => setShouldShowCamera(false)

  const onScan = console.log

  useEffect(() => {
    void (async () => {
      try {
        await keychain.setWalletKey("password123")
        console.log(await keychain.getWalletKey())
      } catch (e) {
        console.error(e)
      }
    })()
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
