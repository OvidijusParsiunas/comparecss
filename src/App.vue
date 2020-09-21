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
import { ContentMarkupInterface } from './interfaces/ContentMarkupInterface';
import { BUTTON_NAMES } from './consts/buttonNames.enum';

// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
@Options({
  components: {
    Contents,
    Sidenav,
  },
  mounted() {
    const jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('src', 'assets/jquery/jquery-3.5.1.slim.min.js');
    document.head.appendChild(jqueryScript);
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'assets/mui/mui.min.js');
    document.head.appendChild(recaptchaScript);
    const semanticScript = document.createElement('script');
    semanticScript.setAttribute('src', 'assets/semantic/semantic.min.js');
    document.head.appendChild(semanticScript);
    const foundationScript = document.createElement('script');
    foundationScript.setAttribute('src', 'assets/foundation/foundation.js');
    document.head.appendChild(foundationScript);
    const uikitScript = document.createElement('script');
    uikitScript.setAttribute('src', 'assets/uikit/uikit.min.js');
    document.head.appendChild(uikitScript);
    const bootstrapScript = document.createElement('script');
    bootstrapScript.setAttribute('src', 'assets/bootstrap/bootstrap.min.js');
    document.head.appendChild(bootstrapScript);
    const poppoverScript = document.createElement('script');
    poppoverScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js');
    document.head.appendChild(poppoverScript);
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
  public sideNavButtonClick(clickedButtonName: BUTTON_NAMES): void {
    this.markup = markupManager.retrieveContentMarkup(clickedButtonName);
  }
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
@import "https://fonts.googleapis.com/css?family=Press+Start+2P";
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
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
  // @import "assets/scss/uikit2.scss";
  @import "assets/scss/uikit.scss";
}

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
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  height: 100%;
  font-size: 14px;
  @import "assets/scss/semantic.scss";
  .ui.three.buttons > .button {
    width: 20%;
  }
  .ui.buttons .button, .ui.buttons .or, .ui.button {
    font-size: 14px;
  }
  .ui.circular.labels .label, .ui.circular.labels .picnic [data-tooltip]:after, .picnic .ui.circular.labels [data-tooltip]:after, .ui.circular.label, .picnic .ui.circular[data-tooltip]:after, .picnic .ui.circular[data-tooltip]:after {
    min-width: 1em;
    min-height: 1em;
  }
};

