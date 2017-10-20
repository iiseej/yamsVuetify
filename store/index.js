import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      players: [],
      playerModel: {
        name: '',
        score: {
          ace: {
            ref: 'ace',
            value: ''
          },
          two: {
            ref: 'two',
            value: ''
          },
          three: {
            ref: 'three',
            value: ''
          },
          four: {
            ref: 'four',
            value: ''
          },
          five: {
            ref: 'five',
            value: ''
          },
          six: {
            ref: 'six',
            value: ''
          },
          moins: {
            ref: 'moins',
            value: ''
          },
          plus: {
            ref: 'plus',
            value: ''
          },
          petiteSuite: {
            ref: 'petiteSuite',
            value: ''
          },
          grandeSuite: {
            ref: 'grandeSuite',
            value: ''
          },
          brelan: {
            ref: 'brelan',
            value: ''
          },
          full: {
            ref: 'full',
            value: ''
          },
          carre: {
            ref: 'carre',
            value: ''
          },
          yams: {
            ref: 'yams',
            value: ''
          },
          bonusYams: {
            ref: 'bonusYams',
            value: ''
          },
          yamsSec: {
            ref: 'yamsSec',
            value: ''
          }
        }
      }
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
      players: state => (state.players),
      player: state => (state.player)
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
