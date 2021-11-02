import { PropertyReferenceSharingFuncsUtils } from '../../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { AutoSyncedSiblingContainerComponentUtils } from '../../autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { ReferenceSharingFuncType } from '../../../../../../../interfaces/newChildComponents';
import { ChildComponentBaseNamesToStyles } from '../utils/childComponentBaseNamesToStyles';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { PaddingComponentUtils } from '../../utils/paddingComponentUtils';
import { AddContainerComponent } from './addContainerComponent';
import JSONUtils from '../../../generic/jsonUtils';

interface NewComponentProperties {
  componentType: COMPONENT_TYPES;
  componentStyle: COMPONENT_STYLES;
  parentLayer: Layer;
  containerComponent: WorkshopComponent;
}

export class AddComponentShared {

  protected static addNewSubcomponentNameInContainerDropdownItemNameMap(containerComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.baseSubcomponent.name;
    containerComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[baseName] = baseName;
  }

  private static setMasterComponentReference(newComponent: WorkshopComponent, masterComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].seedComponent.masterComponent = masterComponent);
  }

  protected static createNewComponentViaGenerator(componentGenerator: ComponentGenerator, masterComponent: WorkshopComponent,
      presetProperties: PresetProperties): WorkshopComponent {
    const newComponent = componentGenerator.createNewComponent(presetProperties);
    newComponent.subcomponents[presetProperties.baseName].seedComponent = newComponent;
    AddComponentShared.setMasterComponentReference(newComponent, masterComponent);
    return newComponent;
  }

  protected static getContainerComponentLayer(containerComponent: WorkshopComponent, parentLayerName: string): Layer {
    const activeContainerComponent = ActiveComponentUtils.getActiveContainerComponent(containerComponent);
    return ComponentPreviewStructureSearchUtils.getLayerByName(activeContainerComponent, parentLayerName);
  }

  protected static getNewComponentProperties(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): NewComponentProperties {
    const componentType = AddContainerComponent.componentBaseNameToType[newComponentBaseName];
    const componentStyle = ChildComponentBaseNamesToStyles.genericToStyle(newComponentBaseName);
    const containerComponent = ActiveComponentUtils.getActiveContainerComponent(activeComponent);
    const parentLayer = activeComponent.type === COMPONENT_TYPES.LAYER
      ? AddContainerComponent.getContainerComponentLayer(containerComponent, activeComponent.baseSubcomponent.name)
      : containerComponent.componentPreviewStructure.layers[0];
    return { componentType, componentStyle, parentLayer, containerComponent };
  }

  protected static populateMasterComponentWithNewSubcomponents(masterComponent: WorkshopComponent, newSubcomponents: Subcomponents): void {
    // using this instead of Object.assign in order to cause the reactive masterComponent
    // variable to trigger change detection in the add new component dropdown
    JSONUtils.addObjects(masterComponent, 'subcomponents', newSubcomponents);
    PaddingComponentUtils.overwriteSubcomponentsRef(masterComponent);
  }

  protected static cleanSubcomponentProperties(newComponent: WorkshopComponent): void {
    newComponent.subcomponents = {};
    newComponent.componentPreviewStructure.subcomponentDropdownStructure = {};
    newComponent.componentPreviewStructure.subcomponentNameToDropdownItemName = {};
  }

  protected static executePropertyOverwritables(newComponent: WorkshopComponent, containerComponent: WorkshopComponent,
      sharingFuncType: keyof ReferenceSharingFuncType): void {
    const overwritables = containerComponent.newChildComponents.propertyOverwritables?.postBuildFuncs?.[newComponent.type];
    (overwritables || []).forEach((overwritable) => overwritable(newComponent, containerComponent));
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(true, sharingFuncType, containerComponent);
  }

  protected static executeOverwritables(newComponent: WorkshopComponent, containerComponent: WorkshopComponent,
      sharingFuncType: keyof ReferenceSharingFuncType, parentLayer: Layer): void {
    AddComponentShared.executePropertyOverwritables(newComponent, containerComponent, sharingFuncType);
    AutoSyncedSiblingContainerComponentUtils.copySiblingIfAutoSynced(parentLayer, newComponent);
  }
}
