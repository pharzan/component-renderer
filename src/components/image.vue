<template>
  <img :src="src" :width="width" :height="height" />
</template>

<script>
export default {
  name: "image-component",
  props: {
    src: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
};
</script>

<style scoped></style>
