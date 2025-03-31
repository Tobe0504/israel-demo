import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomRadioButton from '../components/CustomRadioButton';
import CustomSlider from '../components/CustomSlider';

const { width } = Dimensions.get('window');

const FilterScreen: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [activeFilter, setActiveFilter] = useState<string | null>("price");
    const [minPrice, setMinPrice] = useState<number>(25);
    const [maxPrice, setMaxPrice] = useState<number>(336);
    const [temperature, setTemperature] = useState<string>('Cool');

    const handleClearSearch = (): void => {
        setSearchText('');
    };

    const toggleFilter = (filter: string): void => {
        if (activeFilter === filter) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filter);
        }
    };

    const handleRangeChange = (min: number, max: number): void => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const renderFilterContent = (): React.ReactNode => {
        if (activeFilter === 'price') {
            return (
                <View style={styles.filterContent}>
                    <View style={styles.priceLabels}>
                        <Text style={styles.priceTagText}>{minPrice}</Text>
                        <Text>—</Text>
                        <Text style={styles.priceTagText}>{maxPrice}</Text>
                    </View>

                    <View style={styles.sliderContainer}>
                        <CustomSlider
                            minValue={0}
                            maxValue={1000000}
                            initialMinValue={minPrice}
                            initialMaxValue={maxPrice}
                            onValueChange={handleRangeChange}
                        />
                    </View>
                </View>
            );
        } else if (activeFilter === 'temperature') {
            return (
                <View style={styles.filterContent}>
                    <CustomRadioButton
                        selected={temperature === 'Cool'}
                        onPress={() => setTemperature('Cool')}
                        label="Cool"
                    />
                    <CustomRadioButton
                        selected={temperature === 'Neutral'}
                        onPress={() => setTemperature('Neutral')}
                        label="Neutral"
                    />
                    <CustomRadioButton
                        selected={temperature === 'Warm'}
                        onPress={() => setTemperature('Warm')}
                        label="Warm"
                    />
                </View>
            );
        }

        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftPanel}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Filters"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                            <Text style={styles.clearText}>Clear all</Text>
                            <Ionicons name="close" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.filterOption,
                            activeFilter === 'price' && styles.activeFilterOption
                        ]}
                        onPress={() => toggleFilter('price')}
                    >
                        <Text style={styles.filterText}>Price</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterOption,
                            activeFilter === 'temperature' && styles.activeFilterOption
                        ]}
                        onPress={() => toggleFilter('temperature')}
                    >
                        <Text style={styles.filterText}>Temperature</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <View style={styles.verticalLine} />
                </View>

                <View style={styles.rightPanel}>
                    {renderFilterContent()}
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    leftPanel: {
        width: '40%',
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
        position: 'relative',
    },
    rightPanel: {
        width: '60%',
        padding: 15,
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 1,
        backgroundColor: '#E0E0E0',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        fontWeight: 'bold',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearText: {
        color: '#000',
        marginRight: 5,
        fontSize: 14,
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#828282',
    },
    activeFilterOption: {
        backgroundColor: '#F5F5F5',
    },
    filterText: {
        fontSize: 16,
    },
    filterContent: {
        padding: 10,
    },
    priceLabels: {
        gap: 10,
        marginTop: 200,
        flexDirection: 'row',
        marginHorizontal: "auto"
    },
    priceTagText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'medium',
    },
    sliderContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footer: {
        padding: 15,
        backgroundColor: '#FFCA05',
    },
    applyButton: {
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 5,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default FilterScreen;