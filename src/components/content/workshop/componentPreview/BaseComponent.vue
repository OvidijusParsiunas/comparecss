<template>
  <div ondragstart="return false;" :style="getBaseContainerParentStyleProperties()">
    <div :style="getBaseContainerStyleProperties()" :class="getBaseContainerCssClasses()">
      <component :is="getTag()" v-if="isComponentDisplayed()" ref="componentPreview"
        :id="getBaseId('subcomponentId')"
        :icon="getIconName()"
        :style="getComponentStyleProperties()"
        :class="[COMPONENT_PREVIEW_MARKER,
          ...getJsClasses(), ...getComponentCssClasses(), getSubcomponentMouseEventsDisabledClassForXButtonText()]"
        @mouseenter="activateSubcomponentMouseEvent('subcomponentMouseEnter')"
        @mouseleave="activateSubcomponentMouseEvent('subcomponentMouseLeave')"
        @mousedown="activateSubcomponentMouseEvent('subcomponentMouseDown')"
        @mouseup="activateSubcomponentMouseEvent('subcomponentMouseUp')"
        @click="activateSubcomponentMouseEvent('subcomponentClick')">
          {{ getSubcomponentText() }}
          <layers
            :jsClasses="[...getJsClasses()]"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :mouseEvents="mouseEvents"
            :layers="component.componentPreviewStructure.layers"
          />
      </component>
      <!-- this is used to prevent the button text from flashing when switching between different icon types in the settings dropdown -->
      <div v-else :style="getComponentStyleProperties()"></div>
      <div v-if="isIcon()"
        :id="getBaseId('subcomponentId')"
        :style="getOverlayStyleProperties()"
        :class="getLayerCssClasses(true)"
        @mouseenter="activateSubcomponentMouseEvent('subcomponentMouseEnter')"
        @mouseleave="activateSubcomponentMouseEvent('subcomponentMouseLeave')"></div>
      <div ref="componentPreviewOverlay"
        :id="getBaseId('overlayId')"
        style="display: none"
        :style="getOverlayStyleProperties()"
        :class="getLayerCssClasses()">
          {{ getSubcomponentText() }}
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
import { SubcomponentPreviewMouseEvents } from '../../../../interfaces/subcomponentPreviewMouseEvents';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { Subcomponent, WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { DROPDOWN_MENU_POSITIONS } from '../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import { UseBaseComponent } from '../../../../interfaces/useBaseComponent';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import useBaseComponent from './compositionAPI/useBaseComponent';
import { SetUtils } from '../utils/generic/setUtils';
import layers from './layers/Layers.vue';
import { ref, Ref, watch } from 'vue';

interface Consts {
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  useSubcomponentSelectModeEventHandlers: UseSubcomponentPreviewEventHandlers;
}

interface Props {
  isChildComponent: boolean;
  component: WorkshopComponent;
  mouseEvents: SubcomponentPreviewMouseEvents;
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
}

export default {
  setup(props: Props): Consts & UseBaseComponent {
    // WORK 2 - try to make a reusable func for this
    const componentRef: Ref<Props['component']> = ref(props.component);
    const isChildComponentRef: Ref<Props['isChildComponent']> = ref(props.isChildComponent);
    watch(() => props.component, (newComponent) => {
      componentRef.value = newComponent;
    });
    watch(() => props.isChildComponent, (isChildComponent) => {
      isChildComponentRef.value = isChildComponent;
    });
    const useBaseComponentCompositionAPI = useBaseComponent(componentRef, isChildComponentRef)
    return {
      SUBCOMPONENT_OVERLAY_CLASSES,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      COMPONENT_PREVIEW_MARKER,
      CSS_PSEUDO_CLASSES,
      useSubcomponentSelectModeEventHandlers: useSubcomponentSelectModeEventHandlers(),
      ...useBaseComponentCompositionAPI,
    };
  },
  methods: {
    getBaseId(idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[this.component.baseSubcomponent.name]?.[idType];
    },
    activateSubcomponentMouseEvent(subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      this.mouseEvents[this.getBaseId('subcomponentId')][subcomponentMouseEvent]();
    },
    getJsClasses(): string[] {
      const { customFeatures, customStaticFeatures } = this.component.baseSubcomponent as Subcomponent;
      return SetUtils.transformSetsToOneDimensionalArray(customFeatures?.jsClasses, customStaticFeatures?.jsClasses);
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
      return this.isIcon() ? 'font-awesome-icon' : 'div';
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
  /* the button group button class' properties can ofcourse be set in the ButtonGroupCompositionAPIUtils class'
     setButtonBorderProperties method and the button group button container classes in the useBaseComponent
     getBaseContainerStyleProperties function - however the browser does not refresh the dom when these are set - and only
     triggers a refresh on mouse hover of the component - hence this is a workaround to immediately refresh
     the button properties when its position type changes; e.g. right to middle etc */
  /* 0.00001px is used to prevent a bug in chrome where the background color bleeds past the border when it is 0px */
  .button-group-left-button {
    border-top-right-radius: 0.00001px !important;
    border-bottom-right-radius: 0.00001px !important;
    margin-left: 0px !important;
  }
  .button-group-right-button {
    border-top-left-radius: 0.00001px !important;
    border-bottom-left-radius: 0.00001px !important;
  }
  .button-group-middle-button {
    border-radius: 0.00001px !important;
  }
  /* because radius of 0.00001px sets the shadow corners to be round - the shadow is displayed in the container element instead
     where radius can be set to 0px without causing the bug */
  .button-group-left-button-container {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
  .button-group-right-button-container {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }
  .button-group-middle-button-container {
    border-radius: 0px !important;
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
