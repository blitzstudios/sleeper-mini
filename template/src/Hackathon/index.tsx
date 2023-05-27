import React, {useEffect, useState, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import axios from 'axios';
import _ from 'lodash';
import {getShortLabelFromWagerType} from './dfs_stat_helpers';
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';

type OwnProps = {
  context: Types.Context;
};

const green = '#00ceb9';
const red = '#ff6086';
const windowWidth = Dimensions.get('window').width;

const Hackathon = (props: OwnProps) => {
  const {context} = props;
  const {playersInSportMap} = context;
  const [lineGroups, setLineGroups] = useState([]);
  const [myLines, setMyLines] = useState([]);
  const [isNumLegsModalVisible, setNumLegsModalVisible] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [numLegs, setNumLegs] = useState(4);
  const [filter, setFilter] = useState('None');

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    const today = new Date().toJSON().slice(0, 10);
    const response = await axios.get(
      `https://sleeper.app/lines/available?date_from=${today}&date_to=${today}&include_promotions=true&dynamic=true`,
    );
    if (response.status === 200) {
      setLineGroups(response.data);
    } else {
      throw new Error('Failed to fetch');
    }
  };

  const _toggleNumLegsModal = () => {
    setNumLegsModalVisible(!isNumLegsModalVisible);
  };

  const _toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const filteredLineGroups = useMemo(() => {
    switch (filter) {
      case 'Popular': {
        // Return top 20 line groups
        const sortedLineGroups = _.orderBy(
          lineGroups,
          [
            lineGroup => {
              return lineGroup.pick_stats?.popularity || 0;
            },
          ],
          ['desc'],
        );
        return _.take(sortedLineGroups, 20);
      }
      // Return line groups with multipliers under 2
      case 'Low Multipliers': {
        return _.filter(lineGroups, lineGroup => {
          return _.some(lineGroup.options, line => {
            return line.payout_multiplier < 2;
          });
        });
      }
      // Return line groups with multipliers over 3
      case 'High Multipliers': {
        return _.filter(lineGroups, lineGroup => {
          return _.some(lineGroup.options, line => {
            return line.payout_multiplier >= 3;
          });
        });
      }
      default:
        return lineGroups;
    }
  }, [filter, lineGroups]);

  const _getMyLineGroups = () => {
    let lineGroupsSample = _.sampleSize(filteredLineGroups, numLegs);
    let lines;
    switch (filter) {
      case 'Popular': {
        lines = lineGroupsSample.map(lineGroup => {
          const numOver = lineGroup.pick_stats?.counts?.over;
          const numUnder = lineGroup.pick_stats?.counts?.under;
          return _.find(lineGroup.options, line => {
            if (numOver > numUnder) {
              return line.outcome === 'over';
            } else {
              return line.outcome === 'under';
            }
          });
        });
        break;
      }
      // Return line groups with multipliers under 2
      case 'Low Multipliers': {
        lines = lineGroupsSample.map(lineGroup => {
          const line1 = lineGroup.options[0];
          const line2 = lineGroup.options[1];
          if (line1.payout_multiplier < line2.payout_multiplier) {
            return line1;
          } else {
            return line2;
          }
        });
        break;
      }
      // Return line groups with multipliers over 3
      case 'High Multipliers': {
        lines = lineGroupsSample.map(lineGroup => {
          const line1 = lineGroup.options[0];
          const line2 = lineGroup.options[1];
          if (line1.payout_multiplier > line2.payout_multiplier) {
            return line1;
          } else {
            return line2;
          }
        });
        break;
      }
      default:
        lines = lineGroupsSample.map(lineGroup => {
          return _.sample(lineGroup.options);
        });
    }
    setMyLines(lines);
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

  const _renderNumLegsModal = () => {
    return (
      <RN.View>
        <Modal isVisible={isNumLegsModalVisible} useNativeDriverForBackdrop>
          <RN.View style={styles.modal}>
            <Sleeper.Text>Number of Legs</Sleeper.Text>
            <RN.View>
              <Picker
                selectedValue={numLegs}
                onValueChange={(itemValue, itemIndex) => {
                  setNumLegs(itemValue);
                  _toggleNumLegsModal();
                }}>
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
              </Picker>
            </RN.View>
          </RN.View>
        </Modal>
      </RN.View>
    );
  };

  const _renderFilterModal = () => {
    return (
      <RN.View>
        <Modal isVisible={isFilterModalVisible} useNativeDriverForBackdrop>
          <RN.View style={styles.modal}>
            <Sleeper.Text>Filter</Sleeper.Text>
            <RN.View>
              <Picker
                selectedValue={filter}
                onValueChange={(itemValue, itemIndex) => {
                  setFilter(itemValue);
                  _toggleFilterModal();
                }}>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Popular" value="Popular" />
                <Picker.Item label="Low Multipliers" value="Low Multipliers" />
                <Picker.Item
                  label="High Multipliers"
                  value="High Multipliers"
                />
              </Picker>
            </RN.View>
          </RN.View>
        </Modal>
      </RN.View>
    );
  };

  const totalMultiplier = _.reduce(
    _.map(myLines, line => line.payout_multiplier || 1),
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
        <RN.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
          }}>
          <Sleeper.Button
            gradient={['#a3bbd3', '#a3bbd3']}
            text={`NUM LEGS: ${numLegs}`}
            onPress={_toggleNumLegsModal}
          />
          <Sleeper.Button
            gradient={['#a3bbd3', '#a3bbd3']}
            text={`FILTER: ${filter}`}
            onPress={_toggleFilterModal}
          />
        </RN.View>
        <Sleeper.Button text="SHOW ME THE MONEY!" onPress={_getMyLineGroups} />
      </RN.View>
      {_renderNumLegsModal()}
      {_renderFilterModal()}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: windowWidth,
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'space-between',
    borderRadius: 16,
    borderTopRightRadius: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 80,
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
    color: green,
  },
  underTriangle: {
    fontSize: 20,
    color: red,
  },
});

export default Hackathon;
