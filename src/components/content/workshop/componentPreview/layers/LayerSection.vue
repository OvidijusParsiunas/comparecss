<template>
  <div>
    <!-- jsClasses added for button components -->
    <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[subcomponentElementContainerClass,
        ...((name === SUB_COMPONENTS.TEXT_1 || name === SUB_COMPONENTS.TEXT_2)
          && nestedSubcomponent.customFeatures
          && nestedSubcomponent.customFeatures.jsClasses || [])]">
      <component v-if="!nestedSubcomponent.optionalSubcomponent
          || nestedSubcomponent.optionalSubcomponent.currentlyDisplaying
          || nestedSubcomponent.optionalSubcomponent.displayOverlayOnly"
        :is="nestedSubcomponent.componentTag"
        aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[name].subcomponentId"
        class="subcomponent-element"
        :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
        :style="nestedSubcomponent.activeCustomCssMode === SUB_COMPONENT_CSS_MODES.CLICK
          ? [
              [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
            ]
          : [
              [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
              nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.customCss[nestedSubcomponent.activeCustomCssMode],
            ]"
        >{{(!nestedSubcomponent.optionalSubcomponent || !nestedSubcomponent.optionalSubcomponent.displayOverlayOnly)
            && nestedSubcomponent.componentText ? nestedSubcomponent.componentText : '' }}
      </component>
      <component
        :is="nestedSubcomponent.componentTag"
        :id="subcomponentAndOverlayElementIds[name].overlayId"
        :style="[
          nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
          {display: 'none'}, {color: '#ff000000'}]"
        class="subcomponent-element"
        :class="OVERLAY_DEFAULT_CLASS">
          {{name === SUB_COMPONENTS.TEXT_1 || name === SUB_COMPONENTS.TEXT_2 ? nestedSubcomponent.componentText : ''}}
      </component>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
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
    /* background-color: green; */
    display: flex;
  }
  .subcomponent-element {
    position: relative;
    transform: translateY(-50%);
    position: relative;
    overflow: hidden;
    /* may need to be set in the style tag if working with vertically stacked subcomponents */
    margin-top: unset !important;
    margin-bottom: unset !important;
  }
  .text-subcomponent-element {
    display: inline-table;
  }
</style>
