export const state = () => ({
  items: []
});

export const getters = {
  hasCategories(state) {
    return state.items.length > 0;
  }
};

export const actions = {
  async fetchCategories({ state, commit, getters }) {
    try {
      if (!getters.hasCategories) {
        const categories = await this.$axios.$get('/api/v1/categories');
        commit('setCategories', categories);
        return state.items;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const mutations = {
  setCategories(state, categories) {
    state.items = categories;
  }
};
