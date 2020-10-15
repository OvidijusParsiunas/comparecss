<template>
  <div>
    <div style="height: 100vh" class="bootstrap">
      <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
        <div style="width: 30%; position: relative">
          <div id="component-cards" style="background-color: rgb(251 251 251); display: grid; border-radius: 20px; height: 95%; width: 90%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center">
            <div id="component-cards-container" style="margin-top: 5px">
              <div v-for="componentName in components" :key="componentName">
                <!-- new component -->
                <div style="cursor: move; width: 18rem; margin: auto; margin-top: 5px" class="card component-card" v-on:click="selectComponentCard(componentName)" tabindex="0">
                  <div class="card-body">
                    <h5 style="float: left" class="card-title">{{componentName}}</h5>
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
        <div style="width: 70%">
          <!-- new component -->
          <div style="height: 20%; position: relative; display: flex">
            <div style="margin: 0; margin-left: 5%; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%); width: 80%"> 
              <button type="button" class="btn btn-primary">Primary</button>
              <button type="button" class="btn btn-secondary">Secondary</button>
              <button type="button" class="btn btn-success">Success</button>
              <button type="button" class="btn btn-danger">Danger</button>
              <button type="button" class="btn btn-warning">Warning</button>
            </div>
            <div style="width: 20%; margin-left: 80%; position: relative">
              <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                <button type="button" class="btn btn-secondary">Import</button>
              </div>
            </div>
          </div>
          <div style="height: 60%; position: relative;">
            <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
              {{ currentlySelectedComponent }}
            </div>
          </div>
          <div style="height: 20%; display: flex">
            <div style="width: 70%; position: relative">
              <div style="width: 100%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center">
                <div>
                  Class name
                  <input class="form-control" id="exampleInputEmail1" style="display: inline-block; width: 50%" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-secondary">Secondary</button>
                <button type="button" class="btn btn-success">Success</button>
                <button type="button" class="btn btn-danger">Danger</button>
                <button type="button" class="btn btn-warning">Warning</button>
              </div>
            </div>
            <div style="width: 30%; position: relative">
              <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
                <div style="text-align: center; margin-bottom: 5px">Size: 0kb</div>
                <button type="button" class="btn btn-success" @click="downloadCSSFile">Download</button>
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
  components: string[],
  currentlySelectedComponent: string,
  value: string,
}
import newComponentModalService from '../../../services/workshop/newComponentModal';
import 'vuesax/dist/vuesax.css' //Vuesax styles
import downloadFiles from '../../../services/workshop/downloadFiles';

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    components: ['Button'],
    currentlySelectedComponent: null,
    value: '',
  }),
  methods: {
    setComponentPreviewImage: function(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent: function(componentName: string): void {
      this.components.push(componentName);
    },
    selectComponentCard: function(componentName: string): void {
      this.currentlySelectedComponent = componentName;
    },
    downloadCSSFile: (): void => {
      downloadFiles.downloadZip('.uniquebutton { background-color: yellow }');
    }
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
</style>
