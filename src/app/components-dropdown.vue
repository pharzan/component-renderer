<script>
import * as _components from "../components";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { selected } from "../helpers/selectedComponent.js";

export default {
  setup() {
    const store = useStore();
    const components = computed(() => {
      return _components.default.map((c) => {
        return {
          name: c.name,
          props: Object.keys(c.props)
            .map((prop, idx) => {
              return {
                name: prop,
                type: typeof c.props[prop].type(),
              };
            })
            .filter((component) =>
              component.name.startsWith("__") ? null : component
            ),
        };
      });
    });
    // const selected = ref(null);
    return { components, selected };
  },
  data() {
    return {
      store: useStore(),
    };
  },
  methods: {
    test() {
      // const selected = this.store.state.selectedComponent;

      console.log(selected.value);
    },
  },
};
</script>
<template>
  <select v-model="selected">
    <option
      v-for="(component, idx) in components"
      :value="component"
      :key="idx"
    >
      {{ component.name }}
    </option>
  </select>
  <button @click="test">test</button>
  <div v-if="selected">
    <div v-for="(prop, idx) in selected.props" :key="idx">
      <div class="group" v-if="!prop.name.startsWith('__')">
        <span>{{ prop.name }}</span>
        <input v-if="prop.type == 'string'" v-model="prop.value" />
        <input
          type="checkbox"
          v-if="prop.type == 'boolean'"
          v-model="prop.value"
        />
      </div>
    </div>
  </div>
</template>