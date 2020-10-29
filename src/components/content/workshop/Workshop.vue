<template>
  <div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <div id="component-cards" style="background-color: rgb(251 251 251); display: grid; border-radius: 20px; height: 95%; width: 90%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center">
            <div id="component-cards-container" style="margin-top: 5px">
              <div v-for="component in components" :key="component">
                <!-- new component -->
                <div style="cursor: move; width: 18rem; margin: auto; margin-top: 5px" class="card component-card" v-on:click="selectComponentCard(component)" tabindex="0">
                  <div class="card-body">
                    <h5 style="float: left" class="card-title">{{component.className}}</h5>
                    <a style="float: right" href="#" class="btn btn-danger">Delete</a>
                  </div>
                </div>
              </div>
              <div style="cursor: move; width: 18rem; margin: auto; outline: none; margin-top: 5px" class="add-card card" data-toggle="modal" data-target="#exampleModal" tabindex="0">
                <div style="text-align: center" class="card-body">
                  <div style="height: 38px; padding-top: 6px">
                    Add +
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <toolbar :componentProperties="currentlySelectedComponent.componentProperties"/>
            <componentContents style="height: 50%" :componentProperties="currentlySelectedComponent.componentProperties"/>
            <div style="height: 18%; display: flex">              
              <div style="width: 30%; position: relative">
                <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                  <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div>
                  <button type="button" class="btn btn-success" @click="downloadCSSFile">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- new component -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add new component</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form style="width: 100%">
          <div class="form-row">
            <div class="form-group col-md-6">
              <div class="form-group">
                <label for="exampleFormControlSelect2">Example multiple select</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                  <option v-on:mouseenter="setComponentPreviewImage('Button')">Button</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Alert')">Alert</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Button')">Button</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Alert')">Alert</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Button')">Button</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Alert')">Alert</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Button')">Button</option>
                  <option v-on:mouseenter="setComponentPreviewImage('Alert')">Alert</option>
                </select>
              </div>
            </div>
            <div class="form-group col-md-6">
              {{previewImage}}
            </div>
          </div>
          </form>
            </div>
            <div class="modal-footer">
              <button v-on:click="addNewComponent('Alert')" type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
          </div>
        </div>
      </div>
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
  previewImage: string,
  components: [WorkshopComponent],
  currentlySelectedComponent: WorkshopComponent;
}
import newComponentModalService from '../../../services/workshop/newComponentModal';
import 'vuesax/dist/vuesax.css' //Vuesax styles
import downloadFiles from '../../../services/workshop/downloadFiles';
import toolbar from './toolbar/Toolbar.vue';
import componentContents from './componentPreview/ComponentPreview.vue';
import { WorkshopComponent } from '../../../interfaces/workshopComponent';
import { BUTTON_COMPONENT_MODES } from '../../../consts/buttonComponentModes.enum';

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    components: [
      {
        cardProperties: {
          type: 'Button',
        },
        componentProperties: {
          frameworkClass: 'foundation',
          componentClass: 'button',
          innerHtml: 'button',
          customCss: {
            [BUTTON_COMPONENT_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              outline: 'none',
            },
            [BUTTON_COMPONENT_MODES.HOVER]: { outline: 'none' },
            [BUTTON_COMPONENT_MODES.CLICK]: { outline: 'none' },
          },
          initialCss: {
            [BUTTON_COMPONENT_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              outline: 'none',
          },
            [BUTTON_COMPONENT_MODES.HOVER]: { outline: 'none' },
            [BUTTON_COMPONENT_MODES.CLICK]: { outline: 'none' },
          },
          customCssActiveMode: BUTTON_COMPONENT_MODES.DEFAULT,
        },
        className: 'button'
      },
    ],
    currentlySelectedComponent: {
      cardProperties: {
        type: 'Button',
      },
      componentProperties: {
        frameworkClass: 'foundation',
        componentClass: 'button',
        innerHtml: 'button',
        customCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
            borderRadius: '0px',
            borderWidth: '0px',
            borderColor: '#1779ba',
            backgroundColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            lineHeight: '0',
            paddingTop: '19px',
            paddingBottom: '19px',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
          [BUTTON_COMPONENT_MODES.HOVER]: {
            borderRadius: '0px',
            borderWidth: '0px',
            borderColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            backgroundColor: 'red',
            outline: 'none',
            lineHeight: '0',
            paddingTop: '19px',
            paddingBottom: '19px',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            borderRadius: '0px',
            borderWidth: '0px',
            backgroundColor: '#409441',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            paddingTop: '2px',
            paddingBottom: '2px',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
        },
        initialCss: {
          [BUTTON_COMPONENT_MODES.DEFAULT]: {
            borderRadius: '10px',
            borderWidth: '10px',
            backgroundColor: '#1779ba',
            borderColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
          [BUTTON_COMPONENT_MODES.HOVER]: {
            borderRadius: '0px',
            borderWidth: '0px',
            borderColor: '#1779ba',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
          [BUTTON_COMPONENT_MODES.CLICK]: {
            borderRadius: '0px',
            borderWidth: '0px',
            backgroundColor: '#409441',
            boxShadow: '0px 0px 0px 0px #000000',
            outline: 'none',
            marginLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            width: '69px',
            height: '38px',
          },
        },
        customCssActiveMode: BUTTON_COMPONENT_MODES.DEFAULT,
      },
      className: 'button'
    },
  }),
  methods: {
    setComponentPreviewImage: function(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent: function(componentName: string, componentHTML: string): void {
      this.components.push([componentName, componentHTML]);
    },
    selectComponentCard: function(componentName: string): void {
      this.currentlySelectedComponent = componentName;
    },
    downloadCSSFile: (): void => {
      downloadFiles.downloadZip('.uniquebutton { background-color: yellow }');
    },
  },
  components: {
    toolbar,
    componentContents,
  }
};

</script>

<style lang="css" scoped>
  .component-card:hover {
    border-color: #d1d5da!important;
    box-shadow: 0 1px 3px rgba(106,115,125,.3)!important;
  }
  .component-card:focus {
    outline: none;
    border-color: #2188ff!important;
    box-shadow: 0 0 0 .2em rgba(3,102,214,.3)!important;
  }
  .add-card {
    border: 1px dashed #c2c2c2 !important;
  }
  .add-card:hover {
    border: 1px dashed #949494 !important;
  }
  .add-card:focus {
    border: 1px dashed #2e2e2e !important;
  }
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
