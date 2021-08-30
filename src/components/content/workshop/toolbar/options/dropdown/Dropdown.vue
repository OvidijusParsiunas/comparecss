<template>
  <div v-if="isComponentDisplayed" class="dropdown">
    <button ref="button"
      type="button"
      class="btn form-control dropdown-button"
      :class="getButtonClasses()"
      @click="buttonClick"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div v-if="!consistentButtonContent || !consistentButtonContent.backgroundIconClass" class="dropdown-button-text" :class="uniqueIdentifier">
        {{buttonText}}
      </div>
      <font-awesome-icon :style="getFontAwesomeIconStyle()"
        class="arrow-down-icon"
        :class="getFontAwesomeIconClasses()"
        :icon="getFontAwesomeIcon()"/>
    </button>
    <div :style="getAuxiliaryPaddingStyle()"
      class="auxiliary-padding dropdown-menu-options-marker"
      :class="uniqueIdentifier"
      @click="buttonClick"
      @mouseenter="mouseEnterAuxiliaryPadding"
      @mouseleave="mouseLeaveAuxiliaryPadding">
    </div>
    <div ref="dropdownMenus"
      @mouseleave="mouseLeaveDropdown">
      <dropdown-menu v-for="(dropdownOptions, index) in dropdowns" :key="dropdownOptions"
        :dropdownOptions="dropdownOptions"
        :nestedDropdownIndex="index"
        :isButtonIcon="!!(consistentButtonContent && consistentButtonContent.backgroundIconClass)"
        @mouse-enter-option="mouseEnterOption"
        @mouse-leave-option="mouseLeaveOption"/>
    </div>
  </div>
</template>

