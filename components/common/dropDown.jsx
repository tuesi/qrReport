import { View, StyleSheet, TextInput, TouchableOpacity, Animated, ScrollView, Text, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import * as Color from '../../styles/colors';
import GlobalStyles from "../../styles/styles";

const DropDown = ({ data, getSelected, newValue, valuePlaceholder = 'Vartotojo vardas', searchPlaceholder = 'Pasirinkite vartotoja', notFoundText = 'not found', addNew, labelText, resetRef }) => {

    const [selectedval, setSelectedVal] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    const [searchText, setSearchText] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const height = 250;

    const animatedvalue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (resetRef) {
            resetRef.current = resetDropDown;
        }
    }, [resetRef]);

    useEffect(() => {
        setTimeout(() => { setFilteredData(data) }, 800);
    }, [data])

    const resetDropDown = () => {
        setSelectedVal("");
        setSearchText("");
        slideup();
    };

    const slidedown = () => {
        setDropdown(true)
        Animated.timing(animatedvalue, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,

        }).start()
    }

    const slideup = () => {
        Animated.timing(animatedvalue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,

        }).start(() => setDropdown(false))
    }

    return (
        <View style={{ width: '100%' }}>
            {labelText ? (
                <View style={GlobalStyles.textContainer}>
                    <Text style={GlobalStyles.textStyle}>{labelText}</Text>
                </View>
            ) : null}
            {
                (dropdown)
                    ?
                    <View style={[styles.searchBar]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            {
                                <Ionicons name={"search"} size={20} color="grey" style={{ marginRight: 7 }} />
                            }

                            <TextInput
                                placeholder={searchPlaceholder}
                                onChangeText={(val) => {
                                    let result = data.filter((item) => {
                                        val.toLowerCase();
                                        let row = item.label.toLowerCase()
                                        return row.search(val.toLowerCase()) > -1;
                                    });
                                    setSearchText(val);
                                    setFilteredData(result)
                                }}
                                style={[{ padding: 0, height: 20, flex: 1, fontWeight: 'bold', fontSize: 20 }]}
                            />
                            <TouchableOpacity onPress={() => { slideup(); setTimeout(() => { setFilteredData(data) }, 800) }} >
                                {
                                    <Ionicons name={"close"} size={30} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={[styles.searchBar]} onPress={() => { if (!dropdown) { Keyboard.dismiss(); slidedown() } else { slideup(); } }}>
                        <Text style={{ fontWeight: 'bold', color: selectedval == "" ? '#c4c5c6' : 'black', fontSize: 20 }}>{(selectedval == "") ? valuePlaceholder : selectedval}</Text>
                        {
                            <Ionicons name={"chevron-down-outline"} size={30} color="black" />
                        }

                    </TouchableOpacity>
            }

            {
                (dropdown)
                &&
                <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown]}>
                    <ScrollView contentContainerStyle={{ paddingVertical: 10, overflow: 'hidden' }} nestedScrollEnabled={true}>

                        {
                            (filteredData.length >= 1)
                                ?
                                filteredData.map((item, index) => {
                                    let value = item.label ?? item;
                                    return (
                                        <TouchableOpacity style={[styles.option]} key={index} onPress={() => {
                                            getSelected(item.value);
                                            setSelectedVal(value)
                                            slideup()
                                            setTimeout(() => { setFilteredData(data) }, 800)

                                        }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{value}</Text>
                                        </TouchableOpacity>
                                    )

                                })
                                :
                                <TouchableOpacity style={[styles.option]} onPress={() => {
                                    addNew ? getSelected(searchText) : getSelected('');
                                    addNew ? setSelectedVal(searchText) : setSelectedVal('');
                                    addNew ? newValue(searchText) : null;
                                    slideup()
                                    setTimeout(() => setFilteredData(data), 800)

                                }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{addNew ? `Sukurti: ` + searchText : notFoundText}</Text>
                                </TouchableOpacity>
                        }
                    </ScrollView>
                </Animated.View>
            }
        </View >
    )
}

export default DropDown;

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    dropdown: {
        borderRadius: 10,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 5
    },
    option: { paddingHorizontal: 20, paddingVertical: 10, overflow: 'hidden' },
})