<template>
  <div class="right-side-element-parent-container">
    <div class="right-side-element-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button">
      <div v-for="(nestedSubcomponent, name) in nestedSubcomponents" :key="nestedSubcomponent"
        :style="[{
          display: 
            !nestedSubcomponent.optionalSubcomponent
            || (nestedSubcomponent.optionalSubcomponent && (nestedSubcomponent.optionalSubcomponent.currentlyDisplaying || nestedSubcomponent.optionalSubcomponent.displayOverlayOnly))
            ? 'inline-block': 'none' }]">
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
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
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
        <div v-if="name === PSEUDO_COMPONENTS.TEXT">{{ nestedSubcomponent }}</div>
      </div>
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
  #close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  }
</style>
