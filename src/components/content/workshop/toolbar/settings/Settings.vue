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
                    <div v-else-if="setting.spec.greatestControlledNumber !== undefined && setting.spec.default / setting.spec.smoothingDivisible > setting.spec.greatestControlledNumber">
                      {{setting.spec.greatestControlledNumber + setting.spec.postfix}}
                    </div>
                    <!-- the boxShadow range properties are set to 'unset' when all are 0px (for firefox) -->
                    <div v-else-if="isCssPropertyNotEquals(setting, UNSET)">
                      {{setting.spec.partialCss !== undefined && subcomponent.customCss[subcomponent.activeCssPseudoClass][setting.spec.cssProperty]
                        ? subcomponent.customCss[subcomponent.activeCssPseudoClass][setting.spec.cssProperty].split(' ')[setting.spec.partialCss.position]
                        : subcomponent.customCss[subcomponent.activeCssPseudoClass][setting.spec.cssProperty]}}
                    </div>
                    <div v-else-if="isCssPropertyEquals(setting, UNSET)">
                      0px
                    </div>
                    <div v-else>
                      {{setting.spec.default}}px
                    </div>
                  </div>
                  <input type="range" id="formControlRange"
                    class="form-control-range"
                    :class="RANGE_SETTING_MARKER"
                    v-bind:min="setting.spec.scale[0]"
                    v-bind:max="setting.spec.scale[1]"
                    v-model="setting.spec.default"
                    @mousedown="selectSetting(rangeMouseDown.bind(this, $event, setting.spec))"
                    @mouseup="rangeMouseUp($event, setting.spec)"
                    @contextmenu="preventRightClickEvent"
                    @input="changeSetting(updateRange.bind(this, $event, setting))">
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
                  @mousedown="selectSetting()"
                  @click="colorInputClick(setting.spec.cssProperty)"
                  @input="changeSetting(colorChanged.bind(this, $event, setting))"
                  v-model="setting.spec.default"/>
                <button class="unset-setting-button" id="dropdownMenuButton"
                  v-if="isUnsetColorButtonDisplayed(setting)"
                  @mousedown="selectSetting()"
                  @click="changeSetting(removeColor.bind(this, setting.spec, setting.removeColorTriggers))">
                  &times;
                </button>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.INPUT">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <div class="input-group">
                  <input type="text"
                    class="form-control"
                    :ref="`elementReference${settingIndex}`"
                    v-bind:value="inputsValues[setting.spec.name] || setting.spec.default"
                    @mousedown="selectSetting()"
                    @input="changeSetting(inputEventForInput.bind(this, $event, setting.spec.customFeatureObjectKeys), setting.spec.customFeatureObjectKeys)"
                    @keyup.enter="blurInputDropdown(`elementReference${settingIndex}`)">
                </div>
              </div>
              
              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.INPUT_DROPDOWN">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <div class="input-group">
                  <input type="text"
                    class="form-control"
                    :ref="`elementReference${settingIndex}`"
                    v-bind:value="inputDropdownsValues[setting.spec.cssProperty] || subcomponent.customCss[subcomponent.activeCssPseudoClass][setting.spec.cssProperty]"
                    @mousedown="selectSetting()"
                    @input="changeSetting(inputEventForDropdownInput.bind(this, $event, setting.spec.cssProperty))"
                    @keyup.enter="blurInputDropdown(`elementReference${settingIndex}`)">
                  <div class="input-group-append">
                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                      class="btn dropdown-toggle" :class="TOOLBAR_GENERAL_BUTTON_CLASS"
                      @click="selectSetting(openDropdown.bind(this, setting.spec.cssProperty))"></button>
                    <div class="dropdown-menu" @mouseleave="inputDropdownItemMouseLeave(setting.spec.cssProperty)">
                      <a class="dropdown-item" v-for="(option) in setting.spec.options" :key="option"
                        @click="changeSetting(inputDropdownItemClick.bind(this, option, setting.spec.cssProperty))"
                        @mouseover="inputDropdownItemMouseOver(option, setting.spec.cssProperty)">
                          {{option}}
                      </a>
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
                  :dropdownItems="setting.spec.options"
                  :objectContainingActiveItem="actionsDropdownsObjects[setting.spec.cssProperty || setting.spec.name] || {}"
                  :activeItemPropertyKeyName="setting.spec.cssProperty || setting.spec.activeItemPropertyKeyName"
                  :fontAwesomeIcon="'caret-down'"
                  :minItemsToDisplayDropdown="1"
                  :consistentButtonContent="{'text': actionsDropdownsButtonText[setting.spec.name]}"
                  @click="selectSetting()"
                  @hide-dropdown-menu-callback="openActionsDropdownMenu($event, setting.spec)"
                  @mouse-enter-button="mouseEnterActionsDropdownButton(this, setting.spec, subcomponent)"
                  @mouse-leave-button="mouseLeaveActionsDropdownButton(this, setting.spec, subcomponent)"
                  @mouse-enter-item="mouseEnterActionsDropdownItem(this, $event, setting.spec, subcomponent)"
                  @mouse-leave-dropdown="mouseLeaveActionsDropdown(this, setting.spec, subcomponent, false)"
                  @mouse-click-item="changeSetting(mouseClickActionsDropdownItem.bind(this, this, $event, setting, settings, subcomponent), setting.spec.customFeatureObjectKeys)"
                  @mouse-click-new-item="mouseClickActionsDropdownNewItem($event, setting.spec, subcomponent, actionsDropdownsObjects[setting.spec.cssProperty || setting.spec.activeItemPropertyKeyName])"
                  @hide-dropdown-menu="hideActionsDropdownMenu(setting.spec)"/>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.CHECKBOX">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <input type="checkbox" v-model="setting.spec.default"
                  @mousedown="selectSetting()"
                  @click="changeSetting(checkboxMouseClick.bind(this, setting.spec.default, setting.spec, setting.triggers))">
              </div>
              
              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.UPLOAD_FILE">
                <input ref="uploadImage" type='file' @change="uploadImage($event, setting.spec)" accept="image/*" hidden/>
                <button
                  class="btn btn-group-option"
                  :class="TOOLBAR_GENERAL_BUTTON_CLASS"
                  @mousedown="selectSetting()"
                  @click="triggerImageUpload(event)">
                    <font-awesome-icon :style="{ color: FONT_AWESOME_COLORS.DEFAULT }" class="sync-icon" icon="upload"/>
                    Upload
                </button>
                <div>{{imageNames[setting.spec.name]}}</div>
                <button class="unset-setting-button" id="dropdownMenuButton"
                  v-if="isRemoveImageButtonDisplayed(setting.spec.name)"
                  @mousedown="selectSetting()"
                  @click="changeSetting(removeImage.bind(this, setting.spec))">
                  &times;
                </button>
              </div>

              <div style="display: flex" v-if="setting.type === SETTINGS_TYPES.BUTTONS">
                <div style="text-align: left">
                  {{setting.spec.name}}
                </div>
                <div class="btn-group option-component-button-container">
                  <button v-for="(option, name) in setting.spec.options" :key="option"
                    class="btn btn-group-option" :class="TOOLBAR_GENERAL_BUTTON_CLASS"
                    @mousedown="selectSetting()"
                    @click="activateButton(setting.spec.itemAction, name)">
                    {{name}}
                  </button>
                </div>
                <!-- <input type="checkbox" v-model="setting.spec.default" @click="changeSetting(checkboxMouseClick.bind(this, setting.spec.default, setting.spec, setting.triggers))"> -->
              </div>
            </div>
          </div>
          <button v-if="isResetButtonDisplayed()"
            class="reset-button"
            @click="selectSetting(changeSetting.bind(this, resetSubcomponent.bind(this, settings.options)))">
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
import { ComponentDOMElementUtils } from '../../utils/componentManipulation/componentDOMElementUtils/componentDOMElementUtils'
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { RemoveInSyncOptionButton } from '../../../../../interfaces/settingsComponentEvents';
import { UseActionsDropdown } from '../../../../../interfaces/useActionsDropdownComposition';
import SubcomponentSpecificSettingsState from './utils/subcomponentSpecificSettingsState';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { TOOLBAR_GENERAL_BUTTON_CLASS } from '../../../../../consts/toolbarClasses';
import { FONT_AWESOME_COLORS } from '../../../../../consts/fontAwesomeColors.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { RANGE_SETTING_MARKER } from '../../../../../consts/elementClassMarkers';
import { SyncedComponent } from '../options/syncChildComponent/syncedComponent';
import ActionsDropdownUtils from './compositionAPI/utils/actionsDropdownUtils';
import { UnsetColorButton } from './utils/colorPickerUtils/unsetColorButton';
import { ColorPickerUtils } from './utils/colorPickerUtils/colorPickerUtils';
import { SETTINGS_TYPES } from '../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../consts/settingNames.enum';
import useActionsDropdown from './compositionAPI/useActionsDropdown';
import dropdown from '../options/dropdown/Dropdown.vue';
import RangeUtils from './utils/rangeUtils/rangeUtils';
import CheckboxUtils from './utils/checkboxUtils';
import SettingsUtils from './utils/settingsUtils';
import SharedUtils from './utils/sharedUtils';
import ImageUtils from './utils/imageUtils';

