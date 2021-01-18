<template>
  <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu dropdown-menu-options-marker">
    <a v-for="(innerDropdownOptions, optionName, optionIndex) in dropdownOptions" :key="optionName"
      class="dropdown-item custom-dropdown-item dropdown-menu-options-marker"
      @mouseenter="mouseEnter(innerDropdownOptions, optionIndex)"
      @mouseleave="mouseLeave">
        <div class="option-text dropdown-menu-options-marker">{{optionName}}</div><i v-if="innerDropdownOptions" class="dropdown-menu-options-marker" :class="['fa', 'arrow-right', 'fa-angle-right']"></i>
    </a>
  </div>
</template>

<script lang="ts">
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';

export default {
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
  .option-text {
    padding-right: 10px;
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
