<template>
  <div ref="dropdownMenu" class="dropdown-menu custom-dropdown-menu">
    <a v-for="(innerDropdownOptions, optionName, optionIndex) in dropdownOptions" :key="optionName"
      class="dropdown-item custom-dropdown-item"
      @mouseenter="mouseEnter(innerDropdownOptions, optionIndex)"
      @mouseleave="mouseLeave">
        <div>{{optionName}}</div><i v-if="innerDropdownOptions" :class="['fa', 'arrow-right', 'fa-angle-right']"></i>
    </a>
  </div>
</template>

<script lang="ts">
import { OptionMouseEnter, OptionMouseLeave } from '../../../../../../interfaces/dropdownMenuMouseEvents'
import { SubcomponentDropdownStructure } from '../../../../../../interfaces/workshopComponent';

export default {
  methods: {
    mouseEnter(innerDropdownOptions: SubcomponentDropdownStructure, optionIndex: number): void {
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
