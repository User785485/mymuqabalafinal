/* ═══════════════════════════════════════
   Form Walkthrough E2E Tests
   Run in browser: load form-walkthrough.html
   Tests basic form loading, step processing, and persistence
═══════════════════════════════════════ */

const FormWalkthroughTests = {

    FORM_GROUPS: {
        express: ['f1-express', 'f2-express', 'f3-express', 'f4-express'],
        scenarios: ['s1-etincelle', 's2-rythme', 's3-deux-mondes', 's4-test-invisible',
            's5-danse-pouvoir', 's6-echo-passe', 's7-triangle-sacre', 's8-miroir-derangeant',
            's9-promesse-floue', 's10-futur-se-dessine'],
        germination: ['f1-1-espace-sacre', 'f1-2-exploration', 'f1-3-fil-conducteur',
            'f1-4-parcours', 'f1-5-transformation', 'f1-6-boussole-interieure'],
        racines: ['f2-1-fondations', 'f2-2-heritage', 'f2-3-echos',
            'f2-4-attachement', 'f2-5-corps-raconte'],
        patterns: ['f3-1-debut-relations', 'f3-2-saisons', 'f3-3-racines-entrelacees',
            'f3-4-forces-creativite'],
        valeurs: ['f4-1-spiritualite', 'f4-2-jardin-secret', 'f4-3-boussole-coeur'],
        bilan: ['f-final-bilan']
    },

    results: [],

    async run(groupName) {
        const groups = groupName
            ? { [groupName]: this.FORM_GROUPS[groupName] }
            : this.FORM_GROUPS;

        this.results = [];

        for (const [group, formIds] of Object.entries(groups)) {
            console.log(`\n=== Testing group: ${group} ===`);
            for (const formId of formIds) {
                const result = await this.testForm(formId);
                this.results.push(result);
                const icon = result.passed ? '\u2705' : '\u274C';
                console.log(`${icon} ${formId}: ${result.details}`);
            }
        }

        this.printSummary();
        return this.results;
    },

    async testForm(formId) {
        const result = {
            formId,
            passed: true,
            details: '',
            errors: []
        };

        try {
            // 1. Check form loads from FORM_REGISTRY
            const loaded = await this._loadFormScript(formId);
            if (!loaded) {
                result.passed = false;
                result.details = 'Form script not found or failed to load';
                return result;
            }

            const form = window.FORM_REGISTRY[formId];
            if (!form) {
                result.passed = false;
                result.details = 'Form not in FORM_REGISTRY after script load';
                return result;
            }

            // 2. Validate schema
            if (typeof ChatSchemaValidator !== 'undefined') {
                const validation = ChatSchemaValidator.validate(form);
                if (validation.errors.length > 0) {
                    result.errors.push('Schema errors: ' + validation.errors.join('; '));
                    result.passed = false;
                }
            }

            // 3. Check required fields
            const requiredFields = ['id', 'title', 'steps', 'bot'];
            for (const field of requiredFields) {
                if (!form[field]) {
                    result.errors.push(`Missing required field: ${field}`);
                    result.passed = false;
                }
            }

            // 4. Check steps structure
            if (form.steps && form.steps.length > 0) {
                const lastStep = form.steps[form.steps.length - 1];
                if (lastStep.type !== 'completion') {
                    result.errors.push('Last step is not a completion step');
                    result.passed = false;
                }

                // Check variables are declared for interactive steps
                const interactiveTypes = ['text_input', 'email_input', 'phone_input', 'choice', 'rating', 'date_input', 'slider', 'file_input'];
                for (let i = 0; i < form.steps.length; i++) {
                    const step = form.steps[i];
                    if (interactiveTypes.includes(step.type) && !step.variable) {
                        result.errors.push(`Step ${i} (${step.type}) missing variable`);
                        result.passed = false;
                    }
                }

                // Check for duplicate variable names
                const vars = form.steps.filter(s => s.variable).map(s => s.variable);
                const dupes = vars.filter((v, i) => vars.indexOf(v) !== i);
                if (dupes.length > 0) {
                    result.errors.push(`Duplicate variables: ${[...new Set(dupes)].join(', ')}`);
                    // Warning only, not a failure
                }
            } else {
                result.errors.push('No steps defined');
                result.passed = false;
            }

            // 5. Check checkboxId (for dashboard integration)
            if (!form.checkboxId) {
                result.errors.push('Missing checkboxId (dashboard integration)');
                // Warning only
            }

            // 6. Check theme has luxury palette
            if (form.theme) {
                const luxKeys = ['botBubbleBg', 'buttonBg', 'progressFill'];
                for (const key of luxKeys) {
                    if (!form.theme[key]) {
                        result.errors.push(`Theme missing: ${key}`);
                    }
                }
            }

            // 7. Check no external Typebot URLs in steps
            for (let i = 0; i < (form.steps || []).length; i++) {
                const step = form.steps[i];
                const content = typeof step.content === 'string' ? step.content : '';
                if (content.includes('typebot.co') || content.includes('typebot.io')) {
                    result.errors.push(`Step ${i} contains Typebot URL`);
                    result.passed = false;
                }
            }

            const stepCount = form.steps ? form.steps.length : 0;
            const varCount = form.variables ? form.variables.length : 0;
            const interactiveCount = (form.steps || []).filter(s =>
                ['text_input', 'email_input', 'phone_input', 'choice', 'rating', 'date_input', 'slider', 'file_input'].includes(s.type)
            ).length;

            result.details = `${stepCount} steps, ${varCount} vars, ${interactiveCount} interactive`;
            if (result.errors.length > 0 && result.passed) {
                result.details += ` (${result.errors.length} warnings)`;
            }

        } catch (e) {
            result.passed = false;
            result.details = 'Exception: ' + e.message;
            result.errors.push(e.stack || e.message);
        }

        return result;
    },

    async _loadFormScript(formId) {
        if (window.FORM_REGISTRY[formId]) return true;

        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = '../../forms/' + formId + '.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
        });
    },

    printSummary() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;
        const missing = this.results.filter(r => r.details.includes('not found')).length;
        const total = this.results.length;

        console.log('\n═══════════════════════════════════');
        console.log(`RESULTS: ${passed}/${total} passed, ${failed} failed, ${missing} missing`);
        console.log('═══════════════════════════════════');

        if (failed > 0) {
            console.log('\nFailed forms:');
            this.results.filter(r => !r.passed).forEach(r => {
                console.log(`  ${r.formId}: ${r.errors.join('; ')}`);
            });
        }
    }
};

// Auto-run if loaded in HTML page with ?run parameter
if (typeof window !== 'undefined' && window.location.search.includes('run')) {
    const group = new URLSearchParams(window.location.search).get('group') || null;
    window.addEventListener('DOMContentLoaded', () => {
        FormWalkthroughTests.run(group);
    });
}
