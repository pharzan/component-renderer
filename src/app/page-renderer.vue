
<template>
  <div v-for="(section, idx) in page.sections" :key="idx">
    <section-renderer :section="section" />
  </div>
</template>
<script>
import sectionRenderer from "./section-renderer.vue";

export default {
  components: {
    sectionRenderer,
  },
  props: {
    page: Object,
  },
};
</script>
<style scoped></style>
