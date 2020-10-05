<template>
  <div id="app">
    <Sidenav @sidenav-button-clicked="sideNavButtonClick($event)"/>
    <Contents :markup="markup"/>
  </div>
</template>

<script lang="ts">
import componentFunctionalityViaJS from './services/componentFunctionalityViaJS';
import Contents from './components/content/Content.vue';
import Sidenav from './components/sidenav/Sidenav.vue';
import markupManager from './services/markupManager';
import scripts from './services/scripts';
import { ContentMarkup } from './interfaces/ContentMarkupInterface';
import { BUTTON_NAMES } from './consts/buttonNames.enum';
import { Options, Vue } from 'vue-class-component';

// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
@Options({
  components: {
    Contents,
    Sidenav,
  },
  mounted() {
    this.addScriptsToDOM();
  },
  updated() {
    this.$nextTick(() => {
      if (this.triggerComponentFunctionality) {
        this.triggerComponentFunctionality();
        this.triggerComponentFunctionality = null;
      }
    })
  }
})
export default class App extends Vue {
  // data variables have been moved here to allow typing
  triggerComponentFunctionality: () => void = null;
  private markup: ContentMarkup = {
    bootstrap: '<button type="button" class="btn btn-primary">Primary</button>',
    materialize: '<button type="button" class="btn btn-primary">Primary</button>',
    uikit: '<button class="uk-button uk-button-default">Primary</button>',
    foundation: '<a class="button">Primary</a>',
    bulma: '<button class="button">Button</button>',
  };

  private sideNavButtonClick(clickedButtonName: BUTTON_NAMES): void {
    this.triggerComponentFunctionality = componentFunctionalityViaJS.getComponentTriggers(clickedButtonName);
    this.markup = markupManager.getContentMarkup(clickedButtonName);
  }

  private addScriptsToDOM(): void {
    scripts.addScriptsToHead(
      'assets/js/jquery/jquery-3.5.1.slim.min.js', 'assets/js/jquery/jquery.js', 'assets/js/mui/mui.min.js',
      'assets/js/uikit/uikit.min.js', 'assets/js/popper/popper.min.js', 'assets/js/materialize/materialize.min.js'
    ).then(() => {
      return scripts.addScriptsToHead('assets/js/bootstrap/bootstrap.min.js');
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/semantic/semantic.min.js');
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/foundation/foundation.min.js');
    }).then(() => {
      scripts.addScriptsToHead('assets/js/component-functionality.js');
    }).catch((e) => {
      console.log('Failed to load a script:')
      console.log(e);
    });
    // if we fail to load a certain script, display that as a toaster alert and do not show the component
  }
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import "https://use.fontawesome.com/releases/v5.0.12/css/all.css";  /* is this needed? */
#app {
  display: flex;
  width: 100%;
  align-items: stretch;
}
body {
  margin: 0px;
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
  /* background: #f5f5f5 */
}
</style>
<style lang="scss">
@import "frameworkStyles/bootflat.scss";
@import "frameworkStyles/bootstrap.scss";
@import "frameworkStyles/bulma.scss";
@import "frameworkStyles/chota.scss";
@import "frameworkStyles/cirrus.scss";
@import "frameworkStyles/foundation.scss";
@import "frameworkStyles/hiq.scss";
@import "frameworkStyles/materialize.scss";
@import "frameworkStyles/milligram.scss";
@import "frameworkStyles/mui.scss";
@import "frameworkStyles/nes.scss";
@import "frameworkStyles/patternfly.scss";
@import "frameworkStyles/picnic.scss";
@import "frameworkStyles/primer.scss";
@import "frameworkStyles/pure.scss";
@import "frameworkStyles/semantic.scss";
@import "frameworkStyles/skeleton.scss";
@import "frameworkStyles/spectre.scss";
@import "frameworkStyles/turret.scss";
@import "frameworkStyles/uikit.scss";
</style>
