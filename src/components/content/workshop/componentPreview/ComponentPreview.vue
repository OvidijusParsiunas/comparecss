<template>
  <div v-if="component" ref="componentPreviewContainer"
    class="component-preview-container-default"
    :style="{backgroundColor: component.subcomponents[SUB_COMPONENTS.BASE].customFeatures
      && component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.backdrop
      && component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.backdrop.visible
      ? component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.backdrop.color : 'unset'}"
    @mouseenter="componentPreviewMouseEnter()"
    @mouseleave="componentPreviewMouseLeave()">
    <div style="margin: 0; position: absolute; z-index: 0; text-align: center;"
      :class="[
        (component.subcomponents[SUB_COMPONENTS.BASE].customFeatures
          && component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.componentCenteringInParent
          && ((component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.componentCenteringInParent.vertical
              && !component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.componentCenteringInParent.horizontal
                ? 'component-preview-centered-vertically' : false)
              || (component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.componentCenteringInParent.horizontal 
                && !component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.componentCenteringInParent.vertical
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
          <component ref="componentPreview" :is="component.componentPreviewStructure.baseCss.componentTag"
            :id="subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].subcomponentId"
            class="base-component grid-item-position"
            :class="[ SUBCOMPONENT_CURSOR_AUTO_CLASS,
              ...((component.componentPreviewStructure.baseCss.customFeatures && component.componentPreviewStructure.baseCss.customFeatures.jsClasses) || []),
              STATIC_POSITION_CLASS ]"
            @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseEnter()"
            @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseLeave()"
            @mousedown="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseDown()"
            @mouseup="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseUp()"
            :style="component.componentPreviewStructure.baseCss.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
              ? [
                  [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
                  component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                  component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                  component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
                ]
              : [
                  [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
                  component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                  component.componentPreviewStructure.baseCss.customCss[component.componentPreviewStructure.baseCss.customCssActiveMode],
                ]">
              <div v-for="layer in component.componentPreviewStructure.layers" :key="layer" class="parent-layer">
                <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId"
                  :style="[layer.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], { pointerEvents: component.componentPreviewStructure.shallowSubcomponents ? 'none': 'auto' }]"
                  @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseEnter()"
                  @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseLeave()"
                  @mousedown="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseDown()"
                  @mouseup="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseUp()">
                  <nested-inner-html-text v-if="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]" :innerHTML="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]"/>
                  <auxiliary-right-side-elements
                    v-if="layer.subcomponents[SUB_COMPONENTS.CLOSE] !== undefined"
                    :subcomponent="layer.subcomponents[SUB_COMPONENTS.CLOSE]"
                    :elementIds="subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE]"
                    :mouseEvents="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE].subcomponentId]"/>
                  <right-side-elements
                    v-if="layer.nestedSubcomponents"
                    :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
                    :nestedSubcomponents="layer.nestedSubcomponents"
                    :mouseEvents="mouseEvents"/>
                </div>
                <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].overlayId"
                  style="display: none" :style="layer.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
                  :class="OVERLAY_DEFAULT_CLASS"></div>
              </div>
              <!-- shallow subcomponents -->
              {{ component.componentPreviewStructure.shallowSubcomponents ? component.componentPreviewStructure.shallowSubcomponents[PSEUDO_COMPONENTS.TEXT] : ''}}
              <auxiliary-right-side-elements v-if="component.componentPreviewStructure.shallowSubcomponents && component.componentPreviewStructure.shallowSubcomponents[SUB_COMPONENTS.CLOSE]"
                :subcomponent="component.componentPreviewStructure.shallowSubcomponents[SUB_COMPONENTS.CLOSE]"
                :elementIds="subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE]"
                :mouseEvents="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE].subcomponentId]"/>
          </component>
          <component ref="componentPreviewOverlay" :is="component.componentPreviewStructure.baseCss.componentTag"
            :id="subcomponentAndOverlayElementIds[SUB_COMPONENTS.BASE].overlayId"
            style="display: none" :style="[component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], { height: '100% !important' }]"
            class="subcomponent-overlay-with-no-border-property-but-with-height"
            :class="[OVERLAY_DEFAULT_CLASS, STATIC_POSITION_CLASS]">
          </component>
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
import ExpandedModalPreviewModeToggleEntranceTransitionService from '../../../../services/workshop/expandedModalPreviewMode/services/modeToggleTransitionServices/entrance';
import ExpandedModalPreviewModeToggleExitTransitionService from '../../../../services/workshop/expandedModalPreviewMode/services/modeToggleTransitionServices/exit';
import EntranceTransitionPreviewService from '../../../../services/workshop/expandedModalPreviewMode/services/transitionPreviewServices/entrance';
import { transitionTypeToFunctionality } from '../../../../services/workshop/expandedModalPreviewMode/transitions/transitionTypeToFunctionality';
import ExitTransitionPreviewService from '../../../../services/workshop/expandedModalPreviewMode/services/transitionPreviewServices/exit';
import { subcomponentAndOverlayElementIdsState } from '../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { SubcomponentAndOverlayElementIds } from '../../../../interfaces/subcomponentAndOverlayElementIds';
import TransitionUtils from '../../../../services/workshop/expandedModalPreviewMode/utils/transitionUtils';
import { SubcomponentPreviewMouseEvents } from '../../../../interfaces/subcomponentPreviewMouseEvents';
import { ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { PlayTransitionPreviewEvent } from '../../../../interfaces/playTransitionPreviewEvent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import auxiliaryRightSideElements from './AuxiliaryRightSideElements.vue';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import ComponentPreviewUtils from './utils/componentPreviewUtils';
import nestedInnerHtmlText from './nestedInnerHTMLText.vue';
import rightSideElements from './RightSideElements.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  SUB_COMPONENT_CSS_MODES;
  PSEUDO_COMPONENTS;
  SUB_COMPONENTS;
}

interface Data {
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
  mouseEvents: SubcomponentPreviewMouseEvents;
  changeMouseEventsToDefaultOnComponentPreviewMouseEnter: boolean;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      SUB_COMPONENT_CSS_MODES,
      PSEUDO_COMPONENTS,
      SUB_COMPONENTS,
    };
  },
  data: (): Data => ({
    subcomponentAndOverlayElementIds: null,
    mouseEvents: {},
    changeMouseEventsToDefaultOnComponentPreviewMouseEnter: false,
  }),
  methods: {
    componentPreviewMouseLeave(): void {
      Object.keys(this.component.subcomponents).forEach((key) => {
        const subcomponent = this.component.subcomponents[key];
        if (subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].transition) {
          subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].transition = 'unset';
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
    expandModalComponent(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      const [isExpandedModalPreviewModeActive, setOptionToDefaultCallback, toolbarPositionToggleElement,
        toolbarContainerElement, toolbarElement] = toggleExpandedModalPreviewModeEvent;
      if (isExpandedModalPreviewModeActive) {
        // strategies
        // https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
        ExpandedModalPreviewModeToggleEntranceTransitionService.start(
          transitionTypeToFunctionality[this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.entrance.type],
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.entrance.duration,
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.entrance.delay,
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.backdrop, this.$refs.componentPreview,
          this.$refs.componentPreviewOverlay, this.$refs.componentPreviewContainer, toolbarContainerElement,
          toolbarElement, toolbarPositionToggleElement);
      } else {
        ExpandedModalPreviewModeToggleExitTransitionService.start(
          transitionTypeToFunctionality[this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.exit.type],
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.exit.duration, setOptionToDefaultCallback,
          this.$refs.componentPreviewContainer, this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.backdrop,
          this.$refs.componentPreview, this.$refs.componentPreviewOverlay, toolbarContainerElement, toolbarElement,
          toolbarPositionToggleElement);
      }
    },
    playTransitionPreview(playTransitionPreviewEvent: PlayTransitionPreviewEvent): void {
      const [transitionAnimation, isEntranceAnimation] = playTransitionPreviewEvent;
      if (isEntranceAnimation) {
        EntranceTransitionPreviewService.start(
          transitionTypeToFunctionality[transitionAnimation] as ModalEntranceTransition,
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.entrance.duration, this.$refs.componentPreview);
      } else {
        ExitTransitionPreviewService.start(
          transitionTypeToFunctionality[transitionAnimation] as ModalExitTransition,
          this.component.subcomponents[SUB_COMPONENTS.BASE].customFeatures.transitions.exit.duration, this.$refs.componentPreview);
      }
    },
    stopTransitionPreview(): void {
      TransitionUtils.cancelModalTransitionPreview(this.$refs.componentPreview);
    }
  },
  components: {
    auxiliaryRightSideElements,
    nestedInnerHtmlText,
    rightSideElements,
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
  watch: {
    component(): void {
      const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(this.component.subcomponents);
      this.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
      subcomponentAndOverlayElementIdsState.setSubcomponentAndOverlayElementIdsState(subcomponentAndOverlayElementIds);
      this.mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds, this.component.subcomponents);
    }
  }
};
</script>

<style lang="css" scoped>
  .static-position {
    top: 0px !important;
    left: 0px !important;
    bottom: 0px !important;
    right: 0px !important;
  }
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
  .base-component {
    overflow: hidden;
  }
  .parent-layer {
    position: relative;
    height: 100%;
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
  .subcomponent-overlay-default {
    background-color: rgb(64 197 255 / 43%) !important;
    /* the following color is partially transparent and uses the background color to set its own color */
    border-color: rgb(64 197 255 / 0%) !important;
    position: absolute !important;
    top: 0px;
    width: 100%;
    pointer-events: none;
    z-index: 1;
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
  .subcomponent-cursor-auto {
    cursor: auto;
  }
  .subcomponent-cursor-default {
    cursor: default !important;
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
