import React, {useCallback, useRef} from 'react';
import * as RN from 'react-native';
import {Types} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import he from 'he';
import moment from 'moment-timezone';
import FastImage from 'react-native-fast-image';

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
  const videos = context?.topics?.videos || [];

  const lastTopicIdLoadedRef = useRef<string>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isEndReached, setIsEndReached] = React.useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = React.useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = React.useState(false);

  const renderVideo = useCallback(({item: video}: {item}) => {
    const {youtube, data = {}} = getVideoData(video);
    const {url, thumbnail, info} = data;

    console.log('$$$$??', url, thumbnail, info);
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
      <RN.TouchableOpacity
        style={[styles.videoContainer, {borderTopColor: '#18202F'}]}
        onPress={onPress}>
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

  return (
    <FlashList
      style={styles.container}
      data={videos}
      ListEmptyComponent={
        <>
          {hasAttemptedLoad && (
            // Add app error image
            <RN.Text style={styles.errorText}>Could not load videos.</RN.Text>
          )}
        </>
      }
      // ListHeaderComponent={<RN.Text style={styles.titleText}>Videos</RN.Text>}
      ListFooterComponent={
        <SafeAreaView edges={['bottom']}>
          {isLoadingOlder && <RN.ActivityIndicator color="white" />}
        </SafeAreaView>
      }
      keyExtractor={videoKeyExtractor}
      renderItem={renderVideo}
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
    // fontFamily: Fonts.POPPINS_BOLD,
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
    // fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  videoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopWidth: 1,
  },
  videoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  videoThumbnail: {
    height: 72,
    aspectRatio: 1.33,
    borderRadius: 4,
    backgroundColor: '#18202F',
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
    // fontFamily: Fonts.INTER_REGULAR,
    fontSize: 14,
    marginBottom: 4,
    // APP_LIGHT_GREY_BLUE
    color: '#666777',
  },
  videoTitleText: {
    // fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
});

export default Videos;
