export const state = () => ({
    items: []
});

export const actions = {
    async fetchCourses({ commit }) {
        try {
            const courses = await this.$axios.$get("/api/v1/products");
            debugger;
            commit(
                "setItems",
                { resource: "course", items: courses },
                { root: true }
            );
            return state.items;
        } catch (error) {
            console.log(error);
        }
    }
};
