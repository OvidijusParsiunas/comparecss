<template>
  <div>
    <div ref="componentPreview"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId"
      class="parent-component"
      :class="[ COMPONENT_PREVIEW_MARKER,
        ...((component.componentPreviewStructure.baseSubcomponentProperties.customFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customFeatures.jsClasses) || []),
        (isImportedComponent ? 'imported-component' : STATIC_POSITION_CLASS) ]"
      @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseEnter()"
      @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseLeave()"
      @mousedown="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseDown()"
      @mouseup="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseUp()"
      @click="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentClick()"
      :style="[component.componentPreviewStructure.baseSubcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
        ? [
            [ component.componentPreviewStructure.baseSubcomponentProperties.inheritedCss || '' ],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.HOVER],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.CLICK],
          ]
        : [
            [ component.componentPreviewStructure.baseSubcomponentProperties.inheritedCss || '' ],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][component.componentPreviewStructure.baseSubcomponentProperties.activeCssPseudoClass],
          ], { backgroundImage: component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.image
              && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.image.data ? 'url(' + component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.image.data + ')' : ''}]">
          {{(component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText
            && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text) ? component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text : '' }}
          <layers
            :classes="[...((component.componentPreviewStructure.baseSubcomponentProperties.customFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customFeatures.jsClasses) || [])]"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :mouseEvents="mouseEvents"
            :layers="component.componentPreviewStructure.layers"
          />
    </div>
    <div ref="componentPreviewOverlay"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].overlayId"
      style="display: none"
      :style="[
        component.componentPreviewStructure.baseSubcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        {color: '#ff000000'}, isImportedComponent ? {} : { height: '100% !important' }]"
      :class="[
        isImportedComponent ? 'imported-component' : [STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height'],
        component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText
              && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text === CLOSE_BUTTON_X_TEXT
            ? ['close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER] : [...OVERLAY_DEFAULT_CLASSES]]">
        <!-- WORK1: do the following after updating all packages -->
        <!-- WORK1: take all of this code out into a separate component, use method's optional chaining here -->
        {{(component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures
          && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText
          && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text)
            ? component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text : '' }}
            <!-- subOverlays are used for only displaying the container/actual overlay only when the mouse has reached it's actual content as in some cases (close button text) mouse
              enter event can be fired before the mouse actually reaches the actual div -->
          <div v-if="component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures
            && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText
            && component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.subcomponentText.text === CLOSE_BUTTON_X_TEXT"
            :class="SUBCOMPONENT_OVERLAY_CLASSES.SUB"
            :style="[component.componentPreviewStructure.baseSubcomponentProperties[
              component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT], { top: ''}]"
            @mouseEnter="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseEnter"
            @mouseLeave="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseLeave"></div>
    </div>
  </div>    
</template>

<script lang="ts">
import useSubcomponentPreviewSelectModeEventHandlers from './compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { UseSubcomponentPreviewEventHandlers } from '../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../interfaces/workshopComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../consts/closeButtonXText';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import SubcomponentDisplayUtils from './utils/subcomponentDisplayUtils';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  CLOSE_BUTTON_X_TEXT: string;
  isSubcomponentDisplayed: (component: SubcomponentProperties) => boolean;
  useSubcomponentPreviewSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
      COMPONENT_PREVIEW_MARKER,
      CLOSE_BUTTON_X_TEXT,
      CSS_PSEUDO_CLASSES,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
      useSubcomponentPreviewSelectModeEventHandlers: useSubcomponentPreviewSelectModeEventHandlers(),
    };
  },
  components: {
    layers,
  },
  props: {
    component: Object,
    mouseEvents: Object,
    isImportedComponent: Boolean,
    subcomponentAndOverlayElementIds: Object,
  },
};
</script>

<style lang="css" scoped>
  .parent-component {
    overflow: hidden;
  }
  .imported-component {
    position: relative;
    transform: translateY(-50%);
  }
  .close-button-text-overlay-height {
    height: 50%;
  }
</style>
<style lang="css">
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
  .subcomponent-overlay {
    /* the following color is partially transparent and uses the background color to set its own color */
    border-color: rgb(64 197 255 / 0%) !important;
    box-shadow: unset !important;
    position: absolute !important;
    top: 0px;
    width: 100%;
    z-index: 1;
  }
  .subcomponent-overlay-default {
    background-color: rgb(64 197 255 / 43%) !important;
    pointer-events: none;
  }
  .subcomponent-overlay-remove {
    background-color: rgb(255 29 29 / 43%) !important;
  }
  .subcomponent-overlay-add {
    background-color: rgb(8 235 31 / 43%) !important;
  }
  .subcomponent-overlay-with-no-border-property-but-with-height {
    border-color: rgb(64 197 255 / 0%) !important;
    border-top-width: 0px !important;
    border-bottom-width: 0px !important;
    height: 100%;
  }
  .sub-overlay {
    position: absolute;
    top: 0px;
  }
  .subcomponent-cursor-auto {
    cursor: auto;
  }
  .subcomponent-cursor-select-mode {
    cursor: pointer !important;
  }

  @keyframes displayRipple {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(4);
    }
  }

  @keyframes fadeRipple {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
