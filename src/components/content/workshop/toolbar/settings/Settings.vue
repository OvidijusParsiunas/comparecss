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
                  <div v-if="subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode]
                    && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]" class="range-popover">
                    {{setting.spec.partialCss !== undefined && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                      ? subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                      : subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]}}
                  </div>
                  <div v-else class="range-popover">
                    {{setting.spec.default}}px
                  </div>
                  <input type="range" class="form-control-range" id="formControlRange"
                    v-bind:min="subcomponentproperties.customSettingsProperties && subcomponentproperties.customSettingsProperties[setting.spec.cssProperty] ? subcomponentproperties.customSettingsProperties[setting.spec.cssProperty][0] : setting.spec.scale[0]"
                    v-bind:max="subcomponentproperties.customSettingsProperties && subcomponentproperties.customSettingsProperties[setting.spec.cssProperty] ? subcomponentproperties.customSettingsProperties[setting.spec.cssProperty][1] : setting.spec.scale[1]"
                    v-model="setting.spec.default"
                    @mousedown="rangeMouseDown($event, subcomponentproperties.customCssActiveMode, setting.spec)"
                    @mouseup="rangeMouseUp"
                    @input="updateRange($event, setting)">
                </div>
              </div>

              <div v-if="setting.type === 'select'">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <div style="float: left" class="dropdown">
                  <button style="padding-top: 0px; padding-bottom: 2px" class="align-text-top btn btn-outline-secondary edit-component-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{selectorCurrentValues[setting.spec.cssProperty] || setting.spec.default}}
                  </button>
                  <div class="dropdown-menu" @mouseleave="selectMenuMouseLeave(setting.spec.cssProperty)" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" @mouseover="selectOptionMouseOver(option, setting.spec.cssProperty)" @click="selectOptionClick(option, setting)" v-for="option in setting.spec.options" :key="option">{{option}}</a>
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
                <input style="float: left" type="color" name="clr1" 
                  @click="colorInputClick(subcomponentproperties.customCssActiveMode, setting.spec.cssProperty, setting.spec.default)"
                  @input="colorChanged($event, setting)"
                  v-model="setting.spec.default"/>
                <button class="unset-color-button" id="dropdownMenuButton"
                  :style="{ display: 
                  (!subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode]
                    || !subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                    || subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty] === 'inherit')
                      ? 'none' : 'block'}"
                  @click="removeColor(setting.spec)">
                  &times;
                </button>
              </div>

              <div style="display: flex" v-if="setting.type === 'inputDropdown'">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <div class="input-group">
                  <input type="text" class="form-control" aria-label="Text input with dropdown button" v-bind:value="inputDropdownCurrentValues[setting.spec.cssProperty] || subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]" @input="inputDropdownKeyboardInput($event, setting.spec.cssProperty)" :ref="`elementReference${settingIndex}`" @keyup.enter="blurInputDropdown(`elementReference${settingIndex}`)">
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
                <input type="checkbox" v-model="setting.spec.default" @click="checkboxMouseClick(setting.spec, setting.spec.default)">
              </div>
            </div>
            
          </div>
          <button class="reset-button" @click="resetProperties(settings.options)">
            &#8634;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';

interface Data {
  selectorCurrentValues: unknown;
  inputDropdownCurrentValues: unknown;
  getActiveModeCssPropertyValue: (param1: SUB_COMPONENT_CSS_MODES, param2: string) => void;
  resetSettings: () => void;
  addDefaultValueIfCssModeMissing: (param1: SUB_COMPONENT_CSS_MODES, param2: string, param3: string) => void;
  parseRangeValue: (param1: string, param2: number) => number;
}

