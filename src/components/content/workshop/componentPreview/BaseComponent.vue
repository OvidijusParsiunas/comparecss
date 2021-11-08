<template>
  <div ondragstart="return false;">
    <div :class="(isChildComponent ? 'child-component' : STATIC_POSITION_CLASS)" :style="getTopCssProperty()">
      <component :is="getTag()" v-if="isComponentDisplayed()" ref="componentPreview"
        :id="getBaseId('subcomponentId')"
        :icon="getIconName()"
        :style="getStyleProperties(component)"
        :class="[COMPONENT_PREVIEW_MARKER,
          ...getJsClasses(), ...getComponentCssClasses(), getSubcomponentMouseEventsDisabledClassForXButtonText()]"
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
      </component>
      <!-- this is used to prevent the button text from flashing when switching between different icon types in the settings dropdown -->
      <div v-else :style="getStyleProperties(component)"></div>
      <div v-if="isIcon(component)"
        :id="getBaseId('subcomponentId')"
        :style="getOverlayStyleProperties()"
        :class="getOverlayClasses(true)"
        @mouseenter="activateSubcomponentMouseEvent('subcomponentMouseEnter')"
        @mouseleave="activateSubcomponentMouseEvent('subcomponentMouseLeave')"></div>
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
            @mouseEnter="useSubcomponentSelectModeEventHandlers.subcomponentMouseEnter"
            @mouseLeave="useSubcomponentSelectModeEventHandlers.subcomponentMouseLeave"></div>
      </div>
      <div v-if="component.linkedComponents && component.linkedComponents.auxiliary" class="auxiliary-component">
        <base-component v-for="auxiliaryComponent in component.linkedComponents.auxiliary" :key="auxiliaryComponent"
        :style="getAuxiliaryComponentParentElementStyleProperties(auxiliaryComponent)"
        :component="auxiliaryComponent"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../consts/subcomponentSelectModeDisabledElementClass';
