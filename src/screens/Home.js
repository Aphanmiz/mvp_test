import React, { useState} from 'react';
import { View, Text, SafeAreaView, Modal, StyleSheet, Alert, Pressable } from 'react-native';
import { Calendar} from 'react-native-calendars';

// import CalendarComponent from '../components/CalendarComponent';
import JournalEdit from './JournalEdit';
import Actoon from './Actoon';
import LifeStats from './LifeStats';

const Home = () => {
  const [memoryVisible, setMemoryVisible] = useState(false);
  const [actoonVisible, setActoonVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        theme={{
          arrowColor: '#8222F8',
          todayTextColor: '#8222F8',
          calendarBackground: '#F0F0F0',
          textDisabledColor: '#b6c1cd',
        }}
        enableSwipeMonths={true}
        showWeekNumbers={true}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          console.log(selectedDate);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true, 
            selectedColor: '#8222F8',
            selectedTextColor: '#ffffff',
          }
        }}
      />
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={() => setMemoryVisible(true)}>
          <Text style={styles.textStyle}>Open Memory</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setActoonVisible(true)}>
          <Text style={styles.textStyle}>Open Actoon</Text>
        </Pressable>
      </View>

      {/* Pop up Journal / Actoon */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={memoryVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setMemoryVisible(!memoryVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <JournalEdit selectedDate={selectedDate} />
            <View style={styles.buttonView}>
              <Pressable
                onPress={() => setMemoryVisible(!memoryVisible)}>
                <Text style={{ color: '#8222F8' }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={actoonVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setActoonVisible(!actoonVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Actoon />
            <View style={styles.buttonView}>
              <Pressable
                onPress={() => setActoonVisible(!actoonVisible)}>
                <Text style={{ color: '#8222F8' }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <LifeStats />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    padding: "5%",
    width: '100%',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    paddingBottom:"5%",
    paddingTop: 0,
    // padding: "5%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    backgroundColor: '#8222F8',
    width: '35%',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30
  },
  variable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    paddingBottom: 20,
    margin: "10%",
    marginTop: "5%",
  },
  calendarItem: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    backgroundColor: 'skyblue',
  },
  itemText: {
    fontSize: 12,
  },
});
