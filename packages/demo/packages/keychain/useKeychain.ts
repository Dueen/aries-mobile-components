import { Keychain } from "./Keychain"

let keychain: Keychain

export const useKeychain = (service?: string) => {
  keychain = service ? new Keychain({ service }) : keychain
  return keychain
}
