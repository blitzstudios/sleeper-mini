import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';

type OwnProps = {
  context: Types.Context;
};

const Template = (props: OwnProps) => {
  const {context} = props;

  return (
    <RN.View style={styles.container}>
      <Sleeper.Text style={styles.text}>
        Hello {context?.user?.display_name}!
      </Sleeper.Text>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default Template;
