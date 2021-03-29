<template>
  <div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <component-list
            :components="components"
            :activeComponent="currentlySelectedComponent"
            @component-card-selected="componentCardSelected($event)"
            @component-card-copied="componentCardCopied($event)"
            @component-card-removed="componentCardRemoved($event)"
            @stop-editing-class-name-callback="addWorkshopEventCallback($event)"
            @prepare-new-component-modal="$refs.newComponentModal.prepare()"
            @prepare-remove-component-modal="$refs.removeComponentModal.prepare()"/>
          <div style="position: absolute; bottom: 0">
            <button type="button" style="margin-left: 7px; margin-bottom: 10px" class="btn btn-warning btn-sm">Explore icon</button>
          </div>
        </div>
        <div style="width: 70%; position: relative">
          <div style="border-radius: 20px; height: 95%; width: 100%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center"> 
            <!-- USE V-MODEL when passing down a primitive, otherwise can manipulate the object via reference -->
            <!--
              use this syntax when working with multiple values v-model:currentlySelectedComponent="currentlySelectedComponent"
              https://v3.vuejs.org/guide/migration/v-model.html#_3-x-syntax
              <toolbar v-model:currentlySelectedComponent="currentlySelectedComponent"/>
              'vue/no-v-model-argument': 'off',
            -->
            <toolbar
              ref="toolbar"
              :component="currentlySelectedComponent"
              :componentPreviewAssistance="componentPreviewAssistance"
              @hide-dropdown-menu-callback="addWorkshopEventCallback($event)"
              @prepare-remove-subcomponent-modal="$refs.removeSubcomponentModal.prepare()"
              @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
              @toggle-expanded-modal-preview-mode="$refs.contents.expandModalComponent($event)"
              @play-transition-preview="$refs.contents.playTransitionPreview($event)"
              @stop-transition-preview="$refs.contents.stopTransitionPreview()"/>
            <component-contents ref="contents" :component="currentlySelectedComponent" :componentPreviewAssistance="componentPreviewAssistance"/>
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
        @remove-event="componentCardRemoved"
        @remove-modal-template-callback="addWorkshopEventCallback($event)">
        Are you sure you want to remove this component?
      </removal-modal-template>
      <removal-modal-template
        ref="removeSubcomponentModal"
        :modalId="REMOVE_SUBCOMPONENT_MODAL_ID"
        :removalModalState="removeSubcomponentModalState"
        @remove-event="removeSubcomponentEventHandler"
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
import { BackdropProperties, ComponentCenteringInParent, ComponentTransitions, CustomCss, CustomFeatures, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../interfaces/workshopComponent';
import { modalLayerBottomSpecificSettings } from './newComponent/types/modals/properties/modalLayerBottomSpecificSettings';
import { removeSubcomponentModalState } from './toolbar/options/removeSubcomponentModalState/removeSubcomponentModalState';
import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../consts/modalTransitionTypes.enum';
import createModalComponentPreviewStructure from './newComponent/types/modals/properties/modalComponentPreviewStructure';
import { modalLayerTopSpecificSettings } from './newComponent/types/modals/properties/modalLayerTopSpecificSettings';
import { inheritedAlertCloseChildCss } from './newComponent/types/alerts/properties/inheritedAlertCloseChildCss';
import { removeComponentModalState } from './componentList/removeComponentModalState/removeComponentModalState';
import { inheritedAlertBaseChildCss } from './newComponent/types/alerts/properties/inheritedAlertBaseChildCss';
import SubcomponentToggleService from './toolbar/options/subcomponentToggleService/subcomponentToggleService';
import { modalBaseSpecificSettings } from './newComponent/types/modals/properties/modalBaseSpecificSettings';
import { ToggleSubcomponentSelectModeEvent } from '../../../interfaces/toggleSubcomponentSelectModeEvent';
import { REMOVE_COMPONENT_MODAL_ID, REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../consts/elementIds';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../consts/subcomponentOverlayClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../interfaces/workshopEventCallbackReturn';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { inheritedAlertBaseCss } from './newComponent/types/alerts/properties/inheritedCss';
import ProcessClassName from '../../../services/workshop/newComponent/processClassName';
import { SUB_COMPONENT_CSS_MODES } from '../../../consts/subcomponentCssModes.enum';
import { WorkshopEventCallback } from '../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../consts/domEventTriggerKeys.enum';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import exportFiles from '../../../services/workshop/exportFiles/exportFiles';
import { JAVASCRIPT_CLASSES } from '../../../consts/javascriptClasses.enum';
import JSONManipulation from '../../../services/workshop/jsonManipulation';
import componentContents from './componentPreview/ComponentPreview.vue';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';
import removalModalTemplate from './templates/RemovalModalTemplate.vue';
import newComponentModal from './newComponent/NewComponentModal.vue';
import ComponentJs from '../../../services/workshop/componentJs';
import componentList from './componentList/ComponentList.vue';
import toolbar from './toolbar/Toolbar.vue';
import 'vuesax/dist/vuesax.css' //Vuesax styles

interface Consts {
  preloadedIconsElementId: string;
  removeComponentModalState;
  removeSubcomponentModalState;
  REMOVE_COMPONENT_MODAL_ID;
  REMOVE_SUBCOMPONENT_MODAL_ID;
}

interface Data {
  isIconsPreloaded: boolean;
  components: WorkshopComponent[];
  currentlySelectedComponent: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
  workshopEventCallbacks: (() => boolean)[];
}

function createDefaultTransitionsProperties(): ComponentTransitions {
  return {
    entrance: {
      type: MODAL_TRANSITION_ENTRANCE_TYPES.FADE_IN,
      duration: '0.3s',
      delay: '0.15s',
    },
    exit: {
      type: MODAL_TRANSITION_EXIT_TYPES.FADE_OUT,
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
    visible: false,
  };
}

function createDefaultBaseCustomFeatures(): CustomFeatures {
  return {
    componentCenteringInParent: createDefaultComponentCenteringInParent(),
    transitions: createDefaultTransitionsProperties(),
    backdrop: createDefaultBackdropProperties(),
  };
}

function createDefaultCloseButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialCloseButtonJsClasses(),
  };
}

function createInitialBaseCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      color: '#004085',
      backgroundColor: '#ffffff',
      borderColor: '#00000033',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      width: '450px',
      boxSizing: 'unset',
      fontSize: '16px',
      boxShadow: 'unset',
      fontFamily: '"Poppins", sans-serif',
      top: '0px',
    },
  };
}

function createInitialCloseButtonCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      height: '12px',
      width: '14px',
      borderRadius: '15px',
      lineHeight: '1px',
      cursor: 'pointer',
      boxSizing: 'unset',
      fontSize: '16px',
      color: '#ff0000',
      boxShadow: 'unset',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      backgroundColor: 'inherit',
      outline: 'none',
      paddingTop: '1px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      marginTop: '10px',
      marginRight: '10px',
      top: '50%',
    },
  };
}

function createInitialButton1Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
      backgroundColor: '#1779ba',
      borderStyle: 'solid',
      boxShadow: 'unset',
      outline: 'none',
      lineHeight: '0',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '12px',
      paddingRight: '12px',
      marginLeft: '30px',
      marginTop: '0px',
      marginRight: '0px',
      marginBottom: '0px',
      width: '40px',
      height: '38px',
      boxSizing: 'content-box',
      color: '#ffffff',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      userSelect: 'none',
      top: '50%',
    },
    [SUB_COMPONENT_CSS_MODES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [SUB_COMPONENT_CSS_MODES.CLICK]: {
      backgroundColor: '#409441',
    },
  };
}

function createInitialLayer1Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
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
      fontWeight: '500',
      fontSize: '20px',
      boxShadow: 'unset',
      fontFamily: '"Poppins", sans-serif',
      color: '#004085',
      zIndex: 1,
    },
  };
}

function createInitialLayer2Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      position: 'relative',
      height: '50px',
      textAlign: 'left',
      paddingLeft: '20px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      fontWeight: '400',
      backgroundColor: 'inherit',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
    },
  };
}

function createInitialLayer3Css(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
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
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      color: '#004085',
    },
  };
}

function createTextCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      display: 'inline-table',
      top: '50%',
    },
  }
}

function createInitialCloseButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES]);
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      inheritedCss: inheritedAlertBaseCss,
      childCss: inheritedAlertBaseChildCss,
      subcomponentSpecificSettings: modalBaseSpecificSettings,
      customFeatures: createDefaultBaseCustomFeatures(),
      defaultCustomFeatures: createDefaultBaseCustomFeatures(),
    },
    [SUB_COMPONENTS.LAYER_1]: {
      customCss: createInitialLayer1Css(),
      initialCss: createInitialLayer1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentSpecificSettings: modalLayerTopSpecificSettings,
    },
    [SUB_COMPONENTS.LAYER_2]: {
      customCss: createInitialLayer2Css(),
      initialCss: createInitialLayer2Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    },
    [SUB_COMPONENTS.LAYER_3]: {
      customCss: createInitialLayer3Css(),
      initialCss: createInitialLayer3Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentSpecificSettings: modalLayerBottomSpecificSettings,
    },
    [SUB_COMPONENTS.CLOSE]: {
      componentTag: 'button',
      componentText: '×',
      customCss: createInitialCloseButtonCss(),
      initialCss: createInitialCloseButtonCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.BUTTON_1]: {
      componentTag: 'button',
      componentText: 'button',
      customCss: createInitialButton1Css(),
      initialCss: createInitialButton1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.BUTTON_2]: {
      componentTag: 'button',
      componentText: 'Cancel',
      customCss: createInitialButton1Css(),
      initialCss: createInitialButton1Css(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      childCss: inheritedAlertCloseChildCss,
      optionalSubcomponent: { currentlyDisplaying: true },
      customFeatures: createDefaultCloseButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultCloseButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.TEXT_1]: {
      componentTag: 'div',
      componentText: 'Modal title',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    },
    [SUB_COMPONENTS.TEXT_2]: {
      componentTag: 'div',
      componentText: 'Modal body text',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    },
  };
}

