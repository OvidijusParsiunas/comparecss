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
                    <option v-for="newComponentType in NEW_COMPONENT_TYPES" :key="newComponentType" v-on:mouseenter="setComponentPreviewImage(newComponentType)">{{newComponentType}}</option>
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
import newComponentContainer from '../../../../services/workshop/newComponent/newComponentContainer';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { NEW_COMPONENT_STYLES } from '../../../../consts/newComponentStyles.enum';

interface Data {
  previewImage: string;
  NEW_COMPONENT_TYPES,
}

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    NEW_COMPONENT_TYPES,
  }),
  methods: {
    setComponentPreviewImage: function(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent: function(newComponentType: NEW_COMPONENT_TYPES): void {
      const newComponent = newComponentContainer[newComponentType][NEW_COMPONENT_STYLES.DEFAULT].getNewComponent();
      this.$emit('add-new-component', newComponent);
    },
  }
};
</script>
