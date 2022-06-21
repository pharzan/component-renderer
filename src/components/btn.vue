<template>
  <button
    class="btn leading-relaxed font-medium flex items-center cursor-pointer border shadow hover:shadow-lg focus:outline-none focus:shadow-outline rounded"
  >
    {{ text }}
  </button>
</template>

<script>
// farzan jooni ghashange
export default {
  setup(props) {
    const actions = {
      console() {
        console.log("Hello from action.console");
      },
    };

    return {};
  },
  name: "btn-component",
  props: {
    text: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>