export default {
  data: (): Data => ({
    selectorCurrentValues: {},
    inputDropdownCurrentValues: {},
    getActiveModeCssPropertyValue: function(activeMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): string {
      const { customCss } = this.subcomponentproperties;
      // the following allows multiple cases to be checked in one execution
      switch (activeMode) {
        case (SUB_COMPONENT_CSS_MODES.CLICK):
          if (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty]) {
            return customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
          }
        case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
          if (customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty]) {
            return customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
          }
        case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
          if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
            return customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
          }
        default:
          return undefined;
      }
    },
    resetSettings: function(): void {
      this.$nextTick(() => {
        const { customCss, customCssActiveMode, jsClasses } = this.subcomponentproperties;
        this.selectorCurrentValues = {};
        this.inputDropdownCurrentValues = {};
        (this.settings.options || []).forEach((setting) => {
          if (setting.type === 'range') {
            const cssPropertyValue = this.getActiveModeCssPropertyValue(customCssActiveMode, setting.spec.cssProperty);
            if (cssPropertyValue !== undefined) {
              if (customCss[customCssActiveMode]) {
                (setting.triggers || []).forEach((trigger) => {
                  trigger.conditions.forEach((condition) => {
                    if (this.getActiveModeCssPropertyValue(customCssActiveMode, trigger.cssProperty) === condition) {
                      customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
                      this.selectorCurrentValues[setting.spec.cssProperty] = trigger.defaultValue;
                    }
                  });
                });
              }
              const singlePropertyValue = setting.spec.partialCss ? cssPropertyValue.split(' ')[setting.spec.partialCss.position] : cssPropertyValue;
              setting.spec.default = this.parseRangeValue(singlePropertyValue, setting.spec.smoothingDivisible);
            }
          } else if (setting.type === 'select') {
            // default value for range is currently setting the select value, not the select value for ranges
            // potential race condition where range sets the select value and select may set it to something incorrect
            const cssPropertyValue = this.getActiveModeCssPropertyValue(customCssActiveMode, setting.spec.cssProperty);
            if (cssPropertyValue) { this.selectorCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
          } else if (setting.type === 'colorPicker') {
            const cssPropertyValue = this.getActiveModeCssPropertyValue(customCssActiveMode, setting.spec.cssProperty);
            if (cssPropertyValue) { setting.spec.default = setting.spec.partialCss ? cssPropertyValue.split(' ')[setting.spec.partialCss.position] : cssPropertyValue; }
          } else if (setting.type === 'inputDropdown') {
            const cssPropertyValue = this.getActiveModeCssPropertyValue(customCssActiveMode, setting.spec.cssProperty);
            if (cssPropertyValue) { this.inputDropdownCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
          } else if (setting.type === 'checkbox') {
            if (setting.spec.javascript) {
              setting.spec.default = jsClasses.has(setting.spec.jsClassName);
            } else {
              const cssPropertyValue = this.getActiveModeCssPropertyValue(customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue) { setting.spec.default = (cssPropertyValue === setting.spec.conditionalStyle.truthy); }
            }
          }
        });
      });
    },
    addDefaultValueIfCssModeMissing: function(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string, defaultValue: string): void {
      let customCss = null;
      switch (customCssActiveMode) {
        case (SUB_COMPONENT_CSS_MODES.CLICK): {
          if (this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] && this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty]) {
            customCss = this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
            break;
          }
        }
        case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
          if (this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty]) {
            customCss = this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
            break;
          }
        case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
          if (this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
            customCss = this.subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
            break;
          }
        default:
          break;
      }
      if (!this.subcomponentproperties.customCss[customCssActiveMode]) {
        this.subcomponentproperties.customCss[customCssActiveMode] = { [cssProperty]: customCss || defaultValue };
      } else {
        this.subcomponentproperties.customCss[customCssActiveMode][cssProperty] = customCss || defaultValue;
      }
    },
    parseRangeValue(value: string, smoothingDivisible: number): number {
      return parseInt(value.substring(0, value.length - 2), 10) * smoothingDivisible;
    }
  }),
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // put these methods into services
  methods: {
    updateRange(event: KeyboardEvent, setting: any): void {
      const {triggers, spec} = setting;
      const {cssProperty, smoothingDivisible, partialCss } = spec;
      const { customCss, customCssActiveMode } = this.subcomponentproperties;
      (triggers || []).forEach((trigger) => {
        trigger.conditions.forEach((condition) => {
          if (customCss[customCssActiveMode][trigger.cssProperty] === condition) {
            customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
            if (trigger.selector) { this.selectorCurrentValues[trigger.cssProperty] = trigger.defaultValue; }
          }
        }); 
      });
      const rangeValue = (event.target as HTMLInputElement).value;
      if (partialCss != undefined) {
        if (customCss[customCssActiveMode][cssProperty] === undefined) {
          const defaultValues = [ ...partialCss.fullDefaultValues ];
          defaultValues[partialCss.position] = rangeValue;
          customCss[customCssActiveMode][cssProperty] = defaultValues.join(' ');
        } else {
          const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
          cssPropertyValues[partialCss.position] = `${rangeValue}px`;
          customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
        }
      } else {
        customCss[customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}px`;
      }
    },
    rangeMouseDown(event: KeyboardEvent, customCssActiveMode: SUB_COMPONENT_CSS_MODES, spec: any): void {
      const { cssProperty, partialCss } = spec;
      const defaultValue = spec.default / spec.smoothingDivisible;
      const settingSpecificDefaultValue = partialCss ? defaultValue : `${defaultValue}px`;
      this.addDefaultValueIfCssModeMissing(customCssActiveMode, cssProperty, settingSpecificDefaultValue);
      setTimeout(() => {
        const popoverElement = (event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement;
        if (popoverElement.style) { popoverElement.style.opacity = '1'; }
      })
    },
    rangeMouseUp(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    selectOptionMouseOver(option: string, cssProperty: string): void {
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = option;
    },
    selectMenuMouseLeave(cssProperty: string): void {
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = this.selectorCurrentValues[cssProperty];
    },
    openDropdown(cssProperty: string): void {
      this.inputDropdownCurrentValues[cssProperty] = this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty];
    },
    selectOptionClick(option: string, setting: any): void {
      const {triggers, spec} = setting;
      const { customCss, customCssActiveMode } = this.subcomponentproperties;
      customCss[customCssActiveMode][spec.cssProperty] = option;
      this.selectorCurrentValues[spec.cssProperty] = option;
      if (triggers && triggers[option]) {
        const { conditions, negativeConditions, cssProperty: triggerCssProperty, defaultValue } = triggers[option];
        function iterateThroughConditions(conditions: (number | string | undefined)[], comparator: (param1, param2) => boolean): boolean {
          if (conditions) {
            for (let i = 0; i < conditions.length; i += 1) {
              const conditionValue = typeof conditions[i] === 'string' ? parseInt(conditions[i] as string) : conditions[i];
              if (comparator(customCss[customCssActiveMode][triggerCssProperty], conditionValue)) {
                return true;
              }
            }
          }
          return false;
        }
        let conditionMet = iterateThroughConditions(conditions, (param1, param2): boolean => param1 === param2);
        if (!conditionMet) { conditionMet = iterateThroughConditions(negativeConditions, (param1, param2): boolean => param1 !== param2) }
        if (conditionMet) {
          for (let i = 0; i < this.settings.options.length; i += 1) {
            if (this.settings.options[i].spec.cssProperty === triggerCssProperty) {
              const rawDefaultValue = typeof defaultValue === 'string' ? parseInt(defaultValue) : defaultValue;
              this.settings.options[i].spec.default = rawDefaultValue;
              customCss[customCssActiveMode][triggerCssProperty] = defaultValue;
            }
          }
        }
      }
    },
    inputDropdownOptionClick(option: string, cssProperty: string): void {
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = option;
      this.inputDropdownCurrentValues[cssProperty] = '';
    },
    inputDropdownOptionMouseOver(option: string, cssProperty: string): void {
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = option;
    },
    inputDropdownOptionMouseLeave(cssProperty: string): void {
      if (this.inputDropdownCurrentValues[cssProperty]) {
        this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = this.inputDropdownCurrentValues[cssProperty];
      }
    },
    inputDropdownKeyboardInput(event: KeyboardEvent, cssProperty: string): void {
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = (event.target as HTMLInputElement).value;
    },
    blurInputDropdown(referenceId: string): void {
      this.$refs[referenceId].blur();
    },
    colorChanged(event: KeyboardEvent, setting: any): void {
      const { cssProperty, partialCss } = setting.spec;
      const colorPickerValue = (event.target as HTMLInputElement).value;
      const { customCss, customCssActiveMode } = this.subcomponentproperties;
      if (partialCss != undefined) {
        if (customCss[customCssActiveMode][cssProperty] === undefined) {
          const defaultValues = [ ...partialCss.fullDefaultValues ];
          defaultValues[partialCss.position] = colorPickerValue;
          customCss[customCssActiveMode][cssProperty] = defaultValues.join(' ');
        } else {
          const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
          cssPropertyValues[partialCss.position] = colorPickerValue;
          customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
        }
      } else {
        customCss[customCssActiveMode][cssProperty] = colorPickerValue;
      }
    },
    colorInputClick(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string, defaultValue: string): void {
      this.addDefaultValueIfCssModeMissing(customCssActiveMode, cssProperty, defaultValue);
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode].transition = 'unset';
    },
    removeColor(spec: any): void {
      spec.default = '';
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][spec.cssProperty] = 'inherit';
    },
    checkboxMouseClick(spec: any, previousCheckboxValue: boolean): void {
      const { conditionalStyle, cssProperty, javascript, jsClassName } = spec;
      const { customCss, customCssActiveMode, jsClasses } = this.subcomponentproperties;
      const newCheckboxValue = !previousCheckboxValue;
      if (javascript) {
        if (newCheckboxValue) {
          jsClasses.add(jsClassName);
        } else {
          jsClasses.delete(jsClassName);
        }
      } else {
        const cssValue = newCheckboxValue ? conditionalStyle.truthy : conditionalStyle.falsy;
        customCss[customCssActiveMode][cssProperty] = cssValue;
      }
    },
    resetProperties(options: any): void {
      // js classes?
      // check if need to devide the range by 4
      options.forEach((option) => {
        const { cssProperty, defaultValue } = option.spec;
        let customCss = null;
          switch (this.subcomponentproperties.customCssActiveMode) {
            case (SUB_COMPONENT_CSS_MODES.CLICK): {
              if (this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.CLICK] && this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty]) {
                customCss = this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
                break;
              }
            }
            case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
              if (this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.HOVER] && this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty]) {
                customCss = this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
                break;
              }
            case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
              if (this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
                customCss = this.subcomponentproperties.initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
                break;
              }
            default:
              break;
          }
          if (!this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode]) {
            this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode] = { [cssProperty]: customCss || defaultValue };
          } else {
            this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][cssProperty] = customCss || defaultValue;
          }
      });
      this.resetSettings();
    }
  },
  props: {
    subcomponentproperties: Object,
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
  .unset-color-button {
    font-size: 1.1em;
    line-height: 15px;
    padding-top: 2px;
    float: left;
    background-color: unset;
    border: unset;
    font-weight: 700;
    opacity: 0.5;
    outline: none;
  }
  .unset-color-button:hover {
    opacity: 0.7;    
  }
  .unset-color-button:focus {
    outline: none;
  }
  .reset-button {
    font-size: 17px;
    opacity: 0.6;
    position: absolute;
    right: 15px;
    top: 10px;
    border: none;
    background: unset
  }
  .reset-button:hover {
    opacity: 0.9;
  }
  .reset-button:focus {
    outline: none;
  }
</style>