.pure {
  @import 'node_modules/purecss-sass/vendor/assets/stylesheets/purecss.scss';
  .button-success,
        .button-error,
        .button-warning,
        .button-secondary {
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .button-success {
            background: rgb(28, 184, 65);
            /* this is a green */
        }

        .button-error {
            background: rgb(202, 60, 60);
            /* this is a maroon */
        }

        .button-warning {
            background: rgb(223, 117, 20);
            /* this is an orange */
        }

        .button-secondary {
            background: rgb(66, 184, 221);
            /* this is a light blue */
        }
}

.skeleton {
  @import "assets/scss/normalize.scss";
  @import "assets/scss/skeleton.scss";
}

.milligram {
  font-size: 14px;
  box-sizing: border-box;
  color: #606c76;
  font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-weight: 300;
  letter-spacing: .01em;
  line-height: 1.6;
  @import 'node_modules/milligram-sass/src/milligram.sass';
  .button, button, dd, dt, li {
    margin-bottom: 10px;
  }
  .button, button, input[type=button], input[type=reset], input[type=submit] {
    font-size: 11px;
    padding: 0 30px;
    height: 38px;
    line-height: 38px;
    letter-spacing: 1px;
    border: 1px solid #9b4dca;
    border-radius: 4px;
  }
}

.spectre {
  font-family: sans-serif; /* 1 */
  -webkit-text-size-adjust: 100%; /* 3 */ 
  -ms-text-size-adjust: 100%; /* 3 */
  box-sizing: border-box;
  font-size: 20px;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
  background: #fff;
  color: #3b4351;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", sans-serif;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  font-size: 16px;
  @import "assets/scss/spectre.scss";
  @import "assets/scss/spectre-exp.scss";
  .btn, .materialize .btn-large, .materialize .btn-large, .materialize .btn-small, .materialize .btn-small {
    border: 1px solid #5755d9;
    border-radius: 2px;
    font-size: 16px;
    height: 36px;
    line-height: 24px;
    padding: 5px 8px;
  }
  .badge[data-badge]::after, .badge:not([data-badge])::after {
    border-radius: 10px;
    transform: translate(-1px, -10px);
  }
  .badge.btn::after {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%,-50%);
  }
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

.patternfly {
  --pf-global--palette--black-100: #fafafa;
  --pf-global--palette--black-150: #f5f5f5;
  --pf-global--palette--black-200: #f0f0f0;
  --pf-global--palette--black-300: #d2d2d2;
  --pf-global--palette--black-400: #b8bbbe;
  --pf-global--palette--black-500: #8a8d90;
  --pf-global--palette--black-600: #6a6e73;
  --pf-global--palette--black-700: #4f5255;
  --pf-global--palette--black-800: #3c3f42;
  --pf-global--palette--black-850: #212427;
  --pf-global--palette--black-900: #151515;
  --pf-global--palette--black-1000: #030303;
  --pf-global--palette--blue-50: #e7f1fa;
  --pf-global--palette--blue-100: #bee1f4;
  --pf-global--palette--blue-200: #73bcf7;
  --pf-global--palette--blue-300: #2b9af3;
  --pf-global--palette--blue-400: #06c;
  --pf-global--palette--blue-500: #004080;
  --pf-global--palette--blue-600: #002952;
  --pf-global--palette--blue-700: #001223;
  --pf-global--palette--cyan-50: #f2f9f9;
  --pf-global--palette--cyan-100: #a2d9d9;
  --pf-global--palette--cyan-200: #73c5c5;
  --pf-global--palette--cyan-300: #009596;
  --pf-global--palette--cyan-400: #005f60;
  --pf-global--palette--cyan-500: #003737;
  --pf-global--palette--cyan-600: #002323;
  --pf-global--palette--cyan-700: #000f0f;
  --pf-global--palette--gold-50: #fdf7e7;
  --pf-global--palette--gold-100: #f9e0a2;
  --pf-global--palette--gold-200: #f6d173;
  --pf-global--palette--gold-300: #f4c145;
  --pf-global--palette--gold-400: #f0ab00;
  --pf-global--palette--gold-500: #c58c00;
  --pf-global--palette--gold-600: #795600;
  --pf-global--palette--gold-700: #3d2c00;
  --pf-global--palette--green-50: #f3faf2;
  --pf-global--palette--green-100: #bde5b8;
  --pf-global--palette--green-200: #95d58e;
  --pf-global--palette--green-300: #6ec664;
  --pf-global--palette--green-400: #5ba352;
  --pf-global--palette--green-500: #3e8635;
  --pf-global--palette--green-600: #1e4f18;
  --pf-global--palette--green-700: #0f280d;
  --pf-global--palette--light-blue-100: #beedf9;
  --pf-global--palette--light-blue-200: #7cdbf3;
  --pf-global--palette--light-blue-300: #35caed;
  --pf-global--palette--light-blue-400: #00b9e4;
  --pf-global--palette--light-blue-500: #008bad;
  --pf-global--palette--light-blue-600: #005c73;
  --pf-global--palette--light-blue-700: #002d39;
  --pf-global--palette--light-green-100: #e4f5bc;
  --pf-global--palette--light-green-200: #c8eb79;
  --pf-global--palette--light-green-300: #ace12e;
  --pf-global--palette--light-green-400: #92d400;
  --pf-global--palette--light-green-500: #6ca100;
  --pf-global--palette--light-green-600: #486b00;
  --pf-global--palette--light-green-700: #253600;
  --pf-global--palette--orange-100: #f4b678;
  --pf-global--palette--orange-200: #ef9234;
  --pf-global--palette--orange-300: #ec7a08;
  --pf-global--palette--orange-400: #c46100;
  --pf-global--palette--orange-500: #8f4700;
  --pf-global--palette--orange-600: #773d00;
  --pf-global--palette--orange-700: #3b1f00;
  --pf-global--palette--purple-50: #f2f0fc;
  --pf-global--palette--purple-100: #cbc1ff;
  --pf-global--palette--purple-200: #b2a3ff;
  --pf-global--palette--purple-300: #a18fff;
  --pf-global--palette--purple-400: #8476d1;
  --pf-global--palette--purple-500: #6753ac;
  --pf-global--palette--purple-600: #40199a;
  --pf-global--palette--purple-700: #1f0066;
  --pf-global--palette--red-50: #faeae8;
  --pf-global--palette--red-100: #c9190b;
  --pf-global--palette--red-200: #a30000;
  --pf-global--palette--red-300: #7d1007;
  --pf-global--palette--red-400: #470000;
  --pf-global--palette--red-500: #2c0000;
  --pf-global--palette--white: #fff;
  --pf-global--BackgroundColor--100: #fff;
  --pf-global--BackgroundColor--200: #f0f0f0;
  --pf-global--BackgroundColor--light-100: #fff;
  --pf-global--BackgroundColor--light-200: #fafafa;
  --pf-global--BackgroundColor--light-300: #f0f0f0;
  --pf-global--BackgroundColor--dark-100: #151515;
  --pf-global--BackgroundColor--dark-200: #3c3f42;
  --pf-global--BackgroundColor--dark-300: #212427;
  --pf-global--BackgroundColor--dark-400: #4f5255;
  --pf-global--BackgroundColor--dark-transparent-100: rgba(3, 3, 3, 0.62);
  --pf-global--BackgroundColor--dark-transparent-200: rgba(3, 3, 3, 0.32);
  --pf-global--Color--100: #151515;
  --pf-global--Color--200: #6a6e73;
  --pf-global--Color--300: #3c3f42;
  --pf-global--Color--400: #8a8d90;
  --pf-global--Color--light-100: #fff;
  --pf-global--Color--light-200: #f0f0f0;
  --pf-global--Color--light-300: #d2d2d2;
  --pf-global--Color--dark-100: #151515;
  --pf-global--Color--dark-200: #6a6e73;
  --pf-global--active-color--100: #06c;
  --pf-global--active-color--200: #bee1f4;
  --pf-global--active-color--300: #73bcf7;
  --pf-global--active-color--400: #2b9af3;
  --pf-global--disabled-color--100: #6a6e73;
  --pf-global--disabled-color--200: #d2d2d2;
  --pf-global--disabled-color--300: #f0f0f0;
  --pf-global--primary-color--100: #06c;
  --pf-global--primary-color--200: #004080;
  --pf-global--primary-color--light-100: #73bcf7;
  --pf-global--primary-color--dark-100: #06c;
  --pf-global--secondary-color--100: #6a6e73;
  --pf-global--default-color--100: #73c5c5;
  --pf-global--default-color--200: #009596;
  --pf-global--default-color--300: #003737;
  --pf-global--success-color--100: #3e8635;
  --pf-global--success-color--200: #1e4f18;
  --pf-global--info-color--100: #2b9af3;
  --pf-global--info-color--200: #002952;
  --pf-global--warning-color--100: #f0ab00;
  --pf-global--warning-color--200: #795600;
  --pf-global--danger-color--100: #c9190b;
  --pf-global--danger-color--200: #a30000;
  --pf-global--danger-color--300: #470000;
  --pf-global--BoxShadow--sm: 0 0.0625rem 0.125rem 0
  rgba(3, 3, 3, 0.12), 0 0 0.125rem 0 rgba(3, 3, 3, 0.06);
  --pf-global--BoxShadow--sm-top: 0 -0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16);
  --pf-global--BoxShadow--sm-right: 0.125rem 0 0.25rem -0.0625rem rgba(3, 3, 3, 0.16);
  --pf-global--BoxShadow--sm-bottom: 0 0.125rem 0.25rem -0.0625rem rgba(3, 3, 3, 0.16);
  --pf-global--BoxShadow--sm-left: -0.125rem 0 0.25rem -0.0625rem rgba(3, 3, 3, 0.16);
  --pf-global--BoxShadow--md: 0 0.25rem 0.5rem 0rem
  rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06);
  --pf-global--BoxShadow--md-top: 0 -0.5rem 0.5rem -0.375rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--md-right: 0.5rem 0 0.5rem -0.375rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--md-bottom: 0 0.5rem 0.5rem -0.375rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--md-left: -0.5rem 0 0.5rem -0.375rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--lg: 0 0.5rem 1rem 0
  rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08);
  --pf-global--BoxShadow--lg-top: 0 -0.75rem 0.75rem -0.5rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--lg-right: 0.75rem 0 0.75rem -0.5rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--lg-bottom: 0 0.75rem 0.75rem -0.5rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--lg-left: -0.75rem 0 0.75rem -0.5rem rgba(3, 3, 3, 0.18);
  --pf-global--BoxShadow--xl: 0 1rem 2rem 0 rgba(3, 3, 3, 0.16), 0 0 0.5rem 0 rgba(3, 3, 3, 0.1);
  --pf-global--BoxShadow--xl-top: 0 -1rem 1rem -0.5rem rgba(3, 3, 3, 0.2);
  --pf-global--BoxShadow--xl-right: 1rem 0 1rem -0.5rem rgba(3, 3, 3, 0.2);
  --pf-global--BoxShadow--xl-bottom: 0 1rem 1rem -0.5rem rgba(3, 3, 3, 0.2);
  --pf-global--BoxShadow--xl-left: -1rem 0 1rem -0.5rem rgba(3, 3, 3, 0.2);
  --pf-global--BoxShadow--inset: inset 0 0 0.625rem 0 rgba(3, 3, 3, 0.25);
  --pf-global--font-path: ./assets2/fonts;
  --pf-global--fonticon-path: ./assets2/pficon;
  --pf-global--spacer--xs: 0.25rem;
  --pf-global--spacer--sm: 0.5rem;
  --pf-global--spacer--md: 1rem;
  --pf-global--spacer--lg: 1.5rem;
  --pf-global--spacer--xl: 2rem;
  --pf-global--spacer--2xl: 3rem;
  --pf-global--spacer--3xl: 4rem;
  --pf-global--spacer--4xl: 5rem;
  --pf-global--spacer--form-element: 0.375rem;
  --pf-global--gutter: 1rem;
  --pf-global--gutter--md: 1.5rem;
  --pf-global--ZIndex--xs: 100;
  --pf-global--ZIndex--sm: 200;
  --pf-global--ZIndex--md: 300;
  --pf-global--ZIndex--lg: 400;
  --pf-global--ZIndex--xl: 500;
  --pf-global--ZIndex--2xl: 600;
  --pf-global--breakpoint--xs: 0;
  --pf-global--breakpoint--sm: 576px;
  --pf-global--breakpoint--md: 768px;
  --pf-global--breakpoint--lg: 992px;
  --pf-global--breakpoint--xl: 1200px;
  --pf-global--breakpoint--2xl: 1450px;
  --pf-global--link--Color: #06c;
  --pf-global--link--Color--hover: #004080;
  --pf-global--link--Color--light: #73bcf7;
  --pf-global--link--Color--light--hover: #2b9af3;
  --pf-global--link--Color--dark: #06c;
  --pf-global--link--Color--dark--hover: #004080;
  --pf-global--link--TextDecoration: none;
  --pf-global--link--TextDecoration--hover: underline;
  --pf-global--BorderWidth--sm: 1px;
  --pf-global--BorderWidth--md: 2px;
  --pf-global--BorderWidth--lg: 3px;
  --pf-global--BorderWidth--xl: 4px;
  --pf-global--BorderColor--100: #d2d2d2;
  --pf-global--BorderColor--200: #8a8d90;
  --pf-global--BorderColor--300: #f0f0f0;
  --pf-global--BorderColor--dark-100: #d2d2d2;
  --pf-global--BorderColor--light-100: #b8bbbe;
  --pf-global--BorderRadius--sm: 3px;
  --pf-global--BorderRadius--lg: 30em;
  --pf-global--icon--Color--light: #6a6e73;
  --pf-global--icon--Color--dark: #151515;
  --pf-global--icon--FontSize--sm: 0.625rem;
  --pf-global--icon--FontSize--md: 1.125rem;
  --pf-global--icon--FontSize--lg: 1.5rem;
  --pf-global--icon--FontSize--xl: 3.375rem;
  --pf-global--FontFamily--sans-serif: RedHatText, Overpass, overpass, helvetica, arial, sans-serif;
  --pf-global--FontFamily--heading--sans-serif: RedHatDisplay, Overpass, overpass,
    helvetica, arial, sans-serif;
  --pf-global--FontFamily--monospace: Liberation Mono, consolas, SFMono-Regular,
    menlo, monaco, Courier New, monospace;
  --pf-global--FontFamily--overpass--sans-serif: overpass, overpass, open sans, -apple-system,
    blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol;
  --pf-global--FontFamily--overpass--monospace: overpass-mono, overpass-mono, SFMono-Regular,
    menlo, monaco, consolas, Liberation Mono, Courier New, monospace;
  --pf-global--FontSize--4xl: 2.25rem;
  --pf-global--FontSize--3xl: 1.75rem;
  --pf-global--FontSize--2xl: 1.5rem;
  --pf-global--FontSize--xl: 1.25rem;
  --pf-global--FontSize--lg: 1.125rem;
  --pf-global--FontSize--md: 1rem;
  --pf-global--FontSize--sm: 0.875rem;
  --pf-global--FontSize--xs: 0.75rem;
  --pf-global--FontWeight--light: 300;
  --pf-global--FontWeight--normal: 400;
  --pf-global--FontWeight--semi-bold: 700;
  --pf-global--FontWeight--overpass--semi-bold: 500;
  --pf-global--FontWeight--bold: 700;
  --pf-global--FontWeight--overpass--bold: 600;
  --pf-global--LineHeight--sm: 1.3;
  --pf-global--LineHeight--md: 1.5;
  --pf-global--ListStyle: disc outside;
  --pf-global--Transition: all 250ms cubic-bezier(0.42, 0, 0.58, 1);
  --pf-global--TimingFunction: cubic-bezier(0.645, 0.045, 0.355, 1);
  --pf-global--TransitionDuration: 250ms;
  --pf-global--arrow--width: 0.9375rem;
  --pf-global--arrow--width-lg: 1.5625rem;
  --pf-global--target-size--MinWidth: 44px;
  --pf-global--target-size--MinHeight: 44px;

  // find out which variables are not required and if want to use icons,
  // uncomment urls in the scss file
  // and create a new assets2 folder in the src folder
  font-family: var(--pf-global--FontFamily--sans-serif);
  font-size: var(--pf-global--FontSize--md);
  font-weight: var(--pf-global--FontWeight--normal);
  line-height: var(--pf-global--LineHeight--md);
  text-align: left;
  background-color: var(--pf-global--BackgroundColor--100);
  @import "assets/scss/patternfly.scss";
}

.bootflat {
  @import "node_modules/bootstrap/scss/bootstrap";
  button {
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -ms-overflow-style: scrollbar;
      -webkit-tap-highlight-color: transparent;
  }
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #434a54;
  background-color: white;
  @import "assets/scss/bootflat.scss";
}
</style>
