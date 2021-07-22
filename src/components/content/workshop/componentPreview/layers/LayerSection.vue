<template>
  <div>
    <!-- when clicked on button text - the ripples don't fade far - this can be fixed on export, alternatively to achieve full ripple effect in the app,
         will have to disable pointer events in the layer sections and have the js class in the layer parent, will also need to find a way to be able to
         highlight the text in the subcomponent select mode -->
    <div v-for="(nestedComponent, index) in nestedComponents" :key="nestedComponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[COMPONENT_PREVIEW_MARKER, specialisedSectionContainerClass, ...getNestedComponentJs(nestedComponent)]">
      <base-component v-if="nestedComponent.subcomponentProperties.nestedComponent"
        class="nested-component-container"
        :class="[COMPONENT_PREVIEW_MARKER, ...getNestedComponentContainerJsClasses(nestedComponent)]"
        :component="nestedComponent.subcomponentProperties.nestedComponent.ref"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isNestedComponent="true"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { ComponentJavascriptClasses } from '../../../../../interfaces/componentJavascriptClasses';
import { NestedComponent } from '../../../../../interfaces/componentPreviewStructure';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER,
    };
  },
  methods: {
    getNestedComponentContainerJsClasses(nestedComponent: NestedComponent): ComponentJavascriptClasses | undefined[] {
      if (nestedComponent.subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) return [];
      return this.getNestedComponentJs(nestedComponent);
    },
    getNestedComponentJs(nestedComponent: NestedComponent): ComponentJavascriptClasses | undefined[] {
      return nestedComponent.subcomponentProperties.customFeatures?.jsClasses || [];
    }
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedComponents: Object,
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
  .nested-component-container {
    height: 100%;
  }
</style>
