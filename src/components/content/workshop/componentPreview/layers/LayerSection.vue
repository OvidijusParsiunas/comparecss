<template>
  <div>
    <!-- when clicked on button text - the ripples don't fade far - this can be fixed on export, alternatively to achieve full ripple effect in the app,
         will have to disable pointer events in the layer sections and have the js class in the layer parent, will also need to find a way to be able to
         highlight the text in the subcomponent select mode -->
    <div v-for="(nestedSubcomponent, index) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[COMPONENT_PREVIEW_MARKER, specialisedSectionContainerClass, ...getNestedSubcomponentJs(nestedSubcomponent)]">
      <base-component v-if="nestedSubcomponent.subcomponentProperties.nestedComponent"
        class="nested-component-container"
        :class="[COMPONENT_PREVIEW_MARKER, ...getNestedComponentContainerJsClasses(nestedSubcomponent)]"
        :component="nestedSubcomponent.subcomponentProperties.nestedComponent.ref"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isNestedComponent="true"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { ComponentJavascriptClasses } from '../../../../../interfaces/componentJavascriptClasses';
import { NestedSubcomponent } from '../../../../../interfaces/componentPreviewStructure';
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
    getNestedComponentContainerJsClasses(nestedSubcomponent: NestedSubcomponent): ComponentJavascriptClasses | undefined[] {
      if (nestedSubcomponent.subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) return [];
      return this.getNestedSubcomponentJs(nestedSubcomponent);
    },
    getNestedSubcomponentJs(nestedSubcomponent: NestedSubcomponent): ComponentJavascriptClasses | undefined[] {
      return nestedSubcomponent.subcomponentProperties.customFeatures?.jsClasses || [];
    }
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedSubcomponents: Object,
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
