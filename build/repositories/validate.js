"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validate {
    static string(value, fieldName) {
        if (!value) {
            throw new Error(`${fieldName} is required`);
        }
        if (typeof value !== 'string') {
            throw new Error(`Invalid type for ${fieldName}: expected string, got ${typeof value}`);
        }
        if (value.trim() === '') {
            throw new Error(`${fieldName} cannot be empty`);
        }
    }
    static number(value, fieldName) {
        if (!value) {
            throw new Error(`${fieldName} is required`);
        }
        if (typeof value !== 'number') {
            throw new Error(`Invalid type for ${fieldName}: expected number, got ${typeof value}`);
        }
        if (isNaN(value)) {
            throw new Error(`${fieldName} cannot be NaN`);
        }
    }
    static email(value) {
        if (!value) {
            throw new Error(`Email is required`);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
    }
}
exports.default = Validate;
