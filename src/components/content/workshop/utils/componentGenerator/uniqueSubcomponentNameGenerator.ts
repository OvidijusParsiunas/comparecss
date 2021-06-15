import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { uniqueSubcomponentIdState } from './uniqueSubcomponentIdState';

export class UniqueSubcomponentNameGenerator {
  
  public static generate(subcomponentNamePrefix: CORE_SUBCOMPONENTS_NAMES): string {
    const spaces = new Array(uniqueSubcomponentIdState.getUniqueId()).join(' ');
    return `${subcomponentNamePrefix}${spaces}`;
  }
}
