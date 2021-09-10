<template>
  <div>
    <div v-if="isExpandedModalPreviewBackdropVisible()"
      ref="modalBackdrop" id="modal-backdrop"
      :style="{
        backgroundColor: currentlySelectedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.backdrop.color,
        transitionDuration: currentlySelectedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.backdrop.closeAnimationDuration
          || currentlySelectedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.backdrop.openAnimationDuration.currentValue,
        opacity: currentlySelectedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.backdrop.opacity}">
    </div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <component-list ref="componentList"
            :components="components"
            :currentlySelectedComponent="componentSelectedBeforeFadeAnimation || currentlySelectedComponent"
            :isCopyChildComponentModeActive="isCopyChildComponentModeActive"
            :currentlyHoveredComponentForCopyChild="currentlyHoveredComponentForCopyChild"
            :currentlySelectedComponentForCopyChild="currentlySelectedComponentForCopyChild"
            :copyableComponentCardOverlaysToDisplay="copyableComponentCardOverlaysToDisplay"
            @set-active-component="setActiveComponent($event)"
            @copy-component="copyComponent($event)"
            @remove-component="removeComponent($event)"
            @component-card-hovered="componentCardHovered($event)"
            @stop-editing-class-name-callback="addWorkshopEventCallback($event)"
            @prepare-new-component-modal="$refs.newComponentModal.prepare()"
            @prepare-remove-component-modal="$refs.removeComponentModal.prepare()"/>
          <div style="position: absolute; bottom: 0">
            <button type="button" style="margin-left: 7px; margin-bottom: 10px" class="btn btn-warning btn-sm">Explore icon</button>
          </div>
        </div>
        <div style="width: 70%; position: relative; z-index: 1">
          <div style="border-radius: 20px; height: 95%; width: 100%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center"> 
            <!-- USE V-MODEL when passing down a primitive, otherwise can manipulate the object via reference -->
            <!--
              use this syntax when working with multiple values v-model:currentlySelectedComponent="currentlySelectedComponent"
              https://v3.vuejs.org/guide/migration/v-model.html#_3-x-syntax
              <toolbar v-model:currentlySelectedComponent="currentlySelectedComponent"/>
              'vue/no-v-model-argument': 'off',
            -->
            <toolbar ref="toolbar"
              :component="currentlySelectedComponent"
              :componentPreviewAssistance="componentPreviewAssistance"
              @hide-dropdown-menu-callback="addWorkshopEventCallback($event)"
              @prepare-remove-child-component-modal="$refs.removeChildComponentModal.prepare($event)"
              @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
              @toggle-expanded-modal-preview-mode="$refs.contents.toggleExpandModalPreviewMode($event)"
              @toggle-full-preview-mode="$refs.contents.toggleFullPreviewMode($event, toggleFullPreviewModeOffCallback)"
              @play-animation-preview="$refs.contents.playAnimationPreview($event)"
              @stop-animation-preview="$refs.contents.stopAnimationPreview()"
              @toggle-copy-child-component-mode="toggleCopyChildComponentMode($event)"
              @add-child-component="addChildComponent($event)"
              @remove-child-component="removeChildComponent($event)"
              @change-subcomponent-order="changeSubcomponentOrder($event)"
              @change-subcomponent-alignment="changeSubcomponentAlignment($event)"
              @display-copyable-component-card-overlays="displayCopyableComponentCardOverlays($event)"/>
            <component-contents ref="contents"
              :component="currentlySelectedComponent"
              :componentPreviewAssistance="componentPreviewAssistance"
              @full-preview-mode-display-modal="addWorkshopEventCallback($event)"/>
            <div style="height: 18%; display: flex; float: right; margin-right: 10px; margin-top: 105px">
              <div style="position: relative">
                <div>
                  <!-- <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div> -->
                  <button type="button" class="btn edit-component-button" @click="exportFiles">&lt;&gt;</button>
                  <button type="button" class="btn btn-success" @click="exportFiles">&darr;</button>
                </div>
              </div>
            </div>
            <!-- <div style="height: 18%; display: flex">
              <div style="width: 30%; position: relative">
                <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                  <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div>
                  <button type="button" class="btn btn-success" @click="exportFiles">exportFiles</button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <new-component-modal
        ref="newComponentModal"
        :components="components"
        @add-component="addComponent($event)"
        @new-component-modal-callback="addWorkshopEventCallback($event)"/>
      <removal-modal-template
        ref="removeComponentModal"
        :modalId="REMOVE_COMPONENT_MODAL_ID"
        :removalModalState="removeComponentModalState"
        @remove-event="removeComponent"
        @remove-modal-template-callback="addWorkshopEventCallback($event)">
        Are you sure you want to remove this component?
      </removal-modal-template>
      <removal-modal-template
        ref="removeChildComponentModal"
        :modalId="REMOVE_CHILD_COMPONENT_MODAL_ID"
        :removalModalState="removeChildComponentModalState"
        @cancel-event="cancelSubcomponentRemovalEventHandler"
        @remove-modal-template-callback="addWorkshopEventCallback($event)">
        Are you sure you want to remove this subcomponent?
      </removal-modal-template>
    </div>
    <div id="preloadedImages"></div>
    <div :id="preloadedIconsElementId">
      <div id="preloadedIconsOverlay"></div>
      <i class="fa fa-angle-down"></i>
      <i class="fa fa-angle-double-down"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { CopyChildComponentModeCardEvents } from './toolbar/options/copyChildComponent/modeUtils/copyChildComponentModeCardEvents';
