<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Residents Record Summary"
      link="/srbulacan"
    />
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-account-multiple"
          title="Total Population"
          value="1440"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-vote"
          title="Registered Voters"
          value="69"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-human-female"
          title="Female"
          value="420"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-human-male"
          title="Male"
          value="1"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Produce some male..."
        />
      </v-col>

      <v-col
        cols="12"
      >
        <div
          class="font-weight-light mt-1"
          style="font-size: 25px"
        >
          Barangay Sampaloc
        </div>
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="secondary"
          inline
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Barangay Officials
            </div>

            <div class="subtitle-1 font-weight-light">
              Barangay Officials 2020 - 2021
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Barangay Position',
            value: 'barangay_position',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Douglas Clayton',
            barangay_position: 'Brgy Captain',
          },
          {
            id: 2,
            name: 'Reginald Hargreeves',
            barangay_position: 'Appropriation',
          },
          {
            id: 3,
            name: 'Arsene Lupin',
            barangay_position: 'Agriculture',
          },
          {
            id: 4,
            name: 'Jane Hopper',
            barangay_position: 'Infrastructure',
          },
          {
            id: 5,
            name: 'Harry Potter',
            barangay_position: 'Education',
          },
          {
            id: 6,
            name: 'Dale Carnegie',
            barangay_position: 'Peace and Order',
          },
          {
            id: 7,
            name: 'Harry Potter',
            barangay_position: 'Health',
          },
          {
            id: 8,
            name: 'Harry Potter',
            barangay_position: 'Sk Chairwoman',
          },
          {
            id: 9,
            name: 'Harry Potter',
            barangay_position: 'Secretary',
          },
          {
            id: 10,
            name: 'Harry Potter',
            barangay_position: 'Treasurer',
          },
          {
            id: 11,
            name: 'Harry Potter',
            barangay_position: 'Record Keeper',
          },
        ],
      }
    },
  }
</script>
