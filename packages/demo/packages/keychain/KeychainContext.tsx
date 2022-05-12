import { createContext, FC, useContext } from "react"
import { Keychain } from "./Keychain"

const KeychainContext = createContext<null | Keychain>(null)

type KeychainProviderOptions = {
  service: string
}

export const KeychainProvider: FC<KeychainProviderOptions> = ({ children, service }) => {
  const keychain = new Keychain({ service })
  return <KeychainContext.Provider value={keychain}>{children}</KeychainContext.Provider>
}
export const useKeychain = () => {
  const context = useContext(KeychainContext)
  if (!context) throw new Error("useContext must be used within a KeychainContext")
  return context
}
