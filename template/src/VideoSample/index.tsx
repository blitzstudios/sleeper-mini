import React, {useCallback, useEffect, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import VideoRow from './VideoRow';

type VideoMiniProps = {
  context: Types.Context;
};

const PAGE_LIMIT = 20;
const EMPTY_OBJECT = {};

const Videos = (props: VideoMiniProps) => {
  const {context} = props;

  const [page, setPage] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [paginatedVideosMap, setPaginatedVideoMap] =
    React.useState<Record<string, Topic[]>>(EMPTY_OBJECT);

  const currentPageVideos = context?.videos?.[page] || [];

  useEffect(() => {
    setIsRefreshing(false);
    if (currentPageVideos.length !== 0) {
      setPaginatedVideoMap({...paginatedVideosMap, [page]: currentPageVideos});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPageVideos, isRefreshing]);

  const videos = useMemo(() => {
    const videoArray = [];
    Object.keys(paginatedVideosMap).forEach(videoIndex => {
      const videoValues = paginatedVideosMap[videoIndex];
      videoArray.push(...videoValues);
    });
    return videoArray;
  }, [paginatedVideosMap]);

  const onEndReached = useCallback(() => {
    if (currentPageVideos.length === PAGE_LIMIT && isRefreshing === false) {
      setPage(page + 1);
    }
  }, [isRefreshing, page, currentPageVideos.length]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(0);
    setPaginatedVideoMap(EMPTY_OBJECT);
  }, []);

  const renderVideo = useCallback(({item: video}: {item: Topic}) => {
    return <VideoRow videoTopic={video} />;
  }, []);

  return (
    <FlashList
      data={videos}
      ListEmptyComponent={
        <RN.Text style={styles.errorText}>No Videos.</RN.Text>
      }
      keyExtractor={video => video.topic_id}
      renderItem={renderVideo}
      estimatedItemSize={100}
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
  titleText: {
    fontSize: 28,
    color: 'white',
    fontFamily: Fonts.POPPINS_BOLD,
    marginVertical: 8,
    marginHorizontal: 16,
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
