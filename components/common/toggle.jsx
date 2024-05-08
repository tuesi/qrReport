import React, { useState, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native';
import * as Color from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';


const Toggle = ({ isActive, setIsActive }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    const titles = ['Įranga', 'Naujas'];
    const [knobNameValue, setknobNameValue] = useState(titles[0]);

    const toggleSwitch = () => {
        // Toggle the state first
        setIsActive(prevIsActive => !prevIsActive);

        setTimeout(() => {
            setknobNameValue(isActive ? titles[0] : titles[1])
        }, 200)

        // Start the movement animation
        Animated.timing(animatedValue, {
            toValue: isActive ? 0 : 1,  // Will use the current state to decide direction
            duration: 250,
            useNativeDriver: true
        }).start();

        // Sequence the opacity animation to fade out and then fade back in
        Animated.parallel([
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 0,  // Fade out first
                    duration: 125,
                    useNativeDriver: true
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,  // Then fade back in
                    duration: 120,
                    useNativeDriver: true
                })
            ])
        ]).start()
    };

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80]
    });

    const opacityAnim = opacityValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.1, 1]
    });

    return (
        <TouchableWithoutFeedback onPress={toggleSwitch}>
            <LinearGradient
                style={styles.switchContainer}
                colors={(['#cfcfcf30', '#ffffff'])}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            >
                <Animated.Text style={[styles.sideText, { left: 40, opacity: opacityAnim }]}>{titles[1]}</Animated.Text>
                <Animated.Text style={[styles.sideText, { left: -40, opacity: opacityAnim }]}>{titles[0]}</Animated.Text>
                <Animated.View style={[styles.knob, { transform: [{ translateX }] }]}>
                    <Animated.Text style={[styles.knobText, { opacity: opacityAnim }]}>{knobNameValue}</Animated.Text>
                </Animated.View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        width: 160,
        height: 45,
        justifyContent: 'center',
        borderRadius: 20
    },
    knob: {
        position: 'absolute',
        width: 80,
        height: '100%',
        backgroundColor: '#a7c8ec',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    knobText: {
        color: 'white',
        fontWeight: 'bold'
    },
    sideText: {
        position: 'absolute',
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    }
});

export default Toggle;