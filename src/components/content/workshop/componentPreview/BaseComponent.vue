<template>
  <div>
    <div ref="componentPreview"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="getBaseId('subcomponentId')"
      :style="getStyleProperties()"
      class="parent-component"
      :class="[COMPONENT_PREVIEW_MARKER, (isNestedComponent ? 'nested-component' : STATIC_POSITION_CLASS),
        ...getJsClasses(), getSubcomponentMouseEventsDisabledClassForXButtonText()]"
      @mouseenter="activateSubcomponentMouseEvent('subcomponentMouseEnter')"
      @mouseleave="activateSubcomponentMouseEvent('subcomponentMouseLeave')"
      @mousedown="activateSubcomponentMouseEvent('subcomponentMouseDown')"
      @mouseup="activateSubcomponentMouseEvent('subcomponentMouseUp')"
      @click="activateSubcomponentMouseEvent('subcomponentClick')">
        {{getSubcomponentText()}}
        <layers
          :classes="[...getJsClasses()]"
          :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
          :mouseEvents="mouseEvents"
          :layers="component.componentPreviewStructure.layers"
        />
    </div>
    <div ref="componentPreviewOverlay"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="getBaseId('overlayId')"
      style="display: none"
      :style="[component.componentPreviewStructure.baseSubcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        {color: '#ff000000'}, isNestedComponent ? {} : { height: '100% !important' }]"
      :class="[isNestedComponent ? 'nested-component' : [STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height'], getOverlayClasses()]">
        {{getSubcomponentText()}}
        <!-- subOverlays are used for only displaying the container/actual overlay only when the mouse has reached it's actual content as in some cases (close button text) mouse
          enter event can be fired before the mouse actually reaches the actual subcomponent content -->
        <div v-if="isXButtonText()"
          :class="SUBCOMPONENT_OVERLAY_CLASSES.SUB"
          :style="getXButtonOverlayStyleProperties()"
          @mouseEnter="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseEnter"
          @mouseLeave="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseLeave"></div>
    </div>
  </div>    
</template>

<script lang="ts">
import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../consts/subcomponentSelectModeDisabledElementClass';
import useSubcomponentPreviewSelectModeEventHandlers from './compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { UseSubcomponentPreviewEventHandlers } from '../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../interfaces/workshopComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../consts/closeButtonXText';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import SubcomponentDisplayUtils from './utils/subcomponentDisplayUtils';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  isSubcomponentDisplayed: (component: SubcomponentProperties) => boolean;
  useSubcomponentPreviewSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      COMPONENT_PREVIEW_MARKER,
      CSS_PSEUDO_CLASSES,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
      useSubcomponentPreviewSelectModeEventHandlers: useSubcomponentPreviewSelectModeEventHandlers(),
    };
  },
  methods: {
    getStyleProperties(): WorkshopComponentCss[] {
      const { baseSubcomponentProperties: {
        overwrittenCustomCssObj, customCss, inheritedCss, activeCssPseudoClass, customStaticFeatures} } = this.component.componentPreviewStructure;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [
        inheritedCss || '',
        customCssObj[CSS_PSEUDO_CLASSES.DEFAULT],
        customCssObj[activeCssPseudoClass],
        { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''}
      ];
    },
    getBaseId(idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[this.component.subcomponentNames.base][idType];
    },
    activateSubcomponentMouseEvent(subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      this.mouseEvents[this.getBaseId('subcomponentId')][subcomponentMouseEvent]()
    },
    getSubcomponentText(): string {
      return this.component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures?.subcomponentText?.text || '';
    },
    getJsClasses(): string[] {
      return this.component.componentPreviewStructure.baseSubcomponentProperties?.customFeatures?.jsClasses || [];
    },
    getOverlayClasses(): string[] {
      return this.component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT
        ? ['close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER]
        : [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT];
    },
    isXButtonText(): boolean {
      return this.component.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
    },
    getSubcomponentMouseEventsDisabledClassForXButtonText(): string {
      return this.isXButtonText() ? SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS : '';
    },
    getXButtonOverlayStyleProperties(): WorkshopComponentCss[] {
      const { baseSubcomponentProperties: { overwrittenCustomCssObj, customCss } } = this.component.componentPreviewStructure;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [customCssObj[CSS_PSEUDO_CLASSES.DEFAULT], { top: ''}];
    },
  },
  components: {
    layers,
  },
  props: {
    component: Object,
    mouseEvents: Object,
    isNestedComponent: Boolean,
    subcomponentAndOverlayElementIds: Object,
  },
};
</script>

<style lang="css" scoped>
  .parent-component {
    overflow: hidden;
  }
  .nested-component {
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
