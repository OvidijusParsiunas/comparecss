<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
        <a id="previewComponent"
          @mouseover="componentMouseOver(componentProperties.customCss)"
          @mouseleave="componentMouseLeave(componentProperties.customCss)"
          @mousedown="componentMouseDown(componentProperties.customCss)"
          @mouseup="componentMouseUp(componentProperties.customCss)"
          :class="componentProperties.componentClass"
          :style="componentProperties.customCss[componentProperties.customCssActiveMode]"
          v-html="componentProperties.innerHtml">
        </a>
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
</script>

<style lang="css">
  .foundation .button {
    margin: unset !important;
  }
  #findOut {
  position: relative;
  overflow: hidden;
  }
  span {
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