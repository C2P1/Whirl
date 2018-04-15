import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'

import { colors, fonts } from '../theme'

export default ({ placeholder, onChangeText, type, placeholderTextColor="#ffffff", multiline=false,...props }) => (
  <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    style={[styles.input]}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    onChangeText={value => onChangeText(type, value)}
    underlineColorAndroid='transparent'
    multiline={multiline}
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    color: '#ffffff',
    padding: 10,
    borderBottomWidth: 1.5,
    fontSize: 16,
    borderBottomColor: colors.primary,
    fontFamily: fonts.light,
    fontWeight: 'bold',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
})
