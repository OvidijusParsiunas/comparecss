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

.picnic {
  @import 'node_modules/picnic/src/picnic.scss';
}

.chota {
  --bg-color: #ffffff;
  --bg-secondary-color: #f3f3f6;
  --color-primary: #14854F;
  --color-lightGrey: #d2d6dd;
  --color-grey: #747681;
  --color-darkGrey: #3f4144;
  --color-error: #d43939;
  --color-success: #28bd14;
  --grid-maxWidth: 120rem;
  --grid-gutter: 2rem;
  --font-size: 1.6rem;
  --font-color: #333333;
  --font-family-sans: -apple-system, BlinkMacSystemFont, Avenir, "Avenir Next",
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  --font-family-mono: monaco, "Consolas", "Lucida Console", monospace;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  font-size: 62.5%;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  background-color: var(--bg-color);
  line-height: 1.6;
  font-size: var(--font-size);
  color: var(--font-color);
  font-family: "Segoe UI", "Helvetica Neue", sans-serif; /*fallback*/
  font-family: var(--font-family-sans);
  margin: 0;
  padding: 0;
  @import 'node_modules/chota/dist/chota';
}

.cirrus {
  --cirrus-fg: #374054;
  --cirrus-bg: #fff;

  --cirrus-primary: #f03d4d;
  --cirrus-primary-light: #ffdadd;
  --cirrus-accent-hover: #d62939;
  --cirrus-accent-border: #c21b2b;
  --cirrus-light: #f6f9fc;
  --cirrus-light-gray: #f8f9fa;
  --cirrus-gray: #d5d7dc;
  --cirrus-dark-gray: #909090;
  --cirrus-dark: #363636;
  --cirrus-link: #5e5cc7;
  --cirrus-link-dark: #4643e2;
  --cirrus-info: #2972fa;
  --cirrus-success: #0dd157;
  --cirrus-warning: #fab633;
  --cirrus-danger: #fb4143;

  --cirrus-light-hover: #d9e6f2;
  --cirrus-dark-hover: #424242;
  --cirrus-info-hover: #2368e9;
  --cirrus-link-hover: #f8f7ff;
  --cirrus-success-hover: #00b147;
  --cirrus-warning-hover: #f9a90e;
  --cirrus-danger-hover: #f1393c;

  --cirrus-select-bg: rgba(0, 161, 255, 0.2);

  --cirrus-code-bg: var(--cirrus-primary-light);
  --cirrus-code-fg: #dc4753;

  --cirrus-form-group-bg: var(--cirrus-light-gray);
  --cirrus-form-group-fg: var(--cirrus-dark-gray);

  --toast-primary-bg: rgba(49, 59, 80, 0.9);

  --animation-duration: .2s;
  @import "assets/scss/cirrus.scss";
}

.turret {
  @import 'node_modules/turretcss/dist/turretcss.min';
}

.hiq {
   -webkit-text-size-adjust:100%;
  text-rendering:var(--hiq-text-rendering, optimizeLegibility);
  font-family:var(--hiq-font-family-base, -apple-system, system-ui, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  font-size:calc(var(--hiq-unitless-min-font-size, 15) * 1px);
  font-weight:var(--hiq-font-weight-base, var(--hiq-font-weight-normal, 400));
  letter-spacing:var(--hiq-letter-spacing-base, 0);
  line-height:var(--hiq-line-height-base, 1.5);
  @media (min-width: 460px){
  html {
    font-size:calc((var(--hiq-unitless-min-font-size, 15) * 1px)
      + (calc(var(--hiq-unitless-max-font-size, 16)
      - var(--hiq-unitless-min-font-size, 15)))
      * (calc(100vw - (var(--hiq-unitless-lower-font-range, 460) * 1px)))
      / (calc(var(--hiq-unitless-upper-font-range, 900)
      - var(--hiq-unitless-lower-font-range, 460))));
    }
  }
  @media (min-width: 900px){
  html {
      font-size:calc(var(--hiq-unitless-max-font-size, 16) * 1px);
    }
  }
  @import 'node_modules/hiq/dist/hiq.min';
}

.mui {
  @import 'node_modules/muicss/lib/sass/mui.scss';
}
</style>
