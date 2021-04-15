<template>
  <div :class="[ thisComponent === activeComponent ? 'active' : '', COMPONENT_CARD_MARKER ]" class="card component-card" @mousedown="selectComponentCard(thisComponent)">
    <div class="card-body" :class="COMPONENT_CARD_MARKER">
      <input v-if="isEditingClassName" ref="componentCardClassNameEditorInput" class="card-title component-card-title"
        v-model="className"
        :placeholder="thisComponent.className"
        @input="classNameInputEvent"
        >
      <h5 v-else class="card-title component-card-title" :class="COMPONENT_CARD_MARKER">{{thisComponent.className}}</h5>
      <div v-if="!isImportSubcomponentModeActive">
        <a ref="componentCardClassNameEditorButton" class="btn btn-success" @mousedown="preventBubbling" @mouseup="editClassName">Edit</a>
        <a class="btn btn-warning" @mousedown="preventBubbling" @mouseup="copyComponentCard">Copy</a>
        <a class="btn btn-danger component-card-remove" data-toggle="modal" :data-target="removeComponentModalId" @mousedown="preventBubbling" @mouseup="removeComponentCard">Remove</a>
      </div>
      <div v-else>
        <a class="btn btn-success" :class="CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER">
          <font-awesome-icon class="import-icon" icon="check"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { removeComponentModalState } from './removeComponentModalState/removeComponentModalState';
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER } from '../../../../consts/elementClassMarkers';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { COMPONENT_CARD_MARKER } from '../../../../consts/elementClassMarkers';
import { RemovalModalState } from '../../../../interfaces/removalModalState';
import ProcessClassName from '../utils/componentGenerator/processClassName';
import { REMOVE_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import { nextTick } from 'vue';

interface Data {
  className: string;
  isEditingClassName: boolean;
  removeComponentModalId: string;
  editorButtonClickedOnStopEditing: boolean;
  COMPONENT_CARD_MARKER: string;
  CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER: string;
}

export default {
  setup(): RemovalModalState {
    return { ...removeComponentModalState };
  },
  data: (): Data => ({
    className: null,
    isEditingClassName: false,
    editorButtonClickedOnStopEditing: false,
    removeComponentModalId: '',
    COMPONENT_CARD_MARKER,
    CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER,
  }),
  methods: {
    editClassName(): void {
      this.selectComponentCard();
      if (this.editorButtonClickedOnStopEditing) {
        this.editorButtonClickedOnStopEditing = false;
        return;
      }
      if (this.isEditingClassName) {
        this.thisComponent.className = this.className;
      } else {
        this.className = this.thisComponent.className;
      }
      this.isEditingClassName = !this.isEditingClassName;
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.stopEditingClassName};
      this.$emit('stop-editing-class-name-callback', workshopEventCallback);
      if (this.isEditingClassName) this.focusClassNameInput();
    },
    focusClassNameInput(): void {
      nextTick(() => {
        const inputElement = this.$refs.componentCardClassNameEditorInput;
        const inputElementValueLength = inputElement.value.length;
        inputElement.focus();
        inputElement.setSelectionRange(inputElementValueLength, inputElementValueLength);
      });
    },
    stopEditingClassName(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Escape') {
          this.isEditingClassName = false;
          this.thisComponent.className = ProcessClassName.finalize(this.className || this.thisComponent.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
          return { shouldRepeat: false };
        }
        return { shouldRepeat: true };
      }
      if (event.target !== this.$refs.componentCardClassNameEditorInput) {
        this.isEditingClassName = false;
        if (this.className && this.className.length) {
          this.thisComponent.className = ProcessClassName.finalize(this.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
        }
        if (event.target === this.$refs.componentCardClassNameEditorButton) {
          this.editorButtonClickedOnStopEditing = true;
          return { shouldRepeat: false, newCallback: this.clearEditClassName };
        }
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    },
    clearEditClassName(): WorkshopEventCallbackReturn {
      if (this.editorButtonClickedOnStopEditing) {
        this.editorButtonClickedOnStopEditing = false;
      }
      return { shouldRepeat: false};
    },
    selectComponentCard(): void {
      this.$emit('component-card-selected', this.thisComponent);
    },
    preventBubbling(): void {
      event.stopPropagation();
    },
    copyComponentCard(): void {
      this.$emit('component-card-copied', this.thisComponent);
    },
    removeComponentCard(): void {
      if (!this.getIsDoNotShowModalAgainState()){
        this.selectComponentCard();
        this.removeComponentModalId = `#${REMOVE_COMPONENT_MODAL_ID}`;
        this.$emit('prepare-remove-component-modal');
        setTimeout(() => { this.removeComponentModalId = ''; });
      } else {
        this.$emit('component-card-removed', this.thisComponent);
      }
    },
    classNameInputEvent(): void {
      const inputElement = event.target as HTMLInputElement;
      const initialStartPosition = inputElement.selectionStart;
      this.className = ProcessClassName.process(this.className);
      setTimeout(() => { inputElement.setSelectionRange(initialStartPosition, initialStartPosition); });
    },
  },
  props: {
    thisComponent: Object,
    allComponents: Object,
    activeComponent: Object,
    isImportSubcomponentModeActive: Boolean,
  }
};
</script>

<style lang="css" scoped>
  .component-card {
    cursor: move;
    width: 18rem;
    margin: auto;
    margin-top: 5px
  }
  .component-card:hover {
    border-color: #d1d5da!important;
    box-shadow: 0 1px 3px rgba(106,115,125,.3)!important;
  }
  .component-card:focus {
    outline: none;
    border-color: #2188ff!important;
    box-shadow: 0 0 0 .2em rgba(3,102,214,.3)!important;
  }
  .component-card-title {
    float: left;
  }
  .component-card-remove {
    float: right;
  }
  .active, .active:hover {
    box-shadow: 0 0 1px rgb(93, 153, 192) !important;
    border-color: #a3cdff !important;
    background-color: rgb(250, 253, 255) !important;
    /* can set the background to grey */
    /* box-shadow: 0 0 1px rgb(221, 221, 221) !important;
    border-color: rgb(190, 190, 190) !important;
    background-color: rgb(247, 247, 247) !important; */
  }
  .active:hover {
    border-color: #72abf0 !important;
  }
</style>
