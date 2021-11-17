<template>
  <div>
    <!-- when clicked on button text - the ripples don't fade far - this can be fixed on export, alternatively to achieve full ripple effect in the app,
         will have to disable pointer events in the layer sections and have the js class in the layer parent, will also need to find a way to be able to
         highlight the text in the subcomponent select mode -->
    <div v-for="(component, index) in components" :key="component"
      :style="getStyleProperties(component.baseSubcomponent, index)"
      class="component-element-container"
      :class="[COMPONENT_PREVIEW_MARKER, specialisedSectionContainerClass, ...getChildComponentJs(component.baseSubcomponent)]">
      <base-component v-if="component"
        class="child-component-container"
        :class="[COMPONENT_PREVIEW_MARKER, ...getChildComponentContainerJsClasses(component.baseSubcomponent)]"
        :component="component.paddingComponentChild || component"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isChildComponent="true"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { UseLayerAlignmentSectionComponent } from '../../../../../interfaces/useLayerAlignmentSectionComponent';
import useLayerAlignmentSectionComponent from '../compositionAPI/useLayerSectionComponent';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { Subcomponent } from '../../../../../interfaces/workshopComponent';
import { SetUtils } from '../../utils/generic/setUtils';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
}

export default {
  setup(): Consts & UseLayerAlignmentSectionComponent {
    return {
      COMPONENT_PREVIEW_MARKER,
      ...useLayerAlignmentSectionComponent(),
    };
  },
  methods: {
    getChildComponentContainerJsClasses(subcomponent: Subcomponent): string[] {
      if (subcomponent.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) return [];
      return this.getChildComponentJs(subcomponent);
    },
    getChildComponentJs(subcomponent: Subcomponent): string[] {
      const { customFeatures, customStaticFeatures } = subcomponent;
      return SetUtils.transformSetsToOneDimensionalArray(customFeatures?.jsClasses, customStaticFeatures?.jsClasses);
    }
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    components: Object,
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
  .component-element-container {
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
