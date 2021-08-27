import { LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../updateChildComponent/updateLayerDropdownOptionNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from './utils/childComponentBaseNamesToStyles';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { AddNewContainerComponent } from './add/addNewContainerComponent';
import { AddNewComponentShared } from './add/addNewComponentShared';
import { AddNewLayerComponent } from './add/addNewLayerComponent';

export class AddNewChildComponent extends AddNewComponentShared {

  private static addNewComponent(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES,
      dropdownStructure: NestedDropdownStructure): [WorkshopComponent, Layer] {
    const { componentType, componentStyle, parentLayer, containerComponent,
      } = AddNewContainerComponent.getNewComponentProperties(activeComponent, newComponentBaseName);
    const newComponent = AddNewContainerComponent.addUsingParentDropdownStructure(containerComponent,
      dropdownStructure, componentType, componentStyle, parentLayer);
    // set here because not all child components are removable, but the ones manually added by the user are
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isRemovable = true;
    return [newComponent, parentLayer];
  }

  private static addNewComponentToLayer(activeComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      activeComponentContainer: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const [newComponent, parentLayer] = AddNewChildComponent.addNewComponent(activeComponent, newComponentBaseName, dropdownStructure);
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, activeSubcomponentName } = activeComponentContainer;
    const activeContainerComponentOptionName = subcomponentNameToDropdownOptionName[activeSubcomponentName];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(
      activeComponentContainer, dropdownStructure[activeContainerComponentOptionName] as NestedDropdownStructure, parentLayer.sections.alignedSections);
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
    const { higherComponentContainer } = ActiveComponentUtils.getHigherLevelComponents(activeComponent);
    if (Object.values(LAYER_COMPONENTS_BASE_NAMES).includes(newComponentBaseName as LAYER_COMPONENTS_BASE_NAMES)) {
      AddNewChildComponent.addNewLayerToBase(activeComponent, newComponentBaseName);
    } else {
      AddNewContainerComponent.addComponentViaDropdownStructureSearch(
        activeComponent, AddNewChildComponent.addNewComponentToLayer, higherComponentContainer, newComponentBaseName);
    }
  }
}
