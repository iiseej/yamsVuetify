<template>
  <v-container fluid>
    <v-layout  justify-center>
      <v-flex xs10 class="playerColumn">
        <v-card :style="{'background-color': columnColor}">
          <v-card-text class="scores px-0">
            <v-container class="haut">
            <v-layout  class="height-4vh">
            <v-flex xs12>
            <v-subheader class="player-name display-1">{{ name }}</v-subheader>
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
<v-layout  class="height-4vh" row v-for="(category, index) in score.suites" :style="{'background-color': category.bgcolor}">
<v-flex xs9>
<v-subheader class="height-4vh" :style="{'color': category.textColor}"><img v-for="dice in category.dices" class="dice-png" :src="dice"/> {{ category.name }}</v-subheader>
</v-flex>
<v-flex xs3>
<v-text-field
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
<v-layout  class="height-4vh" row v-for="(category, index) in score.bas" :style="{'background-color': category.bgcolor}">
<v-flex xs9>
<v-subheader class="height-4vh" :style="{'color': category.textColor}">{{ category.name }}</v-subheader>
</v-flex>
<v-flex xs3>
<v-text-field
class="input-score"
  @keyup.native="totalBAs(), grandTotal(), setColor()"
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

export default {
  name: 'player',
  props: {
    index: Number,
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    color: 'hsla(0, 0%, 100%, 0)',
    columnColor: 'hsla(0, 0%, 100%, 0)',
    total: {
      value: 0
    },
    score: {
      haut: [
        {
          icon: '1.png',
          value: null,
          bgcolor: this.columnColor,
          textColor: 'black',
          name: ''
        },
        {
          icon: '2.png',
          value: null,
          bgcolor: this.columnColor,
          name: ''

        },
        {
          icon: '3.png',
          value: null,
          bgcolor: this.columnColor,
          name: ''

        },
        {
          icon: '4.png',
          value: null,
          bgcolor: this.columnColor,
          name: ''

        },
        {
          icon: '5.png',
          value: null,
          bgcolor: this.columnColor,
          name: ''
        },
        {
          icon: '6.png',
          value: null,
          bgcolor: this.columnColor,
          name: ''

        },
        {
          name: 'Total Haut',
          value: 0,
          bgcolor: 'hsla(39, 87%, 90%, 0.6)',
          textColor: 'black'
        }],
      difference: [
        {
          name: '',
          value: null,
          bgcolor: this.columnColor,
          icon: 'remove_circle'
        },
        {
          name: '',
          value: null,
          bgcolor: this.columnColor,
          icon: 'add_circle'
        },
        {
          name: 'Différence + 20',
          value: 0,
          bgcolor: 'hsla(39, 87%, 90%, 0.6)',
          textColor: 'black'
        }],
      suites: [
        {
          dices: {
            dice1: '1.png',
            dice2: '2.png',
            dice3: '3.png',
            dice4: '4.png',
            dice5: '5.png'
          },
          value: null,
          bgcolor: this.columnColor
        },
        {
          dices: {
            dice2: '2.png',
            dice3: '3.png',
            dice4: '4.png',
            dice5: '5.png',
            dice6: '6.png'
          },
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Total suites',
          dices: '',
          value: 0,
          bgcolor: 'hsla(39, 87%, 90%, 0.6)',
          textColor: 'black'
        }],
      bas: [
        {
          name: 'Brelan +20',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Full +30',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Carré +40',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Yams +50',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Bonus Yams - 50 pts',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Yams sec - 100pts',
          value: null,
          bgcolor: this.columnColor
        },
        {
          name: 'Total bas',
          value: 0,
          bgcolor: 'hsla(39, 87%, 90%, 0.6)',
          textColor: 'black'
        }
      ]
    }
  }),
  computed: {
    ...mapGetters(['players']),
    setColor () {
      this.color = 'hsl(' + Math.round(this.total.value / 4.8) + ', 100%, 50%)'
      this.columnColor = 'hsla(' + Math.round(this.total.value / 4.8) + ', 100%, 50%, 0.15)'
    }
  },
  methods: {
    totalHaut () {
      this.score.haut[6].value = 0
      for (let i = 0; i < 6; i += 1) {
        this.score.haut[6].value += Number(this.score.haut[i].value)
      }
      if (this.score.haut[6].value >= 63) {
        this.score.haut[6].value += 50
        this.score.haut[6].color = '#1d742e'
      }
    },
    diff () {
      if (Number(this.score.difference[0].value) === 0 || Number(this.score.difference[1].value) === 0) {
        this.score.difference[2].value = 0
      } else if (Number(this.score.difference[1].value) < Number(this.score.difference[0].value)) {
        this.score.difference[2].value = 0
      } else {
        this.score.difference[2].value = Number(this.score.difference[1].value) - Number(this.score.difference[0].value) + 20
      }
    },
    totalSuite () {
      if (Number(this.score.suites[0].value) === 30 && Number(this.score.suites[1].value) === 40) {
        this.score.suites[2].value = Number(this.score.suites[0].value) + Number(this.score.suites[1].value) + 30
      } else {
        this.score.suites[2].value = Number(this.score.suites[0].value) + Number(this.score.suites[1].value)
      }
    },
    totalBAs () {
      this.score.bas[6].value = 0
      for (let i = 0; i < 6; i += 1) {
        this.score.bas[6].value += Number(this.score.bas[i].value)
      }
    },
    grandTotal () {
      this.total.value = this.score.haut[6].value + this.score.difference[2].value + this.score.suites[2].value + this.score.bas[6].value
    }
    // endOfGame () {
    //   if (!this.haut.some(elem => elem.value === null) && !this.bas.some(elem => elem.value === null)) {
    //     alert('partie finie')
    //   }
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
