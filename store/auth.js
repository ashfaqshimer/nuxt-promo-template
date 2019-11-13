export const state = () => ({
  user: null
});

export const getters = {
  authUser(state) {
    return state.user || null;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  isAdmin(state) {
    return state.user && state.user.role && state.user.role === 'admin';
  }
};

export const actions = {
  async handleLogin({ commit, state }, loginData) {
    try {
      const url = '/api/v1/users/login';
      const response = await this.$axios.post(url, loginData);
      const user = response.data;
      commit('setUser', user);
      return state.user;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async handleLogout({ commit }) {
    try {
      const url = '/api/v1/users/logout';
      const response = await this.$axios.$post(url);

      commit('setUser', null);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
  handleRegister({ commit }, registrationDetails) {
    return this.$axios
      .$post('/api/v1/users/register', registrationDetails)
      .catch((error) => {
        let errorMsg = 'Something went wrong, try again';
        if (error.response.data.errors) {
          errorMsg = error.response.data.errors.message;
        }
        return Promise.reject(errorMsg);
      });
  },
  async getAuthUser({ commit, getters, state }) {
    const authUser = getters.authUser;

    try {
      if (authUser) {
        return Promise.resolve(authUser);
      }
      const user = await this.$axios.$get('/api/v1/users/me');
      commit('setUser', user);
      return state.user;
    } catch (error) {
      commit('setUser', null);
      throw new Error(error);
    }
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};
