<template>
  <v-layout row justify-center align-center>
    <game-menu @newGame="openPlayerModal" @exit="closeMenu":drawer="drawer"></game-menu>
    <player-modal @closeModal="close"  :dialog="dialog" @cancel="cancelAddPlayer"></player-modal>
    <player v-for="(player, index) in players" :index="index"></player>

    <v-btn @click.stop="drawer = !drawer" v-if="newGame" dark color="info">Menu</v-btn>


    <!-- New game window -->
    <v-flex xs12 sm8 md6 v-if="!drawer && !newGame">
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
          <v-btn color="primary" flat @click.stop="drawer = !drawer; newGame = false">Play !</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PlayerModal from './../components/PlayerModal'
  import Player from './../components/Player'
  import GameMenu from './../components/GameMenu'

  export default {
    components: {
      PlayerModal,
      Player,
      GameMenu
    },
    data: () => ({
      dialog: false,
      newGame: false,
      drawer: false
    }),
    methods: {
      ...mapActions(['reset']),
      close () {
        this.dialog = false
        this.newGame = true
        this.drawer = false
      },
      cancelAddPlayer () {
        this.dialog = false
        this.newGame = false
        this.drawer = true
      },
      openPlayerModal () {
        this.reset()
        this.dialog = true
      },
      closeMenu () {
        this.reset()
        this.drawer = false
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
