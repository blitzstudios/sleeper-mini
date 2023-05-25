import React, {useCallback, useState, useRef} from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {DevServer, Types} from '@sleeperhq/mini-core';

import Fetch from './Fetch';
import config from '../../app.json';
import _ from 'lodash';

DevServer.init(config);

const Template = () => {
  const [context, setContext] = useState<Types.Context>({});
  const [connected, setConnected] = useState<boolean>(false);
  const contextProxy = useRef<Types.Context>({});

  const _onContextChanged = useCallback((data: Types.Context, handler) => {
    setContext(oldData => {
      const newData = _.merge({}, oldData, data);
      console.log("Luke - onContextChanged", newData);

      contextProxy.current = new Proxy(newData, handler);
      return newData;
    });
  }, []);

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
    <View style={styles.container}>
      <DevServer
        onContextChanged={_onContextChanged}
        onConnected={_onConnected}
      />
      {connected && <Fetch context={contextProxy.current} />}
      {!connected && _renderWaitingForConnection()}
    </View>
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
