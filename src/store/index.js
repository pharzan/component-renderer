import { createStore } from "vuex";
import { idGenerator } from "../helpers/idGenerator";
const store = createStore({
  state: {
    pages: [
      {
        route: "home",
        sections: [
          {
            id: idGenerator(),
            background: "pink",
            classes: ["grid", "grid-cols-2", "gap-2"],
            elements: [
              {
                id: idGenerator(),
                name: "text-input"
              },
              {
                id: idGenerator(),
                name: "paragraph",
                properties: { value: "section 1.a" }
              }
            ]
          },
          // {
          //   id: 4,
          //   background: "blue",
          //   classes: ["grid", "grid-cols-2", "md:grid-cols-1", "gap-4"],
          //   elements: [
          //     {
          //       id: 5,
          //       name: "paragraph",
          //       properties: { value: "section 2" }
          //     },
          //     {
          //       id: 23213,
          //       name: "image-component",
          //       properties: {
          //         src: "https://via.placeholder.com/250",
          //         width: "250",
          //         height: "250"
          //       }
          //     }
          //   ]
          // },
          // {
          //   id: 7,
          //   background: "yellow",
          //   flex: true,
          //   classes: ["flex justify-center"],
          //   elements: [
          //     {
          //       id: 5,
          //       name: "paragraph",
          //       properties: { value: "section 3.a" }
          //     },
          //     {
          //       id: 23,
          //       name: "paragraph",
          //       properties: { value: "section 3.b" }
          //     }
          //   ]
          // },
          {
            id: idGenerator(),
            background: "blue",
            classes: ["grid", "grid-cols-2"],
            elements: [
              {
                id: idGenerator(),
                name: "btn-component",
                properties: {
                  text: "click me!",
                  action: "console"
                }
              }
            ]
          }
        ]
      },
      {
        route: "home",
        sections: [
          {
            id: idGenerator(),
            background: "pink",
            classes: ["grid", "grid-cols-1", "md:grid-cols-2", "gap-2"],
            elements: [
              {
                id: idGenerator(),
                name: "paragraph",
                properties: { value: "PAGGE 2 a" }
              }
            ]
          }
        ]
      }
    ],
    pageIdx: 0,
    selectedComponent: null,
    testStore: [{ title: "1", content: "test content" }]
  },
  getters: {},
  mutations: {
    UPDATE_SITE(state, site) {
      state.site.push(JSON.parse(JSON.stringify(site)));
    },
    SET_PAGE(state, pageIdx) {
      console.log("SET_PAGE::");
      state.pageIdx = pageIdx;
    },
    ADD_SECTION_BELOW(state, sectionId) {
      const pageIdx = state.pageIdx;
      let found = null;
      state.pages[pageIdx].sections.forEach((section, idx) => {
        if (section.id === sectionId) {
          found = idx;
        }
      });
      state.pages[pageIdx].sections.splice(found + 1, 0, {
        id: idGenerator(),
        background: "purple",
        classes: ["grid", "grid-cols-1"],
        elements: []
      });
    },
    REMOVE_SECTION(state, sectionId) {
      const pageIdx = state.pageIdx;

      let found = null;
      state.pages[pageIdx].sections.forEach((section, idx) => {
        if (section.id === sectionId) {
          found = idx;
        }
      });
      state.pages[pageIdx].sections.splice(found, 1);
    },
    MODIFY_GRID(state, options) {
      const { sectionId, status } = options;
      const pageIdx = state.pageIdx;

      let found = null;
      state.pages[pageIdx].sections.forEach((section, idx) => {
        if (section.id === sectionId) {
          found = idx;
        }
      });

      const hasGrid = state.pages[pageIdx].sections[found].classes.includes(
        "grid"
      );
      console.log(
        "HAS GRID::",
        hasGrid,
        state.pages[pageIdx].sections[found].classes
      );
      if (hasGrid) {
        const gridIdx = state.pages[pageIdx].sections[
          found
        ].classes.findIndex((el) => el.includes("grid-cols-"));
        let gridNum = Number(
          state.pages[pageIdx].sections[found].classes[gridIdx].split(
            "grid-cols-"
          )[1]
        );
        console.log(gridNum, state.pages[pageIdx].sections[found].classes);
        if (
          (gridNum <= -1 && status === "-") ||
          (gridNum >= 12 && status === "+")
        )
          return;
        if (status === "+") {
          state.pages[pageIdx].sections[found].elements.push({
            id: idGenerator(),
            classes: ["grid", "grid-cols-1", "gap-2"]
          });
          gridNum += 1;
        }
        if (status === "-") {
          gridNum -= 1;
          state.pages[pageIdx].sections[found].elements.pop();
        }

        state.pages[pageIdx].sections[found].classes.splice(gridIdx, 1);

        state.pages[pageIdx].sections[found].classes.push(
          "grid-cols-" + gridNum
        );
      }
    },
    ADD_COMPONENT(state, options) {
      const elementId = options.elementId;
      const sectionId = options.sectionId;
      const element = options.selected;
      const pageIdx = state.pageIdx;
      const sectionIdx = state.pages[pageIdx].sections.findIndex(
        (e) => e.id === sectionId
      );
      const elementIdx = state.pages[pageIdx].sections[
        sectionIdx
      ].elements.findIndex((e) => e.id === elementId);
      console.log(
        state.pages[pageIdx].sections[sectionIdx],
        elementIdx,
        elementId
      );
      const properties = {};
      element.id = idGenerator();
      element.props.forEach((prop) => {
        properties[prop.name] = prop.value;
      });
      state.pages[pageIdx].sections[sectionIdx].elements.splice(elementIdx, 1, {
        ...element,
        properties
      });
    }
  },
  actions: {}
});

export default store;
