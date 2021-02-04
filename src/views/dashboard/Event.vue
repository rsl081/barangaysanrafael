<template>
  <v-container
    id="calendar"
    fluid
    tag="section"
  >
    <base-v-component
      heading="San Rafael Calendar"
      link="/srbulacan"
    />

    <v-row>
      <v-col
        cols="12"
        md="10"
        class="mx-auto"
      >
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>March 2021</v-toolbar-title>

            <v-spacer />

            <calendar-btn
              v-for="(t, i) in types"
              :key="i"
              @click="type = t"
            >
              {{ t }}
            </calendar-btn>

            <v-spacer />

            <calendar-btn @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </calendar-btn>

            <calendar-btn @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </calendar-btn>
          </v-toolbar>

          <v-sheet
            height="600"
            flat
            class="mt-5"
          >
            <v-calendar
              ref="calendar"
              v-model="calendar"
              :events="events"
              :type="type"
              event-color="primary"
              now="2021-03-08"
            />
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Components
  import { VBtn } from 'vuetify/lib'

  export default {
    name: 'DashboardCalendar',

    components: {
      CalendarBtn: {
        extends: VBtn,

        props: {
          color: {
            type: String,
            default: 'secondary',
          },
          minWidth: {
            type: Number,
            default: 0,
          },
          rounded: {
            type: Boolean,
            default: true,
          },
        },

        computed: {
          classes () {
            return {
              ...VBtn.options.computed.classes.call(this),
              'mx-1': true,
              'text-lowercase': true,
            }
          },
        },
      },
    },

    data: () => ({
      calendar: '2021-03-08',
      disabled: true,
      events: [
        {
          name: 'Vacation',
          start: '2018-12-30',
          end: '2021-01-02',
        },
        {
          name: 'Meeting',
          start: '2021-03-07',
        },
        {
          name: 'Meeting Ni Cap',
          start: '2021-03-03',
        },
        {
          name: 'Graduation',
          start: '2021-03-31',
        },
        {
          name: 'Conference',
          start: '2021-03-21',
        },
        {
          name: 'Hackathon',
          start: '2021-03-17',
          end: '2021-03-19',
        },
        {
          name: 'My Fucking Birthday!',
          start: '2021-03-24',
        },
      ],
      focus: '',
      type: 'month',
      types: [
        'month',
        'week',
        'day',
      ],
    }),
  }
</script>

<style lang="sass">
  #calendar
    .v-calendar-weekly__day:last-child,
    .v-calendar-weekly__head-weekday:last-child
      border-right: none

    .v-calendar-weekly__week:last-child .v-calendar-weekly__day
      border-bottom: none
</style>
