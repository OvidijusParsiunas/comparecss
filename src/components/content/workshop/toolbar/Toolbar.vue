<template>
  <div style="width: 98.5%">
    <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
      <div style="margin-left: 10px; padding: 5px">
        <div style="margin-top: 10px; display: flex"> 
          <button type="button" class="btn btn-outline-secondary edit-component-button">Default</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Button</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Code</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Preview</button>
        </div>
        <div style="margin-top: 10px; margin-bottom: 10px"> 
          <button type="button" class="btn btn-outline-secondary edit-component-button">Border</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Color</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Shadow</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Size</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Padding</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">margin</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Shadow</button>
          <button type="button" class="btn btn-outline-primary edit-component-button">Text</button>
        </div>
        <!-- <div style="width: 20%; margin-left: 80%; position: relative">
          <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
            <button type="button" class="btn btn-secondary">Import</button>
          </div>
        </div> -->
      </div>
    </div>
    <div style="position: relative; display: flex; margin-top: 10px">
      <div style="padding: 15px; background-color: rgb(251 251 251); border-radius: 20px; margin: 0; width: 100%"> 
        <div class="container">
          <div class="row">
            <div style="padding-riggt: 15px; text-align: left">
              <div>
                Radius
              </div>
              <div style="margin-top: 5px; padding-right: 15px">
                Thickness
              </div>
            </div>
            <div style="width: 85%">
              <div>
                <input type="range" style="width: 30%;" class="form-control-range" id="formControlRange" min="0" max="100" value="0" @input="updateRangeValue">
              </div>
              <div style="margin-top: 14px">
                <input type="range" style="width: 30%" class="form-control-range" id="formControlRange" value="50" @input="updateRangeValue">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Data {
  customCss: WorkshopComponentCss;
}
import { WorkshopComponentCss } from '../../../../interfaces/workshopComponentCss';

export default {
  data: (): Data => ({
    customCss: {},
  }),
  mounted(): void {
    this.customCss = this.modelValue;
  },
  methods: {
    updateRangeValue(rangeValue: KeyboardEvent): void {
      this.customCss.borderRadius = `${(rangeValue.target as HTMLInputElement).value as unknown as number / 4}px`;
      this.$emit('update:modelValue', this.customCss);
    }
  },
  props: {
    modelValue: Object,
  }
};

</script>

<style lang="css" scoped>
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .edit-component-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  #formControlRange {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
</style>
