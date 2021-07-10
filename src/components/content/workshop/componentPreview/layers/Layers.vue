<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div :id="getLayerId(layer.name, 'subcomponentId')"
        :style="getStyleProperties(layer)"
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
      <!-- zIndex is used for the shadow and overlay to be placed above the next layer's border -->
      <div :style="[{ zIndex: layers.length - index + 1}]"
        class="layer-shadow-overlay-container"
        :class="SUBCOMPONENT_OVERLAY_CLASSES.BASE">
          <div :style="layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS]"
            class="layer-shadow-overlay"></div>
      </div>
      <div :id="getLayerId(layer.name, 'overlayId')"
        style="display: none"
        :style="[layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS], { zIndex: layers.length - index + 1 }]"
        :class="[SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT]"></div>
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
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
  DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES;
  URL: string;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER, 
      SUBCOMPONENT_OVERLAY_CLASSES,
      DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES.DEFAULT,
      URL: require('@/assets/images/road.webp'),
    };
  },
  methods: {
    getStyleProperties(layer: Layer): WorkshopComponentCss[] {
      const { subcomponentProperties: { overwrittenCustomCssObj, customCss, customStaticFeatures } } = layer;
      const customCssObj = overwrittenCustomCssObj || customCss;
      return [
        customCssObj[CSS_PSEUDO_CLASSES.DEFAULT],
        { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : ''},
        { boxShadow: 'unset'},
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
  .layer-shadow-overlay-container {
    overflow: hidden;
    height: 500px;
    pointer-events: none;
  }
  .layer-shadow-overlay {
    top: -1px;
    left: -1px;
    width: calc(100% + 1px);
    background-color: unset !important;
  }
</style>
