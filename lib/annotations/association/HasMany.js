"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
function HasMany(relatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        association_1.addAssociation(target, association_1.HAS_MANY, relatedClassGetter, propertyName, optionsOrForeignKey);
    };
}
exports.HasMany = HasMany;
//# sourceMappingURL=HasMany.js.map