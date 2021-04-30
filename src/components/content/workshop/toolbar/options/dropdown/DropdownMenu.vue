<template>
  <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu" :class="DROPDOWN_OPTION_MARKER" :style="BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE">
    <a v-for="(innerDropdownOptions, optionName, optionIndex) in dropdownOptions" :key="optionName"
      class="dropdown-item custom-dropdown-item"
      :style="{ color: getDefaultTextColor(innerDropdownOptions), display: getOptionDisplay(optionName) }"
      :class="DROPDOWN_OPTION_MARKER"
      @mouseenter="mouseEnter(innerDropdownOptions, optionIndex)"
      @mouseleave="mouseLeave">
        <div class="option-text" :class="DROPDOWN_OPTION_MARKER">{{optionName}}</div>
        <font-awesome-icon v-if="isArrowDisplayed(innerDropdownOptions)"
          :style="{ color: PASSIVE_FONT_AWESOME_COLOR }"
          class="arrow-right-icon"
          :class="DROPDOWN_OPTION_MARKER"
          icon="angle-right"/>
    </a>
  </div>
</template>

<script lang="ts">
import { EntityDisplayStatus, EntityDisplayStatusRef, ENTITY_DISPLAY_STATUS_REF } from '../../../../../../interfaces/entityDisplayStatus';
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { DROPDOWN_OPTION_MARKER } from '../../../../../../consts/elementClassMarkers';
import BrowserType from '../../../../../../services/workshop/browserType';

interface Consts {
  DROPDOWN_OPTION_MARKER: string;
  ENTITY_DISPLAY_STATUS_REF: string;
  BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: WorkshopComponentCss;
  PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS,
  getOptionDisplay: (optionName: string) => string;
  getDefaultTextColor: (innerDropdownOptions: NestedDropdownStructure | EntityDisplayStatusRef) => string;
  isArrowDisplayed: (innerDropdownOptions: NestedDropdownStructure | EntityDisplayStatusRef) => boolean;
}

export default {
  setup(): Consts {
    return {
      DROPDOWN_OPTION_MARKER,
      ENTITY_DISPLAY_STATUS_REF,
      BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: { paddingBottom: BrowserType.isFirefox() ? '1px !important' : '2px !important' },
      PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS.PASSIVE,
      getOptionDisplay(optionName: string): string {
        return optionName === ENTITY_DISPLAY_STATUS_REF ? 'none !important' : '';
      },
      getDefaultTextColor(innerDropdownOptions: NestedDropdownStructure | EntityDisplayStatusRef): string {
        return !innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF] || (innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF] as EntityDisplayStatus).isDisplayed
          ? 'black' : 'grey';
      },
      isArrowDisplayed(innerDropdownOptions: NestedDropdownStructure | EntityDisplayStatusRef): boolean {
        return !innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF]
          || ((innerDropdownOptions[ENTITY_DISPLAY_STATUS_REF] as EntityDisplayStatus).isDisplayed && Object.keys(innerDropdownOptions).length > 1);
      },
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
    height: 15px;
  }
</style>
