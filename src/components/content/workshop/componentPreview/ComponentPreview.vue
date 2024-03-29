<template>
  <div v-if="component" ref="componentPreviewContainer"
    class="component-preview-container-default"
    @mouseenter="componentPreviewMouseEnter()"
    @mouseleave="componentPreviewMouseLeave()">
    <div class="component-preview-contents"
      :class="getComponentPreviewContentsDynamicClass()"> 
      <div class="grid-container">
        <div class="grid-item grid-item-position"></div>
        <div class="grid-item grid-item-position">
          <!-- https://v3.vuejs.org/guide/transitions-enterleave.html#css-transitions -->
          <transition name="top-slide-fade">
            <div id="margin-assistance-top" v-if="componentPreviewAssistance.margin" class="margin-marker grid-item-position"></div>
          </transition>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item grid-item-position">
          <transition name="left-slide-fade">
            <div id="margin-assistance-left" v-if="componentPreviewAssistance.margin" class="margin-marker grid-item-position"></div>
          </transition>
        </div>
        <div :style="{'background-color': componentPreviewAssistance.margin ? '#f9f9f9' : ''}" class="grid-item grid-item-position">
          <!-- master component -->
          <base-component ref="baseComponent"
            class="grid-item-position"
            style="z-index: 1"
            :style="{display: !isFullPreviewModeOn || !temporaryComponent.displayed ? 'block' : 'none'}"
            :component="component.paddingComponentChild || component"
            :mouseEvents="mouseEvents"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"/>
          <div ref="temporaryComponent"
            class="component-preview-contents component-preview-centered">
            <base-component v-if="isFullPreviewModeOn && temporaryComponent.displayed"
              class="grid-item-position"
              :component="temporaryComponent.component"
              :mouseEvents="temporaryComponent.mouseEvents"
              :subcomponentAndOverlayElementIds="temporaryComponent.subcomponentAndOverlayElementIds"/>
          </div>
          <!-- UX - SUBCOMPONENT SELECT - set this to appropriate dimensions when the event is fired -->
          <!-- <div ref="selectSubcomponentOverlay1" style="width: 1000px; height: 700px; background-color: #ff010100; position: absolute; border: 0px; top: -221px; left: -220px; z-index: 1; cursor: pointer;"></div> -->
        </div>
        <div class="grid-item grid-item-position">
          <transition name="right-slide-fade">
            <div id="margin-assistance-right" v-if="componentPreviewAssistance.margin" class="margin-marker grid-item-position"></div>
          </transition>
        </div>
        <div class="grid-item grid-item-position"></div>
        <div class="grid-item grid-item-position">
          <transition name="bottom-slide-fade">
            <div id="margin-assistance-bottom" v-if="componentPreviewAssistance.margin" class="margin-marker grid-item-position"></div>
          </transition>
        </div>
        <div class="grid-item grid-item-position"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ToggleFullPreviewModeEvent, ToggleFullPreviewModeOffCallbacks } from '../../../../interfaces/toggleFullPreviewModeEvent';
