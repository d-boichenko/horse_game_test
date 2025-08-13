import HORSE_COLORS from '../../assets/colorDictionary.js';
import HORSE_NAMES from '../../assets/nameDictionary.js';

export default {
  namespaced: true,
  state: () => ({
    horses: [],
    selectedHorses: [],
  }),
  getters: {
    getAllHorses: (state) => state.horses,
    getSelectedHorses: (state) => state.selectedHorses,
  },
  mutations: {
    SET_HORSES(state, horses) {
      state.horses = Array.isArray(horses) ? horses : [];
    },
    SET_SELECTED_HORSES(state, horses) {
      state.selectedHorses = Array.isArray(horses) ? horses : [];
    },
  },
  actions: {
    generateRandHorseList({ commit }) {
      const horseCount = 20;
      const horses = [];
      const usedNames = new Set();
      const usedColors = new Set();

      while (horses.length < horseCount) {
        const nameIndex = Math.floor(Math.random() * HORSE_NAMES.length);
        const colorIndex = Math.floor(Math.random() * HORSE_COLORS.length);
        const name = HORSE_NAMES[nameIndex];
        const color = HORSE_COLORS[colorIndex];

        if (!usedNames.has(name) && !usedColors.has(color)) {
          horses.push({
            id: horses.length + 1,
            name: name,
            condition: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
            color: color,
          });
          usedNames.add(name);
          usedColors.add(color);
        }
      }

      commit('SET_HORSES', horses);
    },

    selectRandHorses({ commit, state }) {
      const randomHorses = [...state.horses].sort(() => Math.random() - 0.5).slice(0, 10);
      commit('SET_SELECTED_HORSES', randomHorses);
    },
  },
};
