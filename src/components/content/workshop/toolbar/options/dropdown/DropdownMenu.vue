<template>
  <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu" :class="DROPDOWN_OPTION_MARKER" :style="BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE">
    <a v-for="(innerDropdownOptions, optionName, optionIndex) in dropdownOptions" :key="optionName"
      class="dropdown-item custom-dropdown-item"
      :style="{ color: (!innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF] || innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF].currentlyDisplaying) ? 'black' : 'grey',
        display: optionName === ENTITY_DISPLAY_STATUS_REF? 'none !important' : '' }"
      :class="DROPDOWN_OPTION_MARKER"
      @mouseenter="mouseEnter(innerDropdownOptions, optionIndex)"
      @mouseleave="mouseLeave">
        <div class="option-text" :class="DROPDOWN_OPTION_MARKER">{{optionName}}</div>
        <font-awesome-icon v-if="(!innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF])"
          class="dropdown-button-marker arrow-right-icon"
          :class="DROPDOWN_OPTION_MARKER"
          icon="angle-right"/>
    </a>
  </div>
</template>

<script lang="ts">
import { NestedDropdownStructure, ENTITY_DISPLAY_STATUS_REF } from '../../../../../../interfaces/nestedDropdownStructure';
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { DROPDOWN_OPTION_MARKER } from '../../../../../../consts/elementClassMarkers';
import BrowserType from '../../../../../../services/workshop/browserType';

interface Consts {
  DROPDOWN_OPTION_MARKER: string;
  ENTITY_DISPLAY_STATUS_REF: string;
  BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: WorkshopComponentCss;
}

export default {
  setup(): Consts {
    return {
      DROPDOWN_OPTION_MARKER,
      ENTITY_DISPLAY_STATUS_REF,
      BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: { paddingBottom: BrowserType.isFirefox() ? '1px !important' : '2px !important' },
    };
  },
  methods: {
    mouseEnter(innerDropdownOptions: NestedDropdownStructure, optionIndex: number): void {
      this.$emit('mouse-enter-option', [innerDropdownOptions, this.nestedDropdownIndex, optionIndex] as OptionMouseEnter);
    },
    mouseLeave(): void {
      this.$emit('mouse-leave-option', event.target as OptionMouseLeave);
    }
  },
  props: {
    dropdownOptions: Object,
    nestedDropdownIndex: Number,
  },
};
</script>

<style lang="css" scoped>
  .custom-dropdown-menu {
    padding: 0px !important;
    padding-top: 2px !important;
    margin-top: 0px !important;
    min-width: 6.5rem !important;
    border-color: #c7c7c7 !important;
  }
  .custom-dropdown-item {
    padding: 0.08rem 1rem !important;
    cursor: pointer;
    display: flex !important;
    align-items: center;
    padding-bottom: 2px
  }
  .custom-dropdown-item-default {
    background-color: white !important;
  }
  .custom-dropdown-item-active {
    background-color: #007bff !important;
  }
  .custom-dropdown-item-inactive {
    background-color: #d8dde3 !important;
  }
  .option-text {
    padding-right: 10px;
    user-select: none;
  }
  .arrow-right-icon {
    padding-left: 3px;
    position: absolute;
    right: 10px;
    font-size: 14px;
    vertical-align: middle !important;
    float: right;
  width: 11px;
    color: #6d6d6d;
    height: 15px;
  }
</style>
