<template>
  <div class="right-side-element-parent-container">
    <div class="right-side-element-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button">
      <button v-for="(nestedsubcomponent, name) in nestedSubcomponents" :key="nestedsubcomponent" aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[name].subcomponentId"
        class="close-button" :class="[ ...((nestedsubcomponent.customFeatures && nestedsubcomponent.customFeatures.jsClasses) || []) ]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
        :style="nestedsubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
          ? [
              [ nestedsubcomponent.inheritedCss ? nestedsubcomponent.inheritedCss.css: '' ],
              nestedsubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedsubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
              nestedsubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
            ]
          : [
              [ nestedsubcomponent.inheritedCss ? nestedsubcomponent.inheritedCss.css: '' ],
              nestedsubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
              nestedsubcomponent.customCss[nestedsubcomponent.customCssActiveMode],
            { display: nestedsubcomponent.optionalSubcomponent.currentlyDisplaying || nestedsubcomponent.optionalSubcomponent.displayOverlayOnly ? 'inline-block': 'none' } ]"
        >{{nestedsubcomponent.componentText || ''}}
      </button>
      <button v-for="(nestedsubcomponent, name) in nestedSubcomponents" :key="nestedsubcomponent" 
        :id="subcomponentAndOverlayElementIds[name].overlayId"
        style="display: none" :style="nestedsubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
        :class="OVERLAY_DEFAULT_CLASS">
      </button>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
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
