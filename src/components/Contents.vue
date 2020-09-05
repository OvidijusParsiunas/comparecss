<template>
  <div id="content">
    <div class="bootstrap">
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
    <div class="material">
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
    <div class="uikit">
        <button class="uk-button uk-button-default">Primary</button>
    </div>
    <div class="foundation">
        <a class="button">Primary</a>
    </div>
    <div class="bulma">
        <button class="button">Button</button>
    </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Contents extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
    @import "../assets/uikit.scss";
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
    @import "../assets/foundation.scss";
};

.bulma {
    box-sizing: border-box;
    @import "node_modules/bulma/bulma.sass";
};

</style>
