import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';


type Props = {
    imageUri?: string;
    handlePressed: () => void;
}
const ImageSelector = ({ imageUri, handlePressed}: Props) => {
    const PlaceholderImage = require('@/assets/images/placeholder.jpg');

    return (
        <Pressable className='relative' onPress={handlePressed}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Image source={PlaceholderImage} style={styles.image} />
            )}
            
        </Pressable>

    )
}

export default ImageSelector

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 18,
        resizeMode: 'cover'
    },

})