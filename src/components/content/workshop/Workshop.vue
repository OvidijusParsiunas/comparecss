<template>
  <div>
    <div v-if="isExpandedModalPreviewBackdropVisible()"
      ref="modalBackdrop" id="modal-backdrop"
      :style="{
        backgroundColor: currentlySelectedComponent.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.color,
        transitionDuration: currentlySelectedComponent.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.exitAnimationDuration
          || currentlySelectedComponent.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.entranceAnimationDuration.currentValue,
        opacity: currentlySelectedComponent.subcomponents[BASE_SUB_COMPONENT].customFeatures.backdrop.opacity}">
    </div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <component-list ref="componentList"
            :components="components"
            :currentlySelectedComponent="currentlySelectedComponent"
            :isImportComponentModeActive="isImportComponentModeActive"
            :currentlyHoveredImportComponent="currentlyHoveredImportComponent"
            :currentlySelectedImportComponent="currentlySelectedImportComponent"
            @component-card-selected="selectComponentCard($event)"
            @component-card-hovered="hoverComponentCard($event)"
            @component-card-copied="copyComponentCard($event)"
            @component-card-removed="removeComponentCard($event)"
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
              @prepare-remove-subcomponent-modal="$refs.removeSubcomponentModal.prepare($event)"
              @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
              @toggle-expanded-modal-preview-mode="$refs.contents.toggleExpandModalPreviewMode($event)"
              @toggle-full-preview-mode="$refs.contents.toggleFullPreviewMode($event)"
              @play-modal-animation-preview="$refs.contents.playModalAnimationPreview($event)"
              @stop-modal-animation-preview="$refs.contents.stopAnimationPreview()"
              @toggle-import-subcomponent-mode="toggleImportComponentMode($event)"/>
            <component-contents ref="contents"
              :component="currentlySelectedComponent"
              :componentPreviewAssistance="componentPreviewAssistance"
              @full-preview-mode-display-modal="addWorkshopEventCallback($event)"/>
            <div style="height: 18%; display: flex; float: right; margin-right: 10px; margin-top: 105px">
              <div style="position: relative">
                <div>
                  <!-- <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div> -->
                  <button type="button" class="btn btn-outline-secondary edit-component-button" @click="exportFiles">&lt;&gt;</button>
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
        @add-new-component="addNewComponent($event)"
        @new-component-modal-callback="addWorkshopEventCallback($event)"/>
      <removal-modal-template
        ref="removeComponentModal"
        :modalId="REMOVE_COMPONENT_MODAL_ID"
        :removalModalState="removeComponentModalState"
        @remove-event="removeComponentCard"
        @remove-modal-template-callback="addWorkshopEventCallback($event)">
        Are you sure you want to remove this component?
      </removal-modal-template>
      <removal-modal-template
        ref="removeSubcomponentModal"
        :modalId="REMOVE_SUBCOMPONENT_MODAL_ID"
        :removalModalState="removeSubcomponentModalState"
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
import { modalLayerBottomSpecificSettings } from './newComponent/types/modals/properties/modalLayerBottomSpecificSettings';
import { removeSubcomponentModalState } from './toolbar/options/removeSubcomponentModalState/removeSubcomponentModalState';
import getModalSubcomponentDropdownStructure from './newComponent/types/modals/properties/subcomponentDropdownStructure'
import { MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../../../consts/modalAnimationTypes.enum';
import SubcomponentToggleOverlayUtils from './toolbar/options/subcomponentToggleUtils/subcomponentToggleOverlayUtils';
import { modalLayerTopSpecificSettings } from './newComponent/types/modals/properties/modalLayerTopSpecificSettings';
import { ToggleImportComponentModeState } from './utils/workshopImportComponent/toggleImportComponentModeState';
import { inheritedAlertBaseChildCss } from './newComponent/types/alerts/properties/inheritedAlertBaseChildCss';
import { modalBaseSpecificSettings } from './newComponent/types/modals/properties/modalBaseSpecificSettings';
import { modalTextSpecificSettings } from './newComponent/types/modals/properties/modalTextSpecificSettings'
import { ToggleSubcomponentSelectModeEvent } from '../../../interfaces/toggleSubcomponentSelectModeEvent';
import { ImportedComponentGenerator } from './utils/workshopImportComponent/importedComponentGenerator';
import ComponentManipulationUtils from './utils/componentManipulationUtils/componentManipulationUtils';
import { REMOVE_COMPONENT_MODAL_ID, REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../consts/elementIds';
import { ToggleImportComponentModeEvent } from '../../../interfaces/toggleImportComponentModeEvent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../consts/layerSections.enum';
import { EntityDisplayStatusUtils } from './utils/entityDisplayStatus/entityDisplayStatusUtils';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../consts/subcomponentOverlayClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../interfaces/workshopEventCallbackReturn';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { inheritedAlertBaseCss } from './newComponent/types/alerts/properties/inheritedCss';
import { removeComponentModalState } from './componentList/state/removeComponentModalState';
import { ComponentCardHoveredEvent } from '../../../interfaces/componentCardHoveredEvent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../consts/coreSubcomponentNames.enum';
import { WorkshopEventCallback } from '../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../consts/domEventTriggerKeys.enum';
import { closeButton } from './newComponent/types/buttons/properties/closeButton';
import { CSS_PSEUDO_CLASSES } from '../../../consts/subcomponentCssClasses.enum';
import { defaultButton } from './newComponent/types/buttons/properties/default';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import exportFiles from '../../../services/workshop/exportFiles/exportFiles';
import { SUBCOMPONENT_TYPES } from '../../../consts/subcomponentTypes.enum';
import PreviewStructure from './utils/componentGenerator/previewStructure'
import { RemovalModalState } from '../../../interfaces/removalModalState';
import componentContents from './componentPreview/ComponentPreview.vue';
import removalModalTemplate from './templates/RemovalModalTemplate.vue';
import newComponentModal from './newComponent/NewComponentModal.vue';
import componentList from './componentList/ComponentList.vue';
import toolbar from './toolbar/Toolbar.vue';
import {
  CustomCss, ModalAnimations, ComponentCenteringInParent, CustomFeatures, Text, CustomStaticFeatures,
  AutoWidth, BackdropProperties,  AlignedLayerSection, WorkshopComponent, Subcomponents,
} from '../../../interfaces/workshopComponent';

interface Consts {
  preloadedIconsElementId: string;
  removeComponentModalState: RemovalModalState;
  removeSubcomponentModalState: RemovalModalState;
  REMOVE_COMPONENT_MODAL_ID: string;
  REMOVE_SUBCOMPONENT_MODAL_ID: string;
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
}

interface Data {
  isIconsPreloaded: boolean;
  components: WorkshopComponent[];
  tempComponents: WorkshopComponent[];
  currentlySelectedComponent: WorkshopComponent;
  currentlyHoveredImportComponent: WorkshopComponent;
  currentlySelectedImportComponent: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
  workshopEventCallbacks: (() => boolean)[];
  isImportComponentModeActive: boolean;
}

function createDefaultModalAnimationsProperties(): ModalAnimations {
  return {
    entrance: {
      type: MODAL_ANIMATION_ENTRANCE_TYPES.FADE_IN,
      duration: '0.3s',
      delay: '0.15s',
    },
    exit: {
      type: MODAL_ANIMATION_EXIT_TYPES.FADE_OUT,
      duration: '0.25s',
    },
  };
}

function createDefaultComponentCenteringInParent(): ComponentCenteringInParent {
  return {
    vertical: true,
    horizontal: true,
  };
}

function createDefaultBackdropProperties(): BackdropProperties {
  return {
    color: '#6d6d6dcc',
    alpha: 0.8,
    entranceAnimationDuration: {
      currentValue: '0.45s',
      lastSelectedValue: '0.45s',
      isAuto: true,
    },
    opacity: 0,
    visible: false,
    closeTriggers: {
      enter: false,
      escape: false,
      backdrop: false,
    },
  };
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    componentCenteringInParent: createDefaultComponentCenteringInParent(),
    modalAnimations: createDefaultModalAnimationsProperties(),
    backdrop: createDefaultBackdropProperties(),
  };
}

function createAlignedLayerSection(section: ALIGNED_SECTION_TYPES): AlignedLayerSection {
  return { section };
}

function createAutoWidth(): AutoWidth {
  return {
    auto: true,
  };
}

function createDefaultText1CustomFeatures(): CustomFeatures {
  return {
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createText(text: string): Text {
  return { text };
}

function createDefaultText1CustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Modal title'),
  }
}

function createDefaultText2CustomFeatures(): CustomFeatures {
  return {
    autoWidth: createAutoWidth(),
    alignedLayerSection: createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
  };
}

function createDefaultText2CustomStaticFeatures(): CustomStaticFeatures {
  return {
    subcomponentText: createText('Modal body text'),
  }
}

function createDefaultBaseCss(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      color: '#004085',
      backgroundColor: '#ffffff',
      borderColor: '#00000033',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      width: '450px',
      boxSizing: 'unset',
      boxShadow: 'unset',
      top: '0px',
    },
  };
}

