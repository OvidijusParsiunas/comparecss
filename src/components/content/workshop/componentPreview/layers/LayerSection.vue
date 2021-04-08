<template>
  <div>
    <!-- WORK3: the if statement for jsClasses in close subcomponent can be closed once types are introduced or close subcomponent converted into a subcomponent -->
    <div v-for="(nestedSubcomponent, index, name) in nestedSubcomponents" :key="nestedSubcomponent"
      :style="{order: `${index}`}"
      class="subcomponent-element-container"
      :class="[specialisedSectionContainerClass,
        ...(name !== CORE_SUBCOMPONENTS_NAMES.CLOSE && nestedSubcomponent.subcomponentProperties.customFeatures
          && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses || [])]">
      <base-component v-if="nestedSubcomponent.subcomponentProperties.importedComponent"
        class="imported-component-container"
        :component="nestedSubcomponent.subcomponentProperties.importedComponent"
        :mouseEvents="mouseEvents"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :isImportedComponent="true"/>
      <component v-else-if="!nestedSubcomponent.subcomponentProperties.optionalSubcomponent
          || nestedSubcomponent.subcomponentProperties.optionalSubcomponent.currentlyDisplaying
          || nestedSubcomponent.subcomponentProperties.optionalSubcomponent.displayOverlayOnly"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        aria-hidden="true"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId"
        class="subcomponent-element"
        :class="[ ...((nestedSubcomponent.subcomponentProperties.customFeatures && nestedSubcomponent.subcomponentProperties.customFeatures.jsClasses) || []) ]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[nestedSubcomponent.name].subcomponentId].subcomponentMouseUp()"
        :style="nestedSubcomponent.subcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
          ? [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss ? nestedSubcomponent.subcomponentProperties.inheritedCss.css: '' ],
              nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
              nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.HOVER],
              nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.CLICK],
            ]
          : [
              [ nestedSubcomponent.subcomponentProperties.inheritedCss ? nestedSubcomponent.subcomponentProperties.inheritedCss.css: '' ],
              nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
              nestedSubcomponent.subcomponentProperties.customCss[nestedSubcomponent.subcomponentProperties.activeCssPseudoClass],
            ]"
        >{{(!nestedSubcomponent.subcomponentProperties.optionalSubcomponent || !nestedSubcomponent.subcomponentProperties.optionalSubcomponent.displayOverlayOnly)
            && nestedSubcomponent.subcomponentProperties.componentText ? nestedSubcomponent.subcomponentProperties.componentText : '' }}
      </component>
      <component v-if="!nestedSubcomponent.subcomponentProperties.importedComponent"
        :is="nestedSubcomponent.subcomponentProperties.componentTag"
        :id="subcomponentAndOverlayElementIds[nestedSubcomponent.name].overlayId"
        :style="[
          nestedSubcomponent.subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
          {display: 'none'}, {color: '#ff000000'}]"
        class="subcomponent-element"
        :class="OVERLAY_DEFAULT_CLASS">
          {{nestedSubcomponent.subcomponentProperties.componentText ? nestedSubcomponent.subcomponentProperties.componentText : ''}}
      </component>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  CORE_SUBCOMPONENTS_NAMES: typeof CORE_SUBCOMPONENTS_NAMES;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      CORE_SUBCOMPONENTS_NAMES,
      CSS_PSEUDO_CLASSES,
    };
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
  /* use this to position the close button correctly */
  /*#close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  } */
  /*
  .close-button {
    position: relative;
    overflow: hidden;
  } */
  /* this will need to be inherited css */
  .center-section-container {
    justify-content: center;
    pointer-events: all;
  }
  .equal-split-section-container {
    flex: 1 1 0px;
    justify-content: center;
  }
  .subcomponent-element-container {
    height: 100%;
    display: flex;
    place-items: baseline;
  }
  .subcomponent-element {
    position: relative;
    transform: translateY(-50%);
    position: relative;
    overflow: hidden;
    /* may need to be set in the style tag if working with vertically stacked subcomponents */
    margin-top: unset !important;
    margin-bottom: unset !important;
  }
  .imported-component-container {
    height: 100%;
  }
</style>
