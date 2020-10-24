<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: -1; text-align: center;"> 
      <div :class="componentProperties.frameworkClass">
          <a @mouseover="componentMouseOver(componentProperties.customCss)" :class="componentProperties.componentClass" :style="componentProperties.customCss" v-html="componentProperties.innerHtml"></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';

export default {
  props: {
    componentProperties: Object,
  },
  methods: {
    componentMouseOver(customCss: WorkshopComponentCss): void {
      // the following is used to reset the transition animation property if it was unset by the settings
      if (customCss.transition === 'unset') {
        customCss.transition = '';
      }
    }
  }
};
</script>

<style css="scoped">
  .foundation .button {
    margin: unset !important;
  }
</style>