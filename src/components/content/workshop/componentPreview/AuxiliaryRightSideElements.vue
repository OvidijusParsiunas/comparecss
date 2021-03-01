<template>
  <div v-if="subcomponent.optionalSubcomponent.currentlyDisplaying || subcomponent.optionalSubcomponent.displayOverlayOnly">
    <div id="close-button-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button" aria-label="Close">
      <button aria-hidden="true"
        :id="elementIds.subcomponentId"
        class="close-button" :class="[ ...(subcomponent.jsClasses || []) ]"
        @mouseenter="mouseEvents.subcomponentMouseEnter()"
        @mouseleave="mouseEvents.subcomponentMouseLeave()"
        @mousedown="mouseEvents.subcomponentMouseDown()"
        @mouseup="mouseEvents.subcomponentMouseUp()"
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
        ><div v-if="!subcomponent.optionalSubcomponent.displayOverlayOnly" id="close-button-icon">×</div>
      </button>
      <button
        :id="elementIds.overlayId"
        style="display: none" :style="subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
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
    subcomponent: Object,
    elementIds: Object,
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
  #close-button-parent {
    position: absolute;
    top: 0px;
    right: 0px;
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