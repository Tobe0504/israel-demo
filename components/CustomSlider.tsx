import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    LayoutChangeEvent,
    TouchableWithoutFeedback,
} from 'react-native';

interface CustomSliderProps {
    minValue: number;
    maxValue: number;
    initialMinValue: number;
    initialMaxValue: number;
    onValueChange?: (min: number, max: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
    minValue,
    maxValue,
    initialMinValue,
    initialMaxValue,
    onValueChange,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [leftThumbPos, setLeftThumbPos] = useState(0);
    const [rightThumbPos, setRightThumbPos] = useState(0);
    const leftThumbRef = useRef(new Animated.Value(0)).current;
    const rightThumbRef = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (sliderWidth > 0) {
            const leftPos = ((initialMinValue - minValue) / (maxValue - minValue)) * sliderWidth;
            const rightPos = ((initialMaxValue - minValue) / (maxValue - minValue)) * sliderWidth;

            setLeftThumbPos(leftPos);
            setRightThumbPos(rightPos);
            leftThumbRef.setValue(leftPos);
            rightThumbRef.setValue(rightPos);
        }
    }, [sliderWidth, initialMinValue, initialMaxValue, minValue, maxValue]);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
    };

    const positionToValue = (position: number) => {
        return minValue + (position / sliderWidth) * (maxValue - minValue);
    };

    const panResponderLeft = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            const newPos = Math.max(0, Math.min(rightThumbPos, leftThumbPos + gesture.dx));
            setLeftThumbPos(newPos);
            leftThumbRef.setValue(newPos);

            if (onValueChange) {
                onValueChange(
                    Math.round(positionToValue(newPos)),
                    Math.round(positionToValue(rightThumbPos))
                );
            }
        },
    });

    const panResponderRight = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            const newPos = Math.min(sliderWidth, Math.max(leftThumbPos, rightThumbPos + gesture.dx));
            setRightThumbPos(newPos);
            rightThumbRef.setValue(newPos);

            if (onValueChange) {
                onValueChange(
                    Math.round(positionToValue(leftThumbPos)),
                    Math.round(positionToValue(newPos))
                );
            }
        },
    });

    const onTrackPress = (event: any) => {
        const locationX = event.nativeEvent.locationX;
        const leftDist = Math.abs(locationX - leftThumbPos);
        const rightDist = Math.abs(locationX - rightThumbPos);

        if (leftDist <= rightDist) {
            setLeftThumbPos(locationX);
        } else {
            setRightThumbPos(locationX);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={onTrackPress}>
            <View style={styles.container} onLayout={onLayout}>
                <View style={styles.track} />
                <View
                    style={[
                        styles.activeTrack,
                        {
                            left: leftThumbPos,
                            width: rightThumbPos - leftThumbPos,
                        }
                    ]}
                />
                <Animated.View
                    {...panResponderLeft.panHandlers}
                    style={[styles.thumb, { left: leftThumbPos }]}
                />
                <Animated.View
                    {...panResponderRight.panHandlers}
                    style={[styles.thumb, { left: rightThumbPos }]}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
    },
    track: {
        height: 2,
        backgroundColor: '#000',
        width: '100%',
        position: 'absolute',
    },
    activeTrack: {
        height: 2,
        backgroundColor: '#000',
        position: 'absolute',
    },
    thumb: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FFCA05',
        position: 'absolute',
        top: 7,
        marginLeft: -8,
    },
});

export default CustomSlider;
