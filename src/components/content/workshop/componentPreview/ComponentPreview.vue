<template>
  <div v-if="component" style="position: relative" @mouseleave="componentPreviewMouseLeave()">
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
          <component :is="component.componentPreviewStructure.baseCss.componentTag" id="demoComponent"
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
              <div v-for="layer in component.componentPreviewStructure.layers" :key="layer" :style="layer.css">
                <div-inner-html v-if="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]" :innerHTML="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]"/>
                <auxiliary-right-side-elements v-if="layer.subcomponents[SUB_COMPONENTS.CLOSE] !== undefined" :subcomponent="layer.subcomponents[SUB_COMPONENTS.CLOSE]"/>
              </div>
          </component>
          <component :is="component.componentPreviewStructure.baseCss.componentTag"
            :id="SUB_COMPONENT_PREVIEW_ELEMENT_IDS.BASE"
            style="display: none" :style="component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
            class="subcomponent-preview">
          </component>
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
import useComponentPreviewEventHandlers, { UseComponentPreviewEventHandlers } from './compositionAPI/useComponentPreviewEventHandlers';
import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '../../../../consts/subcomponentPreviewElementIds.enum';
import { ComponentPreviewAssistance } from '../../../../interfaces/componentPreviewAssistance';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import auxiliaryRightSideElements from './AuxiliaryRightSideElements.vue';
import divInnerHtml from './divInnerHTML.vue';
import { Ref, ref, watch } from 'vue';

interface Consts {
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
  SUB_COMPONENTS;
  SUB_COMPONENT_PREVIEW_ELEMENT_IDS;
  PSEUDO_COMPONENTS;
}

interface Props {
  component: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance,
}

export default {
  setup(props: Props): UseComponentPreviewEventHandlers & Consts {
    const componentRef: Ref<Props['component']> = ref(props.component);
    watch(() => props.component, (newComponent: Props['component']) => {
      componentRef.value = newComponent;
    });
    return {
      ...useComponentPreviewEventHandlers(componentRef, new Set([SUB_COMPONENTS.CLOSE])),
      SUB_COMPONENT_PREVIEW_ELEMENT_IDS,
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
  },
  components: {
    auxiliaryRightSideElements,
    divInnerHtml,
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
};
</script>

<style lang="css" scoped>
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
  .subcomponent-preview {
    background-color: rgb(40 255 20 / 43%) !important;
    position: absolute !important;
    top: 0px !important;
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
