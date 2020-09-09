<template>
  <div id="app">
    <Sidenav @sidenav-button-clicked="sideNavButtonClick($event)"/>
    <Contents :markup="markup"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Contents from './components/content/Content.vue';
import Sidenav from './components/sidenav/Sidenav.vue';
import markupManager from './services/markupManager';
import ContentMarkupInterface from './interfaces/ContentMarkupInterface';

// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
@Options({
  components: {
    Contents,
    Sidenav,
  },
})
export default class App extends Vue {
  // data variables these have been moved here to allow typing
  private markup: ContentMarkupInterface = {
    bootstrap: '<button type="button" class="btn btn-primary">Primary</button>',
    materialize: '<button type="button" class="btn btn-primary">Primary</button>',
    uikit: '<button class="uk-button uk-button-default">Primary</button>',
    foundation: '<a class="button">Primary</a>',
    bulma: '<button class="button">Button</button>',
  };

  // methods
  public sideNavButtonClick(clickedButtonName: string): void {
    this.markup = markupManager.retrieveContentMarkup(clickedButtonName);
  }
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";
#app {
    display: flex;
    width: 100%;
    align-items: stretch;
}
body {
    margin: 0px;
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}
</style>

<style lang="scss">
.bootstrap {
  @import "node_modules/bootstrap/scss/bootstrap";
  button {
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,
        "Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -ms-overflow-style: scrollbar;
      -webkit-tap-highlight-color: transparent;
  }
}
 .materialize {
    @import "node_modules/materialize-css/sass/materialize.scss";
  }

  .uikit {
    // @import "node_modules/uikit/src/scss/variables.scss";
    // @import "node_modules/uikit/src/scss/variables-theme.scss";
    // @import "node_modules/uikit/src/scss/uikit-theme.scss";
    // @import "node_modules/uikit/src/scss/mixins.scss";
    // @import "node_modules/uikit/src/scss/mixins-theme.scss";
    // @import "node_modules/uikit/src/scss/uikit.scss";
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    background: #fff;
    color: #666;
    @import "assets/scss/uikit.scss";
};

.foundation {
    // @import 'node_modules/foundation-sites/scss/util/util';

    // @import "node_modules/foundation-sites/scss/foundation.scss";
    // @import "node_modules/foundation-sites/scss/_global.scss";
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 100%;
    margin: 0;
    padding: 0;
    background: #fefefe;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: #0a0a0a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @import "assets/scss/foundation.scss";
};

.bulma {
    box-sizing: border-box;
    @import "node_modules/bulma/bulma.sass";
};

.semantic {
    @import "assets/scss/semantic.scss";
};

.pure {
  @import 'node_modules/purecss-sass/vendor/assets/stylesheets/purecss.scss';
}

.skeleton {
  @import "assets/scss/normalize.scss";
  @import "assets/scss/skeleton.scss";
}

.milligram {
  @import 'node_modules/milligram-sass/src/milligram.sass';
}

.spectre {
  box-sizing: border-box;
  font-size: 20px;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
  background: #fff;
  color: #3b4351;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", sans-serif;
  font-size: .8rem;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  @import 'node_modules/spectre.css/src/spectre.scss';
}

.primer {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,
    "Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  background-color: #fff;
  @import "@primer/css/index.scss";
}

.nes {
  font-family: 'Press Start 2P';
  @import "assets/scss/nes.scss";
}
</style>
