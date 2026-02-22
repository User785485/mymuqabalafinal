#!/usr/bin/env node
/* ═══════════════════════════════════════
   Typebot JSON → My Muqabala Form Converter
   Usage: node typebot-to-form.js <input.json> <output.js> [options]

   Options:
     --id <form_id>         Form ID (underscores, e.g. s1_etincelle)
     --key <registry_key>   FORM_REGISTRY key (dashes, e.g. s1-etincelle)
     --title <title>        Form title
     --icon <emoji>         Form icon emoji
     --checkbox <id>        Dashboard checkbox ID
     --group <scenario|germination|racines|patterns|valeurs|express|bilan>
═══════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

// ─── Shared Luxury Theme ───
const LUXURY_THEME = {
    background: '#FDFBF7',
    botBubbleBg: 'rgba(253, 251, 247, 0.9)',
    botBubbleText: '#4A3B6E',
    botBubbleBorder: 'rgba(212, 86, 156, 0.15)',
    userBubbleBg: '#6B5A9C',
    userBubbleText: '#FDFBF7',
    buttonBg: '#D4569C',
    buttonText: '#FDFBF7',
    inputBg: '#FDFBF7',
    inputText: '#4A3B6E',
    inputBorder: 'rgba(107, 90, 156, 0.25)',
    progressFill: 'linear-gradient(90deg, #D4569C, #D4A373)',
    progressBg: 'rgba(107, 90, 156, 0.1)'
};

// ─── Type mapping: Typebot → Engine ───
const TYPE_MAP = {
    'text': 'message',
    'Text': 'message',
    'Image': 'image',
    'image': 'image',
    'text input': 'text_input',
    'Text input': 'text_input',
    'number input': 'text_input',
    'Number input': 'text_input',
    'email input': 'email_input',
    'Email input': 'email_input',
    'phone number input': 'phone_input',
    'Phone number input': 'phone_input',
    'date input': 'date_input',
    'Date input': 'date_input',
    'file input': 'file_input',
    'File input': 'file_input',
    'rating input': 'rating',
    'Rating input': 'rating',
    'buttons input': 'choice',
    'Buttons input': 'choice',
    'picture choice': 'choice',
    'Picture choice': 'choice',
    'payment input': 'message', // No payment in engine — show as message
    'redirect': 'completion',
    'Redirect': 'completion'
};

// ─── Parse arguments ───
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node typebot-to-form.js <input.json> <output.js> [options]');
    process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1];

// Parse options
const opts = {};
for (let i = 2; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    opts[key] = args[i + 1] || '';
}

// ─── Read Typebot JSON ───
let typebotData;
try {
    const raw = fs.readFileSync(inputFile, 'utf-8');
    typebotData = JSON.parse(raw);
} catch (e) {
    console.error('Error reading input file:', e.message);
    process.exit(1);
}

// ─── Extract blocks from Typebot structure ───
function extractBlocks(data) {
    // Typebot JSON has groups[] with blocks[]
    const groups = data.groups || data.typebot?.groups || [];
    const allBlocks = [];

    // Sort groups by position (top to bottom, left to right)
    const sortedGroups = groups.slice().sort((a, b) => {
        const ay = a.graphCoordinates?.y || 0;
        const by = b.graphCoordinates?.y || 0;
        if (Math.abs(ay - by) > 50) return ay - by;
        return (a.graphCoordinates?.x || 0) - (b.graphCoordinates?.x || 0);
    });

    for (const group of sortedGroups) {
        if (group.title) {
            allBlocks.push({ _type: 'section', title: group.title });
        }
        for (const block of (group.blocks || [])) {
            allBlocks.push(block);
        }
    }
    return allBlocks;
}

// ─── Convert a single Typebot block to engine step ───
function convertBlock(block, variables) {
    const blockType = block.type || '';
    const engineType = TYPE_MAP[blockType] || TYPE_MAP[block.type?.toLowerCase()] || null;

    // Section marker (injected by extractBlocks)
    if (block._type === 'section') {
        return { type: 'section', title: block.title };
    }

    // Set variable blocks — skip (logic only)
    if (blockType === 'Set variable' || blockType === 'set variable') {
        return null;
    }

    // Condition blocks — skip (handled as conditions on next block)
    if (blockType === 'Condition' || blockType === 'condition') {
        return null;
    }

    // Webhook/Script blocks — skip with TODO
    if (['Webhook', 'webhook', 'Script', 'script', 'Code', 'code'].includes(blockType)) {
        return { type: 'message', content: '/* TODO: Typebot ' + blockType + ' block — needs manual conversion */' };
    }

    if (!engineType) {
        return { type: 'message', content: '/* TODO: Unknown Typebot block type: ' + blockType + ' */' };
    }

    switch (engineType) {
        case 'message': {
            const content = extractTextContent(block);
            if (!content) return null;
            return { type: 'message', content: content };
        }

        case 'image': {
            const url = block.content?.url || block.content?.src || '';
            const alt = block.content?.alt || '';
            return { type: 'image', url: url, alt: alt };
        }

        case 'text_input': {
            const variable = extractVariable(block, variables);
            const step = {
                type: 'text_input',
                variable: variable,
                placeholder: block.options?.labels?.placeholder || ''
            };
            if (block.options?.isLong) step.isLong = true;
            return step;
        }

        case 'email_input': {
            const variable = extractVariable(block, variables);
            return {
                type: 'email_input',
                variable: variable,
                placeholder: block.options?.labels?.placeholder || 'ton.email@exemple.com'
            };
        }

        case 'phone_input': {
            const variable = extractVariable(block, variables);
            return {
                type: 'phone_input',
                variable: variable,
                placeholder: block.options?.labels?.placeholder || '06 12 34 56 78'
            };
        }

        case 'date_input': {
            const variable = extractVariable(block, variables);
            return {
                type: 'date_input',
                variable: variable
            };
        }

        case 'file_input': {
            const variable = extractVariable(block, variables);
            return {
                type: 'file_input',
                variable: variable,
                hint: block.options?.labels?.placeholder || ''
            };
        }

        case 'rating': {
            const variable = extractVariable(block, variables);
            const max = block.options?.length || 10;
            const step = {
                type: 'rating',
                variable: variable,
                max: max
            };
            if (block.options?.labels?.left) step.leftLabel = block.options.labels.left;
            if (block.options?.labels?.right) step.rightLabel = block.options.labels.right;
            return step;
        }

        case 'choice': {
            const variable = extractVariable(block, variables);
            const items = block.items || block.options?.items || [];
            const options = items.map((item, idx) => ({
                id: sanitizeId(item.content || item.value || 'opt_' + idx),
                label: item.content || item.value || 'Option ' + (idx + 1)
            }));
            const step = {
                type: 'choice',
                variable: variable,
                options: options
            };
            if (block.options?.isMultipleChoice) step.multiple = true;
            return step;
        }

        case 'completion': {
            return {
                type: 'completion',
                title: 'F\u00e9licitations !',
                message: 'Tu as termin\u00e9 ce formulaire. Tes r\u00e9ponses ont \u00e9t\u00e9 sauvegard\u00e9es.'
            };
        }

        default:
            return null;
    }
}

