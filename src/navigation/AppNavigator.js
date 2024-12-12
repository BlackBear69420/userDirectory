
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../screens/Home'
import UserDetails from '../screens/UserDetails'
const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
        <Stack.Screen options={{ headerShown: false }} name='UserDetails' component={UserDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator