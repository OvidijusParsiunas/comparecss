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
            <input ref="modalClassNameEditorInput" style="width: 50%" class="form-control" type="text"
              :placeholder="classNamePlaceholder" v-model="className"
              @input="changeClassName"
              @keydown.enter="blurClassNameEditorInput"
              @click="editClassName(component)">
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
import newComponentContainer from './newComponentContainer';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { NEW_COMPONENT_STYLES } from '../../../../consts/newComponentStyles.enum';
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import ProcessClassName from '../../../../services/workshop/newComponent/processClassName';

interface Data {
  previewImage: string;
  NEW_COMPONENT_TYPES,
  className: string;
  classNamePlaceholder: string;
  classNameIndex: number;
}

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    NEW_COMPONENT_TYPES,
    className: null,
    classNamePlaceholder: `component-1`,
    classNameIndex: 2,
  }),
  methods: {
    setComponentPreviewImage(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent(newComponentType: NEW_COMPONENT_TYPES): void {
      const newComponent = newComponentContainer[newComponentType][NEW_COMPONENT_STYLES.DEFAULT].getNewComponent();
      newComponent.className = this.className || this.classNamePlaceholder;
      this.$emit('add-new-component', newComponent);
      // updates modal only after it has closed
      setTimeout(() => {
        this.className = null;
        this.classNamePlaceholder = `component-${this.classNameIndex++}`;
      }, 500);
    },
    changeClassName(): void {
      this.className = ProcessClassName.process(this.className);
    },
    blurClassNameEditorInput: (event: KeyboardEvent): void => {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    },
    editClassName(): void {
      this.$emit('stop-editing-class-name-callback', this.stopEditingClassName);
    },
    stopEditingClassName(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Enter') {
          this.className = ProcessClassName.finalize(this.className, this.placeholder, this.components);
          return { shouldRepeat: false };
        }
        return { shouldRepeat: true };
      }
      if (event.target !== this.$refs.modalClassNameEditorInput) {
        this.className = ProcessClassName.finalize(this.className, this.placeholder, this.components);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    },
  },
  props: {
    components: Object,
  },
};
</script>
