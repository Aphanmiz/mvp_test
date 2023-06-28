import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

const MatrixItem = ({ item }) => (
    <View style={styles.calendar_item}>
        <Text style={styles.calendar_text}>{item.value}</Text>
    </View>
);



const LifeStats = () => {
    // Assuming the user's birthday is provided as a JavaScript Date object
    const birthday = new Date('2002-08-12');
    const birthMonth = birthday.getMonth()

    // Calculate the number of days since the user's birthday
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - birthday.getTime();
    const daysSinceBirthday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksSinceBirthday = Math.floor(daysSinceBirthday / 7);
    const monthsSinceBirthday = Math.floor(daysSinceBirthday / 30.44);
    const logdays = 0;

    // Calculate the age based on the user's birthday
    const ageDate = new Date(timeDifference);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    let life_calendar = [];
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 12; j++) {
            const id = `${i}-${j}`;
            const value = ((i * 60) + j) < monthsSinceBirthday ? "x" : "";
            life_calendar.push({ id, value });
        }
    }

    const allMonths = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec "];
    const xAxis = [...allMonths.slice(birthMonth), ...allMonths.slice(0, birthMonth)]; // rearrange months
    const yAxis = Array.from({ length: 21 }, (_, i) => (i * 5).toString());

    return (<ScrollView style={styles.container}>
        <View>
            <Text style={styles.header}>Your Life Calendar</Text>
        </View>
        <View style={styles.matrix}>
            <View style={styles.yAxis}>
                {yAxis.map((year, index) => (
                    <Text key={index} style={styles.yAxisText}>{year}</Text>
                ))}
            </View>
            <View style={styles.matrixContainer}>
                <View style={styles.xAxis}>
                    {xAxis.map((month, index) => (
                        <Text key={index} style={styles.xAxisText}>{month}</Text>
                    ))}
                </View>
                <FlatList
                    data={life_calendar}
                    renderItem={MatrixItem}
                    numColumns={12}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
        <View style={styles.stats}>
            <Text style={styles.header}>You have logged</Text>
            <Text style={styles.text}>
                <Text style={styles.variable}> {logdays} </Text> days
            </Text>
            <Text style={styles.header}>You have lived</Text>

            <Text style={styles.text}>
                <Text style={styles.variable}> {years} </Text> years
                <Text style={styles.variable}> {months} </Text> months
                <Text style={styles.variable}> {days} </Text> days
            </Text>
            <Text style={styles.text}>
                <Text style={styles.variable}> {monthsSinceBirthday} </Text> months
            </Text>
            <Text style={styles.text}>
                <Text style={styles.variable}> {weeksSinceBirthday} </Text> weeks
            </Text>
            <Text style={styles.text}>
                <Text style={styles.variable}> {daysSinceBirthday} </Text> days
            </Text>

        </View>
    </ScrollView>
    );
}

export default LifeStats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        margin: "10%",
        marginTop: "3%",
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
        flex: 1,
        marginTop: 20,
    },
    calendar_item: {
        width: '8%',
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    calendar_text: {
        fontSize: 10,
        color: 'grey',
    },
    yAxis: {
        justifyContent: 'space-between',
        marginTop: 16,
    },
    yAxisText: {
        fontSize: 10,
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '96%',
    },
    xAxisText: {
        fontSize: 10,
        textAlign: 'center',
    },
    matrix: {
        flexDirection: 'row',
      },
});