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
  async handleRegister({ commit }, registrationDetails) {
    try {
      const url = '/api/v1/users/register';
      const response = await this.$axios.$post(url, registrationDetails);
      return true;
    } catch (error) {
      throw new Error(error);
    }
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
