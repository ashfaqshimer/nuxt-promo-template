<template>
  <!-- TargetStudents -->
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-line-text-input
          @addClicked="addLine('wsl')"
          @removeClicked="removeLine($event, 'wsl')"
          @valueUpdated="updateLine($event, 'wsl')"
          labelText="What will students learn?"
          :lines="course.wsl"
        />
        <multi-line-text-input
          @addClicked="addLine('requirements')"
          @removeClicked="removeLine($event, 'requirements')"
          labelText="What are the requirements?"
          :lines="course.requirements"
        />
      </form>
    </div>
  </div>
  <!-- TargetStudents End -->
</template>

<script>
import MultiLineTextInput from "~/components/form/MultiLineTextInput";
export default {
  components: {
    MultiLineTextInput
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      this.$store.commit("instructor/course/addLine", field);
    },
    removeLine(index, field) {
      this.$store.commit("instructor/course/removeLine", { field, index });
    },
    updateLine({ value, index }, field) {
      this.$store.dispatch("instructor/course/updateLine", {
        field,
        index,
        value
      });
    }
  }
};
</script>

<style>
</style>