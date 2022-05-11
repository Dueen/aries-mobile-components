import { StyleSheet, Text, View } from "react-native"
import { useKeychain } from "./packages/keychain"

const App = () => {
  const keychain = useKeychain("mock-service")
  keychain.storeAgentKey("foop").then((f) => console.log(f))
  keychain.getAgentKey().then((f) => console.log(f))
  return (
    <View style={styles.container}>
      <Text>hello</Text>
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

export default App
