import { createStore } from 'vuex';
import horses from './modules/horses.js';
import game from './modules/game.js';

const store = createStore({
  modules: {
    horses,
    game,
  },
});

export default store;
