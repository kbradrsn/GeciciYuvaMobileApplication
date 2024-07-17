import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarModal = ({ visible, onClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setNote(''); 
  };

  const handleSave = () => {
    onSelectDate({ date: selectedDate, note });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Lütfen bir tarih seçiniz</Text>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
            }}
          />
          {selectedDate ? (
            <>
              <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
                placeholder="Not ekleyin"
                multiline
              />
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </>
          ) : null}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#a07bba',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#a07bba',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CalendarModal;
