<template>
  <div class="modal fade" :id="NEW_COMPONENT_MODAL_ID">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add new component</h5>
          <button ref="closeButton" type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form style="width: 100%">
            <label style="margin-bottom: 1px">Class name:</label>
            <input ref="modalClassNameEditor" style="width: 50%" class="form-control" type="text"
              v-model="className"
              :placeholder="classNamePlaceholder"
              @input="inputValueIntoClassNameEditor"
              @keydown.enter="blurClassNameEditor"
              @click="prepareToEditClassNameEditor"
              @keydown.esc.stop="stopEditingClassName">
            <div class="form-row">
              <div class="form-group col-md-6">
                <div class="form-group">
                  <label style="margin-bottom: 1px; margin-top: 5px">Component type:</label>
                  <select class="custom-select" size="5">
                    <option v-for="newComponentType in NEW_COMPONENT_TYPES" :key="newComponentType"
                      @mouseenter="setComponentPreviewImage(newComponentType)"
                      @click="selectComponentType(newComponentType)">
                      {{newComponentType}}
                    </option>
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
          <button ref="addButton"
            type="button" class="btn btn-primary" data-dismiss="modal"
            @click="addNewComponent">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import newComponentModalService from '../../../../services/workshop/newComponentModal';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { NEW_COMPONENT_STYLES } from '../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';
import ProcessClassName from '../utils/componentGenerator/processClassName';
import { NEW_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import { componentTypeToStyles } from './types/componentTypeToStyles';

interface Data {
  previewImage: string;
  classNameIndex: number;
  className: string;
  classNamePlaceholder: string;
  currentlySelectedComponentType: NEW_COMPONENT_TYPES;
}

interface Consts {
  MODAL_FADE_MILLISECONDS: number;
  CLASS_NAME_PREFIX: string;
  NEW_COMPONENT_TYPES;
  NEW_COMPONENT_MODAL_ID;
}

export default {
  setup(): Consts {
    return {
      MODAL_FADE_MILLISECONDS: 500,
      CLASS_NAME_PREFIX: 'component-',
      NEW_COMPONENT_TYPES,
      NEW_COMPONENT_MODAL_ID,
    };
  },
  data: (): Data => ({
    previewImage: 'previewImage',
    classNameIndex: 1,
    className: null,
    classNamePlaceholder: null,
    currentlySelectedComponentType: null,
  }),
  created(): void {
    if (!this.className) { this.className = this.createClassName(this.classNameIndex); }
    if (!this.classNamePlaceholder) { this.classNamePlaceholder = this.createClassName(this.classNameIndex); }
    if (!this.currentlySelectedComponentType) { this.currentlySelectedComponentType = Object.values(this.NEW_COMPONENT_TYPES)[0]; }
  },
  methods: {
    prepare(): void {
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.keyEventHandler };
      this.$emit('new-component-modal-callback', workshopEventCallback);
      this.isClassNameTextHighlighted = false;
    },
    createClassName(classNameIndex: number): string {
      return `${this.CLASS_NAME_PREFIX}${classNameIndex}`;
    },
    setComponentPreviewImage(componentName: string): void {
      this.previewImage = newComponentModalService.getPreviewImage(componentName);
    },
    prepareToEditClassNameEditor(): void {
      // selectionStart and selectionEnd are used to make sure the user has not already highlighted the text themselves
      const { selectionStart, selectionEnd } = this.$refs.modalClassNameEditor;
      if (!this.isClassNameTextHighlighted && (selectionStart === selectionEnd)) {
        this.isClassNameTextHighlighted = true;
        this.$refs.modalClassNameEditor.select();
      }
    },
    keyEventHandler(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (!this.$refs.modalClassNameEditor.offsetParent) return { shouldRepeat: false };
      if (this.$refs.modalClassNameEditor === document.activeElement) {
        this.$refs.modalClassNameEditor.blur();
        if (event instanceof KeyboardEvent) {
          if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER || event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
            this.className = ProcessClassName.finalize(this.className || this.classNamePlaceholder, this.classNamePlaceholder, this.components);
          }
        }
        if (event.target !== this.$refs.modalClassNameEditor) {
          this.className = ProcessClassName.finalize(this.className || this.classNamePlaceholder, this.classNamePlaceholder, this.components);
        }
      } else if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
          this.$refs.closeButton.click();
          return { shouldRepeat: false };
        }
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.$refs.addButton.click();
          return { shouldRepeat: false };
        }
      }
      return { shouldRepeat: true };
    },
    inputValueIntoClassNameEditor(): void {
      const inputElement = event.target as HTMLInputElement;
      const initialStartPosition = inputElement.selectionStart;
      this.className = ProcessClassName.process(this.className);
      setTimeout(() => { inputElement.setSelectionRange(initialStartPosition, initialStartPosition); });
    },
    blurClassNameEditor(event: KeyboardEvent): void {
      event.preventDefault();
      this.isClassNameTextHighlighted = false;
      // prevents the following: when text is highlighted, user clicks on a component type option then clicks on input again - causing the highlight to flicker
      if (window.getSelection) window.getSelection().removeAllRanges();
    },
    selectComponentType(componentType: NEW_COMPONENT_TYPES): void {
      this.currentlySelectedComponentType = componentType;
    },
    addNewComponent(): void {
      const newComponent = componentTypeToStyles[this.currentlySelectedComponentType][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
      newComponent.className = this.className;
      this.$emit('add-new-component', newComponent);
      // updates modal only after it has closed
      setTimeout(() => {
        this.classNameIndex++;
        this.className = this.createClassName(this.classNameIndex);
        this.classNamePlaceholder = this.createClassName(this.classNameIndex);
      }, this.MODAL_FADE_MILLISECONDS);
    }
  },
  props: {
    components: Object,
  },
};
</script>

<style lang="css" scoped>
  input:focus, select:focus {
    box-shadow: none !important;
    border-color: #8f8f8f !important;
  }
  button:focus {
    box-shadow: none !important;
  }
</style>