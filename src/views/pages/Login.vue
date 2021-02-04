<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <error-dialog
      v-if="error"
      :text="error.message"
      @dismissed="onDismissed"
    />
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
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

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click="onSignIn()"
            >
              Let's Go
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>

  import ErrorDialog from '../shared/ErrorDialog'

  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./components/Btn'),
      ErrorDialog,
    },

    data: () => ({
      email: '',
      password: '',
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
        },
      ],
    }),

    computed: {
      error () {
        return this.$store.getters.error
      },
      user () {
        return this.$store.getters.user
      },
    },

    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      },
    },

    methods: {
      onSignIn () {
        this.$store.dispatch('signin', {
          email: this.email,
          password: this.password,
        })
      },

      onDismissed () {
        console.log('Dissmise alert')
        this.$store.dispatch('clearError')
      },
    },
  }
</script>
