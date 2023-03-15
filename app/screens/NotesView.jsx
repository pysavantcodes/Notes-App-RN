import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Feather';
import Modal from '../components/Modal';

const NotesView = ({navigation, route}) => {
  const {param} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('edit');
  
  return (
    <ScrollView contentContainerStyle={{padding: 25, flex: 1}}>
      {showModal && (
        <Modal
          detailsVal={param.details}
          titleVal={param.title}
          modalMode={modalMode}
          id={param.createdAt}
          onClose={() => setShowModal(false)}
          edited={()=>navigation.navigate("home")}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('home')}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.09)',
            borderRadius: 40,
          }}>
          <IonIcon name={'arrow-left'} size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.09)',
            borderRadius: 40,
          }}>
          <IonIcon name={'edit-3'} size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Poppins-Medium',
            color: 'rgba(0,0,0,0.9)',
          }}>
          {param.title}
        </Text>
        <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
          {param.details}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NotesView;

const styles = StyleSheet.create({});
