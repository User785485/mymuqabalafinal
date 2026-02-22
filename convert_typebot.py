"""
Typebot JSON → My Muqabala chat-engine JS converter.
Reads all Typebot JSON exports and generates forms/xxx.js files.
"""
import json, os, sys, re, textwrap, unicodedata

# ── Paths ──
BACKUP_BASE = r"C:\AGENTS_UN_THÉRAPEUTE_MUSULMAN\Agent_envoi_messages_whatsapp\Automation_envoi_de_messages\message_customer_care_complétion_cartographie"
FORMULAIRES_DIR = os.path.join(BACKUP_BASE, r"BACKUP_message_customer_care_complétion_cartographie\formulaire typebot\Formulaire_exploratoire_5_parties")
SCENARIOS_DIR = os.path.join(BACKUP_BASE, r"BACKUP_message_customer_care_complétion_cartographie\formulaire typebot\Scenarios")
EXPRESS_DIR = os.path.join(BACKUP_BASE, "V2_EXPRESS")
OUTPUT_DIR = r"C:\Users\Moham\AUTOMATIONS\APP_MY_MUQABALA\web\forms"
EXPORT_DIR = os.path.join(OUTPUT_DIR, "typebot-exports")

# ── Mapping: source file → (output_key, form_id, title, icon, checkboxId) ──
FORM_MAP = {
    # Express (F1 already exists as f1-express.js)
    "F2_EXPRESS_V2.json": ("f2-express", "f2_express", "Le Schéma — La Danse Répétitive", "🔄", "exp2"),
    "F3_EXPRESS_V2.json": ("f3-express", "f3_express", "La Boussole — Ce Qui Compte Vraiment", "🧭", "exp3"),
    "F4_EXPRESS_V2.json": ("f4-express", "f4_express", "Les Forces — L'Engagement", "💪", "exp4"),
    # Scenarios
    "Scenario_01_Etincelle_Initiale.json": ("s1-etincelle", "s1_etincelle", "S1 — L'Étincelle Initiale", "✨", "s1"),
    "Scenario_02_Rythme_Discord.json": ("s2-rythme", "s2_rythme", "S2 — Le Rythme Discord", "🎵", "s2"),
    "Scenario_03_Deux_Mondes.json": ("s3-deux-mondes", "s3_deux_mondes", "S3 — Les Deux Mondes", "🌍", "s3"),
    "Scenario_04_Test_Invisible.json": ("s4-test-invisible", "s4_test_invisible", "S4 — Le Test Invisible", "👁️", "s4"),
    "Scenario_05_Danse_Pouvoir.json": ("s5-danse-pouvoir", "s5_danse_pouvoir", "S5 — La Danse du Pouvoir", "💃", "s5"),
    "Scenario_06_Echo_Passe.json": ("s6-echo-passe", "s6_echo_passe", "S6 — L'Écho du Passé", "🔊", "s6"),
    "Scenario_07_Triangle_Sacre.json": ("s7-triangle-sacre", "s7_triangle_sacre", "S7 — Le Triangle Sacré", "🔺", "s7"),
    "Scenario_08_Miroir_Derangeant.json": ("s8-miroir-derangeant", "s8_miroir_derangeant", "S8 — Le Miroir Dérangeant", "🪞", "s8"),
    "Scenario_09_Promesse_Floue.json": ("s9-promesse-floue", "s9_promesse_floue", "S9 — La Promesse Floue", "🌫️", "s9"),
    "Scenario_10_Futur_Dessine.json": ("s10-futur-se-dessine", "s10_futur_se_dessine", "S10 — Le Futur se Dessine", "🎨", "s10"),
    # Partie 1 — Germination
    "Partie1_Formulaire_1.1.json": ("f1-1-espace-sacre", "f1_1_espace_sacre", "F1.1 — L'Espace Sacré", "🌱", "f1_1"),
    "Partie1_Formulaire_1.2.json": ("f1-2-exploration", "f1_2_exploration", "F1.2 — Exploration Intérieure", "🔍", "f1_2"),
    "Partie1_Formulaire_1.3.json": ("f1-3-fil-conducteur", "f1_3_fil_conducteur", "F1.3 — Le Fil Conducteur", "🧵", "f1_3"),
    "Partie1_Formulaire_1.4.json": ("f1-4-parcours", "f1_4_parcours", "F1.4 — Ton Parcours", "🗺️", "f1_4"),
    "Partie1_Formulaire_1.5.json": ("f1-5-transformation", "f1_5_transformation", "F1.5 — Exploration & Transformation", "🦋", "f1_5"),
    "Partie1_Formulaire_1.6.json": ("f1-6-boussole-interieure", "f1_6_boussole_interieure", "F1.6 — La Boussole Intérieure", "🧭", "f1_6"),
    # Partie 2 — Racines
    "Partie2_Formulaire_2.1.json": ("f2-1-fondations", "f2_1_fondations", "F2.1 — Les Fondations", "🏗️", "f2_1"),
    "Partie2_Formulaire_2.2.json": ("f2-2-heritage", "f2_2_heritage", "F2.2 — L'Héritage Émotionnel", "🧬", "f2_2"),
    "Partie2_Formulaire_2.3.json": ("f2-3-echos", "f2_3_echos", "F2.3 — Les Échos d'Enfance", "👶", "f2_3"),
    "Partie2_Formulaire_2.4.json": ("f2-4-attachement", "f2_4_attachement", "F2.4 — Le Style d'Attachement", "🔗", "f2_4"),
    "Partie2_Formulaire_2.5.json": ("f2-5-corps-raconte", "f2_5_corps_raconte", "F2.5 — Le Corps Raconte", "🫀", "f2_5"),
    # Partie 3 — Patterns
    "Partie3_Formulaire_3.1.json": ("f3-1-debut-relations", "f3_1_debut_relations", "F3.1 — Début des Relations", "💕", "f3_1"),
    "Partie3_Formulaire_3.2.json": ("f3-2-saisons", "f3_2_saisons", "F3.2 — Les Saisons Amoureuses", "🌸", "f3_2"),
    "Partie3_Formulaire_3.3.json": ("f3-3-racines-entrelacees", "f3_3_racines_entrelacees", "F3.3 — Racines Entrelacées", "🌿", "f3_3"),
    "Partie3_Formulaire_3.4.json": ("f3-4-forces-creativite", "f3_4_forces_creativite", "F3.4 — Forces & Créativité", "🎨", "f3_4"),
    # Partie 4 — Valeurs
    "Partie4_Formulaire_4.1.json": ("f4-1-spiritualite", "f4_1_spiritualite", "F4.1 — Spiritualité et Amour", "🤲", "f4_1"),
    "Partie4_Formulaire_4.2.json": ("f4-2-jardin-secret", "f4_2_jardin_secret", "F4.2 — Le Jardin Secret", "🌺", "f4_2"),
    "Partie4_Formulaire_4.3.json": ("f4-3-boussole-coeur", "f4_3_boussole_coeur", "F4.3 — La Boussole du Cœur", "❤️", "f4_3"),
    # Bilan Final
    "Partie5_Formulaire_Final.json": ("f-final-bilan", "f_final_bilan", "Le Bilan Final", "🏆", "f_final"),
}

