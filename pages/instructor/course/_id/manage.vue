<template>
  <div class="manage-page">
    <Header title="Some very nice course name" exitLink="/instructor/courses">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            @click="handleSave"
            class="button is-primary is-inverted is-medium is-outlined"
          >Save</button>
        </div>
      </template>
    </Header>
    <div class="course-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">Course Editing</p>
              <ul class="menu-list">
                <li>
                  <!-- display TargetStudents -->
                  <a
                    @click.prevent="navigateTo(1)"
                    :class="activeComponentClass(1)"
                  >Target Your Students</a>
                </li>
                <li>
                  <!-- display LandingPage -->
                  <a
                    @click.prevent="navigateTo(2)"
                    :class="activeComponentClass(2)"
                  >Course Landing Page</a>
                </li>
              </ul>
              <p class="menu-label">Course Managment</p>
              <ul class="menu-list">
                <li>
                  <!-- display Price -->
                  <a @click.prevent="navigateTo(3)" :class="activeComponentClass(3)">Price</a>
                </li>
                <li>
                  <!-- display Status -->
                  <a @click.prevent="navigateTo(4)" :class="activeComponentClass(4)">Status</a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <keep-alive>
              <component
                @courseValueUpdated="handleCourseUpdate"
                :is="activeComponent"
                :course="course"
              />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/shared/Header";
import LandingPage from "~/components/instructor/LandingPage";
import TargetStudents from "~/components/instructor/TargetStudents";
import Price from "~/components/instructor/Price";
import Status from "~/components/instructor/Status";
import MultiComponentMixin from "~/mixins/MultiComponentMixin";

export default {
  layout: "instructor",
  components: { Header, LandingPage, TargetStudents, Price, Status },
  mixins: [MultiComponentMixin],
  async fetch({ store, params }) {
    await store.dispatch("instructor/course/fetchCourseById", params.id);
    await store.dispatch("category/fetchCategories");
  },
  data() {
    return {
      steps: ["TargetStudents", "LandingPage", "Price", "Status"],
      activeStep: 1
    };
  },
  computed: {
    activeComponent() {
      return this.steps[this.activeStep - 1];
    },
    course() {
      return this.$store.state.instructor.course.item;
    }
  },
  methods: {
    navigateTo(step) {
      this.activeStep = step;
    },
    activeComponentClass(step) {
      return this.activeStep === step ? "is-active" : "";
    },
    handleCourseUpdate({ value, field }) {
      this.$store.dispatch("instructor/course/updateCourseValue", {
        field,
        value
      });
    },
    handleSave() {
      this.$store
        .dispatch("instructor/course/updateCourse", this.course._id)
        .then(() =>
          this.$toasted.success("Successfully updated!", { duration: 3000 })
        )
        .catch(() =>
          this.$toasted.error("Something went wrong", { duration: 3000 })
        );
    }
  }
};
</script>

<style lang="scss">
.manage-page {
  .label-info {
    font-size: 13px;
    color: gray;
    font-style: italic;
  }
  .course-manage {
    padding-top: 40px;
    .menu {
      padding-top: 30px;
      &-label {
        font-size: 20px;
        color: black;
      }
      &-list {
        > li {
          font-size: 18px;
          margin-top: 10px;
          > a {
            &.is-active {
              border-left: 3px solid #58529f;
              background-color: transparent;
              color: inherit;
            }
          }
        }
      }
    }
    .card {
      &-section {
        padding: 40px;
      }
      &-header {
        &-title {
          padding: 0;
          color: #8f99a3;
          font-weight: 400;
          font-size: 25px;
        }
      }
    }
  }
}
</style>