import ExpandedModalPreviewModeToggleCloseAnimation from './utils/animations/expandedModalPreviewMode/toggleAnimations/close';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import ExpandedModalPreviewModeToggleOpenAnimation from './utils/animations/expandedModalPreviewMode/toggleAnimations/open';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { subcomponentAndOverlayElementIdsState } from './utils/elements/subcomponentAndOverlayElementIdsState';
import { SubcomponentSelectModeSubOverlay } from './utils/elements/overlays/subcomponentSelectModeSubOverlay';
import { masterComponentTypeToStyleGenerators } from '../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../interfaces/subcomponentPreviewMouseEvents';
import { MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../consts/baseSubcomponentNames.enum';
import { CustomFeatures, WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { animationTypeToFunctionality } from './utils/animations/animationToFunctionality';
import { PlayAnimationPreviewEvent } from '../../../../interfaces/settingsComponentEvents';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import ToggleFullPreviewMode from './utils/fullPreviewMode/toggleFullPreviewMode';
import { OpenAnimation, CloseAnimation } from '../../../../interfaces/animations';
import { CSS_PROPERTY_VALUES } from '../../../../consts/cssPropertyValues.enum';
import { TemporaryComponent } from '../../../../interfaces/temporaryComponent';
import PreviewCloseAnimation from './utils/animations/previewAnimations/close';
import { SubcomponentAndOverlayIds } from './utils/subcomponentAndOverlayIds';
import PreviewOpenAnimation from './utils/animations/previewAnimations/open';
import { COMPONENT_TYPES } from '../../../../consts/componentTypes.enum';
import { DEFAULT_STYLES } from '../../../../consts/componentStyles.enum';
import AnimationUtils from './utils/animations/utils/animationUtils';
import ComponentPreviewUtils from './utils/componentPreviewUtils';

interface Data {
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
  mouseEvents: SubcomponentPreviewMouseEvents;
  changeMouseEventsToDefaultOnComponentPreviewMouseEnter: boolean;
  temporaryComponent: TemporaryComponent;
  isFullPreviewModeOn: boolean;
}

export default {
  data: (): Data => ({
    subcomponentAndOverlayElementIds: null,
    mouseEvents: {},
    changeMouseEventsToDefaultOnComponentPreviewMouseEnter: false,
    isFullPreviewModeOn: false,
    // component is created here in order to keep it reactive (enable the css mode changes to be rendered)
    // the temporaryComponent property can be renamed to allow the creation of multiple temporary components using the same interface
    temporaryComponent: {
      displayed: false,
      mouseEvents: null,
      subcomponentAndOverlayElementIds: null,
      component: masterComponentTypeToStyleGenerators[COMPONENT_TYPES.BUTTON][DEFAULT_STYLES.DEFAULT].createNewComponent({}),
    },
  }),
  methods: {
    getComponentPreviewContentsDynamicClass(): string {
      const { componentCenteringInScreen } = this.component.subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE].customFeatures || {};
      if (componentCenteringInScreen) {
        if (componentCenteringInScreen.vertical && !componentCenteringInScreen.horizontal) return 'component-preview-centered-vertically';
        if (componentCenteringInScreen.horizontal && !componentCenteringInScreen.vertical) return 'component-preview-centered-horizontally';
      }
      return 'component-preview-centered';
    },
    componentPreviewMouseLeave(): void {
      Object.keys(this.component.subcomponents).forEach((key) => {
        const subcomponent = this.component.subcomponents[key];
        if (subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition) {
          subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = CSS_PROPERTY_VALUES.UNSET;
        }
      });
    },
    componentPreviewMouseEnter(): void {
      if (this.changeMouseEventsToDefaultOnComponentPreviewMouseEnter) {
        this.mouseEvents = ComponentPreviewUtils.generateMouseEvents(this.subcomponentAndOverlayElementIds, this.component.subcomponents);
        // bug fix - when in select subcomponent mode, clicked the subcomponent dropdown and then clicked the subcomponet select mode again
        // caused the preview mouse events to not activate
        this.changeMouseEventsToDefaultOnComponentPreviewMouseEnter = false;
      }
    },
    // UX - SUBCOMPONENT SELECT - set this to appropriate dimensions when the event is fired
    toggleSubcomponentSelectMode(isActivated: boolean): void {
      // this.$refs.selectSubcomponentOverlay1.style.display = 'block';
      if (isActivated) {
        ComponentPreviewUtils.setAllSubcomponentsCursors();
        this.mouseEvents = ComponentPreviewUtils.generateSubcomponentSelectModeMouseEvents(this.subcomponentAndOverlayElementIds);
        this.changeMouseEventsToDefaultOnComponentPreviewMouseEnter = false;
        SubcomponentSelectModeSubOverlay.display();    
      } else {
        ComponentPreviewUtils.unsetAllSubcomponentsCursors();
        SubcomponentSelectModeSubOverlay.toggleDisabledSubcomponentPointerEvents('');
        if ((event.target as HTMLElement).classList.contains(CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.SUBCOMPONENTS)) {
          // bug fix - when in select subcomponent mode and click on the subcomponent dropdown button, the overlay disappears
          // this is caused by mouseEvents object being reasigned, which in turn causes the component markup to re-render
          // and resetting the subcomponents display properties to 'none' - style="display: none"
          this.changeMouseEventsToDefaultOnComponentPreviewMouseEnter = true;
        } else {
          this.mouseEvents = ComponentPreviewUtils.generateMouseEvents(this.subcomponentAndOverlayElementIds, this.component.subcomponents);
        }
      }
    },
    toggleExpandModalPreviewMode(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      const [isToggledExpandedModalPreviewModeToActive, setOptionToDefaultCallback, toolbarPositionToggleElement,
        toolbarContainerElement, toolbarElement] = toggleExpandedModalPreviewModeEvent;
      if (isToggledExpandedModalPreviewModeToActive) {
        // strategies
        // https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
        ExpandedModalPreviewModeToggleOpenAnimation.start(this, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
      } else {
        ExpandedModalPreviewModeToggleCloseAnimation.start(this, setOptionToDefaultCallback, toolbarContainerElement, toolbarElement,
          toolbarPositionToggleElement);
      }
    },
    toggleFullPreviewMode(event: ToggleFullPreviewModeEvent, toggleFullPreviewModeOffWorkshopCallback: () => void): void {
      const [isToggledOn, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback,
        toolbarContainerElement, toolbarElement] = event;
      if (isToggledOn) {
        const toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks = { toggleFullPreviewModeOptionsCallback, toggleFullPreviewModeOffWorkshopCallback };
        ToggleFullPreviewMode.toggleOn(this, this.$refs.baseComponent.$refs.componentPreview, toolbarContainerElement, toolbarElement,
          isExpandedModalPreviewModeActive, this.$refs.temporaryComponent, toggleFullPreviewModeOffCallbacks);
      } else {
        ToggleFullPreviewMode.toggleOff(this, toolbarContainerElement, toggleFullPreviewModeOptionsCallback, toolbarElement,
          isExpandedModalPreviewModeActive, this.$refs.baseComponent.$refs.componentPreview, this.$refs.temporaryComponent);
      }
    },
    playAnimationPreview(playAnimationPreviewEvent: PlayAnimationPreviewEvent): void {
      const [animationType, isOpenAnimation] = playAnimationPreviewEvent;
      const { display: displayAnimation } = (this.component.subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE].customFeatures as CustomFeatures).animations;
      if (isOpenAnimation) {
        PreviewOpenAnimation.start(
          animationTypeToFunctionality[animationType] as OpenAnimation,
          displayAnimation.open.duration,
          this.$refs.baseComponent.$refs.componentPreview);
      } else {
        PreviewCloseAnimation.start(
          animationTypeToFunctionality[animationType] as CloseAnimation,
          displayAnimation.close.duration,
          this.$refs.baseComponent.$refs.componentPreview);
      }
    },
    stopAnimationPreview(): void {
      AnimationUtils.cancelAnimationPreview(this.$refs.baseComponent.$refs.componentPreview);
    },
    refreshTemporaryComponentPropertiesBeforeUse(): void {
      if (this.component.subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE].customFeatures?.closeTriggers && !this.temporaryComponent.displayed) {
        this.temporaryComponent.subcomponentAndOverlayElementIds = null;
        this.temporaryComponent.mouseEvents = null;
      }
    },
    refreshCurrentComponent(): void {
      this.refreshTemporaryComponentPropertiesBeforeUse();
      const subcomponentAndOverlayElementIds = SubcomponentAndOverlayIds.generate(this.component);
      this.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
      subcomponentAndOverlayElementIdsState.setSubcomponentAndOverlayElementIdsState(subcomponentAndOverlayElementIds);
      this.mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds, this.component.subcomponents);
    },
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
  watch: {
    component(currentComponent: WorkshopComponent): void {
      if (currentComponent) this.refreshCurrentComponent();
    }
  }
};
</script>

