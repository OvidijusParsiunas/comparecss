<template>
  <div class="dropdown">
    <button class="btn form-control dropdown-button" type="button" data-toggle="dropdown"
      @click="openDropdown"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div class="dropdown-button-text">{{objectContainingActiveOption[activeModePropertyKeyName]}}</div><i :class="['fa', 'dropdown-button-icon', fontAwesomeIconClassName]"></i>
    </button>
    <!-- TODO -->
    <!-- <div class="auxiliary-padding"
      @mouseenter="mouseEnterOption(isAuxiliaryPadding = true)"
      @mouseleave="mouseLeaveOption(isAuxiliaryPadding = true)">
    </div> -->
    <div ref="dropdownMenus">
      <dropdown-menu v-for="(dropdown, index) in dropdowns" :key="dropdown" ref="dropdownMenu"
        :dropdownOptions="dropdown"
        :nestedDropdownIndex="index"
        @mouse-enter-option="mouseEnterOption"
        @mouse-leave-option="mouseLeaveOption"/>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { OptionMouseEvent } from '../../../../../../interfaces/dropdownMenuMouseEvent';
import dropdownMenu from './DropdownMenu.vue';

// TODO dropdowns should not be an array of strings
interface Data {
  activeOptionElement: HTMLElement,
  lastHoveredOptionElement: HTMLElement;
  dropdowns: string[];
}

export default {
  data: (): Data => ({
    activeOptionElement: null,
    lastHoveredOptionElement: null,
    dropdowns: [],
  }),
  mounted(): void {
    this.dropdowns.push(this.dropdownOptions);
  },
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
    mouseEnterOption(optionMouseEnterEvent: OptionMouseEvent): void {
      const [isAuxiliaryPadding, optionValue, dropdownMenuIndex, dropdownOptionIndex] = optionMouseEnterEvent;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(optionValue, dropdownMenuIndex, dropdownOptionIndex);
      this.highlightOption(isAuxiliaryPadding);
    },
    removeChildDropdownMenus(dropdownMenuIndex: number): void {
      const removableDropdownMenusIndex = dropdownMenuIndex + 1;
      if (this.dropdowns.length > removableDropdownMenusIndex) {
        this.dropdowns.splice(removableDropdownMenusIndex, this.dropdowns.length);
      }
    },
    // TODO will need to add a type here
    displayChildDropdownMenu(dropdownOptions: any, dropdownMenuIndex: number, dropdownOptionIndex: number): void {
      if (dropdownOptions) {
        this.dropdowns.push(dropdownOptions);
        const startOfAggegatedLeftNumber = 11;
        const dropdownMenuElement = (event.currentTarget as HTMLElement).parentNode as HTMLElement;
        const topStyleValueRaw = dropdownMenuElement.style.top;
        const leftStyleValueRaw = dropdownMenuElement.style.left;
        const topStyleValueParsed = Number.parseInt(topStyleValueRaw.substring(startOfAggegatedLeftNumber,topStyleValueRaw.length)) || 0;
        const leftStyleValueParsed = Number.parseInt(leftStyleValueRaw) || 0;
        const currentDropdownMenuWidth = dropdownMenuElement.offsetWidth;
        const optionHeight = (event.currentTarget as HTMLElement).offsetHeight;
        setTimeout(() => {
          const newDropdownIndex = dropdownMenuIndex + 1;
          this.$refs.dropdownMenus.childNodes[newDropdownIndex + 1].style.top = `calc(100% + ${(dropdownOptionIndex * optionHeight) + topStyleValueParsed}px)`;
          this.$refs.dropdownMenus.childNodes[newDropdownIndex + 1].style.left = `${currentDropdownMenuWidth + leftStyleValueParsed}px`;
          this.$refs.dropdownMenus.childNodes[newDropdownIndex + 1].style.display = 'block';
        });
      }
    },
    highlightOption(isAuxiliaryPadding: boolean): void {
      // when dropdown is opened for the first time, there is no lastHoveredOptionElement and the first hovered option may
      // not be activeOptionElement, hence the active is removed from it
      const highlightedOptionElement = isAuxiliaryPadding ? this.$refs.dropdownMenu.childNodes[1] : event.target;
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(highlightedOptionElement), 'block');
      if (this.activeOptionElement) this.activeOptionElement.classList.remove('active');
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      this.lastHoveredOptionElement = highlightedOptionElement;
      this.lastHoveredOptionElement.classList.add('active');
    },
    mouseLeaveOption(optionMouseLeaveEvent: OptionMouseEvent): void {
      const [isAuxiliaryPadding] = optionMouseLeaveEvent;
      const highlightedOptionElement = isAuxiliaryPadding ? (event.target as HTMLInputElement).nextSibling.childNodes[1] : event.target;
      this.toggleSubcomponentPreviewDisplay(this.getOptionNameFromElement(highlightedOptionElement), 'none');
    },
    openDropdown(): void {
      this.$refs.dropdownMenus.childNodes[1].style.display = 'block';
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      // if none of the dropdown elements are active, set the current active mode as the default active element
      if (!this.activeOptionElement) {
        setTimeout(() => {
          const indexOfActiveModeInOptions = Object.keys(this.dropdownOptions).indexOf(this.objectContainingActiveOption[this.activeModePropertyKeyName]);
          const dropdownItemElement = this.$refs.dropdownMenus.childNodes[1].childNodes[indexOfActiveModeInOptions + 1];
          dropdownItemElement.classList.add('active');
          this.activeOptionElement = dropdownItemElement;
        });
      } else {
        // the following line removes last hovered incase the user closed the modal without selecting a new active mode
        this.lastHoveredOptionElement = this.activeOptionElement;
        this.lastHoveredOptionElement.classList.add('active');
      }
      this.$emit('hide-dropdown-menu-callback', this.hideDropdownMenu);
    },
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      // TODO keyboard events
      // if (event instanceof KeyboardEvent) {
      //   if (event.key === 'Enter' || event.key === 'Escape') {
      //     this.isEditingClassName = false;
      //     this.thisComponent.className = ProcessClassName.finalize(this.className || this.thisComponent.className, this.thisComponent.className, this.allComponents, this.thisComponent.className);
      //     return { shouldRepeat: false };
      //   }
      //   return { shouldRepeat: true };
      // }
      // for (let i = 2; i < this.dropdowns.length; i+=1) {
      //   this.$refs.dropdownMenus.removeChild(this.$refs.dropdownMenus.childNodes[2]);
      // }
      this.activeOptionElement = this.lastHoveredOptionElement;
      const optionName = this.activeOptionElement.childNodes[0].innerHTML;
      if (this.objectContainingActiveOption[this.activeModePropertyKeyName] !== optionName) {
        this.$emit('new-dropdown-option-clicked', optionName);
      }
      this.dropdowns.splice(1, this.dropdowns.length);
      this.$refs.dropdownMenus.childNodes[1].style.display = 'none';
      return { shouldRepeat: false };
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
</style>
