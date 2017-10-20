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
            total: {
              ref: 'total',
              value: 0
            },
            totalHaut: {
              ref: 'totalHaut',
              name: 'Total Haut',
              value: 0
            },
            totalDiff: {
              ref: 'totalDiff',
              name: 'Différence + 20',
              value: 0
            },
            totalSuite: {
              ref: 'totalSuite',
              name: 'Total suites',
              dices: '',
              value: 0
            },
            totalBas: {
              ref: 'totalBas',
              name: 'Total bas',
              value: 0
            },
            tables: {
              haut: {
                ace: {
                  ref: 'ace',
                  icon: '1.png',
                  value: '',
                  name: ''
                },
                two: {
                  ref: 'two',
                  icon: '2.png',
                  value: '',
                  name: ''
                },
                three: {
                  ref: 'three',
                  icon: '3.png',
                  value: '',
                  name: ''
                },
                four: {
                  ref: 'four',
                  icon: '4.png',
                  value: '',
                  name: ''
                },
                five: {
                  ref: 'five',
                  icon: '5.png',
                  value: '',
                  name: ''
                },
                six: {
                  ref: 'six',
                  icon: '6.png',
                  value: '',
                  name: ''
                }
              },
              difference: {
                moins: {
                  ref: 'moins',
                  name: '',
                  value: '',
                  icon: 'remove_circle'
                },
                plus: {
                  ref: 'plus',
                  name: '',
                  value: '',
                  icon: 'add_circle'
                }
              },
              suites: {
                petiteSuite: {
                  ref: 'petiteSuite',
                  dices: {
                    dice1: '1.png',
                    dice2: '2.png',
                    dice3: '3.png',
                    dice4: '4.png',
                    dice5: '5.png'
                  },
                  value: ''
                },
                grandeSuite: {
                  ref: 'grandeSuite',
                  dices: {
                    dice2: '2.png',
                    dice3: '3.png',
                    dice4: '4.png',
                    dice5: '5.png',
                    dice6: '6.png'
                  },
                  value: ''
                }
              },
              bas: {
                brelan: {
                  ref: 'brelan',
                  name: 'Brelan +20',
                  value: ''
                },
                full: {
                  ref: 'full',
                  name: 'Full +30',
                  value: ''
                },
                carre: {
                  ref: 'carre',
                  name: 'Carré +40',
                  value: ''
                },
                yams: {
                  ref: 'yams',
                  name: 'Yams +50',
                  value: ''
                },
                bonusYams: {
                  ref: 'bonusYams',
                  name: 'Bonus Yams - 50 pts',
                  value: ''
                },
                yamsSec: {
                  ref: 'yamsSec',
                  name: 'Yams sec - 100pts',
                  value: ''
                }
              }
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
