<template>
  <div @mousedown="triggerWorkshopEventCallbacks" @keydown.enter="triggerWorkshopEventCallbacks">
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <component-list
            :components="components"
            @component-card-selected="componentCardSelected($event)"
            @component-card-copied="componentCardCopied($event)"
            @component-card-deleted="componentCardDeleted($event)"
            @stop-editing-class-name-callback="addWorkshopEventCallback($event)"/>
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
            <toolbar ref="toolbar" :component="currentlySelectedComponent" :componentPreviewAssistance="componentPreviewAssistance"/>
            <component-contents style="height: 50%" :component="currentlySelectedComponent" :componentPreviewAssistance="componentPreviewAssistance"/>
            <div style="height: 18%; display: flex; float: right; margin-right: 10px; margin-top: 105px">
              <div style="position: relative">
                <div>
                  <!-- <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div> -->
                  <button type="button" class="btn btn-outline-secondary edit-component-button" @click="download">&lt;&gt;</button>
                  <button type="button" class="btn btn-success" @click="download">&darr;</button>
                </div>
              </div>
            </div>
            <!-- <div style="height: 18%; display: flex">
              <div style="width: 30%; position: relative">
                <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                  <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div>
                  <button type="button" class="btn btn-success" @click="download">Download</button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <new-component-modal
        :components="components"
        @add-new-component="addNewComponent($event)"
        @stop-editing-class-name-callback="addWorkshopEventCallback($event)"/>
    </div>
    <div class="center">
      <button class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default">
        <div class="vs-button__content">
          Add +
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
interface Data {
  components: WorkshopComponent[],
  currentlySelectedComponent: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
  workshopEventCallbacks: (() => boolean)[];
}
import 'vuesax/dist/vuesax.css' //Vuesax styles
import downloadFiles from '../../../services/workshop/downloadFiles';
import cssBuilder from '../../../services/workshop/cssBuilder';
import jsBuilder from '../../../services/workshop/jsBuilder';
import toolbar from './toolbar/Toolbar.vue';
import componentContents from './componentPreview/ComponentPreview.vue';
import newComponentModal from './newComponent/Modal.vue';
import componentList from './componentList/ComponentList.vue';
import { WorkshopComponent, SubcomponentProperties } from '../../../interfaces/workshopComponent';
import { inheritedButtonCss } from './newComponent/types/buttons/properties/inheritedCss';
import { WorkshopEventCallbackReturn } from '../../../interfaces/workshopEventCallbackReturn';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import { UpdateOptionsMode } from '../../../interfaces/updateCssMode';
import ProcessClassName from '../../../services/workshop/newComponent/processClassName';
import ComponentJs from '../../../services/workshop/componentJs';
import { SUB_COMPONENT_CSS_MODES } from '../../../consts/subcomponentCssModes.enum';
import { componentTypeToOptions } from './toolbar/options/components/componentTypeToOptions';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';

