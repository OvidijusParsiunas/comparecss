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
        :components="components"
        @add-new-component="addNewComponent($event)"
        @stop-editing-class-name-callback="addWorkshopEventCallback($event)"/>
      <remove-subcomponent-modal
        @remove-subcomponent="$refs.toolbar.hideSettings()"
        :component="currentlySelectedComponent"/>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../interfaces/workshopComponent';
import { inheritedCloseChildCss } from './newComponent/types/alerts/properties/inheritedCloseChildCss';
import { WorkshopEventCallbackReturn } from '../../../interfaces/workshopEventCallbackReturn';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { inheritedAlertBaseCss } from './newComponent/types/alerts/properties/inheritedCss';
import removeSubcomponentModal from './toolbar/options/modal/RemoveSubcomponentModal.vue';
import ProcessClassName from '../../../services/workshop/newComponent/processClassName';
import { SUB_COMPONENT_CSS_MODES } from '../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import exportFiles from '../../../services/workshop/exportFiles/exportFiles';
import { JAVASCRIPT_CLASSES } from '../../../consts/javascriptClasses.enum';
import JSONManipulation from '../../../services/workshop/jsonManipulation';
import componentContents from './componentPreview/ComponentPreview.vue';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';
import { UpdateOptionsMode } from '../../../interfaces/updateCssMode';
import newComponentModal from './newComponent/NewComponentModal.vue';
import ComponentJs from '../../../services/workshop/componentJs';
import componentList from './componentList/ComponentList.vue';
import toolbar from './toolbar/Toolbar.vue';
import 'vuesax/dist/vuesax.css' //Vuesax styles

interface Data {
  components: WorkshopComponent[],
  currentlySelectedComponent: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
  workshopEventCallbacks: (() => boolean)[];
}

const initialContainerButtonCss: CustomCss = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    width: '440px',
    height: '50px',
    boxSizing: 'unset',
    fontSize: '16px',
    boxShadow: 'unset',
    fontFamily: '"Poppins", sans-serif',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    transition: 'unset',
  },
}

const initialCloseButtonCss: CustomCss = {
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
    backgroundColor: 'inherit',
    outline: 'none',
    paddingTop: '1px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    marginTop: '18px',
    marginRight: '5px',
  },
}

