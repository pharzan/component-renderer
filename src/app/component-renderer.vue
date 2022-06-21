
<template>
  <div
    class="grid-border content-center"
    @mouseover="hovered"
    @mouseleave="unhover"
  >
    <component
      :is="element.name"
      v-bind="element.properties"
      :key="element.id"
    />
    <puzzle v-if="isHovering" class="icon" @click="addComponent(element)" />
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import puzzle from "../assets/puzzle";
import { selected } from "../helpers/selectedComponent.js";

export default {
  props: {
    element: { type: Object },
    sectionId: { type: Number },
  },
  components: {
    puzzle,
  },
  setup() {
    const store = useStore();
    const site = computed(() => store.state.site);
    function updated($e, $c) {
      console.log($c.id, $e.value, site.value);
      mutateValue(site.value, "id", $c.id, "value", $e.value);
    }

    const mutateValue = (obj, key, val, newKey, newVal) => {
      Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === "object") {
          mutateValue(obj[k], key, val, newKey, newVal);
        } else {
          if (obj[key] === val) {
            obj[newKey] = newVal;
          }
        }
      });
      return obj;
    };

    return { site, updated };
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
    addComponent(element) {
      this.store.commit("ADD_COMPONENT", {
        selected: selected.value,
        elementId: element.id,
        sectionId: this.sectionId,
      });
    },
  },
};
</script>

<style scoped>
.grid-border {
  border: dashed 1px;
  height: 100%;
}
.icon {
  width: 100%;
}
</style>
