<template>
  <div style="width: 98.5%">
    <div v-if="settings.options" style="position: relative; display: flex; margin-top: 10px; z-index: 1">
      <div style="padding: 15px; background-color: rgb(251 251 251); border-radius: 20px; margin: 0; width: 100%"> 
        <div class="container" style="display: flex">
          <div style="display: grid; grid-template-columns: 50% 50%; width: 80%">
            <div v-for="(setting, settingIndex) in settings.options" :key="setting">

              <div v-if="setting.type === SETTINGS_TYPES.RANGE">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <div style="position: relative; float: left">
                  <div class="range-popover">
                    <!-- the boxShadow range properties are set to 'unset' when all are 0px (for firefox) -->
                    <div v-if="subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode]
                      && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                      && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty] !== 'unset'">
                      {{setting.spec.partialCss !== undefined && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                        ? subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                        : subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]}}
                    </div>
                    <div v-else-if="subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode]
                      && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                      && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty] === 'unset'">
                      0px
                    </div>
                    <div v-else>
                      {{setting.spec.default}}px
                    </div>
                  </div>
                  <input type="range" class="form-control-range" id="formControlRange"
                    v-bind:min="setting.spec.scale[0]"
                    v-bind:max="setting.spec.scale[1]"
                    v-model="setting.spec.default"
                    @mousedown="rangeMouseDown($event, subcomponentproperties.customCssActiveMode, setting.spec)"
                    @contextmenu="preventRightClickEvent"
                    @mouseup="rangeMouseUp"
                    @input="updateRange($event, setting)">
                </div>
              </div>

              <div v-if="setting.type === SETTINGS_TYPES.SELECT">
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
              
              <div v-if="setting.type === SETTINGS_TYPES.COLOR_PICKER">
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
                  @click="colorInputClick(subcomponentproperties.customCssActiveMode, setting.spec.cssProperty)"
                  @input="colorChanged($event, setting)"
                  v-model="setting.spec.default"/>
                <button class="unset-color-button" id="dropdownMenuButton"
                  v-if="setting.spec.unsetColorButtonAvailable && 
                    ((subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode]
                      && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty]
                      && ((!subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty] !== 'inherit')
                          || 
                          (subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentproperties.customCss[subcomponentproperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] === UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY)))
                    || ((subcomponentproperties.customCssActiveMode === SUB_COMPONENT_CSS_MODES.HOVER
                        && ((subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')
                          || ((!subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty])
                            && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== 'inherit'))
                        )
                        || (subcomponentproperties.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
                          && ((subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] !== 'inherit')
                            || ((!subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] || !subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty])
                                  && (((!subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty]) && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== 'inherit')
                                      || (subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentproperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')))))
                       )
                    )"
                  @click="removeColor(setting.spec)">
                  &times;
                </button>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.INPUT_DROPDOWN">
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

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.CHECKBOX">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <input type="checkbox" v-model="setting.spec.default" @click="checkboxMouseClick(setting.spec, setting.spec.default)">
              </div>
            </div>
            
          </div>
          <button class="reset-button" @click="resetSubcomponentProperties(settings.options)">
            &#8634;
          </button>
        </div>
      </div>
    </div>
    <!-- UX - SUBCOMPONENT SELECT - set this to appropriate dimensions when the event is fired -->
    <div ref="selectSubcomponentOverlay2" style="display: none; width: 1000px; height: 110px; background-color: #ff010100; position: absolute; border: 0px; top: 53px; z-index: 2; cursor: pointer;"></div>
  </div>
</template>

<script lang="ts">
import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SETTINGS_TYPES } from '../../../../../consts/settingsTypes.enum';
import { CustomCss } from '../../../../../interfaces/workshopComponent';
import BoxShadowUtils from './utils/boxShadowUtils';

interface Consts {
  SETTINGS_TYPES;
  SUB_COMPONENT_CSS_MODES;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX;
  getActiveModeCssPropertyValue: (param1: CustomCss, param2: SUB_COMPONENT_CSS_MODES, param3: string) => string;
  updateSettings: () => void;
  addDefaultValueIfCssModeMissing: (param1: SUB_COMPONENT_CSS_MODES, param2: string) => void;
  parseRangeValue: (param1: string, param2: number) => number;
  resetJs: () => void;
}

interface Data {
  selectorCurrentValues: unknown;
  inputDropdownCurrentValues: unknown;
}

