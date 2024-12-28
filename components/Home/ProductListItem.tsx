import { Image, View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const ProductListItem = ({product}) => {
  return (
    <View style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
      <Image source={{uri:product?.imageUrl}}
      style={{
        width:150,
        height:135,
        objectFit:'cover',
        borderRadius:10
      }}
      />
     
      <Text style={{
        fontFamily:'outfits-medium',
        fontSize:17
      }}>{product.name}</Text>
       <View style={{
            display:'flex',
            
           
       }}>
      <Text style={{
        color:Colors.GRAY,
        fontFamily:'Outfits',
        

      }}>{product?.category}</Text>
      <Text style={{
        color:Colors.GRAY,
        fontFamily:'Outfits'
      }}>{product?.price}</Text>
      
      </View>
      <View style={{
        justifyContent:"center",
        alignItems:'center'
      }}>
        <Text>Add to card</Text>
      </View>
    </View>
  )
}

export default ProductListItem;