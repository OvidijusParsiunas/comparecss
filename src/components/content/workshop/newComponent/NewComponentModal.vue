<template>
  <div class="modal fade" id="newComponentModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add new component</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form style="width: 100%">
            <input ref="modalClassNameEditorInput" style="width: 50%" class="form-control" type="text"
              v-model="className"
              @input="changeClassName"
              @keydown.enter="blurClassNameEditorInput"
              @mousedown="editClassName(component)">
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
          <button v-on:click="addNewComponent(NEW_COMPONENT_TYPES.ALERT)" type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import newComponentModalService from '../../../../services/workshop/newComponentModal';
import { componentTypeToStyles } from './types/componentTypeToStyles';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import { NEW_COMPONENT_STYLES } from '../../../../consts/newComponentStyles.enum';
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import ProcessClassName from '../../../../services/workshop/newComponent/processClassName';

interface Data {
  previewImage: string;
  classNameIndex: number;
  className: string;
  classNamePlaceholder: string;
}

interface Consts {
  MODAL_FADE_MILLISECONDS: number;
  CLASS_NAME_PREFIX: string;
  NEW_COMPONENT_TYPES,
}

export default {
  setup(): Consts {
    return {
      MODAL_FADE_MILLISECONDS: 500,
      CLASS_NAME_PREFIX: 'component-',
      NEW_COMPONENT_TYPES,
    };
  },
  data: (): Data => ({
    previewImage: 'previewImage',
    classNameIndex: 1,
    className: null,
    classNamePlaceholder: null,
  }),
  created(): void {
    if (!this.className) { this.className = this.createClassName(this.classNameIndex); }
    if (!this.classNamePlaceholder) { this.classNamePlaceholder = this.createClassName(this.classNameIndex); }
  },
  methods: {
    createClassName(classNameIndex: number): string {
      return `${this.CLASS_NAME_PREFIX}${classNameIndex}`;
    },
    setComponentPreviewImage(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    addNewComponent(newComponentType: NEW_COMPONENT_TYPES): void {
      const newComponent = componentTypeToStyles[newComponentType][NEW_COMPONENT_STYLES.DEFAULT].getNewComponent();
      newComponent.className = this.className;
      this.$emit('add-new-component', newComponent);
      // updates modal only after it has closed
      setTimeout(() => {
        this.classNameIndex++;
        this.className = this.createClassName(this.classNameIndex);
        this.classNamePlaceholder = this.createClassName(this.classNameIndex);
      }, this.MODAL_FADE_MILLISECONDS);
    },
    changeClassName(): void {
      this.className = ProcessClassName.process(this.className);
    },
    blurClassNameEditorInput(event: KeyboardEvent): void {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    },
    editClassName(): void {
      this.$emit('stop-editing-class-name-callback', this.stopEditingClassName);
    },
    stopEditingClassName(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Enter') {
          this.className = ProcessClassName.finalize(this.className, this.classNamePlaceholder, this.components);
          return { shouldRepeat: false };
        }
        return { shouldRepeat: true };
      }
      if (event.target !== this.$refs.modalClassNameEditorInput) {
        this.className = ProcessClassName.finalize(this.className, this.classNamePlaceholder, this.components);
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

<style lang="css" scoped>
  input:focus, select:focus {
    box-shadow: none !important;
    border-color: #b5b5b5 !important;
  }
  button:focus {
    box-shadow: none !important;
  }
</style>