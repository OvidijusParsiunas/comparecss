<template>
  <div v-if="component" ref="componentPreviewContainer"
    class="component-preview-container-default"
    @mouseenter="componentPreviewMouseEnter()"
    @mouseleave="componentPreviewMouseLeave()">
    <div class="component-preview-contents"
      :class="[
        (component.subcomponents[BASE_SUB_COMPONENT].customFeatures
          && component.subcomponents[BASE_SUB_COMPONENT].customFeatures.componentCenteringInParent
          && ((component.subcomponents[BASE_SUB_COMPONENT].customFeatures.componentCenteringInParent.vertical
              && !component.subcomponents[BASE_SUB_COMPONENT].customFeatures.componentCenteringInParent.horizontal
                ? 'component-preview-centered-vertically' : false)
              || (component.subcomponents[BASE_SUB_COMPONENT].customFeatures.componentCenteringInParent.horizontal 
                && !component.subcomponents[BASE_SUB_COMPONENT].customFeatures.componentCenteringInParent.vertical
                ? 'component-preview-centered-horizontally': false)
        ))
        || 'component-preview-centered']"> 
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
          <!-- parent component -->
          <base-component ref="baseComponent"
            class="grid-item-position"
            :style="{display: !isFullPreviewModeOn || !temporaryComponent.displayed ? 'block' : 'none'}"
            :component="component"
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
import { modalAnimationTypeToFunctionality } from './utils/animations/expandedModalPreviewMode/animationInitializers/modalAnimationTypeToFunctionality';
import { subcomponentAndOverlayElementIdsState } from '../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import ExpandedModalPreviewModeToggleEntranceAnimation from './utils/animations/expandedModalPreviewMode/toggleAnimations/entrance';
import { SubcomponentSelectModeSubOverlay } from '../toolbar/options/subcomponentSelectMode/subcomponentSelectModeSubOverlay';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import ExpandedModalPreviewModeToggleExitAnimation from './utils/animations/expandedModalPreviewMode/toggleAnimations/exit';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../interfaces/subcomponentPreviewMouseEvents';
import { ToggleFullPreviewModeEvent } from '../../../../interfaces/toggleFullPreviewModeEvent';
import { PlayAnimationPreviewEvent } from '../../../../interfaces/playAnimationPreviewEvent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../consts/coreSubcomponentNames.enum';
import PreviewEntranceAnimation from './utils/animations/previewAnimations/entrance';
import { EntranceAnimation, ExitAnimation } from '../../../../interfaces/animations';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { componentTypeToStyles } from '../newComponent/types/componentTypeToStyles';
import { NEW_COMPONENT_STYLES } from '../../../../consts/newComponentStyles.enum';
import ToggleFullPreviewMode from './utils/fullPreviewMode/toggleFullPreviewMode';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { TemporaryComponent } from '../../../../interfaces/temporaryComponent';
import PreviewExitAnimation from './utils/animations/previewAnimations/exit';
import AnimationUtils from './utils/animations/utils/animationUtils';
import ComponentPreviewUtils from './utils/componentPreviewUtils';

interface Consts {
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
}

interface Data {
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
  mouseEvents: SubcomponentPreviewMouseEvents;
  changeMouseEventsToDefaultOnComponentPreviewMouseEnter: boolean;
  temporaryComponent: TemporaryComponent;
  isFullPreviewModeOn: boolean;
}

export default {
  setup(): Consts {
    return {
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
    };
  },
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
      component: componentTypeToStyles[NEW_COMPONENT_TYPES.BUTTON][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent(),
    },
  }),
  methods: {
    componentPreviewMouseLeave(): void {
      Object.keys(this.component.subcomponents).forEach((key) => {
        const subcomponent = this.component.subcomponents[key];
        if (subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition) {
          subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = 'unset';
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
        ComponentPreviewUtils.setAllSubcomponentsCursorsToPointer();
        this.mouseEvents = ComponentPreviewUtils.generateSubcomponentSelectModeMouseEvents(this.subcomponentAndOverlayElementIds);
        this.changeMouseEventsToDefaultOnComponentPreviewMouseEnter = false;
        SubcomponentSelectModeSubOverlay.displaySubOverlays();    
      } else {
        ComponentPreviewUtils.unsetAllSubcomponentsCursorsFromPointer();
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
        ExpandedModalPreviewModeToggleEntranceAnimation.start(this, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
      } else {
        ExpandedModalPreviewModeToggleExitAnimation.start(this, setOptionToDefaultCallback, toolbarContainerElement, toolbarElement,
          toolbarPositionToggleElement);
      }
    },
    toggleFullPreviewMode(event: ToggleFullPreviewModeEvent): void {
      const [isToggledOn, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback,
        toolbarContainerElement, toolbarElement] = event;
      if (isToggledOn) {
        ToggleFullPreviewMode.toggleOn(this, this.$refs.baseComponent.$refs.componentPreview, toolbarContainerElement, toolbarElement,
          isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, this.$refs.temporaryComponent);
      } else {
        ToggleFullPreviewMode.toggleOff(this, toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive,
          toggleFullPreviewModeOptionsCallback, this.$refs.baseComponent.$refs.componentPreview, this.$refs.temporaryComponent);
      }
    },
    playAnimationPreview(playAnimationPreviewEvent: PlayAnimationPreviewEvent): void {
      const [animationType, isEntranceAnimation] = playAnimationPreviewEvent;
      if (isEntranceAnimation) {
        PreviewEntranceAnimation.start(
          modalAnimationTypeToFunctionality[animationType] as EntranceAnimation,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.animations.entrance.duration, this.$refs.baseComponent.$refs.componentPreview);
      } else {
        PreviewExitAnimation.start(
          modalAnimationTypeToFunctionality[animationType] as ExitAnimation,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.animations.exit.duration, this.$refs.baseComponent.$refs.componentPreview);
      }
    },
    stopAnimationPreview(): void {
      AnimationUtils.cancelAnimationPreview(this.$refs.baseComponent.$refs.componentPreview);
    }
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
  watch: {
    component(): void {
      if (!this.component) return;
      const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(this.component);
      this.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
      subcomponentAndOverlayElementIdsState.setSubcomponentAndOverlayElementIdsState(subcomponentAndOverlayElementIds);
      this.mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds, this.component.subcomponents);
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
