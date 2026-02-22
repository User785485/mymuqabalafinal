/* ═══════════════════════════════════════
   MY MUQABALA — Form Schema Validator
   Validates form definitions at init (dev only)
═══════════════════════════════════════ */

const ChatSchemaValidator = {

    VALID_TYPES: [
        'message', 'image', 'section', 'text_input', 'email_input',
        'phone_input', 'choice', 'rating', 'date_input', 'slider',
        'completion', 'file_input', 'narrative'
    ],

    THEME_KEYS: [
        'background', 'botBubbleBg', 'botBubbleText', 'botBubbleBorder',
        'userBubbleBg', 'userBubbleText', 'buttonBg', 'buttonText',
        'inputBg', 'inputText', 'inputBorder', 'progressFill', 'progressBg'
    ],

    validate(form) {
        var errors = [];
        var warnings = [];

        if (!form) {
            errors.push('Form definition is null/undefined');
            return { errors: errors, warnings: warnings };
        }

        // Required top-level fields
        if (!form.id) errors.push('Missing form.id');
        if (!form.title) errors.push('Missing form.title');
        if (!form.steps || !Array.isArray(form.steps)) {
            errors.push('Missing or invalid form.steps array');
            return { errors: errors, warnings: warnings };
        }
        if (!form.bot) errors.push('Missing form.bot');
        if (form.bot && !form.bot.name) errors.push('Missing form.bot.name');

        // Optional but recommended
        if (!form.version) warnings.push('Missing form.version — recommend adding version: 1');
        if (!form.theme) {
            warnings.push('Missing form.theme — default CSS will be used');
        } else {
            // Validate theme completeness
            var missingKeys = this.THEME_KEYS.filter(function(k) { return !form.theme[k]; });
            if (missingKeys.length > 0) {
                warnings.push('Theme missing keys: ' + missingKeys.join(', '));
            }
        }
        if (!form.checkboxId) warnings.push('Missing form.checkboxId — dashboard checkbox won\'t auto-update');
        if (!form.variables || !Array.isArray(form.variables)) {
            warnings.push('Missing form.variables array — helps document expected variables');
        }

        // Validate steps
        var usedVariables = new Set();
        var hasCompletion = false;
        var interactiveCount = 0;

        for (var i = 0; i < form.steps.length; i++) {
            var step = form.steps[i];
            var prefix = 'Step ' + i + ' (' + (step.type || 'unknown') + ')';

            if (!step.type) {
                errors.push(prefix + ': missing type');
                continue;
            }

            if (this.VALID_TYPES.indexOf(step.type) === -1) {
                errors.push(prefix + ': unknown type "' + step.type + '"');
            }

            switch (step.type) {
                case 'message':
                    if (!step.content) errors.push(prefix + ': missing content');
                    break;

                case 'image':
                    if (!step.url) errors.push(prefix + ': missing url');
                    if (!step.alt) warnings.push(prefix + ': missing alt text for accessibility');
                    if (step.url && step.url.includes('typebot.io')) {
                        warnings.push(prefix + ': external Typebot URL — should be self-hosted');
                    }
                    break;

                case 'section':
                    if (!step.title) errors.push(prefix + ': missing title');
                    break;

                case 'text_input':
                case 'email_input':
                case 'phone_input':
                case 'date_input':
                    if (!step.variable) errors.push(prefix + ': missing variable');
                    else {
                        if (usedVariables.has(step.variable)) {
                            warnings.push(prefix + ': duplicate variable "' + step.variable + '"');
                        }
                        usedVariables.add(step.variable);
                    }
                    interactiveCount++;
                    break;

                case 'choice':
                    if (!step.variable) errors.push(prefix + ': missing variable');
                    else {
                        if (usedVariables.has(step.variable)) {
                            warnings.push(prefix + ': duplicate variable "' + step.variable + '"');
                        }
                        usedVariables.add(step.variable);
                    }
                    if (!step.options || !Array.isArray(step.options) || step.options.length === 0) {
                        errors.push(prefix + ': missing or empty options array');
                    } else {
                        var ids = new Set();
                        for (var j = 0; j < step.options.length; j++) {
                            var opt = step.options[j];
                            if (!opt.id) errors.push(prefix + ': option ' + j + ' missing id');
                            if (!opt.label) errors.push(prefix + ': option ' + j + ' missing label');
                            if (opt.id && ids.has(opt.id)) {
                                errors.push(prefix + ': duplicate option id "' + opt.id + '"');
                            }
                            ids.add(opt.id);
                        }
                    }
                    interactiveCount++;
                    break;

                case 'rating':
                    if (!step.variable) errors.push(prefix + ': missing variable');
                    else {
                        if (usedVariables.has(step.variable)) {
                            warnings.push(prefix + ': duplicate variable "' + step.variable + '"');
                        }
                        usedVariables.add(step.variable);
                    }
                    if (step.max && (step.max < 2 || step.max > 20)) {
                        warnings.push(prefix + ': unusual max value ' + step.max);
                    }
                    interactiveCount++;
                    break;

                case 'slider':
                    if (!step.variable) errors.push(prefix + ': missing variable');
                    else usedVariables.add(step.variable);
                    interactiveCount++;
                    break;

                case 'narrative':
                    if (!step.content) errors.push(prefix + ': missing content');
                    if (step.mood && typeof step.mood !== 'string') {
                        warnings.push(prefix + ': mood should be a string');
                    }
                    break;

                case 'completion':
                    hasCompletion = true;
                    if (i !== form.steps.length - 1) {
                        warnings.push(prefix + ': completion is not the last step');
                    }
                    break;
            }

            // Validate condition syntax
            if (step.condition) {
                this._validateCondition(step.condition, prefix, errors, usedVariables);
            }
        }

        if (!hasCompletion) {
            errors.push('No completion step found — form will not show a completion screen');
        }

        if (interactiveCount === 0) {
            warnings.push('No interactive steps found — form has no user input');
        }

        // Check declared variables match used variables
        if (form.variables && Array.isArray(form.variables)) {
            var declared = new Set(form.variables);
            usedVariables.forEach(function(v) {
                if (!declared.has(v)) {
                    warnings.push('Variable "' + v + '" used in steps but not declared in form.variables');
                }
            });
            declared.forEach(function(v) {
                if (!usedVariables.has(v)) {
                    warnings.push('Variable "' + v + '" declared but never used in steps');
                }
            });
        }

        return { errors: errors, warnings: warnings };
    },

    _validateCondition(condition, prefix, errors, knownVars) {
        if (condition.and) {
            if (!Array.isArray(condition.and)) {
                errors.push(prefix + ': condition.and must be an array');
            }
            return;
        }
        if (condition.or) {
            if (!Array.isArray(condition.or)) {
                errors.push(prefix + ': condition.or must be an array');
            }
            return;
        }
        if (!condition.variable) {
            errors.push(prefix + ': condition missing variable');
        }
    },

    /* Run validation and log results */
    run(form) {
        var result = this.validate(form);

        if (result.errors.length > 0) {
            console.group('%c Form Schema Errors (' + result.errors.length + ')', 'color: red; font-weight: bold');
            result.errors.forEach(function(e) { console.error('  \u274C ' + e); });
            console.groupEnd();
        }

        if (result.warnings.length > 0) {
            console.group('%c Form Schema Warnings (' + result.warnings.length + ')', 'color: orange; font-weight: bold');
            result.warnings.forEach(function(w) { console.warn('  \u26A0\uFE0F ' + w); });
            console.groupEnd();
        }

        if (result.errors.length === 0 && result.warnings.length === 0) {
            console.log('%c\u2705 Form schema valid', 'color: green; font-weight: bold');
        }

        return result;
    }
};

// Auto-run in dev mode
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        var params = new URLSearchParams(window.location.search);
        var isDev = params.has('dev') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isDev && window.FORM_REGISTRY) {
            for (var formId in window.FORM_REGISTRY) {
                console.log('%cValidating form: ' + formId, 'color: blue; font-weight: bold');
                ChatSchemaValidator.run(window.FORM_REGISTRY[formId]);
            }
        }
    });
}
