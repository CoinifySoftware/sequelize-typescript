"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
function BelongsToMany(relatedClassGetter, throughOrOptions, foreignKey, otherKey) {
    var typeOfThroughOrOptions = typeof throughOrOptions;
    var through;
    var options;
    if (typeOfThroughOrOptions === 'string' || typeOfThroughOrOptions === 'function') {
        through = throughOrOptions;
    }
    else {
        through = throughOrOptions.through;
        options = throughOrOptions;
    }
    return function (target, propertyName) {
        association_1.addAssociation(target, association_1.BELONGS_TO_MANY, relatedClassGetter, propertyName, options || foreignKey, through, otherKey);
    };
}
exports.BelongsToMany = BelongsToMany;
//# sourceMappingURL=BelongsToMany.js.map