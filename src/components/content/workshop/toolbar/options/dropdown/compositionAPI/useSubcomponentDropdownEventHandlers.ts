import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../../../consts/subcomponentPreviewClasses';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { subcomponentTypeToPreviewId } from '../../componentOptions/subcomponentTypeToPreviewId';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { subcomponentSelectModeState } from '../../subcomponentSelectMode/state';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>, activeModePropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function switchSubcomponentPreviewElementClasses(subcomponentPreviewElement: HTMLElement, displayValue: 'block'|'none'): void {
    if (displayValue === 'block') {
      if (subcomponentPreviewElement.classList.contains(SUBCOMPONENT_PREVIEW_CLASSES.SELECT_MODE_HIDDEN)) {
        subcomponentPreviewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.SELECT_MODE_HIDDEN);
        subcomponentPreviewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
      }
    } else if (displayValue === 'none') {
      if (subcomponentPreviewElement.classList.contains(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT)) {
        subcomponentPreviewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
        subcomponentPreviewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SELECT_MODE_HIDDEN);
      }
    }
  }
  
  function toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
    const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) switchSubcomponentPreviewElementClasses(subcomponentPreviewElement, displayValue);
    if (subcomponentPreviewElement && !subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) subcomponentPreviewElement.style.display = displayValue;
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  function isOptionInactive(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): boolean {
    return typeof dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML].currentlyDisplaying === 'boolean'
      && !dropdowns[dropdownMenuIndex][((optionElement.childNodes[0] as HTMLElement)).innerHTML].currentlyDisplaying
  }

  function resetOptionThemeBySubcomponentDisplayStatus(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): void {
    if (dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex]) {
      optionElement.style.color = isOptionInactive(dropdowns, optionElement, dropdownMenuIndex) ? 'grey' : 'black';
      optionElement.classList.remove('custom-dropdown-item-inactive');
    }
  }

  function changeOptionThemeBySubcomponentDisplayStatus(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): void {
    if (dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex] && isOptionInactive(dropdowns, optionElement, dropdownMenuIndex)) {
      optionElement.classList.add('custom-dropdown-item-inactive');
    }
  }

  function changeOptionHighlightColours(dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void {
    if (lastHoveredOptionElement) {
      resetOptionThemeBySubcomponentDisplayStatus(dropdowns, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
    }
    changeOptionThemeBySubcomponentDisplayStatus(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex);
  }

  const buttonMouseEnterEventHandler = (): void => {
    toggleSubcomponentPreviewDisplay(objectContainingActiveOption.value[activeModePropertyKeyName.value], 'block');
  }
  
  const buttonMouseLeaveEventHandler = (): void => {
    toggleSubcomponentPreviewDisplay(objectContainingActiveOption.value[activeModePropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }

  const mouseLeaveOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const hideDropdownMenuEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (blurredOptionElement: HTMLElement): void => {
    toggleSubcomponentPreviewDisplay(getOptionNameFromElement(blurredOptionElement), 'none');
  }

  const displayHighligtedOptionAndParentMenusEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
    lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }
  
  return {
    buttonMouseEnterEventHandler,
    buttonMouseLeaveEventHandler,
    mouseEnterOptionEventHandler,
    mouseLeaveOptionEventHandler,
    hideDropdownMenuEventHandler,
    mouseEnterAuxiliaryPaddingEventHandler,
    mouseLeaveAuxiliaryPaddingEventHandler,
    displayHighligtedOptionAndParentMenusEventHandler,
  };
}
