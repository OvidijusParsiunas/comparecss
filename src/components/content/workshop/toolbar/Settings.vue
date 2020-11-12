<template>
  <div style="width: 98.5%">
    <div v-if="settings.options" style="position: relative; display: flex; margin-top: 10px; z-index: 1">
      <div style="padding: 15px; background-color: rgb(251 251 251); border-radius: 20px; margin: 0; width: 100%"> 
        <div class="container" style="display: flex">
          <div style="display: grid; grid-template-columns: 50% 50%; width: 80%">
            <div v-for="(setting, settingIndex) in settings.options" :key="setting">

              <div v-if="setting.type === 'range'">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <div style="position: relative; float: left">
                  <div class="range-popover">
                    {{setting.spec.partialCss !== undefined && componentProperties.customCss[componentProperties.customCssActiveMode][setting.spec.cssProperty]
                      ? componentProperties.customCss[componentProperties.customCssActiveMode][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                      : componentProperties.customCss[componentProperties.customCssActiveMode][setting.spec.cssProperty]}}
                  </div>
                  <input type="range" class="form-control-range" id="formControlRange" v-bind:min="setting.spec.scale[0]" v-bind:max="setting.spec.scale[1]" v-model="setting.spec.default" @mousedown="rangeMouseDown" @mouseup="rangeMouseUp" @input="updateRange($event, setting)">
                </div>
              </div>

              <div v-if="setting.type === 'select'">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <div style="float: left" class="dropdown">
                  <button style="padding-top: 0px; padding-bottom: 2px" class="align-text-top btn btn-outline-secondary edit-component-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{selectorNewValues[setting.spec.cssProperty] || setting.spec.default}}
                  </button>
                  <div class="dropdown-menu" @mouseleave="selectMenuMouseLeave(setting.spec.cssProperty)" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" @mouseover="selectOptionMouseOver(option, setting.spec.cssProperty)" @click="selectOptionClick(option, setting.spec)" v-for="option in setting.spec.options" :key="option">{{option}}</a>
                  </div>
                </div>
              </div>
              
              <div v-if="setting.type === 'colorPicker'">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <!--
                  IE Compatibility
                  <input type="text" name="clr1" value="" style="display:none"/>
                  <button onclick="var s = Dlg.ChooseColorDlg(clr1.value); window.event.srcElement.style.color = s; clr1.value = s">&#9608;&#9608;&#9608;&#9608;&#9608;</button>
                  <object id="Dlg" classid="CLSID:3050F819-98B5-11CF-BB82-00AA00BDCE0B" width="0" height="0"></object>
                -->
                <input @click="colorInputClick" @input="colorChanged($event, setting)" style="float: left" type="color" name="clr1" v-model="setting.spec.default"/>
              </div>

              <div style="display: flex" v-if="setting.type === 'inputDropdown'">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <div class="input-group">
                  <input type="text" class="form-control" aria-label="Text input with dropdown button" v-bind:value="inputDropdownNewValues[setting.spec.cssProperty] || componentProperties.customCss[componentProperties.customCssActiveMode][setting.spec.cssProperty]" @input="inputDropdownKeyboardInput($event, setting.spec.cssProperty)" :ref="`elementReference${settingIndex}`" @keyup.enter="blurInputDropdown(`elementReference${settingIndex}`)">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="openDropdown(setting.spec.cssProperty)"></button>
                    <div class="dropdown-menu" @mouseleave="inputDropdownOptionMouseLeave(setting.spec.cssProperty)">
                      <a class="dropdown-item" @mouseover="inputDropdownOptionMouseOver(option, setting.spec.cssProperty)" @click="inputDropdownOptionClick(option, setting.spec.cssProperty)" v-for="(option) in setting.spec.options" :key="option">{{option}}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div style="display: flex" v-if="setting.type === 'checkbox'">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <input type="checkbox" v-model="setting.spec.default" @click="checkboxMouseClick(setting.spec.default, setting.spec, componentProperties.customJS)">
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BUTTON_COMPONENT_MODES } from '../../../../consts/buttonComponentModes.enum';

interface Data {
  selectorNewValues: unknown;
  inputDropdownNewValues: unknown;
  getCurrentValue: (param1, param2) => void;
  resetSettings: () => void;
}

