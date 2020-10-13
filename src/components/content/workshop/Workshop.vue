<template>
  <div class="bootstrap">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add +</button>

    <div id="componentCards">
      <div v-for="componentName in components" :key="componentName">
        <!-- new component -->
        <div style="cursor: move; width: 18rem;" class="card component-card" tabindex="0">
          <div class="card-body">
            <h5 style="float: left" class="card-title">{{componentName}}</h5>
            <a style="float: right" href="#" class="btn btn-danger">Delete</a>
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
}
import newComponentModalService from '../../../services/workshop/newComponentModal';

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    components: ['Button'],
  }),
  methods: {
    setComponentPreviewImage: function(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent: function(componentName: string): void {
      this.components.push(componentName);
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
