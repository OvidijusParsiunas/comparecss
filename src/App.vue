<template>
  <div id="app">
    <Sidenav @sidenav-button-clicked="updateContent($event)"/>
    <Content :activeButton="clickedButton"/>
  </div>
</template>

<script lang="ts">
import { NavbarButton } from './interfaces/navbarButton';
import Content from './components/content/Content.vue';
import Sidenav from './components/sidenav/Sidenav.vue';
import ScriptService from './services/scripts';
import ImageService from './services/images';

interface Data {
  clickedButton: NavbarButton;
}

export default {
  data: (): Data => ({
    clickedButton: null,
  }),
  mounted(): void {
    this.addScriptsToDOM();
    this.preloadImages();
  },
  methods: {
    updateContent(clickedButton: NavbarButton): void {
      this.clickedButton = clickedButton;
    },
    addScriptsToDOM(): void {
      // use a builder pattern
      // https://www.youtube.com/watch?v=VuQaS0FFUFY&feature=youtu.be&fbclid=IwAR2camtL_W1Igt6Ltz5Eu2zsk-DXcwDPKJ_n6D_VcCNlh4VK0qc9GxTlsHE&ab_channel=MLTArtificialIntelligence
      // 6:54
      const scriptPaths = [
        [
          'assets/js/jquery/jquery-3.5.1.slim.min.js', 'assets/js/jquery/jquery.js', 'assets/js/mui/mui.min.js',
          'assets/js/uikit/uikit.min.js', 'assets/js/popper/popper.min.js', 'assets/js/materialize/materialize.min.js'
        ],
        'assets/js/bootstrap/bootstrap.min.js', 'assets/js/semantic/semantic.min.js', 'assets/js/foundation/foundation.min.js',
        'assets/js/cssFrameworkJsFunctionality.js', 'assets/js/uglifyjs/utils.js', 'assets/js/uglifyjs/ast.js',
        'assets/js/uglifyjs/minify.js', 'assets/js/uglifyjs/output.js', 'assets/js/uglifyjs/parse.js',
        'assets/js/uglifyjs/propmangle.js', 'assets/js/uglifyjs/scope.js', 'assets/js/uglifyjs/sourcemap.js',
        'assets/js/uglifyjs/transform.js', 'assets/js/uglifyjs/compress.js',
      ];
      ScriptService.addScriptsSequentially(scriptPaths);
    },
    preloadImages(): void {
      const imagePaths = [
        'img/rubbish-can-red.d8f85fb8.svg',
        'img/rubbish-can-default.f84052ba.svg',
        'img/plus-default.1d7fd202.svg',
        'img/plus-green.e04a38b6.svg',
      ];
      ImageService.preload(imagePaths);
    }
  },
  components: {
    Content,
    Sidenav,
  },
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