function createDefaultLayer1Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#e9ecef',
      backgroundColor: 'inherit',
      boxShadow: 'unset',
    },
  };
}

function createDefaultLayer2Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      backgroundColor: 'inherit',
    },
  };
}

function createDefaultLayer3Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'right',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: '#e9ecef',
      backgroundColor: 'inherit',
      boxShadow: 'unset',
    },
  };
}

function createDefaultText1Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      fontWeight: '500',
      fontSize: '20px',
      fontFamily: '"Poppins", sans-serif',
      color: '#004085',
      textAlign: 'left',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  };
}

function createDefaultText2Css(): CustomCss {
  return {
    [CSS_PSEUDO_CLASSES.DEFAULT]: {
      top: '50%',
      width: 'max-content',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
      textAlign: 'left',
      backgroundColor: 'inherit',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
  };
}

function createSubcomponents(): Subcomponents {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: createDefaultBaseCss(),
      defaultCss: createDefaultBaseCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: modalBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_1,
      customCss: createDefaultLayer1Css(),
      defaultCss: createDefaultLayer1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_2,
      customCss: createDefaultLayer2Css(),
      defaultCss: createDefaultLayer2Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
      subcomponentType: SUBCOMPONENT_TYPES.LAYER_3,
      customCss: createDefaultLayer3Css(),
      defaultCss: createDefaultLayer3Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
      layerSectionsType: LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultText1Css(),
      defaultCss: createDefaultText1Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText1CustomFeatures(),
      defaultCustomFeatures: createDefaultText1CustomFeatures(),
      customStaticFeatures: createDefaultText1CustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultText1CustomStaticFeatures(),
    },
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: {
      subcomponentType: SUBCOMPONENT_TYPES.TEXT,
      componentTag: 'div',
      customCss: createDefaultText2Css(),
      defaultCss: createDefaultText2Css(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      subcomponentDisplayStatus: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus(),
      subcomponentSpecificSettings: modalTextSpecificSettings,
      customFeatures: createDefaultText2CustomFeatures(),
      defaultCustomFeatures: createDefaultText2CustomFeatures(),
      customStaticFeatures: createDefaultText2CustomStaticFeatures(),
      defaultCustomStaticFeatures: createDefaultText2CustomStaticFeatures(),
    },
  };
}

