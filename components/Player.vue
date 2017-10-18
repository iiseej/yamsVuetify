<template>
  <v-container fluid>
    <v-layout  justify-center>
      <v-flex xs10 class="playerColumn">
        <v-card :style="{'background-color': columnColor}">
          <v-card-text class="scores px-0">
            <v-container class="haut">
            <v-layout  class="height-4vh">
            <v-flex xs12>

            <v-subheader class="player-name display-1">{{ players[index].name }}</v-subheader>
            </v-flex>
            </v-layout>
            </v-container>

            <v-container class="haut">
        <v-layout class="height-4vh"  row v-for="(category, index) in score.haut" :style="{'background-color': category.bgcolor}">
          <v-flex xs9>
            <v-subheader class="dices height-4vh" :style="{'color': category.textColor}" ><img class="dice-png" :src="category.icon"/> {{ category.name }}</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-text-field
            class="input-score"
             solo
              @keyup.native="totalHaut(), grandTotal(), setColor()"
              name="input-1-3"
              v-model="category.value"
              label=""
              single-line
              :style="{'color': category.textColor}"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="haut">
      <v-layout  class="height-4vh" :style="{'background-color': score.totalHaut.bgcolor}">
      <v-flex class="grand-total-div"xs12>
      <v-subheader class="grand-total-text title">{{ score.totalHaut.value }}</v-subheader>
      </v-flex>
      </v-layout>
      </v-container>


      <v-container class="haut">
  <v-layout  class="height-4vh" row v-for="(category, index) in score.difference" :style="{'background-color': category.bgcolor}">
    <v-flex xs9>
      <v-subheader class="height-4vh" :style="{'color': category.textColor}"><v-icon class="material-icons" color="black">{{ category.icon }}</v-icon>{{ category.name }}</v-subheader>
    </v-flex>
    <v-flex xs3>
      <v-text-field
      class="input-score"
      @keyup.native="diff(), grandTotal(), setColor()"
        v-model="category.value"
        name="input-1-3"
        label=""
        single-line
        solo
      ></v-text-field>
    </v-flex>
  </v-layout>
</v-container>
<v-container class="haut">
<v-layout  class="height-4vh" :style="{'background-color': score.totalDiff.bgcolor}">
<v-flex class="grand-total-div" xs12>
<v-subheader class="grand-total-text title">{{ score.totalDiff.value }}</v-subheader>
</v-flex>
</v-layout>
</v-container>

<v-container class="haut">
<v-layout  class="height-4vh" row v-for="(category, index) in score.suites" :style="{'background-color': category.bgcolor}">
<v-flex xs9>
<v-subheader class="height-4vh" :style="{'color': category.textColor}"><img v-for="dice in category.dices" class="dice-png" :src="dice"/> {{ category.name }}</v-subheader>
</v-flex>
<v-flex xs3>
<v-text-field
@dblclick.native="inputSuiteScore(category.ref), setColor()"
class="input-score"
@keyup.native="totalSuite(), grandTotal(), setColor()"
v-model="category.value"
  name="input-1-3"
  label=""
  single-line
  solo
></v-text-field>
</v-flex>
</v-layout>
</v-container>
<v-container class="haut">
<v-layout  class="height-4vh" :style="{'background-color': score.totalSuite.bgcolor}">
<v-flex class="grand-total-div"xs12>
<v-subheader class="grand-total-text title">{{ score.totalSuite.value }}</v-subheader>
</v-flex>
</v-layout>
</v-container>

<v-container class="haut">
<v-layout  class="height-4vh" row v-for="(category, index) in score.bas" :style="{'background-color': category.bgcolor}">
<v-flex xs9>
<v-subheader class="height-4vh" :style="{'color': category.textColor}">{{ category.name }}</v-subheader>
</v-flex>
<v-flex xs3>
<v-text-field
@dblclick.native="inputBasScore(category.ref), setColor()"
class="input-score"
  @keyup.native="totalBas(), grandTotal(), setColor()"
v-model="category.value"
  name="input-1-3"
  label=""
  single-line
  solo
></v-text-field>
</v-flex>
</v-layout>
</v-container>
<v-container class="haut">
<v-layout  class="height-4vh" :style="{'background-color': score.totalBas.bgcolor}">
<v-flex class="grand-total-div" xs12>
<v-subheader class="grand-total-text title">{{ score.totalBas.value }}</v-subheader>
</v-flex>
</v-layout>
</v-container>

