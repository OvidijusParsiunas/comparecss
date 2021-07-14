<template>
  <div v-if="isComponentDisplayed" class="dropdown">
    <button class="btn form-control dropdown-button" :class="[uniqueIdentifier, { 'button-group-border': isButtonGroup }, TOOLBAR_GENERAL_BUTTON_CLASS]" type="button"
      @click="buttonClick"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div class="dropdown-button-text" :class="uniqueIdentifier">
        {{objectContainingActiveOption[activeOptionPropertyKeyName]}}
      </div>
      <font-awesome-icon :style="{ color: DEFAULT_FONT_AWESOME_COLOR }" class="arrow-down-icon" :icon="fontAwesomeIcon"/>
    </button>
    <div class="auxiliary-padding dropdown-menu-options-marker" :class="uniqueIdentifier"
      @click="buttonClick"
      @mouseenter="mouseEnterAuxiliaryPadding"
      @mouseleave="mouseLeaveAuxiliaryPadding">
    </div>
    <div ref="dropdownMenus"
      @mouseleave="mouseLeaveDropdown">
      <dropdown-menu v-for="(dropdownOptions, index) in dropdowns" :key="dropdownOptions"
        :dropdownOptions="dropdownOptions"
        :nestedDropdownIndex="index"
        @mouse-enter-option="mouseEnterOption"
        @mouse-leave-option="mouseLeaveOption"/>
    </div>
  </div>
</template>

