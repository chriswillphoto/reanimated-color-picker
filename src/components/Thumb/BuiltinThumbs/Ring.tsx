import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import colorKit from '@colorKit';
import { styles } from '@styles';
import { enableAndroidHardwareTextures } from '@utils';

import type { BuiltinThumbsProps } from '@types';

export default function Ring({
  width,
  height,
  borderRadius,
  thumbColor,
  adaptiveColor,
  handleStyle,
  innerStyle,
  solidColor,
  style,
}: BuiltinThumbsProps) {
  const thumb_Color = thumbColor ? colorKit.HEX(thumbColor) : undefined;
  const computedStyle = {
    width,
    height,
    borderRadius,
    backgroundColor: (thumb_Color || '#ffffff') + 50,
    borderColor: thumbColor,
    borderWidth: 1,
  };

  const adaptiveColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: (thumbColor && thumbColor + '50') || (adaptiveColor.value === '#ffffff' ? '#ffffff50' : '#00000050'),
      borderColor: thumbColor || adaptiveColor.value,
    };
  }, [thumbColor, adaptiveColor]);

  // Make sure to match the parity (odd or even) of the parent width, to solve the centering issue
  const innerWidth = 0.75 * width;
  const innerSize = width % 2 === 0 ? Math.floor(innerWidth / 2) * 2 : Math.floor(innerWidth / 2) * 2 + 1;

  return (
    <Animated.View
      style={[styles.handle, style, computedStyle, adaptiveColorStyle, handleStyle]}
      renderToHardwareTextureAndroid={enableAndroidHardwareTextures}
    >
      <Animated.View
        style={[styles.shadow, { borderRadius, zIndex: 100, width: innerSize, height: innerSize }, solidColor, innerStyle]}
      />
    </Animated.View>
  );
}
