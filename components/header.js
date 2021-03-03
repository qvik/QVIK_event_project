import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from "../constants/colors";

const { width } = Dimensions.get("screen");

export default AppHeader = (props) => {

  console.log('header props', props)

  const { title, subTitle, img, tags, navigation } = props;

  const Tag = () =>  {
    return (
      tags.map((item, index)=> 
          <View key={index + item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>)
      )
  }

  return (
    <View style={{ height: 185 }}>
      <ImageBackground source={img} style={{ width: width, height: 185}}  >
          
        <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingLeft: 10, paddingRight: 10, paddingTop: 50 }}>
          {!props.leftButton ? (<Text></Text> ) 
          : ( <Text></Text>
          )}
          {!props.rightButton ? (<Text></Text> ) 
          : ( <Icon
                name='close'
                type='ionicon'
                color='white'
                onPress={props.rightButton ? () => navigation.goBack() : {} }
              />
          )}
        </View>
        <View style={{ flex: 4, justifyContent: 'center', flexDirection: "column" }}>
          <Text style={{ fontSize: 32, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{title}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'System', color: Colors.whiteColor, marginLeft: 15 }}>{subTitle}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
            <Tag />
            </ScrollView>
        </View>
      </ImageBackground>
  </View>
  )
} 

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.backwhite,
      paddingTop: StatusBar.currentHeight,
    }, 
    tag: {
      backgroundColor: Colors.blueColor,
      padding: 6,
      margin: 8,
      borderRadius: 16,
    },
    tagText: {
      color: Colors.whiteColor,
      fontSize: 16
    },
    image: {
      flex: 1,
      width: width,
      height: 160,
      resizeMode: "cover",
      paddingTop: 10,
    },
  }
  );


  /* how to use: 

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false});
  }, [navigation]);


    let tags = ["No smoking", "No smoking", "No smoking", "No smoking", "No smoking", "No smoking"];

        <AppHeader 
          tags={tags}
          img={null}
          title={events.parentEvent.title} 
          subTitle={events.parentEvent.eventVenues[0].venue.name + ', ' + (moment(events.parentEvent.startDate).format("MMM Do") +  " - " + moment(events.parentEvent.endDate).format("Do YYYY"))}
          backButton={false}
          adminButton={true}
        />
  */