import { removeChildComponentModalState } from './utils/componentManipulation/removeChildComponent/removeChildComponentModalState';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../interfaces/settingsComponentEvents';
import { RemoveChildComponentOverlay } from './componentPreview/utils/elements/overlays/removeChildComponentOverlay';
import { CopyableComponentCardOverlaysToDisplay } from '../../../interfaces/copyableComponentCardOverlaysToDisplay';
import { ToggleCopyChildComponentModeState } from './utils/copyChildComponent/toggleCopyChildComponentModeState';
import { ToggleCopyChildComponentModeEvent } from '../../../interfaces/toggleCopyChildComponentModeEvent';
import { ToggleSubcomponentSelectModeEvent } from '../../../interfaces/toggleSubcomponentSelectModeEvent';
import { REMOVE_COMPONENT_MODAL_ID, REMOVE_CHILD_COMPONENT_MODAL_ID } from '../../../consts/elementIds';
import { SwitchComponentsWithFadeOutCallback } from '../../../interfaces/toggleFullPreviewModeEvent';
import useWorkshopEventCallbacks from './utils/workshopEventCallbacks/useWorkshopEventCallbacks';
import { ComponentManipulation } from './utils/componentManipulation/componentManipulation';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { removeComponentModalState } from './componentList/state/removeComponentModalState';
import { MASTER_SUBCOMPONENT_BASE_NAME } from '../../../consts/baseSubcomponentNames.enum';
import { ComponentCardHoveredEvent } from '../../../interfaces/componentCardHoveredEvent';
import { AddChildComponentEvent } from '../../../interfaces/addChildComponentEvent';
import { defaultDropdown } from './newComponent/types/dropdowns/generators/default';
import { WorkshopEventCallback } from '../../../interfaces/workshopEventCallback';
import exportFiles from '../../../services/workshop/exportFiles/exportFiles';
import { SUBCOMPONENT_TYPES } from '../../../consts/subcomponentTypes.enum';
import { RemovalModalState } from '../../../interfaces/removalModalState';
import { WorkshopComponent } from '../../../interfaces/workshopComponent';
import componentContents from './componentPreview/ComponentPreview.vue';
import removalModalTemplate from './templates/RemovalModalTemplate.vue';
import newComponentModal from './newComponent/NewComponentModal.vue';
import componentList from './componentList/ComponentList.vue';
import toolbar from './toolbar/Toolbar.vue';

