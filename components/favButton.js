import React from 'react';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/actions';
import theme from '../constants/theme';

const AppFavButton = ({item, text, color, size}) => {

    const { favourites } = useSelector(state => state.eventsReducer);
    const dispatch = useDispatch();
    
    const addToFavouriteList = event => dispatch(addFavourite(event));

    const removeFromFavouriteList = event => dispatch(removeFavourite(event));

    const handleAddFavourite = event => {
        addToFavouriteList(event);
        Alert.alert("The event is saved in Favourites")
    };

    const handleRemoveFavourite = event => {
        removeFromFavouriteList(event);
        Alert.alert("The event is removed from Favourites")
    };

    const ifExists = event => {
        if (favourites.filter(item => item.eventId === event.eventId).length > 0) {
            return true;
        }
        return false;
    };

    return (
        <TouchableOpacity
            style={styles.mainContainer}
            onPress={() =>
                ifExists(item) ? handleRemoveFavourite(item) : handleAddFavourite(item)
            }
            >
            <Icon
                size={size ? size : 22}
                name={ifExists(item) ? 'star-sharp' : 'star-outline'}
                type='ionicon'
                color={color}
            />
            {text ? <Text style={styles.text}>{text}</Text> : null }
        </TouchableOpacity>
    )
    
}
export default AppFavButton;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "flex-start", 
        flexDirection: "row",
    },
    text: {
        color: theme.colors.blueColor, 
        fontSize: theme.fontSizes.headerSubtitle, 
        paddingTop: 4, 
        paddingLeft: 5
    },
});