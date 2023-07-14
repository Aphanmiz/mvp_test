import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({onDayPress }) => {
const [selectedDate, setSelectedDate] = useState('');
const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    onDayPress(day.dateString);
  };

  return (
    <Calendar
      theme={{
        arrowColor: '#8222F8',
        todayTextColor: '#8222F8',
        calendarBackground: '#F0F0F0',
        textDisabledColor: '#b6c1cd',
      }}
      enableSwipeMonths={true}
      showWeekNumbers={true}
      onDayPress={handleDayPress}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: '#8222F8',
          selectedTextColor: '#ffffff',
        }
      }}
    />
  );
};

export default CalendarComponent;