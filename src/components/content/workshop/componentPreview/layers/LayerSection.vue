<template>
  <div>
    <!-- when clicked on button text - the ripples don't fade far - this can be fixed on export, alternatively to achieve full ripple effect in the app,
         will have to disable pointer events in the layer sections and have the js class in the layer parent, will also need to find a way to be able to
         highlight the text in the subcomponent select mode -->
    <div v-for="(subcomponent, index) in subcomponents" :key="subcomponent"
      :style="generateStyleProperties(subcomponent.subcomponentProperties, index)"
      class="subcomponent-element-container"
      :class="[COMPONENT_PREVIEW_MARKER, specialisedSectionContainerClass, ...getChildComponentJs(subcomponent)]">
      <base-component v-if="subcomponent.subcomponentProperties.seedComponent"
        class="child-component-container"
        :class="[COMPONENT_PREVIEW_MARKER, ...getChildComponentContainerJsClasses(subcomponent)]"
        :component="subcomponent.subcomponentProperties.seedComponent"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isChildComponent="true"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { ComponentJavascriptClasses } from '../../../../../interfaces/componentJavascriptClasses';
import { UseLayerSectionComponent } from '../../../../../interfaces/useLayerSectionComponent';
import { BaseSubcomponentRef } from '../../../../../interfaces/componentPreviewStructure';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import useLayerSectionComponent from '../compositionAPI/useLayerSectionComponent';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
}

export default {
  setup(): Consts & UseLayerSectionComponent {
    return {
      COMPONENT_PREVIEW_MARKER,
      ...useLayerSectionComponent(),
    };
  },
  methods: {
    getChildComponentContainerJsClasses(subcomponent: BaseSubcomponentRef): ComponentJavascriptClasses | undefined[] {
      if (subcomponent.subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) return [];
      return this.getChildComponentJs(subcomponent);
    },
    getChildComponentJs(layerBaseSubcomponent: BaseSubcomponentRef): ComponentJavascriptClasses | undefined[] {
      return layerBaseSubcomponent.subcomponentProperties.customFeatures?.jsClasses || [];
    }
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    subcomponents: Object,
    mouseEvents: Object,
    specialisedSectionContainerClass: String,
  },
}
</script>

<style lang="css" scoped>
  .center-section-container {
    justify-content: center;
    pointer-events: all;
  }
  .equal-split-section-container {
    flex: 1 1 0px;
    justify-content: center;
  }
  .subcomponent-element-container {
    width: 100%;
    height: 100%;
    display: flex;
    place-items: baseline;
    position: relative;
  }
  .child-component-container {
    height: 100%;
  }
</style>
