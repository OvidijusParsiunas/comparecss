<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].subcomponentId"
        :style="getStyleProperties(layers, layer, index)"
        :class="COMPONENT_PREVIEW_MARKER"
        @mouseenter="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseUp()"
        @click="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentClick()">
          <layer-sections
            v-if="layer.sections"
            :class="COMPONENT_PREVIEW_MARKER"
            :classes="classes"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :sections="layer.sections"
            :mouseEvents="mouseEvents"/>
      </div>
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].overlayId"
        style="display: none"
        :style="[layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS], { zIndex: layers.length - index + 1 }]"
        :class="[...OVERLAY_DEFAULT_CLASSES]"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import SubcomponentDisplayUtils from '../utils/subcomponentDisplayUtils';
import layerSections from './LayerSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES;
  URL: string;
  isSubcomponentDisplayed: (nestedSubcomponent: SubcomponentProperties) => boolean;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER, 
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES.DEFAULT,
      URL: require('@/assets/images/road.webp'),
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
    };
  },
  methods: {
    getStyleProperties(layers: Layer[], layer: Layer, index: number): WorkshopComponentCss[] {
      const { subcomponentProperties: { overwrittenCustomCssObj, customCss, customStaticFeatures } } = layer;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [
        customCssObj[CSS_PSEUDO_CLASSES.DEFAULT],
        { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
        { zIndex: layers.length - index }
      ]
    },
  },
  components: {
    layerSections,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    mouseEvents: Object,
    layers: Object,
    classes: Array,
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
