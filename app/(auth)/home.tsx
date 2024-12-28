import { View, Text } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import ProductListByCategory from '../../components/Home/ProductListByCategory';

const Home = () => {
  const { user } = useUser();

  return (
    <View style={{
      padding:20,marginTop:20
    }}>
      {/*Header */}
      <Header/>

      {/*Slider*/}
      <Slider/>

      {/* Product Category and Poduct List */}
      <ProductListByCategory/>

    </View>
  );
};

export default Home;
