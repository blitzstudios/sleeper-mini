import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import {useState} from 'react';
import RosterOwners from './RosterOwners';

type OwnProps = {
  context: Types.Context;
};

const Fetch = (props: OwnProps) => {
  const {context} = props;

  const user = context?.user;
  const userLeagueList = context?.userLeagueList;
  const leagueMap = context.leaguesMap;
  const rosterMap = context?.rostersInLeagueMap;
  const userMap = context?.userMap;

  const [selectedLeague, setSelectedLeague] = useState();

  const selectedRosterMap = !!selectedLeague && rosterMap[selectedLeague];

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.itemContainer}>
        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>User:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>
            {` ${user?.display_name}`}
          </Sleeper.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Pick a League:</Sleeper.Text>
        <RN.FlatList
          style={styles.scroll}
          data={userLeagueList}
          renderItem={({item}) => (
            <Sleeper.Button
              text={leagueMap[item].name || item}
              onPress={() => setSelectedLeague(item)}
            />
          )}
        />
      </RN.View>
      {!!selectedRosterMap && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Roster Owners ({leagueMap[selectedLeague].name}):
          </Sleeper.Text>
          <RosterOwners rostersMap={selectedRosterMap} userMap={userMap} />
        </RN.View>
      )}
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
  scroll: {
    height: 200,
    flexGrow: 0,
  },
  row: {
    padding: 2,
  },
});

export default Fetch;