<script lang="ts">
import { DropdownOptionDisplayStatus, DropdownOptionDisplayStatusRef, DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { DropdownOptionsDisplayStatusUtils } from '../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { COMPONENT_CARD_MARKER, DROPDOWN_OPTION_MARKER, RANGE_SETTING_MARKER } from '../../../../../../consts/elementClassMarkers';
import { CUSTOM_DROPDOWN_OPTION_CLASSES } from '../../../../../../consts/customDropdownOptionClasses.enum';
import { DropdownMouseClickOptionEvent } from '../../../../../../interfaces/dropdownMouseClickOptionEvent';
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { DropdownCompositionAPI } from '../../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { TOOLBAR_GENERAL_BUTTON_CLASS } from '../../../../../../consts/toolbarClasses';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import BrowserType from '../../../utils/generic/browserType';
import dropdownMenu from './DropdownMenu.vue';
import { Ref, ref, watch } from 'vue';

interface Data {
  isComponentDisplayed: boolean;
  dropdowns: NestedDropdownStructure[];
  lastHoveredOptionElement: HTMLElement;
  enterButtonClicked: boolean;
  areMenusDisplayed: boolean;
  clickedButton: boolean;
  dropdownDisplayDelayMilliseconds: number;
  areDropdownOptionsProcessed: boolean;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  processedOptions: NestedDropdownStructure[];
  DEFAULT_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS;
}

interface Props {
  isNested: boolean;
  isButtonGroup: boolean,
  uniqueIdentifier: string;
  highlightSubcomponents: boolean;
  fontAwesomeIcon: string;
  minOptionsToDisplayDropdown: number;
  activeOptionPropertyKeyName: string;
  objectContainingActiveOption: unknown;
  dropdownOptions: NestedDropdownStructure;
  customEventHandlers: (param1: Ref<unknown>, param2: Ref<string>, param3: Ref<boolean>) => DropdownCompositionAPI;
}

interface SearchForOptionResultData {
  dropdowns: NestedDropdownStructure[];
  optionIndexes: number[];
}

type SearchForOptionResult = SearchForOptionResultData | null;

export default {
  data: (): Data => ({
    dropdowns: [],
    clickedButton: false,
    processedOptions: [],
    areMenusDisplayed: false,
    enterButtonClicked: false,
    isComponentDisplayed: true,
    TOOLBAR_GENERAL_BUTTON_CLASS,
    lastHoveredOptionElement: null,
    areDropdownOptionsProcessed: false,
    DEFAULT_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS.DEFAULT,
    dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
  }),
  setup(props: Props): DropdownCompositionAPI {
    // If you want to pass down a data variable into compositionAPI, use the code below and pass areMenusDisplayed into the customEventHandlers function and return customEventHandlers
    // const areMenusDisplayed: Ref<boolean> = ref(false);
    const objectContainingActiveOptionRef: Ref<Props['objectContainingActiveOption']> = ref(props.objectContainingActiveOption);
    const activeModePropertyKeyNameRef: Ref<Props['activeOptionPropertyKeyName']> = ref(props.activeOptionPropertyKeyName);
    const highlightSubcomponentsRef: Ref<Props['highlightSubcomponents']> = ref(props.highlightSubcomponents);
    let customEventHandlers = {} as DropdownCompositionAPI;
    if (props.customEventHandlers) {
      watch(() => props.objectContainingActiveOption, (newObjectContainingActiveOption) => {
      objectContainingActiveOptionRef.value = newObjectContainingActiveOption;
      });
      watch(() => props.activeOptionPropertyKeyName, (newActiveModePropertyKeyName) => {
        activeModePropertyKeyNameRef.value = newActiveModePropertyKeyName;
      });
      watch(() => props.highlightSubcomponents, (newHighlightSubcomponents) => {
        highlightSubcomponentsRef.value = newHighlightSubcomponents;
      });
      customEventHandlers = props.customEventHandlers(objectContainingActiveOptionRef, activeModePropertyKeyNameRef, highlightSubcomponentsRef);
    }
    return {
      ...customEventHandlers,
    };
  },
  mounted(): void {
    if (!this.areDropdownOptionsProcessed) this.processDropdownOptions();
    this.isDropdownDisplayed();
  },
  methods: {
    buttonClick(): void {
      if (this.timeoutFunc) { 
        this.timeoutFunc(this.openDropdown.bind(this));
      } else {
        this.openDropdown();
      }
    },
    openDropdown(): void {
      if (this.enterButtonClicked || this.clickedButton) {
        this.enterButtonClicked = false;
        this.clickedButton = false;
        return;
      }
      this.displayHighlightedOptionAndParentMenus();
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const workshopEventCallback: WorkshopEventCallback = {keyTriggers, func: this.hideDropdownMenu};
      this.$emit('hide-dropdown-menu-callback', workshopEventCallback);
      this.areMenusDisplayed = true;
    },
    displayHighlightedOptionAndParentMenus(): void {
      const results: SearchForOptionResult = this.searchForOpion(this.processedOptions, this.objectContainingActiveOption[this.activeOptionPropertyKeyName], 0);
      if (results) {
        const { dropdowns, optionIndexes } = results;
        for (let i = 0; i < dropdowns.length; i++) {
          const dropdown = dropdowns[i];
          const parentDropdownIndex = i - 1;
          const parentOptionIndex = optionIndexes[i - 1];
          setTimeout(() => {
            let parentOptionElement = this.$refs.dropdownMenus.childNodes[parentDropdownIndex + 1].childNodes[parentOptionIndex + 1];
            if (!parentOptionElement) {
              this.displayParentMenu();
            } else {
              this.displayChildDropdownMenu(parentOptionElement, parentDropdownIndex, parentOptionIndex, dropdown);
            }
          }, i * this.dropdownDisplayDelayMilliseconds);
        }
        setTimeout(() => {
          const optionElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[dropdowns.length]?.childNodes[optionIndexes[optionIndexes.length - 1] + 1];
          this.highlightNewOption(optionElementToBeHighlighted, dropdowns.length - 1);
        }, (dropdowns.length - 1) * this.dropdownDisplayDelayMilliseconds);
      }
    },
    searchForOpion(dropdownOptions: NestedDropdownStructure, subjectOptionName: string, dropdownOptionsIndex: number): SearchForOptionResult {
      if (!dropdownOptions) return null;
      if (dropdownOptions[subjectOptionName] !== undefined) {
        return { dropdowns: [dropdownOptions], optionIndexes: [Object.keys(dropdownOptions).indexOf(subjectOptionName)] };
      } else {
        const optionNames = Object.keys(dropdownOptions);
        const childDropdownIndex = dropdownOptionsIndex + 1;
        for (let i = 0; i <= optionNames.length; i += 1) {
          const optionName = optionNames[i];
          if (optionName !== subjectOptionName) {
            const result: SearchForOptionResult = this.searchForOpion(dropdownOptions[optionName], subjectOptionName, childDropdownIndex);
            if (result) {
              result.dropdowns.unshift(dropdownOptions);
              result.optionIndexes.unshift(i);
              return result;
            }
          }
        }
      }
      return null;
    },
    mouseEnterButton(): void {
      if (this.mouseEnterButtonEventHandler) { this.mouseEnterButtonEventHandler(); }
      this.$emit('mouse-enter-button');
    },
    mouseLeaveButton(): void {
      if (this.mouseLeaveButtonEventHandler) { this.mouseLeaveButtonEventHandler(); }
      this.$emit('mouse-leave-button');
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        this.removeChildDropdownMenus(0);
        const optionElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (!optionElementToBeHighlighted) return;
        this.displayChildDropdownMenu(optionElementToBeHighlighted, 0, 0, this.processedOptions[Object.keys(this.processedOptions)[0]]);
        if (this.mouseEnterAuxiliaryPaddingEventHandler) { this.mouseEnterAuxiliaryPaddingEventHandler(optionElementToBeHighlighted); }
        this.highlightNewOption(optionElementToBeHighlighted, 0);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        const blurredOptionElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (this.mouseLeaveAuxiliaryPaddingEventHandler) this.mouseLeaveAuxiliaryPaddingEventHandler(blurredOptionElement);
      }
    },
    mouseLeaveDropdown(): void {
      this.$emit('mouse-leave-dropdown');
    },
    mouseEnterOption(optionMouseEnterEvent: OptionMouseEnter): void {
      const [dropdownOptions, dropdownMenuIndex, dropdownOptionIndex] = optionMouseEnterEvent;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(event.target, dropdownMenuIndex, dropdownOptionIndex, dropdownOptions);
      if (this.mouseEnterOptionEventHandler) { this.mouseEnterOptionEventHandler(event.target); }
      this.$emit('mouse-enter-option', ((event.target as HTMLElement).childNodes[0] as HTMLElement).innerHTML);
      this.highlightNewOption(event.target, dropdownMenuIndex);
    },
    removeChildDropdownMenus(dropdownMenuIndex: number): void {
      const removableDropdownMenusIndex = dropdownMenuIndex + 1;
      if (this.dropdowns.length > removableDropdownMenusIndex) {
        this.dropdowns.splice(removableDropdownMenusIndex, this.dropdowns.length);
      }
    },
    displayParentMenu(): void {
      this.dropdowns.push(this.processedOptions);
      setTimeout(() => {
        this.$refs.dropdownMenus.childNodes[1].style.display = 'block';
      });
    },
    displayChildDropdownMenu(parentOptionElement: HTMLElement, parentDropdownMenuIndex: number, parentDropdownOptionIndex: number,
        childDropdownOptions: NestedDropdownStructure | DropdownOptionDisplayStatusRef): void {
      if (!parentOptionElement) return;
      if (!childDropdownOptions[DROPDOWN_OPTION_DISPLAY_STATUS_REF]
          || (Object.keys(childDropdownOptions).length > 1 && (childDropdownOptions[DROPDOWN_OPTION_DISPLAY_STATUS_REF] as DropdownOptionDisplayStatus).isEnabled)) {
        this.dropdowns.push(childDropdownOptions);
        const startOfLeftPropertyValueNumber = 11;
        const dropdownMenuElement = parentOptionElement.parentNode as HTMLElement;
        const topStyleValueRaw = dropdownMenuElement.style.top;
        const leftStyleValueRaw = dropdownMenuElement.style.left;
        const topStyleValueParsed = Number.parseInt(topStyleValueRaw.substring(startOfLeftPropertyValueNumber, topStyleValueRaw.length)) || 0;
        const leftStyleValueParsed = Number.parseInt(leftStyleValueRaw) || 0;
        const currentDropdownMenuWidth = dropdownMenuElement.offsetWidth;
        const optionHeight = Number.parseFloat(window.getComputedStyle(parentOptionElement).height);
        setTimeout(() => {
          const newChildDropdownMenuElemIndex = parentDropdownMenuIndex + 2;
          // if the user moves the mouse into an option that has children and quickly moves it back to its parent dropdown, the new child dropdown that was triggered to display
          // here no longer exists
          if (!this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex]?.style) return;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.top = `calc(100% + ${(parentDropdownOptionIndex * optionHeight) + topStyleValueParsed}px)`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.left = `${currentDropdownMenuWidth + leftStyleValueParsed}px`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.display = 'block';
        });
      }
    },
    highlightNewOption(optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number): void {
      if (!optionElementToBeHighlighted) return;
      if (this.lastHoveredOptionElement) { this.resetLastHighlightedOptionStyle(); }
      this.setNewHighligtedOptionStyle(this.dropdowns, optionElementToBeHighlighted, dropdownMenuIndex);
      this.lastHoveredOptionElement = optionElementToBeHighlighted;
    },
    resetLastHighlightedOptionStyle(): void {
      this.lastHoveredOptionElement.classList.remove(CUSTOM_DROPDOWN_OPTION_CLASSES.ACTIVE);
      if (this.lastHoveredOptionElement.classList.contains(CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE)) {
        this.lastHoveredOptionElement.style.color = 'grey';
        this.lastHoveredOptionElement.classList.remove(CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE);
      } else {
        this.lastHoveredOptionElement.style.color = 'black';
      }
      // bug fix for resetting option colour when user clicks and drags an option
      if (!document.activeElement.classList.contains(this.uniqueIdentifier)) this.lastHoveredOptionElement.classList.add(CUSTOM_DROPDOWN_OPTION_CLASSES.DEFAULT);
      this.changeOptionArrowColor(this.lastHoveredOptionElement, '#6d6d6d');
    },
    setNewHighligtedOptionStyle(dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number): void {
      if (!optionElementToBeHighlighted) return;
      const highlightedElementBackgroundClass = dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex]
        && this.isOptionInactive(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex)
        ? CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE : CUSTOM_DROPDOWN_OPTION_CLASSES.ACTIVE;
      optionElementToBeHighlighted.classList.add(highlightedElementBackgroundClass);
      optionElementToBeHighlighted.style.color = 'white';
      this.changeOptionArrowColor(optionElementToBeHighlighted, 'white');
    },
    isOptionInactive(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): boolean {
      return dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML][DROPDOWN_OPTION_DISPLAY_STATUS_REF]
        && !(dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML][DROPDOWN_OPTION_DISPLAY_STATUS_REF] as DropdownOptionDisplayStatus).isEnabled;
    },
    changeOptionArrowColor(optionElement: Element, newColor: 'white'|'#6d6d6d'): void {
      const arrowElement = optionElement.childNodes[1];
      if (arrowElement instanceof Element || arrowElement instanceof HTMLDocument) {
        (arrowElement as HTMLElement).style.color = newColor;
      }
    },
    getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
      return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
    },
    mouseLeaveOption(blurredOptionElement: OptionMouseLeave): void {
      if (this.mouseLeaveOptionEventHandler) this.mouseLeaveOptionEventHandler(blurredOptionElement);
    },
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event.type === 'mousedown' && this.isIgnoreOnMouseDown((event.target as HTMLElement).classList)) {
        return { shouldRepeat: true };
      }
      let closedViaKey = false;
      if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.enterButtonClicked = true;
        }
        closedViaKey = true;
      }
      if ((event.target as HTMLElement).classList.contains(DROPDOWN_OPTION_MARKER) || this.enterButtonClicked) {
        if (this.lastHoveredOptionElement) {
          const optionName = this.lastHoveredOptionElement.childNodes[0].innerHTML;
          const previousActiveOptionName = this.objectContainingActiveOption[this.activeOptionPropertyKeyName];
          if (previousActiveOptionName !== optionName) {
            this.$emit('mouse-click-new-option', optionName);
          }
          this.$emit('mouse-click-option', [previousActiveOptionName, optionName] as DropdownMouseClickOptionEvent);
        }
      }
      const isDropdownButtonClicked = (event.target as HTMLElement).classList.contains(this.uniqueIdentifier);
      if (isDropdownButtonClicked && !closedViaKey) {
        this.clickedButton = true;
      }
      if ((!isDropdownButtonClicked || closedViaKey) && this.lastHoveredOptionElement) {
        if (this.hideDropdownMenuEventHandler) {
          this.hideDropdownMenuEventHandler(this.lastHoveredOptionElement);
        } else {
          this.$emit('hide-dropdown-menu');
        }
      }
      this.dropdowns = [];
      this.areMenusDisplayed = false;
      return { shouldRepeat: false };
    },
    isIgnoreOnMouseDown(targetElementClassList: DOMTokenList): boolean {
      return !targetElementClassList.contains(COMPONENT_CARD_MARKER) && !targetElementClassList.contains(RANGE_SETTING_MARKER);
    },
    hideFirstMenu(): void {
      this.$refs.dropdownMenus.childNodes[1].style.display = 'none';
    },
    processDropdownOptions(): void {
      if (this.dropdownOptions) {
        if (!this.isNested) {
          this.changeDropdownOptionsToAppropriateStructure();
        } else {
          this.processedOptions = this.dropdownOptions;
        }
        this.areDropdownOptionsProcessed = true;
      }
    },
    changeDropdownOptionsToAppropriateStructure(): void {
      const resultObject = {};
      Object.keys(this.dropdownOptions).forEach((keyName) => {
        resultObject[keyName] = DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject();
      });
      this.processedOptions = resultObject;
    },
    isDropdownDisplayed(): void {
      if (this.isNested) {
        this.isComponentDisplayed = !!this.dropdownOptions;
      } else {
        this.isComponentDisplayed = Object.keys(this.dropdownOptions).length > this.minOptionsToDisplayDropdown;
      }
      this.$emit('is-component-displayed', this.isComponentDisplayed);
    }
  },
  components: {
    dropdownMenu,
  },
  // THIS COMPONENT OFFERS A TWO-WAY API, MOUSE EVENTS CAN BE EITHER PASSED IN
  // OR LISTENED TO VIA EVENT EMITTERS
  props: {
    dropdownOptions: Object,
    objectContainingActiveOption: Object,
    activeOptionPropertyKeyName: String,
    fontAwesomeIcon: String,
    highlightSubcomponents: Boolean,
    // this is used to allow the dropdown to close when clicked on other dropdowns
    uniqueIdentifier: String,
    // the dev has two options, either insert custom event handlers object via composition API (which should adhere to DropdownCompositionAPI)
    // or listen to the emitted events
    customEventHandlers: Function,
    isButtonGroup: {
      type: Boolean,
      default: false,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
    timeoutFunc: Function,
    minOptionsToDisplayDropdown: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    objectContainingActiveOption(): void {
      this.processDropdownOptions();
    },
    dropdownOptions(): void {
      this.isDropdownDisplayed();
    }
  }
};
</script>

<style lang="css" scoped>
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.5rem;
    border: 1px solid  #aaaaaa !important;
    background-color: white !important;
  }
  .dropdown-button-text {
    float: left;
    padding-left: 2px;
  }
  .arrow-down-icon {
    float: right;
    margin-top: 0.3em;
    padding-left: 7px;
    width: 16.5px;
  }
  .auxiliary-padding {
    top: 36px;
    height: 5px;
    width: 100%;
    z-index: 9990;
    position: absolute;
    cursor: pointer;
  }
  .button-group-border {
    border-radius: 0px 0.25rem 0.25rem 0px !important;
  }
</style>
