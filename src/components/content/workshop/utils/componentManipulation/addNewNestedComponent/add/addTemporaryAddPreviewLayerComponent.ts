import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { COMPONENT_STYLES, LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewLayerComponent } from './addNewLayerComponent';
import JSONUtils from '../../../generic/jsonUtils';

export class AddTemporaryAddPreviewLayerComponent extends AddNewLayerComponent {

  public static add(parentComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean,
      overwritePropertiesFunc?: OverwritePropertiesFunc): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const newComponent = AddNewLayerComponent.createNewComponent(componentGenerator, NESTED_COMPONENTS_BASE_NAMES.TEMPORARY,
      overwritePropertiesFunc);
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isTemporaryAddPreview = true;
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    // WORK1: find a better way
    AddNewLayerComponent.addNewComponentToComponentPreview(parentComponent, newComponent, LAYER_STYLES.DROPDOWN_ITEM === componentStyle);
    return newComponent;
  }
}
