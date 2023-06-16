import React, {useCallback} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import he from 'he';
import moment from 'moment-timezone';
import FastImage from 'react-native-fast-image';

type PodcastMiniProps = {
  context: Types.Context;
};

const EMPTY_OBJECT = {};

const removeEmbedTokenBrackets = str => {
  let res = str.replace(/\<|\>/g, '');
  return res;
};

const formatTimeSinceWithDayOfWeek = dt => {
  const now = moment();
  const date = moment(dt);
  const diff = now.diff(date, 'days');

  if (diff < 7) {
    return date.format('ddd');
  }

  return date.format('MMM D');
};

const decodeMessage = message => {
  if (message) {
    const decodedMessage = he.decode(message);
    return decodedMessage;
  }

  return message;
};

const podcastKeyExtractor = podcast => podcast.topic_id;
const getPodcastData = podcast => {
  const titleKey = removeEmbedTokenBrackets(podcast.title);
  return podcast.title_map?.[titleKey] || EMPTY_OBJECT;
};

const Podcasts = (props: PodcastMiniProps) => {
  const {context} = props;
  const podcasts = context?.topics?.podcasts || [];

  // const lastTopicIdLoadedRef = useRef<string>(null);
  // const [isRefreshing, setIsRefreshing] = React.useState(false);
  // const [isEndReached, setIsEndReached] = React.useState(false);
  // const [isLoadingOlder, setIsLoadingOlder] = React.useState(false);
  // const [hasAttemptedLoad, setHasAttemptedLoad] = React.useState(false);

  const renderPodcast = useCallback(({item: item}: {item}) => {
    const {data = {}} = getPodcastData(item);
    const {url, thumbnail, info, podcast} = data;
    const {name} = podcast;
    // If we're missing core info, do not render...
    if (!info || !url || !podcast) {
      return null;
    }
    const onPress = async () => {
      const canOpen = await RN.Linking.canOpenURL(url);

      if (canOpen) {
        try {
          await RN.Linking.openURL(url);
          return;
        } catch (err) {}
      }

      // Handle link open failure or the non-supported case...
      RN.Alert.alert(
        'Could not open link',
        'Would you like to copy it to your clipboard?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => RN.Clipboard.setString(url),
          },
        ],
      );
    };

    return (
      <RN.TouchableOpacity style={styles.podcastContainer} onPress={onPress}>
        <RN.View style={styles.podcastHeaderContainer}>
          {thumbnail && (
            <FastImage
              style={styles.podcastThumbnail}
              source={{uri: thumbnail.url}}
            />
          )}
          <RN.View style={styles.podcastContentContainer}>
            <RN.View style={styles.podcastMetaContainer}>
              <RN.Text style={styles.podcastMetaText}>
                {name}
                {' • '}
              </RN.Text>
              <RN.Text style={styles.podcastMetaText}>
                {formatTimeSinceWithDayOfWeek(item.created)}
              </RN.Text>
            </RN.View>
            <RN.Text style={styles.podcastTitleText}>
              {decodeMessage(info.title)}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.TouchableOpacity>
    );
  }, []);

  return (
    <FlashList
      style={styles.container}
      data={podcasts}
      // ListEmptyComponent={
      //   <>
      //     {hasAttemptedLoad && (
      //       // Add app error image
      //       <RN.Text style={styles.errorText}>Could not load podcasts.</RN.Text>
      //     )}
      //   </>
      // }
      // ListFooterComponent={
      //   <SafeAreaView edges={['bottom']}>
      //     {isLoadingOlder && <RN.ActivityIndicator color="white" />}
      //   </SafeAreaView>
      // }
      keyExtractor={podcastKeyExtractor}
      renderItem={renderPodcast}
      // onEndReached={onEndReached}
      // refreshControl={
      //   <RN.RefreshControl
      //     refreshing={isRefreshing}
      //     onRefresh={onRefresh}
      //     tintColor="white"
      //   />
      // }
    />
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    fontFamily: Fonts.POPPINS_BOLD,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  errorIcon: {
    marginTop: 32,
    marginBottom: 8,
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  podcastContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  podcastHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  podcastThumbnail: {
    height: 72,
    aspectRatio: 1.33,
    borderRadius: 8,
    overflow: 'hidden',
  },
  podcastContentContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  podcastMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  podcastMetaText: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: 12,
    marginBottom: 4,
    color: Theme.gray300,
  },
  podcastTitleText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
});

export default Podcasts;
