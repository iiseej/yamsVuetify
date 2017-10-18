<template>
    <v-dialog v-model="playerDialog" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter des joueurs <v-btn fab dark color="black" small @click="addPlayer">
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
          <v-btn color="blue darken-1" flat @click.native="closeModal">Start</v-btn>
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
    ...mapActions(['addPlayer', 'removePlayer', 'reset']),
    closeModal () {
      this.$emit('closeModal')
    },
    cancel () {
      this.reset()
      this.$emit('cancel')
    },
    addPlayer () {
      this.players.push(
        {
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
      )
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
