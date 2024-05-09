import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { useState } from 'react';

const PartRenderItem = ({ item }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                console.log('pressed');
            }}>
                <View style={Styles.listItemContainer}>
                    <View>
                        <View style={Styles.listItemHeader}>
                            <Text style={Styles.listItemHeaderText}>{item.name}</Text>
                        </View>
                        <View style={Styles.listItemInfo}>
                            <Text style={Styles.listItemInfoText}>Amount</Text>
                        </View>
                        <View style={Styles.listItemInfo}>
                            <Text style={Styles.listItemInfoText}>Warning</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        </View>
    );
}

export default PartRenderItem;