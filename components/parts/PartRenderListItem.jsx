import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { useState } from 'react';

const PartRenderItem = ({ item, setSelectedItem, setModalVisible }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
                console.log('set visible');
                console.log(item);
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