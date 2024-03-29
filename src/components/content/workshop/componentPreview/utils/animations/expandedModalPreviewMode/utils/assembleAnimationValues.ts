import { AssembledModalOpenAnimationValues, AssembledModalCloseAnimationValues } from '../../../../../../../../interfaces/assembledAnimationValues';
import { MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { Subcomponent } from '../../../../../../../../interfaces/workshopComponent';
import { animationTypeToFunctionality } from '../../animationToFunctionality';
import { ComponentOptions } from 'vue';

// the reason why we are passing in the full component preview component state in (instead of passing what is needed), is because there was
// a significant amount of consistent destructuring taking place across the project which I then placed into a single preprocessing method
// that would then call the required func with the required arguments - and not the full component state.
// However that turned out to be problematic as it was hard to navigate the code due to callbacks being passed into callbacks which
// made it difficult to interpret what they were. Hence I created this assembly util file which does the destructuring directly in
// the animation method itself and allows the developer to easily understand what callbacks are being used within the codebase.
export class AssembleAnimationValues {

  public static assembleOpenAnimationValues(componentPreviewComponent: ComponentOptions): AssembledModalOpenAnimationValues {
    const { customFeatures } = componentPreviewComponent.component.subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE] as Subcomponent;
    return {
      modalOpenAnimation: animationTypeToFunctionality[customFeatures.animations.display.open.type],
      animationDuration: customFeatures.animations.display.open.duration,
      animationDelay: customFeatures.animations.display.open.delay,
      backdropProperties: customFeatures.backdrop,
      modalElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      modalOverlayElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      modalContainerElement: componentPreviewComponent.$refs.componentPreviewContainer,
    };
  }

  public static assembleClosetAnimationValues(componentPreviewComponent: ComponentOptions, closeAnimationCallback: () => void): AssembledModalCloseAnimationValues {
    const { customFeatures } = componentPreviewComponent.component.subcomponents[MASTER_SUBCOMPONENT_BASE_NAME.BASE] as Subcomponent;
    return {
      modalCloseAnimation: animationTypeToFunctionality[customFeatures.animations.display.close.type],
      animationDuration: customFeatures.animations.display.close.duration,
      setOptionToDefaultCallback: closeAnimationCallback,
      modalContainerElement: componentPreviewComponent.$refs.componentPreviewContainer,
      backdropProperties: customFeatures.backdrop,
      modalElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      modalOverlayElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
    };
  }
}