interface Consts {
  RANGE_SETTING_MARKER: string;
  UNSET: CSS_PROPERTY_VALUES.UNSET;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  SETTINGS_TYPES: typeof SETTINGS_TYPES;
  FONT_AWESOME_COLORS: typeof FONT_AWESOME_COLORS;
  ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX: string;
  refreshSettings: (param1?: any, param2?: WORKSHOP_TOOLBAR_OPTION_TYPES) => void;
}

interface Data {
  settings: any;
  imageNames: unknown;
  inputsValues: unknown;
  inputDropdownsValues: unknown;
  actionsDropdownsObjects: unknown;
  actionsDropdownsButtonText: unknown; 
  customFeatureRangeValue: unknown;
  settingsVisible: boolean;
}

// can be placed into composition API?
export default {
  setup(): Consts & UseActionsDropdown {
    return {
      SETTINGS_TYPES,
      RANGE_SETTING_MARKER,
      FONT_AWESOME_COLORS,
      TOOLBAR_GENERAL_BUTTON_CLASS,
      UNSET: CSS_PROPERTY_VALUES.UNSET,
      ACTIONS_DROPDOWN_UNIQUE_IDENTIFIER_PREFIX: 'actionsDropdown-',
      refreshSettings(newSettings?: any, optionType?: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
        if (newSettings) this.settings = newSettings;
        if (optionType) SubcomponentSpecificSettingsState.setSubcomponentSpecificSettings(optionType,
          this.subcomponent.subcomponentSpecificSettings, this.settings.options);
        this.$nextTick(() => {
          const { customCss, activeCssPseudoClass } = this.subcomponent;
          this.imageNames = {};
          this.inputsValues = {};
          this.inputDropdownsValues = {};
          this.actionsDropdownsObjects = {};
          this.actionsDropdownsButtonText = {};
          (this.settings.options || []).forEach((setting) => {
            if (setting.type === SETTINGS_TYPES.RANGE) {
              RangeUtils.updateSettings(setting, this.subcomponent);
            } else if (setting.type === SETTINGS_TYPES.COLOR_PICKER) {
              ColorPickerUtils.updateSettings(setting.spec, this.subcomponent);
            } else if (setting.type === SETTINGS_TYPES.INPUT) {
              const keys = setting.spec.customFeatureObjectKeys;
              this.inputsValues[setting.spec.name] = SharedUtils.getCustomFeatureValue(keys, this.subcomponent[keys[0]]);
              if (!newSettings) SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.INPUT, this.subcomponent)
            } else if (setting.type === SETTINGS_TYPES.INPUT_DROPDOWN) {
              const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, setting.spec.cssProperty);
              if (cssPropertyValue) { this.inputDropdownsValues[setting.spec.cssProperty] = cssPropertyValue; }
            } else if (setting.type === SETTINGS_TYPES.ACTIONS_DROPDOWN) {
              const objectContainingActiveItem = this.getObjectContainingActiveOption(setting.spec, this.subcomponent);
              if (objectContainingActiveItem) { this.actionsDropdownsObjects[setting.spec.cssProperty || setting.spec.name] = objectContainingActiveItem; }
              if (!newSettings) ActionsDropdownUtils.callSettingCustomFunction(
                setting.spec, this.subcomponent, objectContainingActiveItem[setting.spec.activeItemPropertyKeyName]);
            } else if (setting.type === SETTINGS_TYPES.CHECKBOX) {
              CheckboxUtils.updateSettings(setting, this.subcomponent);
            } else if (setting.type === SETTINGS_TYPES.UPLOAD_FILE) {
              const keys = setting.spec.auxiliaryCustomFeatureObjectKeys;
              this.imageNames[setting.spec.name] = SharedUtils.getCustomFeatureValue(keys, this.subcomponent[keys[0]]);
            }
          });
          // this is a bug fix where the range would not re-render even though setting.spec.default was updated correctly
          this.settingsVisible = false;
          this.settingsVisible = true;
          // if using this.settingsVisible flag to re-render settings is slow/stuttery, use the following to trigger a rerender
          // this.subcomponent.customCss[activeCssPseudoClass] = { ...this.subcomponent.customCss[activeCssPseudoClass] };
        });
      },
      ...useActionsDropdown(),
    };
  },
  data: (): Data => ({
    imageNames: {},
    inputsValues: {},
    inputDropdownsValues: {},
    actionsDropdownsObjects: {},
    actionsDropdownsButtonText: {},
    customFeatureRangeValue: null,
    settings: {},
    settingsVisible: true,
  }),
  methods: {
    selectSetting(callback?: () => void): void {
      ComponentDOMElementUtils.displaySubcomponentElementIfHidden(this.subcomponent.name);
      callback?.();
    },
    activateButton(itemAction: any, actionName: string): void {
      itemAction(this, actionName, this.component);
    },
    getCurrentCssProperty(setting: any): boolean {
      return this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass]?.[setting.spec.cssProperty];
    },
    isCssPropertyEquals(setting: any, propertyValue: string): boolean {
      const cssProperty = this.getCurrentCssProperty(setting);
      return cssProperty && cssProperty === propertyValue;
    },
    isCssPropertyNotEquals(setting: any, propertyValue: string): boolean {
      const cssProperty = this.getCurrentCssProperty(setting);
      return cssProperty && cssProperty !== propertyValue;
    },
    isUnsetColorButtonDisplayed(setting: any): boolean {
      return UnsetColorButton.isUnsetColorButtonDisplayed(setting.spec, this.subcomponent);
    },
    updateRange(event: MouseEvent, setting: any): void {
      RangeUtils.updateProperties(event, setting, this.settings, this.subcomponent, this.actionsDropdownsObjects,
        this.refreshSettings.bind(this));
      const keys = setting.spec.customFeatureObjectKeys;
      if (keys) this.customFeatureRangeValue = SharedUtils.getCustomFeatureValue(keys, this.subcomponent[keys[0]]);
    },
    rangeMouseDown(event: KeyboardEvent, settingSpec: any): void {
      const keys = settingSpec.customFeatureObjectKeys;
      if (keys) { 
        this.customFeatureRangeValue = SharedUtils.getCustomFeatureValue(keys, this.subcomponent[keys[0]]);
      } else {
        SharedUtils.addDefaultValueIfCssModeMissing(settingSpec.cssProperty, this.subcomponent);
      }
      setTimeout(() => {
        const popoverElement = (event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement;
        if (popoverElement.style) { popoverElement.style.opacity = '1'; }
      });
    },
    rangeMouseUp(event: MouseEvent, settingSpec: any): void {
      RangeUtils.saveLastSelectedValue(event, settingSpec, this.subcomponent);
      ((event.target as HTMLInputElement).parentElement.childNodes[0] as HTMLElement).style.opacity = '0';
    },
    preventRightClickEvent(event: KeyboardEvent): void {
      event.preventDefault();
    },
    openDropdown(cssProperty: string): void {
      this.inputDropdownsValues[cssProperty] = this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass][cssProperty];
    },
    inputDropdownItemClick(option: string, cssProperty: string): void {
      this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass][cssProperty] = option;
      this.inputDropdownsValues[cssProperty] = '';
    },
    inputDropdownItemMouseOver(option: string, cssProperty: string): void {
      this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass][cssProperty] = option;
    },
    inputDropdownItemMouseLeave(cssProperty: string): void {
      if (this.inputDropdownsValues[cssProperty]) {
        this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass][cssProperty] = this.inputDropdownsValues[cssProperty];
      }
    },
    inputEventForDropdownInput(event: KeyboardEvent, cssProperty: string): void {
      this.subcomponent.customCss[this.subcomponent.activeCssPseudoClass][cssProperty] = (event.target as HTMLInputElement).value;
    },
    inputEventForInput(event: KeyboardEvent, customFeatureObjectKeys: string[]): void {
      SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.INPUT, this.subcomponent);
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, this.subcomponent, (event.target as HTMLInputElement).value);
    },
    blurInputDropdown(referenceId: string): void {
      this.$refs[referenceId].blur();
    },
    colorChanged(event: MouseEvent, setting: any): void {
      ColorPickerUtils.updateProperties(event, setting.spec, this.subcomponent);
    },
    colorInputClick(cssProperty: string): void {
      SharedUtils.addDefaultValueIfCssModeMissing(cssProperty, this.subcomponent);
    },
    removeColor(spec: any, removeColorTriggers: any): void {
      ColorPickerUtils.removeColor(spec, removeColorTriggers, this.subcomponent, this.settings);
    },
    checkboxMouseClick(currentCheckboxValue: boolean, spec: any, triggers: any): void {
      CheckboxUtils.updateProperties(currentCheckboxValue, spec, triggers, this.subcomponent, this.settings);
      setTimeout(() => this.refreshSettings());
    },
    triggerImageUpload(): void {
      this.$refs.uploadImage.click();
    },
    uploadImage(event: any, spec: any): void {
      ImageUtils.uploadImage(this, event, spec);
    },
    isRemoveImageButtonDisplayed(settingName: string): boolean {
      return this.subcomponent.subcomponentType !== SUBCOMPONENT_TYPES.IMAGE && this.imageNames[settingName];
    },
    removeImage(spec: any): void {
      ImageUtils.removeImage(this, spec);
    },
    openActionsDropdownMenu(hideDropdownMenuCallbackEvent: WorkshopEventCallback, spec: any): void {
      ActionsDropdownUtils.setConsistentButtonContent(this, spec, this.subcomponent);
      this.$emit('hide-dropdown-menu-callback', hideDropdownMenuCallbackEvent);
    },
    hideActionsDropdownMenu(spec: any): void {
      this.actionsDropdownsButtonText[spec.name] = null;
      this.mouseLeaveActionsDropdown(this, spec, this.subcomponent, true)
    },
    resetSubcomponent(options: any): void {
      SettingsUtils.resetSubcomponent(options, this.subcomponent);
      this.refreshSettings();
    },
    isResetButtonDisplayed(): boolean {
      const notResettableOption = this.settings.options?.find((option) => {
        return (option.spec.name === SETTING_NAMES.ALIGN || option.spec.name === SETTING_NAMES.ORDER)});
      return !(!!notResettableOption);
    },
    // UX - SUBCOMPONENT SELECT
    toggleSubcomponentSelectMode(): void {
      // this.$refs.selectSubcomponentOverlay2.style.display = 'block';
    },
    changeSetting(callback: () => void, customFeatureObjectKeys?: string[]): void {
      if (SyncedComponent.isInSyncButtonDisplayed(this.subcomponent) && customFeatureObjectKeys?.[0] !== 'customStaticFeatures') {
        this.$emit('remove-insync-option-button', callback as RemoveInSyncOptionButton);
      } else {
        callback();
      }
    },
  },
  props: {
    component: Object,
    subcomponent: Object,
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
  .dropdown-toggle::after {
    vertical-align: 0.15em !important;
  }
  .unset-setting-button {
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
  .unset-setting-button:hover {
    opacity: 0.7;    
  }
  .unset-setting-button:focus {
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
