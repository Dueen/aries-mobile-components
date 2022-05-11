import { StyleSheet, Text, View } from "react-native"
import { name } from "./packages/biometrics"

const App = () => {
  return (
    <View style={styles.container}>
      <Text>package: {name}</Text>
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
