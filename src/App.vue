<template>
  <div id="main-contianer">
    <dropdown />
    <div id="side-bar">
      <button @click="addComponent">Add</button>
      <button @click="test">test</button>
    </div>
    <page-renderer :page="page" />
  </div>
</template>

<script>
import { storeKey, useStore } from "vuex";
import { computed, reactive, watch, ref } from "vue";
import * as _components from "./components";
import pageRenderer from "./app/page-renderer";
import { selected } from "./helpers/selectedComponent.js";

import dropdown from "./app/components-dropdown.vue";

export default {
  name: "App",
  components: {
    pageRenderer,
  },
  setup() {
    const store = useStore();

    let page = computed(() => store.state.pages[store.state.pageIdx]);
    function test() {
      // store.commit("SET_PAGE", 1);
      console.log(selected.value);
    }

    const components = computed(() => {
      return _components.default.map((c) => {
        return {
          name: c.name,
          props: Object.keys(c.props).map((prop, idx) => {
            return {
              name: prop,
              type: typeof c.props[prop].type(),
            };
          }),
        };
      });
    });
    return {
      test,
      components,
      dropdown,
      page,
    };
  },
  data() {
    return {
      selectedComponent: "",
    };
  },
  methods: {
    addComponent() {
      this.$refs.dropDownRef.selected.id = Math.random()
        .toString()
        .replace("0.", "");
      console.log(this.$refs.dropDownRef.selected);
      // this.store.site.push(JSON.parse(JSON.stringify(this.selectedComponent)));
      this.$store.commit("UPDATE_SITE", this.$refs.dropDownRef.selected);
    },
  },
  computed: {
    getProps() {
      return (component) => {
        const props = {};
        if (component.props && component.props.length) {
          component.props.forEach((p, idx) => {
            props[p.name] = p.value;
          });
        }
        return props;
      };
    },
  },
};
</script>

<style>
#main-contianer {
  position: flex;
  background: red;
  height: 100vh;
}
#components {
  background: pink;
  display: inline-block;
}
#side-bar {
  flex: 1;
  background: yellow;
  box-shadow: rgb(0 0 0 / 30%) -10px 0px 40px 10px;
}
</style>
