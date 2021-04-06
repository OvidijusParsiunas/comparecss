<template>
  <div>
    <!-- jsClasses added for button components -->
    <div v-for="(nestedSubcomponent, index) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[subcomponentElementContainerClass,
        ...(nestedSubcomponent.subcomponentProperties.customFeatures
          && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses || [])]">
        <!-- WORK2: use consts and apply the style via class -->
      <base-component v-if="nestedSubcomponent.subcomponentProperties.importedComponent"
        :component="nestedSubcomponent.subcomponentProperties.importedComponent"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :positionClass="'nested-component'"
        style="height: 100%"/>
      <!-- WORK2: try to place in a div so wouldn't need the redundant v-if at the end -->
      <component v-else-if="!nestedSubcomponent.subcomponentProperties.optionalSubcomponent
          || nestedSubcomponent.subcomponentProperties.optionalSubcomponent.currentlyDisplaying
          || nestedSubcomponent.subcomponentProperties.optionalSubcomponent.displayOverlayOnly"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId"
        class="subcomponent-element"
        :class="[ ...((nestedSubcomponent.subcomponentProperties.customFeatures && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses) || []) ]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseUp()"
        :style="nestedSubcomponent.subcomponentProperties.activeCustomCssMode === SUB_COMPONENT_CSS_MODES.CLICK
          ? [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss ? nestedSubcomponent.subcomponentProperties.inheritedCss.css: '' ],
              nestedSubcomponent.subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
              nestedSubcomponent.subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
            ]
          : [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss ? nestedSubcomponent.subcomponentProperties.inheritedCss.css: '' ],
              nestedSubcomponent.subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedSubcomponent.subcomponentProperties.customCss[nestedSubcomponent.subcomponentProperties.activeCustomCssMode],
            ]"
        >{{(!nestedSubcomponent.subcomponentProperties.optionalSubcomponent || !nestedSubcomponent.subcomponentProperties.optionalSubcomponent.displayOverlayOnly)
            && nestedSubcomponent.subcomponentProperties.componentText ? nestedSubcomponent.subcomponentProperties.componentText : '' }}
      </component>
      <component v-if="!nestedSubcomponent.subcomponentProperties.importedComponent"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].overlayId"
        :style="[
          nestedSubcomponent.subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
          {display: 'none'}, {color: '#ff000000'}]"
        class="subcomponent-element"
        :class="OVERLAY_DEFAULT_CLASS">
          {{nestedSubcomponent.subcomponentProperties.componentText ? nestedSubcomponent.subcomponentProperties.componentText : ''}}
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
  },
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
    place-items: baseline;
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
</style>
