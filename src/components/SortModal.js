import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SortModal = ({ isVisible, onClose, onSort }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSort = (type) => {
        setSelectedOption(type); // Update the selected option
        onSort(type); // Trigger the onSort function
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            collapsable={true}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}
                        >
                            <Text style={{ marginLeft: 10, color: 'grey' }}>Sort by</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                            >
                                <FontAwesome name="close" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.sortOption}
                            onPress={() => handleSort('name-asc')}
                        >
                            <Text style={styles.optionText}>Name A ➱ Z</Text>
                            <FontAwesome
                                name={selectedOption === 'name-asc' ? 'dot-circle-o' : 'circle-o'}
                                size={20}
                                color="#2C3539"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sortOption}
                            onPress={() => handleSort('name-desc')}
                        >
                            <Text style={styles.optionText}>Name Z ➱ A</Text>
                            <FontAwesome
                                name={selectedOption === 'name-desc' ? 'dot-circle-o' : 'circle-o'}
                                size={20}
                                color="#2C3539"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sortOption}
                            onPress={() => handleSort('email-asc')}
                        >
                            <Text style={styles.optionText}>Email A ➱ Z</Text>
                            <FontAwesome
                                name={selectedOption === 'email-asc' ? 'dot-circle-o' : 'circle-o'}
                                size={20}
                                color="#2C3539"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sortOption}
                            onPress={() => handleSort('email-desc')}
                        >
                            <Text style={styles.optionText}>Email Z ➱ A</Text>
                            <FontAwesome
                                name={selectedOption === 'email-desc' ? 'dot-circle-o' : 'circle-o'}
                                size={20}
                                color="#2C3539"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default SortModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    sortOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 8,
    },
    optionText: {
        color: '#000',
    },
    closeButton: {
        padding: 10,
        alignItems: 'center',
    },
});
