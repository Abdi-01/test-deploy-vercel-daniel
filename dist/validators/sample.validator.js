"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateSample = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateSample = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("code").notEmpty().withMessage("Code is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        next();
    },
];
