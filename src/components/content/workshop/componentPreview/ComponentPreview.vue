<template>
  <div v-if="component" style="position: relative" @mouseleave="componentPreviewMouseLeave()">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="component.subcomponents[component.subcomponentsActiveMode].frameworkClass">
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
            <component :is="component.subcomponents[component.subcomponentsActiveMode].componentTag" id="demoComponent"
              class="grid-item-position" :class="[ ...component.subcomponents[SUB_COMPONENTS.BASE].jsClasses ]"
              @mouseenter="componentMouseEnter()"
              @mouseleave="componentMouseLeave()"
              @mousedown="componentMouseDown()"
              @mouseup="componentMouseUp()"
              :style="component.subcomponents[SUB_COMPONENTS.BASE].customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
                ? [
                    [ component.subcomponents[SUB_COMPONENTS.BASE].inheritedCss ? component.subcomponents[SUB_COMPONENTS.BASE].inheritedCss.css: '' ],
                    component.subcomponents[SUB_COMPONENTS.BASE].customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                    component.subcomponents[SUB_COMPONENTS.BASE].customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                    component.subcomponents[SUB_COMPONENTS.BASE].customCss[SUB_COMPONENT_CSS_MODES.CLICK],
                  ]
                : [
                    [ component.subcomponents[SUB_COMPONENTS.BASE].inheritedCss ? component.subcomponents[SUB_COMPONENTS.BASE].inheritedCss.css: '' ],
                    component.subcomponents[SUB_COMPONENTS.BASE].customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                    component.subcomponents[SUB_COMPONENTS.BASE].customCss[component.subcomponents[SUB_COMPONENTS.BASE].customCssActiveMode],
                  ]">
              {{ component.type === NEW_COMPONENT_TYPES.BUTTON ? component.subcomponents[SUB_COMPONENTS.BASE].innerHtmlText : '' }}
              <divInnerHtml :componentType="component.type" :innerHTML="component.subcomponents[component.subcomponentsActiveMode].innerHtmlText"/>
              <auxiliary-right-side-elements :componentType="component.type" :subcomponent="component.subcomponents[SUB_COMPONENTS.CLOSE]"/>
            </component>
            <component :is="component.subcomponents[component.subcomponentsActiveMode].componentTag"
              :id="SUB_COMPONENT_PREVIEW_ELEMENT_IDS.BASE"
              style="display: none" :style="component.subcomponents[SUB_COMPONENTS.BASE].customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
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
  </div>
</template>

<script lang="ts">
import useComponentPreviewEventHandlers, { UseComponentPreviewEventHandlers } from './compositionAPI/useComponentPreviewEventHandlers';
import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '../../../../consts/subcomponentPreviewElementIds.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import auxiliaryRightSideElements from './AuxiliaryRightSideElements.vue';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import divInnerHtml from './divInnerHTML.vue';
import { Ref, ref, watch } from 'vue';

interface Data {
  SUB_COMPONENT_CSS_MODES;
  NEW_COMPONENT_TYPES;
  SUB_COMPONENTS;
  SUB_COMPONENT_PREVIEW_ELEMENT_IDS;
}

interface Props {
  component?: WorkshopComponent;
}

export default {
  data: (): Data => ({
    SUB_COMPONENT_PREVIEW_ELEMENT_IDS,
    SUB_COMPONENT_CSS_MODES,
    NEW_COMPONENT_TYPES,
    SUB_COMPONENTS,
  }),
  setup(props: { component: WorkshopComponent }): UseComponentPreviewEventHandlers {
    const componentRef: Ref<Props['component']> = ref(props.component);
    watch(() => props.component, (newComponent: Props['component']) => {
      componentRef.value = newComponent;
    });
    return useComponentPreviewEventHandlers(componentRef, new Set([SUB_COMPONENTS.CLOSE]));
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

// the border is the same size as the component
/*
<div class="grid-container">
  <div class="grid-item"></div>
  <div class="grid-item">
    <div style="height: 10px; background-color: green; position: absolute; bottom: 0"
      :style="{
        width: subcomponents.customCss[subcomponents.customCssActiveMode].width,
        marginLeft: subcomponents.customCss[subcomponents.customCssActiveMode].marginLeft,
        marginRight: subcomponents.customCss[subcomponents.customCssActiveMode].marginRight,
      }"></div>
  </div>
  <div class="grid-item"></div>  
  <div class="grid-item">
    <div style="width: 10px; background-color: green; float: right"
      :style="{
        height: subcomponents.customCss[subcomponents.customCssActiveMode].height,
        marginTop: subcomponents.customCss[subcomponents.customCssActiveMode].marginTop,
        marginBottom: subcomponents.customCss[subcomponents.customCssActiveMode].marginBottom,
      }"></div>
  </div>
  <div class="grid-item">
    <button
      @mouseover="componentMouseOver(subcomponents.customCss)"
      @mouseleave="componentMouseLeave(subcomponents.customCss)"
      @mousedown="componentMouseDown(subcomponents.customCss)"
      @mouseup="componentMouseUp(subcomponents.customCss)"
      :style="subcomponents.customCss[subcomponents.customCssActiveMode]"
      v-html="subcomponents.innerHtml">
    </button>
  </div>
  <div class="grid-item">
    <div style="width: 10px; background-color: green"
      :style="{
        height: subcomponents.customCss[subcomponents.customCssActiveMode].height,
        marginTop: subcomponents.customCss[subcomponents.customCssActiveMode].marginTop,
        marginBottom: subcomponents.customCss[subcomponents.customCssActiveMode].marginBottom,
      }"></div>
  </div>  
  <div class="grid-item"></div>
  <div class="grid-item">
    <div style="width: 100%; height: 10px; background-color: green"
      :style="{
          width: subcomponents.customCss[subcomponents.customCssActiveMode].width,
          marginLeft: subcomponents.customCss[subcomponents.customCssActiveMode].marginLeft,
          marginRight: subcomponents.customCss[subcomponents.customCssActiveMode].marginRight,
        }"></div>
  </div>
  <div class="grid-item"></div>  
</div>
*/
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
