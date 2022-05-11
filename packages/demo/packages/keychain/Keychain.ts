import * as RNKeychain from "react-native-keychain"

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

type KeychainProps = WithRequired<RNKeychain.Options, "service">

export class Keychain {
  private service: string
  private options: RNKeychain.Options

  public constructor({
    service,
    accessControl = RNKeychain.ACCESS_CONTROL.BIOMETRY_ANY,
    securityLevel = RNKeychain.SECURITY_LEVEL.SECURE_HARDWARE,
    storage = RNKeychain.STORAGE_TYPE.RSA,
    rules = RNKeychain.SECURITY_RULES.NONE,
    authenticationType = RNKeychain.AUTHENTICATION_TYPE.BIOMETRICS,
    accessible = RNKeychain.ACCESSIBLE.WHEN_UNLOCKED,
  }: KeychainProps) {
    this.service = service
    this.options = { service, accessControl, securityLevel, storage, rules, authenticationType, accessible }
  }

  public storeAgentKey(key: string) {
    return RNKeychain.setGenericPassword(this.service, key, this.options)
  }

  public async getAgentKey(): Promise<string | false> {
    try {
      const walletKey = await RNKeychain.getGenericPassword(this.options)
      return walletKey ? walletKey.password : false
    } catch {
      return false
    }
  }

  public resetAgentKey() {
    RNKeychain.resetGenericPassword(this.options)
  }

  public async supportsKeychainUnlock() {
    const biometryType = await RNKeychain.getSupportedBiometryType(this.options)

    return biometryType !== null
  }
}
