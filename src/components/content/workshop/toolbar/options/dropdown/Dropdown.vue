<template>
  <div v-if="isComponentDisplayed" class="dropdown">
    <button ref="button"
      type="button"
      class="btn form-control dropdown-button"
      :class="getButtonClasses()"
      @click="buttonClick"
      @mouseenter="mouseEnterButton"
      @mouseleave="mouseLeaveButton">
      <div v-if="!consistentButtonContent || !consistentButtonContent.backgroundIconClass" class="dropdown-button-text" :class="uniqueIdentifier">
        {{buttonText}}
      </div>
      <font-awesome-icon :style="getFontAwesomeIconStyle()"
        class="arrow-down-icon"
        :class="getFontAwesomeIconClasses()"
        :icon="getFontAwesomeIcon()"/>
    </button>
    <div :style="getAuxiliaryPaddingStyle()"
      class="auxiliary-padding dropdown-menu-items-marker"
      :class="uniqueIdentifier"
      @click="buttonClick"
      @mouseenter="mouseEnterAuxiliaryPadding"
      @mouseleave="mouseLeaveAuxiliaryPadding">
    </div>
    <div ref="dropdownMenus"
      @mouseleave="mouseLeaveDropdown">
      <dropdown-menu v-for="(dropdownItems, index) in dropdowns" :key="dropdownItems"
        :dropdownItems="dropdownItems"
        :nestedDropdownIndex="index"
        :isButtonIcon="!!(consistentButtonContent && consistentButtonContent.backgroundIconClass)"
        @mouse-enter-item="mouseEnterItem"
        @mouse-leave-item="mouseLeaveItem"/>
    </div>
  </div>
</template>

