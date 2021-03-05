import { expandedModalPreviewModeState } from '../../../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { subcomponentAndOverlayElementIdsState } from '../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { CUSTOM_DROPDOWN_OPTION_CLASSES } from '../../../../../../../consts/customDropdownOptionClasses.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>, activeOptionPropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function toggleSubcomponentOverlayDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentType(subcomponentType as SUB_COMPONENTS);
    const subcomponentOverlayElement = document.getElementById(subcomponentOverlayElementId);
    if (subcomponentOverlayElement) subcomponentOverlayElement.style.display = displayValue;
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  function isOptionInactive(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): boolean {
    return typeof dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML].currentlyDisplaying === 'boolean'
      && !dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML].currentlyDisplaying
  }

  function resetOptionThemeBySubcomponentDisplayStatus(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): void {
    if (dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex]) {
      optionElement.style.color = isOptionInactive(dropdowns, optionElement, dropdownMenuIndex) ? 'grey' : 'black';
      optionElement.classList.remove(CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE);
    }
  }

  function changeOptionThemeBySubcomponentDisplayStatus(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number): void {
    if (dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex] && isOptionInactive(dropdowns, optionElement, dropdownMenuIndex)) {
      optionElement.classList.add(CUSTOM_DROPDOWN_OPTION_CLASSES.INACTIVE);
    }
  }

  function changeOptionHighlightColours(dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void {
    if (lastHoveredOptionElement) {
      resetOptionThemeBySubcomponentDisplayStatus(dropdowns, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
    }
    changeOptionThemeBySubcomponentDisplayStatus(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex);
  }

  const mouseEnterButtonEventHandler = (): void => {
    if (!expandedModalPreviewModeState.getIsTransitionPreviewInProgressState()) {
      toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'block'); 
    }
  }
  
  const mouseLeaveButtonEventHandler = (): void => {
    toggleSubcomponentOverlayDisplay(objectContainingActiveOption.value[activeOptionPropertyKeyName.value], 'none');
  }

  const mouseEnterOptionEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }

  const mouseLeaveOptionEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const hideDropdownMenuEventHandler = (optionElementToBeHighlighted: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'none');
  }

  const mouseEnterAuxiliaryPaddingEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(optionElementToBeHighlighted), 'block');
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }

  const mouseLeaveAuxiliaryPaddingEventHandler = (blurredOptionElement: HTMLElement): void => {
    toggleSubcomponentOverlayDisplay(getOptionNameFromElement(blurredOptionElement), 'none');
  }

  const displayHighlightedOptionAndParentMenusEventHandler = (dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
    lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void => {
    changeOptionHighlightColours(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex);
  }
  
  return {
    mouseEnterButtonEventHandler,
    mouseLeaveButtonEventHandler,
    mouseEnterOptionEventHandler,
    mouseLeaveOptionEventHandler,
    hideDropdownMenuEventHandler,
    mouseEnterAuxiliaryPaddingEventHandler,
    mouseLeaveAuxiliaryPaddingEventHandler,
    displayHighlightedOptionAndParentMenusEventHandler,
  };
}
