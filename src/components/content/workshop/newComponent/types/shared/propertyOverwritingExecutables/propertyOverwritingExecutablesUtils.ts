import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class PropertyOverwritingExecutablesUtils {

  public static executePropertyOverwritingExecutables(...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      (component.propertyOverwritingExecutables || []).forEach((executable) => executable(component));        
    });
  }
}
