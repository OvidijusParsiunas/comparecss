<template>
  <div ref="dropdownMenu" v-if="isMenuBeDisplayed(dropdownOptions)"
    :style="BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE"
    class="dropdown-menu custom-dropdown-menu"
    :class="[DROPDOWN_OPTION_MARKER, isButtonIcon ? 'icon-menu' : '']">
    <a v-for="(optionAuxDetails, optionName, optionIndex) in dropdownOptions" :key="optionName"
      class="dropdown-item custom-dropdown-item"
      :style="{ color: getDefaultTextColor(optionAuxDetails), display: getOptionDisplayValue(optionName) }"
      :class="getOptionClasses(optionAuxDetails)"
      @mouseenter="mouseEnter(optionAuxDetails, optionIndex)"
      @mouseleave="mouseLeave(optionAuxDetails)">
        <div class="option-text" :class="DROPDOWN_OPTION_MARKER">{{optionName}}</div>
        <font-awesome-icon v-if="isArrowDisplayed(optionAuxDetails)"
          :style="{ color: PASSIVE_FONT_AWESOME_COLOR }"
          class="arrow-right-icon"
          :class="DROPDOWN_OPTION_MARKER"
          icon="angle-right"/>
    </a>
  </div>
</template>

<script lang="ts">
import { DropdownOptionAuxDetails, DropdownOptionAuxDetailsRef, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { MouseEnterMenuContainerOptionEvent, MouseLeaveMenuContainerOptionEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { DROPDOWN_OPTION_MARKER } from '../../../../../../consts/elementClassMarkers';
import BrowserType from '../../../utils/generic/browserType';

interface Consts {
  DROPDOWN_OPTION_MARKER: string;
  DROPDOWN_OPTION_AUX_DETAILS_REF: string;
  BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: WorkshopComponentCss;
  PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS,
}

interface Data {
  isFirstOptionNotDisplayed: boolean;
}

export default {
  setup(): Consts {
    return {
      DROPDOWN_OPTION_MARKER,
      DROPDOWN_OPTION_AUX_DETAILS_REF,
      BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: { paddingBottom: BrowserType.isFirefox() ? '1px !important' : '2px !important' },
      PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS.PASSIVE,
    };
  },
  data: (): Data => ({
    isFirstOptionNotDisplayed: false,
  }),
  mounted(): void {
    const optionNames = Object.keys(this.dropdownOptions);
    this.isFirstOptionNotDisplayed = optionNames[0] === DROPDOWN_OPTION_AUX_DETAILS_REF;
  },
  methods: {
    isMenuBeDisplayed(dropdownOptions: NestedDropdownStructure): boolean {
      return Object.keys(dropdownOptions).length > 0;
    },
    isOptionEnabled(optionAuxDetails: DropdownOptionAuxDetailsRef): boolean {
      return !optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF] || (optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).isEnabled;
    },
    getDefaultTextColor(optionAuxDetails: DropdownOptionAuxDetailsRef): string {
      // color value cannot be set in class because the Dropdown.vue component overwrites it
      return this.isOptionEnabled(optionAuxDetails) ? 'black' : 'grey';
    },
    getOptionClasses(optionAuxDetails: DropdownOptionAuxDetailsRef): string[] {
      const classes = [DROPDOWN_OPTION_MARKER];
      if (this.isButtonIcon) classes.push('icon-dropdown-item');
      classes.push(this.isOptionEnabled(optionAuxDetails) ? 'option-enabled' : 'option-disabled');
      return classes;
    },
    getOptionDisplayValue(optionName: string): string {
        return optionName === DROPDOWN_OPTION_AUX_DETAILS_REF ? 'none !important' : '';
    },
    mouseEnter(optionAuxDetails: DropdownOptionAuxDetailsRef, optionIndex: number): void {
      if (this.isFirstOptionNotDisplayed) optionIndex -= 1;
      const actualObjectName = optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF]?.actualObjectName;
      this.$emit('mouse-enter-option', [
        optionAuxDetails, this.nestedDropdownIndex, optionIndex, actualObjectName, this.isOptionEnabled(optionAuxDetails)] as MouseEnterMenuContainerOptionEvent);
    },
    mouseLeave(optionAuxDetails: DropdownOptionAuxDetailsRef): void {
      const actualObjectName = optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF]?.actualObjectName;
      this.$emit('mouse-leave-option', [event.target as HTMLElement, actualObjectName] as MouseLeaveMenuContainerOptionEvent);
    },
    isArrowDisplayed(optionAuxDetails: DropdownOptionAuxDetailsRef): boolean {
      if (optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF]) {
        return (optionAuxDetails[DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).isEnabled
          && Object.keys(optionAuxDetails).length > 1;
      }
      return Object.keys(optionAuxDetails).length > 0;
    },
  },
  props: {
    dropdownOptions: Object,
    nestedDropdownIndex: Number,
    isButtonIcon: Boolean,
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
  .icon-menu {
    min-width: 0.5rem !important;
  }
  .icon-dropdown-item {
    padding-right: 0 !important;
    padding-left: 0.5rem !important;
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
  .option-disabled {
    cursor: default;
  }
  .option-enabled {
    cursor: pointer;
  }
</style>
