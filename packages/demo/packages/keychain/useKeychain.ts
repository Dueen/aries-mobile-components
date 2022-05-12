import { useCallback } from "react"
import { Keychain } from "./Keychain"

export const useKeychain = (service: string) => useCallback(() => new Keychain({ service }), [service])
