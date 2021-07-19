import { NESTED_SUBCOMPONENTS_BASE_NAMES } from '../../../../../consts/baseSubcomponentNames.enum';
import { uniqueSubcomponentIdState } from './uniqueSubcomponentIdState';

export class UniqueSubcomponentNameGenerator {
  
  public static generate(subcomponentNamePrefix: NESTED_SUBCOMPONENTS_BASE_NAMES): string {
    return `${subcomponentNamePrefix} ${uniqueSubcomponentIdState.getUniqueId()}`;
  }
}