<style lang="css" scoped>
  .component-preview-container-default {
    position: relative;
    height: 50%;
  }
  .component-preview-container-modal {
    position: relative;
    height: 106%;
    top: -2.6%;
    left: -30vw;
    width: 100vw;
  }
  .component-preview-contents {
    margin: 0;
    z-index: 0;
    position: absolute;
    text-align: center;
  }
  .component-preview-centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .component-preview-centered-horizontally {
    left: 50%;
    transform: translateX(-50%);
  }
  .component-preview-centered-vertically {
    top: 50%;
    transform: translateY(-50%);
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .grid-item {
    background: none !important;
  }
  .margin-marker {
    background-color: rgb(225 225 225) !important;
    z-index: 2;
  }
  .grid-item-position {
    position: relative;
  }
  #margin-assistance-left {
    border-radius: 5px 2px 2px 5px;
    width: 10px;
    height: 100%;
    float: right;
    border-right: 1px solid #b9b9b9
  }
  #margin-assistance-top {
    border-radius: 5px 5px 2px 2px;
    width: 100%;
    height: 10px;
    bottom: 0;
    position: absolute;
    border-bottom: 1px solid #b9b9b9;
  }
  #margin-assistance-right {
    border-radius: 2px 5px 5px 2px;
    width: 10px;
    height: 100%;
    border-left: 1px solid #b9b9b9;
  }
  #margin-assistance-bottom {
    border-radius: 2px 2px 5px 5px;
    width: 100%;
    height: 10px;
    position: absolute;
    border-top: 1px solid #b9b9b9;
  }
  .left-slide-fade-enter-active,
  .left-slide-fade-leave-active,
  .top-slide-fade-enter-active,
  .top-slide-fade-leave-active,
  .right-slide-fade-enter-active,
  .right-slide-fade-leave-active,
  .bottom-slide-fade-enter-active,
  .bottom-slide-fade-leave-active {
    transition: all 0.4s ease-out;
  }
  .left-slide-fade-enter-from,
  .left-slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
  .top-slide-fade-enter-from,
  .top-slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  .right-slide-fade-enter-from,
  .right-slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .bottom-slide-fade-enter-from,
  .bottom-slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
<style lang="css">
  .static-position {
    top: 0px !important;
    left: 0px !important;
    bottom: 0px !important;
    right: 0px !important;
  }
</style>
