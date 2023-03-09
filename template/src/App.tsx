import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from './Sleeper';

type OwnProps = {
  context: Types.Context;
};

const App = (props: OwnProps) => {
  const {context} = props;

  const user = context?.user;
  const league = context?.league;
  const navigation = context?.navigation;

  const _onPressButton = () => {
    // Note that actions have no effect in the local app.
    // They only execute when run from within Sleeper.
    context?.actions?.navigate('DRAFTBOARDS', 1);
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.itemContainer}>
        <RN.View style={styles.horizontal}>
          <RN.Image
            style={styles.userAvatar}
            source={{
              uri: `https://sleepercdn.com/avatars/${user?.avatar}`,
            }}
          />
          <Sleeper.Jersey
            style={styles.jersey}
            sport={'nfl'}
            number={'42'}
            fill={'green'}
          />
        </RN.View>
        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>User:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>
            {` ${user?.display_name}`}
          </Sleeper.Text>
        </RN.View>

        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>Cookies:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>{` ${user?.cookies}`}</Sleeper.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Selected League:</Sleeper.Text>
        {!!league && (
          <RN.View style={styles.horizontal}>
            <RN.Image
              style={styles.leagueAvatar}
              source={{
                uri: `https://sleepercdn.com/avatars/${league?.avatar}`,
              }}
            />
            <Sleeper.Text style={styles.text}>{league?.name}</Sleeper.Text>
          </RN.View>
        )}
        {!league && <Sleeper.Text style={styles.text}>-none-</Sleeper.Text>}
      </RN.View>
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Selected nav type:</Sleeper.Text>
        <Sleeper.Text style={styles.text}>
          {navigation?.selectedNavType}
        </Sleeper.Text>
      </RN.View>
      <Sleeper.Button text="Mock Draft" onPress={_onPressButton} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
  },
  leagueAvatar: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
  },
  itemContainer: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 5,
  },
  jersey: {
    width: 50,
    height: 50,
  },
});

export default App;
