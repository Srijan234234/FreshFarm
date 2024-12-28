import {  useAuth } from '@clerk/clerk-expo';
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {useFonts} from "expo-font";

const CLERK_PUBLISHABLE_KEY = 'pk_test_cmVhbC1zcXVpcnJlbC00OC5jbGVyay5hY2NvdW50cy5kZXYk';

const InitialLayout = () => {
  useFonts({
    'outfits':require('./../assests/fonts/Outfit-Regular.ttf'),
    'outfits-medium':require('./../assests/fonts/Outfit-Medium.ttf'),
    'outfits-bold':require('./../assests/fonts/Outfit-Bold.ttf'),
    'outfits-extrabold':require('./../assests/fonts/Outfit-ExtraBold.ttf'),
  })
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/wellcome');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
