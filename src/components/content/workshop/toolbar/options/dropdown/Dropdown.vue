<template>
  <div v-if="isComponentDisplayed" class="dropdown">
    <button class="btn form-control dropdown-button option-default" :class="[uniqueIdentifier, { 'button-group-border': isButtonGroup }]" type="button"
      @click="openDropdown"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div class="dropdown-button-text dropdown-button-marker" :class="uniqueIdentifier">{{objectContainingActiveOption[activeModePropertyKeyName]}}</div><i class="dropdown-button-marker" :class="['fa', 'dropdown-button-icon', fontAwesomeIconClassName, uniqueIdentifier]"></i>
    </button>
    <div class="auxiliary-padding dropdown-menu-options-marker"
      @mouseenter="mouseEnterAuxiliaryPadding"
      @mouseleave="mouseLeaveAuxiliaryPadding">
    </div>
    <div ref="dropdownMenus">
      <dropdown-menu v-for="(dropdownOptions, index) in dropdowns" :key="dropdownOptions"
        :dropdownOptions="dropdownOptions"
        :nestedDropdownIndex="index"
        @mouse-enter-option="mouseEnterOption"
        @mouse-leave-option="mouseLeaveOption"/>
    </div>
  </div>
</template>

<script lang="ts">
import { COMPONENT_CARD_MARKER, DROPDOWN_OPTION_MARKER } from '../../../../../../consts/elementClassMarkers';
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { DropdownCompositionAPI } from '../../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import BrowserType from '../../../../../../services/workshop/browserType';
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
  processedOptions: NestedDropdownStructure[];
  lastHoveredOptionElementDropdownMenuIndex: number;
}

