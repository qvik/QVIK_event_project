import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View,FlatList, Pressable, TouchableOpacity, Image, Dimensions, SafeAreaView, Text, SectionList  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import {ListItem,} from 'react-native-elements';
import Colors from "../constants/colors";
import moment from "moment";

//get the width of the screen
const { width } = Dimensions.get("screen");

export default function EventsScreen({navigation}) {

  //constants
  const dataUrl = 'https://qvik.herokuapp.com/api/v1/events';
  const [mainEvent, setMainEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [venue, setVenue] = useState('');
  
  //header component 
  const LogoTitle = () => {
    return (
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{fontSize: 32, fontFamily: 'System', color: Colors.whiteColor}}>{mainEvent.title}</Text>
          <Text style={{fontSize: 16, fontFamily: 'System', color: Colors.whiteColor}}>{venue}, {moment(mainEvent.startDate).format("MMM Do")} - {moment(mainEvent.endDate).format("Do YYYY")}</Text>
        </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <LogoTitle/>,
      headerBackground: () => (
        <Image
          style={{ width: width, height: 150,}}
          source={require('../assets/mainPic.jpg')}
        />
      ),
    });
  }, [navigation]);
  
  //hooks
  useEffect(() => {
    getAllEvents();
  }, []);

  // get all events
  const getAllEvents = () => {
    const url = dataUrl;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => {
        setAllEvents(jsondata.data.subEvents);
        setMainEvent(jsondata.data.parentEvent)
        setVenue(jsondata.data.parentEvent.eventVenues[0].venue.name)
      }
    )
    .catch((error) => { 
        Alert.alert('Error', error); 
    });
  };

// store data in Favourites || to be moved to functions
const storeData = async (key, value) => {
  const keyStr = key.toString()
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(keyStr, jsonValue)
    Alert.alert("The event is saved in Favourites")
  } catch (e) {
    Alert.alert("Error in saving data");
  }
}

// remove data from Favorites || to be moved to functions
const removeData = async(key)=>{
  const keyStr = key.toString()
  try {
      await AsyncStorage.removeItem(keyStr);
      Alert.alert("The event is removed from Favourites")
    }
    catch (e) {
      Alert.alert("Error in removing data");
    }
};


//render the event
const Event = ({item}) => {

  let nowTime = moment().format('HH:mm:ss');
  let nowDate = moment().format('YYYY-MM-DD');
  let time = moment(item.startTime, "HH:mm:ss").format('LT');
  let duration = moment(item.endTime, "HH:mm:ss").diff(moment(item.startTime, "HH:mm:ss"), 'minutes')
  let stage = item.eventStages[0].stage['name']
  let title = item.title
  let id = item.eventId
  
  var passed = "";
  if (item.startTime > nowTime && item.startDate > nowDate) {
    passed = false;
  } else {
    passed = true;
  }
    
  const [favourite, setFavourite] = useState(false) 

  //handle saving/unsaving the event to Favourites 
  const handleFavouriteClick = () => {
    setFavourite(!favourite)
      if (!favourite) {
        storeData(id, { id, title, stage, venue, time, duration, favourite });
      }
      else if (favourite) {
        removeData(id)
      }
  }

  return ( // passed should be !passed (to change after tests!)
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Event details", id) // TO PASS TO THE EVENT PAGE
      }
    >
      <ListItem bottomDivider >
        <Icon 
          name={!favourite ? 'star-outline' : 'star-sharp'}
          type='ionicon'
          onPress={handleFavouriteClick}
        /> 
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{stage}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end', }}> 
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{time}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ color: passed ? Colors.blueColor : Colors.blackColor }}>{duration} min</ListItem.Subtitle>
          </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}

//return flatlist
  return (
      <SafeAreaView style={styles.screen}>
          <View style={{ }}>
            <FlatList 
                data={allEvents}
                keyExtractor={(item, index) => item + index} 
                //renderItem={({item}) => <Text>text</Text>}
                renderItem={({item}) => <Event item={item}/>}
            />
            
          </View>
      </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backwhite,
    paddingTop: StatusBar.currentHeight,
  },
  
}
);