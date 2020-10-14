<template>
  <div style="height: 100vh">
    <div class="vs-input-parent vs-input-parent--state-null vs-component--primary" placeholder="Name"><div class="vs-input-content"><input placeholder="" id="vs-input--955" class="vs-input"><label for="vs-input--955" class="vs-input__label">Name</label><div class="vs-input__affects"><div class="vs-input__affects__1"></div><div class="vs-input__affects__2"></div><div class="vs-input__affects__3"></div><div class="vs-input__affects__4"></div></div></div><!----><!----><!----><!----></div>
    <div class="center"><button class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default"><div class="vs-button__content">
    Active
  </div></button> <button class="vs-button vs-button--null vs-button--size-null vs-button--active vs-button--primary vs-button--default"><div class="vs-button__content">
    Default
  </div></button> <button disabled="disabled" class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default"><div class="vs-button__content">Disabled</div></button></div>

<div data-v-6eed31ed="" class="vs-card-content type-2"><div class="vs-card"><div class="vs-card__img"><img data-v-6eed31ed="" src="assets/images/card-picture.webp" alt=""><div class="vs-card__interactions"><button data-v-6eed31ed="" class="vs-button vs-button--null vs-button--size-null vs-button--icon vs-button--danger vs-button--default"><div class="vs-button__content"><i data-v-6eed31ed="" class="bx bx-heart"></i></div></button> <button data-v-6eed31ed="" class="vs-button btn-chat vs-button--null vs-button--size-null vs-button--primary vs-button--shadow"><div class="vs-button__content"><i data-v-6eed31ed="" class="bx bx-chat"></i> <span data-v-6eed31ed="" class="span">
          54
        </span></div></button></div></div><div class="vs-card__text"><div class="vs-card__title"><h3 data-v-6eed31ed="">Change destiny</h3></div><p data-v-6eed31ed="">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p></div></div></div>
<button class="vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default"><div class="vs-button__content">Close Alert</div></button> <div class="vs-alert vs-component--primary v-enter-to" style="height: 159px;"><div class="vs-alert__title">
      Vuesax Framework
    </div><div class="vs-alert__content"><div class="vs-alert__content__text">
    Vuesax (pronunciado / vjusacksː /, como view sacks) es un <b>framework de componentes UI</b> creado con <a href="https://vuejs.org/">Vuejs</a> para hacer proyectos fácilmente y con un estilo único y agradable, vuesax esta creado desde cero y pensado para todo tipo de desarrollador desde el amante del frontend hasta el backend que quiere crear fácilmente su enfoque visual al usuario final
  </div></div><button class="vs-alert__close"><i class="vs-icon-close vs-icon-hover-less"></i></button></div>

    <div style="height: 100%; margin-left: 0px; margin-right: 0px; display: flex">
      <div style="width: 30%; position: relative">
        <button type="button" style="display: block" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add +</button>
        <div v-for="componentName in components" :key="componentName">
          <!-- new component -->
          <div style="cursor: move; width: 18rem; margin: auto" class="card component-card" v-on:click="selectComponentCard(componentName)" tabindex="0">
            <div class="card-body">
              <h5 style="float: left" class="card-title">{{componentName}}</h5>
              <a style="float: right" href="#" class="btn btn-danger">Delete</a>
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
              <button type="button" class="btn btn-success">Download</button>
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
            <button v-on:click="addNewComponent('Alert')" type="button" class="btn btn-primary"  data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
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
</style>
