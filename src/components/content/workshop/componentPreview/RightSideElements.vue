<template>
  <div class="right-side-element-parent-container">
    <div v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.center" style="position: absolute; width: 100%; text-align: center; transform: translateY(-50%); top: 50%; display: flex; justify-content: center; height: 100%; z-index: 1; pointer-events: none;">
            <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents.alignedSections.center" :key="nestedSubcomponent"
              style="height: 100%; background-color: green; display: flex; justify-content: center; pointer-events: all"
              :style="[
              {
              marginLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginLeft : '0px',
              marginRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginRight : '0px'},
              {order: `${index}`}]">
          <div v-if="name === PSEUDO_COMPONENTS.TEXT" style="position: relative; display: inline-table;" class="close-button right-side-element">{{ nestedSubcomponent }}</div>
<div v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" style="height: 100%; box-sizing: content-box;" :style="{
  width: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].width : '0px',
              paddingLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingLeft : '0px',
              paddingRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingRight : '0px',}">
          </div>
<button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button right-side-element" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
          @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
          @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
          @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
          @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
          :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
            ? [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
              ]
            : [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
              ]"
          >{{nestedSubcomponent.componentText || ''}}
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          class="right-side-element"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
          </div>
      </div>
    <div class="right-side-element-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button" style="height: 100%; display: flex">
      <!-- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Ordering_Flex_Items -->
      <!-- create a number of columns by just creating flex items with order 0 1 2 3 and so on - (done) -->
      <!-- maybe each flex section should be selectable -->
      <!-- if we want a text title - create absolute for it so it wouldn't get affected by other things
        usually sections will be split into equal lengths and if center is required they will all be centered
      -->

<!-- left -->
<div v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.left" style="display: flex; order: 0; height: 100%">
            <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents.alignedSections.left" :key="nestedSubcomponent"
              style="height: 100%; background-color: green; display: inline-flex;"
              :style="[
              {
              marginLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginLeft : '0px',
              marginRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginRight : '0px'},
              {order: `${index}`}]">
              <div v-if="name === PSEUDO_COMPONENTS.TEXT" style="position: relative; display: inline-table;" class="close-button right-side-element">{{ nestedSubcomponent }}</div>
<div v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" style="height: 100%; box-sizing: content-box;" :style="{
  width: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].width : '0px',
              paddingLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingLeft : '0px',
              paddingRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingRight : '0px'
              }"></div>
<button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button right-side-element" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
          @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
          @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
          @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
          @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
          :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
            ? [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
              ]
            : [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
              ]"
          >{{nestedSubcomponent.componentText || ''}}
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          class="right-side-element"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
          </div>
        </div>

        <!-- right -->
        <div v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.right" style="display: flex; order: 1; height: 100%; margin-left: auto">
            <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents.alignedSections.right" :key="nestedSubcomponent"
              style="height: 100%; background-color: green; display: inline-flex;"
              :style="[
              {
              marginLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginLeft : '0px',
              marginRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginRight : '0px'},
              {order: `${index}`}]">
              <div v-if="name === PSEUDO_COMPONENTS.TEXT" style="position: relative; display: inline-table;" class="close-button right-side-element">{{ nestedSubcomponent }}</div>
<div v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" style="height: 100%; box-sizing: content-box;" :style="{
  width: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].width : '0px',
              paddingLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingLeft : '0px',
              paddingRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingRight : '0px'
              }"></div>
<button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button right-side-element" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
          @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
          @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
          @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
          @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
          :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
            ? [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
              ]
            : [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
              ]"
          >{{nestedSubcomponent.componentText || ''}}
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          class="right-side-element"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
          </div>
        </div>
        
        <!-- example for the equal split sections -->
        <!-- <div style="display: flex; order: 0; height: 100%; flex: 1 1 0px">
          <button>
            sdfi
          </button>
          <button>
            sdfi
          </button>
        </div>
        <div style="display: flex; order: 1; height: 100%; flex: 1 1 0px">
            <div v-for="(nestedSubcomponent, name, index) in nestedSubcomponents.text" :key="nestedSubcomponent" style="height: 100%; background-color: green; display: flex" :style="{order: `${index}`}">
          <div v-if="name === PSEUDO_COMPONENTS.TEXT" style="position: relative; display: inline-table;" class="close-button right-side-element">{{ nestedSubcomponent }}</div>
        </div>
            <div v-for="(nestedSubcomponent, name) in nestedSubcomponents.subcomponents" :key="nestedSubcomponent"
              style="height: 100%; background-color: green; display: inline-flex;"
              :style="[
              {
              marginLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginLeft : '0px',
              marginRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].marginRight : '0px'}]">
<div style="height: 100%; box-sizing: content-box;" :style="{
  width: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].width : '0px',
              paddingLeft: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingLeft : '0px',
              paddingRight: (name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE) ? nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].paddingRight : '0px'
              }"></div>
<button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button right-side-element" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
          @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
          @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
          @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
          @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
          :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
            ? [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
              ]
            : [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
              ]"
          >{{nestedSubcomponent.componentText || ''}}
        </button>
        <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          class="right-side-element"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
          </div>
        </div>
        <div style="display: flex; order: 2; height: 100%; flex: 1 1 0px">
          <button>
            sdfi
          </button>
          <button>
            sdfi
          </button>
        </div> -->

      <!-- <div v-for="(nestedSubcomponent, name) in nestedSubcomponents" :key="nestedSubcomponent" style="height: 100%"> -->
        <!-- <button v-if="name === SUB_COMPONENTS.CLOSE" aria-hidden="true"
          :id="subcomponentAndOverlayElementIds[name].subcomponentId"
          class="close-button" :class="[ ...((nestedSubcomponent.customFeatures && nestedSubcomponent.customFeatures.jsClasses) || []) ]"
          @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseEnter()"
          @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseLeave()"
          @mousedown="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseDown()"
          @mouseup="mouseEvents[subcomponentAndOverlayElementIds[name].subcomponentId].subcomponentMouseUp()"
          :style="nestedSubcomponent.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
            ? [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
              ]
            : [
                [ nestedSubcomponent.inheritedCss ? nestedSubcomponent.inheritedCss.css: '' ],
                nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
                nestedSubcomponent.customCss[nestedSubcomponent.customCssActiveMode],
              ]"
          >{{nestedSubcomponent.componentText || ''}}
        </button> -->
        <!-- <button v-if="name === SUB_COMPONENTS.BUTTON_1 || name === SUB_COMPONENTS.BUTTON_2 || name === SUB_COMPONENTS.CLOSE" 
          :id="subcomponentAndOverlayElementIds[name].overlayId"
          style="display: none" :style="nestedSubcomponent.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
          :class="OVERLAY_DEFAULT_CLASS">
        </button>
        <div v-if="name === PSEUDO_COMPONENTS.TEXT">{{ nestedSubcomponent }}</div> -->
      <!-- </div> -->
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  PSEUDO_COMPONENTS;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
      PSEUDO_COMPONENTS,
      SUB_COMPONENTS,
    };
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedSubcomponents: Object,
    mouseEvents: Object,
  }
}
</script>

<style lang="css" scoped>
  /* this will need to be inherited css */
  .close-button {
    position: relative;
    overflow: hidden;
  }
  .right-side-element-parent-container {
    position: relative;
    height: 100%;
  }
  .right-side-element-parent {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: max-content;
    min-width: 100%;
    text-align: right;
  }
  .right-side-element {
    position: absolute;
    transform: translateY(-50%);
    top: 50% !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  #close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
  }
</style>
