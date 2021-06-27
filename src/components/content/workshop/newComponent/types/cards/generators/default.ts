import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CardBuilder } from './cardBuilder';

export const defaultCard: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    return CardBuilder.create();
  },
}
