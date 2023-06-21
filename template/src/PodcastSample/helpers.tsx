import he from 'he';
import moment from 'moment-timezone';

const EMPTY_OBJECT = {};

export const removeEmbedTokenBrackets = str => {
  let res = str.replace(/\<|\>/g, '');
  return res;
};

export const formatTimeSinceWithDayOfWeek = dt => {
  const now = moment();
  const date = moment(dt);
  const diff = now.diff(date, 'days');

  if (diff < 7) {
    return date.format('ddd');
  }

  return date.format('MMM D');
};

export const decodeMessage = message => {
  if (message) {
    const decodedMessage = he.decode(message);
    return decodedMessage;
  }

  return message;
};

export const getPodcastData = podcast => {
  const titleKey = removeEmbedTokenBrackets(podcast.title);
  return podcast.title_map?.[titleKey] || EMPTY_OBJECT;
};
