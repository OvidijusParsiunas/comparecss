<template>
  <div id="content">
    <div v-if="currentView === NAVBAR_MENU_BUTTONS.HOMEPAGE">
      <Homepage/>
    </div>
    <div v-if="currentView == NAVBAR_MENU_BUTTONS.COMPONENTS">
      <Components :markup="markup"/>
    </div>
  </div>
</template>

  <!-- if the order is going to become important,
  consider having a for loop which would traverse an array -->
  <!-- <panel-slot v-for="item in data" :key="item.class" v-bind:class="item.class">
    <div v-html="item.component"></div>
  </panel-slot> -->

<script lang="ts">
interface Data {
  currentView: NAVBAR_MENU_BUTTONS,
  markup: ContentMarkup,
  NAVBAR_MENU_BUTTONS,
}
interface Props {
  activeButton: NavbarButton,
}

import Components from './Components.vue';
import Homepage from './Homepage.vue';
import cssFrameworksJSFunctionality from '../../services/cssFrameworksJSFunctionality';
import markupManager from '../../services/markupManager';
import { ContentMarkup } from '@/interfaces/contentMarkupInterface';
import { onUpdated, nextTick } from 'vue'
import { NavbarButton } from '../../interfaces/navbarButton';
import { NAVBAR_MENU_BUTTONS } from '../../consts/navbarMenuButtons.enum';

export default {
  // https://v3.vuejs.org/guide/composition-api-setup.html#context
  // cannot access 'this' in setup
  setup(props: Props): void {
    onUpdated(() => {
      nextTick(() => {
        if (props.activeButton.navbarMenuButton === NAVBAR_MENU_BUTTONS.COMPONENTS && props.activeButton.navbarSubMenuButton) {
          const triggerCssFrameworksJs = cssFrameworksJSFunctionality.getTriggers(props.activeButton.navbarSubMenuButton);
          if (triggerCssFrameworksJs) { triggerCssFrameworksJs(); }
        }
      })
    })
  },
  components: {
    Components,
    Homepage,
  },
  props: {
    activeButton: null,
  },
  data: (): Data => ({
    currentView: NAVBAR_MENU_BUTTONS.HOMEPAGE,
    markup:  {
      bootstrap: '<button type="button" class="btn btn-primary">Primary</button>',
      materialize: '<button type="button" class="btn btn-primary">Primary</button>',
      uikit: '<button class="uk-button uk-button-default">Primary</button>',
      foundation: '<a class="button">Primary</a>',
      bulma: '<button class="button">Button</button>',
    },
    NAVBAR_MENU_BUTTONS,
  }),
  watch: {
    activeButton(activeButton: NavbarButton): void {
      if (activeButton.navbarMenuButton === NAVBAR_MENU_BUTTONS.COMPONENTS && activeButton.navbarSubMenuButton) {
        this.markup = markupManager.getContentMarkup(activeButton.navbarSubMenuButton);
      }
      this.currentView = activeButton.navbarMenuButton;
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
