export default {
  namespaced: true,

  state: () => ({
    raceNumber: 1,
    program: [],
    raceLengthArr: [1200, 1400, 1600, 1800, 2000, 2200],
    isPaused: false,
    raceResults: [],
    started: false,
    raceCompleted: false,
    allRacesCompleted: false,
  }),

  getters: {
    getProgram: (state) => state.program,
    getRaceNumber: (state) => state.raceNumber,
    getRaceLengthArr: (state) => state.raceLengthArr,
    getRaceLength: (state) => state.raceLengthArr[state.raceNumber - 1],
    getIsPaused: (state) => state.isPaused,
    getRaceResults: (state) => state.raceResults,
    getStarted: (state) => state.started,
    getRaceCompleted: (state) => state.raceCompleted,
    getAllRacesCompleted: (state) => state.allRacesCompleted,
  },

  mutations: {
    SET_PROGRAM(state, program) {
      state.program = program;
    },
    SET_NEW_RACE(state) {
      state.raceNumber++;
    },
    SET_PAUSED(state, isPaused) {
      state.isPaused = isPaused;
    },
    RESET_RACE_STATE(state) {
      state.raceNumber = 1;
      state.raceResults = [];
      state.isPaused = false;
      state.started = false;
      state.raceCompleted = false;
      state.allRacesCompleted = false;
    },
    ADD_RACE_RESULT(state, raceResult) {
      state.raceResults.push(raceResult);
    },
    SET_STARTED(state, started) {
      state.started = started;
    },
    SET_RACE_COMPLETED(state, completed) {
      state.raceCompleted = completed;
    },
    SET_ALL_RACES_COMPLETED(state, completed) {
      state.allRacesCompleted = completed;
    },
  },

  actions: {
    generateInitialData({ dispatch, commit }) {
      commit('RESET_RACE_STATE');
      dispatch('horses/generateRandHorseList', null, { root: true });
      dispatch('horses/selectRandHorses', null, { root: true });
      dispatch('generateProgram');
    },

    generateProgram({ rootGetters, commit }) {
      const selectedHorses = rootGetters['horses/getSelectedHorses'];
      const program = [];

      for (let i = 0; i < 6; i++) {
        program.push([...selectedHorses].sort(() => Math.random() - 0.5));
      }

      commit('SET_PROGRAM', program);
    },

    togglePause({ commit, state }) {
      commit('SET_PAUSED', !state.isPaused);
    },

    startRace({ commit }) {
      commit('SET_STARTED', true);
      commit('SET_RACE_COMPLETED', false);
    },

    completeRace({ commit }) {
      commit('SET_RACE_COMPLETED', true);
    },

    resetTrackState({ commit }) {
      commit('SET_STARTED', false);
      commit('SET_RACE_COMPLETED', false);
      commit('SET_ALL_RACES_COMPLETED', false);
      commit('SET_PAUSED', false);
    },
  },
};
