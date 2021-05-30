import { AssembledModalOpenAnimationValues, AssembledModalCloseAnimationValues } from '../../../../../../../../interfaces/assembledAnimationValues';
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
    return {
      modalOpenAnimation: animationTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.open.type],
      animationDuration: componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.open.duration,
      animationDelay: componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.open.delay,
      backdropProperties: componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      modalElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      modalOverlayElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
      modalContainerElement: componentPreviewComponent.$refs.componentPreviewContainer,
    };
  }

  public static assembleClosetAnimationValues(componentPreviewComponent: ComponentOptions, closeAnimationCallback: () => void): AssembledModalCloseAnimationValues {
    return {
      modalCloseAnimation: animationTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.close.type],
      animationDuration: componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.animations.close.duration,
      setOptionToDefaultCallback: closeAnimationCallback,
      modalContainerElement: componentPreviewComponent.$refs.componentPreviewContainer,
      backdropProperties: componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
      modalElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
      modalOverlayElement: componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
    };
  }
}
