<template>
  <div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <componentList :componentList="components" @component-card-selected="componentCardSelected($event)" @component-card-copied="componentCardCopied($event)"/>
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
            <componentContents style="height: 50%" :componentProperties="currentlySelectedComponent.componentProperties" :componentPreviewAssistance="componentPreviewAssistance"/>
            <div style="height: 18%; display: flex; float: right; margin-right: 10px; margin-top: 105px">
              <div style="position: relative">
                <div>
                  <!-- <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div> -->
                  <button type="button" class="btn btn-outline-secondary edit-component-button" @click="downloadCSSFile">&lt;&gt;</button>
                  <button type="button" class="btn btn-success" @click="downloadCSSFile">&darr;</button>
                </div>
              </div>
            </div>
            <!-- <div style="height: 18%; display: flex">
              <div style="width: 30%; position: relative">
                <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                  <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div>
                  <button type="button" class="btn btn-success" @click="downloadCSSFile">Download</button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <newComponentModal @add-new-component="addNewComponent($event)"/>
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
  components: [WorkshopComponent],
  currentlySelectedComponent: WorkshopComponent;
  componentPreviewAssistance: ComponentPreviewAssistance;
}
import 'vuesax/dist/vuesax.css' //Vuesax styles
import downloadFiles from '../../../services/workshop/downloadFiles';
import cssBuilder from '../../../services/workshop/cssBuilder';
import toolbar from './toolbar/Toolbar.vue';
import componentContents from './componentPreview/ComponentPreview.vue';
import newComponentModal from './newComponent/Modal.vue';
import componentList from './componentList/ComponentList.vue';
import { WorkshopComponent } from '../../../interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../../interfaces/workshopComponentCss';
import { ComponentPreviewAssistance } from '../../../interfaces/componentPreviewAssistance';
import { BUTTON_COMPONENT_MODES } from '../../../consts/buttonComponentModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import { UpdateMode } from '../../../interfaces/updateMode';

export default {
  data: (): Data => ({
    componentPreviewAssistance: { margin: false },
    components: [
      {
        type: NEW_COMPONENT_TYPES.BUTTON,
        componentProperties: {
          frameworkClass: 'foundation',
          componentClass: 'button',
          innerHtml: 'button',
          transition: 'all 0.25s ease-out',
          customCss: {
            [BUTTON_COMPONENT_MODES.DEFAULT]: {
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
              color: '#ffffff',
            },
            [BUTTON_COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [BUTTON_COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          initialCss: {
            [BUTTON_COMPONENT_MODES.DEFAULT]: {
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
            [BUTTON_COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [BUTTON_COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          customJS: {},
          customCssActiveMode: BUTTON_COMPONENT_MODES.DEFAULT,
        },
        className: 'button'
      },
    ],
    currentlySelectedComponent: {
      type: NEW_COMPONENT_TYPES.BUTTON,
      componentProperties: {
        frameworkClass: 'foundation',
        componentClass: 'button',
        innerHtml: 'button',
        transition: 'all 0.25s ease-out',
        customCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
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
            color: '#ffffff',
          },
          [BUTTON_COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        initialCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
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
          [BUTTON_COMPONENT_MODES.HOVER]: {
            backgroundColor: '#ff0000',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            backgroundColor: '#409441',
          },
        },
        customJS: {},
        customCssActiveMode: BUTTON_COMPONENT_MODES.DEFAULT,
      },
      className: 'button'
    },
  }),
  methods: {
    addNewComponent: function(newComponent: WorkshopComponent): void {
      this.components.push(newComponent);
      this.currentlySelectedComponent = newComponent;
      this.$refs.toolbar.updateMode([BUTTON_COMPONENT_MODES.DEFAULT] as UpdateMode);
    },
    componentCardSelected: function(selectedComponentCard: WorkshopComponent): void {
      if (this.currentlySelectedComponent.componentProperties.hasOwnProperty('customCssActiveMode')) {
        this.currentlySelectedComponent.componentProperties.customCssActiveMode = BUTTON_COMPONENT_MODES.DEFAULT;
      }
      this.$refs.toolbar.updateMode([BUTTON_COMPONENT_MODES.DEFAULT] as UpdateMode);
      if (this.currentlySelectedComponent !== selectedComponentCard) { this.currentlySelectedComponent = selectedComponentCard; }
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      this.addNewComponent(JSON.parse(JSON.stringify(selectComponentCard)));
    },
    downloadCSSFile: function(): void {
      const inherentCustomCssForButtons = {
        cursor: 'pointer',
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: '0.85em',
        paddingRight: '0.85em',
        fontSize: '14px',
        textAlign: 'center',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        transition: 'all 0.25s ease-out',
      } as WorkshopComponentCss;
      const resultCss = cssBuilder.build('mock-class-name', inherentCustomCssForButtons,
        this.currentlySelectedComponent.componentProperties.customCss);
      downloadFiles.downloadZip(resultCss, this.currentlySelectedComponent.componentProperties.customJS);
    },
  },
  components: {
    toolbar,
    componentList,
    componentContents,
    newComponentModal,
  }
};

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