function createNewComponent(): WorkshopComponent {
  const importedCloseButtonName = CORE_SUBCOMPONENTS_NAMES.CLOSE;
  const importedButton1Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_1;
  const importedButton2Name = CORE_SUBCOMPONENTS_NAMES.BUTTON_2;
  const subcomponents = { ...createSubcomponents(),
    ...ImportedComponentGenerator.createImportedComponents(closeButton, importedCloseButtonName, 1),
    ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton1Name, 2, 'Submit'),
    ...ImportedComponentGenerator.createImportedComponents(defaultButton, importedButton2Name, 3, 'Cancel') };
  const subcomponentDropdownStructure = getModalSubcomponentDropdownStructure(
    subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_2], subcomponents[CORE_SUBCOMPONENTS_NAMES.LAYER_3],
    subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_1], subcomponents[CORE_SUBCOMPONENTS_NAMES.TEXT_2],
    ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedCloseButtonName),
    ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton1Name),
    ImportedComponentGenerator.createImportedComponentStructure(subcomponents, importedButton2Name),
  );
  return {
    type: NEW_COMPONENT_TYPES.MODAL,
    subcomponents,
    activeSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    defaultSubcomponentName: CORE_SUBCOMPONENTS_NAMES.BASE,
    componentPreviewStructure: PreviewStructure.createComponentPreviewStructure(subcomponentDropdownStructure, subcomponents),
    className: 'default-class-name',
    componentStatus: { isRemoved: false },
  };
}

