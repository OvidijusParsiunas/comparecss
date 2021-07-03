<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div :id="getLayerId(layer.name, 'subcomponentId')"
        :style="getStyleProperties(layers, layer, index)"
        :class="COMPONENT_PREVIEW_MARKER"
        @mouseenter="activateMouseEvent(layer.name, 'subcomponentMouseEnter')"
        @mouseleave="activateMouseEvent(layer.name, 'subcomponentMouseLeave')"
        @mousedown="activateMouseEvent(layer.name, 'subcomponentMouseDown')"
        @mouseup="activateMouseEvent(layer.name, 'subcomponentMouseUp')"
        @click="activateMouseEvent(layer.name, 'subcomponentClick')">
          <layer-sections
            v-if="layer.sections"
            :class="COMPONENT_PREVIEW_MARKER"
            :classes="classes"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :sections="layer.sections"
            :mouseEvents="mouseEvents"/>
      </div>
      <div :id="getLayerId(layer.name, 'overlayId')"
        style="display: none"
        :style="[layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS], { zIndex: layers.length - index + 1 }]"
        :class="[...OVERLAY_DEFAULT_CLASSES]"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import layerSections from './LayerSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES;
  URL: string;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER, 
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES.DEFAULT,
      URL: require('@/assets/images/road.webp'),
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
    getLayerId(layerName: string, idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[layerName]?.[idType];
    },
    activateMouseEvent(layerName: string, subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      const layerId = this.getLayerId(layerName, 'subcomponentId');
      return layerId && this.mouseEvents[layerId][subcomponentMouseEvent]()
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
