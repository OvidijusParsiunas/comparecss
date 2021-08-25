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

  private static addNewComponent(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES,
      activeComponentParent: WorkshopComponent, dropdownStructure: NestedDropdownStructure): [WorkshopComponent, Layer] {
    const { componentType, componentStyle, parentLayer, parentComponent,
      } = AddNewGenericComponent.getNewComponentProperties(activeComponent, newComponentBaseName);
    const newComponent = AddNewGenericComponent.addUsingParentDropdownStructure(parentComponent,
      activeComponentParent, dropdownStructure, componentType, componentStyle, parentLayer);
    // set here because not all child components are removable, but the ones manually added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    return [newComponent, parentLayer];
  }

  private static addNewComponentToLayer(activeComponent: WorkshopComponent, activeComponentParent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const [newComponent, parentLayer] = AddNewChildComponent.addNewComponent(activeComponent, newComponentBaseName,
      activeComponentParent, dropdownStructure);
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, activeSubcomponentName } = activeComponentParent;
    const activeParentComponentOptionName = subcomponentNameToDropdownOptionName[activeSubcomponentName];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(
      activeComponentParent, dropdownStructure[activeParentComponentOptionName] as NestedDropdownStructure, parentLayer.sections.alignedSections);
    return newComponent;
  }

  private static updateLayerComponentNames(activeComponent: WorkshopComponent): void {
    const numberOfLayers = activeComponent.componentPreviewStructure.layers.length;
    const startingIndex = numberOfLayers === 2 ? 0 : numberOfLayers - 1;
    UpdateLayerDropdownOptionNames.update(activeComponent, startingIndex);
  }

  private static addNewLayerToBase(activeComponent: WorkshopComponent, newComponentBaseName: string): void {
    const newComponent = AddNewLayerComponent.add(activeComponent, ChildComponentBaseNamesToStyles.LAYER_TO_STYLE[newComponentBaseName], true);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    AddNewChildComponent.updateLayerComponentNames(activeComponent);
    newComponent.childComponentsLockedToLayer?.add(activeComponent);
  }

  public static add(masterComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): void {
    const activeComponent = masterComponent.subcomponents[masterComponent.activeSubcomponentName].seedComponent.ref;
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(newComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewChildComponent.addNewLayerToBase(activeComponent, newComponentBaseName);
    } else {
      AddNewGenericComponent.addComponentViaDropdownStructureSearch(
        activeComponent, AddNewChildComponent.addNewComponentToLayer, newComponentBaseName);
    }
  }
}