function getNewComponent(): WorkshopComponent {
  const subcomponents = createSubcomponents();
  return {
    type: NEW_COMPONENT_TYPES.MODAL,
    subcomponents,
    activeSubcomponentMode: SUB_COMPONENTS.BASE,
    defaultSubcomponentMode: SUB_COMPONENTS.BASE,
    componentPreviewStructure: createModalComponentPreviewStructure(
      subcomponents[SUB_COMPONENTS.BASE], subcomponents[SUB_COMPONENTS.CLOSE], subcomponents[SUB_COMPONENTS.BUTTON_1],
      subcomponents[SUB_COMPONENTS.BUTTON_2], subcomponents[SUB_COMPONENTS.LAYER_1], subcomponents[SUB_COMPONENTS.LAYER_2],
      subcomponents[SUB_COMPONENTS.LAYER_3], subcomponents[SUB_COMPONENTS.TEXT_1],  subcomponents[SUB_COMPONENTS.TEXT_2]),
    className: 'default-class-name',
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
     };
  },
  data: (): Data => ({
    isIconsPreloaded: false,
    componentPreviewAssistance: { margin: false },
    components: [
      getNewComponent(),
    ],
    currentlySelectedComponent: null,
    workshopEventCallbacks: [],
  }),
  mounted(): void {
    document.getElementById('comparecss-sidenav').style.display = 'none';
    this.preloadIcons();
    document.addEventListener('keydown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mousedown', this.triggerWorkshopEventCallbacks);
    document.addEventListener('mouseup', this.triggerWorkshopEventCallbacks);
  },
  methods: {
    resetComponentModes(previousComponent: WorkshopComponent): void {
      if (!previousComponent) return;
      previousComponent.activeSubcomponentMode = previousComponent.defaultSubcomponentMode;
      Object.keys(previousComponent.subcomponents).forEach((key) => {
        const subcomponent: SubcomponentProperties = previousComponent.subcomponents[key];
        subcomponent.activeCustomCssMode = subcomponent.defaultCustomCssMode;
      });
    },
    switchActiveComponent(newComponent: WorkshopComponent): void {
      this.resetComponentModes(this.currentlySelectedComponent);
      if (this.currentlySelectedComponent && this.currentlySelectedComponent.type !== newComponent.type) {
        ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'revokeJS');
      }
      this.currentlySelectedComponent = newComponent;
      ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'executeJS');
      this.$refs.toolbar.updateToolbarForNewComponent();
    },
    addNewComponent(newComponent: WorkshopComponent): void {
      this.components.push(newComponent);
      this.switchActiveComponent(newComponent);
    },
    componentCardSelected(selectedComponent: WorkshopComponent): void {
      if (this.currentlySelectedComponent !== selectedComponent) {
        this.switchActiveComponent(selectedComponent);
      }
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      const newComponent = JSONManipulation.deepCopy(selectComponentCard);
      newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className, this.components, '-copy');
      newComponent.activeSubcomponentMode = SUB_COMPONENTS.BASE;
      newComponent.subcomponents[SUB_COMPONENTS.BASE].activeCustomCssMode = SUB_COMPONENT_CSS_MODES.DEFAULT;
      this.addNewComponent(newComponent);
    },
    componentCardRemoved(componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
      // the modal does not have a reference to the selected component card but we can be sure that currentlySelectedComponent is the one being removed,
      // however, when the don't show again checkbox is ticked and the user clicks on remove without selecting a modal, need to have its reference
      // passed in through the componentToBeRemovedWithoutSelecting argument
      const componentToBeRemoved = componentToBeRemovedWithoutSelecting || this.currentlySelectedComponent;
      const componentMatch = (component: WorkshopComponent) => componentToBeRemoved === component;
      const componentToBeRemovedIndex = this.components.findIndex(componentMatch);
      this.components.splice(componentToBeRemovedIndex, 1);
      if (this.components.length === 0) {
        this.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
        this.componentPreviewAssistance.margin = false;
        ComponentJs.manipulateJS(componentToBeRemoved.type, 'revokeJS');
        this.currentlySelectedComponent = undefined;
        return;
      }
      // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
      // or not using the modal but directly removing the component that is currently selected
      if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === this.currentlySelectedComponent) {
        this.selectNextComponentAfterRemoving(componentToBeRemovedIndex);
      }
    },
    selectNextComponentAfterRemoving(removedComponentIndex: number): void {
      const nextComponentIndex = removedComponentIndex === this.components.length ? removedComponentIndex - 1 : removedComponentIndex
      this.switchActiveComponent(this.components[nextComponentIndex]);
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
    removeSubcomponentEventHandler(): void {
      this.currentlySelectedComponent.subcomponents[this.currentlySelectedComponent.activeSubcomponentMode].customCss = JSONManipulation.deepCopy(
        this.currentlySelectedComponent.subcomponents[this.currentlySelectedComponent.activeSubcomponentMode].initialCss);
      this.currentlySelectedComponent.subcomponents[this.currentlySelectedComponent.activeSubcomponentMode].optionalSubcomponent.currentlyDisplaying = false;
      this.$refs.toolbar.hideSettings();
    },
    cancelSubcomponentRemovalEventHandler(): void {
      SubcomponentToggleService.hideSubcomponentOverlayBySelectModeStatus(this.currentlySelectedComponent.activeSubcomponentMode,
        SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    },
    preloadIcons(): void {
      const WAIT_TO_START_DOWNLOADING_ICON_ICONS = 5;
      if (!this.isIconsPreloaded) {
        setTimeout(() => {
          document.getElementById(this.preloadedIconsElementId).style.display = 'none';
          this.isIconsPreloaded = true;
        }, WAIT_TO_START_DOWNLOADING_ICON_ICONS);
      }
    },
    toggleSubcomponentSelectMode(toggleSubcomponentSelectModeEvent: ToggleSubcomponentSelectModeEvent): void {
      const [SubcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, optionsSubcomponentModeClickedFunc] = toggleSubcomponentSelectModeEvent;
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: SubcomponentSelectModeCallbackFunction.bind(this,
        buttonElement, optionsSubcomponentModeClickedFunc, this.$refs.contents.toggleSubcomponentSelectMode)};
      this.addWorkshopEventCallback(workshopEventCallback); 
      this.$refs.contents.toggleSubcomponentSelectMode(true);
    },
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
</style>
