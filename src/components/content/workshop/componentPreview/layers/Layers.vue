<template>
  <div class="layers">
    <div v-for="layer in layers" :key="layer" class="layer">
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].subcomponentId"
        :style="layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS]"
        @mouseenter="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseUp()">
          <layer-sections
            v-if="layer.sections"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :sections="layer.sections"
            :mouseEvents="mouseEvents"/>
      </div>
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].overlayId"
        style="display: none" :style="layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS]"
        :class="OVERLAY_DEFAULT_CLASS"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import SubcomponentDisplayUtils from '../utils/subcomponentDisplayUtils';
import layerSections from './LayerSections.vue';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES;
  isSubcomponentDisplayed: (nestedSubcomponent: SubcomponentProperties) => boolean;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES.DEFAULT,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
    };
  },
  components: {
    layerSections,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    mouseEvents: Object,
    layers: Object,
  }
}
</script>

<style lang="css" scoped>
  .layers {
    height: 100%;
  }
  .layer {
    position: relative;
    height: 100%;
  }
</style>
