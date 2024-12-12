import * as React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import Loading from '../assets/lotties/ozjfFT2zEu.json';

const Loader = () => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.loaderContainer}>
                    <AnimatedLottieView
                        source={Loading}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderContainer: {
        width: 140,
        height: 120,
        backgroundColor: 'transparent',
    },
    lottie: {
        width: 120,
        height: 120,
    },
});

export default Loader;
