import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { subcomponentTypeToPreviewId } from '../../componentOptions/subcomponentTypeToPreviewId';
import { DropdownCompositionAPI } from '../../../../../../../interfaces/dropdownCompositionAPI';
import { Ref } from 'vue';

export default function useSubcomponentDropdownEventHandlers(objectContainingActiveOption: Ref<unknown>, activeModePropertyKeyName: Ref<string>, highlightSubcomponents: Ref<boolean>): DropdownCompositionAPI {

  function toggleSubcomponentPreviewDisplay(subcomponentType: string, displayValue: 'block'|'none'): void {
    if (!highlightSubcomponents.value) return;
    const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
    const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
    if (subcomponentPreviewElement) subcomponentPreviewElement.style.display = displayValue;
  }

  function getOptionNameFromElement(highlightedOptionElement: HTMLElement): string {
    return (highlightedOptionElement.childNodes[0] as HTMLElement).innerHTML;
  }

  function changeOptionThemeBySubcomponentDisplayStatus(dropdowns: NestedDropdownStructure[], optionElement: HTMLElement, dropdownMenuIndex: number, styleProperty: string, valueIfChange: string, valueIfNoChange?: string,
    defaultStyleProperty?: string, defaultValue?: string): void {
    if (dropdownMenuIndex !== undefined && dropdowns[dropdownMenuIndex]) {
      if (typeof dropdowns[dropdownMenuIndex][(optionElement.childNodes[0] as HTMLElement).innerHTML].currentlyDisplaying === 'boolean'
          && !dropdowns[dropdownMenuIndex][((optionElement.childNodes[0] as HTMLElement)).innerHTML].currentlyDisplaying) {
        optionElement.style[styleProperty] = valueIfChange;
      } else {
        if (valueIfNoChange !== undefined) optionElement.style[styleProperty] = valueIfNoChange;
      }
      if (defaultValue !== undefined) optionElement.style[defaultStyleProperty] = defaultValue;
    }
  }

  function changeOptionHighlightColours(dropdowns: NestedDropdownStructure[], optionElementToBeHighlighted: HTMLElement, dropdownMenuIndex: number,
      lastHoveredOptionElement: HTMLElement, lastHoveredOptionElementDropdownMenuIndex: number): void {
    if (lastHoveredOptionElement) {
      changeOptionThemeBySubcomponentDisplayStatus(dropdowns, lastHoveredOptionElement, lastHoveredOptionElementDropdownMenuIndex,
        'color', 'grey', 'black', 'backgroundColor', '');
    }
    changeOptionThemeBySubcomponentDisplayStatus(dropdowns, optionElementToBeHighlighted, dropdownMenuIndex, 'backgroundColor', '#d8dde3');
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