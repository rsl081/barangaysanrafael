<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Resident Records"
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
            <v-toolbar-title>Resident List</v-toolbar-title>
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
                  Add Resident
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
                          v-model="editedItem.name"
                          label="Name"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.age"
                          label="Age"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <p>Gender</p>
                        <v-radio-group
                          v-model="editedItem.gender"
                          column
                        >
                          <v-radio
                            label="Male"
                            color="red"
                            :value="true"
                          />
                          <v-radio
                            label="Female"
                            color="orange"
                            :value="false"
                          />
                        </v-radio-group>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.address"
                          label="Address"
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
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
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
          text: 'Full Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Age', value: 'age' },
        { text: 'Gender', value: 'gender' },
        { text: 'Address', value: 'address' },
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
        return this.editedIndex === -1 ? 'New Resident' : 'Edit Resident'
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
            name: 'Frozen Yogurt',
            age: 15,
            gender: false,
            address: '69 Planetang Namek',
          },
          {
            name: 'Ice cream sandwich',
            age: 23,
            gender: true,
            address: '295 Street Namek',
          },
          {
            name: 'Eclair',
            age: 26,
            gender: true,
            address: '77 Geary Street',
          },
          {
            name: 'Cupcake',
            age: 30,
            gender: false,
            address: '77 Geary Street',
          },
          {
            name: 'Gingerbread',
            age: 35,
            gender: true,
            address: '77 Geary Street',
          },
          {
            name: 'Jelly bean',
            age: 37,
            gender: false,
            address: '77 Geary Street',
          },
          {
            name: 'Lollipop',
            age: 39,
            gender: false,
            address: '77 Geary Street',
          },
          {
            name: 'Honeycomb',
            age: 40,
            gender: true,
            address: '77 Geary Street',
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
