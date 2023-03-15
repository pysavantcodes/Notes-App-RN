import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Feather';
import {useStorage} from '../context/StorageContext';

const {width, height} = Dimensions.get('screen');

const Modal = ({onClose, modalMode, titleVal, detailsVal, id, edited}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const {notes, setData} = useStorage();

  useEffect(() => {
    if (title === '' || details === '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [details, title]);

  const createNote = async() => {
    const data = {title, details, lastEdited: Date.now(), createdAt: Date.now()};
    setData([...notes, data]);
    onClose();
  };
  const editNote = async() => {
    const updatedNotes = notes.map(note => {
      if (note.createdAt === id) {
        return {...note, title:title, details:details, lastEdited:Date.now()};
      } else {
        return note; 
      }
    });
    ToastAndroid.show('Changes Saved!', 3000);
    setData(updatedNotes);
    onClose();
    edited();
    
  };

  useEffect(() => {
    if(modalMode === "edit"){
      setTitle(titleVal);
      setDetails(detailsVal)
    }
  }, [])
  

  return (
    <KeyboardAvoidingView behavior="height" style={styles.bg}>
      <View style={styles.modal}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: 'black',
              fontSize: 18,
            }}>
            {modalMode === "create" ? "Create" : "Edit"} Note
          </Text>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'rgba(0,0,0,0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <IonIcon name="x" color="black" size={20} />
          </TouchableOpacity>
        </View>
        <TextInput
          cursorColor={'#d3d3d3'}
          value={title}
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
            color: 'black',
            borderWidth: 1.3,
            padding: 7,
            paddingHorizontal: 13,
            marginVertical: 10,
            borderColor: 'black',
          }}
          placeholder="Title"
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          cursorColor={'#d3d3d3'}
          value={details}
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
            color: 'black',
            borderWidth: 1.3,
            padding: 7,
            paddingHorizontal: 13,
            marginVertical: 10,
            borderColor: 'black',
            marginTop: 0,
            textAlignVertical: 'top',
            maxHeight: 200,
          }}
          placeholder="Note"
          multiline
          numberOfLines={6}
          onChangeText={text => setDetails(text)}
        />
        <TouchableOpacity
          disabled={btnDisabled}
          onPress={() => modalMode ==="edit" ?  editNote() : createNote()}
          style={{
            backgroundColor: 'black',
            elevation: 3,
            padding: 14,
            ...(btnDisabled && {opacity: 0.6}),
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {modalMode === "create" ? "Create Note" : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    elevation: 4,
  },
});
