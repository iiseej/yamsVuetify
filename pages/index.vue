<template>
  <!-- <v-container class="display" fluid> -->
  <v-layout row justify-center align-center>
    <player-modal @closeModal="close" :dialog="dialog" @cancel="cancelAddPlayer"></player-modal>
      <player v-for="(player, index) in players" :name="player.name"></player>
    <v-btn class="newGame" v-if="!newGame" color="primary" flat @click="dialog = true">New game</v-btn>

    <v-flex xs12 sm8 md6 v-if="newGame">
      <!-- <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div> -->
      <v-card>
        <v-card-title class="headline">Yams</v-card-title>
        <v-card-text>
          <p>Play, Drink, Laugh, Win, Repeat</p>
          <div class="text-xs-right">
            <em><small>&mdash; Fabien</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = true; newGame = false">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
<!-- </v-container> -->
</template>

<script>
  import {mapGetters} from 'vuex'
  import PlayerModal from './../components/PlayerModal'
  import Player from './../components/Player'

  export default {
    components: {
      PlayerModal,
      Player
    },
    data: () => ({
      dialog: false,
      newGame: true
    }),
    methods: {
      close () {
        this.dialog = false
        this.newGame = false
      },
      cancelAddPlayer () {
        this.dialog = false
        this.newGame = false
      }

    },
    computed: {
      ...mapGetters(['players'])
    }
  }
</script>
<style>
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
}
.application--light .card, .application .theme--light.card{
  background-color: white;
  border-radius: 5px;
}
</style>