interface Consts {
  preloadedIconsElementId: string;
  removeComponentModalState: RemovalModalState;
  removeChildComponentModalState: RemovalModalState;
  REMOVE_COMPONENT_MODAL_ID: string;
  REMOVE_CHILD_COMPONENT_MODAL_ID: string;
  SUBCOMPONENT_TYPES: typeof SUBCOMPONENT_TYPES;
}

interface Data {
  isIconsPreloaded: boolean;
  components: WorkshopComponent[];
  tempComponents: WorkshopComponent[];
  currentlySelectedComponent: WorkshopComponent;
  currentlyHoveredComponentForCopyChild: WorkshopComponent;
  currentlySelectedComponentForCopyChild: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
  workshopEventCallbacks: (() => boolean)[];
  isCopyChildComponentModeActive: boolean;
  componentSelectedBeforeFadeAnimation: WorkshopComponent;
  copyableComponentCardOverlaysToDisplay: CopyableComponentCardOverlaysToDisplay;
}

export default {
  setup(): Consts {
    return {
      preloadedIconsElementId: 'preloadedIcons',
      removeComponentModalState,
      removeChildComponentModalState,
      REMOVE_COMPONENT_MODAL_ID,
      REMOVE_CHILD_COMPONENT_MODAL_ID,
      SUBCOMPONENT_TYPES,
      ...useWorkshopEventCallbacks(),
    };
  },
  data: (): Data => ({
    isIconsPreloaded: false,
    componentPreviewAssistance: { margin: false },
    components: [
      defaultDropdown.createNewComponent(),
    ],
    tempComponents: [],
    currentlySelectedComponent: null,
    currentlyHoveredComponentForCopyChild: null,
    currentlySelectedComponentForCopyChild: null,
    componentSelectedBeforeFadeAnimation: null,
    workshopEventCallbacks: [],
    isCopyChildComponentModeActive: false,
    copyableComponentCardOverlaysToDisplay: null,
  }),
  mounted(): void {
    document.getElementById('comparecss-sidenav').style.display = 'none';
    this.preloadIcons();
    document.addEventListener('keydown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mousedown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mouseup', this.triggerWorkshopEventCallbacks);
  },
  methods: {
    displayCopyableComponentCardOverlays(copyableComponentCardOverlaysToDisplay: CopyableComponentCardOverlaysToDisplay): void {
      this.copyableComponentCardOverlaysToDisplay = copyableComponentCardOverlaysToDisplay;
    },
    addComponent(newComponent: WorkshopComponent): void {
      ComponentManipulation.addComponent(this, newComponent);
    },
    setActiveComponent(component: WorkshopComponent): void {
      ComponentManipulation.setActiveComponent(this, component);
    },
    copyComponent(component: WorkshopComponent): void {
      ComponentManipulation.copyComponent(this, component);
    },
    removeComponent(componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
      ComponentManipulation.removeComponent(this, componentToBeRemovedWithoutSelecting);
    },
    componentCardHovered(componentCardHoveredEvent: ComponentCardHoveredEvent): void {
      const [hoveredComponent, isMouseEnter] = componentCardHoveredEvent;
      if (this.isCopyChildComponentModeActive) {
        if (isMouseEnter) {
          CopyChildComponentModeCardEvents.mouseEnter(this, hoveredComponent);
        } else {
          CopyChildComponentModeCardEvents.mouseLeave(this);
        }
      }
    },
    exportFiles(): void {
      exportFiles.export(this.components);
    },
    addChildComponent(addChildComponentEvent: AddChildComponentEvent): void {
      ComponentManipulation.addChildComponent(this, addChildComponentEvent);
    },
    removeChildComponent(isTemporaryAddPreview?: boolean): void {
      ComponentManipulation.removeChildComponent(this, isTemporaryAddPreview);
    },
    changeSubcomponentOrder(moveSubcomponentEvent: ChangeSubcomponentOrderEvent): void {
      ComponentManipulation.changeSubcomponentOrder(this, ...moveSubcomponentEvent);
    },
    changeSubcomponentAlignment(changeSubcomponentAlignmentEvent: ChangeSubcomponentAlignmentEvent): void {
      ComponentManipulation.changeSubcomponentAlignment(this, ...changeSubcomponentAlignmentEvent);
    },
    toggleFullPreviewModeOffCallback(switchComponentsWithFadeOutCallback: SwitchComponentsWithFadeOutCallback,
        componentPreviewHTMLElement?: HTMLElement): void {
      if (this.componentSelectedBeforeFadeAnimation === this.currentlySelectedComponent) {
        this.componentSelectedBeforeFadeAnimation = null;
        return;
      }
      // when a different component card has been selected during temporary button view (modal), this call selects the new
      // subcomponent after the fadeout timer, but does not fade out the actual component preview element itself as 
      // componentPreviewHTMLElement is undefined and the fading for it is done in modal/ToggleOff.start
      switchComponentsWithFadeOutCallback(componentPreviewHTMLElement, ComponentManipulation.setActiveComponent.bind(this, this));
    },
    cancelSubcomponentRemovalEventHandler(): void {
      RemoveChildComponentOverlay.hide(this.currentlySelectedComponent.activeSubcomponentName);
    },
    preloadIcons(): void {
      const WAIT_TO_START_DOWNLOADING_ICON_ICONS_MILLISECONDS = 5;
      if (!this.isIconsPreloaded) {
        setTimeout(() => {
          document.getElementById(this.preloadedIconsElementId).style.display = 'none';
          this.isIconsPreloaded = true;
        }, WAIT_TO_START_DOWNLOADING_ICON_ICONS_MILLISECONDS);
      }
    },
    toggleSubcomponentSelectMode(toggleSubcomponentSelectModeEvent: ToggleSubcomponentSelectModeEvent): void {
      const [SubcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, optionsSubcomponentNameClickedFunc] = toggleSubcomponentSelectModeEvent;
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: SubcomponentSelectModeCallbackFunction.bind(this,
        buttonElement, optionsSubcomponentNameClickedFunc, this.$refs.contents.toggleSubcomponentSelectMode)};
      this.addWorkshopEventCallback(workshopEventCallback); 
      this.$refs.contents.toggleSubcomponentSelectMode(true);
    },
    toggleCopyChildComponentMode(event: ToggleCopyChildComponentModeEvent): void {
      ToggleCopyChildComponentModeState.toggle(this, event);
    },
    isExpandedModalPreviewBackdropVisible(): boolean {
      const { subcomponents } = this.currentlySelectedComponent || {};
      if (subcomponents) {
        return subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE].customFeatures?.backdrop?.visible;
      }
      return false;
    }
  },
  components: {
    removalModalTemplate,
    newComponentModal,
    componentContents,
    componentList,
    toolbar,
  }
}
</script>

<style lang="css" scoped>
  .edit-component-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  #preloadedImages {
    /* this is used to preload images when the workshop component is rendered instead of attempting to fetch them exactly when
       they are needed - which causes flickering. Downloading these images in run-time by appending <img> tags to the head
       element does not work because those images need to be in the public folder. The svgs referenced in the css within
       the <styles> tags are located in the src file but are referenced with a unique file hash during compile time */
    background: url('../../../assets/svg/plus.svg'),
                url('../../../assets/svg/rubbish-can-default.svg'),
  }
  #preloadedIcons {
    /* originally used the browser to preload the font awesome styles, however this is not supported in FireFox:
      <link rel="preload" as="style" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" onload="this.rel='stylesheet'">
      <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="https://use.fontawesome.com/releases/v5.0.12/webfonts/fa-solid-900.woff2">*/
    top: 0;
    position: absolute;
  }
  #preloadedIconsOverlay {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
  }
  #modal-backdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    transition-property: opacity;
    transition-timing-function: linear;
  }
</style>
