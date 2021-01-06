import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import JSONManipulation from '../../../../../../../services/workshop/jsonManipulation';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { inheritedButtonCss } from './inheritedCss';

const initialButtonCss: CustomCss = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
    borderRadius: '0px',
    borderWidth: '0px',
    borderColor: '#1779ba',
    backgroundColor: '#1779ba',
    boxShadow: 'unset',
    outline: 'none',
    lineHeight: '0',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '12px',
    paddingRight: '12px',
    marginLeft: '0px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    width: '40px',
    height: '38px',
    boxSizing: 'content-box',
    transition: 'unset',
    color: '#ffffff',
    fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
  },
  [SUB_COMPONENT_CSS_MODES.HOVER]: {
    backgroundColor: '#ff0000',
  },
  [SUB_COMPONENT_CSS_MODES.CLICK]: {
    backgroundColor: '#409441',
  },
}

const subcomponents = {
  [SUB_COMPONENTS.BASE]: {
    frameworkClass: 'foundation',
    componentTag: 'button',
    innerHtmlText: 'button',
    customSettingsProperties: {
      width: [0, 250],
      height: [0, 250],
    },
    customCss: JSONManipulation.deepCopy(initialButtonCss),
    initialCss: JSONManipulation.deepCopy(initialButtonCss),
    jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
    initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
    customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    subcomponentPreviewTransition: 'all 0.25s ease-out',
    tempCustomCss: new Set(['transition']),
    inheritedCss: inheritedButtonCss,
  },
}

const componentPreviewStructure = {
  baseCss: subcomponents[SUB_COMPONENTS.BASE],
  layeringType: 'vertical',
  layers: [
    {
      'text': 'button',
    },
  ],
}

export const defaultButton: NewComponent = {
  getNewComponent(): any {
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      componentPreviewStructure,
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      className: 'default-class-name',
    }
  },
};
