<template>
  <div class="dropdown">
    <button class="btn form-control dropdown-button" :class="uniqueIdentifier" type="button" data-toggle="dropdown"
      @click="openDropdown"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div class="dropdown-button-text dropdown-button-marker" :class="uniqueIdentifier" >{{objectContainingActiveOption[activeModePropertyKeyName]}}</div><i class="dropdown-button-marker" :class="['fa', 'dropdown-button-icon', fontAwesomeIconClassName, uniqueIdentifier]"></i>
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
import { SubcomponentDropdownStructure } from '../../../../../../interfaces/workshopComponent';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
import dropdownMenu from './DropdownMenu.vue';

// TODO use composition API for the dropdowns
// TODO display the correct option on-start
interface Data {
  activeOptionElement: HTMLElement,
  lastHoveredOptionElement: HTMLElement;
  dropdowns: SubcomponentDropdownStructure[];
  enterButtonClicked: boolean;
  firstMenuOpen: boolean;
  clickedButton: boolean;
}

interface SearchForOptionResultData {
  dropdowns: SubcomponentDropdownStructure[];
  optionIndexes: number[];
}

type SearchForOptionResult = SearchForOptionResultData | null;

export default {
  data: (): Data => ({
    activeOptionElement: null,
    lastHoveredOptionElement: null,
    dropdowns: [],
    enterButtonClicked: false,
    firstMenuOpen: false,
    clickedButton: false,
  }),
  mounted(): void {
    this.dropdowns.push(this.dropdownOptions);
  },
  methods: {
    getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
      return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
    },
    mouseEnterButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'block');
    },
    mouseLeaveButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'none');
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.firstMenuOpen) {
        this.removeChildDropdownMenus(0);
        this.displayChildDropdownMenu(this.dropdownOptions[Object.keys(this.dropdownOptions)[0]], 0, 0, event.currentTarget);
        this.highlightOptionAndPreview(this.$refs.dropdownMenus.childNodes[1].childNodes[1]);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.firstMenuOpen) {
        const blurredOptionElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(blurredOptionElement), 'none');
      }
    },
    mouseEnterOption(optionMouseEnterEvent: OptionMouseEnter): void {
      const [dropdownOptions, dropdownMenuIndex, dropdownOptionIndex] = optionMouseEnterEvent;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(dropdownOptions, dropdownMenuIndex, dropdownOptionIndex, event.currentTarget);
      this.highlightOptionAndPreview(event.target);
    },
    removeChildDropdownMenus(dropdownMenuIndex: number): void {
      const removableDropdownMenusIndex = dropdownMenuIndex + 1;
      if (this.dropdowns.length > removableDropdownMenusIndex) {
        this.dropdowns.splice(removableDropdownMenusIndex, this.dropdowns.length);
      }
    },
    displayChildDropdownMenu(dropdownOptions: SubcomponentDropdownStructure, dropdownMenuIndex: number, dropdownOptionIndex: number, hoveredOptionElement: HTMLElement): void {
      if (dropdownOptions) {
        this.dropdowns.push(dropdownOptions);
        const startOfAggegatedLeftNumber = 11;
        const dropdownMenuElement = hoveredOptionElement.parentNode as HTMLElement;
        const topStyleValueRaw = dropdownMenuElement.style.top;
        const leftStyleValueRaw = dropdownMenuElement.style.left;
        const topStyleValueParsed = Number.parseInt(topStyleValueRaw.substring(startOfAggegatedLeftNumber, topStyleValueRaw.length)) || 0;
        const leftStyleValueParsed = Number.parseInt(leftStyleValueRaw) || 0;
        const currentDropdownMenuWidth = dropdownMenuElement.offsetWidth;
        const optionHeight = hoveredOptionElement.offsetHeight;
        setTimeout(() => {
          const newChildDropdownMenuElemIndex = dropdownMenuIndex + 2;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.top = `calc(100% + ${(dropdownOptionIndex * optionHeight) + topStyleValueParsed}px)`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.left = `${currentDropdownMenuWidth + leftStyleValueParsed}px`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.display = 'block';
        });
      }
    },
    highlightOptionAndPreview(optionElementToBeHighlighted: HTMLElement): void {
      // when dropdown is opened for the first time, there is no lastHoveredOptionElement and the first hovered option may
      // not be activeOptionElement, hence the active is removed from it
      this.highlightOption(optionElementToBeHighlighted);
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    },
    mouseLeaveOption(blurredOptionElement: OptionMouseLeave): void {
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(blurredOptionElement), 'none');
    },
    openDropdown(): void {
      // the open and hide dropdown menu logic is complex due the fact that the first dropdown menu is controlled by the bootststrap js library which assigns its styling,
      // and automatically opens and closes it on button click, this behaviour is then changed when other child menus are introduced and used
      if (this.enterButtonClicked) {
        this.enterButtonClicked = false;
        return;
      }
      if (!this.clickedButton) this.firstMenuOpen = true;
      if (this.$refs.dropdownMenus.childNodes[1].style.display === 'none' && !this.clickedButton) {
        this.$refs.dropdownMenus.childNodes[1].style.display = 'block';
        this.displayHighlightedOptionAndParentMenus();
      }
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      // refactor
      // Remove the following code as soon as the drodpown trigger argument is removed
      if (!this.activeOptionElement) {
        setTimeout(() => {
          const indexOfActiveModeInOptions = Object.keys(this.dropdownOptions).indexOf(this.objectContainingActiveOption[this.activeModePropertyKeyName]);
          const dropdownItemElement = this.$refs.dropdownMenus.childNodes[1].childNodes[indexOfActiveModeInOptions + 1];
          // dropdownItemElement.classList.add('active');
          this.activeOptionElement = dropdownItemElement;
        });
      } else {
        // the following line removes last hovered incase the user closed the modal without selecting a new active mode
        this.lastHoveredOptionElement = this.activeOptionElement;
        // this.lastHoveredOptionElement.classList.add('active');
      }
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.hideDropdownMenu};
      if (!this.clickedButton) this.$emit('hide-dropdown-menu-callback', workshopEventCallback);
      this.clickedButton = false;
    },
    displayHighlightedOptionAndParentMenus(): void {
      const results: SearchForOptionResult = this.searchForOpion(this.dropdownOptions, this.objectContainingActiveOption[this.activeModePropertyKeyName], 0);
      if (results) {
        const { dropdowns, optionIndexes } = results;
        const displayDropdownDelayMilliseconds = 10;
        for (let i = 1; i < dropdowns.length; i++) {
          const dropdown = dropdowns[i];
          const dropdownIndex = i - 1;
          const parentOptionIndex = optionIndexes[i - 1];
          setTimeout(() => {
            const parentOptionElement = this.$refs.dropdownMenus.childNodes[dropdownIndex + 1].childNodes[parentOptionIndex + 1];
            this.displayChildDropdownMenu(dropdown, dropdownIndex, parentOptionIndex, parentOptionElement);
          }, i * displayDropdownDelayMilliseconds);
        }
        setTimeout(() => {
          const optionElementSubjectToHighlight = this.$refs.dropdownMenus.childNodes[dropdowns.length].childNodes[optionIndexes[optionIndexes.length - 1] + 1];
          this.highlightOption(optionElementSubjectToHighlight);
        }, (dropdowns.length - 1) * displayDropdownDelayMilliseconds);
      }
    },
    highlightOption(optionElementToBeHighlighted: HTMLElement): void {
      if (this.activeOptionElement) this.activeOptionElement.classList.remove('active');
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      this.activeOptionElement = optionElementToBeHighlighted;
      this.lastHoveredOptionElement = optionElementToBeHighlighted;
      optionElementToBeHighlighted.classList.add('active');
    },
    searchForOpion(dropdownOptions: SubcomponentDropdownStructure, subjectOptionName: SUB_COMPONENTS, dropdownOptionsIndex: number): SearchForOptionResult {
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
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.enterButtonClicked = true;
        } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
          this.hideFirstMenu();
        }
      }
      if ((event.target as HTMLElement).classList.contains('dropdown-menu-options-marker') || this.enterButtonClicked) {
        if (this.lastHoveredOptionElement) {
          this.activeOptionElement = this.lastHoveredOptionElement;
          const optionName = this.activeOptionElement.childNodes[0].innerHTML;
          if (this.objectContainingActiveOption[this.activeModePropertyKeyName] !== optionName) {
            this.$emit('new-dropdown-option-clicked', optionName);
          }
        }
      }
      if ((event.target as HTMLElement).classList.contains(this.uniqueIdentifier) && !this.enterButtonClicked) {
        this.clickedButton = true;
        if (this.$refs.dropdownMenus.childNodes[1].style.display === 'block') this.hideFirstMenu();
      }
      if (!(event.target as HTMLElement).classList.contains(this.uniqueIdentifier) || this.enterButtonClicked) {
        this.hideFirstMenu();
      }
      this.hideChildMenusAndComponentPreviews();
      this.firstMenuOpen = false;
      return { shouldRepeat: false };
    },
    hideFirstMenu(): void {
      this.$refs.dropdownMenus.childNodes[1].style.display = 'none';
    },
    hideChildMenusAndComponentPreviews(): void {
      if (this.lastHoveredOptionElement) this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(this.lastHoveredOptionElement), 'none');
      this.dropdowns.splice(1, this.dropdowns.length);
    },
    toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
      if (!this.highlightSubcomponents) return;
      const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
      const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
      if (subcomponentPreviewElement) subcomponentPreviewElement.style.display = displayValue;
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
  },
  watch: {
    objectContainingActiveOption(): void {
      this.dropdowns = [this.dropdownOptions];
      if (this.activeOptionElement) this.activeOptionElement.classList.remove('active');
      this.activeOptionElement = null;
    }
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
