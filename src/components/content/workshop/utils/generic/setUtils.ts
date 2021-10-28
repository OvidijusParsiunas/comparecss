export class SetUtils {

	private static concatenateArrays(arrays: undefined[][]): undefined[] {
		return [].concat(...arrays);
	}

	private static transformSetsToArrays(sets: Set<undefined>[]): undefined[][] {
		return sets.filter((set) => set).map(set => [...set]);
	}

	public static transformSetsToOneDimensionalArray(...sets: Set<any>[]): undefined[] {
		const arrayOfArrays = SetUtils.transformSetsToArrays(sets);
		return SetUtils.concatenateArrays(arrayOfArrays);
	}
	
	public static mergeSets(...sets: Set<any>[]): Set<any> {
		const oneDArray = SetUtils.transformSetsToOneDimensionalArray(...sets);
		return new Set(oneDArray);
	}

	public static addSetsToSet<T>(targetSet: Set<T>, ...additionalSets: Set<any>[]): void {
		const oneDArray = SetUtils.transformSetsToOneDimensionalArray(...additionalSets);
		oneDArray.forEach((property) => targetSet.add(property));
	}

	public static addArraysToSet(targetSet: Set<any>, ...arrays: any[][]): void {
		const oneDArray = SetUtils.concatenateArrays(arrays);
		oneDArray.forEach((property) => targetSet.add(property));
	}
}
