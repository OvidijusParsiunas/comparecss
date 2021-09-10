import { UpdateContainerComponentDropdownUtils } from './updateContainerComponentDropdownUtils';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdatePaddingComponentDropdownOptions extends UpdateDropdownOptionNamesShared {

  public static updatePaddingComponentChildren(component: WorkshopComponent): void {
    const { subcomponentDropdownStructure } = component.componentPreviewStructure;
    const { optionDataMaps, stateObjects: { overwrittenOptionNames, newDrodpownNames, overwrittenDropdownStructures },
      } = UpdateContainerComponentDropdownUtils.generateOptionUpdateInitializationObjects(subcomponentDropdownStructure);
    const subcomponentNames = UpdateDropdownOptionNamesShared.getSubcomponentNames(subcomponentDropdownStructure);
    subcomponentNames.forEach((subcomponentName) => {
      UpdateContainerComponentDropdownUtils.updateOptionNames(component, optionDataMaps, subcomponentDropdownStructure,
        overwrittenOptionNames, newDrodpownNames, subcomponentName, overwrittenDropdownStructures);
    });
    ArrayUtils.differenceInArrays(overwrittenOptionNames, newDrodpownNames);
    UpdateDropdownOptionNamesShared.removeOverwrittenOptionNames(overwrittenOptionNames, subcomponentDropdownStructure);
  }
}