import { UseSubcomponentPreviewEventHandlers } from '../../../../interfaces/useSubcomponentPreviewEventHandlers';
import useSubcomponentSelectModeEventHandlers from './compositionAPI/useSubcomponentSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES } from '../../../../consts/dropdownArrowIcons';
import { SubcomponentProperties, WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { DROPDOWN_MENU_POSITIONS } from '../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import { UseBaseComponent } from '../../../../interfaces/useBaseComponent';
import { CLOSE_BUTTON_X_TEXT } from '../../../../consts/closeButtonXText';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import useBaseComponent from './compositionAPI/useBaseComponent';
import { SetUtils } from '../utils/generic/setUtils';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  useSubcomponentSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

export default {
  setup(): Consts & UseBaseComponent {
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      COMPONENT_PREVIEW_MARKER,
      CSS_PSEUDO_CLASSES,
      useSubcomponentSelectModeEventHandlers: useSubcomponentSelectModeEventHandlers(),
      ...useBaseComponent(),
    };
  },
  methods: {
    getTopCssProperty(): WorkshopComponentCss {
      const { top } = (this.component as WorkshopComponent).baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
      return { top: top || '50%' };
    },
    getBaseId(idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[this.component.baseSubcomponent.name]?.[idType];
    },
    activateSubcomponentMouseEvent(subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      this.mouseEvents[this.getBaseId('subcomponentId')][subcomponentMouseEvent]();
    },
    getJsClasses(): string[] {
      const { customFeatures, customStaticFeatures } = this.component.baseSubcomponent as SubcomponentProperties;
      return SetUtils.transformSetsToOneDimensionalArray(customFeatures?.jsClasses, customStaticFeatures?.jsClasses);
    },
    getComponentCssClasses(): string[] {
      return this.component.componentClasses || [];
    },
    // WORK 2 - move this to the use file
    getOverlayStyleProperties(): WorkshopComponentCss {
      const subcomponentCss = {
        ...this.component.baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT], color: '#ff000000',
        ...this.getTopCssProperty(),
        ...this.getButtonGroupBorderCss(this.component),
      };
      if (!this.isChildComponent) subcomponentCss.height = this.component.linkedComponents?.base ? 'unset' : '100% !important';
      if (this.component.baseSubcomponent.isTemporaryAddPreview) subcomponentCss.display = 'block'; 
      if (!this.component.linkedComponents?.base && !this.isChildComponent) subcomponentCss.marginTop = '0px';
      if (this.isIcon(this.component)) subcomponentCss.height = subcomponentCss.width;
      return subcomponentCss;
    },
    getOverlayClasses(isIconOverlayTrigger: boolean): string[] {
      const classes: string[] = [SUBCOMPONENT_OVERLAY_CLASSES.BASE];
      if (this.isChildComponent) {
        classes.push('child-component');
      } else {
        classes.push(STATIC_POSITION_CLASS, 'subcomponent-overlay-with-no-border-property-but-with-height');
      }
      if (this.isXButtonText()) {
        classes.push('close-button-text-overlay-height', SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
      } else if (isIconOverlayTrigger) {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.OVERLAY_TRIGGER);
      } else {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT);
      }
      if (this.component.baseSubcomponent.isTemporaryAddPreview) {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
      return [classes, ...this.getComponentCssClasses()];
    },
    isXButtonText(): boolean {
      return this.component.baseSubcomponent.customStaticFeatures?.subcomponentText?.text === CLOSE_BUTTON_X_TEXT;
    },
    getSubcomponentMouseEventsDisabledClassForXButtonText(): string {
      return this.isXButtonText() ? SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS : '';
    },
    getXButtonOverlayStyleProperties(): WorkshopComponentCss[] {
      const { overwrittenCustomCssObj, customCss } = this.component.baseSubcomponent;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [customCssObj[CSS_PSEUDO_CLASSES.DEFAULT], { top: '', color: 'none', backgroundColor: 'none'}];
    },
    getAuxiliaryComponentParentElementStyleProperties(auxiliaryComponent: WorkshopComponent): WorkshopComponentCss {
      const positions: { [key in DROPDOWN_MENU_POSITIONS]: WorkshopComponentCss } = {
        [DROPDOWN_MENU_POSITIONS.TOP]: { bottom: '100%' },
        [DROPDOWN_MENU_POSITIONS.BOTTOM]: {},
        [DROPDOWN_MENU_POSITIONS.LEFT]: { top: '0px', right: '100%' },
        [DROPDOWN_MENU_POSITIONS.RIGHT]: { top: '0px', left: '100%' },
      };
      const { position } = auxiliaryComponent.baseSubcomponent.customFeatures.dropdown.menuPosition;
      return { position: 'absolute', ...positions[position] };
    },
    getTag(): string {
      return this.isIcon(this.component) ? 'font-awesome-icon' : 'div';
    },
    getIconName(): string {
      const iconName = (this.component as WorkshopComponent).baseSubcomponent.customStaticFeatures?.icon?.name;
      return iconName ? DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES[iconName] : null;
    },
    isComponentDisplayed(): boolean {
      const { customStaticFeatures } = (this.component as WorkshopComponent).baseSubcomponent;
      if (customStaticFeatures?.icon) {
        return customStaticFeatures.icon.isComponentDisplayed;
      }
      return true;
    }
  },
  components: {
    layers,
  },
  props: {
    component: Object,
    mouseEvents: Object,
    isChildComponent: Boolean,
    subcomponentAndOverlayElementIds: Object,
  },
};
</script>

<style lang="css" scoped>
  .child-component {
    position: relative;
    transform: translateY(-50%);
  }
  .close-button-text-overlay-height {
    height: 50%;
  }
  .button-group-middle-button {
    border-radius: 0.00001px !important;
  }
  .button-group-left-button {
    border-top-right-radius: 0.000001px !important;
    border-bottom-right-radius: 0.00001px !important;
    margin-left: 0px !important;
  }
  .button-group-right-button {
    border-top-left-radius: 0.00001px !important;
    border-bottom-left-radius: 0.00001px !important;
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
  .subcomponent-overlay-trigger {
    pointer-events: none;
    background-color: '#ff000000';
    z-index: 0;
  }
  .subcomponent-overlay-trigger-active {
    pointer-events: all;
  }
  .sub-overlay {
    position: absolute;
    top: 0px;
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
