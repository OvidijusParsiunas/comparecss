<template>
  <div class="component-card" :class="COMPONENT_CARD_MARKER">
    <div class="component-body-container component-card-dimensions"
    :class="[highlightCard(), COMPONENT_CARD_MARKER]"
      @mousedown="setActiveComponent"
      @mouseenter="mouseHoverComponentCard(true)"
      @mouseleave="mouseHoverComponentCard(false)">
      <div class="card-body" :class="COMPONENT_CARD_MARKER">
        <input v-if="isInputElementDisplayed" ref="componentCardClassNameEditorInput" class="card-title component-card-title"
          :class="COMPONENT_CARD_MARKER"
          v-model="className"
          :placeholder="thisComponent.className"
          @input="classNameInputEvent"
          >
        <h5 v-else class="card-title component-card-title" :class="COMPONENT_CARD_MARKER">{{thisComponent.className}}</h5>
        <div v-if="!isSyncChildComponentModeActive" :class="COMPONENT_CARD_MARKER">
          <a ref="componentCardClassNameEditorButton" class="btn btn-success" :class="COMPONENT_CARD_MARKER" @mousedown="preventBubbling" @mouseup="editClassName">Edit</a>
          <a class="btn btn-warning" :class="COMPONENT_CARD_MARKER" @mousedown="preventBubbling" @mouseup="copyComponent">Copy</a>
          <a class="btn btn-danger component-card-remove" :class="COMPONENT_CARD_MARKER" data-toggle="modal" :data-target="removeComponentModalId" @mousedown="preventBubbling" @mouseup="removeComponent">Remove</a>
        </div>
        <div v-else :class="COMPONENT_CARD_MARKER">
          <a class="btn btn-success" :class="CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER">
            <font-awesome-icon icon="check"/>
          </a>
        </div>
      </div>
      <div v-if="isDisplayingSyncableComponentCardOverlay()" class="sync-child-component-overlay static-position"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { SyncableComponentCardOverlaysToDisplay } from '../../../../interfaces/syncableComponentCardOverlaysToDisplay';
import { SyncChildComponentUtils } from '../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER } from '../../../../consts/elementClassMarkers';
import { ComponentCardHoveredEvent } from '../../../../interfaces/componentCardHoveredEvent'
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
  CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER: string;
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
    CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER,
    editorButtonClickedOnStopEditing: false,
  }),
  methods: {
    highlightCard(): string {
      if (this.isSyncChildComponentModeActive) {
        if (this.currentlySelectedComponentForSync === this.thisComponent) {
          return 'component-selected-during-sync-child-component-mode';
        } else if (this.currentlyHoveredComponentToSync === this.thisComponent) {
          return 'component-hovered-during-sync-child-component-mode';
        }
      }
      if (this.currentlySelectedComponent === this.thisComponent) {
        return 'component-selected';
      }
      return '';
    },
    editClassName(): void {
      this.setActiveComponent();
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
        if (this.className?.length) {
          this.thisComponent.className = ProcessClassName.finalize(this.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
        }
        if (event.target === this.$refs.componentCardClassNameEditorButton) {
          this.editorButtonClickedOnStopEditing = true;
          const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP]);
          return { shouldRepeat: false, newCallback: { keyTriggers, func: this.clearEditClassName }};
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
    setActiveComponent(): void {
      this.$emit('set-active-component', this.thisComponent);
    },
    mouseHoverComponentCard(isMouseEnter: boolean): void {
      this.$emit('component-card-hovered', [this.thisComponent, isMouseEnter] as ComponentCardHoveredEvent);
    },
    preventBubbling(): void {
      if (this.getIsClassNameEditingInProgressState() || this.$parent.$parent.$parent.getNumberOfPendingWorkshopEventCallbacks() > 0) return;
      // remove/copy component without selecting its card
      event.stopPropagation();
    },
    copyComponent(): void {
      this.$emit('copy-component', this.thisComponent);
    },
    removeComponent(): void {
      if (!this.getIsDoNotShowModalAgainState()){
        this.setActiveComponent();
        this.removeComponentModalId = `#${REMOVE_COMPONENT_MODAL_ID}`;
        this.$emit('prepare-remove-component-modal');
        setTimeout(() => { this.removeComponentModalId = ''; });
      } else {
        this.$emit('remove-component', this.thisComponent);
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
    },
    isDisplayingSyncableComponentCardOverlay(): boolean {
      if (!this.syncableComponentCardOverlaysToDisplay) return;
      const { isDisplaying, activeComponent } = this.syncableComponentCardOverlaysToDisplay as SyncableComponentCardOverlaysToDisplay;
      if (isDisplaying) {
        return SyncChildComponentUtils.isComponentSyncable(this.thisComponent, activeComponent);
      }
      return false;
    }
  },
  props: {
    thisComponent: Object,
    allComponents: Object,
    currentlySelectedComponent: Object,
    currentlyHoveredComponentToSync: Object,
    currentlySelectedComponentForSync: Object,
    syncableComponentCardOverlaysToDisplay: Object,
    isSyncChildComponentModeActive: Boolean,
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
  .component-selected-during-sync-child-component-mode {
    background-color: rgb(255, 255, 213) !important;
    box-shadow: 0 0 1px rgb(194, 183, 87) !important;
    border-color: #fff6a3 !important;
  }
  .component-hovered-during-sync-child-component-mode:hover {
    background-color: rgb(255, 255, 231) !important;
    box-shadow: 0 0 1px rgb(212, 204, 124) !important;
    border-color: #fff6a3 !important;
  }
  /* used to enable the overlay to inherit width/height */
  .component-card-dimensions {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .sync-child-component-overlay {
    width: inherit;
    height: inherit;
    position: absolute;
    background-color: #f4ff0033;
    border: 1px solid yellow;
  }
</style>
