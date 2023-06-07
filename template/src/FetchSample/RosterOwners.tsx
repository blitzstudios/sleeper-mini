import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';

type OwnProps = {
  rostersMap: Types.RostersMap;
  userMap: Types.UserMap;
};

const RosterOwners = (props: OwnProps) => {
  const {rostersMap, userMap} = props;

  const rosterIdList = Object.keys(rostersMap);

  const renderRosterOwner = ({item}) => {
    const ownerId = rostersMap[item].owner_id;
    const ownerName = ownerId
      ? userMap[ownerId]
        ? userMap[ownerId].display_name
        : ownerId
      : 'No Owner';
    return <Sleeper.Text style={styles.text}>{ownerName}</Sleeper.Text>;
  };

  return (
    <RN.FlatList
      style={styles.scroll}
      data={rosterIdList}
      renderItem={renderRosterOwner}
    />
  );
};

const styles = RN.StyleSheet.create({
  scroll: {
    height: 200,
    flexGrow: 0,
  },
  text: {
    fontSize: 20,
  },
});

export default RosterOwners;
