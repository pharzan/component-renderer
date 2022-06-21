<template>
  <input :placeholder="placeholder" @input="updateComponent" />
</template>

<script>
export default {
  name: "text-input",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    __value: {
      type: String,
      default: "",
    },
    __id: {
      type: String,
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
  methods: {
    updateComponent(event) {
      this.$emit("component-updated", {
        value: event.target.value,
      });
    },
    getId() {
      console.log(this.id);
      return this.id;
    },
  },
};
</script>

<style scoped></style>
