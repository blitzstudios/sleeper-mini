import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {ScriptManager, Federated} from '@callstack/repack/client';
import NetInfo from '@react-native-community/netinfo';
import dgram from 'react-native-udp';
import {
  localSocketPort,
  remoteSocketPort,
  remoteBundlePort as _remoteBundlePort,
  release,
  remoteIP,
} from '../../app.json';

const remoteBundleHost = release ? remoteIP : 'localhost';
const remoteBundlePort = release ? _remoteBundlePort : 8081;

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  const resolveURL = Federated.createURLResolver({
    containers: {
      sleeper: `http://${remoteBundleHost}:${remoteBundlePort}/[name][ext]`,
    },
  });

  // Try to resolve URL based on scriptId and caller
  const url = resolveURL(scriptId, caller);
  console.log('[Sleeper] load script:', scriptId, caller, url);
  if (url) {
    return {
      url,
      // Prod app will serve bundle without platform query.
      // Debug app requires a platform query to serve data.
      query: release
        ? undefined
        : {
            platform: Platform.OS,
          },
    };
  }
});

const DevServer = props => {
  const onSocket = msg => {
    const json = JSON.parse(msg.toString());
    if (json?._connected) {
      return;
    }

    props.onContextChanged(json);
  };

  const onError = err => {
    console.error('[Sleeper] Socket error: ' + err);
  };

  const bindSocket = async socket => {
    const netInfo = await NetInfo.fetch();
    const netInfoDetails = netInfo?.details;

    if (!netInfoDetails || !('ipAddress' in netInfoDetails)) {
      console.error('[Sleeper] Failed to determine local IP address.');
      return;
    }

    socket.bind({port: localSocketPort, address: netInfoDetails.ipAddress});
  };

  const pingServer = socket => {
    // Continue to ping the sleeper app server until it responds.
    return new Promise(() => {
      NetInfo.fetch().then(netInfo => {
        const netInfoDetails = netInfo?.details;
        if (!netInfoDetails || !('ipAddress' in netInfoDetails)) {
          console.error('[Sleeper] Failed to determine local IP address.');
          return;
        }

        const json = JSON.stringify({_ip: netInfoDetails.ipAddress});

        (async function ping() {
          socket.send(json, undefined, undefined, remoteSocketPort, remoteIP);
          setTimeout(ping, 5000);
        })();
      });
    });
  };

  useEffect(() => {
    const socket = dgram.createSocket({type: 'udp4'});
    bindSocket(socket);
    pingServer(socket);

    socket.on('message', onSocket);
    socket.on('error', onError);
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return <></>;
};

export default DevServer;
