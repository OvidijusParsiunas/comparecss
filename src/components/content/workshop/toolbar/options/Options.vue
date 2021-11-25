<template>
  <div class="options-container" :class="{'options-container-full-preview-mode': isFullPreviewModeActive}">
    <div class="options-container-inner">
      <div v-if="!isFullPreviewModeActive" class="btn-group option-component-button-container">
        <button v-if="isSubcomponentSelectModeButtonDisplayed"
          id="subcomponent-select-button" type="button" class="btn"
          :class="[TOOLBAR_GENERAL_BUTTON_CLASS, SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
          @click="buttonClickMiddleware(initiateSubcomponentSelectMode.bind(this, $event.currentTarget))">
            <i class="fa fa-mouse-pointer" :class="[SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"></i>
        </button>
        <dropdown
          :class="TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS"
          :additionalButtonClasses="getSubcomponentDropdownButtonBorderClasses()"
          :uniqueIdentifier="SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
          :dropdownItems="component.componentPreviewStructure.subcomponentDropdownStructure"
          :objectContainingActiveItem="component"
          :activeItemPropertyKeyName="'activeSubcomponentName'"
          :itemNameMap="component.componentPreviewStructure.subcomponentNameToDropdownItemName"
          :fontAwesomeIcon="'angle-double-down'"
          :highlightSubcomponents="true"
          :isNested="true"
          :customEventHandlers="useSubcomponentDropdownEventHandlers"
          :timeoutFunc="executeCallbackAfterTimeout"
          :firstMenuWidthSameAsButton="true"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @mouse-click-item="selectSubcomponent()"
          @mouse-click-new-item="selectNewSubcomponent($event[0])"
          @is-component-displayed="toggleSubcomponentSelectModeButtonDisplay($event)"/>
        <dropdown
          ref="addChildComponentDropdown"
          :class="TOOLBAR_BUTTON_GROUP_TERTIARY_COMPONENT_CLASS"
          :additionalButtonClasses="[TOOLBAR_BUTTON_GROUP_END_COMPONENT_CLASS]"
          :uniqueIdentifier="ADD_CHILD_COMPONENT_DROPDOWN_UNIQUE_IDENTIFIER"
          :dropdownItems="getChildComponentsThatCanBeAddAndRefresh()"
          :consistentButtonContent="{'backgroundIconClass': 'add-child-component-button-icon'}"
          :timeoutFunc="executeCallbackAfterTimeout"
          :minItemsToDisplayDropdown="1"
          :displayArrowOnMouseEnter="true"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @hide-dropdown-menu="mouseLeaveSubcomponentManipulationToggle(true)"
          @mouse-click-new-item="buttonClickMiddleware(addChildComponent.bind(this, $event), true)"
          @mouse-enter-item="mouseEnterSubcomponentManipulationToggle(true, $event)"
          @mouse-leave-item="mouseLeaveSubcomponentManipulationToggle(true, true)"/>
      </div>
      <transition-group name="horizontal-transition">
        <div class="btn-group component-manipulation-options-group"
          :class="{'transition-item': areOptionButtonTransitionsAllowed}"
          v-if="!isFullPreviewModeActive">
          <transition-group name="horizontal-transition">
            <button ref="syncChildComponentToggle"
              v-if="isSyncButtonDisplayed()"
              type="button" class="btn-group-option sync-child-component-button" :class="[
              {'transition-item': areOptionButtonTransitionsAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, OPTION_MENU_BUTTON_MARKER]"
              @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleSyncChildComponentMode, true)"
              @mouseenter="mouseHoverSyncChildComponentToggle(true)"
              @mouseleave="mouseHoverSyncChildComponentToggle(false)">
              <!-- placed inside the button element to not have the transition -->
              <div :class="isSyncChildComponentModeActive ? 'sync-child-component-icon-active' : 'sync-child-component-icon-default'"></div> 
            </button>
            <button v-if="isInSyncButtonDisplayed()"
              type="button" class="btn-group-option"
              :class="[{'transition-item': areOptionButtonTransitionsAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS, OPTION_MENU_BUTTON_MARKER]"
              @keydown.enter.prevent="$event.preventDefault()" @click="buttonClickMiddleware(toggleInSyncToOff)">
                <font-awesome-icon :style="{ color: FONT_AWESOME_COLORS.ACTIVE }" class="sync-icon" icon="sync-alt"/>
            </button>
            <button v-if="isRemoveChildComponentButtonDisplayed()"
              type="button" style="margin-right: 8px" class="btn-group-option" data-toggle="modal" :data-target="currentRemoveChildComponentModalTargetId"
              :class="['remove-child-component-button-icon',
                {'transition-item': areOptionButtonTransitionsAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS, REMOVE_CHILD_COMPONENT_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
              @mouseenter="mouseEnterSubcomponentManipulationToggle(false)"
              @mouseleave="mouseLeaveSubcomponentManipulationToggle(false)"
              @keydown.enter.prevent="$event.preventDefault()"
              @click="buttonClickMiddleware(beginToRemoveChildComponent, !getIsDoNotShowModalAgainState())">
            </button>
          </transition-group>
        </div>
        <div v-if="true"
          class="btn-group option-component-button-container"
          :class="{'transition-item': areOptionButtonTransitionsAllowed}">
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
          <button v-if="isFullPreviewModeButtonDisplayed() && (component.type === COMPONENT_TYPES.MODAL || component.type === COMPONENT_TYPES.ALERT || component.type === COMPONENT_TYPES.CARD)"
            ref="fullPreviewModeToggle"
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
        <button v-if="!isFullPreviewModeActive && isInSyncButtonDisplayed()"
          id="sync-transition-animation-padding"
          :class="[{'transition-item': areOptionButtonTransitionsAllowed}, TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS]">
            <font-awesome-icon style="color: #54a9f100" class="sync-icon" icon="sync-alt"/>
        </button>
        <div v-if="true" v-show="!isFullPreviewModeActive"
          :class="{'transition-item': areOptionButtonTransitionsAllowed}" > 
          <dropdown
            class="option-component-button-container"
            :uniqueIdentifier="CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
            :dropdownItems="componentTypeToOptions[component.type](component.subcomponents[component.activeSubcomponentName].subcomponentType, component)"
            :objectContainingActiveItem="component.subcomponents[component.activeSubcomponentName]"
            :activeItemPropertyKeyName="'activeCssPseudoClassesDropdownItem'"
            :fontAwesomeIcon="'angle-down'"
            :timeoutFunc="executeCallbackAfterTimeout"
            @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
            @mouse-click-new-item="selectNewCssPseudoClass($event)"/>
          <div v-for="option in getOptionsForActiveCssPseudoClassesDropdownItem()" :key="option" class="option-component-button-container"
              @mouseenter="mouseHoverOption(option, true)" @mouseleave="mouseHoverOption(option, false)">
            <button
              type="button"
              :disabled="isOptionDisabled(option)"
              class="btn option-select-button-default"
              :class="[
                option.type === activeOption.type ? 'option-select-button-active' : '',
                isOptionDisabled(option) ? 'option-select-button-default-disabled' : 'option-select-button-default-enabled',
                TOOLBAR_GENERAL_BUTTON_CLASS, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER]"
              @click="buttonClickMiddleware(selectOption.bind(this, option, true))">
                {{option.buttonName}}
            </button>
          </div>
        </div>
        <div v-if="!isFullPreviewModeActive" style="display: none" ref="toolbarPositionToggle"
          class="toolbar-position-toggle-container" :class="{'transition-item': areOptionButtonTransitionsAllowed}">
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
import { ChildComponentCountLimitStateUtils } from '../../utils/componentManipulation/childComponentCountLimitsState/childComponentCountLimitsStateUtils';
import { removeChildComponentModalState } from '../../utils/componentManipulation/removeChildComponent/removeChildComponentModalState';
import { MASTER_SUBCOMPONENT_BASE_NAME, TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../consts/baseSubcomponentNames.enum';
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ComponentDOMElementUtils } from '../../utils/componentManipulation/componentDOMElementUtils/componentDOMElementUtils';
import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../componentPreview/utils/animations/consts/sharedConsts';
import { SyncableComponentCardOverlaysToDisplay } from '../../../../../interfaces/syncableComponentCardOverlaysToDisplay';
import { RemoveChildComponentOverlay } from '../../componentPreview/utils/elements/overlays/removeChildComponentOverlay';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { ComponentTypeToOptions, componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../consts/workshopToolbarOptionButtonNames.enum';
import useSubcomponentDropdownEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { MouseClickNewItemEvent, MouseEnterItemEvent } from '../../../../../interfaces/dropdownMenuMouseEvents';
import { ToggleSubcomponentSelectModeEvent } from '../../../../../interfaces/toggleSubcomponentSelectModeEvent';
import SyncChildComponentModeToggleUtils from './syncChildComponent/modeUtils/syncChildComponentModeToggle';
import { SetActiveComponentUtils } from '../../utils/componentManipulation/utils/setActiveComponentUtils';
import { fulPreviewModeState } from '../../componentPreview/utils/fullPreviewMode/fullPreviewModeState';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { EnabledIfChildComponentPresent, Option } from '../../../../../interfaces/componentOptions';
import { subcomponentSelectModeState } from './subcomponentSelectMode/subcomponentSelectModeState';
import { ToggleFullPreviewModeEvent } from '../../../../../interfaces/toggleFullPreviewModeEvent';
import { Subcomponent, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { UseToolbarPositionToggle } from '../../../../../interfaces/useToolbarPositionToggle';
import { RemoveChildComponentEvent } from '../../../../../interfaces/settingsComponentEvents';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { AddChildComponentEvent } from '../../../../../interfaces/addChildComponentEvent';
import { DropdownCompositionAPI } from '../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { SyncChildComponentUtils } from './syncChildComponent/syncChildComponentUtils';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import SubcomponentSelectMode from './subcomponentSelectMode/subcomponentSelectMode';
import { FONT_AWESOME_COLORS } from '../../../../../consts/fontAwesomeColors.enum';
import { REMOVE_CHILD_COMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import useToolbarPositionToggle from './compositionApi/useToolbarPositionToggle';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { SyncedComponent } from './syncChildComponent/syncedComponent';
import BrowserType from '../../utils/generic/browserType';
import SharedUtils from '../settings/utils/sharedUtils';
import { Ref } from 'node_modules/vue/dist/vue';
import dropdown from './dropdown/Dropdown.vue';
import {
  OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, REMOVE_CHILD_COMPONENT_BUTTON_MARKER,
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER,
} from '../../../../../consts/elementClassMarkers';
import {
  TOOLBAR_GENERAL_BUTTON_CLASS, TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS, TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS,
  TOOLBAR_BUTTON_GROUP_TERTIARY_COMPONENT_CLASS, TOOLBAR_BUTTON_GROUP_MIDDLE_COMPONENT_CLASS, TOOLBAR_BUTTON_GROUP_END_COMPONENT_CLASS,
 } from '../../../../../consts/toolbarClasses';

interface Consts {
  componentTypeToOptions: ComponentTypeToOptions;
  useSubcomponentDropdownEventHandlers: (objectContainingActiveItem: Ref<unknown>, activeItemPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>) => DropdownCompositionAPI;
  OPTION_MENU_BUTTON_MARKER: string;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  FULL_PREVIEW_MODE_BUTTON_MARKER: string;
  REMOVE_CHILD_COMPONENT_BUTTON_MARKER: string;
  OPTION_MENU_SETTING_OPTION_BUTTON_MARKER: string;
  FONT_AWESOME_COLORS: typeof FONT_AWESOME_COLORS;
  HIGHLIGHTED_OPTION_BUTTON_CLASS: string;
  HIGHLIGHTED_OPTION_BUTTON_TEXT_COLOR_CLASS: string;
  TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS: string;
  TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS: string;
  TOOLBAR_BUTTON_GROUP_TERTIARY_COMPONENT_CLASS: string;
  TOOLBAR_BUTTON_GROUP_MIDDLE_COMPONENT_CLASS: string;
  TOOLBAR_BUTTON_GROUP_END_COMPONENT_CLASS: string;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER: string;
  EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER: string;
  COMPONENT_TYPES: typeof COMPONENT_TYPES;
  BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: number;
  REMOVE_CHILD_COMPONENT_MODAL_TARGET_ID: string;
  BROWSER_SPECIFIC_MODAL_BUTTON_STYLE: WorkshopComponentCss;
  SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  ADD_CHILD_COMPONENT_DROPDOWN_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  SUBCOMPONENT_TYPES: typeof SUBCOMPONENT_TYPES;
}

interface Data {
  currentRemoveChildComponentModalTargetId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOption: Option;
  isExpandedModalPreviewModeActive: boolean;
  isFullPreviewModeActive: boolean;
  isSyncChildComponentModeActive: boolean;
  hasSyncChildComponentModeClosedExpandedModal: boolean;
  areOptionButtonTransitionsAllowed: boolean;
  optionAnimationsInProgress: boolean;
  toolbarPositionToggleRef: HTMLElement;
}

export default {
  setup(): RemovalModalState & Consts & UseToolbarPositionToggle {
    return {
      componentTypeToOptions,
      useSubcomponentDropdownEventHandlers,
      ...removeChildComponentModalState,
      FONT_AWESOME_COLORS,
      COMPONENT_TYPES,
      SUBCOMPONENT_TYPES,
      OPTION_MENU_BUTTON_MARKER,
      TOOLBAR_GENERAL_BUTTON_CLASS,
      FULL_PREVIEW_MODE_BUTTON_MARKER,
      REMOVE_CHILD_COMPONENT_BUTTON_MARKER,
      OPTION_MENU_SETTING_OPTION_BUTTON_MARKER,
      SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
      EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
      BUTTON_HORIZONTAL_TRANSITION_DURATION_MILLISECONDS: 500,
      TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS,
      TOOLBAR_BUTTON_GROUP_SECONDARY_COMPONENT_CLASS,
      TOOLBAR_BUTTON_GROUP_TERTIARY_COMPONENT_CLASS,
      TOOLBAR_BUTTON_GROUP_MIDDLE_COMPONENT_CLASS,
      TOOLBAR_BUTTON_GROUP_END_COMPONENT_CLASS,
      REMOVE_CHILD_COMPONENT_MODAL_TARGET_ID: `#${REMOVE_CHILD_COMPONENT_MODAL_ID}`,
      BROWSER_SPECIFIC_MODAL_BUTTON_STYLE: { paddingTop: BrowserType.isFirefox() ? '1px' : '' },
      SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.SUBCOMPONENTS,
      ADD_CHILD_COMPONENT_DROPDOWN_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.ADD_CHILD_COMPONENT,
      CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.CSS_PSEUDO_CLASSES,
      HIGHLIGHTED_OPTION_BUTTON_CLASS: BrowserType.isFirefox() ? 'highlighted-option-button-firefox' : 'highlighted-option-button-chromium',
      HIGHLIGHTED_OPTION_BUTTON_TEXT_COLOR_CLASS: 'highlighted-option-button-text-color',
      ...useToolbarPositionToggle(),
    };
  },
  data: (): Data => ({
    currentRemoveChildComponentModalTargetId: '',
    isSubcomponentSelectModeButtonDisplayed: false,
    activeOption: { buttonName: null, type: null, enabledOnExpandedModalPreviewMode: null, enabledIfCustomFeaturePresentWithKeys: null },
    isExpandedModalPreviewModeActive: false,
    isFullPreviewModeActive: false,
    isSyncChildComponentModeActive: false,
    hasSyncChildComponentModeClosedExpandedModal: false,
    areOptionButtonTransitionsAllowed: false,
    optionAnimationsInProgress: false,
    toolbarPositionToggleRef: null,
  }),
  mounted(): void {
    // this is a bug fix where the transition-group is preventing the toolbarPositionToggle from being obtained during the modal expand mode
    this.reassignToolbarPositionToggleRef();
  },
  methods: {
    // mostly used to allow the transitions to work correctly
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
      }, this.hasSyncChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    },
    initiateSubcomponentSelectMode(buttonElement: HTMLElement): void {
      if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) {
        subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
        return;
      }
      const subcomponentSelectModeCallbackFunction = SubcomponentSelectMode.initiate(buttonElement, this.component.type);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const subcomponentNameClickedFunc = this.selectNewSubcomponent;
      this.$emit('toggle-subcomponent-select-mode',
        [subcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, subcomponentNameClickedFunc] as ToggleSubcomponentSelectModeEvent);
    },
    getOptionsForActiveCssPseudoClassesDropdownItem(): Option[] {
      const subcomponent: Subcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      return componentTypeToOptions[this.component.type](subcomponent.subcomponentType, this.component)
        [subcomponent.activeCssPseudoClassesDropdownItem];
    },
    findOptionButtonElementViaName(optionName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES): HTMLElement {
      const buttonElements = document.getElementsByClassName(this.OPTION_MENU_SETTING_OPTION_BUTTON_MARKER);
      return Array.from(buttonElements).find((buttonElement: HTMLElement) => buttonElement.innerText === optionName) as HTMLElement;
    },
    isChildComponentPresentOptionDisabled(enabledIfChildComponentPresent: EnabledIfChildComponentPresent): boolean {
      const { type, style } = enabledIfChildComponentPresent;
      const resultSubcomponent = Object.keys(this.component.subcomponents).find((subcomponentName) => {
        const subcomponent = this.component.subcomponents[subcomponentName];
        if (subcomponent.subcomponentType === type) {
          return style ? subcomponent.seedComponent.style === style : true;
        }
        return false;
      });
      return !resultSubcomponent;
    },
    isExpandedModeOptionDisabled(option: Option): boolean {
      return option.enabledOnExpandedModalPreviewMode && !this.isExpandedModalPreviewModeActive;
    },
    getActiveSubcomponentCustomFeatureValue(customFeatureObjectKeys: string[]): unknown {
      const activeSubcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      return SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, activeSubcomponent[customFeatureObjectKeys[0]]);
    },
    isOptionDisabled(option: Option): boolean {
      if (option.enabledIfCustomFeaturePresentWithKeys) {
        return !this.getActiveSubcomponentCustomFeatureValue(option.enabledIfCustomFeaturePresentWithKeys);
      }
      if (option.enabledIfChildComponentPresent) {
        return this.isChildComponentPresentOptionDisabled(option.enabledIfChildComponentPresent);
      }
      return this.isExpandedModeOptionDisabled(option);
    },
    mouseHoverOption(option: Option, isEntering: boolean): void {
      if (this.isExpandedModeOptionDisabled(option)) {
        this.changeElementHighlight(this.$refs.expandedModalPreviewModeToggle, isEntering);
      } else if (option.buttonName === WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ACTIONS) {
        if (isEntering) {
          this.$refs.fullPreviewModeToggle.classList.add(this.TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS);
        } else {
          setTimeout(() => {
            this.$refs.fullPreviewModeToggle.classList.remove(this.TOOLBAR_BUTTON_GROUP_PRIMARY_COMPONENT_CLASS);
          }, 50); // the z-index appears to disappear too quickly
        }
        this.changeElementHighlight(this.$refs.fullPreviewModeToggle, isEntering);
      } else if (option.buttonName === WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ANIMATIONS) {
        if (option.enabledIfCustomFeaturePresentWithKeys && !this.getActiveSubcomponentCustomFeatureValue(option.enabledIfCustomFeaturePresentWithKeys)) {
          const backgroundOptionButtonElement = this.findOptionButtonElementViaName(WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKGROUND);
          this.changeElementHighlight(backgroundOptionButtonElement, isEntering);
        }
      }
    },
    changeElementHighlight(element: HTMLElement, isEntering: boolean): void {
      if (isEntering) {
        element.classList.replace(this.TOOLBAR_GENERAL_BUTTON_CLASS, this.HIGHLIGHTED_OPTION_BUTTON_CLASS);
        if (element.classList.contains(this.OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)) element.classList.add(this.HIGHLIGHTED_OPTION_BUTTON_TEXT_COLOR_CLASS);
      } else {
        element.classList.replace(this.HIGHLIGHTED_OPTION_BUTTON_CLASS, this.TOOLBAR_GENERAL_BUTTON_CLASS); 
        if (element.classList.contains(this.OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)) element.classList.remove(this.HIGHLIGHTED_OPTION_BUTTON_TEXT_COLOR_CLASS);
      }
    },
    selectOption(option: Option, isManualSelect: boolean): void {
      if (isManualSelect && this.activeOption.buttonName === option.buttonName && this.activeOption.type === option.type) {
        this.activeOption = { buttonName: null, type: null, enabledOnExpandedModalPreviewMode: null, enabledIfCustomFeaturePresentWithKeys: null };
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
    selectNewSubcomponent(subcomponentName: string): void {
      // reset css state of the previous subcomponent to the first one
      const oldActiveSubcomponent: Subcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      oldActiveSubcomponent.activeCssPseudoClassesDropdownItem = oldActiveSubcomponent.defaultCssPseudoClassesDropdownItem;
      SetActiveComponentUtils.setActiveSubcomponent(this.component, subcomponentName);
      this.setNewOptionOnNewDropdownItemSelect();
    },
    selectSubcomponent(): void {
      // the reason why this is called on any dropdown option click is because the user can close the dropdown menu (component) and select the same option again
      // this always needs to be called after selectNewSubcomponent in order to use the correct activeSubcomponentName property
      ComponentDOMElementUtils.displaySubcomponentElementIfHidden(this.component.subcomponents[this.component.activeSubcomponentName].name);
    },
    selectNewCssPseudoClass(mouseClickNewItemEvent: MouseClickNewItemEvent): void {
      const [newCssPseudoClass] = mouseClickNewItemEvent;
      this.component.subcomponents[this.component.activeSubcomponentName].activeCssPseudoClassesDropdownItem = newCssPseudoClass;
      this.setNewOptionOnNewDropdownItemSelect();
    },
    updateOptionsForNewComponent(lastActiveOptionPriorToAllComponentsDeletion: Option): void {
      if (lastActiveOptionPriorToAllComponentsDeletion) this.activeOption = lastActiveOptionPriorToAllComponentsDeletion;
      this.setNewOptionOnNewDropdownItemSelect()
    },
    setNewOptionOnNewDropdownItemSelect(): void {
      if (this.activeOption.buttonName) {
        const newOption = this.getNewSuitableOption();
        this.selectOption(newOption);
      }
    },
    getNewSuitableOption(): Option {
      const activeOptions = this.getActiveOptions();
      return this.getOptionFromNewSubcomponent(activeOptions) || activeOptions[0];
    },
    validateCustomFeatureKeysOptions(newOption: Option): boolean {
      const { enabledIfCustomFeaturePresentWithKeys } = newOption;
      return !enabledIfCustomFeaturePresentWithKeys
        || this.getActiveSubcomponentCustomFeatureValue(enabledIfCustomFeaturePresentWithKeys);
    },
    validateExpandedModalOptions(newOption: Option): boolean {
       return !newOption.enabledOnExpandedModalPreviewMode || this.isExpandedModalPreviewModeActive;
    },
    getOptionFromNewSubcomponent(activeOptions: Option[]): Option {
      const newOption = activeOptions.find((option: Option) => option.buttonName === this.activeOption.buttonName);
      if (newOption && this.validateExpandedModalOptions(newOption) && this.validateCustomFeatureKeysOptions(newOption)) {
        return newOption;
      }
      return null;
    },
    isSyncButtonDisplayed(): boolean {
      return SyncChildComponentUtils.isSyncOptionButtonDisplayed(this.component);
    },
    mouseHoverSyncChildComponentToggle(isMouseEnter: boolean): void {
      const activeComponent: WorkshopComponent = this.component.subcomponents[this.component.activeSubcomponentName].seedComponent;
      const syncableComponentCardOverlaysToDisplay: SyncableComponentCardOverlaysToDisplay = { isDisplaying: isMouseEnter, activeComponent };
      this.$emit('display-syncable-component-card-overlays', syncableComponentCardOverlaysToDisplay);
    },
    toggleSyncChildComponentMode(): void {
      SyncChildComponentModeToggleUtils.toggleSyncChildComponentMode(this);
    },
    toggleInSyncToOff(callback?: () => void): void {
      this.temporarilyAllowOptionAnimations(SyncedComponent.toggleChildComponentSyncToOff.bind(this, this.component, callback));
    },
    isRemoveChildComponentButtonDisplayed(): boolean {
      const activeSubcomponent: Subcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      return activeSubcomponent.isRemovable && ChildComponentCountLimitStateUtils.isCurrentCountHigherThanMin(activeSubcomponent.seedComponent);
    },
    beginToRemoveChildComponent(): void {
      if (!this.getIsDoNotShowModalAgainState()) {
        this.currentRemoveChildComponentModalTargetId = this.REMOVE_CHILD_COMPONENT_MODAL_TARGET_ID;
        setTimeout(() => { this.currentRemoveChildComponentModalTargetId = ''; });
        this.$emit('prepare-remove-child-component-modal', this.removeChildComponent);
      } else {
        this.removeChildComponent();
        setTimeout(() => {
          if (this.isRemoveChildComponentButtonDisplayed()) RemoveChildComponentOverlay.display(this.component.activeSubcomponentName)});
      }
    },
    removeChildComponent(): void {
      if (this.component.subcomponents[this.component.activeSubcomponentName].seedComponent?.sync.inSync) {
        this.temporarilyAllowOptionAnimations(this.emitRemoveChildComponentEvent);
      } else {
        this.emitRemoveChildComponentEvent();
      }
    },
    emitRemoveChildComponentEvent(): void {
      this.$emit('remove-child-component', [true] as RemoveChildComponentEvent);
    },
    getChildComponentsThatCanBeAdded(): NestedDropdownStructure {
      return (this.component.subcomponents[this.component.activeSubcomponentName] as Subcomponent)
        .seedComponent.newChildComponents.addRemoveFunctionality?.dropdownItems || {};
    },
    getChildComponentsThatCanBeAddAndRefresh(): NestedDropdownStructure {
      // used to refresh dropdown items on a dynamic change of dropdown items obj contents - e.g. an item inside the obj can have isEnabled set to false
      // and its item should become grey, however Dropdown component cannot detect this change and instead it needs to be refreshed manually
      setTimeout(this.$refs.addChildComponentDropdown?.refreshDropdownItemsWhenChangedDynamically);
      return this.getChildComponentsThatCanBeAdded();
    },
    addChildComponent(mouseClickNewItemEvent: MouseClickNewItemEvent): void {
      const [newComponentBaseName, isOptionEnabled] = mouseClickNewItemEvent;
      if (!isOptionEnabled) return;
      this.$emit('remove-child-component', [false, true] as RemoveChildComponentEvent);
      this.$emit('add-child-component', [newComponentBaseName] as AddChildComponentEvent);
    },
    mouseEnterSubcomponentManipulationToggle(isAdd: boolean, mouseEnterItemEvent?: MouseEnterItemEvent): void {
      if (isAdd) {
        const [newComponentBaseName, isOptionEnabled] = mouseEnterItemEvent;
        if (!isOptionEnabled) return;
        this.$emit('add-child-component', [newComponentBaseName, true] as AddChildComponentEvent);
      } else {
        RemoveChildComponentOverlay.display(this.component.activeSubcomponentName);
      }
    },
    mouseLeaveSubcomponentManipulationToggle(isAdd: boolean, shouldSubcomponentNamesBeUpdated: boolean): void {
      if (isAdd) {
        this.$emit('remove-child-component', [shouldSubcomponentNamesBeUpdated, true] as RemoveChildComponentEvent);
      } else {
        if (this.currentRemoveChildComponentModalTargetId === this.REMOVE_CHILD_COMPONENT_MODAL_TARGET_ID) return;
        RemoveChildComponentOverlay.hide(this.component.activeSubcomponentName);
      }
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    },
    getSubcomponentDropdownButtonBorderClasses(): string[] {
      const isAddChildComponentDropdownDisplayed = Object.keys(this.getChildComponentsThatCanBeAdded()).length > 0;
      return [isAddChildComponentDropdownDisplayed ? TOOLBAR_BUTTON_GROUP_MIDDLE_COMPONENT_CLASS : TOOLBAR_BUTTON_GROUP_END_COMPONENT_CLASS];
    },
    toggleModalExpandMode(): void {
      this.isExpandedModalPreviewModeActive = !this.isExpandedModalPreviewModeActive;
      const setOptionToDefaultCallback = this.isOptionDisabled(this.activeOption) ? this.selectDefaultOption.bind(this) : () => { return; };
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
        if (this.activeOption.buttonName) {
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
      const { subcomponentType, activeCssPseudoClassesDropdownItem } = subcomponents[activeSubcomponentName];
      return componentTypeToOptions[type](subcomponentType, this.component)[activeCssPseudoClassesDropdownItem];
    },
    hideSettings(): void {
      this.$emit('hide-settings');
      this.resetComponentPreviewMarginAssistance();
    },
    resetComponentPreviewMarginAssistance(): void {
      this.$nextTick(() => {
        this.componentPreviewAssistance.margin = this.activeOption.type === WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN
          && this.component.activeSubcomponentName === MASTER_SUBCOMPONENT_BASE_NAME.BASE
          && this.isSettingsDisplayed
          && !this.isExpandedModalPreviewModeActive;
      });
    },
    temporarilyAllowOptionAnimations(callback: () => unknown): void {
      if (this.optionAnimationsInProgress) return;
      this.setOptionAnimationsToInProgress();
      this.areOptionButtonTransitionsAllowed = true;
      setTimeout(() => {
        callback();
        setTimeout(() => {
          this.areOptionButtonTransitionsAllowed = false;
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
        const component: WorkshopComponent = this.component.subcomponents[subcomponentName].seedComponent;
        return component?.style === subcomponentStyle
          && component.baseSubcomponent.name !== TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY;
      });
    },
    isFullPreviewModeButtonDisplayed(): boolean {
      return this.component.type === COMPONENT_TYPES.MODAL
        || (this.isSubcomponentPresent(BUTTON_STYLES.CLOSE)
          && (this.component.type === COMPONENT_TYPES.ALERT || this.component.type === COMPONENT_TYPES.CARD));
    },
    isInSyncButtonDisplayed(): boolean {
      const activeSubcomponent: Subcomponent = this.component.subcomponents[this.component.activeSubcomponentName];
      SyncedComponent.updateIfComponentSyncedToIsRemoved(activeSubcomponent.seedComponent);
      return SyncedComponent.isInSyncButtonDisplayed(activeSubcomponent);
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
  #subcomponent-select-button {
    padding-left: 10px !important;
    padding-right: 9px !important;
    font-size: 13px !important;
    color: #5c5c5c;
  }
  .component-manipulation-options-group {
    float: left;
    margin: 0px;
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
  .sync-child-component-button {
    height: 38px;
  }
  .sync-child-component-icon-default {
    width: 1em;
    height: 100%;
    background: url('../../../../../assets/svg/copy.svg') center no-repeat;
    background-size: 15px auto;
    pointer-events: none;
  }
  .sync-child-component-icon-active {
    width: 1em;
    height: 100%;
    background: url('../../../../../assets/svg/copy-active.svg') center no-repeat;
    background-size: 15px auto;
    pointer-events: none;
  }
  .sync-icon {
    height: 13px;
    margin-top: -4px;
  }
  #sync-transition-animation-padding {
    z-index: 0;
    background-color: inherit !important;
    border: unset !important;
    margin-left: -29px;
  }
  .remove-child-component-button-icon {
    width: 42px;
    height: 38px;
    background: url('../../../../../assets/svg/rubbish-can-default.svg') center no-repeat;
    background-size: 17px auto;
    left: -1px;
  }
  /* remove this if the red colour is a little distracting - UX */
  .remove-child-component-button-icon:active {
    background-color: #f3eded !important;
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
  .highlighted-option-button-text-color {
    color: rgb(102, 102, 102) !important;
  }
</style>
<style lang="css">
  .add-child-component-button-icon {
    width: 1em;
    height: 35px;
    background: url('../../../../../assets/svg/plus.svg') center no-repeat;
    background-size: 13.5px auto;
  }
  /* remove this if the green colour is a little distracting - UX */
  .add-child-component-button-icon:active {
    background-color: #e9f5e9 !important;
  }
</style>
