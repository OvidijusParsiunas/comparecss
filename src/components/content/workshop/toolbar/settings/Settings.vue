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
                    <div v-if="setting.spec.customFeatureObjectKeys">
                      {{customFeatureRangeValue}}
                    </div>
                    <!-- the boxShadow range properties are set to 'unset' when all are 0px (for firefox) -->
                    <div v-else-if="subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode]
                      && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]
                      && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty] !== 'unset'">
                      {{setting.spec.partialCss !== undefined && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]
                        ? subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                        : subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]}}
                    </div>
                    <div v-else-if="subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode]
                      && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]
                      && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty] === 'unset'">
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
                    @mousedown="rangeMouseDown($event, setting.spec)"
                    @mouseup="rangeMouseUp"
                    @contextmenu="preventRightClickEvent"
                    @input="updateRange($event, setting)">
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
                  @click="colorInputClick(setting.spec.cssProperty)"
                  @input="colorChanged($event, setting)"
                  v-model="setting.spec.default"/>
                <button class="unset-color-button" id="dropdownMenuButton"
                  v-if="setting.spec.unsetColorButtonAvailable && 
                    ((subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode]
                      && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]
                      && ((!subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty] !== INHERIT_CUSTOM_FEATURE_COLOR_VALUE)
                          || 
                          (subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX]
                            && subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] === UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY)))
                    || ((subcomponentProperties.activeCustomCssMode === SUB_COMPONENT_CSS_MODES.HOVER
                        && ((subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')
                          || ((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty])
                            && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== INHERIT_CUSTOM_FEATURE_COLOR_VALUE))
                        )
                        || (subcomponentProperties.activeCustomCssMode === SUB_COMPONENT_CSS_MODES.CLICK
                          && ((subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty] !== 'inherit')
                            || ((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.CLICK][setting.spec.cssProperty])
                                  && (((!subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] || !subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty]) && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][setting.spec.cssProperty] !== 'inherit')
                                      || (subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] && subcomponentProperties.customCss[SUB_COMPONENT_CSS_MODES.HOVER][setting.spec.cssProperty] !== 'inherit')))))
                       )
                    || (setting.spec.customFeatureObjectKeys && (setting.spec.default !== UNSET_CUSTOM_FEATURE_COLOR_VALUE)))"
                  @click="removeColor(setting.spec, setting.removeColorTriggers)">
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
                    v-bind:value="inputDropdownCurrentValues[setting.spec.cssProperty] || subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode][setting.spec.cssProperty]"
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
                  :objectContainingActiveOption="setting.spec.tempCustomCssObject || getObjectContainingActiveOption(setting.spec, subcomponentProperties)"
                  :activeOptionPropertyKeyName="setting.spec.cssProperty || setting.spec.activeOptionPropertyKeyName"
                  :fontAwesomeIcon="'caret-down'"
                  @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
                  @mouse-enter-button="mouseEnterActionsDropdownButton(this, setting.spec, subcomponentProperties)"
                  @mouse-leave-button="mouseLeaveActionsDropdownButton(this, setting.spec, subcomponentProperties)"
                  @mouse-enter-option="mouseEnterActionsDropdownOption(this, $event, setting.spec, subcomponentProperties)"
                  @mouse-leave-dropdown="mouseLeaveActionsDropdown(this, $event, setting.spec, subcomponentProperties)"
                  @mouse-click-option="mouseClickActionsDropdownOption(this, $event, setting, settings, subcomponentProperties)"
                  @mouse-click-new-option="mouseClickActionsDropdownNewOption($event, setting.spec, subcomponentProperties)"/>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.CHECKBOX">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <input type="checkbox" v-model="setting.spec.default" @click="checkboxMouseClick(setting.spec, setting.triggers)">
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
import ColorPickerUtils from './utils/colorPickerUtils';
import CheckboxUtils from './utils/checkboxUtils';
import SharedUtils from './utils/sharedUtils';
import RangeUtils from './utils/rangeUtils';

interface Consts {
  SETTINGS_TYPES;
  SUB_COMPONENT_CSS_MODES;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE;
  UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX;
  ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX: string;
  UNSET_CUSTOM_FEATURE_COLOR_VALUE: string;
  INHERIT_CUSTOM_FEATURE_COLOR_VALUE: string;
  updateSettings: (param1?: any, param2?: WORKSHOP_TOOLBAR_OPTION_TYPES) => void;
}

