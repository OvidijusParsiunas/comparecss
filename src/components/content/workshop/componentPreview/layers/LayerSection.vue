<template>
  <div>
    <!-- when clicked on button text - the ripples don't fade far - this can be fixed on export, alternatively to achieve full ripple effect in the app,
         will have to disable pointer events in the layer sections and have the js class in the layer parent, will also need to find a way to be able to
         highlight the text in the subcomponent select mode -->
    <div v-for="(nestedSubcomponent, index) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[COMPONENT_PREVIEW_MARKER, specialisedSectionContainerClass,
        ...(nestedSubcomponent.subcomponentProperties.customFeatures
          && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses || [])]">
      <base-component v-if="nestedSubcomponent.subcomponentProperties.importedComponent"
        class="imported-component-container"
        :class="COMPONENT_PREVIEW_MARKER"
        :component="nestedSubcomponent.subcomponentProperties.importedComponent.componentRef"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isImportedComponent="true"/>
      <component v-else-if="isSubcomponentDisplayed(nestedSubcomponent.subcomponentProperties)"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId"
        class="subcomponent-element"
        :class="[COMPONENT_PREVIEW_MARKER, ...((nestedSubcomponent.subcomponentProperties.customFeatures && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses) || []),
         (nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText
         && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text) === CLOSE_BUTTON_X_TEXT
            ? SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS : '']"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseUp()"
        @click="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentClick()"
        :style="[nestedSubcomponent.subcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
          ? [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss || '' ],
              nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
              nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.HOVER],
              nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.CLICK],
            ]
          : [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss || '' ],
              nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
              nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][nestedSubcomponent.subcomponentProperties.activeCssPseudoClass],
            ], { backgroundImage: nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.image
              && nestedSubcomponent.subcomponentProperties.customStaticFeatures.image.data ? 'url(' + nestedSubcomponent.subcomponentProperties.customStaticFeatures.image.data + ')' : ''}]"
        >{{(!nestedSubcomponent.subcomponentProperties.subcomponentDisplayStatus || !nestedSubcomponent.subcomponentProperties.subcomponentDisplayStatus.isDisplayedTemporarily)
            && (nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText
            && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text) ? nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text : '' }}
      </component>
      <component v-if="!nestedSubcomponent.subcomponentProperties.importedComponent"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].overlayId"
        :style="[
          nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
          {display: 'none'}, {color: '#ff000000'}]"
        class="subcomponent-element"
        :class="nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText
              && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text === CLOSE_BUTTON_X_TEXT
            ? ['close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER] : [...OVERLAY_DEFAULT_CLASSES]">
          {{isSubcomponentDisplayed(nestedSubcomponent.subcomponentProperties)
            && nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText
            && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text ? nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text : ''}}
          <!-- subOverlays are used for only displaying the container/actual overlay only when the mouse has reached it's actual content as in some cases (close button text) mouse
              enter event can be fired before the mouse actually reaches the actual div -->
          <div v-if="nestedSubcomponent.subcomponentProperties.customStaticFeatures && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText
            && nestedSubcomponent.subcomponentProperties.customStaticFeatures.subcomponentText.text === CLOSE_BUTTON_X_TEXT"
            :class="SUBCOMPONENT_OVERLAY_CLASSES.SUB"
            :style="[nestedSubcomponent.subcomponentProperties[nestedSubcomponent.subcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT], { top: ''}]"
            @mouseEnter="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseEnter"
            @mouseLeave="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseLeave"></div>
      </component>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../../consts/subcomponentSelectModeDisabledElementClass';
import useSubcomponentPreviewSelectModeEventHandlers from '../compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../consts/closeButtonXText';
import SubcomponentDisplayUtils from '../utils/subcomponentDisplayUtils';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  CORE_SUBCOMPONENTS_NAMES: typeof CORE_SUBCOMPONENTS_NAMES;
  SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  CLOSE_BUTTON_X_TEXT: string;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  isSubcomponentDisplayed: (nestedSubcomponent: SubcomponentProperties) => boolean;
  useSubcomponentPreviewSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS,
      CORE_SUBCOMPONENTS_NAMES,
      COMPONENT_PREVIEW_MARKER,
      CLOSE_BUTTON_X_TEXT,
      CSS_PSEUDO_CLASSES,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
      useSubcomponentPreviewSelectModeEventHandlers: useSubcomponentPreviewSelectModeEventHandlers(),
    };
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedSubcomponents: Object,
    mouseEvents: Object,
    specialisedSectionContainerClass: String,
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
  .center-section-container {
    justify-content: center;
    pointer-events: all;
  }
  .equal-split-section-container {
    flex: 1 1 0px;
    justify-content: center;
  }
  .subcomponent-element-container {
    width: 100%;
    height: 100%;
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
  .imported-component-container {
    height: 100%;
  }
  .close-button-text-overlay-height {
    height: 50%;
  }
</style>
