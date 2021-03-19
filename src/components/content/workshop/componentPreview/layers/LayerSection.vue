<template>
  <div>
    <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="subcomponentElementContainerClass">
      <div v-if="name === PSEUDO_COMPONENTS.TEXT" class="subcomponent-element text-subcomponent-element">{{ nestedSubcomponent }}</div>
      <button v-if="
          nestedSubcomponent.optionalSubcomponent
          && (nestedSubcomponent.optionalSubcomponent.currentlyDisplaying || nestedSubcomponent.optionalSubcomponent.displayOverlayOnly)
          && (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE)" aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[name].subcomponentId"
        class="subcomponent-element"
        :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
        :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
          ? [
              [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
            ]
          : [
              [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
            ]"
        >{{ nestedSubcomponent.optionalSubcomponent && !nestedSubcomponent.optionalSubcomponent.displayOverlayOnly
            && nestedSubcomponent.componentText ? nestedSubcomponent.componentText : '' }}
      </button>
      <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
        :id="subcomponentAndOverlayElementIds[name].overlayId"
        style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
        class="subcomponent-element"
        :class="OVERLAY_DEFAULT_CLASS">
      </button>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  PSEUDO_COMPONENTS;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
      PSEUDO_COMPONENTS,
      SUB_COMPONENTS,
    };
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedSubcomponents: Object,
    mouseEvents: Object,
    subcomponentElementContainerClass: String,
  }
}
</script>

<style lang="css" scoped>
  /* use this to position the close button correctly */
  /*#close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  } */
  /*
  .close-button {
    position: relative;
    overflow: hidden;
  } */
  /* this will need to be inherited css */
  .center-section-subcomponent {
    justify-content: center;
    pointer-events: all;
  }
  .equal-split-section {
    flex: 1 1 0px;
    justify-content: center;
  }
  .subcomponent-element-container {
    height: 100%;
    background-color: green;
    display: flex;
  }
  .subcomponent-element {
    position: relative;
    transform: translateY(-50%);
    top: 50% !important;
    position: relative;
    overflow: hidden;
  }
  .text-subcomponent-element {
    display: inline-table;
  }
</style>
