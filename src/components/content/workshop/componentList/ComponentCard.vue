<template>
  <div style="cursor: move; width: 18rem; margin: auto; margin-top: 5px" class="card component-card" v-on:click="selectComponentCard(thisComponent)" tabindex="0">
    <div class="card-body">
      <input ref="componentCardClassNameEditorInput" v-if="isEditingClassName" style="float: left" class="card-title"
        :placeholder="thisComponent.className" v-model="className"
        @input="processClassName"
        >
      <h5 v-else style="float: left" class="card-title">{{thisComponent.className}}</h5>
      <a ref="componentCardClassNameEditorButton" class="btn btn-success" v-on:click.stop="editClassName(thisComponent)">Edit</a>
      <a class="btn btn-warning" v-on:click.stop="copyComponentCard(thisComponent)">Copy</a>
      <a style="float: right" class="btn btn-danger" v-on:click.stop="deleteComponentCard(thisComponent)">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import ProcessClassName from '../../../../services/workshop/newComponent/processClassName';

interface Data {
  className: string,
  isEditingClassName: boolean,
  editorButtonClickedOnStopEditing: boolean
}

export default {
  data: (): Data => ({
    className: null,
    isEditingClassName: false,
    editorButtonClickedOnStopEditing: false,
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
    deleteComponentCard(selectComponentCard: WorkshopComponent): void {
      this.$emit('component-card-deleted', selectComponentCard);
    },
    processClassName(): void {
      this.className = ProcessClassName.process(this.className);
    },
    finishEditingClassName(): void {
      if (this.className.length === 1) { this.className = this.thisComponent.className; }
      this.thisComponent.className = this.className;
    },
  },
  props: {
    thisComponent: Object,
    allComponents: Object,
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