interface Props {
  isNested: boolean;
  isButtonGroup: boolean,
  uniqueIdentifier: string;
  highlightSubcomponents: boolean;
  fontAwesomeIconClassName: string;
  activeModePropertyKeyName: string;
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
    lastHoveredOptionElement: null,
    areDropdownOptionsProcessed: false,
    lastHoveredOptionElementDropdownMenuIndex: 0,
    dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
  }),
  setup(props: Props): DropdownCompositionAPI {
    // If you want to pass down a data variable into compositionAPI, use the code below and pass areMenusDisplayed into the customEventHandlers function and return customEventHandlers
    // const areMenusDisplayed: Ref<boolean> = ref(false);
    const objectContainingActiveOptionRef: Ref<Props['objectContainingActiveOption']> = ref(props.objectContainingActiveOption);
    const activeModePropertyKeyNameRef: Ref<Props['activeModePropertyKeyName']> = ref(props.activeModePropertyKeyName);
    const highlightSubcomponentsRef: Ref<Props['highlightSubcomponents']> = ref(props.highlightSubcomponents);
    let customEventHandlers = {} as DropdownCompositionAPI;
    if (props.customEventHandlers) {
      watch(() => props.objectContainingActiveOption, (newObjectContainingActiveOption) => {
      objectContainingActiveOptionRef.value = newObjectContainingActiveOption;
      });
      watch(() => props.activeModePropertyKeyName, (newActiveModePropertyKeyName) => {
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
    this.toggleDropdownDisplay();
  },
  methods: {
    openDropdown(): void {
      if (this.enterButtonClicked || this.clickedButton) {
        this.enterButtonClicked = false;
        this.clickedButton = false;
        return;
      }
      this.displayHighlightedOptionAndParentMenus();
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.hideDropdownMenu};
      this.$emit('hide-dropdown-menu-callback', workshopEventCallback);
      this.areMenusDisplayed = true;
    },
    displayHighlightedOptionAndParentMenus(): void {
      const results: SearchForOptionResult = this.searchForOpion(this.processedOptions, this.objectContainingActiveOption[this.activeModePropertyKeyName], 0);
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
          const optionElementSubjectToHighlight = this.$refs.dropdownMenus.childNodes[dropdowns.length].childNodes[optionIndexes[optionIndexes.length - 1] + 1];
          if (this.displayHighligtedOptionAndParentMenusEventHandler) {
            this.displayHighligtedOptionAndParentMenusEventHandler(this.dropdowns, optionElementSubjectToHighlight, this.dropdowns.length - 1, this.lastHoveredOptionElement, this.lastHoveredOptionElementDropdownMenuIndex);
          }
          this.highlightOption(optionElementSubjectToHighlight, dropdowns.length - 1);
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
      if (this.buttonMouseEnterEventHandler) { this.buttonMouseEnterEventHandler(); }
    },
    mouseLeaveButton(): void {
      if (this.buttonMouseLeaveEventHandler) { this.buttonMouseLeaveEventHandler(); }
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        this.removeChildDropdownMenus(0);
        this.displayChildDropdownMenu(event.currentTarget, 0, 0, this.processedOptions[Object.keys(this.processedOptions)[0]]);
        const optionElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (this.mouseEnterAuxiliaryPaddingEventHandler) { 
          this.mouseEnterAuxiliaryPaddingEventHandler(this.dropdowns, optionElementToBeHighlighted, 0, this.lastHoveredOptionElement, this.lastHoveredOptionElementDropdownMenuIndex);
        }
        this.highlightOption(optionElementToBeHighlighted, 0);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        const blurredOptionElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (this.mouseLeaveAuxiliaryPaddingEventHandler) this.mouseLeaveAuxiliaryPaddingEventHandler(blurredOptionElement);
      }
    },
    mouseEnterOption(optionMouseEnterEvent: OptionMouseEnter): void {
      const [dropdownOptions, dropdownMenuIndex, dropdownOptionIndex] = optionMouseEnterEvent;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(event.target, dropdownMenuIndex, dropdownOptionIndex, dropdownOptions);
      if (this.mouseEnterOptionEventHandler) {
        this.mouseEnterOptionEventHandler(this.dropdowns, event.target, dropdownMenuIndex, this.lastHoveredOptionElement, this.lastHoveredOptionElementDropdownMenuIndex);
      }
      this.highlightOption(event.target, dropdownMenuIndex);
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
    displayChildDropdownMenu(parentOptionElement: HTMLElement, parentDropdownMenuIndex: number, parentDropdownOptionIndex: number, childDropdownOptions: NestedDropdownStructure): void {
      if (typeof childDropdownOptions.currentlyDisplaying !== 'boolean') {
        this.dropdowns.push(childDropdownOptions);
        const startOfAggegatedLeftNumber = 11;
        const dropdownMenuElement = parentOptionElement.parentNode as HTMLElement;
        const topStyleValueRaw = dropdownMenuElement.style.top;
        const leftStyleValueRaw = dropdownMenuElement.style.left;
        const topStyleValueParsed = Number.parseInt(topStyleValueRaw.substring(startOfAggegatedLeftNumber, topStyleValueRaw.length)) || 0;
        const leftStyleValueParsed = Number.parseInt(leftStyleValueRaw) || 0;
        const currentDropdownMenuWidth = dropdownMenuElement.offsetWidth;
        const optionHeight = parentOptionElement.offsetHeight;
        setTimeout(() => {
          const newChildDropdownMenuElemIndex = parentDropdownMenuIndex + 2;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.top = `calc(100% + ${(parentDropdownOptionIndex * optionHeight) + topStyleValueParsed}px)`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.left = `${currentDropdownMenuWidth + leftStyleValueParsed}px`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.display = 'block';
        });
      }
    },
    highlightOption(optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number): void {
      if (this.lastHoveredOptionElement) {
        this.lastHoveredOptionElement.classList.remove('custom-dropdown-item-active');
        this.lastHoveredOptionElement.style.color = 'black';
        // bug fix for resetting option colour when user clicks and drags an option
        if (!document.activeElement.classList.contains(this.uniqueIdentifier)) this.lastHoveredOptionElement.classList.add('custom-dropdown-item-default');
        this.changeOptionArrowColor(this.lastHoveredOptionElement, 'grey');
      }
      this.lastHoveredOptionElement = optionElementToBeHighlighted;
      this.lastHoveredOptionElementDropdownMenuIndex = dropdownMenuIndex;
      optionElementToBeHighlighted.classList.add('custom-dropdown-item-active');
      optionElementToBeHighlighted.style.color = 'white';
      this.changeOptionArrowColor(optionElementToBeHighlighted, 'white');
    },
    getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
      return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
    },
    changeOptionArrowColor(optionElement: Element, newColor: 'white'|'grey'): void {
      const arrowElement = optionElement.childNodes[1];
      if (arrowElement instanceof Element || arrowElement instanceof HTMLDocument) {
        (arrowElement as HTMLElement).style.color = newColor;
      }
    },
    mouseLeaveOption(blurredOptionElement: OptionMouseLeave): void {
      if (this.mouseLeaveOptionEventHandler) this.mouseLeaveOptionEventHandler(blurredOptionElement);
    },
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event.type === 'mousedown' && !(event.target as HTMLElement).classList.contains(COMPONENT_CARD_MARKER)) {
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
          if (this.objectContainingActiveOption[this.activeModePropertyKeyName] !== optionName) {
            this.$emit('new-dropdown-option-clicked', optionName);
          }
        }
      }
      if ((event.target as HTMLElement).classList.contains(this.uniqueIdentifier) && !closedViaKey) {
        this.clickedButton = true;
      }
      this.dropdowns = [];
      this.areMenusDisplayed = false;
      if (this.hideDropdownMenuEventHandler && this.lastHoveredOptionElement) this.hideDropdownMenuEventHandler(this.lastHoveredOptionElement);
      return { shouldRepeat: false };
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
        resultObject[keyName] = { currentlyDisplaying: true };
      });
      this.processedOptions = resultObject;
    },
    toggleDropdownDisplay(): void {
      if (this.isNested) {
        this.isComponentDisplayed = !!this.dropdownOptions;
      } else {
        this.isComponentDisplayed = Object.keys(this.dropdownOptions).length > 1;
      }
      this.$emit('is-component-displayed', this.isComponentDisplayed);
    }
  },
  components: {
    dropdownMenu,
  },
  props: {
    dropdownOptions: Object,
    objectContainingActiveOption: Object,
    activeModePropertyKeyName: String,
    fontAwesomeIconClassName: String,
    highlightSubcomponents: Boolean,
    // this is used to allow the dropdown to close when clicked on other dropdowns
    uniqueIdentifier: String,
    customEventHandlers: Function,
    isButtonGroup: {
      type: Boolean,
      default: false,
    },
    isNested: {
      type: Boolean,
      default: true,
    }
  },
  watch: {
    objectContainingActiveOption(): void {
      this.processDropdownOptions();
    },
    dropdownOptions(): void {
      this.toggleDropdownDisplay();
    }
  }
};
</script>

<style lang="css" scoped>
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.5rem;
    border: 1px solid #a7a7a7 !important;
    background-color: white !important;
  }
  .dropdown-button-text {
    float: left;
    padding-left: 2px
  }
  .dropdown-button-icon {
    float: right;
    margin-top: 0.3em
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
