<template>
  <div class="modal fade" :id="modalId">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-text">Remove</h5>
          <button class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body modal-text">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-container">
            <input type="checkbox" class="form-check-input modal-form-check-input" v-model="isDoNotShowAgainSelected" @change="doNotShowAgainSelected">
            <label class="form-check-label modal-text" style="font-size: 15px" @click="doNotShowAgainSelected(!isDoNotShowAgainSelected)">Don't show again</label>
          </div>
          <button @click="remove" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RemovalModalState } from '../../../../interfaces/removalModalState';

interface Props {
  modalId: string;
  removeEventName: string;
  funcBeforeRemoveEvent: () => void,
  removalModalState: RemovalModalState,
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
    remove(): void {
      if (this.funcBeforeRemoveEvent) this.funcBeforeRemoveEvent();
      this.$emit(this.removeEventName);
    },
    doNotShowAgainSelected(state?: boolean): void {
      if (typeof state === 'boolean') this.isDoNotShowAgainSelected = state;
      this.setIsDoNotShowModalAgainState(this.isDoNotShowAgainSelected);
    }
  },
  props: {
    modalId: String,
    removeEventName: String,
    funcBeforeRemoveEvent: Function,
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
</style>
