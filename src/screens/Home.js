import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JournalEdit from './JournalEdit';
import Actoon from './Actoon';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View style={{flex: 1}}>
        <Calendar
          theme={{
            arrowColor: 'purple',
            todayTextColor: '#8222F8',
            calendarBackground: '#F0F0F0',
          }}
          enableSwipeMonths={true}
          showWeekNumbers={true}
        />
        <Tab.Navigator
        tabBarOptions={{
          // style: { backgroundColor: 'whitesmoke' },
          activeTintColor: '#8222F8',
          upperCaseLabel: false,
          labelStyle: {
            fontSize: 10,
          },
          indicatorStyle: { height: 0 }
        }}>
        <Tab.Screen name="Memory" component={JournalEdit} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" size={20} color={color} />
          ),
        }}
        />
        <Tab.Screen name="Actoon" component={Actoon}
         options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={20} color={color} />
          ),
        }}
         />
      </Tab.Navigator>
    </View>
      

  );
};

export default Home;




// onDayPress={day => {
//   console.log('selected day', day);
// }}
// onMonthChange={month => {
//   console.log('month changed', month);
// }}
// renderArrow={direction => <Arrow />}
// onPressArrowLeft={subtractMonth => subtractMonth()}
// // Handler which gets executed when press arrow icon right. It receive a callback can go next month
// onPressArrowRight={addMonth => addMonth()}