import { SubcomponentTypeToProperties } from '../../../../../interfaces/subcomponentTypeToProperties';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';

export class SubcomponentTypeToPropertiesUtils {

  public static getTypesWithNonNullSubcomponents(subcomponentsToTrigger: SubcomponentTypeToProperties): SUBCOMPONENT_TYPES[] {
    return Object.keys(subcomponentsToTrigger || {})
      .filter((subcomponentType) => subcomponentsToTrigger[subcomponentType]) as unknown as SUBCOMPONENT_TYPES[];
  }
}
