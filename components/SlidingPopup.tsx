import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  PanResponder,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';

const { height } = Dimensions.get('window');

interface SlidingPopupProps {
  visible: boolean;
  onClose: () => void;
  customView?: React.ReactNode;
  popupHeight?: number;
}

export default function SlidingPopup({ visible, onClose, customView, popupHeight }: SlidingPopupProps) {
  const effectiveHeight = popupHeight || height * 0.4;

  // Start fully hidden below the screen
  const slideAnim = useRef(new Animated.Value(effectiveHeight)).current;

  const [sliderValue, setSliderValue] = useState(50);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > effectiveHeight * 0.3) {
          Animated.timing(slideAnim, {
            toValue: effectiveHeight,
            useNativeDriver: true,
            duration: 300,
          }).start(() => {
            onClose();
          });
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: effectiveHeight,
        useNativeDriver: true,
        duration: 300,
      }).start();
    }
  }, [visible, effectiveHeight]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(slideAnim, {
              toValue: effectiveHeight,
              useNativeDriver: true,
              duration: 30,
            }).start(() => {
              onClose();
            });
          }}
        >
          <BlurView {...(Platform.OS === 'android' ? { experimentalBlurMethod: 'dimezisBlurView' } : {})} tint="dark" intensity={15} style={styles.backdrop} /> 
        </TouchableWithoutFeedback>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.popup,
            {
              transform: [{ translateY: slideAnim }],
              height: effectiveHeight,
            },
          ]}
        >
          {customView ? (
            <>
              <View
                style={{
                  backgroundColor: 'grey',
                  padding: '1%',
                  width: '15%',
                  alignSelf: 'center',
                  borderRadius: 36,
                }}
              />
              {customView}
            </>
          ) : (
            <>
              <Text style={styles.title}>Adjust Value:</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={sliderValue}
                onValueChange={setSliderValue}
                step={1}
              />
              <Text>Current Value: {Math.round(sliderValue)}</Text>
              <Button title="Close" onPress={onClose} />
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  popup: {
    backgroundColor: 'white',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  slider: { width: '100%', height: 40, marginBottom: 10 },
});
