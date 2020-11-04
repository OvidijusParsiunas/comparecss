<template>
  <div id="app">
    <Sidenav @sidenav-button-clicked="updateContent($event)"/>
    <Content :activeButton="clickedButton"/>
  </div>
</template>

<script lang="ts">
import Content from './components/content/Content.vue';
import Sidenav from './components/sidenav/Sidenav.vue';
import scripts from './services/scripts';
import { Options, Vue } from 'vue-class-component';
import { NavbarButton } from './interfaces/navbarButton';

// https://vuejsdevelopers.com/2020/03/16/vue-js-tutorial/
@Options({
  components: {
    Content,
    Sidenav,
  },
  mounted() {
    this.addScriptsToDOM();
  }
})
export default class App extends Vue {
  private clickedButton: NavbarButton = null;

  private updateContent(clickedButton: NavbarButton) {
    this.clickedButton = clickedButton;
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
      return scripts.addScriptsToHead('assets/js/cssFrameworkJsFunctionality.js');
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/utils.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/ast.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/minify.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/output.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/parse.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/propmangle.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/scope.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/sourcemap.js')
    }).then(() => {
      return scripts.addScriptsToHead('assets/js/uglifyjs/transform.js')
    }).then(() => {
      scripts.addScriptsToHead('assets/js/uglifyjs/compress.js')
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
  background: white;
  /* background: #f5f5f5 */
}
</style>
<style lang="scss">
@import "./cssFrameworks/styling/bootflat.scss";
@import "./cssFrameworks/styling/bootstrap.scss";
@import "./cssFrameworks/styling/bulma.scss";
@import "./cssFrameworks/styling/chota.scss";
@import "./cssFrameworks/styling/cirrus.scss";
@import "./cssFrameworks/styling/foundation.scss";
@import "./cssFrameworks/styling/hiq.scss";
@import "./cssFrameworks/styling/materialize.scss";
@import "./cssFrameworks/styling/milligram.scss";
@import "./cssFrameworks/styling/mui.scss";
@import "./cssFrameworks/styling/nes.scss";
@import "./cssFrameworks/styling/patternfly.scss";
@import "./cssFrameworks/styling/picnic.scss";
@import "./cssFrameworks/styling/primer.scss";
@import "./cssFrameworks/styling/pure.scss";
@import "./cssFrameworks/styling/semantic.scss";
@import "./cssFrameworks/styling/skeleton.scss";
@import "./cssFrameworks/styling/spectre.scss";
@import "./cssFrameworks/styling/turret.scss";
@import "./cssFrameworks/styling/uikit.scss";
</style>
