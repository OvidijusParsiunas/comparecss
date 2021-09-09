import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewLayerComponent } from './addNewLayerComponent';

export class AddTemporaryAddPreviewLayerComponent extends AddNewLayerComponent {

  public static addTemporary(activeComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, activeComponent,
      TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY, overwritePropertiesFunc);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    Object.assign(activeComponent.subcomponents, newComponent.subcomponents);
    const { higherComponentContainer } = ActiveComponentUtils.getHigherLevelComponents(activeComponent);
    AddNewLayerComponent.addNewComponentToComponentPreview(higherComponentContainer, newComponent);
    newComponent.childComponentsLockedToLayer?.add(activeComponent);
    return newComponent;
  }
}
