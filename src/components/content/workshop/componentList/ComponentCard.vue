<template>
  <div class="component-card" :class="COMPONENT_CARD_MARKER">
    <div class="component-body-container" :class="[highlightCard(), COMPONENT_CARD_MARKER]"
      @mousedown="selectComponentCard(thisComponent)">
      <div class="card-body" :class="COMPONENT_CARD_MARKER">
        <input v-if="isInputElementDisplayed" ref="componentCardClassNameEditorInput" class="card-title component-card-title"
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
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER } from '../../../../consts/elementClassMarkers';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { ClassNameEditState } from '../../../../interfaces/classNameEditState';
import { COMPONENT_CARD_MARKER } from '../../../../consts/elementClassMarkers';
import { removeComponentModalState } from './state/removeComponentModalState';
import { RemovalModalState } from '../../../../interfaces/removalModalState';
import ProcessClassName from '../utils/componentGenerator/processClassName';
import { REMOVE_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import { classNameEditState } from './state/classNameEditState';
import { nextTick } from 'vue';

interface Data {
  className: string;
  COMPONENT_CARD_MARKER: string;
  removeComponentModalId: string;
  isInputElementDisplayed: boolean;
  editorButtonClickedOnStopEditing: boolean;
  CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER: string;
}

export default {
  setup(): RemovalModalState & ClassNameEditState {
    return { ...removeComponentModalState, ...classNameEditState };
  },
  data: (): Data => ({
    className: null,
    COMPONENT_CARD_MARKER,
    removeComponentModalId: '',
    isInputElementDisplayed: false,
    CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER,
    editorButtonClickedOnStopEditing: false,
  }),
  methods: {
    highlightCard(): string {
      if (this.currentlySelectedImportComponent && this.currentlySelectedImportComponent === this.thisComponent) {
        return 'component-selected-to-import';
      }
      if (this.thisComponent === this.currentlySelectedComponent) {
        return 'component-selected';
      }
      return '';
    },
    editClassName(): void {
      this.selectComponentCard();
      if (this.editorButtonClickedOnStopEditing) {
        this.editorButtonClickedOnStopEditing = false;
        return;
      }
      this.isInputElementDisplayed = this.getIsClassNameEditingInProgressState();
      if (this.isInputElementDisplayed) {
        this.thisComponent.className = this.className;
      } else {
        this.className = this.thisComponent.className;
      }
      this.isInputElementDisplayed = !this.isInputElementDisplayed;
      this.setIsClassNameEditingInProgressState(this.isInputElementDisplayed);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.stopEditingClassName};
      this.$emit('stop-editing-class-name-callback', workshopEventCallback);
      if (this.isInputElementDisplayed) this.focusClassNameInput();
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
          this.stopEditing();
          this.thisComponent.className = ProcessClassName.finalize(this.className || this.thisComponent.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
          return { shouldRepeat: false };
        }
        return { shouldRepeat: true };
      }
      if (event.target !== this.$refs.componentCardClassNameEditorInput) {
        this.stopEditing();
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
      if (this.getIsClassNameEditingInProgressState()) return;
      // remove/copy component without selecting its card
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
    stopEditing(): void {
      this.setIsClassNameEditingInProgressState(false);
      this.isInputElementDisplayed = false;
    }
  },
  props: {
    thisComponent: Object,
    allComponents: Object,
    currentlySelectedComponent: Object,
    currentlySelectedImportComponent: Object,
    isImportSubcomponentModeActive: Boolean,
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
  .component-card-title {
    float: left;
  }
  .component-card-remove {
    float: right;
  }
  .component-selected, .component-selected:hover {
    box-shadow: 0 0 1px rgb(93, 153, 192) !important;
    border-color: #a3cdff !important;
    background-color: rgb(250, 253, 255) !important;
    /* can set the background to grey */
    /* box-shadow: 0 0 1px rgb(221, 221, 221) !important;
    border-color: rgb(190, 190, 190) !important;
    background-color: rgb(247, 247, 247) !important; */
  }
  .component-selected:hover {
    border-color: #72abf0 !important;
  }
  .component-selected-to-import, .component-selected-to-import:hover {
    box-shadow: 0 0 1px rgb(194, 183, 87) !important;
    border-color: #fff6a3 !important;
    background-color: rgb(255, 255, 244) !important;
  }
  .component-selected-to-import:hover {
    border-color: #f0e872 !important;
  }
</style>
