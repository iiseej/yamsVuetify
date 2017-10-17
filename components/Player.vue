<template>
  <v-container fluid>
    <v-layout  justify-center>
      <v-flex xs6 class="playerColumn">
        <v-card>
          <v-card-text class="scores px-0">
            <v-container class="haut">
            <v-layout  class="height-4vh">
            <v-flex xs12>
            <v-subheader class="player-name">{{ name }}</v-subheader>
            </v-flex>
            </v-layout>
            </v-container>

            <v-container class="haut">
        <v-layout class="height-4vh"  row v-for="(category, index) in score.haut">
          <v-flex xs9>
            <v-subheader>{{ category.name }}</v-subheader>
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
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container class="haut">
  <v-layout  class="height-4vh" row v-for="(category, index) in score.difference">
    <v-flex xs9>
      <v-subheader>{{ category.name }}</v-subheader>
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
<v-layout  class="height-4vh" row v-for="(category, index) in score.suites">
<v-flex xs9>
<v-subheader>{{ category.name }}</v-subheader>
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
<v-layout  class="height-4vh" row v-for="(category, index) in score.bas">
<v-flex xs9>
<v-subheader>{{ category.name }}</v-subheader>
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
    color: null,
    total: {
      value: 0
    },
    score: {
      haut: [
        {
          name: 'Les As',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Les 2',
          value: null,
          color: 'transparent'

        },
        {
          name: 'Les 3',
          value: null,
          color: 'transparent'

        },
        {
          name: 'Les 4',
          value: null,
          color: 'transparent'

        },
        {
          name: 'Les 5',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Les 6',
          value: null,
          color: 'transparent'

        },
        {
          name: 'Total Haut',
          value: 0,
          color: '#1d4f74'
        }],
      difference: [
        {
          name: 'Le petit',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Le grand',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Différence',
          value: 0,
          color: '#1d4f74'
        }],
      suites: [
        {
          name: 'Petite suite',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Grande suite',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Total suites',
          value: 0,
          color: '#1d4f74'
        }],
      bas: [
        {
          name: 'Brelan',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Full',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Carré',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Yams',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Bonus Yams',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Yams sec',
          value: null,
          color: 'transparent'
        },
        {
          name: 'Total bas',
          value: 0,
          color: '#1d4f74'
        }
      ]
    }
  }),
  computed: {
    ...mapGetters(['players']),
    setColor () {
      this.color = 'hsl(' + Math.round(this.total.value / 4.8) + ', 100%, 50%)'
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
.card {
  background-color: transparent;
}
.content {
  margin: 0;
}
.playerColumn{
  height: 100vh;
  background-color: transparent;
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
  text-align: center;
  color: red;
  background-color: transparent;
  min-height: 0px;
}
.grand-total-div{
  display:flex;
  justify-content: center;
}
.player-name{
  display:flex;
  justify-content: center;
  font-size: 20px;
  color: #113c68;
}

.label
  font-weight: bold
  font-size: 20px
.player
  display: flex
  flex-direction: column
  margin-right: 50px
  margin-left: 50px
  width: 150px
  height: 100%

.chip
  width: 120px
  height: 50px
  font-size: 12px
  font-weight: regular
.token
  text-align: center
  margin-bottom: 2px
  font-weight: bold
  font-size: 20px
  margin-top: 2px
  border-radius: 5px

.row
  background-color: rgba(#feeed5, 0.54)
  color: black
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 5px 0 5px

.name
  text-align: center
  background-color: rgba(#feeed5, 0.54)

.Total
  font-weight: bold

.labelTotal
  font-weight: bold
  color: white
  background-color: #1d4f74
  border-radius: 5px
  font-size: 20px


.label0, .label1, .label2, .label3, .label4, .label5, .label7, .label8, .label10, .label11, .label13, .label14, .label15, .label16, .label17, .label18
  color: #1d4f74
  font-size: 20px
  border-radius: 5px

input:focus
  border: none;
  color: transparent;
  display: inline-block;
  font-size: 2em;
  text-shadow: 0 0 0 #1d4f74;
  width: 2em;

</style>
