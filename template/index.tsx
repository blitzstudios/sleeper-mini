import React, {useCallback, useState} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import {DevServer, Types} from '@sleeperhq/mini-core';

import App from './src/App';
import config from './app.json';

DevServer.init(config);

const Template = () => {
  const [context, setContext] = useState<Types.Context>({});

  const _onContextChanged = useCallback((data: Types.Context) => {
    setContext(data);
  }, []);

  return (
    <View style={styles.container}>
      {__DEV__ && <DevServer onContextChanged={_onContextChanged} />}
      <App context={context} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18202f',
  },
});

AppRegistry.registerComponent(config.name, () => Template);
