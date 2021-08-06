import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateNestedComponentNames/updateLayerDropdownOptionNames';
import { BUTTON_STYLES, DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../consts/componentStyles.enum';
import { ComponentPreviewStructureSearchUtils } from './utils/componentPreviewStractureSearchUtils';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewNestedComponent {

  private static addNewSubcomponent(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES,
      layerName: string): void {
    const nestedComponentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const nestedComponentStyle = nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.CLOSE ? BUTTON_STYLES.CLOSE : DEFAULT_STYLES.DEFAULT;
    const newComponent = AddNewGenericComponent.add(currentlySelectedComponent, nestedComponentType, nestedComponentStyle, layerName);
    // set here because not all nested components are removable, but the ones added by the user are 
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isRemovable = true;
  }

  private static updateGenericComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(currentlySelectedComponent,
      currentlySelectedComponent.activeSubcomponentName);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(currentlySelectedComponent, parentLayer);
  }

  private static addNewSubcomponentToCurrentLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    AddNewNestedComponent.addNewSubcomponent(currentlySelectedComponent, nestedComponentBaseName, currentlySelectedComponent.activeSubcomponentName);
    AddNewNestedComponent.updateGenericComponentNames(currentlySelectedComponent);
  }

  private static addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    const defaultLayer = currentlySelectedComponent.componentPreviewStructure.layers[0];
    AddNewNestedComponent.addNewSubcomponent(currentlySelectedComponent, nestedComponentBaseName, defaultLayer.name);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(currentlySelectedComponent, defaultLayer);
  }

  private static updateLayerComponentNames(currentlySelectedComponent: WorkshopComponent): void {
    const layerComponentsNames = Object.keys(ComponentPreviewStructureSearchUtils.getComponentLayers(currentlySelectedComponent));
    const startingIndex = layerComponentsNames.length === 2 ? 0 : layerComponentsNames.length - 1;
    UpdateLayerDropdownOptionNames.update(currentlySelectedComponent, startingIndex);
  }

  private static addNewLayerToBase(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: string): void {
    // WORK1: change how dropdown menu item is aggregated
    const newComponent = AddNewLayerComponent.add(currentlySelectedComponent, nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM ? LAYER_STYLES.DROPDOWN_ITEM : LAYER_STYLES.CARD, true);
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isRemovable = true;
    AddNewNestedComponent.updateLayerComponentNames(currentlySelectedComponent);
    newComponent.nestedComponentsInLayer?.add(currentlySelectedComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): void {
    // WORK1: extract this if statemt
    const { subcomponentType } = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    if ((subcomponentType === SUBCOMPONENT_TYPES.BASE && nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.LAYER)
        || (subcomponentType === SUBCOMPONENT_TYPES.DROPDOWN_MENU && nestedComponentBaseName === NESTED_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM)) {
      AddNewNestedComponent.addNewLayerToBase(currentlySelectedComponent, nestedComponentBaseName);
    } else if (currentlySelectedComponent.activeSubcomponentName === currentlySelectedComponent.coreSubcomponentNames.base) {
      AddNewNestedComponent.addNewSubcomponentToDefaultBaseLayer(currentlySelectedComponent, nestedComponentBaseName);
    } else {
      AddNewNestedComponent.addNewSubcomponentToCurrentLayer(currentlySelectedComponent, nestedComponentBaseName);
    }
  }
}
