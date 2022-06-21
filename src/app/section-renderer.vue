<template>
  <div v-if="section.flex" class="flex">
    <component-renderer
      v-for="element in section.elements"
      :key="element.id"
      :sectionId="section.id"
      :element="element"
      :style="`background:${section.background}`"
    />
  </div>
  <div
    v-else
    :class="(hoveringClasses, haNoElemets)"
    @mouseenter="hovered"
    @mouseleave="unhover"
  >
    <div class="flex">
      <!-- <dropdown ref="dropDownRef" /> -->

      <div v-if="isHovering">
        <button @click="modifyGrid('+')">+</button>
        <button @click="modifyGrid('-')">-</button>
      </div>
      <div :class="classes">
        <component-renderer
          v-for="element in section.elements"
          :key="element.id"
          :element="element"
          :sectionId="section.id"
          :style="`background:${section.background}`"
        />
      </div>
      <div v-if="isHovering">
        <div @click="modifyGrid('+')">+</div>
        <div @click="modifyGrid('-')">-</div>
      </div>
    </div>
    <div v-if="isHovering" class="tool-bar flex">
      <add-document @click="addSectionBelow" class="button flex-1" />
      <trash @click="removeSection" class="flex-1" />
    </div>
  </div>
</template>
<script>
import componentRenderer from "./component-renderer.vue";
import trash from "../assets/trash";
import addDocument from "../assets/add-document";

import { useStore } from "vuex";

export default {
  components: {
    componentRenderer,
    trash,
    addDocument,
  },
  props: {
    section: Object,
  },
  computed: {
    classes() {
      if (this.section.classes) return this.section.classes.join(" ");
      else return "";
    },
    hoveringClasses() {
      if (this.isHovering) return "border-2";
      return "";
    },
    haNoElemets() {
      if (!this.section.elements.length) return "h-10 background-green";
      return "";
    },
  },
  data() {
    return {
      isHovering: false,
      store: useStore(),
    };
  },
  methods: {
    hovered() {
      this.isHovering = true;
    },
    unhover() {
      this.isHovering = false;
    },
    addSectionBelow() {
      this.store.commit("ADD_SECTION_BELOW", this.section.id);
    },
    removeSection() {
      this.store.commit("REMOVE_SECTION", this.section.id);
    },
    modifyGrid(status) {
      this.store.commit("MODIFY_GRID", { sectionId: this.section.id, status });
    },
  },
};
</script>
<style scoped>
.background-green {
  background: green;
  border: dashed 0.5px;
  width: 100%;
}
</style>
