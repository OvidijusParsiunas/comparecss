<template>
  <div ref="dropdownMenu" v-if="isMenuBeDisplayed(dropdownItems)"
    :style="BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE"
    class="dropdown-menu custom-dropdown-menu"
    :class="[DROPDOWN_ITEM_MARKER, isButtonIcon ? 'icon-menu' : '']">
    <a v-for="(itemAuxDetails, itemName, itemIndex) in dropdownItems" :key="itemName"
      class="dropdown-item custom-dropdown-item"
      :style="{ color: getDefaultTextColor(itemAuxDetails), display: getItemDisplayValue(itemName) }"
      :class="getItemClasses(itemAuxDetails)"
      @mouseenter="mouseEnter(itemAuxDetails, itemIndex)"
      @mouseleave="mouseLeave(itemAuxDetails)">
        <div class="item-text" :class="DROPDOWN_ITEM_MARKER">{{itemName}}</div>
        <font-awesome-icon v-if="isArrowDisplayed(itemAuxDetails)"
          :style="{ color: PASSIVE_FONT_AWESOME_COLOR }"
          class="arrow-right-icon"
          :class="DROPDOWN_ITEM_MARKER"
          icon="angle-right"/>
    </a>
  </div>
</template>

<script lang="ts">
import { DropdownItemAuxDetails, DropdownItemAuxDetailsRef, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { MouseEnterMenuContainerItemEvent, MouseLeaveMenuContainerItemEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { DROPDOWN_ITEM_MARKER } from '../../../../../../consts/elementClassMarkers';
import BrowserType from '../../../utils/generic/browserType';

interface Consts {
  DROPDOWN_ITEM_MARKER: string;
  DROPDOWN_ITEM_AUX_DETAILS_REF: string;
  BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: WorkshopComponentCss;
  PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS,
}

interface Data {
  isFirstItemNotDisplayed: boolean;
}

export default {
  setup(): Consts {
    return {
      DROPDOWN_ITEM_MARKER,
      DROPDOWN_ITEM_AUX_DETAILS_REF,
      BROWSER_SPECIFIC_DROPDOWN_MENU_STYLE: { paddingBottom: BrowserType.isFirefox() ? '1px !important' : '2px !important' },
      PASSIVE_FONT_AWESOME_COLOR: FONT_AWESOME_COLORS.PASSIVE,
    };
  },
  data: (): Data => ({
    isFirstItemNotDisplayed: false,
  }),
  mounted(): void {
    const itemNames = Object.keys(this.dropdownItems);
    this.isFirstItemNotDisplayed = itemNames[0] === DROPDOWN_ITEM_AUX_DETAILS_REF;
  },
  methods: {
    isMenuBeDisplayed(dropdownItems: NestedDropdownStructure): boolean {
      return Object.keys(dropdownItems).length > 0;
    },
    isItemEnabled(itemAuxDetails: DropdownItemAuxDetailsRef): boolean {
      return !itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF] || (itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).isEnabled;
    },
    getDefaultTextColor(itemAuxDetails: DropdownItemAuxDetailsRef): string {
      // color value cannot be set in class because the Dropdown.vue component overwrites it
      return this.isItemEnabled(itemAuxDetails) ? 'black' : 'grey';
    },
    getItemClasses(itemAuxDetails: DropdownItemAuxDetailsRef): string[] {
      const classes = [DROPDOWN_ITEM_MARKER];
      if (this.isButtonIcon) classes.push('icon-dropdown-item');
      classes.push(this.isItemEnabled(itemAuxDetails) ? 'item-enabled' : 'item-disabled');
      return classes;
    },
    getItemDisplayValue(itemName: string): string {
        return itemName === DROPDOWN_ITEM_AUX_DETAILS_REF ? 'none !important' : '';
    },
    mouseEnter(itemAuxDetails: DropdownItemAuxDetailsRef, itemIndex: number): void {
      if (this.isFirstItemNotDisplayed) itemIndex -= 1;
      const actualObjectName = itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF]?.actualObjectName;
      this.$emit('mouse-enter-item', [
        itemAuxDetails, this.nestedDropdownIndex, itemIndex, actualObjectName, this.isItemEnabled(itemAuxDetails)] as MouseEnterMenuContainerItemEvent);
    },
    mouseLeave(itemAuxDetails: DropdownItemAuxDetailsRef): void {
      const actualObjectName = itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF]?.actualObjectName;
      this.$emit('mouse-leave-item', [event.target as HTMLElement, actualObjectName] as MouseLeaveMenuContainerItemEvent);
    },
    isArrowDisplayed(itemAuxDetails: DropdownItemAuxDetailsRef): boolean {
      if (itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF]) {
        return (itemAuxDetails[DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).isEnabled
          && Object.keys(itemAuxDetails).length > 1;
      }
      return Object.keys(itemAuxDetails).length > 0;
    },
  },
  props: {
    dropdownItems: Object,
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
  .item-text {
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
  .item-disabled {
    cursor: default;
  }
  .item-enabled {
    cursor: pointer;
  }
</style>
