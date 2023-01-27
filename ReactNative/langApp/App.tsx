import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) =>
        position.setValue({ x: dx, y: dy }),
      onPanResponderRelease: (e, gestureState) => {
        position.flattenOffset();
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
    })
  ).current;

  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['-360deg', '360deg'],
  });

  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255,99,71)', 'rgb(0,0,0)'],
  });

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          transform: [
            ...position.getTranslateTransform(),
            { rotateY: rotation },
          ],
          backgroundColor: bgColor,
        }}
      />
    </Container>
  );
}
