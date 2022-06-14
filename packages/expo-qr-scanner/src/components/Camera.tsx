import type { CameraProps as ExpoCameraProps } from 'expo-camera'
import type { PropsWithChildren } from 'react'
import { Platform, StyleProp, ViewStyle } from 'react-native'

import { Camera as ExpoCamera, PermissionStatus } from 'expo-camera'
import React, { forwardRef, useRef } from 'react'
import { Text, Dimensions, StyleSheet, View } from 'react-native'

type ExtendedExpoCameraProps = ExpoCameraProps & { renderNoPermission?: () => React.ReactNode }

export const Camera = forwardRef<ExpoCamera, PropsWithChildren<ExtendedExpoCameraProps>>((props, ref) => {
  const { renderNoPermission = () => <Text>No permissions granted</Text> } = props;
  const [permissionResponse] = ExpoCamera.useCameraPermissions({
    get: true,
    request: true,
  })

  const localRef = useRef<ExpoCamera>(null)
  const cameraRef = ref ?? localRef

  if (permissionResponse === null) {
    return null
  }

  if (permissionResponse.status !== PermissionStatus.GRANTED) {
    return <View>{renderNoPermission()}</View>;
  }

  // Android has issues with aspect ratio
  let cameraStyle: StyleProp<ViewStyle> = StyleSheet.absoluteFill
  if (Platform.OS === 'android') {
    const { width, height } = Dimensions.get('screen')
    const cameraWidth = (height / 16) * 9
    const widthOffset = -(cameraWidth - width) / 2
    cameraStyle = { height: height, width: cameraWidth, left: widthOffset }
  }

  return <ExpoCamera style={cameraStyle} ref={cameraRef} {...props} ratio="16:9" />
})
