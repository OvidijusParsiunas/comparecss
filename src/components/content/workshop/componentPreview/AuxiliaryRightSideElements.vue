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
        ><div id="close-button-icon">×</div>
      </button>
      <button
        :id="SUB_COMPONENT_PREVIEW_ELEMENT_IDS.CLOSE"
        style="display: none" :style="subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
        class="subcomponent-preview">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useComponentPreviewEventHandlers, { UseComponentPreviewEventHandlers } from './compositionAPI/useComponentPreviewEventHandlers';
import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '../../../../consts/subcomponentPreviewElementIds.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { SubcomponentProperties } from '../../../../interfaces/workshopComponent';
import { Ref, ref, watch } from 'vue';

interface Data {
  SUB_COMPONENT_PREVIEW_ELEMENT_IDS;
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
}

interface Props {
  subcomponent?: SubcomponentProperties;
}

export default {
  data: (): Data => ({
    SUB_COMPONENT_PREVIEW_ELEMENT_IDS,
    SUB_COMPONENT_CSS_MODES,
    NEW_COMPONENT_TYPES,
  }),
  setup(props: { subcomponent: SubcomponentProperties }): UseComponentPreviewEventHandlers {
    const subcomponentRef: Ref<Props['subcomponent']> = ref(props.subcomponent);
    watch(() => props.subcomponent, (newSubcomponent: Props['subcomponent']) => {
      subcomponentRef.value = newSubcomponent;
    });
    return useComponentPreviewEventHandlers(subcomponentRef);
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
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  }
</style>