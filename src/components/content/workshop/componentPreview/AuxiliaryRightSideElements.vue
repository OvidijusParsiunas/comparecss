<template>
  <div v-if="componentType === NEW_COMPONENT_TYPES.ALERT
      && (!subcomponent.optionalSubcomponent || subcomponent.optionalSubcomponent.currentlyDisplaying)">
    <div id="close-button-parent" type="button" aria-label="Close">
      <button aria-hidden="true" id="close-button" :class="[ ...subcomponent.jsClasses ]"
        @mouseenter="componentMouseEnter()"
        @mouseleave="componentMouseLeave()"
        @mousedown="componentMouseDown()"
        @mouseup="componentMouseUp()"
        :style="subcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
          ? [
              [ subcomponent.inheritedCss ? subcomponent.inheritedCss.css: '' ],
              subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              subcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
              subcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
            ]
          : [
              [ subcomponent.inheritedCss ? subcomponent.inheritedCss.css: '' ],
              subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              subcomponent.customCss[subcomponent.customCssActiveMode],
            ]"
        ><div style="display: table; pointer-events: none; margin-left: auto; margin-right: auto;">×</div></button>
      <button id="close-subcomponent-preview" style="display: none" :style="subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]" class="subcomponent-preview">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../consts/unsetColotButtonDisplayed';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import { CustomCss } from '../../../../interfaces/workshopComponent';

interface Data {
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
  SUB_COMPONENTS;
  isUnsetButtonDisplayedForColorInputs: unknown;
  setDefaultUnsetButtonStatesForColorInputs: (customCss: CustomCss) => void;
}

export default {
  data: (): Data => ({
    SUB_COMPONENT_CSS_MODES,
    NEW_COMPONENT_TYPES,
    SUB_COMPONENTS,
    isUnsetButtonDisplayedForColorInputs: {},
    setDefaultUnsetButtonStatesForColorInputs: function(customCss: CustomCss): void {
      Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((key) => {
        if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit' || customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key].charAt(0) === '#') {
          this.isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit'
            ?  UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
        }
      });
    },
  }),
  // repeated code as in component preview
  methods: {
    componentMouseEnter(): void {
      const { customCss, transition, customCssActiveMode } = this.subcomponent;
      if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
        this.setDefaultUnsetButtonStatesForColorInputs(customCss);
        this.overwrittenDefaultPropertiesByHover = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
        customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.HOVER], transition,  ...this.isUnsetButtonDisplayedForColorInputs };
      }
    },
    componentMouseLeave(): void {
      const { customCss, customCssActiveMode } = this.subcomponent;
      if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
        customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByHover };
      }
      this.isUnsetButtonDisplayedForColorInputs = {};
    },
    componentMouseDown(): void {
      const { customCss, transition, customCssActiveMode } = this.subcomponent;
      if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
        this.overwrittenDefaultPropertiesByClick = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
        customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.CLICK], transition,  ...this.isUnsetButtonDisplayedForColorInputs };
      }
    },
    componentMouseUp(): void {
      const { customCss, customCssActiveMode } = this.subcomponent;
      if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
        customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByClick };
      }
    },
  },
  props: {
    componentType: String,
    subcomponent: Object,
  }
}
</script>

<style lang="css" scoped>
  /* this will need to be inherited css */
  #close-button {
    position: relative;
    overflow: hidden;
  }
  #close-button-parent {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: default !important;
  }
  #close-button-parent:focus {
    outline: none;
  }
  .subcomponent-preview {
    background-color: rgb(40 255 20 / 43%) !important;
    position: absolute !important;
    top: 0px !important;
  }
</style>