// ─── Helpers ───
function extractTextContent(block) {
    // Typebot stores rich text in content.richText[]
    if (block.content?.richText) {
        return block.content.richText.map(p => {
            if (p.children) {
                return p.children.map(c => c.text || '').join('');
            }
            return p.text || '';
        }).filter(Boolean).join('\n');
    }
    if (block.content?.plainText) return block.content.plainText;
    if (typeof block.content === 'string') return block.content;
    if (block.content?.html) {
        // Strip HTML tags
        return block.content.html.replace(/<[^>]+>/g, '');
    }
    return '';
}

function extractVariable(block, variables) {
    const varId = block.options?.variableId || block.outgoingEdgeId || '';
    // Try to find variable name from Typebot's variables list
    if (varId && variables[varId]) {
        return sanitizeId(variables[varId]);
    }
    // Fallback: generate from block type + index
    return 'var_' + (block.id || '').substring(0, 8);
}

function sanitizeId(str) {
    return str
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

// ─── Main conversion ───
function convert(data, options) {
    // Build variable lookup
    const typebotVars = {};
    for (const v of (data.variables || data.typebot?.variables || [])) {
        typebotVars[v.id] = v.name;
    }

    const blocks = extractBlocks(data);
    const steps = [];
    const usedVariables = new Set();

    for (const block of blocks) {
        const step = convertBlock(block, typebotVars);
        if (!step) continue;

        if (step.variable) {
            usedVariables.add(step.variable);
        }
        steps.push(step);
    }

    // Ensure there's a completion step
    const hasCompletion = steps.some(s => s.type === 'completion');
    if (!hasCompletion) {
        steps.push({
            type: 'completion',
            title: 'F\u00e9licitations !',
            message: 'Tu as termin\u00e9 ce formulaire. Tes r\u00e9ponses ont \u00e9t\u00e9 sauvegard\u00e9es.'
        });
    }

    const formId = options.id || sanitizeId(data.name || 'form');
    const registryKey = options.key || formId.replace(/_/g, '-');
    const constName = formId.toUpperCase();

    const form = {
        id: formId,
        version: 1,
        title: options.title || data.name || 'Formulaire',
        subtitle: '',
        icon: options.icon || '\u2728',
        checkboxId: options.checkbox || formId.replace(/-/g, '_'),
        theme: LUXURY_THEME,
        bot: { name: 'Mohamed', avatar: 'M' },
        timing: { speed: 55, maxDelay: 2000, betweenBubbles: 1200 },
        variables: Array.from(usedVariables),
        steps: steps
    };

    // Generate JS output
    const jsContent = `/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   ${form.title}
   Auto-generated from Typebot export — REVIEW AND ADJUST
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

const ${constName} = ${JSON.stringify(form, null, 4)};

/* \u2500\u2500\u2500 Form Registry \u2500\u2500\u2500 */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['${registryKey}'] = ${constName};
`;

    return jsContent;
}

// ─── Run ───
const output = convert(typebotData, opts);

try {
    fs.writeFileSync(outputFile, output, 'utf-8');
    console.log('✅ Converted: ' + inputFile + ' → ' + outputFile);

    // Parse and count stats
    const parsed = JSON.parse(output.match(/= ({[\s\S]+});/)[1]);
    console.log('   Steps: ' + parsed.steps.length);
    console.log('   Variables: ' + parsed.variables.length);
    console.log('   Interactive: ' + parsed.steps.filter(s =>
        ['text_input','email_input','phone_input','choice','rating','date_input','slider','file_input'].includes(s.type)
    ).length);

    const todos = parsed.steps.filter(s => s.content && typeof s.content === 'string' && s.content.includes('TODO'));
    if (todos.length > 0) {
        console.log('   ⚠️  TODOs requiring manual attention: ' + todos.length);
    }
} catch (e) {
    console.error('Error writing output:', e.message);
    process.exit(1);
}
