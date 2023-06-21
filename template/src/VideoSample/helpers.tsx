import he from 'he';
import moment from 'moment-timezone';

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

export const getVideoData = video => {
  const titleKey = removeEmbedTokenBrackets(video.title);
  return video.title_map?.[titleKey] || {};
};
