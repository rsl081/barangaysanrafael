import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
// import axios from '@/axios-auth.js'
import Router from 'vue-router'
// import router from './router'

Vue.use(Router)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    idToke: null,
    user: null,
    error: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
  },
  actions: {
    signup ({ commit }, payload) {
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          },
        )
        .catch(function (error) {
          commit('setError', error)
          console.log(error)
        })
    },

    signin ({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          },
        )
        .catch(error => {
          commit('setError', error)
          console.log(error)
        })
    },

    clearError ({ commit }) {
      commit('clearError')
    },
  },

  getters: {
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
  },
})
