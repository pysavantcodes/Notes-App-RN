import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Feather';

const Fab = ({pressed}) => {
  return (
    <TouchableOpacity
    onPress={()=>pressed()}
      style={{
        width: 55,
        height: 55,
        backgroundColor: 'black',
        borderRadius: 100,
        position:"absolute",
        right:25,
        bottom:25,
        alignItems:"center",
        justifyContent:'center',
        elevation:10,
        zIndex:5
      }}>
      <IonIcon name={"plus"} size={24} color={"white"}/>
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({});
