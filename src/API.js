import secret from './secrets/secret.json';
import Unsplash, { toJson } from 'unsplash-js';

export const promptTopics = async (query) => {
  const TO_URL = `https://cors-anywhere.herokuapp.com/https://unsplash.com/nautocomplete/${query}?client_id=${secret.accessKey}`;
  const response = await fetch(TO_URL);
  const data = await response.json();
  return data.autocomplete.map((e) => e.query);
};

export const photoLocation = async (location) => {
  const TO_URL = `https://api.unsplash.com/photos/${location}?client_id=${secret.accessKey}`;
  const response = await fetch(TO_URL);
  const data = await response.json();
  const locArr = [];
  data.location.city != null && locArr.push(data.location.city);
  data.location.country != null && locArr.push(data.location.country);
  if (data.location.city === null && data.location.country === null) {
    locArr.push('unknown');
  }
  return locArr.toString();
};

const unsplash = new Unsplash({
  accessKey: secret.accessKey,
});

export const searchPhotos = (query, page = 1) =>
  unsplash.search
    .photos(query, page, 9)
    .then(toJson)
    .then((json) => json.results);
