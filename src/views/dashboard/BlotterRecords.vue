<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Blotter Records"
      link="/srbulacan"
    />
    <base-material-card
      color="success"
      icon="mdi-clipboard-text"
      inline
      title="Simple Table"
      hover-reveal
      class="px-5 py-3 mb-5"
    >
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:[`item.gender`]="{ item }">
          <v-chip
            dark
            :color="getColor(item.gender)"
            v-text="getGender(item.gender)"
          />
        </template>
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Blotter List</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Blotter
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.caseNo"
                          label="Case No"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.incidentType"
                          label="Incident Type"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.reportingPerson"
                          label="Reporting Person"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.suspect"
                          label="Suspect"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.placeOfIncident"
                          label="Place Of Incident"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.status"
                          label="Status"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title class="headline">
                  Are you sure you want to delete this?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            :color="actions[0].color"
            class="px-1 ml-1"
            fab
            x-small
            @click="editItem(item)"
          >
            <v-icon
              v-text="actions[0].icon"
            />
          </v-btn>
          <v-btn
            :color="actions[1].color"
            class="px-1 ml-1"
            fab
            x-small
            @click="deleteItem(item)"
          >
            <v-icon
              v-text="actions[1].icon"
            />
          </v-btn>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      actions: [
        {
          color: 'success',
          icon: 'mdi-pencil',
        },
        {
          color: 'error',
          icon: 'mdi-close',
        },
      ],
      headers: [
        {
          text: 'Case No',
          align: 'start',
          sortable: false,
          value: 'caseNo',
        },
        { text: 'Incident Type', value: 'incidentType' },
        { text: 'Reporting Person', value: 'reportingPerson' },
        { text: 'Suspect', value: 'suspect' },
        { text: 'Place Of Indicident', value: 'placeOfIncident' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        age: 0,
        gender: null,
        address: '',
      },
      defaultItem: {
        name: '',
        age: 0,
        gender: null,
        address: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Blotter' : 'Edit Blotter'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = [
          {
            caseNo: '32-2',
            incidentType: 'Carnapping',
            reportingPerson: '69 Planetang Namek',
            suspect: 'Yogurt',
            placeOfIncident: 'Krusty',
            status: 'Settled Cases',
          },
          {
            caseNo: '89-8',
            incidentType: 'Property damage',
            reportingPerson: '77 Geary Street',
            suspect: 'Cheese Cake',
            placeOfIncident: 'Barangay Gym',
            status: 'Settled Cases',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.unshift(this.editedItem)
        }
        this.close()
      },
      getGender (gender) {
        if (gender === true) return 'M'
        else if (gender === false) return 'F'
      },
      getColor (gender) {
        if (gender === true) return 'red'
        else if (gender === false) return 'orange'
      },
    },
  }
</script>