<script lang="ts">
import { MouseClickNewOptionEvent, MouseClickOptionEvent, MouseEnterMenuContainerOptionEvent, MouseEnterOptionEvent, MouseLeaveMenuContainerOptionEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { DropdownOptionAuxDetails, DropdownOptionAuxDetailsRef, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { DropdownOptionsDisplayStatusUtils } from '../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { COMPONENT_CARD_MARKER, DROPDOWN_OPTION_MARKER, RANGE_SETTING_MARKER } from '../../../../../../consts/elementClassMarkers';
import { CUSTOM_DROPDOWN_OPTION_CLASSES } from '../../../../../../consts/customDropdownOptionClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { DropdownCompositionAPI } from '../../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { TOOLBAR_GENERAL_BUTTON_CLASS } from '../../../../../../consts/toolbarClasses';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import BrowserType from '../../../utils/generic/browserType';
import dropdownMenu from './DropdownMenu.vue';
import { Ref, ref, watch } from 'vue';

interface Data {
  isComponentDisplayed: boolean;
  lastHoveredOptionText: string;
  dropdowns: NestedDropdownStructure[];
  lastHoveredOptionElement: HTMLElement;
  enterButtonClicked: boolean;
  areMenusDisplayed: boolean;
  clickedButton: boolean;
  dropdownDisplayDelayMilliseconds: number;
  areDropdownOptionsProcessed: boolean;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  fontAwesomeIconColor: string;
  processedOptions: NestedDropdownStructure[];
}

interface Props {
  isNested: boolean;
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
    lastHoveredOptionText: null,
    TOOLBAR_GENERAL_BUTTON_CLASS,
    lastHoveredOptionElement: null,
    areDropdownOptionsProcessed: false,
    dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
    fontAwesomeIconColor: FONT_AWESOME_COLORS.DEFAULT,
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
  computed: {
    buttonText(): void {
      return this.consistentButtonContent?.text || this.getOptionName(this.objectContainingActiveOption[this.activeOptionPropertyKeyName]);
    }
  },
  mounted(): void {
    if (!this.areDropdownOptionsProcessed) this.processDropdownOptions();
    this.setIsDropdownDisplayed();
    this.fontAwesomeIconColor = this.displayArrowOnMouseEnter ? FONT_AWESOME_COLORS.WHITE : FONT_AWESOME_COLORS.DEFAULT;
  },
  methods: {
    getOptionName(dropdownOptionName: string): void {
      return this.optionNameMap ? this.optionNameMap[dropdownOptionName] : dropdownOptionName;
    },
    getButtonClasses(): string[] {
      const classes = [this.uniqueIdentifier, TOOLBAR_GENERAL_BUTTON_CLASS];
      if (this.consistentButtonContent?.backgroundIconClass) {
        classes.push(this.consistentButtonContent.backgroundIconClass, 'dropdown-button-icon');
      }
      if (this.additionalButtonClasses) classes.push(this.additionalButtonClasses);
      return classes;
    },
    getFontAwesomeIconStyle(): WorkshopComponentCss {
      return { color: this.fontAwesomeIconColor };
    },
    getFontAwesomeIconClasses(): string[] {
      return this.consistentButtonContent?.backgroundIconClass ? ['arrow-bottom-right-corner-icon'] : [];
    },
    getFontAwesomeIcon(): string {
      return this.consistentButtonContent?.backgroundIconClass ? 'caret-down' : this.fontAwesomeIcon;
    },
    setArrowIconTransitionProperty(): void {
      setTimeout(() => { if (this.$refs.button) this.changeArrowIconProperty(this.$refs.button, 'transition', 'all 0.3s'); });
    },
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
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.hideDropdownMenu };
      this.$emit('hide-dropdown-menu-callback', workshopEventCallback);
      this.areMenusDisplayed = true;
    },
    displayHighlightedOptionAndParentMenus(): void {
      if (!this.objectContainingActiveOption) {
        this.displayParentMenu();
        return;
      }
      const objectActiveOptionName = this.objectContainingActiveOption[this.activeOptionPropertyKeyName];
      const dropdownOptionName = this.getOptionName(objectActiveOptionName);
      const actualObjectName = dropdownOptionName !== objectActiveOptionName ? objectActiveOptionName : null;
      const results: SearchForOptionResult = this.searchForOpion(this.processedOptions, dropdownOptionName, 0, actualObjectName);
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
              // this is a bug fix for when the parentOptionIndex is incorrectly increased by one when there is an extra element generated at the start
              // due to dropdownOptionAuxiliaryDetailsReferenceObject property being placed at the start of the dropdownOptions object (with display still set to none) 
              const parentOptionIndexWithoutAuxInfo = this.$refs.dropdownMenus.childNodes[parentDropdownIndex + 1].childNodes[1].style.display === 'none'
                ? parentOptionIndex - 1 : parentOptionIndex;
              this.displayChildDropdownMenu(parentOptionElement, parentDropdownIndex, parentOptionIndexWithoutAuxInfo, dropdown);
            }
          }, i * this.dropdownDisplayDelayMilliseconds);
        }
        setTimeout(() => {
          const optionElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[dropdowns.length]?.childNodes[optionIndexes[optionIndexes.length - 1] + 1];
          this.highlightNewOption(optionElementToBeHighlighted, dropdowns.length - 1);
        }, (dropdowns.length - 1) * this.dropdownDisplayDelayMilliseconds);
      }
    },
    isOptionFound(dropdownOptionDisplayStatus: DropdownOptionAuxDetailsRef, actualObjectName: string): boolean {
      let actualObjectNameMatch = true;
      if (actualObjectName) actualObjectNameMatch = actualObjectName === dropdownOptionDisplayStatus?.[DROPDOWN_OPTION_AUX_DETAILS_REF].actualObjectName;
      return dropdownOptionDisplayStatus !== undefined && actualObjectNameMatch;
    },
    searchForOpion(dropdownOptions: NestedDropdownStructure, dropdownOptionName: string, dropdownOptionsIndex: number, actualObjectName?: string): SearchForOptionResult {
      if (!dropdownOptions) return null;
      const optionNames = Object.keys(dropdownOptions);
      if (this.isOptionFound(dropdownOptions[dropdownOptionName], actualObjectName)) {
        return { dropdowns: [dropdownOptions], optionIndexes: [Object.keys(dropdownOptions).indexOf(dropdownOptionName)] };
      } else {
        const childDropdownIndex = dropdownOptionsIndex + 1;
        for (let i = 0; i <= optionNames.length; i += 1) {
          const optionName = optionNames[i];
          if (optionName !== DROPDOWN_OPTION_AUX_DETAILS_REF && optionName !== dropdownOptionName) {
            const result: SearchForOptionResult = this.searchForOpion(dropdownOptions[optionName], dropdownOptionName, childDropdownIndex, actualObjectName);
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
    changeArrowIconProperty(buttonElemenet: HTMLElement, propertyName: string, newValue: string): void {
      const HTMLElements = Array.from(buttonElemenet.childNodes) as HTMLElement[];
      const arrowIconHTMLElement = HTMLElements.find((element) => element && element.style);
      arrowIconHTMLElement.style[propertyName] = newValue;
    },
    mouseEnterButton(): void {
      if (this.mouseEnterButtonEventHandler) this.mouseEnterButtonEventHandler();
      if (this.displayArrowOnMouseEnter) this.fontAwesomeIconColor = FONT_AWESOME_COLORS.DEFAULT;
      this.$emit('mouse-enter-button');
    },
    mouseLeaveButton(): void {
      if (this.mouseLeaveButtonEventHandler) this.mouseLeaveButtonEventHandler();
      if (this.displayArrowOnMouseEnter) this.fontAwesomeIconColor = FONT_AWESOME_COLORS.WHITE;
      this.$emit('mouse-leave-button');
    },
    getAuxiliaryPaddingStyle(): WorkshopComponentCss {
      return { pointerEvents: this.areMenusDisplayed ? '' : 'none' };
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.areMenusDisplayed && !this.consistentButtonContent) {
        this.removeChildDropdownMenus(0);
        const optionElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (!optionElementToBeHighlighted) return;
        this.displayChildDropdownMenu(optionElementToBeHighlighted, 0, 0, this.processedOptions[Object.keys(this.processedOptions)[0]]);
        if (this.mouseEnterAuxiliaryPaddingEventHandler) {
          const optionNameToBehighlighted = this.getOptionName(this.extractHighlightedOptionText(optionElementToBeHighlighted));
          this.mouseEnterAuxiliaryPaddingEventHandler(optionNameToBehighlighted);
          }
        this.highlightNewOption(optionElementToBeHighlighted, 0);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        const blurredOptionElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (this.mouseLeaveAuxiliaryPaddingEventHandler) {
          const blurredOptionName = this.getOptionName(this.extractHighlightedOptionText(blurredOptionElement));
          this.mouseLeaveAuxiliaryPaddingEventHandler(blurredOptionName);
        }
      }
    },
    mouseLeaveDropdown(): void {
      // when there is no nesting - the highlight is set to disappear when user mouse leaves the dropdown
      if (!this.isNested && this.lastHoveredOptionElement) {
        this.resetLastHighlightedOptionStyle();
        this.lastHoveredOptionElement = null;
        this.lastHoveredOptionText = null;
      }
      this.$emit('mouse-leave-dropdown');
    },
    extractHighlightedOptionText(optionElement: HTMLElement): string {
      return (optionElement.childNodes[0] as HTMLElement).innerHTML;
    },
    mouseEnterOption(optionMouseEnterEvent: MouseEnterMenuContainerOptionEvent): void {
      const [dropdownOptions, dropdownMenuIndex, dropdownOptionIndex, actualObjectName, isOptionEnabled] = optionMouseEnterEvent;
      const optionElement = event.target;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(optionElement, dropdownMenuIndex, dropdownOptionIndex, dropdownOptions);
      const highlightedOption = actualObjectName || this.extractHighlightedOptionText(optionElement);
      const mouseEnterOptionEvent: MouseEnterOptionEvent = [highlightedOption, isOptionEnabled];
      if (this.mouseEnterOptionEventHandler) { this.mouseEnterOptionEventHandler(mouseEnterOptionEvent); }
      this.$emit('mouse-enter-option', mouseEnterOptionEvent);
      this.highlightNewOption(optionElement, dropdownMenuIndex);
      this.lastHoveredOptionText = highlightedOption;
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
        childDropdownOptions: NestedDropdownStructure | DropdownOptionAuxDetailsRef): void {
      if (!parentOptionElement || !(parentOptionElement instanceof Element)) return;
      if (!childDropdownOptions[DROPDOWN_OPTION_AUX_DETAILS_REF]
          || (Object.keys(childDropdownOptions).length > 1 && (childDropdownOptions[DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).isEnabled)) {
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
      return dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement)?.innerHTML]?.[DROPDOWN_OPTION_AUX_DETAILS_REF]
        && !(dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).isEnabled;
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
    mouseLeaveOption(optionMouseLeaveEvent: MouseLeaveMenuContainerOptionEvent): void {
      const [blurredOptionElement, actualObjectName] = optionMouseLeaveEvent;
      const blurredOption = actualObjectName || this.extractHighlightedOptionText(blurredOptionElement);
      if (this.mouseLeaveOptionEventHandler) {
        this.mouseLeaveOptionEventHandler(actualObjectName || this.extractHighlightedOptionText(blurredOptionElement));
      }
      this.$emit('mouse-leave-option', blurredOption);
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
        if (this.lastHoveredOptionText) {
          const previousActiveOptionName = this.objectContainingActiveOption?.[this.activeOptionPropertyKeyName];
          const isOptionEnabled = !this.lastHoveredOptionElement.classList.contains(CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE);
          if (previousActiveOptionName !== this.lastHoveredOptionText) {
            this.$emit('mouse-click-new-option', [this.lastHoveredOptionText, isOptionEnabled] as MouseClickNewOptionEvent);
          }
          this.$emit('mouse-click-option', [previousActiveOptionName, this.lastHoveredOptionText, isOptionEnabled] as MouseClickOptionEvent);
        }
      }
      const isDropdownButtonClicked = (event.target as HTMLElement).classList.contains(this.uniqueIdentifier);
      if (isDropdownButtonClicked && !closedViaKey) {
        this.clickedButton = true;
      }
      if (!isDropdownButtonClicked || closedViaKey) {
        if (this.hideDropdownMenuEventHandler && this.lastHoveredOptionText) {
          this.hideDropdownMenuEventHandler(this.lastHoveredOptionText);
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
        resultObject[keyName] = this.dropdownOptions[keyName]?.[DROPDOWN_OPTION_AUX_DETAILS_REF]
          ? this.dropdownOptions[keyName] : DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject();
      });
      this.processedOptions = resultObject;
    },
    setIsDropdownDisplayed(): void {
      if (this.isNested) {
        this.isComponentDisplayed = !!this.dropdownOptions;
      } else {
        this.isComponentDisplayed = Object.keys(this.dropdownOptions).length >= this.minOptionsToDisplayDropdown;
      }
      this.$emit('is-component-displayed', this.isComponentDisplayed);
    },
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
    optionNameMap: Object,
    isNested: {
      type: Boolean,
      default: false,
    },
    timeoutFunc: Function,
    minOptionsToDisplayDropdown: {
      type: Number,
      default: 2,
    },
    consistentButtonContent: Object,
    additionalButtonClasses: Array,
    displayArrowOnMouseEnter: Boolean,
    callWatchWhenDropdownOptionsValueChangeDetectionTriggered: Object,
  },
  watch: {
    callWatchWhenDropdownOptionsValueChangeDetectionTriggered(): void {
      this.processDropdownOptions();
      this.setArrowIconTransitionProperty();
    },
    objectContainingActiveOption(): void {
      this.processDropdownOptions();
    },
    dropdownOptions(): void {
      this.setIsDropdownDisplayed();
    }
  }
};
</script>

<style lang="css" scoped>
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.7rem;
    border: 1px solid  #aaaaaa !important;
    background-color: white !important;
    overflow: hidden;
  }
  .dropdown-button-icon {
    min-width: 2.3rem;
    padding-right: 1px !important;
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
    pointer-events: none;
  }
  .arrow-bottom-right-corner-icon {
    margin-top: 19px;
    width: 15px;
    transform: rotate(315deg);
  }
  .auxiliary-padding {
    top: 38px;
    height: 3px;
    width: 100%;
    z-index: 9990;
    position: absolute;
    cursor: pointer;
  }
</style>