interface Data {
  settings: any;
  inputDropdownCurrentValues: unknown;
  customFeatureRangeValue: unknown;
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
      UNSET_CUSTOM_FEATURE_COLOR_VALUE: ColorPickerUtils.UNSET_CUSTOM_FEATURE_COLOR_VALUE,
      INHERIT_CUSTOM_FEATURE_COLOR_VALUE: ColorPickerUtils.INHERIT_CUSTOM_FEATURE_COLOR_VALUE,
      updateSettings(newSettings?: any, optionType?: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
        if (newSettings) this.settings = newSettings;
        if (optionType) SubcomponentSpecificSettingsState.setSubcomponentSpecificSettings(optionType,
          this.subcomponentProperties.subcomponentSpecificSettings, this.settings.options);
        this.$nextTick(() => {
          const { customCss, activeCustomCssMode } = this.subcomponentProperties;
          this.inputDropdownCurrentValues = {};
          (this.settings.options || []).forEach((setting) => {
            if (setting.type === SETTINGS_TYPES.RANGE) {
              RangeUtils.updateSettings(setting, this.settings, this.subcomponentProperties);
            } else if (setting.type === SETTINGS_TYPES.COLOR_PICKER) {
              ColorPickerUtils.updateSettings(setting.spec, this.subcomponentProperties);
            } else if (setting.type === SETTINGS_TYPES.INPUT_DROPDOWN) {
              const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, setting.spec.cssProperty);
              if (cssPropertyValue) { this.inputDropdownCurrentValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.CHECKBOX) {
              CheckboxUtils.updateSettings(setting.spec, this.subcomponentProperties);
            }
          });
          // this is a bug fix where the range would not re-render even though setting.spec.default was updated correctly
          this.settingsVisible = false;
          this.settingsVisible = true;
          // if using this.settingsVisible flag to re-render settings is slow/stuttery, use the following to trigger a rerender
          // this.subcomponentProperties.customCss[activeCustomCssMode] = { ...this.subcomponentProperties.customCss[activeCustomCssMode] };
        });
      },
      ...useActionsDropdown(),
    };
  },
  data: (): Data => ({
    inputDropdownCurrentValues: {},
    customFeatureRangeValue: null,
    settings: {},
    settingsVisible: true,
  }),
  methods: {
    updateRange(event: MouseEvent, setting: any): void {
      RangeUtils.updateProperties(event, setting, this.settings, this.subcomponentProperties);
      if (setting.spec.customFeatureObjectKeys) this.customFeatureRangeValue = SharedUtils.getCustomFeatureValue(
        setting.spec.customFeatureObjectKeys, this.subcomponentProperties.customFeatures);
    },
    rangeMouseDown(event: KeyboardEvent, settingSpec: any): void {
      if (settingSpec.customFeatureObjectKeys) { 
        this.customFeatureRangeValue = SharedUtils.getCustomFeatureValue(settingSpec.customFeatureObjectKeys,
          this.subcomponentProperties.customFeatures);
      } else {
        SharedUtils.addDefaultValueIfCssModeMissing(settingSpec.cssProperty, this.subcomponentProperties);
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
    openDropdown(cssProperty: string): void {
      this.inputDropdownCurrentValues[cssProperty] = this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode][cssProperty];
    },
    inputDropdownOptionClick(option: string, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode][cssProperty] = option;
      this.inputDropdownCurrentValues[cssProperty] = '';
    },
    inputDropdownOptionMouseOver(option: string, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode][cssProperty] = option;
    },
    inputDropdownOptionMouseLeave(cssProperty: string): void {
      if (this.inputDropdownCurrentValues[cssProperty]) {
        this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode][cssProperty] = this.inputDropdownCurrentValues[cssProperty];
      }
    },
    inputDropdownKeyboardInput(event: KeyboardEvent, cssProperty: string): void {
      this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode][cssProperty] = (event.target as HTMLInputElement).value;
    },
    blurInputDropdown(referenceId: string): void {
      this.$refs[referenceId].blur();
    },
    colorChanged(event: MouseEvent, setting: any): void {
      ColorPickerUtils.updateProperties(event, setting.spec, this.subcomponentProperties);
    },
    colorInputClick(cssProperty: string): void {
      SharedUtils.addDefaultValueIfCssModeMissing(cssProperty, this.subcomponentProperties);
      this.subcomponentProperties.customCss[this.subcomponentProperties.activeCustomCssMode].transition = 'unset';
    },
    removeColor(spec: any, removeColorTriggers: any): void {
      ColorPickerUtils.removeColor(spec, removeColorTriggers, this.subcomponentProperties, this.settings);
    },
    checkboxMouseClick(spec: any, triggers: any): void {
      CheckboxUtils.updateProperties(spec, triggers, this.subcomponentProperties, this.settings);
    },
    resetSubcomponentProperties(options: any): void {
      options.forEach((option) => {
        // change - if default has not been touched and hover has, on click mode - resetting also resets the hover
        const { cssProperty, valueInSetObject, customFeatureObjectKeys } = option.spec;
        if (customFeatureObjectKeys) {
          const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, this.subcomponentProperties.defaultCustomFeatures);
          const appropriateTypeDefaultValue = valueInSetObject ? new Set([...(defaultValue as Set<undefined>)]) : defaultValue;
          SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, this.subcomponentProperties.customFeatures,
            appropriateTypeDefaultValue);
          return;
        }
        let cssValue = undefined;
        let propertyRemoved = false;
        const { customCss, initialCss, auxiliaryPartialCss, activeCustomCssMode } = this.subcomponentProperties;
        switch (activeCustomCssMode) {
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
        if (auxiliaryPartialCss && auxiliaryPartialCss[activeCustomCssMode] && auxiliaryPartialCss[activeCustomCssMode][cssProperty]) {
          delete auxiliaryPartialCss[activeCustomCssMode][cssProperty];
        }
        if (propertyRemoved) return;
        if (!customCss[activeCustomCssMode]) {
          customCss[activeCustomCssMode] = { [cssProperty]: cssValue };
        } else {
          customCss[activeCustomCssMode][cssProperty] = cssValue;
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
