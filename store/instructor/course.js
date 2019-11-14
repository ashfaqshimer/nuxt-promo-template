export const state = () => ({
  items: []
});

export const actions = {
  async fetchInstructorCourses({ commit }) {
    try {
      const url = '/api/v1/products/user-products';
      const response = await this.$axios.$get(url);
      commit('setCourses', response);
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  },
  async createCourse({ commit }, courseData) {
    try {
      const url = '/api/v1/products';
      const response = await this.$axios.$post(url, courseData);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const mutations = {
  setCourses(state, courses) {
    state.items = courses;
  }
};
