<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
        <div class="grid-container">
          <div class="grid-item"></div>
          <div class="grid-item">
            <div style="width: 100%; height: 10px; bottom: 0; position: absolute" class="margin-marker"></div>
          </div>
          <div class="grid-item"></div>  
          <div class="grid-item">
            <div style="width: 10px; height: 100%; float: right" class="margin-marker"></div>
          </div>
          <div class="grid-item">
            <button id="demoComponent"
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
            <div style="width: 10px; height: 100%" class="margin-marker"></div>
          </div>  
          <div class="grid-item"></div>
          <div class="grid-item">
            <div style="width: 100%; height: 10px" class="margin-marker"></div>
          </div>
          <div class="grid-item"></div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';
import { BUTTON_COMPONENT_MODES } from '../../../../consts/buttonComponentModes.enum';

export default {
  data: (): { overwrittenDefaultPropertiesByHover: unknown, overwrittenDefaultPropertiesByClick: unknown } => ({
    overwrittenDefaultPropertiesByHover: {},
    overwrittenDefaultPropertiesByClick: {},
  }),
  methods: {
    componentMouseOver(customCss: WorkshopComponentCss): void {
      // the following is used to reset the transition animation property if it was unset by the settings
      if (customCss[this.componentProperties.customCssActiveMode].transition === 'unset') {
        customCss[this.componentProperties.customCssActiveMode].transition = '';
      }
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        // reason can't use a spread is because there are some properties that hover has and default does not
        // this.overwrittenDefaultPropertiesByHover = { ...customCss[BUTTON_COMPONENT_MODES.DEFAULT] };
        Object.keys(customCss[BUTTON_COMPONENT_MODES.HOVER]).forEach((key) => {
          this.overwrittenDefaultPropertiesByHover[key] = customCss[BUTTON_COMPONENT_MODES.DEFAULT][key];
          customCss[BUTTON_COMPONENT_MODES.DEFAULT][key] = customCss[BUTTON_COMPONENT_MODES.HOVER][key];
        });
      }
    },
    componentMouseLeave(customCss: WorkshopComponentCss): void {
      customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByHover };
    },
    componentMouseDown(customCss: WorkshopComponentCss): void {
      if (this.componentProperties.customCssActiveMode === BUTTON_COMPONENT_MODES.DEFAULT) {
        Object.keys(customCss[BUTTON_COMPONENT_MODES.CLICK]).forEach((key) => {
          this.overwrittenDefaultPropertiesByClick[key] = customCss[BUTTON_COMPONENT_MODES.DEFAULT][key];
          customCss[BUTTON_COMPONENT_MODES.DEFAULT][key] = customCss[BUTTON_COMPONENT_MODES.CLICK][key];
        });
      }
    },
    componentMouseUp(customCss: WorkshopComponentCss): void {
      customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByClick };
    }
  },
  props: {
    componentProperties: Object,
    executeJavaScript: Function,
  },
  watch: {
    executeJavaScript(): void {
      this.executeJavaScript();
    }
  }
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
    background-color: green !important;
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