export default {
  data: (): Data => ({
    selectorNewValues: {},
    inputDropdownNewValues: {},
    getCurrentValue: function(activeMode, cssProperty) {
      switch (activeMode) {
        case (BUTTON_COMPONENT_MODES.CLICK):
          if (this.componentProperties.customCss[BUTTON_COMPONENT_MODES.CLICK][cssProperty]) {
            return this.componentProperties.customCss[BUTTON_COMPONENT_MODES.CLICK][cssProperty];
          }
        case (BUTTON_COMPONENT_MODES.HOVER || BUTTON_COMPONENT_MODES.CLICK):
          if (this.componentProperties.customCss[BUTTON_COMPONENT_MODES.HOVER][cssProperty]) {
            return this.componentProperties.customCss[BUTTON_COMPONENT_MODES.HOVER][cssProperty];
          }
        case (BUTTON_COMPONENT_MODES.DEFAULT || BUTTON_COMPONENT_MODES.HOVER || BUTTON_COMPONENT_MODES.CLICK):
          if (this.componentProperties.customCss[BUTTON_COMPONENT_MODES.DEFAULT][cssProperty]) {
            return this.componentProperties.customCss[BUTTON_COMPONENT_MODES.DEFAULT][cssProperty];
          }
        default:
          return undefined;
      }
    },
    resetSettings: function() {
      this.selectorNewValues = {};
      this.inputDropdownNewValues = {};
      (this.settings.options || []).forEach((setting) => {
        if (setting.type === 'range') {
          const currentValue = this.getCurrentValue(this.componentProperties.customCssActiveMode, setting.spec.cssProperty);
          if (currentValue !== undefined) {
            (setting.triggers || []).forEach((trigger) => {
              trigger.conditions.forEach((condition) => {
                if (this.getCurrentValue(this.componentProperties.customCssActiveMode, trigger.cssProperty) === condition) {
                  this.componentProperties.customCss[this.componentProperties.customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
                  this.selectorNewValues[setting.spec.cssProperty] = trigger.defaultValue;
                }
              })
            })
            setting.spec.default = parseInt(currentValue.substring(0, currentValue.length - 2), 10) * setting.spec.smoothingDivisible;
          }
        } else if (setting.type === 'select') {
          // default value for range is currently setting the select value, not the select value for ranges
          // potential race condition where range sets the select value and select may set it to something incorrect
          const currentValue = this.getCurrentValue(this.componentProperties.customCssActiveMode, setting.spec.cssProperty);
          if (currentValue) { this.selectorNewValues[setting.spec.cssProperty] = currentValue; }
        } else if (setting.type === 'colorPicker') {
          const currentValue = this.getCurrentValue(this.componentProperties.customCssActiveMode, setting.spec.cssProperty);
          if (currentValue) { setting.spec.default = setting.spec.partialCss ? currentValue.split(' ')[setting.spec.partialCss.position] : currentValue; }
        } else if (setting.type === 'inputDropdown') {
          const currentValue = this.getCurrentValue(this.componentProperties.customCssActiveMode, setting.spec.cssProperty);
          if (currentValue) { this.inputDropdownNewValues[setting.spec.cssProperty] = currentValue; }
        } else if (setting.type === 'checkbox') {
          if (setting.javascript) {
            setting.spec.default = this.componentProperties[setting.spec.name];
          } else {
            const currentValue = this.getCurrentValue(this.componentProperties.customCssActiveMode, setting.spec.cssProperty);
            if (currentValue) { setting.spec.default = (currentValue === setting.spec.conditionalStyle.truthy); }
          }
        }
      })
    }
  }),
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // put these methods into services
  methods: {
    updateRange(event: KeyboardEvent, setting: any): void {
      const {triggers, spec} = setting;
      const {cssProperty, smoothingDivisible, partialCss } = spec;
      (triggers || []).forEach((trigger) => {
        if (trigger.indirectCssPropertySelector) {
          this.settings.options.forEach((setting) => {
              if (setting.cssPlaceholder === trigger.cssProperty) {
                trigger.conditions.forEach((condition) => {
                  if (setting.spec.default === condition) {
                    setting.spec.default = trigger.defaultValue;
                  }
                }); 
              }
            }
          )
        } else {
          trigger.conditions.forEach((condition) => {
            if (this.componentProperties.customCss[this.componentProperties.customCssActiveMode][trigger.cssProperty] === condition) {
              this.componentProperties.customCss[this.componentProperties.customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
              if (trigger.selector) { this.selectorNewValues[trigger.cssProperty] = trigger.defaultValue; }
            }
          }); 
        }
      });
      const rangeValue = (event.target as HTMLInputElement).value;
      if (partialCss != undefined) {
        if (this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] === undefined) {
          partialCss.fullDefaultValues[partialCss.position] = rangeValue;
          this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = partialCss.fullDefaultValues.join(' ');
        } else {
          const cssPropertyValues = this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty].split(' ');
          cssPropertyValues[partialCss.position] = `${rangeValue}px`;
          this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
        }
      } else {
        this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}px`;
      }
    },
    rangeMouseDown(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '1';
    },
    rangeMouseUp(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    selectOptionMouseOver(option: string, cssProperty: string): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = option;
    },
    selectMenuMouseLeave(cssProperty: string): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = this.selectorNewValues[cssProperty];
    },
    openDropdown(cssProperty: string): void {
      this.inputDropdownNewValues[cssProperty] = this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty];
    },
    selectOptionClick(option: string, spec: any): void {
      const { cssProperty, triggers, } = spec;
      if (cssProperty) {
        this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = option;
        this.selectorNewValues[cssProperty] = option;
      } else if (triggers) {
        (triggers || []).forEach((trigger) => {
          if (trigger.option === option) {
            trigger.newChanges.forEach((change) => {
              this.componentProperties.customCss[this.componentProperties.customCssActiveMode][change.cssProperty] = change.value;
              this.settings.options.forEach((setting) => {
                if (setting.spec.cssProperty === change.cssProperty) {
                  setting.spec.default = change.defaultValue;
                }
              })
            })
          }
        });
        spec.default = option;
      }
    },
    inputDropdownOptionClick(option: string, cssProperty: string): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = option;
      this.inputDropdownNewValues[cssProperty] = '';
    },
    inputDropdownOptionMouseOver(option: string, cssProperty: string): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = option;
    },
    inputDropdownOptionMouseLeave(cssProperty: string): void {
      if (this.inputDropdownNewValues[cssProperty]) {
        this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = this.inputDropdownNewValues[cssProperty];
        this.inputDropdownNewValues[cssProperty] = '';
      }
    },
    inputDropdownKeyboardInput(event: KeyboardEvent, cssProperty: string): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = (event.target as HTMLInputElement).value;
    },
    blurInputDropdown(referenceId: string): void {
      this.$refs[referenceId].blur();
    },
    colorChanged(event: KeyboardEvent, setting: any): void {
      const {cssProperty, partialCss } = setting.spec;
      const colorPickerValue = (event.target as HTMLInputElement).value;
      if (partialCss != undefined) {
        if (this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] === undefined) {
          partialCss.fullDefaultValues[partialCss.position] = colorPickerValue;
          this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = partialCss.fullDefaultValues.join(' ');
        } else {
          const cssPropertyValues = this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty].split(' ');
          cssPropertyValues[partialCss.position] = colorPickerValue;
          this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
        }
      } else {
        this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = colorPickerValue;
      }
    },
    colorInputClick(): void {
      this.componentProperties.customCss[this.componentProperties.customCssActiveMode].transition = 'unset';
    },
    checkboxMouseClick(previousCheckboxValue: boolean, spec: any, customJS: any): void {
      const { conditionalStyle, cssProperty, executeJS, revokeJS, downloadables } = spec;
      const newCheckboxValue = !previousCheckboxValue;
      if (executeJS) {
        if (newCheckboxValue) {
          if (!customJS[downloadables.scriptName]) { customJS[downloadables.scriptName] = downloadables; }
          executeJS();
        } else {
          delete customJS[downloadables.scriptName];
          revokeJS();
        }
      } else {
        const cssValue = newCheckboxValue ? conditionalStyle.truthy : conditionalStyle.falsy;
        this.componentProperties.customCss[this.componentProperties.customCssActiveMode][cssProperty] = cssValue;
      }
    }
  },
  props: {
    componentProperties: Object,
    settings: Object,
    settingsResetTriggered: Boolean,
  },
  watch: {
    settings(): void {
      this.resetSettings();
    },
    settingsResetTriggered(): void {
      this.resetSettings();
    }
  }
};

</script>

<style lang="css" scoped>
  #formControlRange {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .range-popover {
    background-color: black;
    color: white;
    position: absolute;
    margin: 0;
    position: absolute;
    top: -40%;
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
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .edit-component-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .dropdown-toggle::after {
    vertical-align: 0.15em !important;
  }
</style>
