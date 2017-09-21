"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var lodash_1 = require("lodash");
exports.BELONGS_TO_MANY = 'belongsToMany';
exports.BELONGS_TO = 'belongsTo';
exports.HAS_MANY = 'hasMany';
exports.HAS_ONE = 'hasOne';
var FOREIGN_KEYS_KEY = 'sequelize:foreignKeys';
var ASSOCIATIONS_KEY = 'sequelize:associations';
/**
 * Stores association meta data for specified class
 */
function addAssociation(target, relation, relatedClassGetter, as, optionsOrForeignKey, through, otherKey) {
    var associations = getAssociations(target);
    var throughClassGetter;
    var options = {};
    if (!associations) {
        associations = [];
    }
    if (typeof through === 'function') {
        throughClassGetter = through;
        through = undefined;
    }
    if (typeof optionsOrForeignKey === 'string') {
        options.foreignKey = { name: optionsOrForeignKey };
    }
    else {
        options = __assign({}, optionsOrForeignKey);
    }
    if (otherKey) {
        options.otherKey = { name: otherKey };
    }
    associations.push({
        relation: relation,
        relatedClassGetter: relatedClassGetter,
        throughClassGetter: throughClassGetter,
        through: through,
        as: as,
        options: options
    });
    setAssociations(target, associations);
}
exports.addAssociation = addAssociation;
/**
 * Determines foreign key by specified association (relation)
 */
function getForeignKey(model, association) {
    var options = association.options;
    if (options && options.foreignKey) {
        var foreignKey = options.foreignKey;
        // if options is an object and has a string foreignKey property, use that as the name
        if (typeof foreignKey === 'string') {
            return foreignKey;
        }
        // if options is an object with foreignKey.name, use that as the name
        if (foreignKey.name) {
            return foreignKey.name;
        }
    }
    // otherwise calculate the foreign key by related or through class
    var classWithForeignKey;
    var relatedClass;
    switch (association.relation) {
        case exports.BELONGS_TO_MANY:
            if (association.throughClassGetter) {
                classWithForeignKey = association.throughClassGetter();
                relatedClass = model;
            }
            else {
                throw new Error("ThroughClassGetter is missing on \"" + model['name'] + "\"");
            }
            break;
        case exports.HAS_MANY:
        case exports.HAS_ONE:
            classWithForeignKey = association.relatedClassGetter();
            relatedClass = model;
            break;
        case exports.BELONGS_TO:
            classWithForeignKey = model;
            relatedClass = association.relatedClassGetter();
            break;
        default:
    }
    var foreignKeys = getForeignKeys(classWithForeignKey.prototype) || [];
    for (var _i = 0, foreignKeys_1 = foreignKeys; _i < foreignKeys_1.length; _i++) {
        var foreignKey = foreignKeys_1[_i];
        if (foreignKey.relatedClassGetter() === relatedClass) {
            return foreignKey.foreignKey;
        }
    }
    throw new Error("Foreign key for \"" + relatedClass.name + "\" is missing " +
        ("on \"" + classWithForeignKey.name + "\"."));
}
exports.getForeignKey = getForeignKey;
/**
 * Returns association meta data from specified class
 */
function getAssociations(target) {
    var associations = Reflect.getMetadata(ASSOCIATIONS_KEY, target);
    if (associations) {
        return associations.slice();
    }
}
exports.getAssociations = getAssociations;
function setAssociations(target, associations) {
    Reflect.defineMetadata(ASSOCIATIONS_KEY, associations, target);
}
exports.setAssociations = setAssociations;
function getAssociationsByRelation(target, relatedClass) {
    var associations = getAssociations(target);
    return (associations || []).filter(function (association) {
        var _relatedClass = association.relatedClassGetter();
        return (_relatedClass.prototype === relatedClass.prototype ||
            /* istanbul ignore next */
            relatedClass.prototype instanceof _relatedClass // v4 (for child classes)
        );
    });
}
exports.getAssociationsByRelation = getAssociationsByRelation;
/**
 * Adds foreign key meta data for specified class
 */
function addForeignKey(target, relatedClassGetter, foreignKey) {
    var foreignKeys = getForeignKeys(target);
    if (!foreignKeys) {
        foreignKeys = [];
    }
    foreignKeys.push({
        relatedClassGetter: relatedClassGetter,
        foreignKey: foreignKey
    });
    setForeignKeys(target, foreignKeys);
}
exports.addForeignKey = addForeignKey;
/**
 * Returns "other" key determined by association object
 */
function getOtherKey(association) {
    var options = association.options;
    if (options && options.otherKey) {
        var otherKey = options.otherKey;
        // if options is an object and has a string otherKey property, use that as the name
        if (typeof otherKey === 'string') {
            return otherKey;
        }
        // if options is an object with otherKey.name, use that as the name
        if (otherKey.name) {
            return otherKey.name;
        }
    }
    return getForeignKey(association.relatedClassGetter(), association);
}
exports.getOtherKey = getOtherKey;
/**
 * Processes association for single model
 */
function processAssociation(sequelize, model, association) {
    var relatedClass = association.relatedClassGetter();
    var foreignKey = getForeignKey(model, association);
    var through;
    var otherKey;
    if (association.relation === exports.BELONGS_TO_MANY) {
        otherKey = getOtherKey(association);
        through = getThroughClass(sequelize, association);
    }
    var foreignKeyOptions = { foreignKey: { name: foreignKey } };
    if (otherKey) {
        foreignKeyOptions.otherKey = { name: otherKey };
    }
    var options = lodash_1.merge(association.options, foreignKeyOptions, {
        as: association.as,
        through: through,
    });
    model[association.relation](relatedClass, options);
    sequelize.adjustAssociation(model, association);
}
exports.processAssociation = processAssociation;
/**
 * Returns "through" class determined by association object
 */
function getThroughClass(sequelize, association) {
    if (association.through) {
        if (!sequelize.throughMap[association.through]) {
            var throughModel = sequelize.getThroughModel(association.through);
            sequelize.addModels([throughModel]);
            sequelize.throughMap[association.through] = throughModel;
        }
        return sequelize.throughMap[association.through];
    }
    return association.throughClassGetter();
}
exports.getThroughClass = getThroughClass;
/**
 * Returns foreign key meta data from specified class
 */
function getForeignKeys(target) {
    var foreignKeys = Reflect.getMetadata(FOREIGN_KEYS_KEY, target);
    if (foreignKeys) {
        return foreignKeys.slice();
    }
}
exports.getForeignKeys = getForeignKeys;
/**
 * Sets foreign key meta data
 */
function setForeignKeys(target, foreignKeys) {
    Reflect.defineMetadata(FOREIGN_KEYS_KEY, foreignKeys, target);
}
//# sourceMappingURL=association.js.map