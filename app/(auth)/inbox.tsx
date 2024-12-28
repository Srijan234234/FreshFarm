import { View, Text } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import React from 'react'

const inbox = () => {
  const { user } = useUser();
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      </View>
    );
};
export default inbox;