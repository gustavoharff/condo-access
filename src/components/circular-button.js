import * as Haptics from "expo-haptics";
import React, { useState, useRef } from "react";
import { StyleSheet, View, Animated, PanResponder, Easing } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const ENTER_TIME = 675;
const EXIT_TIME = 125;
const SIZE_LARGE = 80;
const SIZE_SMALL = 60;
const ICON_SMALL = 28;
const ICON_LARGE = 40;
const BORDER_LARGE = 16;
const BORDER_SMALL = 12;
const circleRef = React.createRef();
const OPTIONS = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export function ButtonCircular({ onRelease, onPress, small }) {
  const [animate, setAnimate] = useState(null);
  const [lottieScale] = useState(new Animated.Value(0));
  const [progress] = useState(new Animated.Value(0));
  const isPressing = useRef(false);
  const timer = useRef(null);
  const iconSize = small ? ICON_SMALL : ICON_LARGE;
  const size = small ? SIZE_SMALL : SIZE_LARGE;
  const border = small ? BORDER_SMALL : BORDER_LARGE;
  const dynamicStyles = setStyles({ size, border });

  const releaseEnd = (ref) => {
    if (isPressing.current === false) {
      return;
    }
    const value = ref.state.fillAnimation._value;
    if (value > 0) {
      ref.animate(0, EXIT_TIME);
    }
    Animated.timing(lottieScale, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setAnimate(false);
      isPressing.current = false;
      if (onRelease) {
        onRelease();
      }
    });
  };

  const release = async (ref) => {
    if (isPressing.current === true) {
      return;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    isPressing.current = true;
    setAnimate(true);
    if (onPress) {
      onPress();
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // ReactNativeHapticFeedback.trigger("impactHeavy", OPTIONS);
    Animated.spring(lottieScale, {
      toValue: 1.25,
      friction: 8,
      tension: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 125,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        timer.current = setTimeout(() => {
          if (isPressing.current === true) {
            releaseEnd(ref);
          }
        }, 250);
      });
    });
  };

  const responderRelease = () => {
    if (isPressing.current === false) {
      const value = circleRef.current.state.fillAnimation._value;
      if (value > 0) {
        circleRef.current.animate(0, EXIT_TIME);
      }
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      if (isPressing.current === true) {
        return false;
      }
      circleRef.current.animate(100, ENTER_TIME);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: responderRelease,
  });

  return (
    <View {...panResponder.panHandlers}>
      <AnimatedCircularProgress
        size={size + border * 2}
        width={border}
        fill={0}
        rotation={0}
        backgroundColor="rgba(255,255,255,0.1)"
        tintColor="rgba(255,255,255,0.1)"
        onAnimationComplete={({ finished }) => {
          if (circleRef.current) {
            const ref = circleRef.current;
            const value = ref.state.fillAnimation._value;
            if (value === 100) {
              release(ref);
            }
          }
        }}
        lineCap="round"
        ref={circleRef}
      />
      <View style={[styles.content, dynamicStyles.content]}>
        {animate && (
          <Animated.View
            style={[
              dynamicStyles.lottieWrapper,
              styles.lottieWrapper,
              { transform: [{ scale: lottieScale }] },
            ]}
          >
            <MaterialCommunityIcons
              size={iconSize}
              name="check"
              color="rgba(255,255,255,1)"
            />
          </Animated.View>
        )}

        <MaterialCommunityIcons
          style={styles.icon}
          name="boom-gate-arrow-up"
          size={iconSize}
          color="rgba(255,255,255,0.4)"
        />
      </View>
    </View>
  );
}

const setStyles = ({ size, border }) => {
  return StyleSheet.create({
    lottieWrapper: {
      width: size,
      height: size, // 6
      borderRadius: size / 2,
    },
    content: {
      width: size,
      height: size,
      borderRadius: size / 2,
      left: border,
      top: border,
    },
  });
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
  },
  container: {},
  lottieWrapper: {
    zIndex: 10,
    backgroundColor: "#92d94c",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "red",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonCircular;
