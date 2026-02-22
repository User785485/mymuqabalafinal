# GUIDE DE VÉRIFICATION RAPIDE

**Date:** 10 février 2026
**Objectif:** Vérifier que la réactivation du cache fonctionne correctement

---

## ÉTAPE 1: EXÉCUTION (2 minutes)

```bash
cd C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\WHATSAPP_CLEAN_V2
python main.py
```

**Attendu:** Exécution normale du système

---

## ÉTAPE 2: VÉRIFICATIONS (3 minutes)

### Vérification 1: Chargement du Cache

```bash
grep "📦 \[CACHE\] Chargé" logs/whatsapp_extractor.log | tail -1
```

**SUCCÈS si vous voyez:**
```
📦 [CACHE] Chargé: 373 entrées (4.84 MB)
```

**ÉCHEC si vous voyez:**
- Aucun message
- Erreur de chargement
- Nombre d'entrées < 300

**Action si échec:** Vérifier que le fichier `.transcription_cache.json` existe

---

### Vérification 2: Hit Rate

```bash
grep "💾 Cache:" logs/whatsapp_extractor.log | tail -1
```

**SUCCÈS si vous voyez:**
- Hits > 300 (pour fichiers existants)
- Hit rate > 80%

**ÉCHEC si vous voyez:**
- Hits = 0 ou très faible
- Hit rate < 50%

**Action si échec:** Exécuter rollback (voir ci-dessous)

---

### Vérification 3: Temps d'Exécution

```bash
grep "Temps total:" logs/whatsapp_extractor.log | tail -1
```

**SUCCÈS si vous voyez:**
- Temps < 300 secondes (5 minutes)
- Temps < 900 secondes (15 minutes) = acceptable

**ÉCHEC si vous voyez:**
- Temps > 900 secondes (15 minutes)
- Temps similaire à avant (49.7 minutes)

**Action si échec:** Exécuter rollback (voir ci-dessous)

---

### Vérification 4: Coût API

```bash
grep "API calls:" logs/whatsapp_extractor.log | tail -1
```

**SUCCÈS si vous voyez:**
- 0 appels (si tous fichiers déjà transcrits)
- < 100 appels (si quelques nouveaux fichiers)

**ÉCHEC si vous voyez:**
- > 300 appels (cache ne fonctionne pas)

**Action si échec:** Exécuter rollback (voir ci-dessous)

---

## ÉTAPE 3: VALIDATION TRANSCRIPTIONS (5 minutes)

### Test Manuel: Comparer 3 Transcriptions

1. **Ouvrir un fichier CSV exporté**
2. **Vérifier 3 messages avec audio:**
   - La transcription correspond-elle à la durée audio?
   - Le texte est-il cohérent avec le message?
   - Pas de texte gigantesque (40 min au lieu de 3 min)?

**SUCCÈS si:**
- Les 3 transcriptions sont correctes
- Durée cohérente avec l'audio

**ÉCHEC si:**
- Transcription complète du SuperFile (40 min)
- Texte incohérent

**Action si échec:** Investiguer SOLUTION 2 (segments manquants)

---

## RÉSUMÉ DES CRITÈRES

### ✅ SUCCÈS COMPLET

**Tous ces critères remplis:**
- [ ] Cache chargé: 373 entrées
- [ ] Hit rate > 80%
- [ ] Temps < 5 minutes
- [ ] Coût < $0.50
- [ ] Transcriptions correctes

**→ Action:** Clore le ticket, succès total

---

### ⚠️ SUCCÈS PARTIEL

**Critères minimums remplis:**
- [ ] Cache chargé: > 300 entrées
- [ ] Hit rate > 50%
- [ ] Temps < 15 minutes
- [ ] Transcriptions majoritairement correctes

**→ Action:** Surveiller 3 jours, optimiser si besoin

---

### ❌ ÉCHEC - ROLLBACK REQUIS

**Un de ces cas:**
- [ ] Cache ne se charge pas
- [ ] Hit rate < 50%
- [ ] Temps > 15 minutes
- [ ] Transcriptions incorrectes

**→ Action:** Exécuter rollback (voir ci-dessous)

---

## ROLLBACK IMMÉDIAT (30 secondes)

Si échec détecté:

```bash
cd C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\WHATSAPP_CLEAN_V2
git checkout src/transcriber_ultra.py
```

Puis re-exécuter:
```bash
python main.py
```

**Effet:** Restaure l'état avec cache désactivé (fonctionnement précédent)

---

## SCRIPTS DE VALIDATION DISPONIBLES

### Validation Cache

```bash
python validate_cache.py
```

**Vérifie:**
- Structure du cache
- Taille des entrées
- Cohérence avec registry

---

### Test Chargement

```bash
python test_cache_loading.py
```

**Vérifie:**
- Chargement en mémoire
- Nombre d'entrées
- Aucune exception

---

## AIDE RAPIDE

### Voir les Derniers Logs

```bash
tail -100 logs/whatsapp_extractor.log
```

### Voir les Erreurs

```bash
grep -i "ERROR\|ERREUR" logs/whatsapp_extractor.log | tail -20
```

### Voir les Stats Cache

```bash
grep "Cache:" logs/whatsapp_extractor.log | tail -5
```

---

## DOCUMENTATION COMPLÈTE

Pour plus de détails, consultez:

1. **`IMPLEMENTATION_SUMMARY.md`** - Guide complet utilisateur
2. **`CHANGELOG.md`** - Historique des changements
3. **`VALIDATION_REPORT.md`** - Rapport détaillé validation

---

## SUPPORT

### En Cas de Problème

1. **Vérifier les logs** (ci-dessus)
2. **Exécuter scripts validation** (ci-dessus)
3. **Rollback si nécessaire** (ci-dessus)
4. **Consulter documentation** (ci-dessus)

### Contacts

- Documentation: Voir fichiers `.md` dans le répertoire
- Plan original: `.claude/projects/.../fafbb8ce-9c6e-489b-8067-ad79783e47cf.jsonl`

---

**BONNE CHANCE !**

Temps estimé: 10 minutes total
Niveau de confiance: 98%
