import { ModelClassGetter } from "../../types/ModelClassGetter";
import { IAssociationOptionsBelongsToMany } from "../../interfaces/IAssociationOptionsBelongsToMany";
export declare function BelongsToMany(relatedClassGetter: ModelClassGetter, through: (ModelClassGetter) | string, foreignKey?: string, otherKey?: string): Function;
export declare function BelongsToMany(relatedClassGetter: ModelClassGetter, options: IAssociationOptionsBelongsToMany): Function;
