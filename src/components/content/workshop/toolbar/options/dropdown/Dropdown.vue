<template>
  <div class="dropdown" v-if="Object.keys(dropdownOptions).length > 1">
    <button class="btn form-control dropdown-button" type="button" data-toggle="dropdown"
      @click="openDropdown"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div class="dropdown-button-text">{{objectContainingActiveOption[activeModePropertyKeyName]}}</div><i :class="['fa', 'dropdown-button-icon', fontAwesomeIconClassName]"></i>
    </button>
    <div class="auxiliary-padding"
      @mouseenter="mouseEnterOption(isAuxiliaryPadding = true)"
      @mouseleave="mouseLeaveOption(isAuxiliaryPadding = true)">
    </div>
    <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu">
      <a v-for="(optionValue, optionName) in dropdownOptions" :key="optionName"
        class="dropdown-item custom-dropdown-item" 
        @click="optionClick(optionName)"
        @mouseenter="mouseEnterOption(isAuxiliaryPadding = false)"
        @mouseleave="mouseLeaveOption(isAuxiliaryPadding = false)">
          <div>{{optionName}}</div><i :class="['fa', 'arrow-right', 'fa-angle-right']"></i>
        </a>
    </div>
  </div>
</template>

<script lang="ts">
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';

interface Data {
  activeOptionElement: HTMLElement,
  lastHoveredOptionElement: HTMLElement;
}

export default {
  data: (): Data => ({
    activeOptionElement: null,
    lastHoveredOptionElement: null,
  }),
  methods: {
    getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
      return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
    },
    optionClick(optionName: string): void {
      this.activeOptionElement = event.currentTarget;
      if (this.objectContainingActiveOption[this.activeModePropertyKeyName] === optionName) return;
      this.$emit('new-dropdown-option-clicked', optionName);
    },
    mouseEnterButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'block');
    },
    mouseLeaveButton(): void {
      this.toggleSubcomponentPreviewDisplay(this.objectContainingActiveOption[this.activeModePropertyKeyName], 'none');
    },
    mouseEnterOption(isAuxiliaryPadding: boolean): void {
      // could not pass down option name for enter and leave because highlightedOptionElement is reused and traversing html was cleaner
      // when dropdown is opened for the first time, there is no lastHoveredOptionElement and the first hovered option may
      // not be activeOptionElement, hence the active is removed from it
      if (isAuxiliaryPadding && !this.$refs.dropdownMenu.offsetParent) return;
      const highlightedOptionElement = isAuxiliaryPadding ? this.$refs.dropdownMenu.childNodes[1] : event.target;
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(highlightedOptionElement), 'block');
      if (this.activeOptionElement) this.activeOptionElement.classList.remove('active');
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      this.lastHoveredOptionElement = highlightedOptionElement;
      this.lastHoveredOptionElement.classList.add('active');
    },
    mouseLeaveOption(isAuxiliaryPadding: boolean): void {
      const highlightedOptionElement = isAuxiliaryPadding ? (event.target as HTMLInputElement).nextSibling.childNodes[1] : event.target;
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(highlightedOptionElement), 'none');
    },
    openDropdown(): void {
      // this function is always re-run everytime the dropdown is open
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      // if none of the dropdown elements are active, set the current active mode as the default active element
      if (!this.activeOptionElement) {
        setTimeout(() => {
          const indexOfActiveModeInOptions = Object.keys(this.dropdownOptions).indexOf(this.objectContainingActiveOption[this.activeModePropertyKeyName]);
          const dropdownItemElement = this.$refs.dropdownMenu.childNodes[indexOfActiveModeInOptions + 1];
          dropdownItemElement.classList.add('active');
          this.activeOptionElement = dropdownItemElement;
        });
      } else {
        // the following line removes last hovered incase the user closed the modal without selecting a new active mode
        this.lastHoveredOptionElement = this.activeOptionElement;
        this.lastHoveredOptionElement.classList.add('active');
      }
    },
    toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
      if (!this.highlightSubcomponents) return;
      const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
      const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
      if (subcomponentPreviewElement) subcomponentPreviewElement.style.display = displayValue;
    }
  },
  props: {
    dropdownOptions: Object,
    objectContainingActiveOption: Object,
    activeModePropertyKeyName: String,
    fontAwesomeIconClassName: String,
    highlightSubcomponents: Boolean,
  },
  watch: {
    objectContainingActiveOption(): void {
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
  .custom-dropdown-menu {
    padding: 0px !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    margin-top: 0px !important;
    min-width: 6.5rem !important;
  }
  .custom-dropdown-item {
    padding: 0.08rem 1rem !important;
    cursor: pointer;
    display: flex !important;
    align-items: center;
    padding-bottom: 2px
  }
  .auxiliary-padding {
    top: 36px;
    height: 5px;
    width: 100%;
    z-index: 9990;
    position: absolute;
    cursor: pointer;
  }
  .arrow-right {
    padding-left: 3px;
    position: absolute;
    right: 10px;
    font-size: 14px;
    vertical-align: middle !important;
    float: right;
    color: grey;
  }
</style>
