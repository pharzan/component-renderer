<template>
  <div>{{ value }}</div>
</template>

<script>
export default {
  name: "paragraph",
  props: {
    value: {
      type: String,
      default: "No content",
    },
    fontSize: {
      type: String,
      default: "24px",
    },
  },
};
</script>

<style scoped></style>
