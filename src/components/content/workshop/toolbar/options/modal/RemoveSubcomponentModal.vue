<template>
  <div class="modal fade" id="removeSubcomponentModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal-text">Remove</h5>
          <button class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body modal-text">
          Are you sure you want to remove this subcomponent?
        </div>
        <div class="modal-footer">
          <div class="modal-footer-container">
            <input type="checkbox" class="form-check-input modal-form-check-input" v-model="isDoNotShowAgainSelected" @change="doNotShowAgainSelected">
            <label class="form-check-label modal-text" style="font-size: 15px" @click="doNotShowAgainSelected(!isDoNotShowAgainSelected)">Don't show again</label>
          </div>
          <button @click="removeSubcomponent" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getIsDoNotShowModalAgainState, setIsDoNotShowModalAgainState } from './state';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

interface Data {
  previewImage: string;
  className: string;
  classNamePlaceholder: string;
  classNameIndex: number;
  isDoNotShowAgainSelected: boolean;
}

export default {
  data: (): Data => ({
    previewImage: 'previewImage',
    className: null,
    classNamePlaceholder: `component-1`,
    classNameIndex: 2,
    isDoNotShowAgainSelected: getIsDoNotShowModalAgainState(),
  }),
  methods: {
    removeSubcomponent(): void {
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCss = JSONManipulation.deepCopy(
        this.component.subcomponents[this.component.subcomponentsActiveMode].initialCss);
      this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying = false;
      this.$emit('remove-subcomponent');
    },
    doNotShowAgainSelected(state?: boolean): void {
      if (typeof state === 'boolean') this.isDoNotShowAgainSelected = state;
      setIsDoNotShowModalAgainState(this.isDoNotShowAgainSelected);
    }
  },
  props: {
    component: Object,
  },
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
