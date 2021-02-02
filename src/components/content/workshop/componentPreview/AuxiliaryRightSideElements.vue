<template>
  <div v-if="subcomponent.optionalSubcomponent.currentlyDisplaying || subcomponent.optionalSubcomponent.displayPreviewOnly">
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
        ><div v-if="!subcomponent.optionalSubcomponent.displayPreviewOnly" id="close-button-icon">×</div>
      </button>
      <button
        :id="CLOSE_PREVIEW_ELEMENT_ID"
        style="display: none" :style="[subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], { zIndex: CLOSE_PREVIEW_Z_INDEX }]"
        class="subcomponent-preview-default">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useSubcomponentPreviewEventHandlers, { UseSubcomponentPreviewEventHandlers } from './compositionAPI/useSubcomponentPreviewEventHandlers';
import { subcomponentTypeToPreviewId } from '../toolbar/options/componentOptions/subcomponentTypeToPreviewId';
import { subcomponentPreviewZIndexes } from '../toolbar/options/componentOptions/subcomponentPreviewZIndexes';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { SubcomponentProperties } from '../../../../interfaces/workshopComponent';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import { Ref, ref, watch } from 'vue';

interface Consts {
  CLOSE_PREVIEW_Z_INDEX: number;
  CLOSE_PREVIEW_ELEMENT_ID: string;
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
}

interface Props {
  subcomponent: SubcomponentProperties;
}

export default {
  setup(props: Props): UseSubcomponentPreviewEventHandlers & Consts {
    const subcomponentRef: Ref<Props['subcomponent']> = ref(props.subcomponent);
    watch(() => props.subcomponent, (newSubcomponent: Props['subcomponent']) => {
      subcomponentRef.value = newSubcomponent;
    });
    return {
      ...useSubcomponentPreviewEventHandlers(subcomponentRef),
      CLOSE_PREVIEW_Z_INDEX: subcomponentPreviewZIndexes[SUB_COMPONENTS.CLOSE],
      CLOSE_PREVIEW_ELEMENT_ID: subcomponentTypeToPreviewId[SUB_COMPONENTS.CLOSE],
      SUB_COMPONENT_CSS_MODES,
      NEW_COMPONENT_TYPES,
    };
  },
  props: {
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
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  }
</style>