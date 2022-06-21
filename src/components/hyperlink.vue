<template>
  <a v-if="newtab" :src="src" :href="href" :key="__id" target="blank"
    >{{ content }}
  </a>
  <a v-else :src="src" :href="href" :key="__id">{{ content }} </a>
</template>

<script>
export default {
  name: "hyperlink",
  props: {
    href: {
      type: String,
      default: "No content",
    },
    content: {
      type: String,
      default: "100%",
    },
    newtab: {
      type: Boolean,
    },
    __id: { type: String },
  },
};
</script>

<style scoped></style>
