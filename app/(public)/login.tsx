import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import { View, StyleSheet, TextInput, Button, Pressable, Text, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignInPress = async () => {
    setLoading(true);
    try {
      const response = await startOAuthFlow();
      console.log('OAuth Response:', response);
      const { createdSessionId } = response;
      if (!createdSessionId) {
        throw new Error('No session created.');
      }
      await setActive({ session: createdSessionId });
      Alert.alert('Success', 'Logged in with Google!');
    } catch (err) {
      console.error('OAuth Error:', err);
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      {/* Email and Password Login */}
      <TextInput
        autoCapitalize="none"
        placeholder="youremail@example.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <Button onPress={onSignInPress} title="Login" color={Colors.BUTTON_COLOR}></Button>

      {/* Google Sign-In Button */}
      <Pressable style={styles.googleButton} onPress={onGoogleSignInPress}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </Pressable>

      {/* Forgot Password and Create Account Links */}
      <Link href="/reset" asChild>
        <Pressable style={styles.link}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.link}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.HeadCOL,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  googleButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;
