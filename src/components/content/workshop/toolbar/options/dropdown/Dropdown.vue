<template>
  <div class="dropdown" v-if="Object.keys(dropdownOptions).length > 1">
    <button @click="openDropdown" class="btn form-control dropdown-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div class="dropdown-button-text">{{objectContainingActiveOption[activeModePropertyKeyName]}}</div><i :class="['fa', 'dropdown-button-icon', fontAwesomeIconClassName]"></i>
    </button>
    <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a v-for="(optionValue, optionName) in dropdownOptions" :key="optionName"
        class="dropdown-item custom-dropdown-item" 
        @click="optionClick" @mouseenter="mouseEnterFunc">
          {{optionName}}
        </a>
    </div>
  </div>
</template>

<script lang="ts">
import { UpdateOptionsMode } from '../../../../../../interfaces/updateCssMode';

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
    optionClick(): void {
      this.activeOptionElement = event.target;
      this.objectContainingActiveOption[this.activeModePropertyKeyName] = (event.target as HTMLInputElement).innerHTML;
      this.$emit('dropdown-option-clicked', [this.objectContainingActiveOption[this.activeModePropertyKeyName]] as UpdateOptionsMode);
    },
    mouseEnterFunc(): void {
      // when dropdown is opened for the first time, there is no lastHoveredOptionElement and the first hovered option may
      // not be activeOptionElement, hence the active is removed from it
      if (this.activeOptionElement) this.activeOptionElement.classList.remove('active');
      if (this.lastHoveredOptionElement) this.lastHoveredOptionElement.classList.remove('active');
      this.lastHoveredOptionElement = event.target;
      this.lastHoveredOptionElement.classList.add('active');
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
  },
  props: {
    dropdownOptions: Object,
    objectContainingActiveOption: Object,
    activeModePropertyKeyName: String,
    fontAwesomeIconClassName: String,
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
  }
</style>
