<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
        <a id="findOut"
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
    transform: scale(0);
}

  span.fadeOut {
      animation: hideMe 2s forwards;
  }

  @keyframes hideMe {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  span.ripple {
    animation: ripple 600ms forwards;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
    }
  }
  
  /* span.ripple {
    position: absolute;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: hideMe 2s forwards;
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }
  @keyframes hideMe {
  to {
      opacity: 0;
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  } */

  /* span {
    position: absolute;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }
  span.fading {
    animation: fading 100ms linear;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
    }
  }
  @keyframes fading {
     0%   { opacity: 1; }
      100% { opacity: 0; }
  } */
</style>