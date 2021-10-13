import { LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateGenericComponentDropdownItemNames } from '../updateChildComponent/updateGenericComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { UpdateLayerDropdownItemNames } from '../updateChildComponent/updateLayerDropdownItemNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from './utils/childComponentBaseNamesToStyles';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { AddContainerComponent } from './add/addContainerComponent';
import { AddComponentShared } from './add/addComponentShared';
import { AddLayerComponent } from './add/addLayerComponent';

export class AddChildComponent extends AddComponentShared {

  private static addNewComponent(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES,
      dropdownStructure: NestedDropdownStructure): [WorkshopComponent, Layer] {
    const { componentType, componentStyle, parentLayer, containerComponent,
      } = AddComponentShared.getNewComponentProperties(activeComponent, newComponentBaseName);
    const newComponent = AddContainerComponent.addUsingParentDropdownStructure(containerComponent,
      dropdownStructure, componentType, componentStyle, parentLayer);
    // set here because not all child components are removable, but the ones manually added by the user are
    newComponent.baseSubcomponent.isRemovable = true;
    return [newComponent, parentLayer];
  }

  private static addNewComponentToLayerIfItemFound(activeComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const [newComponent, parentLayer] = AddChildComponent.addNewComponent(activeComponent, newComponentBaseName, dropdownStructure);
    const { componentPreviewStructure: { subcomponentNameToDropdownItemName }, activeSubcomponentName } = activeComponent.masterComponent;
    const activeContainerComponentItemName = subcomponentNameToDropdownItemName[activeSubcomponentName];
    UpdateGenericComponentDropdownItemNames.updateViaParentLayerDropdownStructure(activeComponent.masterComponent,
      dropdownStructure[activeContainerComponentItemName] as NestedDropdownStructure, parentLayer.sections.alignedSections);
    return newComponent;
  }

  private static updateLayerComponentNames(activeComponent: WorkshopComponent): void {
    const numberOfLayers = activeComponent.componentPreviewStructure.layers.length;
    const startingIndex = numberOfLayers === 2 ? 0 : numberOfLayers - 1;
    UpdateLayerDropdownItemNames.update(activeComponent, startingIndex);
  }

  private static addNewLayerToBase(activeComponent: WorkshopComponent, newComponentBaseName: string): void {
    const newComponent = AddLayerComponent.add(activeComponent, ChildComponentBaseNamesToStyles.LAYER_TO_STYLE[newComponentBaseName], true);
    newComponent.baseSubcomponent.isRemovable = true;
    AddChildComponent.updateLayerComponentNames(activeComponent);
    newComponent.newChildComponents.childComponentsLockedToLayer?.add(newComponent, activeComponent);
  }

  public static add(masterComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): void {
    const activeComponent = masterComponent.subcomponents[masterComponent.activeSubcomponentName].seedComponent;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(newComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddChildComponent.addNewLayerToBase(activeComponent, newComponentBaseName);
    } else {
      TraverseComponentViaDropdownStructure.traverseUsingComponent(
        activeComponent, AddChildComponent.addNewComponentToLayerIfItemFound, newComponentBaseName);
    }
  }
}
