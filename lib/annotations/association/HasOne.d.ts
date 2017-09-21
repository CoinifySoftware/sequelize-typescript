/// <reference types="sequelize" />
import { AssociationOptionsHasOne } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function HasOne(relatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function HasOne(relatedClassGetter: ModelClassGetter, options?: AssociationOptionsHasOne): Function;
