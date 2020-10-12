<template>
  <div id="content">
    <Components :markup="markup"/>
  </div>
</template>

  <!-- if the order is going to become important,
  consider having a for loop which would traverse an array -->
  <!-- <panel-slot v-for="item in data" :key="item.class" v-bind:class="item.class">
    <div v-html="item.component"></div>
  </panel-slot> -->

<script lang="ts">
interface Data {
  markup: ContentMarkup,
}
interface Props {
  activeButton: BUTTON_NAMES,
}

import Components from './Components.vue';
import { BUTTON_NAMES } from '@/consts/buttonNames.enum';
import cssFrameworksJSFunctionality from '../../services/cssFrameworksJSFunctionality';
import markupManager from '../../services/markupManager';
import { ContentMarkup } from '@/interfaces/contentMarkupInterface';
import { onUpdated, nextTick } from 'vue'

export default {
  // https://v3.vuejs.org/guide/composition-api-setup.html#context
  // cannot access 'this' in setup
  setup(props: Props): void {
    onUpdated(() => {
      nextTick(() => {
        const triggerCssFrameworksJs = cssFrameworksJSFunctionality.getTriggers(props.activeButton);
        if (triggerCssFrameworksJs) { triggerCssFrameworksJs(); }
      })
    })
  },
  components: {
    Components,
  },
  props: {
    activeButton: null,
  },
  data: (): Data => ({
    markup:  {
      bootstrap: '<button type="button" class="btn btn-primary">Primary</button>',
      materialize: '<button type="button" class="btn btn-primary">Primary</button>',
      uikit: '<button class="uk-button uk-button-default">Primary</button>',
      foundation: '<a class="button">Primary</a>',
      bulma: '<button class="button">Button</button>',
    }
  }),
  watch: {
    activeButton(clickedButtonName: BUTTON_NAMES): void {
      this.markup = markupManager.getContentMarkup(clickedButtonName);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
  #content {
    width: 100%;
    overflow: hidden;
  }
</style>
