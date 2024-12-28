import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { db } from '../../config/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProductListItem from './ProductListItem';

const ProductListByCategory = () => {
  const [productList, setProductList] = useState([]);

  const GetProductList = async (category) => {
    try {
      setProductList([]);
      const q = query(collection(db, 'Product'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc=>{
        setProductList(productList=>[...productList,doc.data()])

      })
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <View>
      <Category category={(value) => GetProductList(value)} />
      <FlatList
        data={productList}
        style={{
          marginTop: 10,
        }}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default ProductListByCategory;
