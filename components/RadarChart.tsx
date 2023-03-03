import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

import colors from '../utils/colors';
import AppText from './AppText';
import TextDemiLight from './TextDemiLight';

type RadarData = {
  value: number;
  label: string;
};

interface Props {
  radarData: RadarData[];
  viewBoxSize?: number;
}

type Point = [number, number];

const svgY = (degrees: number) => degrees + 180;

const degToRadians = (degrees: number) => degrees * (Math.PI / 180);

const calculateEdgePointFn =
  (center: number, radius: number) =>
  (degree: number, scale = 1): Point => {
    const degreeInRadians = degToRadians(degree);
    const degreeInRadiansY = degToRadians(svgY(degree));
    return [
      center + Math.cos(degreeInRadians) * radius * scale,
      center + Math.sin(degreeInRadiansY) * radius * scale,
    ];
  };

const RadarChart = ({ radarData, viewBoxSize = 152 }: Props) => {
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize * 0.49;

  const calculateEdgePoint = useMemo(
    () => calculateEdgePointFn(viewBoxCenter, radius),
    [radius],
  );

  const calculatePosition = (index: number): any => {
    const position = [
      {
        top: -28,
        left: 0,
        right: 0,
        textAlign: 'center',
      },
      {
        top: '16%',
        right: 0,
        width: 70,
        marginRight: -70,
      },
      { top: '72%', right: 0, width: 70, marginRight: -70 },
      {
        bottom: -28,
        left: 0,
        right: 0,
        textAlign: 'center',
      },
      { top: '72%', left: 0, textAlign: 'right', width: 70, marginLeft: -70 },
      { top: '16%', left: 0, textAlign: 'right', width: 70, marginLeft: -70 },
    ];
    return position[index];
  };

  const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

  const animatedPointsValues = [
    {
      x: 60,
      y: 60,
    },
    {
      x: 60,
      y: 60,
    },
    {
      x: 60,
      y: 60,
    },
    {
      x: 60,
      y: 60,
    },
    {
      x: 60,
      y: 60,
    },
    {
      x: 60,
      y: 60,
    },
  ];

  // const animatedProps = useAnimatedProps(() => ({
  //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //   points: `${radarData.map((r, i) => {
  //     console.log(r.value);
  //     const edgePoint = calculateEdgePoint(-i * 60 + 90, r.value / 100);
  //     console.log(edgePoint);
  //     return `${edgePoint[0]},${edgePoint[1]}`;
  //   })}`,
  // }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}
    >
      <View
      //  style={{ backgroundColor: 'blue' }}
      >
        <Svg
          height={viewBoxSize}
          width={viewBoxSize}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          <Circle
            cx={viewBoxCenter}
            cy={viewBoxCenter}
            r={radius}
            stroke="#000"
            strokeOpacity="0.2"
            strokeWidth="0.5"
            fill="transparent"
          />

          {[...Array(3).keys()].map((i) => (
            <Circle
              key={`circle_outline_${i}`}
              cx={viewBoxCenter}
              cy={viewBoxCenter}
              r={(i + 1) * radius * 0.25}
              stroke="#000"
              strokeOpacity="0.2"
              strokeWidth="0.5"
              fill="transparent"
            />
          ))}

          {[...Array(3).keys()].map((i) => (
            <Line
              key={`crosshair_${i}`}
              x1={calculateEdgePoint(-i * 60 + 90)[0]}
              y1={calculateEdgePoint(-i * 60 + 90)[1]}
              x2={calculateEdgePoint(-i * 60 + 180 + 90)[0]}
              y2={calculateEdgePoint(-i * 60 + 180 + 90)[1]}
              stroke={colors.text}
              strokeOpacity="0.2"
              strokeWidth="0.5"
              fill="transparent"
            />
          ))}

          <AnimatedPolygon
            stroke={colors.green}
            strokeWidth={0.6}
            fill="#e2ebd0"
            fillOpacity={0.7}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            points={`${radarData.map((r, i) => {
              const edgePoint = calculateEdgePoint(-i * 60 + 90, r.value / 100);
              return `${edgePoint[0]},${edgePoint[1]}`;
            })}`}
            // animatedProps={animatedProps}
          />
        </Svg>
        {radarData.map((r, i) => {
          var desc;
          switch(r.value){
            case 100: {
              desc='건강';
              break;
            }
            case 75:{
              desc='좋음';
              break;
            }
            case 50:{
              desc='보통';
              break;
            }
            case 25:{
              desc='나쁨';
              break;
            }
          }
          return (
            <TextDemiLight
              key={r.label}
              style={[styles.label, calculatePosition(i)]}
            >
              {r.label} | <AppText style={styles.value}>{desc}</AppText>
            </TextDemiLight>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    fontSize: 12,
    margin: 'auto',
  },
  value: {
    fontSize: 12,
  },
});

export default memo(RadarChart);
