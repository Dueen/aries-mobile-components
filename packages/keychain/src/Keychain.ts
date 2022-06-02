import * as RNKeychain from 'react-native-keychain'
import argon2 from 'react-native-argon2'
import { MMKV } from 'react-native-mmkv'

const store = new MMKV()

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

type KeychainProps = WithRequired<RNKeychain.Options, 'service'>

/**
 * simple class to interact with the keychain about your wallet key
 *
 * @todo fix the accessControl on iOS 15
 * {@link https://github.com/oblador/react-native-keychain/issues/509 issue}
 *
 * @remarks
 * The accessControl, enabling biometrics, is currently broken in iOS 15
 */
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
    this.setSalt()
    this.service = service
    this.options = {
      service,
      accessControl,
      securityLevel,
      storage,
      rules,
      authenticationType,
      accessible,
    }
    // this.options = { service, securityLevel, storage, rules, authenticationType, accessible }
  }

  /**
   * Set the wallet key
   * This uses {@link https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf Argon2} for key derivation
   *
   * @remarks
   * This explicitly uses `argon2i`. This is the slower option, but it is heavily preferred for pasword-based key derivation
   *
   * The performance should not be an issue, but if it is, switching to `argon2d` is an option
   *
   * @remarks
   * This function will trigger the biometrics if these are enabled on the device
   *
   * @param key - the simple password supplied by the user
   *
   * @returns Promise<boolean | Result> indicating with false if it was not set and Result when it went correctly
   */
  public async setWalletKey(key: string) {
    const walletKey = await this.deriveWalletKey(key)
    return RNKeychain.setGenericPassword(this.service, walletKey, this.options)
  }

  /**
   * Get the wallet key
   *
   * @remarks
   * This function will trigger the biometrics if these are enabled on the device
   *
   * @returns The password if it can be found
   * @returns False if the key could not be found for any reason
   */
  public async getWalletKey(): Promise<string | false> {
    try {
      const walletKey = await RNKeychain.getGenericPassword(this.options)
      return walletKey ? walletKey.password : false
    } catch {
      return false
    }
  }

  /**
   * Resets the wallet key and its salt
   *
   * @param shouldResetSalt - Whether it should also reset the salt used
   *
   * @returns Promise<boolean> indicating if the reset was successful
   */
  public resetWalletKey(shouldResetSalt = true) {
    if (shouldResetSalt) {
      store.delete('salt')
      this.setSalt()
    }
    RNKeychain.resetGenericPassword(this.options)
  }

  /**
   * A simple check to see whether your device supports biometry unlock
   *
   * @returns Promise<boolean> indicating if the device supports biometry unlock
   */
  public async supportsBiometryUnlock() {
    const biometryType = await RNKeychain.getSupportedBiometryType(this.options)

    return biometryType !== null
  }

  /**
   * Derive the password
   *
   * @param {string} password - The string value of the password
   */
  private async deriveWalletKey(password: string) {
    const salt = this.getSalt()
    const { rawHash } = await argon2(password, salt, { mode: 'argon2i' })
    return rawHash
  }

  /**
   * Get the salt from storage
   *
   * @throws When the salt could not be found
   */
  public getSalt() {
    const salt = store.getString('salt')
    if (!salt)
      throw new Error(
        'No salt has been set during the initialization of the keychain. Make sure it is wrapped inside a KeychainProvider. \n If this occurs after calling `resetWalletKey, make sure to call `useKeychain` again.'
      )
    return salt
  }

  /**
   * Set a salt
   *
   * @remarks
   * Unable to overwrite the previous salt
   */
  private setSalt() {
    try {
      this.getSalt()
    } catch {
      store.set('salt', crypto.getRandomValues(new Uint8Array(32)).join(''))
    }
  }
}
