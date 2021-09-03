<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div :id="getLayerId(layer.subcomponentProperties.name, 'subcomponentId')"
        :style="generateStyleProperties(layer, index === layers.length - 1)"
        :class="[...classes, COMPONENT_PREVIEW_MARKER]"
        @mouseenter="activateSubcomponentMouseEvent(layer.subcomponentProperties.name, 'subcomponentMouseEnter')"
        @mouseleave="activateSubcomponentMouseEvent(layer.subcomponentProperties.name, 'subcomponentMouseLeave')"
        @mousedown="activateSubcomponentMouseEvent(layer.subcomponentProperties.name, 'subcomponentMouseDown')"
        @mouseup="activateSubcomponentMouseEvent(layer.subcomponentProperties.name, 'subcomponentMouseUp')"
        @click="activateSubcomponentMouseEvent(layer.subcomponentProperties.name, 'subcomponentClick')">
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
      <div :id="getLayerId(layer.subcomponentProperties.name, 'overlayId')"
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
import { UseLayerComponentGeneric } from '../../../../../interfaces/useLayerComponentGeneric';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import useLayerComponentGeneric from '../compositionAPI/useLayerComponentGeneric';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import layerSections from './LayerSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
}

export default {
  setup(): Consts & UseLayerComponentGeneric {
    return {
      COMPONENT_PREVIEW_MARKER, 
      SUBCOMPONENT_OVERLAY_CLASSES,
      ...useLayerComponentGeneric(),
    };
  },
  methods: {
    getLayerShadowOverlayStyleProperties(layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] {
      return [
        layer.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        isLastLayer ? { boxShadow: CSS_PROPERTY_VALUES.UNSET } : {}
      ];
    },
    getLayerId(layerName: string, idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[layerName]?.[idType];
    },
    getLayerStyleProperties(layer: Layer, layers: Layer[], currentIndex: number): WorkshopComponentCss {
      const subcomponentCss = { ...layer.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT] };
      subcomponentCss.zIndex = layers.length - currentIndex + 1;
      if (layer.subcomponentProperties.isTemporaryAddPreview) subcomponentCss.display = 'block';
      return subcomponentCss;
    },
    getLayerClasses(layer: Layer): string[] {
      const classes = [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT];
      if (layer.subcomponentProperties.isTemporaryAddPreview) {
        classes.push(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
      return classes;
    },
    activateSubcomponentMouseEvent(layerName: string, subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
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
