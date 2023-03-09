import React, {useCallback, useState} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';

import App from './src/App';
import {name as appName} from './app.json';
import {DevServer, Types} from './src/Sleeper';

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

AppRegistry.registerComponent(appName, () => Template);
