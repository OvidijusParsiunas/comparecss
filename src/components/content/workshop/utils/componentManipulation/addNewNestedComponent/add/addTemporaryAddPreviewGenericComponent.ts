import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './addNewGenericComponent';
import JSONUtils from '../../../generic/jsonUtils';

export class AddTemporaryAddPreviewGenericComponent extends AddNewGenericComponent {

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      layerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const newComponent = AddNewGenericComponent.createNewComponent(componentType, componentStyle, componentGenerator,
      overwritePropertiesFunc, NESTED_COMPONENTS_BASE_NAMES.TEMPORARY);
    newComponent.subcomponents[newComponent.coreSubcomponentNames.base].isTemporaryAddPreview = true;
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewGenericComponent.addNewComponentToComponentPreview(parentComponent, newComponent, layerName);
    return newComponent;
  }
}
