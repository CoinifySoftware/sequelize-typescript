"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var association_1 = require("../../services/association");
function BelongsTo(relatedClassGetter, optionsOrForeignKey) {
    return function (target, propertyName) {
        association_1.addAssociation(target, association_1.BELONGS_TO, relatedClassGetter, propertyName, optionsOrForeignKey);
    };
}
exports.BelongsTo = BelongsTo;
//# sourceMappingURL=BelongsTo.js.map