<v-container class="haut">
<v-layout  class="total height-4vh" :style="{'background-color': color}">
<v-flex class="grand-total-div"xs12>
<v-subheader class="grand-total-text display-1">{{ total.value }}</v-subheader>
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
    index: Number
    // name: {
    //   type: String,
    //   required: true
    // }
  },
  data: () => ({
    color: 'hsla(0, 0%, 100%, 0)',
    columnColor: 'hsla(0, 0%, 100%, 0)',
    total: {
      value: 0
    },
    score: {
      totalHaut: {
        ref: 'totalHaut',
        name: 'Total Haut',
        value: 0,
        bgcolor: 'hsla(39, 87%, 90%, 0.6)',
        textColor: 'black'
      },
      totalDiff: {
        ref: 'totalDiff',
        name: 'Différence + 20',
        value: 0,
        bgcolor: 'hsla(39, 87%, 90%, 0.6)',
        textColor: 'black'
      },
      totalSuite: {
        ref: 'totalSuite',
        name: 'Total suites',
        dices: '',
        value: 0,
        bgcolor: 'hsla(39, 87%, 90%, 0.6)',
        textColor: 'black'
      },
      totalBas: {
        ref: 'totalBas',
        name: 'Total bas',
        value: 0,
        bgcolor: 'hsla(39, 87%, 90%, 0.6)',
        textColor: 'black'
      },
      haut: {
        ace: {
          icon: '1.png',
          value: '',
          bgcolor: this.columnColor,
          textColor: 'black',
          name: ''
        },
        two: {
          ref: 'two',
          icon: '2.png',
          value: '',
          bgcolor: this.columnColor,
          name: ''
        },
        three: {
          ref: 'three',
          icon: '3.png',
          value: '',
          bgcolor: this.columnColor,
          name: ''
        },
        four: {
          ref: 'four',
          icon: '4.png',
          value: '',
          bgcolor: this.columnColor,
          name: ''
        },
        five: {
          ref: 'five',
          icon: '5.png',
          value: '',
          bgcolor: this.columnColor,
          name: ''
        },
        six: {
          ref: 'six',
          icon: '6.png',
          value: '',
          bgcolor: this.columnColor,
          name: ''
        }
      },
      difference: {
        moins: {
          ref: 'moins',
          name: '',
          value: '',
          bgcolor: this.columnColor,
          icon: 'remove_circle'
        },
        plus: {
          ref: 'plus',
          name: '',
          value: '',
          bgcolor: this.columnColor,
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
          value: '',
          bgcolor: this.columnColor
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
          value: '',
          bgcolor: this.columnColor
        }
      },
      bas: {
        brelan: {
          ref: 'brelan',
          name: 'Brelan +20',
          value: '',
          bgcolor: this.columnColor
        },
        full: {
          ref: 'full',
          name: 'Full +30',
          value: '',
          bgcolor: this.columnColor
        },
        carre: {
          ref: 'carre',
          name: 'Carré +40',
          value: '',
          bgcolor: this.columnColor
        },
        yams: {
          ref: 'yams',
          name: 'Yams +50',
          value: '',
          bgcolor: this.columnColor
        },
        bonusYams: {
          ref: 'bonusYams',
          name: 'Bonus Yams - 50 pts',
          value: '',
          bgcolor: this.columnColor
        },
        yamsSec: {
          ref: 'yamsSec',
          name: 'Yams sec - 100pts',
          value: '',
          bgcolor: this.columnColor
        }
      }
    }
  }),
  computed: {
    ...mapGetters(['players'])
  },
  methods: {
    setColor () {
      this.color = 'hsl(' + Math.round(this.total.value / 4.8) + ', 100%, 50%)'
      this.columnColor = 'hsla(' + Math.round(this.total.value / 4.8) + ', 100%, 50%, 0.15)'
    },
    totalHaut () {
      this.score.totalHaut.value = 0
      _.forEach(this.score.haut, (cat) => {
        console.log(cat)
        this.score.totalHaut.value += Number(cat.value)
      })
    },
    diff () {
      if ((Number(this.score.difference.moins.value) === 0 || Number(this.score.difference.plus.value) === 0)) {
        this.score.totalDiff.value = 0
      } else if (Number(this.score.difference.plus.value) < Number(this.score.difference.moins.value)) {
        this.score.totalDiff.value = 0
      } else {
        this.score.totalDiff.value = Number(this.score.difference.plus.value) - Number(this.score.difference.moins.value) + 20
      }
    },
    totalSuite () {
      if (Number(this.score.suites.petiteSuite.value) === 30 && Number(this.score.suites.grandeSuite.value) === 40) {
        this.score.totalSuite.value = Number(this.score.suites.petiteSuite.value) + Number(this.score.suites.grandeSuite.value) + 30
      } else {
        this.score.totalSuite.value = Number(this.score.suites.petiteSuite.value) + Number(this.score.suites.grandeSuite.value)
      }
    },
    inputSuiteScore (ref) {
      ref === 'petiteSuite' ? this.score.suites.petiteSuite.value = 30 : this.score.suites.grandeSuite.value = 40
      this.totalSuite()
    },
    totalBas () {
      this.score.totalBas.value = 0
      _.forEach(this.score.bas, (cat) => {
        this.score.totalBas.value += Number(cat.value)
      })
    },
    inputBasScore (ref) {
      if (ref === 'bonusYams') {
        this.score.bas.bonusYams.value = Number(this.score.bas.bonusYams.value) + 50
      } else if (ref === 'yamsSec') {
        this.score.bas.yamsSec.value = Number(this.score.bas.yamsSec.value) + 100
      }
      this.totalBas()
    },
    grandTotal () {
      this.total.value = this.score.totalHaut.value + this.score.totalDiff.value + this.score.totalSuite.value + this.score.totalBas.value
      // this.setScore()
    },
    // endOfGame () {
    //   if (!this.haut.some(elem => elem.value === null) && !this.bas.some(elem => elem.value === null)) {
    //     alert('partie finie')
    //   }
    // }
    setScore () {
    }
    // for (let i = 0; i < this.players[this.index].scores.haut.length; i += 1) {
    //   this.players[this.index].scores.haut[i].value = Number(this.score.haut[i].value)
    // }
    // for (let i = 0; i < this.players[this.index].scores.haut.length; i += 1) {
    //   this.players[this.index].scores.haut[i].value = Number(this.score.haut[i].value)
    // }
    // for (let i = 0; i < this.players[this.index].scores.haut.length; i += 1) {
    //   this.players[this.index].scores.haut[i].value = Number(this.score.haut[i].value)
    // }
  }
}
</script>

<style lang="stylus" scoped>

.content {
  margin: 0;
}
.playerColumn{
  height: 100vh;
}
.scores{
  height: 96vh;
  padding: 0;
  margin: 1vh 0vh 1vh 0;
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