<script lang="ts">
import { MouseClickNewItemEvent, MouseClickItemEvent, MouseEnterMenuContainerItemEvent, MouseEnterItemEvent, MouseLeaveMenuContainerItemEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { DropdownItemAuxDetails, DropdownItemAuxDetailsRef, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { DropdownItemsDisplayStatusUtils } from '../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { COMPONENT_CARD_MARKER, DROPDOWN_ITEM_MARKER, RANGE_SETTING_MARKER } from '../../../../../../consts/elementClassMarkers';
import { CUSTOM_DROPDOWN_ITEM_CLASSES } from '../../../../../../consts/customDropdownItemClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { DropdownCompositionAPI } from '../../../../../../interfaces/dropdownCompositionAPI';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { WorkshopComponentCss } from '../../../../../../interfaces/workshopComponentCss';
import { TOOLBAR_GENERAL_BUTTON_CLASS } from '../../../../../../consts/toolbarClasses';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import BrowserType from '../../../utils/generic/browserType';
import dropdownMenu from './DropdownMenu.vue';
import { Ref, ref, watch } from 'vue';

interface Data {
  isComponentDisplayed: boolean;
  lastHoveredItemText: string;
  dropdowns: NestedDropdownStructure[];
  lastHoveredItemElement: HTMLElement;
  enterButtonClicked: boolean;
  areMenusDisplayed: boolean;
  clickedButton: boolean;
  dropdownDisplayDelayMilliseconds: number;
  areDropdownItemsProcessed: boolean;
  TOOLBAR_GENERAL_BUTTON_CLASS: string;
  fontAwesomeIconColor: string;
  processedItems: NestedDropdownStructure[];
}

interface Props {
  isNested: boolean;
  uniqueIdentifier: string;
  fontAwesomeIcon: string;
  minItemsToDisplayDropdown: number;
  activeItemPropertyKeyName: string;
  objectContainingActiveItem: unknown;
  dropdownItems: NestedDropdownStructure;
  customEventHandlers: (param1: Ref<unknown>, param2: Ref<string>) => DropdownCompositionAPI;
}

interface SearchForItemResultData {
  dropdowns: NestedDropdownStructure[];
  itemIndexes: number[];
}

type SearchForItemResult = SearchForItemResultData | null;

export default {
  data: (): Data => ({
    dropdowns: [],
    clickedButton: false,
    processedItems: [],
    areMenusDisplayed: false,
    enterButtonClicked: false,
    isComponentDisplayed: true,
    lastHoveredItemText: null,
    TOOLBAR_GENERAL_BUTTON_CLASS,
    lastHoveredItemElement: null,
    areDropdownItemsProcessed: false,
    dropdownDisplayDelayMilliseconds: BrowserType.isChromium() ? 10 : 13,
    fontAwesomeIconColor: FONT_AWESOME_COLORS.DEFAULT,
  }),
  setup(props: Props): DropdownCompositionAPI {
    // If you want to pass down a data variable into compositionAPI, use the code below and pass areMenusDisplayed into the customEventHandlers function and return customEventHandlers
    // const areMenusDisplayed: Ref<boolean> = ref(false);
    const objectContainingActiveItemRef: Ref<Props['objectContainingActiveItem']> = ref(props.objectContainingActiveItem);
    const activeModePropertyKeyNameRef: Ref<Props['activeItemPropertyKeyName']> = ref(props.activeItemPropertyKeyName);
    let customEventHandlers = {} as DropdownCompositionAPI;
    if (props.customEventHandlers) {
      watch(() => props.objectContainingActiveItem, (newObjectContainingActiveItem) => {
        objectContainingActiveItemRef.value = newObjectContainingActiveItem;
      });
      watch(() => props.activeItemPropertyKeyName, (newActiveModePropertyKeyName) => {
        activeModePropertyKeyNameRef.value = newActiveModePropertyKeyName;
      });
      customEventHandlers = props.customEventHandlers(objectContainingActiveItemRef, activeModePropertyKeyNameRef);
    }
    return {
      ...customEventHandlers,
    };
  },
  computed: {
    buttonText(): void {
      return this.consistentButtonContent?.text || this.getItemName(this.objectContainingActiveItem[this.activeItemPropertyKeyName]);
    }
  },
  mounted(): void {
    if (!this.areDropdownItemsProcessed) this.processDropdownItems();
    this.setIsDropdownDisplayed();
    this.fontAwesomeIconColor = this.displayArrowOnMouseEnter ? FONT_AWESOME_COLORS.WHITE : FONT_AWESOME_COLORS.DEFAULT;
  },
  methods: {
    getItemName(dropdownItemName: string): void {
      return this.itemNameMap ? this.itemNameMap[dropdownItemName] : dropdownItemName;
    },
    getButtonClasses(): string[] {
      const classes = [this.uniqueIdentifier, TOOLBAR_GENERAL_BUTTON_CLASS];
      if (this.consistentButtonContent?.backgroundIconClass) {
        classes.push(this.consistentButtonContent.backgroundIconClass, 'dropdown-button-icon');
      }
      if (this.additionalButtonClasses) classes.push(this.additionalButtonClasses);
      return classes;
    },
    getFontAwesomeIconStyle(): WorkshopComponentCss {
      return { color: this.fontAwesomeIconColor };
    },
    getFontAwesomeIconClasses(): string[] {
      return this.consistentButtonContent?.backgroundIconClass ? ['arrow-bottom-right-corner-icon'] : [];
    },
    getFontAwesomeIcon(): string {
      return this.consistentButtonContent?.backgroundIconClass ? 'caret-down' : this.fontAwesomeIcon;
    },
    setArrowIconTransitionProperty(): void {
      setTimeout(() => { if (this.$refs.button) this.changeArrowIconProperty(this.$refs.button, 'transition', 'all 0.3s'); });
    },
    buttonClick(): void {
      if (this.timeoutFunc) { 
        this.timeoutFunc(this.openDropdown.bind(this));
      } else {
        this.openDropdown();
      }
    },
    openDropdown(): void {
      if (this.enterButtonClicked || this.clickedButton) {
        this.enterButtonClicked = false;
        this.clickedButton = false;
        return;
      }
      this.displayHighlightedItemAndParentMenus();
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.hideDropdownMenu };
      this.$emit('hide-dropdown-menu-callback', workshopEventCallback);
      this.areMenusDisplayed = true;
    },
    displayHighlightedItemAndParentMenus(): void {
      if (!this.objectContainingActiveItem) {
        this.displayParentMenu();
        return;
      }
      const objectActiveItemName = this.objectContainingActiveItem[this.activeItemPropertyKeyName];
      const dropdownItemName = this.getItemName(objectActiveItemName);
      const actualObjectName = dropdownItemName !== objectActiveItemName ? objectActiveItemName : null;
      const results: SearchForItemResult = this.searchForOpion(this.processedItems, dropdownItemName, 0, actualObjectName);
      if (results) {
        const { dropdowns, itemIndexes } = results;
        for (let i = 0; i < dropdowns.length; i++) {
          const dropdown = dropdowns[i];
          const parentDropdownIndex = i - 1;
          const parentItemIndex = itemIndexes[i - 1];
          setTimeout(() => {
            let parentItemElement = this.$refs.dropdownMenus.childNodes[parentDropdownIndex + 1]?.childNodes[parentItemIndex + 1];
            if (!parentItemElement) {
              this.displayParentMenu();
            } else {
              // this is a bug fix for when the parentItemIndex is incorrectly increased by one when there is an extra element generated at the start
              // due to dropdownItemAuxiliaryDetailsReferenceObject property being placed at the start of the dropdownItems object (with display still set to none) 
              const parentItemIndexWithoutAuxInfo = this.$refs.dropdownMenus.childNodes[parentDropdownIndex + 1].childNodes[1].style.display === 'none'
                ? parentItemIndex - 1 : parentItemIndex;
              this.displayChildDropdownMenu(parentItemElement, parentDropdownIndex, parentItemIndexWithoutAuxInfo, dropdown);
            }
          }, i * this.dropdownDisplayDelayMilliseconds);
        }
        setTimeout(() => {
          const itemElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[dropdowns.length]?.childNodes[itemIndexes[itemIndexes.length - 1] + 1];
          this.highlightNewItem(itemElementToBeHighlighted, dropdowns.length - 1);
        }, (dropdowns.length - 1) * this.dropdownDisplayDelayMilliseconds);
      }
    },
    isItemFound(dropdownItemDisplayStatus: DropdownItemAuxDetailsRef, actualObjectName: string): boolean {
      let actualObjectNameMatch = true;
      if (actualObjectName) actualObjectNameMatch = actualObjectName === dropdownItemDisplayStatus?.[DROPDOWN_ITEM_AUX_DETAILS_REF].actualObjectName;
      return dropdownItemDisplayStatus !== undefined && actualObjectNameMatch;
    },
    searchForOpion(dropdownItems: NestedDropdownStructure, dropdownItemName: string, dropdownItemsIndex: number, actualObjectName?: string): SearchForItemResult {
      if (!dropdownItems) return null;
      const itemNames = Object.keys(dropdownItems);
      if (this.isItemFound(dropdownItems[dropdownItemName], actualObjectName)) {
        return { dropdowns: [dropdownItems], itemIndexes: [Object.keys(dropdownItems).indexOf(dropdownItemName)] };
      } else {
        const childDropdownIndex = dropdownItemsIndex + 1;
        for (let i = 0; i <= itemNames.length; i += 1) {
          const itemName = itemNames[i];
          if (itemName !== DROPDOWN_ITEM_AUX_DETAILS_REF && itemName !== dropdownItemName) {
            const result: SearchForItemResult = this.searchForOpion(dropdownItems[itemName], dropdownItemName, childDropdownIndex, actualObjectName);
            if (result) {
              result.dropdowns.unshift(dropdownItems);
              result.itemIndexes.unshift(i);
              return result;
            }
          }
        }
      }
      return null;
    },
    changeArrowIconProperty(buttonElemenet: HTMLElement, propertyName: string, newValue: string): void {
      const HTMLElements = Array.from(buttonElemenet.childNodes) as HTMLElement[];
      const arrowIconHTMLElement = HTMLElements.find((element) => element && element.style);
      arrowIconHTMLElement.style[propertyName] = newValue;
    },
    mouseEnterButton(): void {
      if (this.mouseEnterButtonEventHandler) this.mouseEnterButtonEventHandler();
      if (this.displayArrowOnMouseEnter) this.fontAwesomeIconColor = FONT_AWESOME_COLORS.DEFAULT;
      this.$emit('mouse-enter-button');
    },
    mouseLeaveButton(): void {
      if (this.mouseLeaveButtonEventHandler) this.mouseLeaveButtonEventHandler();
      if (this.displayArrowOnMouseEnter) this.fontAwesomeIconColor = FONT_AWESOME_COLORS.WHITE;
      this.$emit('mouse-leave-button');
    },
    getAuxiliaryPaddingStyle(): WorkshopComponentCss {
      return { pointerEvents: this.areMenusDisplayed ? '' : 'none' };
    },
    mouseEnterAuxiliaryPadding(): void {
      if (this.areMenusDisplayed && !this.consistentButtonContent) {
        this.removeChildDropdownMenus(0);
        const itemElementToBeHighlighted = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (!itemElementToBeHighlighted) return;
        this.displayChildDropdownMenu(itemElementToBeHighlighted, 0, 0, this.processedItems[Object.keys(this.processedItems)[0]]);
        if (this.mouseEnterAuxiliaryPaddingEventHandler) {
          const itemNameToBehighlighted = this.getItemName(this.extractHighlightedItemText(itemElementToBeHighlighted));
          this.mouseEnterAuxiliaryPaddingEventHandler(itemNameToBehighlighted);
          }
        this.highlightNewItem(itemElementToBeHighlighted, 0);
      }
    },
    mouseLeaveAuxiliaryPadding(): void {
      if (this.areMenusDisplayed) {
        const blurredItemElement = this.$refs.dropdownMenus.childNodes[1].childNodes[1];
        if (this.mouseLeaveAuxiliaryPaddingEventHandler) {
          const blurredItemName = this.getItemName(this.extractHighlightedItemText(blurredItemElement));
          this.mouseLeaveAuxiliaryPaddingEventHandler(blurredItemName);
        }
      }
    },
    mouseLeaveDropdown(): void {
      // when there is no nesting - the highlight is set to disappear when user mouse leaves the dropdown
      if (!this.isNested && this.lastHoveredItemElement) {
        this.resetLastHighlightedItemStyle();
        this.lastHoveredItemElement = null;
        this.lastHoveredItemText = null;
      }
      this.$emit('mouse-leave-dropdown');
    },
    extractHighlightedItemText(itemElement: HTMLElement): string {
      return (itemElement.childNodes[0] as HTMLElement).innerHTML;
    },
    mouseEnterItem(itemMouseEnterEvent: MouseEnterMenuContainerItemEvent): void {
      const [dropdownItems, dropdownMenuIndex, dropdownItemIndex, actualObjectName, isItemEnabled] = itemMouseEnterEvent;
      const itemElement = event.target;
      this.removeChildDropdownMenus(dropdownMenuIndex);
      this.displayChildDropdownMenu(itemElement, dropdownMenuIndex, dropdownItemIndex, dropdownItems);
      const highlightedItem = actualObjectName || this.extractHighlightedItemText(itemElement);
      const mouseEnterItemEvent: MouseEnterItemEvent = [highlightedItem, isItemEnabled];
      if (this.mouseEnterItemEventHandler) { this.mouseEnterItemEventHandler(mouseEnterItemEvent); }
      this.$emit('mouse-enter-item', mouseEnterItemEvent);
      this.highlightNewItem(itemElement, dropdownMenuIndex);
      this.lastHoveredItemText = highlightedItem;
    },
    removeChildDropdownMenus(dropdownMenuIndex: number): void {
      const removableDropdownMenusIndex = dropdownMenuIndex + 1;
      if (this.dropdowns.length > removableDropdownMenusIndex) {
        this.dropdowns.splice(removableDropdownMenusIndex, this.dropdowns.length);
      }
    },
    displayParentMenu(): void {
      this.dropdowns.push(this.processedItems);
      setTimeout(() => {
        this.$refs.dropdownMenus.childNodes[1].style.display = 'block';
      });
    },
    displayChildDropdownMenu(parentItemElement: HTMLElement, parentDropdownMenuIndex: number, parentDropdownItemIndex: number,
        childDropdownItems: NestedDropdownStructure | DropdownItemAuxDetailsRef): void {
      if (!parentItemElement || !(parentItemElement instanceof Element)) return;
      if (!childDropdownItems[DROPDOWN_ITEM_AUX_DETAILS_REF]
          || (Object.keys(childDropdownItems).length > 1 && (childDropdownItems[DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).isEnabled)) {
        this.dropdowns.push(childDropdownItems);
        const startOfLeftPropertyValueNumber = 11;
        const dropdownMenuElement = parentItemElement.parentNode as HTMLElement;
        const topStyleValueRaw = dropdownMenuElement.style.top;
        const leftStyleValueRaw = dropdownMenuElement.style.left;
        const topStyleValueParsed = Number.parseInt(topStyleValueRaw.substring(startOfLeftPropertyValueNumber, topStyleValueRaw.length)) || 0;
        const leftStyleValueParsed = Number.parseInt(leftStyleValueRaw) || 0;
        const currentDropdownMenuWidth = dropdownMenuElement.offsetWidth;
        const itemHeight = Number.parseFloat(window.getComputedStyle(parentItemElement).height);
        setTimeout(() => {
          const newChildDropdownMenuElemIndex = parentDropdownMenuIndex + 2;
          // if the user moves the mouse into an item that has children and quickly moves it back to its parent dropdown, the new child dropdown that was triggered to display
          // here no longer exists
          if (!this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex]?.style) return;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.top = `calc(100% + ${(parentDropdownItemIndex * itemHeight) + topStyleValueParsed}px)`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.left = `${currentDropdownMenuWidth + leftStyleValueParsed}px`;
          this.$refs.dropdownMenus.childNodes[newChildDropdownMenuElemIndex].style.display = 'block';
        });
      }
    },
    highlightNewItem(itemElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number): void {
      if (!itemElementToBeHighlighted) return;
      if (this.lastHoveredItemElement) { this.resetLastHighlightedItemStyle(); }
      this.setNewHighligtedItemStyle(this.dropdowns, itemElementToBeHighlighted, dropdownMenuIndex);
      this.lastHoveredItemElement = itemElementToBeHighlighted;
    },
    resetLastHighlightedItemStyle(): void {
      this.lastHoveredItemElement.classList.remove(CUSTOM_DROPDOWN_ITEM_CLASSES.ACTIVE);
      if (this.lastHoveredItemElement.classList.contains(CUSTOM_DROPDOWN_ITEM_CLASSES.INACTIVE)) {
        this.lastHoveredItemElement.style.color = 'grey';
        this.lastHoveredItemElement.classList.remove(CUSTOM_DROPDOWN_ITEM_CLASSES.INACTIVE);
      } else {
        this.lastHoveredItemElement.style.color = 'black';
      }
      // bug fix for resetting item colour when user clicks and drags an item
      if (!document.activeElement.classList.contains(this.uniqueIdentifier)) this.lastHoveredItemElement.classList.add(CUSTOM_DROPDOWN_ITEM_CLASSES.DEFAULT);
      this.changeItemArrowColor(this.lastHoveredItemElement, '#6d6d6d');
    },
    setNewHighligtedItemStyle(dropdowns: NestedDropdownStructure[], itemElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number): void {
      if (!itemElementToBeHighlighted) return;
      const highlightedElementBackgroundClass = dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex]
        && this.isItemInactive(dropdowns, itemElementToBeHighlighted, dropdownMenuIndex)
        ? CUSTOM_DROPDOWN_ITEM_CLASSES.INACTIVE : CUSTOM_DROPDOWN_ITEM_CLASSES.ACTIVE;
      itemElementToBeHighlighted.classList.add(highlightedElementBackgroundClass);
      itemElementToBeHighlighted.style.color = 'white';
      this.changeItemArrowColor(itemElementToBeHighlighted, 'white');
    },
    isItemInactive(dropdowns: NestedDropdownStructure[], itemElement: HTMLElement, dropdownMenuIndex: number): boolean {
      return dropdowns[dropdownMenuIndex][(itemElement.childNodes[0] as HTMLElement)?.innerHTML]?.[DROPDOWN_ITEM_AUX_DETAILS_REF]
        && !(dropdowns[dropdownMenuIndex][(itemElement.childNodes[0] as HTMLElement).innerHTML][DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).isEnabled;
    },
    changeItemArrowColor(itemElement: Element, newColor: 'white'|'#6d6d6d'): void {
      const arrowElement = itemElement.childNodes[1];
      if (arrowElement instanceof Element || arrowElement instanceof HTMLDocument) {
        (arrowElement as HTMLElement).style.color = newColor;
      }
    },
    getItemNameFromElement(highlightedItemElement: HTMLElement): string {
      return (highlightedItemElement.childNodes[0] as HTMLElement).innerHTML;
    },
    mouseLeaveItem(itemMouseLeaveEvent: MouseLeaveMenuContainerItemEvent): void {
      const [blurredItemElement, actualObjectName] = itemMouseLeaveEvent;
      const blurredItem = actualObjectName || this.extractHighlightedItemText(blurredItemElement);
      if (this.mouseLeaveItemEventHandler) {
        this.mouseLeaveItemEventHandler(actualObjectName || this.extractHighlightedItemText(blurredItemElement));
      }
      this.$emit('mouse-leave-item', blurredItem);
    },
    hideDropdownMenu(event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
      if (event.type === 'mousedown' && this.isIgnoreOnMouseDown((event.target as HTMLElement).classList)) {
        return { shouldRepeat: true };
      }
      let closedViaKey = false;
      if (event instanceof KeyboardEvent) {
        if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
          this.enterButtonClicked = true;
        }
        closedViaKey = true;
      }
      if ((event.target as HTMLElement).classList.contains(DROPDOWN_ITEM_MARKER) || this.enterButtonClicked) {
        if (this.lastHoveredItemText) {
          const previousActiveItemName = this.objectContainingActiveItem?.[this.activeItemPropertyKeyName];
          const isItemEnabled = !this.lastHoveredItemElement.classList.contains(CUSTOM_DROPDOWN_ITEM_CLASSES.INACTIVE);
          if (previousActiveItemName !== this.lastHoveredItemText) {
            this.$emit('mouse-click-new-item', [this.lastHoveredItemText, isItemEnabled] as MouseClickNewItemEvent);
          }
          this.$emit('mouse-click-item', [previousActiveItemName, this.lastHoveredItemText, isItemEnabled] as MouseClickItemEvent);
        }
      }
      const isDropdownButtonClicked = (event.target as HTMLElement).classList.contains(this.uniqueIdentifier);
      if (isDropdownButtonClicked && !closedViaKey) {
        this.clickedButton = true;
      }
      if (!isDropdownButtonClicked || closedViaKey) {
        if (this.hideDropdownMenuEventHandler && this.lastHoveredItemText) {
          this.hideDropdownMenuEventHandler(this.lastHoveredItemText);
        } else {
          this.$emit('hide-dropdown-menu');
        }
      }
      this.dropdowns = [];
      this.areMenusDisplayed = false;
      return { shouldRepeat: false };
    },
    isIgnoreOnMouseDown(targetElementClassList: DOMTokenList): boolean {
      return !targetElementClassList.contains(COMPONENT_CARD_MARKER) && !targetElementClassList.contains(RANGE_SETTING_MARKER);
    },
    hideFirstMenu(): void {
      this.$refs.dropdownMenus.childNodes[1].style.display = 'none';
    },
    processDropdownItems(): void {
      if (this.dropdownItems) {
        if (!this.isNested) {
          this.changeDropdownItemsToAppropriateStructure();
        } else {
          this.processedItems = this.dropdownItems;
        }
        this.areDropdownItemsProcessed = true;
      }
    },
    changeDropdownItemsToAppropriateStructure(): void {
      const resultObject = {};
      Object.keys(this.dropdownItems).forEach((keyName) => {
        resultObject[keyName] = this.dropdownItems[keyName]?.[DROPDOWN_ITEM_AUX_DETAILS_REF]
          ? this.dropdownItems[keyName] : DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject();
      });
      this.processedItems = resultObject;
    },
    setIsDropdownDisplayed(): void {
      if (this.isNested) {
        this.isComponentDisplayed = !!this.dropdownItems;
      } else {
        this.isComponentDisplayed = Object.keys(this.dropdownItems).length >= this.minItemsToDisplayDropdown;
      }
      this.$emit('is-component-displayed', this.isComponentDisplayed);
    },
  },
  components: {
    dropdownMenu,
  },
  // THIS COMPONENT OFFERS A TWO-WAY API, MOUSE EVENTS CAN BE EITHER PASSED IN
  // OR LISTENED TO VIA EVENT EMITTERS
  props: {
    dropdownItems: Object,
    objectContainingActiveItem: Object,
    activeItemPropertyKeyName: String,
    fontAwesomeIcon: String,
    // this is used to allow the dropdown to close when clicked on other dropdowns
    uniqueIdentifier: String,
    // the dev has two items, either insert custom event handlers object via composition API (which should adhere to DropdownCompositionAPI)
    // or listen to the emitted events
    customEventHandlers: Function,
    itemNameMap: Object,
    isNested: {
      type: Boolean,
      default: false,
    },
    timeoutFunc: Function,
    minItemsToDisplayDropdown: {
      type: Number,
      default: 2,
    },
    consistentButtonContent: Object,
    additionalButtonClasses: Array,
    displayArrowOnMouseEnter: Boolean,
    callWatchWhenDropdownItemsValueChangeDetectionTriggered: Object,
  },
  watch: {
    callWatchWhenDropdownItemsValueChangeDetectionTriggered(): void {
      this.processDropdownItems();
      this.setArrowIconTransitionProperty();
    },
    objectContainingActiveItem(): void {
      this.processDropdownItems();
    },
    dropdownItems(): void {
      this.setIsDropdownDisplayed();
    }
  }
};
</script>

<style lang="css" scoped>
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.7rem;
    border: 1px solid  #aaaaaa !important;
    background-color: white !important;
    overflow: hidden;
  }
  .dropdown-button-icon {
    min-width: 2.3rem;
    padding-right: 1px !important;
  }
  .dropdown-button-text {
    float: left;
    padding-left: 2px;
  }
  .arrow-down-icon {
    float: right;
    margin-top: 0.3em;
    padding-left: 7px;
    width: 16.5px;
    pointer-events: none;
  }
  .arrow-bottom-right-corner-icon {
    margin-top: 19px;
    width: 15px;
    transform: rotate(315deg);
  }
  .auxiliary-padding {
    top: 38px;
    height: 3px;
    width: 100%;
    z-index: 9990;
    position: absolute;
    cursor: pointer;
  }
</style>
