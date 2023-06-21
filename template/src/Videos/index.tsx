import React, {useCallback, useEffect, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import he from 'he';
import moment from 'moment-timezone';
import FastImage from 'react-native-fast-image';
import {Topic} from '@sleeperhq/mini-core/declarations/types';

type VideoMiniProps = {
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

const videoKeyExtractor = video => video.topic_id;
const getVideoData = video => {
  const titleKey = removeEmbedTokenBrackets(video.title);
  return video.title_map?.[titleKey] || EMPTY_OBJECT;
};

const Videos = (props: VideoMiniProps) => {
  const {context} = props;

  const [page, setPage] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [videosMap, setVideoMap] = React.useState<Record<string, Topic[]>>({});

  const tempVideos = context?.videos?.[page] || [];

  useEffect(() => {
    if (tempVideos.length !== 0) {
      setVideoMap({...videosMap, [page]: tempVideos});
      setIsRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tempVideos]);

  const videos = useMemo(() => {
    const videoArray = [];
    Object.keys(videosMap).forEach(videoIndex => {
      const videoValues = videosMap[videoIndex];
      videoArray.push(...videoValues);
    });
    return videoArray;
  }, [videosMap]);

  const renderVideo = useCallback(({item: video}: {item: Topic}) => {
    const {youtube, data = {}} = getVideoData(video);
    const {url, thumbnail, info} = data;
    // If we're missing core info, do not render...
    if (!info || !url || !youtube) {
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
      <RN.TouchableOpacity style={styles.videoContainer} onPress={onPress}>
        <RN.View style={styles.videoHeaderContainer}>
          {thumbnail && (
            <FastImage
              style={styles.videoThumbnail}
              source={{uri: thumbnail.url}}
            />
          )}
          <RN.View style={styles.videoContentContainer}>
            <RN.View style={styles.videoMetaContainer}>
              {youtube.channel && (
                <RN.Text style={styles.videoMetaText}>
                  {youtube.channel}
                  {' • '}
                </RN.Text>
              )}
              <RN.Text style={styles.videoMetaText}>
                {formatTimeSinceWithDayOfWeek(video.created)}
              </RN.Text>
            </RN.View>
            <RN.Text style={styles.videoTitleText}>
              {decodeMessage(info.title)}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.TouchableOpacity>
    );
  }, []);

  const onEndReached = useCallback(() => {
    if (tempVideos.length === 20 && isRefreshing === false) {
      setPage(page + 1);
    }
  }, [isRefreshing, page, tempVideos.length]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(-1);
    setVideoMap({});
    setTimeout(() => {
      setPage(0);
      setVideoMap({});
    }, 0);
  }, []);

  return (
    <FlashList
      style={styles.container}
      data={videos}
      ListEmptyComponent={
        <RN.Text style={styles.errorText}>No Videos.</RN.Text>
      }
      keyExtractor={videoKeyExtractor}
      renderItem={renderVideo}
      onEndReached={onEndReached}
      refreshControl={
        <RN.RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }
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
  videoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  videoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  videoThumbnail: {
    height: 72,
    aspectRatio: 1.33,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoContentContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  videoMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoMetaText: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: 12,
    marginBottom: 4,
    color: Theme.gray300,
  },
  videoTitleText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
});

export default Videos;
