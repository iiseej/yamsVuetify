<template>
  <v-container fluid>
    <v-layout  justify-center>
      <v-flex xs8 class="playerColumn">
        <v-card :style="{'background-color': columnColor}">
          <v-card-text class="scores px-0">
            <v-container class="haut">
              <v-layout  class="height-4vh">
                <v-flex xs12>

                  <v-subheader class="player-name display-1">{{ player.name }}</v-subheader>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container class="haut">

              <v-layout class="height-4vh" row v-for="(score, name) in player.score.top">
                <v-flex xs9>
                  <v-subheader class="dices height-4vh" ><img class="dice-png" :src="`dices/${name}.png`"/></v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field solo single-line
                  class="input-score"
                  name="input-1-3"
                  v-model.number="player.score.top[name]"
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-container>

            <v-container class="haut">
              <v-layout  class="height-4vh" :style="{'background-color': bgcolor}">
                <v-flex class="grand-total-div"xs12>
                  <v-subheader class="grand-total-text title">{{ totalHigh }}  <span v-if="totalHigh < 63"class="caption"> ({{ 63 - totalHigh }}) </span></v-subheader>
                </v-flex>
              </v-layout>
            </v-container>


            <v-container class="haut">
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh"><v-icon class="material-icons" color="black">remove_circle</v-icon></v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model="player.score.diff.lowest">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh"><v-icon class="material-icons" color="black">add_circle</v-icon></v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model="player.score.diff.highest">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container class="haut">
              <v-layout  class="height-4vh" :style="{'background-color': bgcolor}">
                <v-flex class="grand-total-div" xs12>
                  <v-subheader class="grand-total-text title">{{ totalDiff }}</v-subheader>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container class="haut">
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">
                    <img class="dice-png" :src="`dices/one.png`"/>
                    <img class="dice-png" :src="`dices/two.png`"/>
                    <img class="dice-png" :src="`dices/three.png`"/>
                    <img class="dice-png" :src="`dices/four.png`"/>
                    <img class="dice-png" :src="`dices/five.png`"/>
                  </v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    @dblclick="player.score.straights.small = Number(player.score.straights.small) + 30"
                    v-model.number="player.score.straights.small">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">
                    <img class="dice-png" :src="`dices/two.png`"/>
                    <img class="dice-png" :src="`dices/three.png`"/>
                    <img class="dice-png" :src="`dices/four.png`"/>
                    <img class="dice-png" :src="`dices/five.png`"/>
                    <img class="dice-png" :src="`dices/six.png`"/>
                  </v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    @dblclick="player.score.straights.high = Number(player.score.straights.high) + 40"
                    v-model.number="player.score.straights.high">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container class="haut">
              <v-layout  class="height-4vh" :style="{'background-color': bgcolor}">
                <v-flex class="grand-total-div"xs12>
                  <v-subheader class="grand-total-text title">{{ totalSuite }}</v-subheader>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container class="haut">
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Brelan +20</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model.number="player.score.bottom.threeOfAKind">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Full +30</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model.number="player.score.bottom.fullHouse">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Carré</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model.number="player.score.bottom.fourOfAKind">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Yams</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    v-model.number="player.score.bottom.yams">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Bonus Yams</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    @dblclick="player.score.bottom.bonusYams = Number(player.score.bottom.bonusYams) + 50"
                    v-model.number="player.score.bottom.bonusYams">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  class="height-4vh">
                <v-flex xs9>
                  <v-subheader class="height-4vh">Yams Sec</v-subheader>
                </v-flex>
                <v-flex class="input-block" xs3>
                  <v-text-field name="input-1-3" class="input-score" label="" single-line solo
                    @dblclick="player.score.bottom.yamsSec = Number(player.score.bottom.yamsSec) + 100"
                    v-model.number="player.score.bottom.yamsSec">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container class="haut">
              <v-layout  class="height-4vh" :style="{'background-color': bgcolor}">
                <v-flex class="grand-total-div" xs12>
                  <v-subheader class="grand-total-text title">{{ totalBottom }}</v-subheader>
                </v-flex>
              </v-layout>
            </v-container>

            <v-container class="haut">
              <v-layout  class="total height-4vh" :style="{'background-color': color}">
                <v-flex class="grand-total-div"xs12>
                  <v-subheader class="grand-total-text display-1">{{ total }}</v-subheader>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'player',
  props: {
    index: Number,
    player: {
      type: Object
    }
  },
  data: () => ({
    bgcolor: 'hsla(39, 87%, 90%, 0.6)'
  }),
  computed: {
    ...mapGetters(['players']),
    color () {
      return 'hsl(' + Math.round(this.total / 4.8) + ', 100%, 50%)'
    },
    columnColor () {
      return 'hsla(' + Math.round(this.total / 4.8) + ', 100%, 50%, 0.15)'
    },
    totalHigh () {
      let total = _.reduce(this.player.score.top, (sum, v) => (sum + Number(v)))
      if (total >= 63) {
        total += 50
      }
      return total
    },
    totalDiff () {
      let total = 0
      if ((Number(this.player.score.diff.lowest) === 0 || Number(Number(this.player.score.diff.highest)) === 0)) {
        total = 0
      } else if (Number(Number(this.player.score.diff.highest)) < Number(this.player.score.diff.lowest)) {
        total = 0
      } else {
        total = Number(Number(this.player.score.diff.highest)) - Number(this.player.score.diff.lowest) + 20
      }
      return total
    },
    totalSuite () {
      let total = _.reduce(this.player.score.straights, (sum, v) => (sum + Number(v)))
      if (total >= 70) {
        total += 30
      }
      return total
    },
    totalBottom () {
      let total = _.reduce(this.player.score.bottom, (sum, v) => (sum + Number(v)))
      return total
    },
    total () {
      const total = this.totalHigh + this.totalDiff + this.totalSuite + this.totalBottom
      this.player.score.total = total
      return total
    },
    score2 () {
      return this.player.score
    }
  },
  watch: {
    player: {
      deep: true,
      handler () {
        this.$emit('save', this.total)
      }
    }
  },
  methods: {
    setColor () {
      this.color = 'hsl(' + Math.round(this.score.total.value / 4.8) + ', 100%, 50%)'
      this.columnColor = 'hsla(' + Math.round(this.score.total.value / 4.8) + ', 100%, 50%, 0.15)'
    },
    savePlayer () {
      this.$emit('savePlayer', this.score, this.players[this.index].name, this.players[this.index].id)
      // _.forEach(this.score, (sc) => {
      //   _.forEach(sc, (cat) => {
      this.players[this.index].score = this.score
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>

.input-block {
  padding-right: 5px;
}
.subheader {
  padding-left: 5px;
}
.content {
  margin: 0;
}
.playerColumn{
  height: 99vh;
}
.scores{
  height: 99vh;
  padding: 0;
  margin: 0vh 0vh 0vh 0;
  background-color: rgba(#fceace, 0.25);
}
.height-4vh {
  height: 4vh;
}
.cat-name {
  font-size: 12px;
}
.total {
  height: 6vh;
}
li {
  padding: 0;
}
.haut {
  padding: 0 0 1vh 0;
}
.input-score{
  display: flex;
  justify-content: center;
  background-color: transparent;
  min-height: 0px;
  height: 4vh;
}
.grand-total-div{
  display:flex;
  justify-content: center;
  align-items: center;
}
.grand-total-text {
  font-weight: 700;
}
.player-name{
  display:flex;
  justify-content: center;
  font-size: 20px;
  color: black;
}
.dice-png
  max-width: 100%
  max-height: 100%
</style>
