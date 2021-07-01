<template>
  <div class="options-container" :class="{'options-container-full-preview-mode': isFullPreviewModeActive}">
    <div class="options-container-inner">
      <div v-if="!isFullPreviewModeActive" class="btn-group option-component-button-container">
        <button v-if="isSubcomponentSelectModeButtonDisplayed"
          id="component-select-button" type="button" class="btn"
          :class="[TOOLBAR_GENERAL_BUTTON_CLASS, SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @click="buttonClickMiddleware(initiateSubcomponentSelectMode.bind(this, $event.currentTarget))">
            <i class="fa fa-mouse-pointer" :class="[SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"></i>
        </button>
        <dropdown
          :class="TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS"
          :uniqueIdentifier="SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
          :dropdownOptions="component.componentPreviewStructure.subcomponentDropdownStructure"
          :objectContainingActiveOption="component"
          :activeOptionPropertyKeyName="'activeSubcomponentName'"
          :fontAwesomeIcon="'angle-double-down'"
          :highlightSubcomponents="true"
          :isButtonGroup="true"
          :isNested="true"
          :customEventHandlers="useSubcomponentDropdownEventHandlers"
          :timeoutFunc="executeCallbackAfterTimeout"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @mouse-click-new-option="newSubcomponentNameClicked($event)"
          @is-component-displayed="toggleSubcomponentSelectModeButtonDisplay($event)"/>
      </div>
      <div v-if="component.type === COMPONENT_TYPES.MODAL || component.type === COMPONENT_TYPES.ALERT || component.type === COMPONENT_TYPES.CARD"
        class="btn-group option-component-button-container">
        <button v-if="!isFullPreviewModeActive && component.type === COMPONENT_TYPES.MODAL" ref="expandedModalPreviewModeToggle"
          type="button" class="btn btn-group-option expanded-modal-preview-mode-button"
          :class="[TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS, TOOLBAR_GENERAL_BUTTON_CLASS, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleModalExpandMode)">
          <font-awesome-icon v-if="isExpandedModalPreviewModeActive"
            :style="{ color: FONT_AWESOME_COLORS.DEFAULT, ...BROWSER_SPECIFIC_MODAL_BUTTON_STYLE }"
            class="modal-button-icon expand-icon" icon="compress"/>
          <font-awesome-icon v-else
            :style="{ color: FONT_AWESOME_COLORS.DEFAULT, ...BROWSER_SPECIFIC_MODAL_BUTTON_STYLE }"
            class="modal-button-icon expand-icon" icon="expand"/>
        </button>
        <button v-if="isFullPreviewModeButtonDisplayed()" ref="fullPreviewModeToggle"
          type="button" class="btn btn-group-option expanded-modal-preview-mode-button"
          :class="[TOOLBAR_GENERAL_BUTTON_CLASS, FULL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleFullPreviewMode)">
          <font-awesome-icon v-if="isFullPreviewModeActive"
            :style="{ ...BROWSER_SPECIFIC_MODAL_BUTTON_STYLE }"
            class="modal-button-icon full-preview-icon" icon="stop"/>
          <font-awesome-icon v-else
            :style="{ ...BROWSER_SPECIFIC_MODAL_BUTTON_STYLE }"
            class="modal-button-icon full-preview-icon" icon="play"/>
        </button>
      </div>
      <div
        :style="{marginRight: component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef ? '0px' : '8px'}"
        class="btn-group option-component-button-container"
        v-if="!isFullPreviewModeActive && 
          (component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus || component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef)">
        <transition-group name="horizontal-transition">
          <button ref="importComponentToggle"
            v-if="component.subcomponents[component.activeSubcomponentName].nestedComponent && component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus"
            type="button" class="btn-group-option" :class="[{'transition-item': isSubcomponentButtonsTransitionAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, OPTION_MENU_BUTTON_MARKER]"
            @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleSubcomponentImport, true)">
              <font-awesome-icon
                :style="{ color: isImportComponentModeActive ? FONT_AWESOME_COLORS.ACTIVE : FONT_AWESOME_COLORS.DEFAULT }"
                class="import-icon" icon="long-arrow-alt-down"/>
          </button>
          <button v-if="isInSyncButtonDisplayed()"
            type="button" class="btn-group-option"
            :class="[{'transition-item': isSubcomponentButtonsTransitionAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS, OPTION_MENU_BUTTON_MARKER]"
            @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleInSync)">
              <font-awesome-icon :style="{ color: FONT_AWESOME_COLORS.ACTIVE }" class="sync-icon" icon="sync-alt"/>
          </button>
          <button v-if="component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus"
            type="button" class="btn-group-option" data-toggle="modal" :data-target="currentRemoveSubcomponentModalTargetId"
            :class="[component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed ? 'subcomponent-display-toggle-remove' : 'subcomponent-display-toggle-add',
              {'transition-item': isSubcomponentButtonsTransitionAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS, TOGGLE_SUBCOMPONENT_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
            @mouseenter="mouseEnterSubcomponentToggle"
            @mouseleave="mouseLeaveSubcomponentToggle"
            @keydown.enter.prevent="$event.preventDefault()"
            @click="buttonClickMiddleware(toggleSubcomponent.bind(this, component.subcomponents[component.activeSubcomponentName]), 
              component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed && !getIsDoNotShowModalAgainState())">
          </button>
        </transition-group>
      </div>
      <button
        type="button"
        class="btn"
        :class="['subcomponent-display-toggle-add', TOOLBAR_GENERAL_BUTTON_CLASS, OPTION_MENU_BUTTON_MARKER]"
        @click="buttonClickMiddleware(addNewSubcomponent, true)">
      </button>
      <transition-group :name="isDropdownAndOptionButtonsTransitionAllowed || isExpandedModalPreviewModeActive ? 'horizontal-transition' : ''">
        <button v-if="!isFullPreviewModeActive && isInSyncButtonDisplayed()"
          id="sync-transition-animation-padding"
          :style="{marginLeft: component.subcomponents[component.activeSubcomponentName].baseSubcomponentRef ? '-23px' : '-29px'}"
          :class="[{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS]">
            <font-awesome-icon style="color: #54a9f100" class="sync-icon" icon="sync-alt"/>
        </button>
        <div v-if="true" v-show="!isFullPreviewModeActive
            && (!component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus
              || component.subcomponents[component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed)"
          :class="{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}" > 
          <dropdown
            class="option-component-button-container"
            :uniqueIdentifier="CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
            :dropdownOptions="componentTypeToOptions[component.type](component.subcomponents[component.activeSubcomponentName].subcomponentType, component)"
            :objectContainingActiveOption="component.subcomponents[component.activeSubcomponentName]"
            :activeOptionPropertyKeyName="'activeCssPseudoClass'"
            :fontAwesomeIcon="'angle-down'"
            :timeoutFunc="executeCallbackAfterTimeout"
            @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
            @mouse-click-new-option="newCssPseudoClassClicked($event)"/>
          <div v-for="option in getOptionsForActiveCssPseudoClass()" :key="option" class="option-component-button-container"
              @mouseenter="mouseHoverOption(option, true)" @mouseleave="mouseHoverOption(option, false)">
            <button
              type="button"
              :disabled="option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive"
              class="btn option-select-button-default"
              :class="[
                option.type === activeOption.type ? 'option-select-button-active' : '',
                option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive ? 'option-select-button-default-disabled' : 'option-select-button-default-enabled',
                TOOLBAR_GENERAL_BUTTON_CLASS, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
              @click="buttonClickMiddleware(selectOption.bind(this, option, true))">
                {{option.buttonName}}
            </button>
          </div>
        </div>
        <div v-if="!isFullPreviewModeActive" style="display: none" ref="toolbarPositionToggle"
          class="toolbar-position-toggle-container" :class="{'transition-item': isDropdownAndOptionButtonsTransitionAllowed}">
          <button
            type="button" class="btn toolbar-position-toggle"
            @click="buttonClickMiddleware(toolbarPositionToggleMouseClick.bind(this))"
            @mouseenter="toolbarPositionToggleMouseEnter($event)"
            @mouseleave="toolbarPositionToggleMouseLeave($event)">
            <i :class="['fa', 'fa-sort']"></i>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS } from '../../../../../consts/toolbarClasses';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ImportComponentModeTempPropertiesUtils } from './importComponent/modeUtils/importComponentModeTempPropertiesUtils';
