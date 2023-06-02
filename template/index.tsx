import React, {useCallback, useState} from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {DevServer, Types} from '@sleeperhq/mini-core';

import './package_list';
import config from './app.json';
import Project from 'app';

DevServer.init(config);

const Template = () => {
  const [context, setContext] = useState<Types.Context>({} as Types.Context);
  const [connected, setConnected] = useState<boolean>(false);
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const _onContextChanged = useCallback((data: Types.Context) => {
    setContext(data);
  }, []);

  const _onContextUpdated = useCallback(
    (data: any) => {
      setContext(existing => {
        for (const key in data) {
          existing[key] = data[key];
        }
        return existing;
      });
      forceUpdate();
    },
    [forceUpdate],
  );

  const _onConnected = useCallback((value: boolean) => {
    setConnected(value);
  }, []);

  const _renderWaitingForConnection = () => {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Waiting for connection...</Text>
        <ActivityIndicator size={50} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DevServer
        onContextChanged={_onContextChanged}
        onContextUpdated={_onContextUpdated}
        onConnected={_onConnected}
      />
      {connected && <Project context={context} />}
      {!connected && _renderWaitingForConnection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18202f',
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent(config.name, () => Template);
