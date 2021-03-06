import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { fonts, colors } from '../theme';

export default ({ title, onPress, isLoading, disabled = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ alignItems: 'center' }}
    disabled={disabled}
  >
    <View style={disabled ? styles.disabled : styles.button}>
      <Text style={disabled ? styles.disabledText : styles.buttonText}>
        {title}
      </Text>
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1.5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled: {
    marginTop: 25,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: fonts.light,
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  disabledText: {
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
    fontFamily: fonts.light,
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  activityIndicator: {
    transform: [{ scale: 0.7 }],
    marginTop: 3.5,
    marginLeft: 5
  }
});
