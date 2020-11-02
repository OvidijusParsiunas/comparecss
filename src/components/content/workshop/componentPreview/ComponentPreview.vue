<template>
  <div style="position: relative" @mouseleave="componentPreviewMouseLeave(componentProperties.customCss)">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
        <div class="grid-container">
          <div class="grid-item"></div>
          <div class="grid-item">
              <!-- https://v3.vuejs.org/guide/transitions-enterleave.html#css-transitions -->
              <transition name="top-slide-fade">
                <div id="margin-assistance-top" v-if="componentPreviewAssistance.margin" class="margin-marker"></div>
              </transition>
          </div>
          <div class="grid-item"></div>  
          <div class="grid-item">
              <transition name="left-slide-fade">
                <div id="margin-assistance-left" v-if="componentPreviewAssistance.margin" class="margin-marker"></div>
              </transition>
          </div>
          <div :style="componentPreviewAssistance.margin ? { 'background-color': '#f9f9f9' } : { 'background-color': '' }" class="grid-item">
            <button id="demoComponent"
              @mouseover="componentMouseOver(componentProperties)"
              @mouseleave="componentMouseLeave(componentProperties.customCss)"
              @mousedown="componentMouseDown(componentProperties)"
              @mouseup="componentMouseUp(componentProperties.customCss)"
              :class="componentProperties.componentClass"
              :style="componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.CLICK
                ? [componentProperties.customCss[BUTTON_COMPONENT_MODES.DEFAULT], componentProperties.customCss[BUTTON_COMPONENT_MODES.HOVER], componentProperties.customCss[BUTTON_COMPONENT_MODES.CLICK]]
                : [componentProperties.customCss[BUTTON_COMPONENT_MODES.DEFAULT], componentProperties.customCss[componentProperties.customCssActiveMode]]"
              v-html="componentProperties.innerHtml">
            </button>
          </div>
          <div class="grid-item">
            <transition name="right-slide-fade">
              <div id="margin-assistance-right" v-if="componentPreviewAssistance.margin" class="margin-marker"></div>
            </transition>
          </div>
          <div class="grid-item"></div>
          <div class="grid-item">
            <transition name="bottom-slide-fade">
              <div id="margin-assistance-bottom" v-if="componentPreviewAssistance.margin" class="margin-marker"></div>
            </transition>
          </div>
          <div class="grid-item"></div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { ComponentProperties } from '../../../../interfaces/workshopComponent';
import { BUTTON_COMPONENT_MODES } from '../../../../consts/buttonComponentModes.enum';
interface Data {
  overwrittenDefaultPropertiesByHover: unknown,
  overwrittenDefaultPropertiesByClick: unknown,
  BUTTON_COMPONENT_MODES,
}
export default {
  data: (): Data => ({
    overwrittenDefaultPropertiesByHover: {},
    overwrittenDefaultPropertiesByClick: {},
    BUTTON_COMPONENT_MODES,
  }),
  methods: {
    // important to note that default can have properties that hover and click modes do not, but hover and click cannot have properties that default doesn't
    componentMouseOver(componentProperties: ComponentProperties): void {
      const { customCss, transition } = componentProperties;
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        this.overwrittenDefaultPropertiesByHover = { ...customCss[BUTTON_COMPONENT_MODES.DEFAULT], transition };
        customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...customCss[BUTTON_COMPONENT_MODES.DEFAULT], ...customCss[BUTTON_COMPONENT_MODES.HOVER], transition };
      }
    },
    componentMouseLeave(customCss: WorkshopComponentCss): void {
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByHover };
      }
    },
    componentMouseDown(componentProperties: ComponentProperties): void {
      const { customCss, transition } = componentProperties;
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        this.overwrittenDefaultPropertiesByClick = { ...customCss[BUTTON_COMPONENT_MODES.DEFAULT], transition };
        customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...customCss[BUTTON_COMPONENT_MODES.DEFAULT], ...customCss[BUTTON_COMPONENT_MODES.CLICK], transition };
      }
    },
    componentMouseUp(customCss: WorkshopComponentCss): void {
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByClick };
      }
    },
    componentPreviewMouseLeave(customCss: WorkshopComponentCss): void {
      customCss[BUTTON_COMPONENT_MODES.DEFAULT].transition = 'unset';
    }
  },
  props: {
    componentProperties: Object,
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
        width: componentProperties.customCss[componentProperties.customCssActiveMode].width,
        marginLeft: componentProperties.customCss[componentProperties.customCssActiveMode].marginLeft,
        marginRight: componentProperties.customCss[componentProperties.customCssActiveMode].marginRight,
      }"></div>
  </div>
  <div class="grid-item"></div>  
  <div class="grid-item">
    <div style="width: 10px; background-color: green; float: right"
      :style="{
        height: componentProperties.customCss[componentProperties.customCssActiveMode].height,
        marginTop: componentProperties.customCss[componentProperties.customCssActiveMode].marginTop,
        marginBottom: componentProperties.customCss[componentProperties.customCssActiveMode].marginBottom,
      }"></div>
  </div>
  <div class="grid-item">
    <button
      @mouseover="componentMouseOver(componentProperties.customCss)"
      @mouseleave="componentMouseLeave(componentProperties.customCss)"
      @mousedown="componentMouseDown(componentProperties.customCss)"
      @mouseup="componentMouseUp(componentProperties.customCss)"
      :class="componentProperties.componentClass"
      :style="componentProperties.customCss[componentProperties.customCssActiveMode]"
      v-html="componentProperties.innerHtml">
    </button>
  </div>
  <div class="grid-item">
    <div style="width: 10px; background-color: green"
      :style="{
        height: componentProperties.customCss[componentProperties.customCssActiveMode].height,
        marginTop: componentProperties.customCss[componentProperties.customCssActiveMode].marginTop,
        marginBottom: componentProperties.customCss[componentProperties.customCssActiveMode].marginBottom,
      }"></div>
  </div>  
  <div class="grid-item"></div>
  <div class="grid-item">
    <div style="width: 100%; height: 10px; background-color: green"
      :style="{
          width: componentProperties.customCss[componentProperties.customCssActiveMode].width,
          marginLeft: componentProperties.customCss[componentProperties.customCssActiveMode].marginLeft,
          marginRight: componentProperties.customCss[componentProperties.customCssActiveMode].marginRight,
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
    background-color: #2196F3;
  }
  
  .grid-item {
    position: relative;
  }

  .margin-marker {
    background-color: rgb(194 194 194 / 50%) !important;
  }

  #demoComponent {
    overflow: hidden;
    position: relative;
  }

  .ripple {
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    position: absolute;
    border-radius: 50%;
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
