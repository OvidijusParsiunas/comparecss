<template>
  <div id="content">
    <div v-if="currentView === NAVBAR_MENU_BUTTONS.HOMEPAGE">
      <homepage/>
    </div>
    <div v-if="currentView == NAVBAR_MENU_BUTTONS.COMPONENTS">
      <components :componentMarkup="componentMarkup"/>
    </div>
    <div v-if="currentView == NAVBAR_MENU_BUTTONS.WORKSHOP">
      <workshop/>
    </div>
  </div>
</template>

  <!-- if the order is going to become important,
  consider having a for loop which would traverse an array -->
  <!-- <panel-slot v-for="item in data" :key="item.class" v-bind:class="item.class">
    <div v-html="item.component"></div>
  </panel-slot> -->

<script lang="ts">
import cssFrameworksJSFunctionality from '../../services/cssFrameworksJSFunctionality';
import componentMarkupManager from '../../services/componentMarkupManager';
import { NAVBAR_MENU_BUTTONS } from '../../consts/navbarMenuButtons.enum';
import { ComponentMarkup } from '../../interfaces/componentMarkup';
import { NavbarButton } from '../../interfaces/navbarButton';
import workshop from './workshop/Workshop.vue';
import components from './Components.vue';
import { onUpdated, nextTick } from 'vue'
import homepage from './Homepage.vue';

interface Data {
  NAVBAR_MENU_BUTTONS,
  currentView: NAVBAR_MENU_BUTTONS,
  componentMarkup: ComponentMarkup,
}

interface Props {
  activeButton: NavbarButton,
}

export default {
  // https://v3.vuejs.org/guide/composition-api-setup.html#context
  // cannot access 'this' in setup
  setup(props: Props): void {
    onUpdated(() => {
      nextTick(() => {
        if (props.activeButton.navbarMenuButton === NAVBAR_MENU_BUTTONS.COMPONENTS && props.activeButton.navbarSubMenuButton !== undefined) {
          const triggerCssFrameworksJs = cssFrameworksJSFunctionality.getTriggers(props.activeButton.navbarSubMenuButton);
          if (triggerCssFrameworksJs) { triggerCssFrameworksJs(); }
        }
      })
    })
  },
  data: (): Data => ({
    NAVBAR_MENU_BUTTONS,
    currentView: NAVBAR_MENU_BUTTONS.HOMEPAGE,
    componentMarkup:  {
      bootstrap: '<button type="button" class="btn btn-primary">Primary</button>',
      materialize: '<button type="button" class="btn btn-primary">Primary</button>',
      uikit: '<button class="uk-button uk-button-default">Primary</button>',
      foundation: '<a class="button">Primary</a>',
      bulma: '<button class="button">Button</button>',
      semantic: '',
      pure: '',
      skeleton: '',
      milligram: '',
      spectre: '',
      primer: '',
      nes: '',
      picnic: '',
      chota: '',
      cirrus: '',
      turret: '',
      hiq: '',
      mui: '',
      patternfly: '',
      bootflat: '',
    },
  }),
  components: {
    components,
    homepage,
    workshop,
  },
  props: {
    activeButton: null,
  },
  watch: {
    activeButton(activeButton: NavbarButton): void {
      if (activeButton.navbarMenuButton === NAVBAR_MENU_BUTTONS.COMPONENTS && activeButton.navbarSubMenuButton !== undefined) {
        this.componentMarkup = componentMarkupManager.getComponentMarkup(activeButton.navbarSubMenuButton);
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