// can be placed into composition API?
export default {
  setup(): Consts {
    return {
      SETTINGS_TYPES,
      SUB_COMPONENT_CSS_MODES,
      UNSET_COLOR_BUTTON_DISPLAYED_STATE,
      UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX,
      getActiveModeCssPropertyValue(css: CustomCss, activeMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): string {
        // the following allows multiple cases to be checked in one execution
        if (!css) return undefined;
        switch (activeMode) {
          case (SUB_COMPONENT_CSS_MODES.CLICK):
            if (css[SUB_COMPONENT_CSS_MODES.CLICK] && css[SUB_COMPONENT_CSS_MODES.CLICK].hasOwnProperty(cssProperty)) {
              return css[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
            }
          case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
            if (css[SUB_COMPONENT_CSS_MODES.HOVER] && css[SUB_COMPONENT_CSS_MODES.HOVER].hasOwnProperty(cssProperty)) {
              return css[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
            }
          case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
            if (css[SUB_COMPONENT_CSS_MODES.DEFAULT] && css[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty(cssProperty)) {
              return css[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
            }
          default:
            return undefined;
        }
      },
      updateSettings(): void {
        this.$nextTick(() => {
          const { customCss, customCssActiveMode, jsClasses, auxiliaryPartialCss } = this.subcomponentproperties;
          this.selectorCurrentValues = {};
          this.inputDropdownCurrentValues = {};
          (this.settings.options || []).forEach((setting) => {
            if (setting.type === SETTINGS_TYPES.RANGE) {
              const cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue !== undefined) {
                if (customCss[customCssActiveMode]) {
                  (setting.triggers || []).forEach((trigger) => {
                    if (trigger.conditions.has(this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, trigger.cssProperty))) {
                      customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
                      this.selectorCurrentValues[setting.spec.cssProperty] = trigger.defaultValue;
                    }
                  });
                }
                const hasBoxShadowBeenSet = setting.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, setting.spec);
                if (!hasBoxShadowBeenSet) {
                  const singlePropertyValue = setting.spec.partialCss ? cssPropertyValue.split(' ')[setting.spec.partialCss.position] : cssPropertyValue;
                  setting.spec.default = this.parseRangeValue(singlePropertyValue, setting.spec.smoothingDivisible); 
                }
              }
            } else if (setting.type === SETTINGS_TYPES.SELECT) {
              // default value for range is currently setting the select value, not the select value for ranges
              // potential race condition where range sets the select value and select may set it to something incorrect
              const cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue) { this.selectorCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.COLOR_PICKER) {
              let cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (setting.spec.cssProperty === 'boxShadow' && cssPropertyValue === 'unset') {
                cssPropertyValue = this.getActiveModeCssPropertyValue(auxiliaryPartialCss, customCssActiveMode, setting.spec.cssProperty) || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
              }
              if (cssPropertyValue) { setting.spec.default = setting.spec.partialCss ? cssPropertyValue.split(' ')[setting.spec.partialCss.position] : cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.INPUT_DROPDOWN) {
              const cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue) { this.inputDropdownCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.CHECKBOX) {
              if (setting.spec.javascript) {
                setting.spec.default = jsClasses.has(setting.spec.jsClassName);
              } else {
                const cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
                if (cssPropertyValue) { setting.spec.default = (cssPropertyValue === setting.spec.conditionalStyle.truthy); }
              }
            }
          });
        });
      },
      addDefaultValueIfCssModeMissing(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): void {
        const customCss = this.getActiveModeCssPropertyValue(this.subcomponentproperties.customCss, customCssActiveMode, cssProperty);
        if (!this.subcomponentproperties.customCss[customCssActiveMode]) {
          this.subcomponentproperties.customCss[customCssActiveMode] = { [cssProperty]: customCss };
        } else if (!this.subcomponentproperties.customCss[customCssActiveMode][cssProperty]) {
          this.subcomponentproperties.customCss[customCssActiveMode][cssProperty] = customCss;
        }
      },
      parseRangeValue(value: string, smoothingDivisible: number): number {
        return parseInt(value.substring(0, value.length - 2), 10) * smoothingDivisible;
      },
      resetJs(): void {
        this.subcomponentproperties.jsClasses = new Set([...this.subcomponentproperties.initialJsClasses]);
      },
    };
  },
  data: (): Data => ({
    selectorCurrentValues: {},
    inputDropdownCurrentValues: {},
  }),
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // put these methods into services

  // if the Settings.vue component logic is too coupled with 'boxShadow' (especially if there is another partialCss property introduced),
  // refactor it to extract the logic into a partialCss util file
  methods: {
    updateRange(event: KeyboardEvent, setting: any): void {
      const { triggers, spec } = setting;
      const { cssProperty, smoothingDivisible, partialCss } = spec;
      const { customCss, customCssActiveMode, auxiliaryPartialCss } = this.subcomponentproperties;
      (triggers || []).forEach((trigger) => {
          const cssPropertyValue = this.getActiveModeCssPropertyValue(customCss, SUB_COMPONENT_CSS_MODES.CLICK, trigger.cssProperty);
          if (trigger.conditions.has(cssPropertyValue)) {
            customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
            if (trigger.selector) { this.selectorCurrentValues[trigger.cssProperty] = trigger.defaultValue; }
          }
      });
      const rangeValue = (event.target as HTMLInputElement).value;
      if (partialCss != undefined) {
        if (customCss[customCssActiveMode][cssProperty] === undefined) {
          const defaultValues = [ ...partialCss.fullDefaultValues ];
          defaultValues[partialCss.position] = rangeValue;
          customCss[customCssActiveMode][cssProperty] = defaultValues.join(' ');
        } else {
          if (cssProperty === 'boxShadow') BoxShadowUtils.setUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, customCssActiveMode);
          const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
          cssPropertyValues[partialCss.position] = `${rangeValue}px`;
          customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
        }
        if (cssProperty === 'boxShadow') BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(this.subcomponentproperties);
      } else {
        customCss[customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}px`;
      }
    },
    rangeMouseDown(event: KeyboardEvent, customCssActiveMode: SUB_COMPONENT_CSS_MODES, spec: any): void {
      this.addDefaultValueIfCssModeMissing(customCssActiveMode, spec.cssProperty);
      setTimeout(() => {
        const popoverElement = (event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement;
        if (popoverElement.style) { popoverElement.style.opacity = '1'; }
      })
    },
    rangeMouseUp(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    preventRightClickEvent(event: KeyboardEvent): void {
      event.preventDefault();
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
        const extractedTriggerCssProperty = customCss[customCssActiveMode][triggerCssProperty];
        const conditionValue = typeof extractedTriggerCssProperty === 'string' ? parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
        let conditionMet = conditions ? conditions.has(conditionValue) : false;
        if (!conditionMet && negativeConditions) { conditionMet = !negativeConditions.has(conditionValue); }
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
      if (partialCss !== undefined) {
        if (customCss[customCssActiveMode][cssProperty] === undefined) {
          const defaultValues = [ ...partialCss.fullDefaultValues ];
          defaultValues[partialCss.position] = colorPickerValue;
          if (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] === 'unset') {
            BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(this.subcomponentproperties, colorPickerValue);
          } else {
            customCss[customCssActiveMode][cssProperty] = cssProperty === 'boxShadow' ? 'unset' : defaultValues.join(' ');
          }
        } else {
          if (cssProperty !== 'boxShadow' || (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] !== 'unset')) {
            const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
            cssPropertyValues[partialCss.position] = colorPickerValue;
            customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
          } else if (cssProperty === 'boxShadow') {
            BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(this.subcomponentproperties, colorPickerValue);
          }
        }
      } else {
        customCss[customCssActiveMode][cssProperty] = colorPickerValue;
      }
    },
    colorInputClick(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): void {
      this.addDefaultValueIfCssModeMissing(customCssActiveMode, cssProperty);
      this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode].transition = 'unset';
    },
    removeColor(spec: any): void {
      spec.default = '';
      if (!this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode]) {
        this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode] = { [spec.cssProperty]: 'inherit'};
      } else {
        this.subcomponentproperties.customCss[this.subcomponentproperties.customCssActiveMode][spec.cssProperty] = 'inherit';
      }
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
    resetSubcomponentProperties(options: any): void {
      options.forEach((option) => {
        const { cssProperty, jsClassName } = option.spec;
        if (jsClassName) {
          this.resetJs();
          return;
        }
        let cssValue = undefined;
        let propertyRemoved = false;
        const { customCss, initialCss, auxiliaryPartialCss, customCssActiveMode } = this.subcomponentproperties;
        switch (customCssActiveMode) {
          case (SUB_COMPONENT_CSS_MODES.CLICK): {
            if (initialCss[SUB_COMPONENT_CSS_MODES.CLICK] && initialCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty]) {
              cssValue = initialCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
              break;
            }
            if (customCss[SUB_COMPONENT_CSS_MODES.CLICK]) {
              delete customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
              propertyRemoved = true;
              break;
            }
          }
          case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
            if (initialCss[SUB_COMPONENT_CSS_MODES.HOVER] && initialCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty]) {
              cssValue = initialCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
              break;
            }
            if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
              if (customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty]) {
                delete customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
              }
              propertyRemoved = true;
              break;
            }
          case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
            if (initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
              cssValue = initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
              break;
            }
          default:
            break;
        }
        if (auxiliaryPartialCss && auxiliaryPartialCss[customCssActiveMode] && auxiliaryPartialCss[customCssActiveMode][cssProperty]) {
          delete auxiliaryPartialCss[customCssActiveMode][cssProperty];
        }
        if (propertyRemoved) return;
        if (!customCss[customCssActiveMode]) {
          customCss[customCssActiveMode] = { [cssProperty]: cssValue };
        } else {
          customCss[customCssActiveMode][cssProperty] = cssValue;
        }
      });
      this.updateSettings();
    },
    // UX - SUBCOMPONENT SELECT
    prepareSubcomponentSelectMode(): void {
      // this.$refs.selectSubcomponentOverlay2.style.display = 'block';
    }
  },
  props: {
    subcomponentproperties: Object,
    settings: Object,
    settingsUpdateTriggered: Boolean,
  },
  watch: {
    settings(): void {
      this.updateSettings();
    },
    settingsUpdateTriggered(): void {
      this.updateSettings();
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
