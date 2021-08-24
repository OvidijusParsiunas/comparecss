import { LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateChildComponent/updateLayerDropdownOptionNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from './utils/childComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { AddNewGenericComponent } from './add/addNewGenericComponent';
import { AddNewComponentShared } from './add/addNewComponentShared';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewChildComponent extends AddNewComponentShared {

  private static addNewComponent(selectedChildComponent: WorkshopComponent, childComponentBaseName: CHILD_COMPONENTS_BASE_NAMES,
      activeBaseComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure): [WorkshopComponent, Layer] {
    const { componentType, componentStyle, parentLayer, parentComponent,
      } = AddNewGenericComponent.getNewComponentProperties(selectedChildComponent, childComponentBaseName);
    const newComponent = AddNewGenericComponent.addUsingParentDropdownStructure(parentComponent,
      activeBaseComponent, dropdownStructure, componentType, componentStyle, parentLayer);
    // set here because not all child components are removable, but the ones manually added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    return [newComponent, parentLayer];
  }

  private static addNewComponentToLayer(selectedChildComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure, childComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const [newComponent, parentLayer] = AddNewChildComponent.addNewComponent(selectedChildComponent, childComponentBaseName,
      activeBaseComponent, dropdownStructure);
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, activeSubcomponentName } = activeBaseComponent;
    const activeParentComponentOptionName = subcomponentNameToDropdownOptionName[activeSubcomponentName];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(
      activeBaseComponent, dropdownStructure[activeParentComponentOptionName] as NestedDropdownStructure, parentLayer.sections.alignedSections);
    return newComponent;
  }

  private static updateLayerComponentNames(selectedChildComponent: WorkshopComponent): void {
    const numberOfLayers = selectedChildComponent.componentPreviewStructure.layers.length;
    const startingIndex = numberOfLayers === 2 ? 0 : numberOfLayers - 1;
    UpdateLayerDropdownOptionNames.update(selectedChildComponent, startingIndex);
  }

  private static addNewLayerToBase(selectedChildComponent: WorkshopComponent, childComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(selectedChildComponent, ChildComponentBaseNamesToStyles.LAYER_TO_STYLE[childComponentBaseName], true);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    AddNewChildComponent.updateLayerComponentNames(selectedChildComponent);
    newComponent.childComponentsLockedToLayer?.add(selectedChildComponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, childComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): void {
    const selectedSeedComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(childComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewChildComponent.addNewLayerToBase(selectedSeedComponent, childComponentBaseName);
    } else {
      AddNewGenericComponent.addComponentViaDropdownStructureSearch(
        selectedSeedComponent, AddNewChildComponent.addNewComponentToLayer, childComponentBaseName);
    }
  }
}
