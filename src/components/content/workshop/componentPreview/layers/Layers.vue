<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div :id="getLayerId(layer.name, 'subcomponentId')"
        :style="getStyleProperties(layer, index === layers.length - 1)"
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
          <div :style="getLayerShadowOverlayStyleProperties(layer, index === layers.length - 1)"
            class="layer-shadow-overlay"></div>
      </div>
      <div :id="getLayerId(layer.name, 'overlayId')"
        style="display: none"
        :style="getLayerStyleProperties(layer, layers, index)"
        :class="getLayerClasses(layer)"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { Layer, NestedComponent } from '../../../../../interfaces/componentPreviewStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import layerSections from './LayerSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER, 
      SUBCOMPONENT_OVERLAY_CLASSES,
    };
  },
  methods: {
    getStyleProperties(layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] {
      const { subcomponentProperties: { overwrittenCustomCssObj, customCss, customStaticFeatures } } = layer;
      const subcomponentCss = overwrittenCustomCssObj || customCss;
      return [
        subcomponentCss[CSS_PSEUDO_CLASSES.DEFAULT],
        { backgroundImage: customStaticFeatures?.image?.data ? 'url(' + customStaticFeatures.image.data + ')' : '' },
        { boxShadow: CSS_PROPERTY_VALUES.UNSET },
        isLastLayer ? { borderBottomWidth: '0px' } : {} // can alternatively use nth class
      ]
    },
    getLayerShadowOverlayStyleProperties(layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] {
      return [
        layer.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        isLastLayer ? { boxShadow: CSS_PROPERTY_VALUES.UNSET } : {}
      ];
    },
    getLayerId(layerName: string, idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[layerName]?.[idType];
    },
    getLayerStyleProperties(layer: NestedComponent, layers: NestedComponent[], currentIndex: number): WorkshopComponentCss {
      const subcomponentCss = { ...layer.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT] };
      subcomponentCss.zIndex = layers.length - currentIndex + 1;
      if (layer.subcomponentProperties.isTemporaryAddPreview) subcomponentCss.display = 'block';
      return subcomponentCss;
    },
    getLayerClasses(layer: NestedComponent): string[] {
      const classes = [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT];
      if (layer.subcomponentProperties.isTemporaryAddPreview) {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
      return classes;
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
    border: unset !important;
  }
</style>