export default {
  data: (): Data => ({
    componentPreviewAssistance: { margin: false },
    components: [
      {
        type: NEW_COMPONENT_TYPES.BUTTON,
        subcomponents: {
          [SUB_COMPONENTS.CONTAINER]: {
            frameworkClass: 'foundation',
            innerHtmlText: 'button',
            componentTag: 'button',
            transition: 'all 0.25s ease-out',
            customCss: {
              [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
                borderRadius: '0px',
                borderWidth: '0px',
                borderColor: '#1779ba',
                backgroundColor: '#1779ba',
                boxShadow: '0px 0px 0px 0px #000000',
                outline: 'none',
                lineHeight: '0',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                width: '40px',
                height: '38px',
                boxSizing: 'content-box',
                transition: 'unset',
                fontSize: '14px',
                color: '#ffffff',
              },
              [SUB_COMPONENT_CSS_MODES.HOVER]: {
                backgroundColor: '#ff0000',
              },
              [SUB_COMPONENT_CSS_MODES.CLICK]: {
                backgroundColor: '#409441',
              },
            },
            initialCss: {
              [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
                borderRadius: '0px',
                borderWidth: '0px',
                borderColor: '#1779ba',
                backgroundColor: '#1779ba',
                boxShadow: '0px 0px 0px 0px #000000',
                outline: 'none',
                lineHeight: '0',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                width: '40px',
                height: '38px',
                boxSizing: 'content-box',
                transition: 'none',
                color: '#ffffff',
              },
              [SUB_COMPONENT_CSS_MODES.HOVER]: {
                backgroundColor: '#ff0000',
              },
              [SUB_COMPONENT_CSS_MODES.CLICK]: {
                backgroundColor: '#409441',
              },
            },
            tempCustomCss: new Set(['transition']),
            jsClasses: new Set(),
            initialJsClasses: new Set(),
            customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
            inheritedCss: inheritedButtonCss,
          }
        },
        subcomponentsActiveMode: SUB_COMPONENTS.CONTAINER,
        customSettingsProperties: {
          width: [0, 250],
          height: [0, 250],
        },
        className: 'button',
      },
    ],
    currentlySelectedComponent: {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents: {
        [SUB_COMPONENTS.CONTAINER]: {
          frameworkClass: 'foundation',
          componentTag: 'button',
          innerHtmlText: 'button',
          transition: 'all 0.25s ease-out',
          customCss: {
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              borderColor: '#1779ba',
              backgroundColor: '#1779ba',
              boxShadow: '0px 0px 0px 0px #000000',
              outline: 'none',
              lineHeight: '0',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              marginRight: '0px',
              marginBottom: '0px',
              width: '40px',
              height: '38px',
              boxSizing: 'content-box',
              transition: 'unset',
              fontSize: '14px',
              color: '#ffffff',
            },
            [SUB_COMPONENT_CSS_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [SUB_COMPONENT_CSS_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          initialCss: {
            [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              borderColor: '#1779ba',
              backgroundColor: '#1779ba',
              boxShadow: '0px 0px 0px 0px #000000',
              outline: 'none',
              lineHeight: '0',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              marginRight: '0px',
              marginBottom: '0px',
              width: '40px',
              height: '38px',
              boxSizing: 'content-box',
              transition: 'none',
              fontSize: '14px',
              color: '#ffffff',
            },
            [SUB_COMPONENT_CSS_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [SUB_COMPONENT_CSS_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          tempCustomCss: new Set(['transition']),
          jsClasses: new Set(),
          initialJsClasses: new Set(),
          customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
          inheritedCss: inheritedButtonCss,
        }
      },
      subcomponentsActiveMode: SUB_COMPONENTS.CONTAINER,
      customSettingsProperties: {
        width: [0, 250],
        height: [0, 250],
      },
      className: 'button',
    },
    // components: new Set(),
    // currentlySelectedComponent: undefined,
    workshopEventCallbacks: [],
  }),
  methods: {
    switchActiveComponent(newComponent: WorkshopComponent): void {
      if (this.currentlySelectedComponent) {
        const { subcomponents, subcomponentsActiveMode, type } = this.currentlySelectedComponent;
        if (type !== newComponent.type) {
          ComponentJs.manipulateJS(type, 'revokeJS');
        }
        ComponentJs.manipulateJSClasses(subcomponents[subcomponentsActiveMode].jsClasses, type, 'remove');
      }
      this.currentlySelectedComponent = newComponent;
      const { subcomponents, subcomponentsActiveMode, type } = this.currentlySelectedComponent;
      ComponentJs.manipulateJS(type, 'executeJS');
      ComponentJs.manipulateJSClasses(subcomponents[subcomponentsActiveMode].jsClasses, type, 'add');
    },
    setCustomCssActiveMode: (subcomponentProperties: SubcomponentProperties, mode: SUB_COMPONENT_CSS_MODES): void => {
      if (subcomponentProperties.hasOwnProperty('customCssActiveMode')) {
        subcomponentProperties.customCssActiveMode = mode;
      }
    },
    addNewComponent(newComponent: WorkshopComponent): void {
      const { subcomponents, subcomponentsActiveMode } = this.currentlySelectedComponent;
      if (this.components.length) {
        this.setCustomCssActiveMode(subcomponents[subcomponentsActiveMode], SUB_COMPONENT_CSS_MODES.DEFAULT);
      }
      this.components.push(newComponent);
      this.switchActiveComponent(newComponent);
      if (this.components.length > 1) { this.$refs.toolbar.updateCssMode([subcomponents[subcomponentsActiveMode].customCssActiveMode] as UpdateOptionsMode); }
    },
    componentCardSelected(selectedComponent: WorkshopComponent): void {
      if (this.currentlySelectedComponent !== selectedComponent) {
        const { subcomponents, subcomponentsActiveMode } = this.currentlySelectedComponent;
        const previousActiveMode = subcomponents[subcomponentsActiveMode].customCssActiveMode;
        this.setCustomCssActiveMode(subcomponents[subcomponentsActiveMode], SUB_COMPONENT_CSS_MODES.DEFAULT);
        if (Object.keys(componentTypeToOptions[selectedComponent.type]).includes(previousActiveMode)) {
          selectedComponent.subcomponents[selectedComponent.subcomponentsActiveMode].customCssActiveMode = previousActiveMode;
        } else {
          selectedComponent.subcomponents[selectedComponent.subcomponentsActiveMode].customCssActiveMode = SUB_COMPONENT_CSS_MODES.DEFAULT;
        }
        this.switchActiveComponent(selectedComponent);
        this.$refs.toolbar.updateCssMode([subcomponents[subcomponentsActiveMode].customCssActiveMode] as UpdateOptionsMode);
      }
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      this.setCustomCssActiveMode(selectComponentCard.subcomponents[selectComponentCard.subcomponentsActiveMode], SUB_COMPONENT_CSS_MODES.DEFAULT);
      const newComponent = JSON.parse(JSON.stringify(selectComponentCard));
      newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className, this.components, '-copy');
      this.addNewComponent(newComponent);
    },
    componentCardDeleted(selectComponentCard: WorkshopComponent): void {
      const componentMatch = (component) => selectComponentCard === component;
      const componentIndex = this.components.findIndex(componentMatch);
      this.components.splice(componentIndex, 1);
      const { subcomponents, subcomponentsActiveMode, type } = this.currentlySelectedComponent;
      if (this.components.length === 0) {
        ComponentJs.manipulateJS(type, 'revokeJS');
        ComponentJs.manipulateJSClasses(subcomponents[subcomponentsActiveMode].jsClasses, type, 'remove');
        this.currentlySelectedComponent = undefined;
        return;
      }
      if (componentIndex === this.components.length) {
        this.switchActiveComponent(this.components[componentIndex - 1]);
      } else {
        this.switchActiveComponent(this.components[componentIndex]);
      }
      this.$refs.toolbar.updateCssMode([subcomponents[subcomponentsActiveMode].customCssActiveMode] as UpdateOptionsMode);
    },
    download(): void {
      const resultCss = `${cssBuilder.build(this.components).trim()}\r\n`;
      const resultJs = jsBuilder.build(this.components);
      downloadFiles.downloadZip(resultCss, resultJs);
    },
    triggerWorkshopEventCallbacks(): void {
      if (this.workshopEventCallbacks.length > 0) {
        const remainingCallbacks = [];
        this.workshopEventCallbacks.forEach((callback) => {
          const callbackCompleted: WorkshopEventCallbackReturn = callback(event);
          if (callbackCompleted.shouldRepeat) remainingCallbacks.push(callback);
          if (callbackCompleted.newCallback) remainingCallbacks.push(callbackCompleted.newCallback);
        });
        this.workshopEventCallbacks = remainingCallbacks;
      }
    },
    addWorkshopEventCallback(callback: () => void): void {
      this.workshopEventCallbacks.push(callback);
    }
  },
  components: {
    toolbar,
    componentList,
    componentContents,
    newComponentModal,
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
  #formControlRange {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
</style>
