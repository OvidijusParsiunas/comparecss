<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 0; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
        <a
          @mouseover="componentMouseOver(componentProperties.customCss)"
          @mouseleave="componentMouseLeave(componentProperties.customCss)"
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
  data: (): { overwrittenDefaultPropertiesByHover: unknown } => ({
    overwrittenDefaultPropertiesByHover: {},
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
        })
      }
    },
    componentMouseLeave(customCss: WorkshopComponentCss): void {
      customCss[BUTTON_COMPONENT_MODES.DEFAULT] = { ...this.overwrittenDefaultPropertiesByHover };
    }
  },
  props: {
    componentProperties: Object,
  },
};
</script>

<style css="scoped">
  .foundation .button {
    margin: unset !important;
  }
</style>