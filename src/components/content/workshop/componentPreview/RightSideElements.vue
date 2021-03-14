<template>
  <div class="right-side-element-parent-container">
    <div class="right-side-element-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button" style="height: 100%">
      <!-- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Ordering_Flex_Items -->
        <div v-for="(nestedSubcomponent, name) in nestedSubcomponents.text" :key="nestedSubcomponent" style="height: 100%; background-color: green; display: inline-flex">
          <div v-if="name === PSEUDO_COMPONENTS.TEXT" style="position: relative; display: inline-table;" class="close-button right-side-element">{{ nestedSubcomponent }}</div>
        </div>
            <div v-for="(nestedSubcomponent, name) in nestedSubcomponents.subcomponents" :key="nestedSubcomponent"
              style="height: 100%; background-color: green; display: inline-flex;"
              :style="[
              {
              marginLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginLeft : '0px',
              marginRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginRight : '0px'}]"
              class="layer-subcomponent">
<div style="height: 100%; box-sizing: content-box;" :style="{
  width: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].width : '0px',
              paddingLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingLeft : '0px',
              paddingRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingRight : '0px'
              }"></div>
<button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button right-side-element" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
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
          >{{nestedSubcomponent.componentText || ''}}
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          class="right-side-element"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
      </div>

      <!-- <div v-for="(nestedSubcomponent, name) in nestedSubcomponents" :key="nestedSubcomponent" style="height: 100%"> -->
        <!-- <button v-if="name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
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
          >{{nestedSubcomponent.componentText || ''}}
        </button> -->
        <!-- <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
        <div v-if="name === PSEUDO_COMPONENTS.TEXT">{{ nestedSubcomponent }}</div> -->
      <!-- </div> -->
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  PSEUDO_COMPONENTS;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
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
  }
}
</script>

<style lang="css" scoped>
  /* this will need to be inherited css */
  .close-button {
    position: relative;
    overflow: hidden;
  }
  .right-side-element-parent-container {
    position: relative;
    height: 100%;
  }
  .right-side-element-parent {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: max-content;
    min-width: 100%;
    text-align: right;
  }
  .right-side-element {
    position: absolute;
    transform: translateY(-50%);
    top: 50% !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  #close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  }
  .layer-subcomponent:last-child {
    float: right;
  }
</style>
