<template>
  <div v-if="component" ref="componentPreviewContainer"
    class="component-preview-container-default"
    :style="{backgroundColor: component.subcomponents[BASE_SUB_COMPONENT].customFeatures
      && component.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop
      && component.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.visible
      ? component.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.color : 'unset'}"
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
        <div :style="componentPreviewAssistance.margin ? { 'background-color': '#f9f9f9' } : { 'background-color': '' }" class="grid-item grid-item-position">
          <!-- parent component -->
          <base-component ref="baseComponent"
            class="grid-item-position"
            :style="{display: !temporaryComponent || temporaryComponent.modalDisplayed ? 'block' : 'none'}"
            :component="component"
            :mouseEvents="mouseEvents"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"/>
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
    <div ref="temporaryComponent"
      class="component-preview-contents component-preview-centered">
      <base-component v-if="temporaryComponent"
        class="grid-item-position"
        :component="temporaryComponent.component"
        :mouseEvents="temporaryComponent.mouseEvents"
        :subcomponentAndOverlayElementIds="temporaryComponent.subcomponentAndOverlayElementIds"/>
    </div>
  </div>
</template>

<script lang="ts">
import { subcomponentAndOverlayElementIdsState } from '../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { transitionTypeToFunctionality } from './utils/expandedModalPreviewMode/transitionInitializers/transitionTypeToFunctionality';
import ExpandedModalPreviewModeToggleEntranceTransition from './utils/expandedModalPreviewMode/modeToggleTransitions/entrance';
import ExpandedModalPreviewModeToggleExitTransitionService from './utils/expandedModalPreviewMode/modeToggleTransitions/exit';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../interfaces/subcomponentPreviewMouseEvents';
import { ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import PreviewEntranceTransition from './utils/expandedModalPreviewMode/previewTransitions/entrance';
import ToggleFullModalPreviewMode from './utils/fullModalPreviewMode/toggleFullModalPreviewMode';
import { PlayTransitionPreviewEvent } from '../../../../interfaces/playTransitionPreviewEvent';
import PreviewExitTransition from './utils/expandedModalPreviewMode/previewTransitions/exit';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../consts/coreSubcomponentNames.enum';
import TransitionUtils from './utils/expandedModalPreviewMode/utils/transitionUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { TemporaryComponent } from '../../../../interfaces/temporaryComponent';
import ComponentPreviewUtils from './utils/componentPreviewUtils';

interface Consts {
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
}

interface Data {
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
  mouseEvents: SubcomponentPreviewMouseEvents;
  changeMouseEventsToDefaultOnComponentPreviewMouseEnter: boolean;
  temporaryComponent: TemporaryComponent;
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
    temporaryComponent: null,
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
      } else {
        ComponentPreviewUtils.unsetAllSubcomponentsCursorsFromPointer();
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
    toggleExpandModalalPreviewMode(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      const [isToggledExpandedModalPreviewModeToActive, setOptionToDefaultCallback, toolbarPositionToggleElement,
        toolbarContainerElement, toolbarElement] = toggleExpandedModalPreviewModeEvent;
      if (isToggledExpandedModalPreviewModeToActive) {
        // strategies
        // https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
        ExpandedModalPreviewModeToggleEntranceTransition.start(
          transitionTypeToFunctionality[this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.type],
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.delay,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.backdrop, this.$refs.baseComponent.$refs.componentPreview,
          this.$refs.baseComponent.$refs.componentPreviewOverlay, this.$refs.componentPreviewContainer, toolbarContainerElement,
            toolbarElement, toolbarPositionToggleElement);
      } else {
        ExpandedModalPreviewModeToggleExitTransitionService.start(
          transitionTypeToFunctionality[this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.exit.type],
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.exit.duration, setOptionToDefaultCallback,
          this.$refs.componentPreviewContainer, this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.backdrop,
          this.$refs.baseComponent.$refs.componentPreview, this.$refs.baseComponent.$refs.componentPreviewOverlay, toolbarContainerElement,
            toolbarElement, toolbarPositionToggleElement);
      }
    },
    // MODAL MODE - need event type
    toggleFullModalPreviewMode(event: any): void {
      const [isToggledOn, isExpandedModalPreviewModeActive, toggleFullModalPreviewModeOptionsCallback,
        toolbarContainerElement, toggleFullModalPreviewModeToolbarCallback] = event;
      if (isToggledOn) {
        ToggleFullModalPreviewMode.toggleOn(this, this.$refs.baseComponent.$refs.componentPreview,
          this.$refs.temporaryComponent, toolbarContainerElement, isExpandedModalPreviewModeActive,
          toggleFullModalPreviewModeOptionsCallback, toggleFullModalPreviewModeToolbarCallback);
      } else {
        ToggleFullModalPreviewMode.toggleOff(this, this.$refs.baseComponent.$refs.componentPreview,
          this.$refs.temporaryComponent, toolbarContainerElement, isExpandedModalPreviewModeActive,
          toggleFullModalPreviewModeOptionsCallback, toggleFullModalPreviewModeToolbarCallback);
      }
    },
    playTransitionPreview(playTransitionPreviewEvent: PlayTransitionPreviewEvent): void {
      const [transitionAnimation, isEntranceAnimation] = playTransitionPreviewEvent;
      if (isEntranceAnimation) {
        PreviewEntranceTransition.start(
          transitionTypeToFunctionality[transitionAnimation] as ModalEntranceTransition,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration, this.$refs.baseComponent.$refs.componentPreview);
      } else {
        PreviewExitTransition.start(
          transitionTypeToFunctionality[transitionAnimation] as ModalExitTransition,
          this.component.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.transitions.exit.duration, this.$refs.baseComponent.$refs.componentPreview);
      }
    },
    stopTransitionPreview(): void {
      TransitionUtils.cancelModalTransitionPreview(this.$refs.baseComponent.$refs.componentPreview);
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
