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

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const { activeLinkedComponent } = ActiveComponentUtils.getActiveHighLevelComponents(parentComponent);
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, parentComponent,
      TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY, overwritePropertiesFunc);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    Object.assign(parentComponent.subcomponents, newComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(activeLinkedComponent, newComponent);
    newComponent.childComponentsLockedToLayer?.add(parentComponent);
    return newComponent;
  }
}
