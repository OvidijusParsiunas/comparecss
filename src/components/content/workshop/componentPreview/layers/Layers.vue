<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="(layer, index) in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div :id="getLayerId(layer.subcomponent.name, 'subcomponentId')"
        :style="getComponentStyleProperties(layer, Number(index) === layers.length - 1)"
        :class="[...jsClasses, COMPONENT_PREVIEW_MARKER]"
        @mouseenter="activateSubcomponentMouseEvent(layer.subcomponent.name, 'subcomponentMouseEnter')"
        @mouseleave="activateSubcomponentMouseEvent(layer.subcomponent.name, 'subcomponentMouseLeave')"
        @mousedown="activateSubcomponentMouseEvent(layer.subcomponent.name, 'subcomponentMouseDown')"
        @mouseup="activateSubcomponentMouseEvent(layer.subcomponent.name, 'subcomponentMouseUp')"
        @click="activateSubcomponentMouseEvent(layer.subcomponent.name, 'subcomponentClick')">
          <layer-alignment-sections
            v-if="layer.alignmentSectionToComponents"
            :class="COMPONENT_PREVIEW_MARKER"
            :jsClasses="jsClasses"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :alignmentSectionToComponents="layer.alignmentSectionToComponents"
            :mouseEvents="mouseEvents"/>
      </div>
      <!-- zIndex is used for the shadow and overlay to be placed above the next layer's border -->
      <div :style="{ zIndex: layers.length - Number(index) + 1 }"
        class="layer-shadow-overlay-container"
        :class="SUBCOMPONENT_OVERLAY_CLASSES.BASE">
          <div :style="getLayerShadowOverlayStyleProperties(layer, Number(index) === layers.length - 1)"
            class="layer-shadow-overlay"></div>
      </div>
      <div :id="getLayerId(layer.subcomponent.name, 'overlayId')"
        style="display: none"
        :style="getOverlayStyleProperties(layer, Number(index))"
        :class="getLayerCssClasses(layer)"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { UseLayerComponent } from '../../../../../interfaces/useLayerComponent';
import { CompositionAPIUtils } from '../../compositionAPI/compositionAPIUtils';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';
import useLayerComponent from '../compositionAPI/useLayerComponent';
import layerAlignmentSections from './LayerAlignmentSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  SUBCOMPONENT_OVERLAY_CLASSES: typeof SUBCOMPONENT_OVERLAY_CLASSES;
}

interface Props {
  layers: Layer[];
  jsClasses: string[];
  mouseEvents: SubcomponentPreviewMouseEvents;
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
}

export default {
  setup(props: Props): Consts & UseLayerComponent {
    const useLayerComponentCompositionAPI = CompositionAPIUtils.createCompositionAPI(useLayerComponent, props, ['layers']);
    return {
      COMPONENT_PREVIEW_MARKER, 
      SUBCOMPONENT_OVERLAY_CLASSES,
      ...useLayerComponentCompositionAPI,
    };
  },
  methods: {
    getLayerShadowOverlayStyleProperties(layer: Layer, isLastLayer: boolean): WorkshopComponentCss[] {
      return [
        layer.subcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        isLastLayer ? { boxShadow: CSS_PROPERTY_VALUES.UNSET } : {}
      ];
    },
    getLayerId(layerName: string, idType: keyof SubcomponentAndOverlayElementIds[string]): string {
      return this.subcomponentAndOverlayElementIds[layerName]?.[idType];
    },
    activateSubcomponentMouseEvent(layerName: string, subcomponentMouseEvent: keyof UseSubcomponentPreviewEventHandlers): void {
      const layerId = this.getLayerId(layerName, 'subcomponentId');
      return layerId && this.mouseEvents[layerId][subcomponentMouseEvent]()
    },
  },
  components: {
    layerAlignmentSections,
  },
  props: {
    layers: Object,
    jsClasses: Array,
    mouseEvents: Object,
    subcomponentAndOverlayElementIds: Object,
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
