<template>
  <div class="modal fade" :id="modalId">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-text">Remove</h5>
          <button ref="closeButton" class="close" data-dismiss="modal">
            <span>&times;</span>
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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

interface Data {
  isDoNotShowAgainSelected: boolean;
}

export default {
  setup(props: Props): RemovalModalState {
    return props.removalModalState;
  },
  data: (): Data => ({
    isDoNotShowAgainSelected: false,
  }),
  methods: {
    prepare(): void {
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.closeModal };
      this.$emit('remove-modal-template-callback', workshopEventCallback);
      this.isClassNameTextHighlighted = false;
    },
    closeModal(): WorkshopEventCallbackReturn {
      if (!this.$refs.closeButton.offsetParent) return { shouldRepeat: false };
      if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
          this.$refs.closeButton.click();
          return { shouldRepeat: false };
        }
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.$refs.removeButton.click();
          return { shouldRepeat: false };
        }
      }
      return { shouldRepeat: true };
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
