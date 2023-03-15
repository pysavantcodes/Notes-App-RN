import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fab from '../components/Fab';
import Modal from '../components/Modal';
import Note from '../components/Note';
import {useStorage} from '../context/StorageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('screen');

const HomePage = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const {notes, setNotes, setData} = useStorage();
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState('create');

 
  const createTwoButtonAlert = () =>
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await setData(
            notes.filter(note => {
              return note.lastEdited !== selectedNote;
            }),
          );
        },
      },
    ]);
  const deleteAll = () =>
    Alert.alert('Delete All', 'Are you sure you want to delete all notes?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.removeItem('notes');
          setNotes([]);
        },
      },
    ]);

  useEffect(() => {
    ToastAndroid.show('Tip: Longpress on Note to delete note.', 3000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      bounces
      bouncesZoom
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Poppins-Regular',
            color: 'black',
            textAlign: 'center',
            marginVertical: 17,
          }}>
          My Notes
        </Text>
        {showModal && (
          <Modal modalMode={modalMode} onClose={() => setShowModal(false)} />
        )}
        {notes.length > 0 && (
          <TouchableOpacity
            style={{marginBottom: 2}}
            onPress={() => {
              deleteAll();
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                textAlign: 'right',
                fontSize: 13,
              }}>
              CLEAR ALL
            </Text>
          </TouchableOpacity>
        )}
        <Fab pressed={() => setShowModal(true)} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
            overflow: 'hidden',
            flex: 1,
          }}
          horizontal={false}>
          {notes.length < 1 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '90%',
              }}>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                No Notes available
              </Text>
            </View>
          ) : (
            notes
              .sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited))
              .map(note => {
                return (
                  <Note
                    longPress={() => {
                      createTwoButtonAlert();
                      setSelectedNote(note.lastEdited);
                    }}
                    clicked={() =>
                      navigation.navigate('notesview', {param: note})
                    }
                    title={note.title}
                    details={note.details}
                    time={note.lastEdited}
                    keyVal={note.lastEdited}
                  />
                );
              })
          )}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 0,
    paddingHorizontal: 17,
    paddingTop: 17,
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
});
