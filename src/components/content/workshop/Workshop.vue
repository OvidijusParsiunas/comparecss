<template>
  <div @mousedown="triggerWorkshopEventCallbacks" @keydown.enter="triggerWorkshopEventCallbacks">
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <componentList
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
            <componentContents style="height: 50%" :component="currentlySelectedComponent" :componentPreviewAssistance="componentPreviewAssistance"/>
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
      <newComponentModal
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
import { WorkshopComponent, ComponentProperties } from '../../../interfaces/workshopComponent';
import { WorkshopEventCallbackReturn } from '../../../interfaces/workshopEventCallbackReturn';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import { UpdateMode } from '../../../interfaces/updateMode';
import inheritedButtonCss from '../../../newComponents/buttons/inheritedCss';
import ProcessClassName from '../../../services/workshop/newComponent/processClassName';
import ComponentJs from '../../../services/workshop/componentJs';
import { COMPONENT_MODES } from '../../../consts/componentModes.enum';
import ComponentOptionsContainer from './toolbar/options/componentOptionsContainer';

export default {
  data: (): Data => ({
    componentPreviewAssistance: { margin: false },
    components: [
      {
        type: NEW_COMPONENT_TYPES.BUTTON,
        componentProperties: {
          frameworkClass: 'foundation',
          innerHtml: 'button',
          transition: 'all 0.25s ease-out',
          customCss: {
            [COMPONENT_MODES.DEFAULT]: {
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
            [COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          initialCss: {
            [COMPONENT_MODES.DEFAULT]: {
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
            [COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          tempCustomCss: new Set(['transition']),
          jsClasses: [],
          initialJsClasses: [],
          customCssActiveMode: COMPONENT_MODES.DEFAULT,
          inheritedCss: inheritedButtonCss,
        },
        className: 'button'
      },
    ],
    currentlySelectedComponent: {
      type: NEW_COMPONENT_TYPES.BUTTON,
      componentProperties: {
        frameworkClass: 'foundation',
        innerHtml: 'button',
        transition: 'all 0.25s ease-out',
        customCss: {
          [COMPONENT_MODES.DEFAULT]: {
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
          [COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        initialCss: {
          [COMPONENT_MODES.DEFAULT]: {
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
          [COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        tempCustomCss: new Set(['transition']),
        jsClasses: [],
        initialJsClasses: [],
        customCssActiveMode: COMPONENT_MODES.DEFAULT,
        inheritedCss: inheritedButtonCss,
      },
      className: 'button'
    },
    // components: [],
    // currentlySelectedComponent: undefined,
    workshopEventCallbacks: [],
  }),
  methods: {
    switchActiveComponent(newComponent: WorkshopComponent): void {
      if (this.currentlySelectedComponent) {
        if (this.currentlySelectedComponent.type !== newComponent.type) {
          ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'revokeJS');
        }
        ComponentJs.manipulateJSClasses(this.currentlySelectedComponent.componentProperties.jsClasses,
          this.currentlySelectedComponent.type, 'remove');
      }
      this.currentlySelectedComponent = newComponent;
      ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'executeJS');
      ComponentJs.manipulateJSClasses(this.currentlySelectedComponent.componentProperties.jsClasses,
          this.currentlySelectedComponent.type, 'add');
    },
    setCustomCssActiveMode: (componentProperties: ComponentProperties, mode: COMPONENT_MODES): void => {
      if (componentProperties.hasOwnProperty('customCssActiveMode')) {
        componentProperties.customCssActiveMode = mode;
      }
    },
    addNewComponent(newComponent: WorkshopComponent): void {
      if (this.components.length) {
        this.setCustomCssActiveMode(this.currentlySelectedComponent.componentProperties, COMPONENT_MODES.DEFAULT);
      }
      this.components.push(newComponent);
      this.switchActiveComponent(newComponent);
      if (this.components.length > 1) { this.$refs.toolbar.updateMode([this.currentlySelectedComponent.componentProperties.customCssActiveMode] as UpdateMode); }
    },
    componentCardSelected(selectedComponentCard: WorkshopComponent): void {
      if (this.currentlySelectedComponent !== selectedComponentCard) {
        const previousActiveMode = this.currentlySelectedComponent.componentProperties.customCssActiveMode;
        this.setCustomCssActiveMode(this.currentlySelectedComponent.componentProperties, COMPONENT_MODES.DEFAULT);
        if (Object.keys(ComponentOptionsContainer[selectedComponentCard.type]).includes(previousActiveMode)) {
          selectedComponentCard.componentProperties.customCssActiveMode = previousActiveMode;
        } else {
          selectedComponentCard.componentProperties.customCssActiveMode = COMPONENT_MODES.DEFAULT;
        }
        this.switchActiveComponent(selectedComponentCard);
        this.$refs.toolbar.updateMode([this.currentlySelectedComponent.componentProperties.customCssActiveMode] as UpdateMode);
      }
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      this.setCustomCssActiveMode(selectComponentCard.componentProperties, COMPONENT_MODES.DEFAULT);
      const newComponent = JSON.parse(JSON.stringify(selectComponentCard));
      newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className, this.components, '-copy');
      this.addNewComponent(newComponent);
    },
    componentCardDeleted(selectComponentCard: WorkshopComponent): void {
      const componentMatch = (component) => selectComponentCard === component;
      const componentIndex = this.components.findIndex(componentMatch);
      this.components.splice(componentIndex, 1);
      if (this.components.length === 0) {
        ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'revokeJS');
        ComponentJs.manipulateJSClasses(this.currentlySelectedComponent.componentProperties.jsClasses,
          this.currentlySelectedComponent.type, 'remove');
        this.currentlySelectedComponent = undefined;
        return;
      }
      if (componentIndex === this.components.length) {
        this.switchActiveComponent(this.components[componentIndex - 1]);
      } else {
        this.switchActiveComponent(this.components[componentIndex]);
      }
      this.$refs.toolbar.updateMode([this.currentlySelectedComponent.componentProperties.customCssActiveMode] as UpdateMode);
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
