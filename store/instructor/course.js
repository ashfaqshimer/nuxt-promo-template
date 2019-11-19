export const state = () => ({
  item: null,
  items: []
});

export const actions = {
  async fetchInstructorCourses({ commit }) {
    try {
      const url = '/api/v1/products/user-products';
      const response = await this.$axios.$get(url);
      commit('setCourses', response);
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
  },
  async fetchCourseById({ commit }, courseId) {
    try {
      const url = `/api/v1/products/${courseId}`;
      const response = await this.$axios.$get(url);
      commit('setCourse', response);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateLine({ commit }, { index, value, field }) {
    commit('setLineValue', { index, value, field });
  },
  updateCourseValue({ commit }, { value, field }) {
    commit('setCourseValue', { value, field });
  },
  async updateCourse({ commit, state }, courseId) {
    try {
      const updatedCourse = await this.$axios.$patch(
        `/api/v1/products/${courseId}`,
        state.item
      );
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const mutations = {
  setCourses(state, courses) {
    state.items = courses;
  },
  setCourse(state, course) {
    state.item = course;
  },
  setCourseValue(state, { value, field }) {
    state.item[field] = value;
  },
  addLine(state, field) {
    state.item[field].push({ value: '' });
  },
  removeLine(state, { field, index }) {
    state.item[field].splice(index, 1);
  },
  setLineValue(state, { index, value, field }) {
    state.item[field][index].value = value;
  }
};