export default {
  setup(): Consts {
    return {
      preloadedIconsElementId: 'preloadedIcons',
      removeComponentModalState,
      removeSubcomponentModalState,
      REMOVE_COMPONENT_MODAL_ID,
      REMOVE_SUBCOMPONENT_MODAL_ID,
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
     };
  },
  data: (): Data => ({
    isIconsPreloaded: false,
    componentPreviewAssistance: { margin: false },
    components: [
      createNewComponent(),
    ],
    tempComponents: [],
    currentlySelectedComponent: null,
    currentlyHoveredImportComponent: null,
    currentlySelectedImportComponent: null,
    workshopEventCallbacks: [],
    isImportComponentModeActive: false,
  }),
  mounted(): void {
    document.getElementById('comparecss-sidenav').style.display = 'none';
    this.preloadIcons();
    document.addEventListener('keydown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mousedown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mouseup', this.triggerWorkshopEventCallbacks);
  },
  methods: {
    addNewComponent(newComponent: WorkshopComponent): void {
      ComponentManipulationUtils.addNewComponent(this, newComponent);
    },
    selectComponentCard(selectComponentCard: WorkshopComponent): void {
      ComponentManipulationUtils.selectComponent(this, selectComponentCard);
    },
    hoverComponentCard(componentCardHoveredEvent: ComponentCardHoveredEvent): void {
      const [hoveredComponent, isMouseEnter] = componentCardHoveredEvent;
      ComponentManipulationUtils.hoverComponentCard(this, hoveredComponent, isMouseEnter);
    },
    copyComponentCard(selectComponentCard: WorkshopComponent): void {
      ComponentManipulationUtils.copyComponent(this, selectComponentCard);
    },
    removeComponentCard(componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
      ComponentManipulationUtils.removeComponent(this, componentToBeRemovedWithoutSelecting);
    },
    exportFiles(): void {
      exportFiles.export(this.components);
    },
    triggerWorkshopEventCallbacks(): void {
      if (this.workshopEventCallbacks.length > 0) {
        const remainingCallbacks = [];
        this.workshopEventCallbacks.forEach((callback: WorkshopEventCallback) => {
          const eventKey = event instanceof KeyboardEvent ? event.key : event.type;
          if (callback.keyTriggers.has(eventKey as DOM_EVENT_TRIGGER_KEYS)) {
            const callbackCompleted: WorkshopEventCallbackReturn = callback.func(event);
            if (callbackCompleted.shouldRepeat) remainingCallbacks.push(callback);
            if (callbackCompleted.newCallback) remainingCallbacks.push(callbackCompleted.newCallback);
          } else {
            remainingCallbacks.push(callback);
          }
        });
        this.workshopEventCallbacks = remainingCallbacks;
      }
    },
    addWorkshopEventCallback(callback: WorkshopEventCallback): void {
      this.workshopEventCallbacks.push(callback);
    },
    cancelSubcomponentRemovalEventHandler(): void {
      SubcomponentToggleOverlayUtils.hideSubcomponentOverlayBySelectModeStatus(this.currentlySelectedComponent.activeSubcomponentName,
        SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
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
    toggleImportComponentMode(event: ToggleImportComponentModeEvent): void {
      ToggleImportComponentModeState.toggle(this, event);
    },
    isExpandedModalPreviewBackdropVisible(): boolean {
      return this.currentlySelectedComponent && this.currentlySelectedComponent.subcomponents[this.BASE_SUB_COMPONENT].customFeatures
        && this.currentlySelectedComponent.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.backdrop
        && this.currentlySelectedComponent.subcomponents[this.BASE_SUB_COMPONENT].customFeatures.backdrop.visible
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
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
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
    background: url('../../../assets/svg/plus-default.svg'),
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
