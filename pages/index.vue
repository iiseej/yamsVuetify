<template>
  <v-container>
  <v-layout row justify-center align-center>
    <game-menu @newGame="openPlayerModal" @loadLostGame="retrievePlayers" @nextGame="nextGame" :menu="newGame" @closeMenu="menu = !menu"></game-menu>
    <player-modal @closeModal="close"  :dialog="dialog" @cancel="cancelAddPlayer"></player-modal>
    <player @save="saveGame(), whoWins()" v-for="(player, index) in players"
    :index="index"
    :gameLoaded="gameLoaded"
    :player="player"
    :nextGameLoaded="nextGameLoaded"></player>



    <!-- New game window -->
    <v-flex xs12 sm8 md6 v-if="!menu && !newGame">
      <v-card clas="intro-card" dark>
        <v-card-title class="headline">Yams</v-card-title>
        <v-card-text>
          <p>Play, Drink, Laugh, Win, Repeat</p>
          <div class="text-xs-right">
            <em><small>&mdash; Fabien</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="menu = true; newGame = true">Play !</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PlayerModal from './../components/PlayerModal'
  import Player from './../components/Player'
  import GameMenu from './../components/GameMenu'
  import _ from 'lodash'

  export default {
    components: {
      PlayerModal,
      Player,
      GameMenu
    },
    data: () => ({
      dialog: false,
      newGame: false,
      menu: false,
      gameLoaded: false,
      nextGameLoaded: false,
      playersPlaying: [],
      winner: ''
    }),
    methods: {
      ...mapActions(['reset', 'addPlayer', 'setPlayers']),
      incrementYams () {
        _.forEach(this.players, (player) => {
          const ref = this.$firebase.database().ref('players').child(player.id).child('yamsDone')
          if (player.score.bottom.yams > 0) {
            const yamsSup = player.score.bottom.bonusYams / 50
            const yamsSec = player.score.bottom.yamsSec / 100
            ref.transaction((yamsDone) => {
              return (yamsDone || 0) + 1 + yamsSup + yamsSec
            })
          }
        })
      },
      incrementYamsSec () {
        _.forEach(this.players, (player) => {
          const ref = this.$firebase.database().ref('players').child(player.id).child('yamsSecDone')
          if (player.score.bottom.yamsSec > 0) {
            ref.transaction((yamsSecDone) => {
              const n = player.score.bottom.yamsSec / 100
              return (yamsSecDone || 0) + n
            })
          }
        })
      },
      incrementWinCounter () {
        _.forEach(this.players, (player) => {
          if (player.name === this.winner) {
            const ref = this.$firebase.database().ref('players').child(player.id).child('wins')
            ref.transaction((wins) => {
              return (wins || 0) + 1
            })
          } else {
            const ref = this.$firebase.database().ref('players').child(player.id).child('lost')
            ref.transaction((lost) => {
              return (lost || 0) + 1
            })
          }
        })
      },
      nextGame () {
        this.incrementYamsSec()
        this.incrementYams()
        this.incrementWinCounter()
        const rootRef = this.$firebase.database()
        let idxFirstPlayer = ''
        _.forEach(this.players, (player) => {
          if (player.name === this.winner) {
            idxFirstPlayer = this.players.indexOf(player) + 1
            player.win = true
          }
        })
        const newOrder = this.players.slice(idxFirstPlayer, this.players.length)
        this.players.splice(idxFirstPlayer, this.players.length - 1)
        for (let i = newOrder.length - 1; i >= 0; i -= 1) {
          this.players.unshift(newOrder[i])
        }
        _.forEach(this.players, (player) => {
          rootRef.ref('scores').push(player)
          // let obj = {}
          // obj[player.name] = player.score.total
          rootRef.ref('total').push({ name: player.name, score: player.score.total })
        })
        this.setPlayers()
      },
      saveGame () {
        localStorage.clear()
        _.forEach(this.players, (player) => localStorage.setItem(player.name, JSON.stringify(player)))
      },
      close () {
        this.dialog = false
        this.newGame = true
      },
      cancelAddPlayer () {
        this.dialog = false
        this.newGame = false
      },
      openPlayerModal () {
        this.reset()
        this.dialog = true
        this.gameLoaded = false
        this.playersPlaying = []
        localStorage.clear()
      },
      closeMenu () {
        this.reset()
        this.newGame = false
      },
      retrievePlayers () {
        this.reset()
        for (let i = 0; i < localStorage.length - 1; i += 1) {
          this.players.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
        this.newGame = true
        this.gameLoaded = true
      },
      resetScore () {
        this.reset()
        // _.forEach(this.playersPlaying, (player) => {
        //   this.addPlayer(this.playerModel)
        // })
        this.nextGameLoaded = true
      },
      whoWins () {
        let score = 0
        let winning = ''
        _.forEach(this.players, (player) => {
          if (player.score.total > score) {
            score = player.score.total
            winning = player.name
          }
          this.winner = winning
          // console.log(this.winner)
        })
      }
    },
    computed: {
      ...mapGetters(['players'])
    }
  }
</script>
<style>
.container {
padding: 0;
}

.newGame btn__content {
  color : black;
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
}
.content{
  display: flex;
  justify-content: center;
  align-items: center;
}
.application--light .card, .application .theme--light.card{
  background-color: white;
  border-radius: 5px;
}
</style>
