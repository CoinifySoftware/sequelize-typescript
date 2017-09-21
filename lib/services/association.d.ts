/// <reference types="sequelize" />
import 'reflect-metadata';
import { AssociationOptionsBelongsTo, AssociationOptionsBelongsToMany, AssociationOptionsHasMany, AssociationOptionsHasOne, AssociationOptionsManyToMany } from 'sequelize';
import { Model } from "../models/Model";
import { ISequelizeForeignKeyConfig } from "../interfaces/ISequelizeForeignKeyConfig";
import { ISequelizeAssociation } from "../interfaces/ISequelizeAssociation";
import { BaseSequelize } from "../models/BaseSequelize";
import { ModelClassGetter } from "../types/ModelClassGetter";
export declare const BELONGS_TO_MANY = "belongsToMany";
export declare const BELONGS_TO = "belongsTo";
export declare const HAS_MANY = "hasMany";
export declare const HAS_ONE = "hasOne";
export declare type ConcatAssociationOptions = AssociationOptionsBelongsTo | AssociationOptionsBelongsToMany | AssociationOptionsHasMany | AssociationOptionsHasOne | AssociationOptionsManyToMany;
/**
 * Stores association meta data for specified class
 */
export declare function addAssociation(target: any, relation: string, relatedClassGetter: ModelClassGetter, as: string, optionsOrForeignKey?: string | ConcatAssociationOptions, through?: ModelClassGetter | string, otherKey?: string): void;
/**
 * Determines foreign key by specified association (relation)
 */
export declare function getForeignKey(model: typeof Model, association: ISequelizeAssociation): string;
/**
 * Returns association meta data from specified class
 */
export declare function getAssociations(target: any): ISequelizeAssociation[] | undefined;
export declare function setAssociations(target: any, associations: ISequelizeAssociation[]): void;
export declare function getAssociationsByRelation(target: any, relatedClass: any): ISequelizeAssociation[];
/**
 * Adds foreign key meta data for specified class
 */
export declare function addForeignKey(target: any, relatedClassGetter: ModelClassGetter, foreignKey: string): void;
/**
 * Returns "other" key determined by association object
 */
export declare function getOtherKey(association: ISequelizeAssociation): string;
/**
 * Processes association for single model
 */
export declare function processAssociation(sequelize: BaseSequelize, model: typeof Model, association: ISequelizeAssociation): void;
/**
 * Returns "through" class determined by association object
 */
export declare function getThroughClass(sequelize: BaseSequelize, association: ISequelizeAssociation): any;
/**
 * Returns foreign key meta data from specified class
 */
export declare function getForeignKeys(target: any): ISequelizeForeignKeyConfig[] | undefined;
