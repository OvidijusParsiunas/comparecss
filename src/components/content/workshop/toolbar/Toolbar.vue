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
                Width
              </div>
              <div style="margin-top: 5px; padding-right: 15px">
                Style
              </div>
              <div style="margin-top: 5px; padding-right: 15px">
                Color
              </div>
            </div>
            <div style="width: 85%">
              <div style="position: relative; width: 30%">
                <div v-if="customCss.borderRadius" class="range-popover">
                  {{customCss.borderRadius}}
                </div>
                <input type="range" class="form-control-range" id="formControlRange" min="0" max="100" value="0" @mousedown="rangeMouseDown" @mouseup="rangeMouseUp" @input="updateRadius">
              </div>
              <div style="position: relative; margin-top: 14px; width: 30%">
                <div v-if="customCss.borderWidth" class="range-popover">
                  {{customCss.borderWidth}}
                </div>
                <input type="range" class="form-control-range" id="formControlRange"  min="0" max="100" value="0" @mousedown="rangeMouseDown" @mouseup="rangeMouseUp" @input="updateWidth">
              </div>
              <select id="inputState" class="form-control" style="width: 30%; height: 30px; padding: 0">
                <option selected>none</option>
                <option @mouseover="styleMouseOver('hidden')">hidden</option>
                <option @mouseover="styleMouseOver('dotted')">dotted</option>
                <option>dashed</option>
                <option>solid</option>
                <option>double</option>
                <option>groove</option>
                <option>ridge</option>
                <option>inset</option>
                <option>outset</option>
                <option>initial</option>
                <option>inherit</option>
              </select>
              <!--
                IE Compatibility
                <input type="text" name="clr1" value="" style="display:none"/>
                <button onclick="var s = Dlg.ChooseColorDlg(clr1.value); window.event.srcElement.style.color = s; clr1.value = s">&#9608;&#9608;&#9608;&#9608;&#9608;</button>
                <object id="Dlg" classid="CLSID:3050F819-98B5-11CF-BB82-00AA00BDCE0B" width="0" height="0"></object>
              -->
              <input @input="colorChanged" style="float: left" type="color" name="clr1" value=""/>
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
    customCss: { borderRadius: '0px', borderWidth: '0px'},
  }),
  mounted(): void {
    this.customCss = this.modelValue;
  },
  methods: {
    updateRadius(event: KeyboardEvent): void {
      // dividing by 4 because using 100 scale instead of 25 provides a smoother drag experience
      this.customCss.borderRadius = `${Math.floor((event.target as HTMLInputElement).value as unknown as number / 4)}px`;
      this.$emit('update:modelValue', this.customCss);
    },
    updateWidth(event: KeyboardEvent): void {
      if (!this.customCss.borderColor) {this.customCss.borderColor = 'black'}
      this.customCss.borderWidth = `${(event.target as HTMLInputElement).value}px`;
      // this will need to be moved over to the styleMouseOver
      this.customCss.borderStyle = 'solid';
      this.$emit('update:modelValue', this.customCss);
    },
    rangeMouseDown(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '1';
    },
    rangeMouseUp(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    styleMouseOver(style: string): void {
      console.log('called');
      console.log(style);
    },
    colorChanged(event: KeyboardEvent): void {
      this.customCss.borderColor = (event.target as HTMLInputElement).value;
      this.$emit('update:modelValue', this.customCss);
    }
  },
  props: {
    modelValue: Object,
  }
};

</script>

<style lang="css" scoped>
  #formControlRange {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .edit-component-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .range-popover {
    background-color: black;
    color: white;
    position: absolute;
    margin: 0;
    position: absolute;
    top: -80%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 7px;
    opacity: 0;
    transition: opacity 0.25s linear;
    -webkit-transition: opacity 0.25s linear;
    -moz-transition: opacity 0.25s linear;
    -o-transition: opacity 0.25s linear;
  }
</style>
