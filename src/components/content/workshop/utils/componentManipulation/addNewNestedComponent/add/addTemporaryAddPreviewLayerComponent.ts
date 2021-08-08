import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { MultiBaseComponentUtils } from '../../../multiBaseComponent/multiBaseComponentUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewLayerComponent } from './addNewLayerComponent';
import JSONUtils from '../../../generic/jsonUtils';

export class AddTemporaryAddPreviewLayerComponent extends AddNewLayerComponent {

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, activeBaseComponent,
      TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY, overwritePropertiesFunc);
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isTemporaryAddPreview = true;
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewLayerComponent.addNewComponentToComponentPreview(activeBaseComponent, newComponent);
    newComponent.nestedComponentsLockedToLayer?.add(parentComponent);
    return newComponent;
  }
}
