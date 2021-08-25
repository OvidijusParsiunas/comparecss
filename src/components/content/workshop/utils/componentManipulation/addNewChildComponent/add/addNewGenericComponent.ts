import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, BaseSubcomponentRef } from '../../../../../../../interfaces/componentPreviewStructure';
import { IncrementChildComponentCount } from '../../childComponentCount/incrementChildComponentCount';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentRefsUtils } from '../../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewComponentShared } from './addNewComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

type NewComponentDetails = [WorkshopComponent, string];

export class AddNewGenericComponent extends AddNewComponentShared {

  // base name is used in dropdown options
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: CHILD_COMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: LAYER_COMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: BUTTON_COMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.IMAGE]: PRIMITIVE_COMPONENTS_BASE_NAMES.IMAGE,
    [COMPONENT_TYPES.ICON]: PRIMITIVE_COMPONENTS_BASE_NAMES.ICON,
  };
  public static readonly componentBaseNameToType: { [key in CHILD_COMPONENTS_BASE_NAMES]?: COMPONENT_TYPES } = {
    ...JSONUtils.reverseMap(AddNewGenericComponent.componentTypeToBaseName),
    [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: COMPONENT_TYPES.BUTTON,
    [LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]: COMPONENT_TYPES.LAYER,
  };
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static removeContents(newComponent: WorkshopComponent): void {
    newComponent.subcomponents = {};
    newComponent.componentPreviewStructure.subcomponentDropdownStructure = {};
    newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = {};
  }

  private static populateCoreComponentRef(newComponentParent: WorkshopComponent, newComponent: WorkshopComponent): void {
    // WORK1
    // get copy to work first
    // check isTriggeredByAnotherSubcomponent
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const { subcomponentType }: { subcomponentType?: number } = baseSubcomponent;
    JSONUtils.setPropertyIfExists(newComponentParent.coreSubcomponentRefs, subcomponentType, baseSubcomponent);
    const { otherSubcomponentsToTrigger } = newComponentParent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (otherSubcomponentsToTrigger) JSONUtils.setPropertyIfExists(otherSubcomponentsToTrigger, subcomponentType, baseSubcomponent);
    CoreSubcomponentRefsUtils.executeReferenceSharingExecutables(newComponentParent);
    newComponentParent.referenceSharingExecutables?.[0]?.(newComponentParent.coreSubcomponentRefs);
  }

  private static getBaseSubcomponentNamePrefix(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES): CHILD_COMPONENTS_BASE_NAMES {
    if (componentType === COMPONENT_TYPES.BUTTON) {
      return componentStyle === BUTTON_STYLES.CLOSE ? BUTTON_COMPONENTS_BASE_NAMES.CLOSE : BUTTON_COMPONENTS_BASE_NAMES.BUTTON;
    }
    return AddNewGenericComponent.componentTypeToBaseName[componentType];
  }

  private static updateComponentDropdownStructure(masterComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure, coreSubcomponentRefs } = newComponent;
    const baseName = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    const childComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    childComponentBaseDropdownStructure[DROPDOWN_OPTION_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName };
    const newComponentDropdownStructure = { [baseName]: { ...childComponentBaseDropdownStructure }};
    Object.assign(subcomponentDropdownStructure, newComponentDropdownStructure);
    Object.assign(masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponent: SubcomponentProperties): void {
    const alignment = baseSubcomponent?.customFeatures?.alignedLayerSection?.section;
    const baseSubcomponentRef: BaseSubcomponentRef = { subcomponentProperties: baseSubcomponent };
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(baseSubcomponentRef);
  }

  private static addNewComponentToDropdownStructure(newComponent: WorkshopComponent, masterComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, subcomponents, activeSubcomponentName } = masterComponent;
    const parentLayerOptionName = subcomponentNameToDropdownOptionName[
      newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].parentLayer.subcomponentProperties.name];
    // this gets activated when the user is manually adding a component to a layer
    if (subcomponents[activeSubcomponentName].seedComponent.ref.type === COMPONENT_TYPES.LAYER) {
      const layerDropdownStructure = dropdownStructure[parentLayerOptionName];
      AddNewGenericComponent.updateComponentDropdownStructure(masterComponent, newComponent, layerDropdownStructure as NestedDropdownStructure);
    } else {
      // this gets activated when a new component is being programmatically generated or the user is manually adding a component to a base
      const subcomponentBaseName = subcomponents[activeSubcomponentName].name;
      const subcomponentOptionName = subcomponentNameToDropdownOptionName[subcomponentBaseName];
      const componentBaseDropdownStructure = dropdownStructure[subcomponentOptionName][parentLayerOptionName] || dropdownStructure[subcomponentOptionName];
      AddNewGenericComponent.updateComponentDropdownStructure(masterComponent, newComponent, componentBaseDropdownStructure as NestedDropdownStructure);
    }
  }

  protected static addNewComponentToComponentPreview(newComponent: WorkshopComponent, parentLayer: Layer): void {
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    AddNewGenericComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponent);
    baseSubcomponent.parentLayer = parentLayer;
  }

  private static executeOverwritePropertiesFuncs(overwritePropertiesFunc: OverwritePropertiesFunc[], newComponent: WorkshopComponent): void {
    const funcArray = overwritePropertiesFunc.filter((func) => typeof func === 'function');
    funcArray.forEach((overwritePropertiesFunc) => {
      overwritePropertiesFunc(newComponent.coreSubcomponentRefs);
    });
  }

  private static applyTopProperty(baseSubcomponent: SubcomponentProperties): void {
    const customCssProperties = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, componentGenerator: ComponentGenerator,
      masterComponent?: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc[], customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddNewGenericComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const newComponent = AddNewComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, baseName);
    AddNewGenericComponent.applyTopProperty(newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, newComponent);
    }
    return [newComponent, baseNamePrefix];
  }

  // parent component is never the layer but the higher component that contains it
  // newComponentParent and activeComponentParent are very similar, however in the instance of adding a child component to a
  // child component e.g. Icon to a Button in a Card - newComponentParent would be Button whereas activeComponentParent would
  // be Card
  // WORK1: activeComponentParent does not seem correct here
  public static addUsingParentDropdownStructure(newComponentParent: WorkshopComponent, activeComponentParent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayer: Layer, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const masterComponent = newComponentParent.masterComponentRef;
    const [newComponent, baseNamePrefix] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, masterComponent, overwritePropertiesFunc);
    Object.assign(masterComponent.subcomponents, newComponent.subcomponents);
    AddNewGenericComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    AddNewGenericComponent.addNewComponentToDropdownStructure(newComponent, masterComponent, dropdownStructure);
    InterconnectedSettings.update(true, activeComponentParent, newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    IncrementChildComponentCount.increment(activeComponentParent, baseNamePrefix, parentLayer.subcomponentProperties.name);
    AddNewGenericComponent.populateCoreComponentRef(newComponentParent, newComponent);
    newComponent.containerComponent = activeComponentParent;
    AddNewGenericComponent.removeContents(newComponent);
    return newComponent;
  }

  public static add(newComponentParent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const parentLayer = AddNewComponentShared.getParentLayer(newComponentParent, parentLayerName);
    return AddNewComponentShared.addComponentViaDropdownStructureSearch(newComponentParent, AddNewGenericComponent.addUsingParentDropdownStructure,
      componentType, componentStyle, parentLayer, overwritePropertiesFunc)
  }
}
