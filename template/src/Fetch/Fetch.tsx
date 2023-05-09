import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import {useState} from 'react';
import RosterOwners from './RosterOwners';

type OwnProps = {
  context: Types.Context;
};

const Fetch = (props: OwnProps) => {
  const {
    user,
    userLeagueList,
    leaguesMap,
    rostersInLeagueMap,
    userMap,
    usersInLeagueMap,
    playoffsInLeagueMap,
    transactionsInLeagueMap,
    transactionsMap,
    sportInfoMap, 
    draftsInLeagueMap,
    draftPickTradesInLeagueMap,
    draftPicksInDraftMap,
    playersInSportMap
  } = props.context;

  const [selectedLeague, setSelectedLeague] = useState<string>();

  const selectedRosterMap =
    !!selectedLeague && rostersInLeagueMap[selectedLeague];
  const leagueUserIdList =
    !!selectedLeague &&
    !!usersInLeagueMap[selectedLeague] &&
    Object.keys(usersInLeagueMap[selectedLeague]);
  const selectedSport = !!selectedLeague && leaguesMap[selectedLeague].sport;

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
              text={leaguesMap[item].name || item}
              onPress={() => setSelectedLeague(item)}
            />
          )}
        />
      </RN.View>
      {/* {!!selectedRosterMap && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Roster Owners ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>
          <RosterOwners rostersMap={selectedRosterMap} userMap={userMap} />
        </RN.View>
      )} */}
      {/* {!!leagueUserIdList && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Users ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>

          <RN.FlatList
            style={styles.scroll}
            data={leagueUserIdList}
            renderItem={({item}) => (
              <Sleeper.Text style={styles.text}>
                {userMap[item].display_name}
              </Sleeper.Text>
            )}
          />
        </RN.View>
      )} */}
      {/* {!!selectedLeague && !!playoffsInLeagueMap[selectedLeague] && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Playoffs ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>

          <RN.FlatList
            style={styles.scroll}
            data={playoffsInLeagueMap[selectedLeague].bracket}
            renderItem={({item}) => (
              <Sleeper.Text style={styles.text}>
                {selectedRosterMap[item.t1]?.owner_id ?? 'No Owner'} vs{' '}
                {selectedRosterMap[item.t2]?.owner_id ?? 'No Owner'}
              </Sleeper.Text>
            )}
          />
        </RN.View>
      )} */}
      {/* {!!selectedLeague && selectedSport && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Sport: ({selectedSport}) (
          </Sleeper.Text>
          <Sleeper.Text style={styles.header}>
            League season: ({sportInfoMap[selectedSport]?.league_season ?? 'No season'}):
          </Sleeper.Text>
        </RN.View>
      )} */}
      {/* {!!selectedLeague && !!transactionsInLeagueMap[selectedLeague] && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Transaction Creators ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>

          <RN.FlatList
            style={styles.scroll}
            data={transactionsInLeagueMap[selectedLeague]}
            renderItem={({item}) => (
              <Sleeper.Text style={styles.text}>
                {!!transactionsMap[item].creator &&
                  userMap[transactionsMap[item].creator]?.display_name}
              </Sleeper.Text>
            )}
          />
        </RN.View>
      )} */}
      {/* {!!selectedLeague && !!draftsInLeagueMap[selectedLeague] && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Draft Types ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>

          <RN.FlatList
            style={styles.scroll}
            data={draftsInLeagueMap[selectedLeague]}
            renderItem={({item}) => (
              <Sleeper.Text style={styles.text}>
                {!!item.type && item.type} -
                {item.draft_id &&
                  !!draftPicksInDraftMap[item.draft_id] &&
                  !!draftPicksInDraftMap[item.draft_id][0] &&
                  !!draftPicksInDraftMap[item.draft_id][0].player_id &&
                  selectedSport &&
                  playersInSportMap[selectedSport][draftPicksInDraftMap[item.draft_id][0].player_id]
                    .first_name + ' ' +
                    playersInSportMap[selectedSport][draftPicksInDraftMap[item.draft_id][0].player_id]
                    .last_name}
              </Sleeper.Text>
            )}
          />
        </RN.View>
      )} */}
      {!!selectedLeague && !!draftPickTradesInLeagueMap[selectedLeague] && (
        <RN.View style={styles.itemContainer}>
          <Sleeper.Text style={styles.header}>
            Draft Trades ({leaguesMap[selectedLeague].name}):
          </Sleeper.Text>

          <RN.FlatList
            style={styles.scroll}
            data={draftPickTradesInLeagueMap[selectedLeague]}
            renderItem={({item}) => (
              <Sleeper.Text style={styles.text}>
                {selectedRosterMap[item?.roster_id].owner_id} to{' '}
                {selectedRosterMap[item.owner_id].owner_id}
              </Sleeper.Text>
            )}
          />
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
    height: 150,
    flexGrow: 0,
  },
  row: {
    padding: 2,
  },
});

export default Fetch;
