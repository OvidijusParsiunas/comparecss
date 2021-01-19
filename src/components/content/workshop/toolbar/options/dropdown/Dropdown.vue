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

// The button should be grey when the element is not displayed
// do not display styles dropdown if only one
interface ImmediateData {
  dropdowns: NestedDropdownStructure[];
}

interface Data {
  lastHoveredOptionElement: HTMLElement;
  enterButtonClicked: boolean;
  areMenusDisplayed: boolean;
  clickedButton: boolean;
  dropdownDisplayDelayMilliseconds: number;
  areDropdownOptionsProcessed: boolean;
  processedOptions: NestedDropdownStructure[];
}

interface Props {
  customEventHandlers: (param1: Ref<unknown>, param2: Ref<string>, param3: Ref<boolean>) => DropdownCompositionAPI,
  dropdownOptions: NestedDropdownStructure,
  objectContainingActiveOption: unknown,
  activeModePropertyKeyName: string,
  fontAwesomeIconClassName: string,
  highlightSubcomponents: boolean,
  uniqueIdentifier: string,
  isNested: boolean,
}

interface SearchForOptionResultData {
  dropdowns: NestedDropdownStructure[];
  optionIndexes: number[];
}

type SearchForOptionResult = SearchForOptionResultData | null;

export default {
  data: (): ImmediateData => ({
    dropdowns: [],
  }),
  setup(props: Props): DropdownCompositionAPI & Data {
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
      areMenusDisplayed: false,
      clickedButton: false,
      processedOptions: [],
      enterButtonClicked: false,
      lastHoveredOptionElement: null,
      areDropdownOptionsProcessed: false,
      dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
    };
  },
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
        this.highlightOption(optionElementToBeHighlighted);
        if (this.mouseEnterAuxiliaryPaddingEventHandler) this.mouseEnterAuxiliaryPaddingEventHandler(optionElementToBeHighlighted);
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
      this.highlightOption(event.target);
      if (this.mouseEnterOptionEventHandler) this.mouseEnterOptionEventHandler(event.target);
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
    customEventHandlers: Function,
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
