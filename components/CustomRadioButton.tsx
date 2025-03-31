import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export interface RadioButtonProps {
    selected: boolean;
    onPress: () => void;
    label: string;
}

const CustomRadioButton: React.FC<RadioButtonProps> = ({
    selected,
    onPress,
    label
}) => {
    return (
        <TouchableOpacity style={styles.radioOption} onPress={onPress}>
            <View style={styles.radioCircle}>
                {selected && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        height: 18,
        width: 18,
        borderRadius: 25,
        backgroundColor: '#FFCA05',
    },
    radioLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default CustomRadioButton;