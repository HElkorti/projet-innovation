import React from 'react'
import { Switch, View, StyleSheet} from 'react-native'

export default function Toggle(propos) {
  return (
    <View>
        <Text style={styles.text}>{propos.value?'ON':'OFF'}</Text>
        <Switch
            style={styles.switch}
            value={propos.value}
            onValueChange={propos.onValueChange}
        />
    </View>
  )
}
