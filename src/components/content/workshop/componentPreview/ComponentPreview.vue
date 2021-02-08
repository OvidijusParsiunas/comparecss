<template>
  <div v-if="component" ref="componentPreviewContainer" class="component-preview-container-default"
    @mouseleave="componentPreviewMouseLeave()">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
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
          <component ref="componentPreview" :is="component.componentPreviewStructure.baseCss.componentTag" id="demoComponent"
            class="grid-item-position" :class="[ ...component.componentPreviewStructure.baseCss.jsClasses ]"
            @mouseenter="componentMouseEnter()"
            @mouseleave="componentMouseLeave()"
            @mousedown="componentMouseDown()"
            @mouseup="componentMouseUp()"
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
                <div :style="layer.css">
                  <nested-inner-html-text v-if="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]" :innerHTML="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]"/>
                  <auxiliary-right-side-elements v-if="layer.subcomponents[SUB_COMPONENTS.CLOSE] !== undefined" :subcomponent="layer.subcomponents[SUB_COMPONENTS.CLOSE]"/>
                </div>
                <div v-if="layer.subcomponentPreviewId" :id="layer.subcomponentPreviewId" style="display: none" :style="[layer.css, { zIndex: layer.previewZIndex }]" class="subcomponent-preview-default"></div>
              </div>
              <!-- shallow subcomponents -->
              {{ component.componentPreviewStructure.shallowSubcomponents ? component.componentPreviewStructure.shallowSubcomponents[PSEUDO_COMPONENTS.TEXT] : ''}}
              <auxiliary-right-side-elements v-if="component.componentPreviewStructure.shallowSubcomponents && component.componentPreviewStructure.shallowSubcomponents[SUB_COMPONENTS.CLOSE]"
                :subcomponent="component.componentPreviewStructure.shallowSubcomponents[SUB_COMPONENTS.CLOSE]"/>
          </component>
          <component :is="component.componentPreviewStructure.baseCss.componentTag"
            :id="BASE_PREVIEW_ELEMENT_ID"
            style="display: none" :style="[component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], { zIndex: BASE_PREVIEW_Z_INDEX }]"
            class="subcomponent-preview-default subcomponent-preview-with-no-border-property-but-with-height">
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
import useSubcomponentPreviewEventHandlers, { UseSubcomponentPreviewEventHandlers } from './compositionAPI/useSubcomponentPreviewEventHandlers';
import ModeToggleTransitions from '../../../../services/workshop/expandedModalPreviewMode/transitions/modeToggleTransitions';
import SlideTransitions from '../../../../services/workshop/expandedModalPreviewMode/transitions/slideTransitions';
import FadeTransitions from '../../../../services/workshop/expandedModalPreviewMode/transitions/fadeTransitions';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { subcomponentTypeToPreviewId } from '../toolbar/options/componentOptions/subcomponentTypeToPreviewId';
import { subcomponentPreviewZIndexes } from '../toolbar/options/componentOptions/subcomponentPreviewZIndexes';
import { ComponentPreviewAssistance } from '../../../../interfaces/componentPreviewAssistance';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import auxiliaryRightSideElements from './AuxiliaryRightSideElements.vue';
import nestedInnerHtmlText from './nestedInnerHTMLText.vue';
import { Ref, ref, watch } from 'vue';

interface Consts {
  BASE_PREVIEW_Z_INDEX: number;
  BASE_PREVIEW_ELEMENT_ID: string;
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
  SUB_COMPONENTS;
  PSEUDO_COMPONENTS;
}

interface Props {
  component: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance,
}

export default {
  setup(props: Props): UseSubcomponentPreviewEventHandlers & Consts {
    const componentRef: Ref<Props['component']> = ref(props.component);
    watch(() => props.component, (newComponent: Props['component']) => {
      componentRef.value = newComponent;
    });
    return {
      ...useSubcomponentPreviewEventHandlers(componentRef),
      BASE_PREVIEW_Z_INDEX: subcomponentPreviewZIndexes[SUB_COMPONENTS.BASE],
      BASE_PREVIEW_ELEMENT_ID: subcomponentTypeToPreviewId[SUB_COMPONENTS.BASE],
      SUB_COMPONENT_CSS_MODES,
      NEW_COMPONENT_TYPES,
      PSEUDO_COMPONENTS,
      SUB_COMPONENTS,
    };
  },
  methods: {
    componentPreviewMouseLeave(): void {
      Object.keys(this.component.subcomponents).forEach((key) => {
        const subcomponent = this.component.subcomponents[key];
        if (subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].transition) {
          subcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].transition = 'unset';
        }
      });
    },
    // UX - SUBCOMPONENT SELECT - set this to appropriate dimensions when the event is fired
    toggleSubcomponentSelectMode(): void {
      // this.$refs.selectSubcomponentOverlay1.style.display = 'block';
    },
    expandModalComponent(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      const [isExpandedModalPreviewModeActive, toolbarContainerElement, toolbarElement] = toggleExpandedModalPreviewModeEvent;
      const fadeTransitions = new FadeTransitions();
      if (isExpandedModalPreviewModeActive) {
        // strategies
        // https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/
        ModeToggleTransitions.initiate(
          this.$refs.componentPreviewContainer, this.$refs.componentPreview,
          toolbarContainerElement, toolbarElement, fadeTransitions);
      } else {
        ModeToggleTransitions.exit(
          this.$refs.componentPreviewContainer, this.$refs.componentPreview,
          toolbarContainerElement, toolbarElement, fadeTransitions);
      }
    }
  },
  components: {
    auxiliaryRightSideElements,
    nestedInnerHtmlText,
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
};
</script>

<style lang="css" scoped>
  .component-preview-container-default {
    position: relative;
    height: 50%;
  }
  .component-preview-container-modal {
    position: relative;
    background-color: rgb(109 109 109 / 80%);
    height: 106%;
    top: -2.6%;
    left: -30vw;
    width: 100vw;
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
  #demoComponent {
    overflow: hidden;
  }
  .grid-item-position {
    position: relative;
  }
  .subcomponent-preview-default {
    background-color: rgb(64 197 255 / 43%) !important;
    /* the following color is partially transparent and uses the background color to set its own color */
    border-color: rgb(64 197 255 / 0%) !important;
    position: absolute !important;
    top: 0px !important;
    width: 100%;
    cursor: pointer;
  }
  .subcomponent-preview-remove {
    background-color: rgb(255 29 29 / 43%) !important;
  }
  .subcomponent-preview-add {
    background-color: rgb(8 235 31 / 43%) !important;
  }
  .subcomponent-preview-select-in-progress {
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
    position: absolute !important;
    top: 0px !important;
    width: 100%;
    cursor: pointer;
  }
  .subcomponent-preview-with-no-border-property-but-with-height {
    border-color: rgb(64 197 255 / 0%) !important;
    border-top-width: 0px !important;
    border-bottom-width: 0px !important;
    height: 100%;
  }
  .parent-layer {
    position: relative;
    height: 100%;
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
