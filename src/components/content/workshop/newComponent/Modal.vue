<template>
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
                    <!-- store these in a const file -->
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
          <button v-on:click="addNewComponent('Button')" type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import newComponentModalService from '../../../../services/workshop/newComponentModal';
import newComponentManager from '../../../../services/workshop/newComponent/newComponentManager';
interface Data {
  previewImage: string;
}

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
  }),
  methods: {
    setComponentPreviewImage: function(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent: function(componentName: string): void {
      const newComponent = newComponentManager.getNewComponentProperties(componentName);
      this.$emit('add-new-component', newComponent);
    },
  }
};
</script>
