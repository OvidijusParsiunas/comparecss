<template>
  <div id="app">
    <Sidebar @sidenav-button-clicked="buttonClickEvent($event)"/>
    <Contents :activeButtonName="activeButtonName" :data="data"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Contents from './components/contents/Contents.vue';
import Sidebar from './components/sidebar/Sidebar.vue';

// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
@Options({
  components: {
    Contents,
    Sidebar,
  },
  data: () => ({
    activeButtonName: 'DefaultButtonName',
    data: [
      {
        class: 'bootstrap',
        component: '<button type="button" class="btn btn-primary">Primary</button>',
      },
      {
        class: 'bulma',
        component: '<button class="button">Button</button',
      },
    ],
  }),
  methods: {
    buttonClickEvent(clickedButtonName: string) {
      this.activeButtonName = clickedButtonName;
      // get a new config here
      console.log(this.activeButtonName);
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
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
 .material {
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
</style>
