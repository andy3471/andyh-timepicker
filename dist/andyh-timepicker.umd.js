(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.AndyHTimepicker = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    props: {
      value: {
        type: String,
        default: "00:00",
        required: true
      },
      minInterval: {
        type: Number,
        default: 1
      }
    },
    data: function data() {
      return {
        dropdownOpen: false,
        hours: [],
        mins: [],
        selectedHour: this.value.substring(0, 2),
        selectedMin: this.value.substring(3, 5)
      };
    },
    computed: {
      selectedTime: function() {
        return this.selectedHour + ":" + this.selectedMin;
      }
    },
    mounted: function mounted() {
      this.calculateHoursList();
      this.calculateMinutesList();
      document.addEventListener("click", this.handleClickOutside);
    },
    destroyed: function destroyed() {
      document.removeEventListener("click", this.handleClickOutside);
    },
    watch: {
      value: function() {
        this.selectedHour = this.value.substring(0, 2);
        this.selectedMin = this.value.substring(3, 5);
      }
    },
    methods: {
      calculateHoursList: function calculateHoursList() {
        for (var i = 0; i < 24; i++) {
          this.hours.push(i < 10 ? "0" + i : i);
        }
      },
      calculateMinutesList: function calculateMinutesList() {
        for (var i = 0; i < 60; i = i + this.minInterval) {
          this.mins.push(i < 10 ? "0" + i : i);
        }
      },
      handleClickOutside: function handleClickOutside(evt) {
        if (!this.$el.contains(evt.target)) {
          this.dropdownOpen = false;
        }
      },
      selectHour: function selectHour(h) {
        this.selectedHour = h;
        this.$emit("input", this.selectedTime);
      },
      selectMin: function selectMin(m) {
        this.selectedMin = m;
        this.$emit("input", this.selectedTime);
      },
      openDropdown: function openDropdown() {
        this.dropdownOpen = true;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c("input", {
        staticClass: "ah-dp",
        attrs: { type: "text" },
        domProps: { value: this.selectedTime },
        on: {
          click: function($event) {
            return _vm.openDropdown()
          }
        }
      }),
      _vm._v(" "),
      this.dropdownOpen
        ? _c("div", { staticClass: "timedropdown" }, [
            _c(
              "ul",
              { staticClass: "timeselect hours" },
              [
                _c("li", { staticClass: "helper" }, [_vm._v("HH")]),
                _vm._v(" "),
                _vm._l(this.hours, function(hour, index) {
                  return _c(
                    "li",
                    {
                      key: index,
                      class: { selected: hour == _vm.selectedHour },
                      on: {
                        click: function($event) {
                          return _vm.selectHour(hour)
                        }
                      }
                    },
                    [_vm._v("\n        " + _vm._s(hour) + "\n      ")]
                  )
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "timeselect minutes" },
              [
                _c("li", { staticClass: "helper" }, [_vm._v("MM")]),
                _vm._v(" "),
                _vm._l(this.mins, function(min, index) {
                  return _c(
                    "li",
                    {
                      key: index,
                      class: { selected: min == _vm.selectedMin },
                      on: {
                        click: function($event) {
                          return _vm.selectMin(min)
                        }
                      }
                    },
                    [_vm._v("\n        " + _vm._s(min) + "\n      ")]
                  )
                })
              ],
              2
            )
          ])
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-6bd57065_0", { source: "\n@import url(\"https://fonts.googleapis.com/css?family=Roboto&display=swap\");\n.ah-dp {\r\n  width: 100%;\r\n  display: block;\r\n  padding: .375rem .75rem;\r\n  font-size: 1rem;\r\n  font-family: \"Roboto\", sans-serif;\r\n  color: #495057;\r\n  border: 1px solid #ced4da;\r\n  border-radius: .15rem;\r\n  line-height: 1.5\n}\n.timedropdown {\r\n  position: absolute;\r\n  height: 10em;\r\n  width: 10em;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  background: #fff;\r\n  border: 1px solid #ced4da;\r\n  font-family: \"Roboto\", sans-serif;\r\n  color: #495057;\r\n  z-index: 9999;\n}\n.timedropdown li {\r\n  height: 1.25rem;\n}\n.timeselect {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n  width: 5em;\r\n  text-align: center;\r\n  cursor: pointer;\n}\n.helper {\r\n  color: #888888;\r\n  cursor: default;\n}\n.selected {\r\n  background-color: #f27405;\n}\r\n", map: {"version":3,"sources":["C:\\git\\andyh-timepicker\\src\\andyh-timepicker.vue"],"names":[],"mappings":";AA4GA,0EAAA;AACA;EACA,WAAA;EACA,cAAA;EACA,uBAAA;EACA,eAAA;EACA,iCAAA;EACA,cAAA;EACA,yBAAA;EACA,qBAAA;EACA;AACA;AAEA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,qBAAA;EACA,gBAAA;EACA,yBAAA;EACA,iCAAA;EACA,cAAA;EACA,aAAA;AACA;AAEA;EACA,eAAA;AACA;AAEA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,cAAA;EACA,eAAA;AACA;AAEA;EACA,yBAAA;AACA","file":"andyh-timepicker.vue","sourcesContent":["<template>\r\n  <div>\r\n    <input\r\n      class=\"ah-dp\"\r\n      type=\"text\"\r\n      v-on:click=\"openDropdown()\"\r\n      :value=\"this.selectedTime\"\r\n    />\r\n    <div class=\"timedropdown\" v-if=\"this.dropdownOpen\">\r\n      <ul class=\"timeselect hours\">\r\n        <li class=\"helper\">HH</li>\r\n        <li\r\n          v-for=\"(hour, index) in this.hours\"\r\n          v-bind:key=\"index\"\r\n          v-bind:class=\"{ selected: hour == selectedHour }\"\r\n          v-on:click=\"selectHour(hour)\"\r\n        >\r\n          {{ hour }}\r\n        </li>\r\n      </ul>\r\n      <ul class=\"timeselect minutes\">\r\n        <li class=\"helper\">MM</li>\r\n        <li\r\n          v-for=\"(min, index) in this.mins\"\r\n          v-bind:key=\"index\"\r\n          v-bind:class=\"{ selected: min == selectedMin }\"\r\n          v-on:click=\"selectMin(min)\"\r\n        >\r\n          {{ min }}\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  props: {\r\n    value: {\r\n      type: String,\r\n      default: \"00:00\",\r\n      required: true\r\n    },\r\n    minInterval: {\r\n      type: Number,\r\n      default: 1\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      dropdownOpen: false,\r\n      hours: [],\r\n      mins: [],\r\n      selectedHour: this.value.substring(0, 2),\r\n      selectedMin: this.value.substring(3, 5)\r\n    };\r\n  },\r\n  computed: {\r\n    selectedTime: function() {\r\n      return this.selectedHour + \":\" + this.selectedMin;\r\n    }\r\n  },\r\n  mounted() {\r\n    this.calculateHoursList();\r\n    this.calculateMinutesList();\r\n    document.addEventListener(\"click\", this.handleClickOutside);\r\n  },\r\n  destroyed() {\r\n    document.removeEventListener(\"click\", this.handleClickOutside);\r\n  },\r\n  watch: {\r\n    value: function() {\r\n      this.selectedHour = this.value.substring(0, 2);\r\n      this.selectedMin = this.value.substring(3, 5);\r\n    }\r\n  },\r\n  methods: {\r\n    calculateHoursList() {\r\n      for (let i = 0; i < 24; i++) {\r\n        this.hours.push(i < 10 ? \"0\" + i : i);\r\n      }\r\n    },\r\n    calculateMinutesList() {\r\n      for (let i = 0; i < 60; i = i + this.minInterval) {\r\n        this.mins.push(i < 10 ? \"0\" + i : i);\r\n      }\r\n    },\r\n    handleClickOutside(evt) {\r\n      if (!this.$el.contains(evt.target)) {\r\n        this.dropdownOpen = false;\r\n      }\r\n    },\r\n    selectHour(h) {\r\n      this.selectedHour = h;\r\n      this.$emit(\"input\", this.selectedTime);\r\n    },\r\n    selectMin(m) {\r\n      this.selectedMin = m;\r\n      this.$emit(\"input\", this.selectedTime);\r\n    },\r\n    openDropdown() {\r\n      this.dropdownOpen = true;\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style>\r\n@import url(\"https://fonts.googleapis.com/css?family=Roboto&display=swap\");\r\n.ah-dp {\r\n  width: 100%;\r\n  display: block;\r\n  padding: .375rem .75rem;\r\n  font-size: 1rem;\r\n  font-family: \"Roboto\", sans-serif;\r\n  color: #495057;\r\n  border: 1px solid #ced4da;\r\n  border-radius: .15rem;\r\n  line-height: 1.5\r\n}\r\n\r\n.timedropdown {\r\n  position: absolute;\r\n  height: 10em;\r\n  width: 10em;\r\n  display: flex;\r\n  flex-flow: row nowrap;\r\n  background: #fff;\r\n  border: 1px solid #ced4da;\r\n  font-family: \"Roboto\", sans-serif;\r\n  color: #495057;\r\n  z-index: 9999;\r\n}\r\n\r\n.timedropdown li {\r\n  height: 1.25rem;\r\n}\r\n\r\n.timeselect {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n  width: 5em;\r\n  text-align: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.helper {\r\n  color: #888888;\r\n  cursor: default;\r\n}\r\n\r\n.selected {\r\n  background-color: #f27405;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
      if (install.installed) { return; }
      install.installed = true;
      Vue.component("andyh-timepicker", __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
      install: install
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== "undefined") {
      GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
      GlobalVue = global.Vue;
  }
  if (GlobalVue) {
      GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
