import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      players: []
    },
    mutations: {
      ADD_PLAYER: (state, player) => {
        state.players.push(player)
      },
      REMOVE_PLAYER: (state, player) => {
        state.players.splice()
      },
      RESET: (state) => {
        state.players = []
      }
    },
    getters: {
      players: state => (state.players)
    },
    actions: {
      addPlayer ({ commit }, player) {
        commit('ADD_PLAYER', player)
      },
      removePlayer ({ commit }, player) {
        commit('REMOVE_PLAYER', player)
      },
      reset ({ commit }) {
        commit('RESET')
      }
    }
  })
}

export default createStore
