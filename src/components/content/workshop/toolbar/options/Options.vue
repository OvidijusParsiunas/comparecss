<template>
  <div class="options-container">
    <div class="options-container-inner">
      <div class="btn-group option-component-button">
        <button v-if="isSubcomponentSelectModeButtonDisplayed"
          id="component-select-button" type="button" class="btn option-action-button" :class="[SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @click="initiateSubcomponentSelectMode">
          <i class="fa fa-mouse-pointer" :class="[SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"></i>
        </button>
        <dropdown class="button-group-secondary-component"
          :uniqueIdentifier="SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
          :dropdownOptions="component.componentPreviewStructure.subcomponentDropdownStructure"
          :objectContainingActiveOption="component"
          :activeOptionPropertyKeyName="'activeSubcomponentName'"
          :fontAwesomeIcon="'angle-double-down'"
          :highlightSubcomponents="true"
          :isButtonGroup="true"
          :isNested="true"
          :customEventHandlers="useSubcomponentDropdownEventHandlers"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @mouse-click-new-option="newSubcomponentNameClicked($event)"
          @is-component-displayed="toggleSubcomponentSelectModeButtonDisplay($event)"/>
      </div>
      <div v-if="component.type === MODAL_COMPONENT_TYPE" class="option-component-button">
        <button ref="expandedModalPreviewModeToggle"
          type="button" class="btn option-action-button expanded-modal-preview-mode-button" :class="[EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @keydown.enter.prevent="$event.preventDefault()" @click="toggleModalExpandMode">
          <font-awesome-icon v-if="isExpandedModalPreviewModeActive"
            :style="{ color: FONT_AWESOME_COLORS.DEFAULT, ...BROWSER_SPECIFIC_EXPAND_MODAL_PREVIEW_STYLE }"
            class="expand-icon dropdown-button-marker" icon="compress"/>
          <font-awesome-icon v-else
            :style="{ color: FONT_AWESOME_COLORS.DEFAULT, ...BROWSER_SPECIFIC_EXPAND_MODAL_PREVIEW_STYLE }"
            class="expand-icon dropdown-button-marker" icon="expand"/>
        </button>
      </div>
      <div class="btn-group option-component-button"
        :style="{marginRight: component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef ? '0px' : '8px'}"
        v-if="component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus || component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef">
        <transition-group name="horizontal-transition">
          <button ref="importComponentToggle"
            v-if="component.subcomponents[component.activeSubcomponentName].importedComponent && component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus"
            type="button" class="btn-group-option option-action-button" :class="[{'transition-item': isSubcomponentButtonsTransitionAllowed}, OPTION_MENU_BUTTON_MARKER]"
            @keydown.enter.prevent="$event.preventDefault()" @click="toggleSubcomponentImport">
              <font-awesome-icon
                :style="{ color: isImportComponentModeActive ? FONT_AWESOME_COLORS.ACTIVE : FONT_AWESOME_COLORS.DEFAULT }"
                class="import-icon" icon="long-arrow-alt-down"/>
          </button>
          <button v-if="isInSyncButtonDisplayed()"
            type="button" class="btn-group-option option-action-button button-group-secondary-component"
            :class="[{'transition-item': isSubcomponentButtonsTransitionAllowed}, OPTION_MENU_BUTTON_MARKER]"
            @keydown.enter.prevent="$event.preventDefault()" @click="toggleImportedComponentInSync()">
              <font-awesome-icon :style="{ color: FONT_AWESOME_COLORS.ACTIVE }" class="sync-icon" icon="sync-alt"/>
          </button>
          <!-- v-if="true" is used to prevent a transition-group warning being displayed in the browser as each element needs to be keyed and this is a way around it -->
          <button v-if="component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus"
            type="button" class="btn-group-option option-action-button button-group-secondary-component" data-toggle="modal" :data-target="currentRemoveSubcomponentModalTargetId"
            :class="[component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed ? 'subcomponent-display-toggle-remove' : 'subcomponent-display-toggle-add',
              {'transition-item': isSubcomponentButtonsTransitionAllowed}, OPTION_MENU_BUTTON_MARKER]"
            @mouseenter="subcomponentMouseEnterHandler"
            @mouseleave="subcomponentMouseLeaveHandler"
            @keydown.enter.prevent="$event.preventDefault()" @click="toggleSubcomponent(component.subcomponents[component.activeSubcomponentName])">
          </button>
        </transition-group>
      </div>
      <transition-group :name="isDropdownAndOptionButtonsTransitionAllowed ? 'horizontal-transition' : ''">
        <button v-if="isInSyncButtonDisplayed()"
          id="sync-transition-animation-padding"
          :style="{marginLeft: component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef ? '-23px' : '-29px'}"
          class="option-action-button button-group-secondary-component" :class="{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}">
            <font-awesome-icon style="color: #54a9f100" class="sync-icon" icon="sync-alt"/>
        </button>
        <div v-if="!component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus || component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed"
          :class="{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}" > 
          <dropdown class="option-component-button"
            :uniqueIdentifier="CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
            :dropdownOptions="componentTypeToOptions[component.type][component.subcomponents[component.activeSubcomponentName].subcomponentType]"
            :objectContainingActiveOption="component.subcomponents[component.activeSubcomponentName]"
            :activeOptionPropertyKeyName="'activeCssPseudoClass'"
            :fontAwesomeIcon="'angle-down'"
            @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
            @mouse-click-new-option="newCssPseudoClassClicked($event)"/>
          <div v-for="option in componentTypeToOptions[component.type][component.subcomponents[component.activeSubcomponentName].subcomponentType]
              [component.subcomponents[component.activeSubcomponentName].activeCssPseudoClass]" :key="option" class="option-component-button-container"
              @mouseenter="mouseHoverOption(option, true)" @mouseleave="mouseHoverOption(option, false)">
            <button
              type="button"
              :disabled="option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive"
              class="btn btn-outline-secondary option-component-button-child option-select-button-default"
              :class="[
                option.type === activeOption.type ? 'option-select-button-active' : '',
                option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive ? 'option-select-button-default-disabled' : 'option-select-button-default-enabled',
                OPTION_MENU_BUTTON_MARKER]"
                @click="selectOption(option)">
                {{option.buttonName}}
            </button>
          </div>
        </div>
        <div v-if="true" style="display: none" ref="toolbarPositionToggle"
          class="toolbar-position-toggle-container" :class="{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}">
          <button
            type="button" class="btn toolbar-position-toggle"
            @click="toolbarPositionToggleMouseClick(this)"
            @mouseenter="toolbarPositionToggleMouseEnter($event)"
            @mouseleave="toolbarPositionToggleMouseLeave($event)">
            <i class="dropdown-button-marker" :class="['fa', 'fa-sort']"></i>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER } from '../../../../../consts/elementClassMarkers';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { ComponentTypeToOptions, componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import useSubcomponentDropdownEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { ToggleSubcomponentSelectModeEvent } from '../../../../../interfaces/toggleSubcomponentSelectModeEvent';
import { removeSubcomponentModalState } from './removeSubcomponentModalState/removeSubcomponentModalState';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import SubcomponentToggleOverlayUtils from './subcomponentToggleUtils/subcomponentToggleOverlayUtils';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from './subcomponentSelectMode/subcomponentSelectModeState';
import ImportComponentToggleUtils from './importComponentToggleUtils/importComponentToggleUtils';
import { UseToolbarPositionToggle } from '../../../../../interfaces/useToolbarPositionToggle';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { DropdownCompositionAPI } from '../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import SubcomponentToggleUtils from './subcomponentToggleUtils/subcomponentToggleUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import SubcomponentSelectMode from './subcomponentSelectMode/subcomponentSelectMode';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import { FONT_AWESOME_COLORS } from '../../../../../consts/fontAwesomeColors.enum';
import useToolbarPositionToggle from './compositionApi/useToolbarPositionToggle';
import { REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import BrowserType from '../../../../../services/workshop/browserType';
import { Option } from '../../../../../interfaces/componentOptions';
import { Ref } from 'node_modules/vue/dist/vue';
import dropdown from './dropdown/Dropdown.vue';

interface Consts {
  componentTypeToOptions: ComponentTypeToOptions;
  useSubcomponentDropdownEventHandlers: (objectContainingActiveOption: Ref<unknown>, activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>) => DropdownCompositionAPI;
  OPTION_MENU_BUTTON_MARKER: string;
  FONT_AWESOME_COLORS: typeof FONT_AWESOME_COLORS;
  HIGHLIGHTED_OPTION_BUTTON_CLASS: string;
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER: string;
  EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER: string;
  MODAL_COMPONENT_TYPE: NEW_COMPONENT_TYPES;
  BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: number;
  REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: string;
  BROWSER_SPECIFIC_EXPAND_MODAL_PREVIEW_STYLE: WorkshopComponentCss;
  SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
}

interface Data {
  currentRemoveSubcomponentModalTargetId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOption: Option;
  isExpandedModalPreviewModeActive: boolean;
  isImportComponentModeActive: boolean;
  hasImportComponentModeClosedExpandedModal: boolean;
  isSubcomponentButtonsTransitionAllowed: boolean;
  isDropdownAndOptionButtonsTransitionAllowed: boolean;
  optionAnimationsInProgress: boolean;
  toolbarPositionToggleRef: HTMLElement;
}

export default {
  setup(): RemovalModalState & Consts & UseToolbarPositionToggle {
    return {
      componentTypeToOptions,
      useSubcomponentDropdownEventHandlers,
      ...removeSubcomponentModalState,
      FONT_AWESOME_COLORS,
      OPTION_MENU_BUTTON_MARKER,
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
      SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
      EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
      MODAL_COMPONENT_TYPE: NEW_COMPONENT_TYPES.MODAL,
      BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: 500,
      REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: `#${REMOVE_SUBCOMPONENT_MODAL_ID}`,
      BROWSER_SPECIFIC_EXPAND_MODAL_PREVIEW_STYLE: { paddingTop: BrowserType.isFirefox() ? '1px' : '' },
      SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.SUBCOMPONENTS,
      CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.CSS_PSEUDO_CLASSES,
      HIGHLIGHTED_OPTION_BUTTON_CLASS: BrowserType.isFirefox() ? 'highlighted-option-button-firefox' : 'highlighted-option-button-chromium',
      ...useToolbarPositionToggle(),
    };
  },
  data: (): Data => ({
    currentRemoveSubcomponentModalTargetId: '',
    isSubcomponentSelectModeButtonDisplayed: false,
    activeOption: { buttonName: null, type: null },
    isExpandedModalPreviewModeActive: false,
    isImportComponentModeActive: false,
    hasImportComponentModeClosedExpandedModal: false,
    isSubcomponentButtonsTransitionAllowed: false,
    isDropdownAndOptionButtonsTransitionAllowed: false,
    optionAnimationsInProgress: false,
    toolbarPositionToggleRef: null,
  }),
  mounted(): void {
    // this is a bug fix where the transition-group is preventing the toolbarPositionToggle from being obtained during the modal expand mode
    this.toolbarPositionToggleRef = this.$refs.toolbarPositionToggle;
  },
  methods: {
    initiateSubcomponentSelectMode(): void {
      if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) {
        subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
        return;
      }
      const buttonElement = event.currentTarget as HTMLElement;
      const subcomponentSelectModeCallbackFunction = SubcomponentSelectMode.initiate(buttonElement);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const subcomponentNameClickedFunc = this.newSubcomponentNameClicked;
      this.$emit('toggle-subcomponent-select-mode',
        [subcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, subcomponentNameClickedFunc] as ToggleSubcomponentSelectModeEvent);
    },
    mouseHoverOption(option: Option, isEntering: boolean): void {
      if (!this.isExpandedModalPreviewModeActive && option.enabledOnExpandedModalPreviewMode) {
        if (isEntering) {
          this.$refs.expandedModalPreviewModeToggle.classList.replace('option-action-button', this.HIGHLIGHTED_OPTION_BUTTON_CLASS); 
        } else {
          this.$refs.expandedModalPreviewModeToggle.classList.replace(this.HIGHLIGHTED_OPTION_BUTTON_CLASS, 'option-action-button'); 
        }
      }
    },
    selectOption(option: Option): void {
      if (this.activeOption.buttonName === option.buttonName && this.activeOption.type === option.type) {
        this.activeOption = { buttonName: null, type: null };
        this.hideSettings();
        return;
      }
      this.setNewActiveOption(option);
      this.$emit('trigger-settings-refresh', option.type);
      this.resetComponentPreviewMarginAssistance();
    },
    setNewActiveOption(newOption: Option): void {
      this.activeOption = newOption;
    },
    getActiveOption(): Option {
      return this.activeOption;
    },
    newSubcomponentNameClicked(newSubComponent: string): void {
      // reset css state of the previous subcomponent to the first one
      const oldActiveSubcomponent: SubcomponentProperties = this.component.subcomponents[this.component.activeSubcomponentName];
      oldActiveSubcomponent.activeCssPseudoClass = oldActiveSubcomponent.defaultCssPseudoClass;
      this.component.activeSubcomponentName = newSubComponent;
      if (this.component.subcomponents[this.component.activeSubcomponentName].subcomponentDisplayStatus
          && !this.component.subcomponents[this.component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed) {
        this.hideSettings();
        return;
      }
      this.setNewOptionOnNewDropdownOptionSelect();
    },
    newCssPseudoClassClicked(newCssPseudoClass: CSS_PSEUDO_CLASSES): void {
      this.component.subcomponents[this.component.activeSubcomponentName].activeCssPseudoClass = newCssPseudoClass;
      this.setNewOptionOnNewDropdownOptionSelect();
    },
    updateOptionsForNewComponent(lastActiveOptionPriorToAllComponentsDeletion: Option): void {
      if (lastActiveOptionPriorToAllComponentsDeletion) this.activeOption = lastActiveOptionPriorToAllComponentsDeletion;
      this.setNewOptionOnNewDropdownOptionSelect()
    },
    setNewOptionOnNewDropdownOptionSelect(): void {
      if (this.activeOption.buttonName) {
        const newOption = this.getNewSuitableOption();
        this.selectOption(newOption);
      }
    },
    getNewSuitableOption(): Option {
      const activeOptions = this.getActiveOptions();
      return this.getOptionFromNewSubcomponent(activeOptions) || activeOptions[0];
    },
    getOptionFromNewSubcomponent(activeOptions: Option[]): Option {
      return activeOptions.find((option: Option) => {
        return option.buttonName === this.activeOption.buttonName
          && (this.isExpandedModalPreviewModeActive || option.enabledOnExpandedModalPreviewMode === this.activeOption.enabledOnExpandedModalPreviewMode);
      });
    },
    toggleSubcomponentImport(): void {
      ImportComponentToggleUtils.toggleSubcomponentImport(this);
    },
    toggleImportedComponentInSync(callback?: () => void): void {
      this.temporarilyAllowOptionAnimations(ImportComponentToggleUtils.toggleSubcomponentInSync.bind(this, this.component, callback), true, true);
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { subcomponentDisplayStatus } = subcomponent;
      if (!subcomponentDisplayStatus.isDisplayed) {
        subcomponentDisplayStatus.isDisplayed = true;
        if (this.activeOption.buttonName) {
          const defaultOption = this.getDefaultOption();
          this.selectOption(defaultOption); 
        }
        SubcomponentToggleOverlayUtils.changeSubcomponentOverlayClass(subcomponentDisplayStatus, this.component.activeSubcomponentName, false,
          SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      } else if (!this.getIsDoNotShowModalAgainState()) {
        this.currentRemoveSubcomponentModalTargetId = this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID;
        setTimeout(() => { this.currentRemoveSubcomponentModalTargetId = ''; });
        this.$emit('prepare-remove-subcomponent-modal', this.removeSubcomponent);
      } else {
        this.removeSubcomponent();
        SubcomponentToggleOverlayUtils.changeSubcomponentOverlayClass(subcomponentDisplayStatus, this.component.activeSubcomponentName, true,
          SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
    },
    removeSubcomponent(): void {
      if (this.component.subcomponents[this.component.activeSubcomponentName].importedComponent
          && this.component.subcomponents[this.component.activeSubcomponentName].importedComponent.inSync) {
        this.temporarilyAllowOptionAnimations(SubcomponentToggleUtils.removeSubcomponent.bind(this, this.component, this.hideSettings), true, false);
      } else {
        SubcomponentToggleUtils.removeSubcomponent(this.component, this.hideSettings);
      }
    },
    subcomponentMouseEnterHandler(): void {
      SubcomponentToggleOverlayUtils.displaySubcomponentOverlay(this.component);
    },
    subcomponentMouseLeaveHandler(): void {
      if (this.currentRemoveSubcomponentModalTargetId === this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID) return;
      SubcomponentToggleOverlayUtils.hideSubcomponentOverlay(this.component);
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    },
    toggleModalExpandMode(): void {
      this.isExpandedModalPreviewModeActive = !this.isExpandedModalPreviewModeActive;
      const setOptionToDefaultCallback = !this.isExpandedModalPreviewModeActive && this.activeOption.enabledOnExpandedModalPreviewMode
        ? this.selectOption.bind(this, this.getDefaultOption()) : () => { return; };
      this.$emit('toggle-expanded-modal-preview-mode',
        [this.isExpandedModalPreviewModeActive, setOptionToDefaultCallback, this.toolbarPositionToggleRef] as ToggleExpandedModalPreviewModeEvent);
    },
    getDefaultOption(): Option {
      return this.getActiveOptions()[0];
    },
    getActiveOptions(): Option[] {
      const { subcomponents, activeSubcomponentName, type } = this.component;
      const { subcomponentType, activeCssPseudoClass } = subcomponents[activeSubcomponentName];
      return componentTypeToOptions[type][subcomponentType][activeCssPseudoClass];
    },
    hideSettings(): void {
      this.$emit('hide-settings');
      this.resetComponentPreviewMarginAssistance();
    },
    resetComponentPreviewMarginAssistance(): void {
      this.$nextTick(() => {
        this.componentPreviewAssistance.margin = this.activeOption.type === WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN
          && this.component.activeSubcomponentName === this.BASE_SUB_COMPONENT
          && this.isSettingsDisplayed
          && !this.isExpandedModalPreviewModeActive;
      });
    },
    temporarilyAllowOptionAnimations(callback: () => unknown, isSubcomponentButtonsTransitionAllowed: boolean,
        isDropdownAndOptionButtonsTransitionAllowed: boolean): void {
      if (this.optionAnimationsInProgress) return;
      this.setOptionAnimationsToInProgress();
      this.isSubcomponentButtonsTransitionAllowed = isSubcomponentButtonsTransitionAllowed;
      this.isDropdownAndOptionButtonsTransitionAllowed = isDropdownAndOptionButtonsTransitionAllowed;
      setTimeout(() => {
        callback();
        setTimeout(() => {
          this.isSubcomponentButtonsTransitionAllowed = false;
          this.isDropdownAndOptionButtonsTransitionAllowed = false;
        }, this.BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS);
      });
    },
    setOptionAnimationsToInProgress(): void {
      this.optionAnimationsInProgress = true;
      setTimeout(() => {
        this.optionAnimationsInProgress = false;
      }, this.BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS);
    },
    isInSyncButtonDisplayed(): boolean {
      const activeSubcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      return ImportComponentToggleUtils.isInSyncButtonDisplayed(activeSubcomponent);
    }
  },
  props: {
    component: Object,
    isSettingsDisplayed: Boolean,
    componentPreviewAssistance: Object,
  },
  components: {
    dropdown,
  }
};
</script>

<style lang="css" scoped>
  .options-container {
    padding: 5px;
    padding-left: 15px;
    width: 100%;
    display: grid;
    background-color: rgb(251 251 251);
    border-radius: 20px;
  }
  .options-container-inner {
    display: flex;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  #component-select-button {
    padding-left: 10px !important;
    padding-right: 9px !important;
    font-size: 13px !important;
    color: #5c5c5c;
  }
  .option-component-button-container {
    float: left;
    margin-right: 8px;
  }
  .option-component-button-child {
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .option-component-button {
    float: left;
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .expanded-modal-preview-mode-button {
    font: normal normal normal 14px/1 FontAwesome !important;
    width: 39.5px;
  }
  .expand-icon {
    height: 24px;
    width: 14px;
  }
  .bootstrap .btn-group > .btn-group-option:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .bootstrap .btn-group > .btn-group-option:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .bootstrap .btn-group > .btn-group-option:not(:first-child) {
    margin-left: -1px;
  }
  .bootstrap .btn-group-option:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .bootstrap .btn-group > .btn-group-option {
    position: relative;
    flex: 1 1 auto;
  }
  .bootstrap .btn-group-option {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background-color: transparent;
  }
  .transition-item {
    transition: all 0.5s ease;
  }
  .horizontal-transition-enter-from,
  .horizontal-transition-leave-to {
    opacity: 0;
  }
  .horizontal-transition-leave-active {
    position: absolute !important;
  }
  .import-icon {
    width: 14px;
    height: 16px;
    margin-top: -4px;
  }
  .sync-icon {
    height: 13px;
    margin-top: -4px;
  }
  #sync-transition-animation-padding {
    z-index: 0;
    background-color: inherit !important;
    border: unset !important;
  }
  .subcomponent-display-toggle-remove {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/rubbish-can-default.svg') center no-repeat;
    background-size: 17px auto;
  }
  /* remove this if the red colour is a little distracting - UX */
  .subcomponent-display-toggle-remove:active {
    background-color: #f3eded !important;
  }
  .subcomponent-display-toggle-add {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/plus-default.svg') center no-repeat;
    background-size: 14px auto;
  }
  /* remove this if the green colour is a little distracting - UX */
  .subcomponent-display-toggle-add:active {
    background-color: #e9f5e9 !important;
  }
  .option-select-button-default {
    color:#616161 !important;
  }
  .option-select-button-default-enabled {
    cursor: pointer;
  }
  .option-select-button-default-enabled:hover {
    background-color: #ebebeb !important;
    color: rgb(85, 85, 85) !important;
  }
  .option-select-button-default-enabled:active {
    background-color: #e4e4e4 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .option-select-button-default-disabled {
    cursor: default;
  }
  .option-select-button-active {
    border-color: #84bbff !important;
    background-color: rgb(245, 251, 255) !important;
    color: #4a84ab !important;
  }
  .option-select-button-active:hover {
    background-color: rgb(227, 245, 255) !important;
    color: rgb(87, 109, 156) !important;
  }
  .option-select-button-active:active {
    background-color: rgb(204, 237, 255) !important;
  }
  .toolbar-position-toggle-container {
    position: relative;
    padding-left: 22px;
  }
  .toolbar-position-toggle {
    position: absolute;
    right: 7px;
    border: unset !important;
    font-size: 15px !important;
    padding: 4px !important;
    display: inline-flex !important;
    height: 20px;
    top: 9px;
    color: #848484 !important;
  }
  .toolbar-position-toggle-hover {
    color: black !important;
  }
  .highlighted-option-button-chromium {
    transition-duration: 0s !important;
    box-shadow: #1698e5 0px 0px 3px 0px !important;
    background-color: rgb(235 249 255) !important;
    /* transition-duration: 0s !important;
    box-shadow: rgb(255 217 77) 0px 0px 4px 0px !important;
    background-color: rgb(255 255 239) !important; */
  }
  .highlighted-option-button-firefox {
    transition-duration: 0s !important;
    background-color: rgb(255, 255, 220) !important;
    border-color: rgb(235, 199, 0) !important;
  }
</style>

<style lang="css">
  .button-group-secondary-component {
    left: -1px;
    z-index: 1;
    background-color: white !important;
  }
  .option-action-button {
    border: 1px solid #aaaaaa !important;
  }
  .option-action-button:hover {
    background-color: #ebebeb !important;
  }
  .option-action-button:active {
    background-color: #e4e4e4 !important;
  }
</style>