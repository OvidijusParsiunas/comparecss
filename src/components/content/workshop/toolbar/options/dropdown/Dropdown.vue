<template>
  <div class="dropdown">
    <button class="btn form-control dropdown-button" :class="uniqueIdentifier" type="button"
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
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import BrowserType from '../../../../../../services/workshop/browserType';
import dropdownMenu from './DropdownMenu.vue';

// The button should be grey when the element is not displayed
// TODO use composition API for the dropdowns
interface Data {
  lastHoveredOptionElement: HTMLElement;
  dropdowns: NestedDropdownStructure[];
  enterButtonClicked: boolean;
  areMenusDisplayed: boolean;
  clickedButton: boolean;
  dropdownDisplayDelayMilliseconds: number;
  areDropdownOptionsProcessed: boolean;
  processedOptions: NestedDropdownStructure[];
}

interface SearchForOptionResultData {
  dropdowns: NestedDropdownStructure[];
  optionIndexes: number[];
}

type SearchForOptionResult = SearchForOptionResultData | null;

export default {
  data: (): Data => ({
    lastHoveredOptionElement: null,
    dropdowns: [],
    enterButtonClicked: false,
    areMenusDisplayed: false,
    clickedButton: false,
    dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
    areDropdownOptionsProcessed: false,
    processedOptions: [],
  }),
  mounted(): void {
    if (!this.areDropdownOptionsProcessed) this.processDropdownOptions();
  },
  methods: {
    openDropdown(): void {
      if (this.enterButtonClicked || this.clickedButton) {
        this.enterButtonClicked = false;
        this.clickedButton = false;
        return;
      }
      this.displayHighlightedOptionAndParentMenus();
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
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
          this.highlightOption(optionElementSubjectToHighlight);
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
    // REFACTOR: can be exported to an others callback
    mouseEnterButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'block');
    },
    // REFACTOR: can be exported to an others callback
    mouseLeaveButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'none');
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        this.removeChildDropdownMenus(0);
        this.displayChildDropdownMenu(event.currentTarget, 0, 0, this.processedOptions[Object.keys(this.processedOptions)[0]]);
        // REFACTOR: can be exported to an others callback
        this.highlightOptionAndPreview(this.$refs.dropdownMenus.childNodes[1].childNodes[1]);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        const blurredOptionElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(blurredOptionElement), 'none');
      }
    },
    mouseEnterOption(optionMouseEnterEvent: OptionMouseEnter): void {
      const [dropdownOptions, dropdownMenuIndex, dropdownOptionIndex] = optionMouseEnterEvent;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(event.currentTarget, dropdownMenuIndex, dropdownOptionIndex, dropdownOptions);
      // REFACTOR: can be exported to an others callback
      this.highlightOptionAndPreview(event.target);
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
      if (childDropdownOptions) {
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
    // REFACTOR: can be exported
    highlightOptionAndPreview(optionElementToBeHighlighted: HTMLElement): void {
      this.highlightOption(optionElementToBeHighlighted);
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    },
    highlightOption(optionElementToBeHighlighted: HTMLElement): void {
      if (this.lastHoveredOptionElement) { 
        this.lastHoveredOptionElement.classList.remove('active');
        this.changeOptionArrowColor(this.lastHoveredOptionElement, 'grey');
      }
      this.lastHoveredOptionElement = optionElementToBeHighlighted;
      optionElementToBeHighlighted.classList.add('active');
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
    // REFACTOR: can be exported
    mouseLeaveOption(blurredOptionElement: OptionMouseLeave): void {
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(blurredOptionElement), 'none');
    },
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      let closedViaKey = false;
      if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.enterButtonClicked = true;
        }
        closedViaKey = true;
      }
      if ((event.target as HTMLElement).classList.contains('dropdown-menu-options-marker') || this.enterButtonClicked) {
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
      // REFACTOR: other handlers callback
      this.hideMenusAndComponentPreviews();
      this.areMenusDisplayed = false;
      return { shouldRepeat: false };
    },
    hideFirstMenu(): void {
      this.$refs.dropdownMenus.childNodes[1].style.display = 'none';
    },
     // That rhimes!
    // REFACTOR: can be exported
    hideMenusAndComponentPreviews(): void {
      this.dropdowns = [];
      if (this.lastHoveredOptionElement) this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(this.lastHoveredOptionElement), 'none');
    },
    // REFACTOR: can be exported
    toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
      if (!this.highlightSubcomponents) return;
      const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
      const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
      if (subcomponentPreviewElement) subcomponentPreviewElement.style.display = displayValue;
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
        resultObject[keyName] = null;
      });
      this.processedOptions = resultObject;
    },
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
    isNested: {
      type: Boolean,
      default: true,
    }
  },
  watch: {
    objectContainingActiveOption(): void {
      this.processDropdownOptions();
    },
  }
};
</script>

<style lang="css" scoped>
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.5rem;
    border: 1px solid #ced4da !important;
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
  }
</style>
