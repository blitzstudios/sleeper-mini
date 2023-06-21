import React, {useCallback, useEffect, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import PodcastRow from './PodcastRow';

type PodcastMiniProps = {
  context: Types.Context;
};

const PAGE_LIMIT = 20;
const EMPTY_OBJECT = {};

const Podcasts = (props: PodcastMiniProps) => {
  const {context} = props;

  const [page, setPage] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [paginatedPodcastsMap, setPaginatedPodcastMap] =
    React.useState<Record<string, Topic[]>>(EMPTY_OBJECT);

  const currentPagePodcasts = context?.podcasts?.[page] || [];

  useEffect(() => {
    setIsRefreshing(false);
    if (currentPagePodcasts.length !== 0) {
      setPaginatedPodcastMap({
        ...paginatedPodcastsMap,
        [page]: currentPagePodcasts,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPagePodcasts, isRefreshing]);

  const podcasts = useMemo(() => {
    const podcastArray = [];
    Object.keys(paginatedPodcastsMap).forEach(videoIndex => {
      const videoValues = paginatedPodcastsMap[videoIndex];
      podcastArray.push(...videoValues);
    });
    return podcastArray;
  }, [paginatedPodcastsMap]);

  const onEndReached = useCallback(() => {
    if (currentPagePodcasts.length === PAGE_LIMIT && isRefreshing === false) {
      setPage(page + 1);
    }
  }, [isRefreshing, page, currentPagePodcasts.length]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(0);
    setPaginatedPodcastMap(EMPTY_OBJECT);
  }, []);

  const renderPodcast = useCallback(({item: item}: {item: Topic}) => {
    return <PodcastRow podcastTopic={item} />;
  }, []);

  return (
    <FlashList
      data={podcasts}
      ListEmptyComponent={
        <RN.Text style={styles.errorText}>No Videos.</RN.Text>
      }
      estimatedItemSize={100}
      keyExtractor={podcast => podcast.topic_id}
      renderItem={renderPodcast}
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