# ── Luxury theme (shared) ──
THEME = """{
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
    }"""

# ── Typebot block → chat-engine step converter ──

def extract_rich_text(rich_text):
    """Convert Typebot richText array to a string or content array."""
    if not rich_text:
        return ""
    
    parts = []
    for paragraph in rich_text:
        children = paragraph.get("children", [])
        if not children:
            continue
        
        line_parts = []
        has_formatting = False
        for child in children:
            text = child.get("text", "")
            if not text.strip() and not line_parts:
                continue
            if child.get("bold") or child.get("italic"):
                has_formatting = True
            line_parts.append(child)
        
        if line_parts:
            parts.append(line_parts)
    
    if not parts:
        return ""
    
    # If single paragraph with no formatting, return plain string
    if len(parts) == 1:
        line = parts[0]
        if len(line) == 1 and not line[0].get("bold") and not line[0].get("italic"):
            return line[0].get("text", "")
        # Has formatting — return content array
        return format_content_array(line)
    
    # Multiple paragraphs — flatten into a single content array
    # Join paragraphs with line breaks between them
    flat_parts = []
    for i, line in enumerate(parts):
        if i > 0:
            # Add paragraph separator
            flat_parts.append({"text": "\n\n"})
        for child in line:
            text = child.get("text", "")
            if not text:
                continue
            part = {"text": text}
            if child.get("bold"):
                part["bold"] = True
            if child.get("italic"):
                part["italic"] = True
            flat_parts.append(part)
    
    if not flat_parts:
        return ""
    
    # If all parts are plain text with no formatting, join as string
    if all(not p.get("bold") and not p.get("italic") for p in flat_parts):
        return "".join(p["text"] for p in flat_parts)
    
    return flat_parts


