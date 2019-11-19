export const state = () => ({
  items: []
});

export const actions = {
  async fetchCourses({ commit }) {
    try {
      const courses = await this.$axios.$get('/api/v1/products');

      commit('setItems', { resource: 'course', items: courses }, { root: true });
      return state.items;
    } catch (error) {
      throw new Error(error);
    }
  }
};
