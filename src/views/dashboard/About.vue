<template>
  <v-container
    id="widgets"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Meet The Team"
      link="components/cards"
    />

    <v-row>
      <v-timeline
        align-bottom
        reverse="reverse"
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(timeline, i) in timelines"
          :key="i"
          :color="timeline.color"
          :icon="timeline.icon"
          fill-dot
          large
        >
          <base-material-testimony
            :blurb="timeline.blurb"
            :author="timeline.author"
            :handle="timeline.handle"
            :avatar="timeline.avatar"
          />
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Widgets',
    data: () => ({
      timelines: [
        {
          color: 'error',
          icon: 'mdi-star',
          blurb: 'Magkaroon lng ako ng sariling bahay, lupa, at sasakyan happy n ako.',
          author: 'Russel Rodriguez',
          handle: 'rodriguez.johnrussel.d.1592@gmail.com',
          avatar: require('@/assets/profilepic/rsl.jpg'),
        },
        {
          color: 'success',
          icon: 'mdi-puzzle',
          blurb: 'Someday when I have my own salary, I wanted to give back to my parents. (Their sacrifices and love)',
          author: 'Ciara Solis',
          handle: 'solis.ciaramae.s.1721@gmail.com',
          avatar: require('@/assets/profilepic/ciara.jpg'),
        },
        {
          color: 'info',
          icon: 'mdi-fingerprint',
          blurb: 'Magkaron ng sariling bahay, makapag travel sa ibat ibang bansa, yumaman',
          author: 'Jerico Salvador',
          handle: 'salvador.jerico.l.1527@gmail.com',
          avatar: require('@/assets/profilepic/jerico.png'),
        },
        {
          color: 'primary',
          icon: 'mdi-hand-okay',
          blurb: 'Pangarap kong magkaron ng sariling bahay ang mga magulang ko at maibalik ko yung mga sakripisyo nila sakin.',
          author: 'Earl Espidillon',
          handle: 'espidillon.earlgerald.s.0455@gmail.com',
          avatar: require('@/assets/profilepic/earl.jpg'),
        },
        {
          color: 'brown',
          icon: 'mdi-rodent',
          blurb: 'To have a simple life and travel to a famous tourist spot in Japan with my family and friends build my own house and recognize as a developer in the company someday.',
          author: 'Josel Gonzales',
          handle: 'gonzales.josel.c.7265@gmail.com',
          avatar: require('@/assets/profilepic/josel.jpg'),
        },
        {
          color: 'deeporange',
          icon: 'mdi-robot-vacuum',
          blurb: 'Di ko alam o nalimutan ko lang?',
          author: 'Gelluel Cabingao',
          handle: 'cabingaogelluelc@gmail.com',
          avatar: require('@/assets/profilepic/gell.jpg'),
        },
        {
          color: 'teal',
          icon: 'mdi-robot-love-outline',
          blurb: 'Maging masaya? Travel goal mo na lang HAHA',
          author: 'Christian Esguerra',
          handle: 'esguerra.christian.g.0443@gmail.com',
          avatar: require('@/assets/profilepic/christian.png'),
        },
        {
          color: 'lime',
          icon: 'mdi-robot-happy-outline',
          blurb: 'To be successful in life and to have a better future for my son.',
          author: 'Jaymie Sta Maria',
          handle: 'jaymiestamaria123@gmail.com',
          avatar: require('@/assets/profilepic/jaymie.jpg'),
        },
      ],
    }),
  }
</script>