def format_content_array(children):
    """Convert children array to chat-engine content format."""
    parts = []
    for child in children:
        text = child.get("text", "")
        if not text:
            continue
        part = {"text": text}
        if child.get("bold"):
            part["bold"] = True
        if child.get("italic"):
            part["italic"] = True
        parts.append(part)
    
    if len(parts) == 1 and not parts[0].get("bold") and not parts[0].get("italic"):
        return parts[0]["text"]
    return parts


def sanitize_variable(name):
    """Convert Typebot variable name to valid JS variable name."""
    if not name or name == 'None':
        return None
    # Transliterate accents: é→e, è→e, etc.
    name = unicodedata.normalize('NFKD', name)
    name = name.encode('ascii', 'ignore').decode('ascii')
    # Remove spaces, special chars
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name)
    name = re.sub(r'_+', '_', name).strip('_').lower()
    return name or None


def convert_block(block, variables_map):
    """Convert a single Typebot block to a chat-engine step."""
    block_type = block.get("type", "")
    content = block.get("content", {}) or {}
    options = block.get("options", {}) or {}
    
    # Text bubble
    if block_type == "text":
        rich_text = content.get("richText", [])
        text = extract_rich_text(rich_text)
        if not text:
            return None
        
        # Check if this is a narrative-style long text (for scenarios)
        if isinstance(text, str) and len(text) > 300:
            return {"type": "narrative", "content": text}
        if isinstance(text, list) and len(text) > 3:
            return {"type": "narrative", "content": text}
        
        return {"type": "message", "content": text}
    
    # Image
    if block_type == "image":
        url = content.get("url", "")
        if url:
            return {"type": "image", "url": url, "alt": ""}
        return None
    
    # Wait/delay
    if block_type == "Wait":
        return None  # We handle timing in the engine
    
    # Phone number input
    if block_type in ("phone number input", "Phone number input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id)) or 'telephone'
        return {"type": "phone_input", "variable": var_name, "placeholder": "06 12 34 56 78", "defaultPrefix": "+33"}

    # Text input
    if block_type in ("text input", "Text input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        placeholder = options.get("labels", {}).get("placeholder", "Ta réponse...")
        is_long = options.get("isLong", False)
        step = {"type": "text_input", "variable": var_name, "placeholder": placeholder}
        if is_long:
            step["isLong"] = True
        return step
    
    # Email input
    if block_type in ("email input", "Email input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        return {"type": "email_input", "variable": var_name, "placeholder": "ton.email@exemple.com"}
    
    # Phone input
    if block_type in ("phone input", "Phone input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        return {"type": "phone_input", "variable": var_name, "placeholder": "06 12 34 56 78", "defaultPrefix": "+33"}
    
    # Number input
    if block_type in ("number input", "Number input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        placeholder = options.get("labels", {}).get("placeholder", "")
        return {"type": "text_input", "variable": var_name, "placeholder": placeholder or "Un nombre..."}
    
    # Rating
    if block_type in ("rating input", "Rating input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        max_val = options.get("length", 10)
        left = options.get("labels", {}).get("left", "")
        right = options.get("labels", {}).get("right", "")
        step = {"type": "rating", "variable": var_name, "max": max_val}
        if left:
            step["leftLabel"] = left
        if right:
            step["rightLabel"] = right
        return step
    
    # Choice / Buttons
    if block_type in ("choice input", "Choice input", "Buttons input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        is_multiple = options.get("isMultipleChoice", False)
        items = block.get("items", [])
        choices = []
        for item in items:
            label = item.get("content", "")
            if not label:
                continue
            item_id = sanitize_variable(label[:30]) or f"opt_{len(choices)}"
            choices.append({"id": item_id, "label": label})
        
        if not choices:
            return None
        
        step = {"type": "choice", "variable": var_name, "options": choices}
        if is_multiple:
            step["multiple"] = True
        return step
    
    # Date input
    if block_type in ("date input", "Date input"):
        var_id = options.get("variableId", "")
        var_name = variables_map.get(var_id, sanitize_variable(var_id))
        return {"type": "date_input", "variable": var_name}
    
    # Redirect / URL — skip
    if block_type in ("redirect", "Redirect"):
        return None
    
    # Script / Code — skip
    if block_type in ("script", "Script", "code", "Code"):
        return None
    
    # Set variable — skip
    if block_type in ("Set variable", "set variable"):
        return None
    
    # Condition — skip (we handle flow linearly)
    if block_type in ("condition", "Condition"):
        return None
    
    # Webhook — skip
    if block_type in ("webhook", "Webhook", "HTTP request"):
        return None
    
    # Google Sheets — skip
    if block_type in ("Google Sheets", "google sheets"):
        return None
    
    # Google Analytics — skip
    if block_type in ("Google Analytics", "google analytics"):
        return None
    
    # Unknown — log and skip
    print(f"    [SKIP] Unknown block type: {block_type}")
    return None


def fix_double_encoding(text):
    """Fix double-encoded UTF-8 text (UTF-8 bytes interpreted as Latin-1 then re-encoded as UTF-8)."""
    if not isinstance(text, str):
        return text
    try:
        # Try to detect double-encoding: encode as Latin-1, then decode as UTF-8
        fixed = text.encode('latin-1').decode('utf-8')
        # Verify it actually changed something and is valid
        if fixed != text:
            return fixed
    except (UnicodeDecodeError, UnicodeEncodeError):
        pass
    return text


def fix_double_encoding_recursive(obj):
    """Recursively fix double-encoded UTF-8 in a JSON structure."""
    if isinstance(obj, str):
        return fix_double_encoding(obj)
    elif isinstance(obj, list):
        return [fix_double_encoding_recursive(item) for item in obj]
    elif isinstance(obj, dict):
        return {fix_double_encoding(k): fix_double_encoding_recursive(v) for k, v in obj.items()}
    return obj


def is_double_encoded(raw_bytes):
    """Check if raw bytes contain double-encoded UTF-8 patterns."""
    # \xc3\x83\xc2 is the signature of double-encoded UTF-8
    return b'\xc3\x83\xc2' in raw_bytes or b'\xc3\xa2\xc2' in raw_bytes


def convert_typebot(json_path, key, form_id, title, icon, checkbox_id):
    """Convert a Typebot JSON file to a chat-engine JS file."""
    # Read raw bytes first to detect double-encoding
    with open(json_path, "rb") as f:
        raw = f.read()
    
    # Strip BOM
    if raw[:3] == b'\xef\xbb\xbf':
        raw = raw[3:]
    
    # Decode
    text = raw.decode('utf-8')
    data = json.loads(text)
    
    # Fix double-encoding if detected
    if is_double_encoded(raw):
        print("[FIX double-encoding] ", end="")
        data = fix_double_encoding_recursive(data)
    
    typebot = data.get("typebot", data)
    groups = typebot.get("groups", [])
    variables_list = typebot.get("variables", [])
    
    # Build variables map: id → name
    variables_map = {}
    for v in variables_list:
        vid = v.get("id", "")
        vname = sanitize_variable(v.get("name", vid))
        if vid and vname:
            variables_map[vid] = vname
    
    # Convert groups → steps
    steps = []
    all_variables = set()
    
    for group in groups:
        group_title = group.get("title", "")
        blocks = group.get("blocks", [])
        
        # Add section title if meaningful
        if group_title and not group_title.lower().startswith("group"):
            # Clean up group title
            clean_title = group_title.strip()
            if clean_title:
                steps.append({"type": "section", "title": clean_title})
        
        for block in blocks:
            step = convert_block(block, variables_map)
            if step:
                steps.append(step)
                # Track variables
                if "variable" in step and step["variable"]:
                    all_variables.add(step["variable"])
    
    # Add completion step if not present
    if not steps or steps[-1].get("type") != "completion":
        steps.append({
            "type": "completion",
            "title": "Félicitations !",
            "message": f"Tu as terminé {title}. Tes réponses ont été sauvegardées.",
            "icon": icon
        })
    
    # Generate JS
    const_name = form_id.upper()
    variables_str = json.dumps(sorted(list(all_variables)), ensure_ascii=False, indent=8)
    
    # Format steps as JS
    steps_js = format_steps_js(steps)
    
    js = f"""/* ═══════════════════════════════════════
   {title}
   Converti depuis Typebot · {len(steps)} steps · {len(all_variables)} variables
═══════════════════════════════════════ */

const {const_name} = {{
    id: '{form_id}',
    version: 1,
    title: {json.dumps(title, ensure_ascii=False)},
    icon: '{icon}',
    checkboxId: '{checkbox_id}',
    theme: {THEME},
    bot: {{
        name: 'Mohamed',
        avatar: 'M'
    }},
    timing: {{
        speed: 55,
        maxDelay: 2000,
        betweenBubbles: 1200
    }},
    variables: {variables_str},

    steps: [
{steps_js}
    ]
}};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {{}};
window.FORM_REGISTRY['{key}'] = {const_name};
"""
    
    output_path = os.path.join(OUTPUT_DIR, f"{key}.js")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js)
    
    return len(steps), len(all_variables)


def format_steps_js(steps):
    """Format steps array as readable JS."""
    lines = []
    for step in steps:
        step_type = step.get("type", "")
        
        if step_type == "section":
            lines.append("")
            lines.append(f"        /* ════════════════════════════════════ */")
            lines.append(f"        {{ type: 'section', title: {json.dumps(step['title'], ensure_ascii=False)} }},")
            lines.append("")
        elif step_type == "message":
            content = step["content"]
            if isinstance(content, str):
                lines.append(f"        {{ type: 'message', content: {json.dumps(content, ensure_ascii=False)} }},")
            elif isinstance(content, list) and all(isinstance(c, dict) for c in content):
                # Content array with formatting
                parts_str = json.dumps(content, ensure_ascii=False)
                lines.append(f"        {{ type: 'message', content: {parts_str} }},")
            else:
                lines.append(f"        {{ type: 'message', content: {json.dumps(str(content), ensure_ascii=False)} }},")
        elif step_type == "narrative":
            content = step["content"]
            if isinstance(content, str):
                lines.append(f"        {{ type: 'narrative', content: {json.dumps(content, ensure_ascii=False)} }},")
            elif isinstance(content, list):
                content_str = json.dumps(content, ensure_ascii=False)
                lines.append(f"        {{ type: 'narrative', content: {content_str} }},")
        elif step_type == "image":
            lines.append(f"        {{ type: 'image', url: {json.dumps(step['url'], ensure_ascii=False)}, alt: {json.dumps(step.get('alt',''), ensure_ascii=False)} }},")
        elif step_type == "choice":
            var = step.get('variable') or 'choix'
            opts = json.dumps(step["options"], ensure_ascii=False)
            multi = ", multiple: true" if step.get("multiple") else ""
            lines.append(f"        {{ type: 'choice', variable: '{var}'{multi}, options: {opts} }},")
        elif step_type == "text_input":
            var = step.get('variable') or 'reponse'
            extra = ""
            if step.get("isLong"):
                extra += ", isLong: true"
            lines.append(f"        {{ type: 'text_input', variable: '{var}', placeholder: {json.dumps(step.get('placeholder',''), ensure_ascii=False)}{extra} }},")
        elif step_type == "email_input":
            var = step.get('variable') or 'email'
            lines.append(f"        {{ type: 'email_input', variable: '{var}', placeholder: {json.dumps(step.get('placeholder',''), ensure_ascii=False)} }},")
        elif step_type == "phone_input":
            var = step.get('variable') or 'telephone'
            lines.append(f"        {{ type: 'phone_input', variable: '{var}', placeholder: {json.dumps(step.get('placeholder',''), ensure_ascii=False)}, defaultPrefix: '+33' }},")
        elif step_type == "rating":
            var = step.get('variable') or 'note'
            extra = ""
            if step.get("leftLabel"):
                extra += f", leftLabel: {json.dumps(step['leftLabel'], ensure_ascii=False)}"
            if step.get("rightLabel"):
                extra += f", rightLabel: {json.dumps(step['rightLabel'], ensure_ascii=False)}"
            lines.append(f"        {{ type: 'rating', variable: '{var}', max: {step.get('max',10)}{extra} }},")
        elif step_type == "date_input":
            var = step.get('variable') or 'date'
            lines.append(f"        {{ type: 'date_input', variable: '{var}' }},")
        elif step_type == "completion":
            lines.append("")
            lines.append(f"        {{ type: 'completion', title: {json.dumps(step['title'], ensure_ascii=False)}, message: {json.dumps(step['message'], ensure_ascii=False)}, icon: '{step['icon']}' }}")
    
    return "\n".join(lines)


def find_file(filename, search_dirs):
    """Find a file in multiple directories, handling encoding issues."""
    for d in search_dirs:
        path = os.path.join(d, filename)
        if os.path.exists(path):
            return path
    # Try walking parent dirs to find the file
    for d in search_dirs:
        parent = os.path.dirname(d)
        if os.path.isdir(parent):
            for root, dirs, files in os.walk(parent):
                if filename in files:
                    return os.path.join(root, filename)
    return None


# ── Main ──
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(EXPORT_DIR, exist_ok=True)
    
    # Source directories — try local exports first (robocopy'd), then original paths
    sources = {
        EXPORT_DIR: list(FORM_MAP.keys()),
    }
    
    total = 0
    errors = []
    
    for src_dir, filenames in sources.items():
        for filename in filenames:
            json_path = os.path.join(src_dir, filename)
            if not os.path.exists(json_path):
                # Try to find the file by walking
                found = find_file(filename, [src_dir, BACKUP_BASE])
                if found:
                    json_path = found
                    print(f"  (found at: {found})")
                else:
                    errors.append(f"NOT FOUND: {filename}")
                    continue
            
            key, form_id, title, icon, checkbox_id = FORM_MAP[filename]
            print(f"Converting {filename} → {key}.js ...", end=" ")
            
            try:
                n_steps, n_vars = convert_typebot(json_path, key, form_id, title, icon, checkbox_id)
                print(f"OK ({n_steps} steps, {n_vars} vars)")
                total += 1
                
                # Also copy JSON to exports dir
                import shutil
                shutil.copy2(json_path, os.path.join(EXPORT_DIR, filename))
            except Exception as e:
                print(f"FAILED: {e}")
                errors.append(f"FAILED: {filename}: {e}")
    
    print(f"\n{'='*50}")
    print(f"Converted: {total}/32")
    if errors:
        print(f"Errors ({len(errors)}):")
        for e in errors:
            print(f"  {e}")
    
    # List output files
    js_files = sorted([f for f in os.listdir(OUTPUT_DIR) if f.endswith('.js') and f != 'f1-express.js'])
    print(f"\nGenerated JS files ({len(js_files)}):")
    for f in js_files:
        size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
        print(f"  {f} ({size:,} bytes)")


if __name__ == "__main__":
    main()