import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { ComponentTypeToOptions, componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import useSubcomponentDropdownEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { ToggleSubcomponentSelectModeEvent } from '../../../../../interfaces/toggleSubcomponentSelectModeEvent';
import { removeSubcomponentModalState } from './removeSubcomponentModalState/removeSubcomponentModalState';
import { fulPreviewModeState } from '../../componentPreview/utils/fullPreviewMode/fullPreviewModeState';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import SubcomponentToggleOverlayUtils from './subcomponentToggleUtils/subcomponentToggleOverlayUtils';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from './subcomponentSelectMode/subcomponentSelectModeState';
import ImportComponentModeToggleUtils from './importComponent/modeUtils/importComponentModeToggle';
import { ToggleFullPreviewModeEvent } from '../../../../../interfaces/toggleFullPreviewModeEvent';
import { UseToolbarPositionToggle } from '../../../../../interfaces/useToolbarPositionToggle';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../consts/componentStyles.enum';
import { PARENT_SUBCOMPONENT_NAME } from '../../../../../consts/baseSubcomponentNames.enum';
import { DropdownCompositionAPI } from '../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import SubcomponentToggleUtils from './subcomponentToggleUtils/subcomponentToggleUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import SubcomponentSelectMode from './subcomponentSelectMode/subcomponentSelectMode';
import { FONT_AWESOME_COLORS } from '../../../../../consts/fontAwesomeColors.enum';
import useToolbarPositionToggle from './compositionApi/useToolbarPositionToggle';
import { REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import BrowserType from '../../../../../services/workshop/browserType';
import { Option } from '../../../../../interfaces/componentOptions';
import { InSync } from './importComponent/inSync';
import { Ref } from 'node_modules/vue/dist/vue';
import dropdown from './dropdown/Dropdown.vue';
import {
  OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, TOGGLE_SUBCOMPONENT_BUTTON_MARKER,
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER,
} from '../../../../../consts/elementClassMarkers';

interface Consts {
  componentTypeToOptions: ComponentTypeToOptions;
  useSubcomponentDropdownEventHandlers: (objectContainingActiveOption: Ref<unknown>, activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>) => DropdownCompositionAPI;
  OPTION_MENU_BUTTON_MARKER: string;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  FULL_PREVIEW_MODE_BUTTON_MARKER: string;
  TOGGLE_SUBCOMPONENT_BUTTON_MARKER: string;
  OPTION_MENU_SETTING_OPTION_BUTTON_MARKER: string;
  FONT_AWESOME_COLORS: typeof FONT_AWESOME_COLORS;
  HIGHLIGHTED_OPTION_BUTTON_CLASS: string;
  TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS: string;
  TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS: string;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER: string;
  EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER: string;
  COMPONENT_TYPES: typeof COMPONENT_TYPES;
  BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: number;
  REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: string;
  BROWSER_SPECIFIC_MODAL_BUTTON_STYLE: WorkshopComponentCss;
  SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
}

interface Data {
  currentRemoveSubcomponentModalTargetId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOption: Option;
  isExpandedModalPreviewModeActive: boolean;
  isFullPreviewModeActive: boolean;
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
      COMPONENT_TYPES,
      OPTION_MENU_BUTTON_MARKER,
      TOOLBAR_GENERAL_BUTTON_CLASS,
      FULL_PREVIEW_MODE_BUTTON_MARKER,
      TOGGLE_SUBCOMPONENT_BUTTON_MARKER,
      OPTION_MENU_SETTING_OPTION_BUTTON_MARKER,
      SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
      EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
      BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: 500,
      TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS,
      TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS,
      REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: `#${REMOVE_SUBCOMPONENT_MODAL_ID}`,
      BROWSER_SPECIFIC_MODAL_BUTTON_STYLE: { paddingTop: BrowserType.isFirefox() ? '1px' : '' },
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
    isFullPreviewModeActive: false,
    isImportComponentModeActive: false,
    hasImportComponentModeClosedExpandedModal: false,
    isSubcomponentButtonsTransitionAllowed: false,
    isDropdownAndOptionButtonsTransitionAllowed: false,
    optionAnimationsInProgress: false,
    toolbarPositionToggleRef: null,
  }),
  mounted(): void {
    // this is a bug fix where the transition-group is preventing the toolbarPositionToggle from being obtained during the modal expand mode
    this.reassignToolbarPositionToggleRef();
  },
  methods: {
    buttonClickMiddleware(callback: () => void, activateImmediately: boolean): void {
      if (activateImmediately) {
         callback();
      } else {
        this.executeCallbackAfterTimeout(callback);
      }
    },
    executeCallbackAfterTimeout(callback: () => void): void {
      setTimeout(() => {
        callback();
      }, this.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    },
    initiateSubcomponentSelectMode(buttonElement: HTMLElement): void {
      if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) {
        subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
        return;
      }
      const subcomponentSelectModeCallbackFunction = SubcomponentSelectMode.initiate(buttonElement);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const subcomponentNameClickedFunc = this.newSubcomponentNameClicked;
      this.$emit('toggle-subcomponent-select-mode',
        [subcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, subcomponentNameClickedFunc] as ToggleSubcomponentSelectModeEvent);
    },
    getOptionsForActiveCssPseudoClass(): Option[] {
      const subcomponentProperties: SubcomponentProperties = this.component.subcomponents[this.component.activeSubcomponentName];
      if (subcomponentProperties.subcomponentDisplayStatus && !subcomponentProperties.subcomponentDisplayStatus.isDisplayed) {
        return [];
      }
      return componentTypeToOptions[this.component.type](subcomponentProperties.subcomponentType, this.component)
        [subcomponentProperties.activeCssPseudoClass];
    },
    mouseHoverOption(option: Option, isEntering: boolean): void {
      if (!this.isExpandedModalPreviewModeActive && option.enabledOnExpandedModalPreviewMode) {
        this.changeElementHighlight(this.$refs.expandedModalPreviewModeToggle, isEntering);
      } else if (option.buttonName === 'Actions') {
        if (isEntering) {
          this.$refs.fullPreviewModeToggle.classList.add(this.TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS);
        } else {
          setTimeout(() => {
            this.$refs.fullPreviewModeToggle.classList.remove(this.TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS);
          }, 50); // the z-index appears to disappear too quickly
        }
        this.changeElementHighlight(this.$refs.fullPreviewModeToggle, isEntering);
      }
    },
    changeElementHighlight(element: HTMLElement, isEntering: boolean): void {
      if (isEntering) {
        element.classList.replace(this.TOOLBAR_GENERAL_BUTTON_CLASS, this.HIGHLIGHTED_OPTION_BUTTON_CLASS);
      } else {
        element.classList.replace(this.HIGHLIGHTED_OPTION_BUTTON_CLASS, this.TOOLBAR_GENERAL_BUTTON_CLASS); 
      }
    },
    selectOption(option: Option, isManualSelect: boolean): void {
      if (isManualSelect && this.activeOption.buttonName === option.buttonName && this.activeOption.type === option.type) {
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
      ImportComponentModeToggleUtils.toggleSubcomponentImport(this);
    },
    toggleInSync(callback?: () => void): void {
      this.temporarilyAllowOptionAnimations(InSync.toggleSubcomponentInSync.bind(this, this.component, callback), true, true);
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { subcomponentDisplayStatus } = subcomponent;
      if (!subcomponentDisplayStatus.isDisplayed) {
        subcomponentDisplayStatus.isDisplayed = true;
        if (this.activeOption.buttonName) {
          this.selectDefaultOption();
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
    addNewSubcomponent(): void {
      this.$emit('add-new-subcomponent');
    },
    removeSubcomponent(): void {
      if (this.component.subcomponents[this.component.activeSubcomponentName].nestedComponent?.inSync) {
        this.temporarilyAllowOptionAnimations(SubcomponentToggleUtils.removeSubcomponent.bind(this, this.component, this.hideSettings), true, false);
      } else {
        SubcomponentToggleUtils.removeSubcomponent(this.component, this.hideSettings);
      }
    },
    mouseEnterSubcomponentToggle(): void {
      if (this.isRemovedComponentCurrentlySelectedForImport()) {
        ImportComponentModeTempPropertiesUtils.switchTempPropertiesWithTheLastSelectedSubcomponent(this.component);
      }
      SubcomponentToggleOverlayUtils.displaySubcomponentOverlay(this.component);
    },
    mouseLeaveSubcomponentToggle(): void {
      if (this.currentRemoveSubcomponentModalTargetId === this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID) return;
      if (this.isRemovedComponentCurrentlySelectedForImport()) {
        // overlay is set to 'display: none' by default in the base component style="display: none"
        ImportComponentModeTempPropertiesUtils.switchTempPropertiesWithTheLastSelectedSubcomponent(this.component);
      } else {
        SubcomponentToggleOverlayUtils.hideSubcomponentOverlay(this.component);
      }
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    },
    toggleModalExpandMode(): void {
      this.isExpandedModalPreviewModeActive = !this.isExpandedModalPreviewModeActive;
      const setOptionToDefaultCallback = !this.isExpandedModalPreviewModeActive && this.activeOption.enabledOnExpandedModalPreviewMode
        ? this.selectDefaultOption.bind(this) : () => { return; };
      this.$emit('toggle-expanded-modal-preview-mode',
        [this.isExpandedModalPreviewModeActive, setOptionToDefaultCallback, this.toolbarPositionToggleRef] as ToggleExpandedModalPreviewModeEvent);
    },
    toggleFullPreviewMode(): void {
      if (this.isFullPreviewModeActive) {
        this.isExpandedModalPreviewModeActive = fulPreviewModeState.getIsExpandedModalPreviewModeActivated();
      }
      const toggleFullPreviewModeOptionsCallback = this.toggleFullPreviewModeCallback;
      this.$emit('toggle-full-preview-mode',
        [!this.isFullPreviewModeActive, this.isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback] as ToggleFullPreviewModeEvent);
    },
    toggleFullPreviewModeCallback(): void {
      this.isFullPreviewModeActive = !this.isFullPreviewModeActive;
      if (this.isFullPreviewModeActive) {
        this.hideSettings();
      } else {
        if (this.activeOption.buttonName &&
          (!this.component.subcomponents[this.component.activeSubcomponentName].subcomponentDisplayStatus
            || this.component.subcomponents[this.component.activeSubcomponentName].subcomponentDisplayStatus.isDisplayed)) {
            this.selectDefaultOption();
        }
        setTimeout(() => {
          // this is a bug fix where upon toggling the full modal preview mode - the toolbarPositionToggle reference is changed
          this.reassignToolbarPositionToggleRef();
          this.toolbarPositionToggleRef.style.display = this.isExpandedModalPreviewModeActive ? 'block' : 'none';
        });
        fulPreviewModeState.resetState();
      }
    },
    selectDefaultOption(): void {
      const defaultOption = this.getDefaultOption();
      this.selectOption(defaultOption);
    },
    getDefaultOption(): Option {
      return this.getActiveOptions()[0];
    },
    getActiveOptions(): Option[] {
      const { subcomponents, activeSubcomponentName, type } = this.component;
      const { subcomponentType, activeCssPseudoClass } = subcomponents[activeSubcomponentName];
      return componentTypeToOptions[type](subcomponentType, this.component)[activeCssPseudoClass];
    },
    hideSettings(): void {
      this.$emit('hide-settings');
      this.resetComponentPreviewMarginAssistance();
    },
    resetComponentPreviewMarginAssistance(): void {
      this.$nextTick(() => {
        this.componentPreviewAssistance.margin = this.activeOption.type === WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN
          && this.component.activeSubcomponentName === PARENT_SUBCOMPONENT_NAME.BASE
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
    isSubcomponentPresent(subcomponentStyle: COMPONENT_STYLES): boolean {
      return !!Object.keys(this.component.subcomponents).find((subcomponentName) => {
        return this.component.subcomponents[subcomponentName].nestedComponent?.ref.style === subcomponentStyle;
      });
    },
    isFullPreviewModeButtonDisplayed(): boolean {
      return this.component.type === COMPONENT_TYPES.MODAL
        || (this.isSubcomponentPresent(BUTTON_STYLES.CLOSE)
          && (this.component.type === COMPONENT_TYPES.ALERT || this.component.type === COMPONENT_TYPES.CARD));
    },
    isInSyncButtonDisplayed(): boolean {
      const activeSubcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      InSync.updateIfSubcomponentNotInSync(this.component, activeSubcomponent);
      return InSync.isInSyncButtonDisplayed(activeSubcomponent);
    },
    isRemovedComponentCurrentlySelectedForImport(): void {
      const { subcomponentDisplayStatus, nestedComponent } = this.component.subcomponents[this.component.activeSubcomponentName];
      return this.isImportComponentModeActive && !subcomponentDisplayStatus.isDisplayed
        && nestedComponent.ref.componentPreviewStructure.baseSubcomponentProperties.tempOriginalCustomProperties;
    },
    reassignToolbarPositionToggleRef(): void {
      this.toolbarPositionToggleRef = this.$refs.toolbarPositionToggle;
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
  .options-container-full-preview-mode {
    width: fit-content;
    right: 0px;
    margin-right: 0px;
    float: right
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
  .expanded-modal-preview-mode-button {
    font: normal normal normal 14px/1 FontAwesome !important;
    width: 39.5px;
  }
  .modal-button-icon {
    height: 24px;
  }
  .expand-icon {
    width: 14px;
  }
  .full-preview-icon {
    width: 10px;
    color: rgb(92 93 92);
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
