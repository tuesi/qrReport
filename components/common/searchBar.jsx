import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Animated, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Color from '../../styles/colors';

const SearchBar = ({ setSearchText }) => {
    const [localSearchText, setLocalSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(true);
    const animateWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleSearch();
    }, [])

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const inputWidth = animateWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['90%', '0%']
    });

    const toggleSearch = () => {
        setLocalSearchText('');
        setSearchText('');
        Keyboard.dismiss();
        Animated.timing(animateWidth, {
            toValue: isFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
        setIsFocused(!isFocused);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.container}>
                <Animated.View style={{ width: inputWidth }}>
                    <TextInput
                        style={[isFocused ? styles.input : styles.input_hidden]}
                        placeholder="Įrenginio pavadinimas..."
                        placeholderTextColor={isFocused ? '#888' : 'transparent'}
                        value={isFocused ? undefined : ''}
                        onChangeText={text => setLocalSearchText(text)}
                        onEndEditing={() => {
                            setSearchText(localSearchText);
                        }}
                    />
                </Animated.View>
                <TouchableOpacity onPress={toggleSearch}>
                    <Ionicons name={isFocused ? "close" : "search"} size={30} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        height: 50
    },
    input: {
        height: '100%',
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        fontSize: 18,
        fontWeight: "bold",
        zIndex: 10
    },
    input_hidden: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        color: 'transparent'
    }
});

export default SearchBar;