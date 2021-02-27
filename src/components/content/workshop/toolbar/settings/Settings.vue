<template>
  <div>
    <div style="position: relative; display: flex; margin-top: 10px;">
      <div style="padding: 15px; background-color: rgb(251 251 251); border-radius: 20px; margin: 0; width: 100%"> 
        <div class="container" style="display: flex">
          <div v-if="settingsVisible" style="display: grid; grid-template-columns: 50% 50%; width: 80%">
            <div v-for="(setting, settingIndex) in settings.options" :key="setting">

              <div v-if="setting.type === SETTINGS_TYPES.RANGE">
                <div style="text-align: left; float: left">
                  {{setting.spec.name}}
                </div>
                <div style="position: relative; float: left">
                  <div class="range-popover">
                    <div v-if="setting.spec.subcomponentPropertyObjectKeys">
                      {{rangeSubcomponentPropertyObjectValue}}
                    </div>
                    <!-- the boxShadow range properties are set to 'unset' when all are 0px (for firefox) -->
                    <div v-else-if="subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode]
                      && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]
                      && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty] !== 'unset'">
                      {{setting.spec.partialCss !== undefined && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]
                        ? subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                        : subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]}}
                    </div>
                    <div v-else-if="subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode]
                      && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]
                      && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty] === 'unset'">
                      0px
                    </div>
                    <div v-else>
                      {{setting.spec.default}}px
                    </div>
                  </div>
                  <input type="range" id="formControlRange" class="form-control-range"
                    v-bind:min="setting.spec.scale[0]"
                    v-bind:max="setting.spec.scale[1]"
                    v-model="setting.spec.default"
                    @mousedown="rangeMouseDown($event, subcomponentProperties.customCssActiveMode, setting)"
                    @mouseup="rangeMouseUp"
                    @contextmenu="preventRightClickEvent"
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
                  @click="colorInputClick(subcomponentProperties.customCssActiveMode, setting.spec.cssProperty)"
                  @input="colorChanged($event, setting)"
                  v-model="setting.spec.default"/>
                <button class="unset-color-button" id="dropdownMenuButton"
                  v-if="setting.spec.unsetColorButtonAvailable && 
                    ((subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode]
                      && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]
                      && ((!subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty] !== 'inherit')
                          || 
                          (subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] === UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY)))
                    || ((subcomponentProperties.customCssActiveMode === SUB_COMPONENT_CSS_MODES.HOVER
                        && ((subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')
                          || ((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty])
                            && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== 'inherit'))
                        )
                        || (subcomponentProperties.customCssActiveMode === SUB_COMPONENT_CSS_MODES.CLICK
                          && ((subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] !== 'inherit')
                            || ((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty])
                                  && (((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty]) && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== 'inherit')
                                      || (subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')))))
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
                  <input type="text" class="form-control" aria-label="Text input with dropdown button"
                    :ref="`elementReference${settingIndex}`"
                    v-bind:value="inputDropdownCurrentValues[setting.spec.cssProperty] || subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode][setting.spec.cssProperty]"
                    @input="inputDropdownKeyboardInput($event, setting.spec.cssProperty)"
                    @keyup.enter="blurInputDropdown(`elementReference${settingIndex}`)">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="openDropdown(setting.spec.cssProperty)"></button>
                    <div class="dropdown-menu" @mouseleave="inputDropdownOptionMouseLeave(setting.spec.cssProperty)">
                      <a class="dropdown-item" @mouseover="inputDropdownOptionMouseOver(option, setting.spec.cssProperty)" @click="inputDropdownOptionClick(option, setting.spec.cssProperty)" v-for="(option) in setting.spec.options" :key="option">{{option}}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.ACTIONS_DROPDOWN">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <dropdown class="option-component-button"
                  :uniqueIdentifier="`${ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX}${settingIndex}`"
                  :dropdownOptions="setting.spec.options"
                  :objectContainingActiveOption="getObjectContainingActiveOption(setting.spec.subcomponentPropertyObjectKeys, subcomponentProperties)"
                  :activeOptionPropertyKeyName="setting.spec.activeOptionPropertyKeyName"
                  :fontAwesomeIconClassName="'fa-caret-down'"
                  @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
                  @mouse-enter-button="mouseEnterActionsDropdownButton(this, setting.spec, subcomponentProperties)"
                  @mouse-leave-button="mouseLeaveActionsDropdownButton(this, $event, setting.spec.mouseLeaveButtonCallback)"
                  @mouse-enter-option="mouseEnterActionsDropdownOption(this, $event, setting.spec.mouseEnterOptionCallback)"
                  @mouse-leave-dropdown="mouseLeaveActionsDropdown(this, $event, setting.spec.mouseLeaveDropdownCallback)"
                  @mouse-click-option="mouseClickActionsDropdownOption(this, $event, setting.spec.mouseClickOptionCallback)"
                  @mouse-click-new-option="mouseClickActionsDropdownNewOption($event, setting.spec.subcomponentPropertyObjectKeys, subcomponentProperties)"/>
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
            <!-- <i :class="['fa', 'fa-history']"></i> -->
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
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import SubcomponentSpecificSettingsState from './utils/subcomponentSpecificSettingsState';
import { UseActionsDropdown } from '../../../../../interfaces/UseActionsDropdown';
import { SETTINGS_TYPES } from '../../../../../consts/settingsTypes.enum';
import useActionsDropdown from './compositionAPI/useActionsDropdown';
import dropdown from '../options/dropdown/Dropdown.vue';
import BoxShadowUtils from './utils/boxShadowUtils';
import CheckboxUtils from './utils/checkboxUtils';
import SharedUtils from './utils/sharedUtils';
import RangeUtils from './utils/rangeUtils';

interface Consts {
  SETTINGS_TYPES;
  SUB_COMPONENT_CSS_MODES;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX;
  ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX: string;
  updateSettings: (param1?: any, param2?: WORKSHOP_TOOLBAR_OPTION_TYPES) => void;
  addDefaultValueIfCssModeMissing: (param1: SUB_COMPONENT_CSS_MODES, param2: string) => void;
}

interface Data {
  settings: any;
  selectorCurrentValues: unknown;
  inputDropdownCurrentValues: unknown;
  rangeSubcomponentPropertyObjectValue: unknown;
  settingsVisible: boolean;
}

// can be placed into composition API?
export default {
  setup(): Consts & UseActionsDropdown {
    return {
      SETTINGS_TYPES,
      SUB_COMPONENT_CSS_MODES,
      UNSET_COLOR_BUTTON_DISPLAYED_STATE,
      UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX,
      ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX: 'actionsDropdown-',
      updateSettings(newSettings?: any, optionType?: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
        if (newSettings) this.settings = newSettings;
        if (optionType) SubcomponentSpecificSettingsState.setSubcomponentSpecificSettings(optionType,
          this.subcomponentProperties.subcomponentSpecificSettings, this.settings.options);
        this.$nextTick(() => {
          const { customCss, customCssActiveMode, auxiliaryPartialCss } = this.subcomponentProperties;
          this.selectorCurrentValues = {};
          this.inputDropdownCurrentValues = {};
          (this.settings.options || []).forEach((setting) => {
            if (setting.type === SETTINGS_TYPES.RANGE) {
              RangeUtils.updateSettings(setting, this.settings, customCss, customCssActiveMode, this.subcomponentProperties, this.selectorCurrentValues);
            } else if (setting.type === SETTINGS_TYPES.SELECT) {
              // default value for range is currently setting the select value, not the select value for ranges
              // potential race condition where range sets the select value and select may set it to something incorrect
              const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue) { this.selectorCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.COLOR_PICKER) {
              let cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (setting.spec.cssProperty === 'boxShadow' && cssPropertyValue === 'unset') {
                cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, customCssActiveMode, setting.spec.cssProperty) || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
              }
              if (cssPropertyValue) { setting.spec.default = setting.spec.partialCss ? cssPropertyValue.split(' ')[setting.spec.partialCss.position] : cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.INPUT_DROPDOWN) {
              const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, setting.spec.cssProperty);
              if (cssPropertyValue) { this.inputDropdownCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.CHECKBOX) {
              CheckboxUtils.updateSettings(setting.spec, this.subcomponentProperties);
            }
          });
          // this is a bug fix where the range would not re-render even though setting.spec.default was updated correctly
          this.settingsVisible = false;
          this.settingsVisible = true;
          // if using this.settingsVisible flag to re-render settings is slow/stuttery, use the following to trigger a rerender
          // this.subcomponentProperties.customCss[customCssActiveMode] = { ...this.subcomponentProperties.customCss[customCssActiveMode] };
        });
      },
      addDefaultValueIfCssModeMissing(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): void {
        const customCss = SharedUtils.getActiveModeCssPropertyValue(this.subcomponentProperties.customCss, customCssActiveMode, cssProperty);
        if (!this.subcomponentProperties.customCss[customCssActiveMode]) {
          this.subcomponentProperties.customCss[customCssActiveMode] = { [cssProperty]: customCss };
        } else if (!this.subcomponentProperties.customCss[customCssActiveMode][cssProperty]) {
          this.subcomponentProperties.customCss[customCssActiveMode][cssProperty] = customCss;
        }
      },
      ...useActionsDropdown(),
    };
  },
  data: (): Data => ({
    selectorCurrentValues: {},
    inputDropdownCurrentValues: {},
    rangeSubcomponentPropertyObjectValue: null,
    settings: {},
    settingsVisible: true,
  }),
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // put these methods into services

  // if the Settings.vue component logic is too coupled with 'boxShadow' (especially if there is another partialCss property introduced),
  // refactor it to extract the logic into a partialCss util file
  methods: {
    updateRange(event: MouseEvent, setting: any): void {
      if (setting.spec.subcomponentPropertyObjectKeys) this.rangeSubcomponentPropertyObjectValue = SharedUtils.getSubcomponentPropertyValue(
        setting.spec.subcomponentPropertyObjectKeys, this.subcomponentProperties);
      RangeUtils.updateProperties(event, setting, this.settings, this.subcomponentProperties, this.selectorCurrentValues);
    },
    rangeMouseDown(event: KeyboardEvent, customCssActiveMode: SUB_COMPONENT_CSS_MODES, setting: any): void {
      if (setting.spec.subcomponentPropertyObjectKeys) { 
        this.rangeSubcomponentPropertyObjectValue = SharedUtils.getSubcomponentPropertyValue(setting.spec.subcomponentPropertyObjectKeys, this.subcomponentProperties);
      } else {
        this.addDefaultValueIfCssModeMissing(customCssActiveMode, setting.spec.cssProperty);
      }
      setTimeout(() => {
        const popoverElement = (event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement;
        if (popoverElement.style) { popoverElement.style.opacity = '1'; }
      });
    },
    rangeMouseUp(event: KeyboardEvent): void {
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    preventRightClickEvent(event: KeyboardEvent): void {
      event.preventDefault();
    },
    selectOptionMouseOver(option: string, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = option;
    },
    selectMenuMouseLeave(cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = this.selectorCurrentValues[cssProperty];
    },
    openDropdown(cssProperty: string): void {
      this.inputDropdownCurrentValues[cssProperty] = this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty];
    },
    selectOptionClick(option: string, setting: any): void {
      const { triggers, spec } = setting;
      const { customCss, customCssActiveMode } = this.subcomponentProperties;
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
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = option;
      this.inputDropdownCurrentValues[cssProperty] = '';
    },
    inputDropdownOptionMouseOver(option: string, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = option;
    },
    inputDropdownOptionMouseLeave(cssProperty: string): void {
      if (this.inputDropdownCurrentValues[cssProperty]) {
        this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = this.inputDropdownCurrentValues[cssProperty];
      }
    },
    inputDropdownKeyboardInput(event: KeyboardEvent, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][cssProperty] = (event.target as HTMLInputElement).value;
    },
    blurInputDropdown(referenceId: string): void {
      this.$refs[referenceId].blur();
    },
    colorChanged(event: KeyboardEvent, setting: any): void {
      const { cssProperty, partialCss } = setting.spec;
      const colorPickerValue = (event.target as HTMLInputElement).value;
      const { customCss, customCssActiveMode } = this.subcomponentProperties;
      if (partialCss !== undefined) {
        if (customCss[customCssActiveMode][cssProperty] === undefined) {
          const defaultValues = [ ...partialCss.fullDefaultValues ];
          defaultValues[partialCss.position] = colorPickerValue;
          if (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] === 'unset') {
            BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(this.subcomponentProperties, colorPickerValue);
          } else {
            customCss[customCssActiveMode][cssProperty] = cssProperty === 'boxShadow' ? 'unset' : defaultValues.join(' ');
          }
        } else {
          if (cssProperty !== 'boxShadow' || (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] !== 'unset')) {
            const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
            cssPropertyValues[partialCss.position] = colorPickerValue;
            customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
          } else if (cssProperty === 'boxShadow') {
            BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(this.subcomponentProperties, colorPickerValue);
          }
        }
      } else {
        customCss[customCssActiveMode][cssProperty] = colorPickerValue;
      }
    },
    colorInputClick(customCssActiveMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): void {
      this.addDefaultValueIfCssModeMissing(customCssActiveMode, cssProperty);
      this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode].transition = 'unset';
    },
    removeColor(spec: any): void {
      spec.default = '';
      if (!this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode]) {
        this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode] = { [spec.cssProperty]: 'inherit'};
      } else {
        this.subcomponentProperties.customCss[this.subcomponentProperties.customCssActiveMode][spec.cssProperty] = 'inherit';
      }
    },
    checkboxMouseClick(spec: any, previousCheckboxValue: boolean): void {
      CheckboxUtils.updateProperties(previousCheckboxValue, spec, this.subcomponentProperties, this.settings);
    },
    resetSubcomponentProperties(options: any): void {
      options.forEach((option) => {
        const { cssProperty, isSet, subcomponentPropertyObjectKeys } = option.spec;
        if (subcomponentPropertyObjectKeys) {
          const defaultValue = SharedUtils.getSubcomponentPropertyValue(subcomponentPropertyObjectKeys, this.subcomponentProperties.defaultProperties);
          const appropriateTypeDefaultValue = isSet ? new Set([...(defaultValue as Set<undefined>)]) : defaultValue;
          SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, this.subcomponentProperties, appropriateTypeDefaultValue);
          return;
        }
        let cssValue = undefined;
        let propertyRemoved = false;
        const { customCss, initialCss, auxiliaryPartialCss, customCssActiveMode } = this.subcomponentProperties;
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
    toggleSubcomponentSelectMode(): void {
      // this.$refs.selectSubcomponentOverlay2.style.display = 'block';
    }
  },
  props: {
    subcomponentProperties: Object,
  },
  components: {
    dropdown,
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
