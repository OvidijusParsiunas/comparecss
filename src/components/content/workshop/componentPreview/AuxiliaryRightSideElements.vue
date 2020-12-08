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
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import useComponentPreviewEventHandlers from './compositionAPI/useComponentPreviewEventHandlers';

interface Data {
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
}

export default {
  data: (): Data => ({
    SUB_COMPONENT_CSS_MODES,
    NEW_COMPONENT_TYPES,
  }),
  setup(props: { subcomponent: WorkshopComponent }): { componentMouseEnter, componentMouseLeave, componentMouseDown, componentMouseUp } {
    return useComponentPreviewEventHandlers(props.subcomponent);
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