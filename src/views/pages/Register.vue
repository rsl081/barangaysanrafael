<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <error-dialog
      v-if="error"
      :text="error.message"
      @dismissed="onDismissed"
    />
    <v-row justify="center">
      <v-col
        cols="12"
        md="9"
      >
        <v-slide-y-transition appear>
          <v-card
            class="pa-3 pa-md-5 mx-auto"
            light
          >
            <pages-heading class="text-center display-3">
              Register
            </pages-heading>

            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-row no-gutters>
                  <v-col
                    v-for="(section, i) in sections"
                    :key="i"
                    cols="12"
                  >
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <div class="text-center">
                  <v-avatar
                    class="elevation-12"
                    color="grey"
                    size="100"
                  >
                    <v-img src="@/assets/barangaysanrafael_logo.jpg" />
                  </v-avatar>

                  <div class="my-2" />

                  <v-text-field
                    v-model="email"
                    color="secondary"
                    label="Email..."
                    prepend-icon="mdi-email"
                  />

                  <v-text-field
                    v-model="password"
                    class="mb-8"
                    color="secondary"
                    label="Password..."
                    prepend-icon="mdi-lock-outline"
                  />

                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[comparePassword]"
                    color="secondary"
                    label="Confirm Password..."
                    prepend-icon="mdi-lock-check-outline"
                  />

                  <pages-btn
                    color="success"
                    @click="onSignUp()"
                  >
                    Get Started
                  </pages-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ErrorDialog from '../shared/ErrorDialog.vue'

  export default {
    name: 'PagesRegister',

    components: {
      PagesBtn: () => import('./components/Btn'),
      PagesHeading: () => import('./components/Heading'),
      ErrorDialog,
    },

    data: () => ({
      email: '',
      password: '',
      confirmPassword: '',
      passwordNotMatch: '',
      sections: [
        {
          icon: 'mdi-chart-timeline-variant',
          iconColor: 'primary',
          title: 'Kaizen Company',
          text:
            'Loremng elit. Nisi provident stias iure officiis, aliquam, unde sapiente veniam eius tempore dolore fugiat aspernatur quam. Nam, id.',
        },
        {
          icon: 'mdi-code-tags',
          iconColor: 'secondary',
          title: 'Coded in Vue.js',
          text:
            'Lorem ipsum dolor site veniam eius tempore dolore fugiat aspernatur quam. Nam, id.',
        },
        {
          icon: 'mdi-account-multiple',
          iconColor: 'cyan',
          title: 'Customer',
          text:
            'Lorem ipsum dolor sit iente veniam eius tempore dolore fugiat aspernatur quam. Nam, id..',
        },
      ],
      socials: [
        {
          href: '#',
          icon: 'mdi-twitter',
          iconColor: '#1DA1F2',
        },
        {
          href: '#',
          icon: 'mdi-dribbble',
          iconColor: '#ea4c89',
        },
        {
          href: '#',
          icon: 'mdi-facebook',
          iconColor: '#3B5998',
        },
      ],
    }),

    computed: {
      error () {
        return this.$store.getters.error
      },

      comparePassword () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      },
      user () {
        return this.$store.getters.user
      },
    },

    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/pages/login')
        }
      },
    },

    methods: {
      onSignUp () {
        if (this.password === this.confirmPassword) {
          this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          })
        } else {
          return
        }
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
      },

      onDismissed () {
        console.log('Dissmise alert')
        this.$store.dispatch('clearError')
      },
    },
  }
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
