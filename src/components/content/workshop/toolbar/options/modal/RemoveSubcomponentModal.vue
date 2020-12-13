<template>
  <div class="modal fade" id="removeSubcomponentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Remove</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to remove this subcomponent?
        </div>
        <div class="modal-footer">
          <div style="position: absolute; left: 0.75rem; display: block; padding-left: 1.25rem">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="isDoNotShowAgainSelected" @change="doNotShowAgainSelected" style="margin-top: 0.36rem">
            <label class="form-check-label" style="font-size: 15px">Don't show again</label>
          </div>
          <button v-on:click="removeSubcomponent" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import JSONManipulation from '@/services/workshop/jsonManipulation';
import { getIsDoNotShowAgainTickedState, setIsDoNotShowAgainTickedState } from './state';

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
    isDoNotShowAgainSelected: false,
  }),
  methods: {
    removeSubcomponent(): void {
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCss = JSONManipulation.deepCopy(
        this.component.subcomponents[this.component.subcomponentsActiveMode].initialCss);
      this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying = false;
      this.$emit('remove-subcomponent');
      
    },
    doNotShowAgainSelected(): void {
      setIsDoNotShowAgainTickedState(!getIsDoNotShowAgainTickedState());
    }
  },
  props: {
    component: Object,
  },
};
</script>
