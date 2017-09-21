/// <reference types="sequelize" />
import { AssociationOptionsHasMany } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function HasMany(relatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasMany(relatedClassGetter: ModelClassGetter, options?: AssociationOptionsHasMany): Function;
