import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './save-load';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    save(LOCALSTORAGE_KEY, currentTime.seconds);
  }, 1000)
);

player.setCurrentTime(load(LOCALSTORAGE_KEY));
