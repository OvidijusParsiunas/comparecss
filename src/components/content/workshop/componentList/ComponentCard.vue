<template>
  <div class="card component-card" v-on:click="selectComponentCard(thisComponent)">
    <div class="card-body">
      <input v-if="isEditingClassName" ref="componentCardClassNameEditorInput" class="card-title component-card-title"
        v-model="className"
        :placeholder="thisComponent.className"
        @input="classNameInputEvent"
        >
      <h5 v-else class="card-title component-card-title">{{thisComponent.className}}</h5>
      <a ref="componentCardClassNameEditorButton" class="btn btn-success" v-on:click="editClassName(thisComponent)">Edit</a>
      <a class="btn btn-warning" v-on:click.stop="copyComponentCard(thisComponent)">Copy</a>
      <a class="btn btn-danger component-card-delete" data-toggle="modal" :data-target="removeComponentModalId" @click="deleteComponentCard">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { RemovalModalState } from '../../../../interfaces/removalModalState';
import ProcessClassName from '../../../../services/workshop/newComponent/processClassName';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { REMOVE_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import { removeComponentModalState } from './modal/state';
import { nextTick } from 'vue';

interface Data {
  className: string;
  isEditingClassName: boolean;
  removeComponentModalId: string;
  editorButtonClickedOnStopEditing: boolean;
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
  }),
  methods: {
    editClassName(): void {
      if (this.editorButtonClickedOnStopEditing) {
        this.editorButtonClickedOnStopEditing = false;
        return;
      }
      this.className = this.thisComponent.className;
      this.isEditingClassName = !this.isEditingClassName;
      this.$emit('stop-editing-class-name-callback', this.stopEditingClassName);
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
        if (event.key === 'Enter') {
          this.isEditingClassName = false;
          this.thisComponent.className = ProcessClassName.finalize(this.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
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
    selectComponentCard(selectedComponentCard: WorkshopComponent): void {
      this.$emit('component-card-selected', selectedComponentCard);
    },
    copyComponentCard(selectComponentCard: WorkshopComponent): void {
      this.$emit('component-card-copied', selectComponentCard);
    },
    deleteComponentCard(): void {
      if (!this.getIsDoNotShowModalAgainState()){
        this.removeComponentModalId = `#${REMOVE_COMPONENT_MODAL_ID}`;
        setTimeout(() => { this.removeComponentModalId = ''; });
      } else {
        this.$emit('component-card-deleted');
      }
    },
    classNameInputEvent(): void {
      this.className = ProcessClassName.process(this.className);
    },
  },
  props: {
    thisComponent: Object,
    allComponents: Object,
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
  .component-card-delete {
    float: right;
  }
</style>
