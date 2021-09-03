import { JAVASCRIPT_CLASSES } from '../consts/javascriptClasses.enum';
import { CoreSubcomponentRefs } from './coreSubcomponentRefs';

export type ReferenceSharingExecutable = (coreSubcomponentRefs: CoreSubcomponentRefs, overrideJsClasses?: Set<JAVASCRIPT_CLASSES>) => void;
