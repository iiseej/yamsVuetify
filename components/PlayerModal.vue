<template>
    <v-dialog v-model="playerDialog" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter des joueurs <v-btn fab dark color="indigo" small @click="addPlayer">
      <v-icon dark>add</v-icon>
    </v-btn></span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex class="select-player" xs12 sm12 v-for="(player, index) in players">
                <v-select
                  clearable
                  v-model="player.name"
                  label="Joueur"
                  autocomplete
                  single-line
                  bottom
                  :items="['Fab', 'Soso', 'François', 'Alex', 'Clem', 'Judus', 'Jess']"
                ></v-select>
                <v-btn color="red" dark @click.native="removePlayer(index)">
                  <v-icon light center>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeModal">Ok</v-btn>
          <v-btn color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'playerModal',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(['addPlayer', 'removePlayer']),
    closeModal () {
      this.$emit('closeModal')
    },
    cancel () {
      this.players.splice(0, this.players.length)
      this.$emit('cancelAddPlayer')
    },
    addPlayer () {
      this.players.push({name: ''})
    },
    removePlayer (idx) {
      this.players.splice(idx, 1)
    }
  },
  computed: {
    playerDialog () {
      return this.dialog
    },
    ...mapGetters(['players'])
  }
}
</script>

<style>
.select-player{
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
</style>