export default {
  data: (): Data => ({
    componentPreviewAssistance: { margin: false },
    components: [
      {
        type: NEW_COMPONENT_TYPES.ALERT,
        subcomponents: {
          [SUB_COMPONENTS.BASE]: {
            frameworkClass: 'bootstrap',
            componentTag: 'div',
            innerHtmlText: 'Alert',
            customSettingsProperties: {
              width: [100, 700],
              height: [30, 200],
            },
            customCss: JSONManipulation.deepCopy(initialContainerButtonCss),
            initialCss: JSONManipulation.deepCopy(initialContainerButtonCss),
            jsClasses: new Set(),
            initialJsClasses: new Set(),
            customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
            tempCustomCss: new Set(['transition']),
            inheritedCss: inheritedAlertBaseCss,
          },
          [SUB_COMPONENTS.CLOSE]: {
            frameworkClass: 'bootstrap',
            componentTag: 'div',
            innerHtmlText: 'Alert',
            customSettingsProperties: {
              width: [14, 80],
              height: [10, 80],
            },
            customCss: JSONManipulation.deepCopy(initialCloseButtonCss),
            initialCss: JSONManipulation.deepCopy(initialCloseButtonCss),
            jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
            initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
            customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
            subcomponentPreviewTransition: 'all 0.25s ease-out',
            tempCustomCss: new Set(['transition']),
            childCss: inheritedCloseChildCss,
            optionalSubcomponent: { currentlyDisplaying: true },
          },
        },
        subcomponentsActiveMode: SUB_COMPONENTS.BASE,
        className: 'default-class-name',
      }
    ],
    currentlySelectedComponent: {
        type: NEW_COMPONENT_TYPES.ALERT,
        subcomponents: {
          [SUB_COMPONENTS.BASE]: {
            frameworkClass: 'bootstrap',
            componentTag: 'div',
            innerHtmlText: 'Alert',
            customSettingsProperties: {
              width: [100, 700],
              height: [30, 200],
            },
            customCss: JSONManipulation.deepCopy(initialContainerButtonCss),
            initialCss: JSONManipulation.deepCopy(initialContainerButtonCss),
            jsClasses: new Set(),
            initialJsClasses: new Set(),
            customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
            tempCustomCss: new Set(['transition']),
          },
          [SUB_COMPONENTS.CLOSE]: {
            frameworkClass: 'bootstrap',
            componentTag: 'div',
            innerHtmlText: 'Alert',
            customSettingsProperties: {
              width: [14, 80],
              height: [10, 80],
            },
            customCss: JSONManipulation.deepCopy(initialCloseButtonCss),
            initialCss: JSONManipulation.deepCopy(initialCloseButtonCss),
            jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
            initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
            customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
            subcomponentPreviewTransition: 'all 0.25s ease-out',
            tempCustomCss: new Set(['transition']),
            childCss: inheritedCloseChildCss,
            optionalSubcomponent: { currentlyDisplaying: true },
          },
        },
        subcomponentsActiveMode: SUB_COMPONENTS.BASE,
        className: 'default-class-name',
      },
    workshopEventCallbacks: [],
  }),
  methods: {
    resetComponentModes(previousComponent: WorkshopComponent): void {
      if (!previousComponent) return;
      previousComponent.subcomponentsActiveMode = Object.keys(previousComponent.subcomponents)[0] as SUB_COMPONENTS;
      Object.keys(previousComponent.subcomponents).forEach((key) => {
        const subcomponent: SubcomponentProperties = previousComponent.subcomponents[key];
        subcomponent.customCssActiveMode = Object.keys(subcomponent.customCss)[0] as SUB_COMPONENT_CSS_MODES;
      });
    },
    switchActiveComponent(newComponent: WorkshopComponent): void {
      this.resetComponentModes(this.currentlySelectedComponent);
      if (this.currentlySelectedComponent && this.currentlySelectedComponent.type !== newComponent.type) {
        ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'revokeJS');
      }
      this.currentlySelectedComponent = newComponent;
      ComponentJs.manipulateJS(this.currentlySelectedComponent.type, 'executeJS');
    },
    addNewComponent(newComponent: WorkshopComponent): void {
      this.components.push(newComponent);
      this.switchActiveComponent(newComponent);
      if (this.currentlySelectedComponent) {
        const { subcomponents, subcomponentsActiveMode } = this.currentlySelectedComponent;
        if (this.components.length > 1) { this.$refs.toolbar.updateCssMode([subcomponents[subcomponentsActiveMode].customCssActiveMode] as UpdateOptionsMode); } 
      }
    },
    componentCardSelected(selectedComponent: WorkshopComponent): void {
      if (this.currentlySelectedComponent !== selectedComponent) {
        this.switchActiveComponent(selectedComponent);
        setTimeout(() => {
          this.$refs.toolbar.updateCssMode([selectedComponent.subcomponents[selectedComponent.subcomponentsActiveMode].customCssActiveMode] as UpdateOptionsMode);
        })
      }
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      const newComponent = JSONManipulation.deepCopy(selectComponentCard);
      newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className, this.components, '-copy');
      newComponent.subcomponentsActiveMode = SUB_COMPONENTS.BASE;
      newComponent.subcomponents[SUB_COMPONENTS.BASE].customCssActiveMode = SUB_COMPONENT_CSS_MODES.DEFAULT;
      this.addNewComponent(newComponent);
    },
    componentCardDeleted(selectComponentCard: WorkshopComponent): void {
      const componentMatch = (component) => selectComponentCard === component;
      const componentIndex = this.components.findIndex(componentMatch);
      this.components.splice(componentIndex, 1);
      const { subcomponents, subcomponentsActiveMode, type } = this.currentlySelectedComponent;
      if (this.components.length === 0) {
        ComponentJs.manipulateJS(type, 'revokeJS');
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
    exportFiles(): void {
      exportFiles.export(this.components);
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
    removeSubcomponentModal,
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
  #formControlRange {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
</style>
