<template>
  <div class="modal fade cancel-element" @click="closeModal" :id="modalId">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-text">Remove</h5>
          <button ref="closeButton" class="close cancel-element" data-dismiss="modal">
            <span class="cancel-element">&times;</span>
          </button>
        </div>
        <div class="modal-body modal-text">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-container">
            <input type="checkbox" class="form-check-input modal-form-check-input" v-model="isDoNotShowAgainSelected" @change="doNotShowAgainSelected">
            <label class="form-check-label modal-text modal-footer-text" @click="doNotShowAgainSelected(!isDoNotShowAgainSelected)">Do not show again</label>
          </div>
          <button ref="removeButton" @click="remove" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
          <button type="button" class="btn btn-secondary cancel-element" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../consts/domEventTriggerKeys.enum';
import { RemovalModalState } from '../../../../interfaces/removalModalState';

interface Props {
  modalId: string;
  removalModalState: RemovalModalState;
}

interface Consts {
  CANCEL_ELEMENT_CLASS: string;
  MODAL_DISPLAY_ANIMATION_INTERVAL_MILLISECONDS: number,
}

interface Data {
  isDoNotShowAgainSelected: boolean;
  modalDisplayAnimationPlaying: boolean;
}

export default {
  setup(props: Props): RemovalModalState & Consts {
    return {
      ...props.removalModalState,
      CANCEL_ELEMENT_CLASS: 'cancel-element',
      MODAL_DISPLAY_ANIMATION_INTERVAL_MILLISECONDS: 500,
    };
  },
  data: (): Data => ({
    isDoNotShowAgainSelected: false,
    modalDisplayAnimationPlaying: false,
  }),
  methods: {
    prepare(): void {
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.closeModalCallback };
      this.$emit('remove-modal-template-callback', workshopEventCallback);
      this.isClassNameTextHighlighted = false;
      this.modalDisplayAnimationPlaying = true;
      setTimeout(() => {
        this.modalDisplayAnimationPlaying = false;
      }, this.MODAL_DISPLAY_ANIMATION_INTERVAL_MILLISECONDS);
    },
    closeModalCallback(): WorkshopEventCallbackReturn {
      if (this.modalDisplayAnimationPlaying) return { shouldRepeat: true };
      // if the modal is closed and event still lives
      if (!this.$refs.closeButton.offsetParent) return { shouldRepeat: false };
      if (event instanceof KeyboardEvent && (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE || event.key === DOM_EVENT_TRIGGER_KEYS.ENTER)) {
        // triggers data-dismiss and closeModal
        this.$refs.closeButton.click();
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    },
    closeModal(): void {
      if ((event.target as HTMLElement).classList.contains(this.CANCEL_ELEMENT_CLASS)) {
        this.$emit('cancel-event');
      }
    },
    remove(): void {
      this.$emit('remove-event');
    },
    doNotShowAgainSelected(state?: boolean): void {
      if (typeof state === 'boolean') this.isDoNotShowAgainSelected = state;
      this.setIsDoNotShowModalAgainState(this.isDoNotShowAgainSelected);
    }
  },
  props: {
    modalId: String,
    removalModalState: Object,
  }
};
</script>

<style lang="css" scoped>
  .modal-footer-container {
    position: absolute;
    left: 0.75rem;
    display: block;
    padding-left: 1.25rem;
  }
  .modal-form-check-input {
    margin-top: 0.36rem;
  }
  .modal-text {
    user-select: none;
  }
  .modal-footer-text {
    font-size: 15px;
  }
</style>
