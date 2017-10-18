<template>
  <v-layout wrap v-if="drawer">
    <v-container>
      <v-layout justify-center>
        <!-- <v-btn @click.stop="drawer = !drawer" dark color="info">Menu</v-btn> -->
      </v-layout>
    </v-container>
    <v-navigation-drawer
      persistent
      v-model="menu"
      light
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="dice.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Yams</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="$emit(item.function)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  name: 'GameMenu',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      { title: 'Nouvelle partie', icon: 'dashboard', function: 'newGame' },
      { title: 'Charger partie en cours', icon: 'dashboard', function: 'loadLostGame' },
      { title: 'Partie suivante', icon: 'question_answer', function: 'nextGame' },
      { title: 'Statistiques', icon: 'question_answer', function: 'stats' },
      { title: 'Quitter', icon: 'question_answer', function: 'exit' }
    ]
  }),
  methods: {
    newGame () {
      this.$emit('newGame')
    },
    nextGame () {
      this.$emit('saveGame')
    },
    stats () {

    },
    exit () {
      this.$emit('exit')
    },
    loadLostGame () {
      this.$emit('loadLostGame')
    }
  },
  computed: {
    menu () {
      return this.drawer
    }
  }
}
</script>

<style>
</style>
