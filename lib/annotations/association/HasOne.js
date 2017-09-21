"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
function HasOne(relatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        association_1.addAssociation(target, association_1.HAS_ONE, relatedClassGetter, propertyName, optionsOrForeignKey);
    };
}
exports.HasOne = HasOne;
//# sourceMappingURL=HasOne.js.map