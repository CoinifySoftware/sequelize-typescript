/// <reference types="sequelize" />
import 'reflect-metadata';
import * as SequelizeOrigin from 'sequelize';
import { Model } from "../Model";
import { SequelizeConfig } from "../../types/SequelizeConfig";
import { BaseSequelize } from "../BaseSequelize";
import { ISequelizeAssociation } from "../../interfaces/ISequelizeAssociation";
export declare class Sequelize extends SequelizeOrigin implements BaseSequelize {
    Model: any;
    throughMap: {
        [through: string]: any;
    };
    _: {
        [modelName: string]: typeof Model;
    };
    init: (config: SequelizeConfig) => void;
    addModels: (models: Array<typeof Model> | string[]) => void;
    associateModels: (models: Array<typeof Model>) => void;
    constructor(config: SequelizeConfig | string);
    getThroughModel(through: string): typeof Model;
    /**
     * The association needs to be adjusted. So that throughModel properties
     * referencing a original sequelize Model instance
     */
    adjustAssociation(model: any, association: ISequelizeAssociation): void;
    /**
     * Creates sequelize models and registers these models
     * in the registry
     */
    defineModels(classes: Array<typeof Model>): void;
}
