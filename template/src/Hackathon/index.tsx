import React, {useEffect, useState} from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import axios from 'axios';
import _ from 'lodash';
import {getShortLabelFromWagerType} from './dfs_stat_helpers';

type OwnProps = {
  context: Types.Context;
};

const Hackathon = (props: OwnProps) => {
  const {context} = props;
  const {playersInSportMap} = context;
  const [lineGroups, setLineGroups] = useState([]);
  const [myLines, setMyLines] = useState([]);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    const today = new Date().toJSON().slice(0, 10);
    const response = await axios.get(
      `https://api.sleeper.app/lines?date_from=${today}&date_to=${today}&include_promotions=true&dynamic=true`,
    );
    if (response.status === 200) {
      setLineGroups(response.data);
    } else {
      throw new Error('Failed to fetch');
    }
  };

  const _getRandomLineGroups = () => {
    const items = _.sampleSize(lineGroups, 8).map(lineGroup => {
      return _.sample(lineGroup.options);
    });
    setMyLines(items);
  };

  const _getPlayerAvatarSourceUrl = (sport, playerId) => {
    return `https://sleepercdn.com/content/${sport}/players/thumb/${playerId}.jpg`;
  };

  const _renderLine = line => {
    const playerId = line.subject_id;
    const sport = line.sport;
    const player = _.get(playersInSportMap, [sport, playerId]);
    const firstName = player?.first_name;
    const lastName = player?.last_name;
    const position = player?.position;
    const team = player?.team;
    const wagerType = getShortLabelFromWagerType(sport, line.wager_type);
    const outcomeValue = line.outcome_value;
    const isOver = line.outcome === 'over';
    const payoutMultiplier = line.payout_multiplier;

    return (
      <RN.View
        key={`${line.sport}-${line.subject_id}-${line.wager_type}`}
        style={styles.parlayItem}>
        <RN.Image
          source={{uri: _getPlayerAvatarSourceUrl(sport, playerId)}}
          style={{
            width: 36,
            height: 36,
            marginRight: 4,
          }}
        />
        <RN.View style={{flex: 1, justifyContent: 'center'}}>
          <Sleeper.Text style={styles.playerName}>
            {`${firstName?.[0]}. ${lastName}`}
          </Sleeper.Text>
          <Sleeper.Text style={styles.playerDetails}>
            {`${position} - ${team}`}
          </Sleeper.Text>
        </RN.View>
        <RN.View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isOver ? (
            <Sleeper.Text style={styles.overTriangle}>▲</Sleeper.Text>
          ) : (
            <Sleeper.Text style={styles.underTriangle}>▼</Sleeper.Text>
          )}
          <RN.View
            style={{
              alignItems: 'center',
              width: 80,
            }}>
            <Sleeper.Text
              style={styles.outcomeValue}>{`${outcomeValue}`}</Sleeper.Text>
            <Sleeper.Text
              style={styles.wagerType}>{`${wagerType}`}</Sleeper.Text>
            <Sleeper.Text
              style={styles.multiplier}>{`${payoutMultiplier}x`}</Sleeper.Text>
          </RN.View>
        </RN.View>
      </RN.View>
    );
  };

  const totalMultiplier = _.reduce(
    _.map(myLines, line => line.payout_multiplier),
    (count, value) => {
      return count * value;
    },
    1,
  ).toFixed(2);

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.body}>
        {!_.isEmpty(myLines) && (
          <RN.View style={styles.parlayContainer}>
            <RN.View style={styles.parlayHeader}>
              <Sleeper.Text style={styles.header}>
                {_.size(myLines)}-Leg
              </Sleeper.Text>
              <Sleeper.Text style={styles.header}>
                {_.min([100, totalMultiplier])}x
              </Sleeper.Text>
            </RN.View>
            {_.map(myLines, _renderLine)}
          </RN.View>
        )}
      </RN.View>
      <RN.View style={styles.footer}>
        <Sleeper.Button
          text="SHOW ME THE MONEY!"
          onPress={_getRandomLineGroups}
        />
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parlayContainer: {
    width: 340,
    borderRadius: 16,
    borderColor: '#344054',
    backgroundColor: '#1e243c',
    borderWidth: 1,
    overflow: 'hidden',
  },
  parlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(163, 187, 211, 0.1)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  parlayItem: {
    paddingLeft: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  footer: {
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  playerName: {
    fontSize: 14,
    color: '#ffffff',
  },
  playerDetails: {
    fontSize: 12,
    color: '#a3bbd3',
  },
  outcomeValue: {
    fontSize: 11,
    color: '#ffffff',
  },
  wagerType: {
    fontSize: 9,
    color: '#ffffff',
  },
  multiplier: {
    fontSize: 9,
    color: '#a3bbd3',
  },
  overTriangle: {
    fontSize: 20,
    color: 'green',
  },
  underTriangle: {
    fontSize: 20,
    color: 'red',
  },
});

export default Hackathon;
