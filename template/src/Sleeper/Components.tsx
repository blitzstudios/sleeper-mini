import React from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import {Federated} from '@callstack/repack/client';
import {Context} from './Types';

const _SleeperModule = React.lazy(() =>
  Federated.importModule('sleeper', 'index').catch(() => ({
    default: props => {
      console.log(
        `[Sleeper] Failed to load <${props?.component}>. Check connection to the app.`,
      );
      return <View />;
    },
  })),
);

type ButtonProps = {
  height?: number;
  gradient?: (string | number)[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  disable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
};
const Button = (props: ButtonProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Button" {...props} />
    </React.Suspense>
  );
};

const Text = (props: TextProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Text" {...props} />
    </React.Suspense>
  );
};

type JerseyProps = {
  style: ViewStyle;
  sport: 'nfl' | 'nba' | 'cbb' | 'cfb' | 'mlb';
  number: string;
  fill: ColorValue;
};
const Jersey = (props: JerseyProps) => {
  return (
    <React.Suspense fallback={<View />}>
      <_SleeperModule component="Jersey" {...props} />
    </React.Suspense>
  );
};

export type {ButtonProps, Context, TextProps, JerseyProps};
export {Button, Text, Jersey};
