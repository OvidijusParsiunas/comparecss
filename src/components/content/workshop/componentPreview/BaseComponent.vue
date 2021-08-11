<template>
  <div>
    <div ref="componentPreview"
      :id="getBaseId('subcomponentId')"
      :style="getStyleProperties(component)"
      class="parent-component"
      :class="[COMPONENT_PREVIEW_MARKER, (isNestedComponent ? 'nested-component' : STATIC_POSITION_CLASS),
        ...getJsClasses(), getSubcomponentMouseEventsDisabledClassForXButtonText()]"
      @mouseenter="activateSubcomponentMouseEvent('subcomponentMouseEnter')"
      @mouseleave="activateSubcomponentMouseEvent('subcomponentMouseLeave')"
      @mousedown="activateSubcomponentMouseEvent('subcomponentMouseDown')"
      @mouseup="activateSubcomponentMouseEvent('subcomponentMouseUp')"
      @click="activateSubcomponentMouseEvent('subcomponentClick')">
        {{getSubcomponentText(component)}}
        <layers
          :classes="[...getJsClasses()]"
          :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
          :mouseEvents="mouseEvents"
          :layers="component.componentPreviewStructure.layers"
        />
    </div>
    <div ref="componentPreviewOverlay"
      :id="getBaseId('overlayId')"
      style="display: none"
      :style="getOverlayStyleProperties()"
      :class="getOverlayClasses()">
        {{getSubcomponentText(component)}}
        <!-- subOverlays are used for only displaying the container/actual overlay only when the mouse has reached it's actual content as in some cases (close button text) mouse
          enter event can be fired before the mouse actually reaches the actual subcomponent content -->
        <div v-if="isXButtonText()"
          :class="SUBCOMPONENT_OVERLAY_CLASSES.SUB"
          :style="getXButtonOverlayStyleProperties()"
          @mouseEnter="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseEnter"
          @mouseLeave="useSubcomponentPreviewSelectModeEventHandlers.subcomponentMouseLeave"></div>
    </div>
    <base-component v-if="component.auxiliaryComponent"
      :style="getAuxiliaryComponentParentElementStyleProperties()"
      :component="component.auxiliaryComponent"
      :mouseEvents="mouseEvents"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"/>
  </div>    
</template>

<script lang="ts">
import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../consts/subcomponentSelectModeDisabledElementClass';
import useSubcomponentPreviewSelectModeEventHandlers from './compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { UseSubcomponentPreviewEventHandlers } from '../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { UseBaseComponentGeneric } from '../../../../interfaces/useBasicComponentGeneric';
import { DROPDOWN_MENU_POSITIONS } from '../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import useBaseComponentGeneric from './compositionAPI/useBaseComponentGeneric';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../consts/closeButtonXText';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  useSubcomponentPreviewSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

export default {
  setup(): Consts & UseBaseComponentGeneric {
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      COMPONENT_PREVIEW_MARKER,
      CSS_PSEUDO_CLASSES,
      useSubcomponentPreviewSelectModeEventHandlers: useSubcomponentPreviewSelectModeEventHandlers(),
      ...useBaseComponentGeneric(),
    };
  },
  methods: {
    getBaseId(idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[this.component.coreSubcomponentRefs.base.name]?.[idType];
    },
    activateSubcomponentMouseEvent(subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      this.mouseEvents[this.getBaseId('subcomponentId')][subcomponentMouseEvent]();
    },
    getJsClasses(): string[] {
      return this.component.coreSubcomponentRefs.base.customFeatures?.jsClasses || [];
    },
    getOverlayStyleProperties(): WorkshopComponentCss {
      const subcomponentCss = { ...this.component.coreSubcomponentRefs.base.customCss[CSS_PSEUDO_CLASSES.DEFAULT], color: '#ff000000' };
      if (!this.isNestedComponent) subcomponentCss.height = this.component.coreBaseComponent ? 'unset' : '100% !important';
      if (this.component.coreSubcomponentRefs.base.isTemporaryAddPreview) subcomponentCss.display = 'block'; 
      if (!this.component.coreBaseComponent && !this.isNestedComponent) subcomponentCss.marginTop = '0px';
      return subcomponentCss;
    },
    getOverlayClasses(): string[] {
      const classes: string[] = [SUBCOMPONENT_OVERLAY_CLASSES.BASE];
      if (this.isNestedComponent) {
        classes.push('nested-component');
      } else {
        classes.push(STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height');
      }
      if (this.isXButtonText()) {
        classes.push('close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
      } else {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT);
      }
      if (this.component.coreSubcomponentRefs.base.isTemporaryAddPreview) {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
      return classes;
    },
    isXButtonText(): boolean {
      return this.component.coreSubcomponentRefs.base.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
    },
    getSubcomponentMouseEventsDisabledClassForXButtonText(): string {
      return this.isXButtonText() ? SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS : '';
    },
    getXButtonOverlayStyleProperties(): WorkshopComponentCss[] {
      const { overwrittenCustomCssObj, customCss } = this.component.coreSubcomponentRefs.base;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [customCssObj[CSS_PSEUDO_CLASSES.DEFAULT], { top: '', color: 'none', backgroundColor: 'none'}];
    },
    getAuxiliaryComponentParentElementStyleProperties(): WorkshopComponentCss {
      const positions: { [key in DROPDOWN_MENU_POSITIONS]: WorkshopComponentCss } = {
        [DROPDOWN_MENU_POSITIONS.TOP]: { bottom: '100%' },
        [DROPDOWN_MENU_POSITIONS.BOTTOM]: {},
        [DROPDOWN_MENU_POSITIONS.LEFT]: { top: '0px', right: '100%' },
        [DROPDOWN_MENU_POSITIONS.RIGHT]: { top: '0px', left: '100%' },
      };
      const { position } = this.component.auxiliaryComponent.coreSubcomponentRefs.base.customFeatures.dropdownMenuPosition;
      return { position: 'absolute', zIndex: 1, ...positions[position] };
    }
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
