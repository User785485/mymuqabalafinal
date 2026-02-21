# PROJET APP MOBILE MY MUQABALA — SPECIFICATION TECHNIQUE COMPLETE

**Version** : 3.4.0
**Date** : 2026-02-20
**Auteur** : Claude Opus 4.6 — Analyse pour Mohamed (Un Therapeute Musulman)
**Statut** : TOUTES DECISIONS VALIDEES + AUDIT RESILIENCE COMPLETE — PRET A CODER

---

# DECISIONS VALIDEES PAR LE CLIENT (2026-02-19 / 2026-02-20)

| # | Decision | Choix | Impact |
|---|---------|-------|--------|
| D1 | Architecture | **Supabase + Stream Chat + LiveKit Cloud** | Supabase (auth, DB, storage, forms, matching), Stream Chat (messaging), LiveKit Cloud (appels audio Blink Dates + Phase 2/3, recording Mahram) |
| D2 | Approche | **Produit complet** — pas de MVP iteratif | Toutes les features des le premier lancement |
| D3 | Coaching groupe | **WebinarJam** — 100% externe | Le coaching de groupe (dimanche) se fait entierement sur WebinarJam. Aucun chat de groupe dans l'app. |
| D4 | Formulaire 147Q | **Dans l'app** — style Typeform, admin recoit les data | UX progressive, sauvegarde auto |
| D5 | Budget infra | **Pas de contrainte** | Plan Supabase Pro + Stream Chat + LiveKit Cloud Ship |
| D6 | Nom affiche | **Prenom + initiale nom** (ex: "Fatima C.") | Anonymat partiel, nom complet visible uniquement par le coach |
| D7 | Design | **Reprendre le modele du site** my-muqabala.fr tel quel | Meme couleurs, typos, style elegant |
| D8 | Langue | **Francais uniquement** | Pas d'arabe, pas de RTL, pas d'i18n |
| D9 | Inscription | **Sur invitation uniquement** — le coach donne acces + identifiants | Pas de self-service, pas d'inscription ouverte |
| D10 | Telechargement app | **Le coach envoie le lien** au participant | Onboarding guide par le coach |
| D11 | WhatsApp | **Remplace entierement** — chat + push in-app uniquement | Plus de WhatsApp comme canal de communication |
| D12 | Dark mode | **Oui** — dark mode inclus des le lancement | Theme clair + theme sombre |
| D13 | Comptes stores | **Seront crees** (Apple Developer $99 + Google Play $25) | Pret pour deploiement |
| D14 | Nom de l'app | **My Muqabala** | Nom confirme |
| D15 | Systeme existant | **L'app remplace TOUT** — reprendre les logiques web pour mobile | Migration complete, plus de dashboard web |
| D16 | Chat SDK | **Stream Chat (GetStream)** — SDK dedie au lieu de Supabase Realtime | Robustesse, UI pre-construite, offline sync, audio messages natifs, moderation, push integres |
| D17 | Matching Algorithm | **Seuil compatibilite >= 45% + greedy + round-robin** — pas de cap pool, high ticket first, nombre de passages, exactement 3 Blink Dates, coach override | Tout le monde eligible au-dessus de 45% est selectionne, taille du pool dynamique |
| D18 | Audio Calling SDK | **LiveKit Cloud** (`livekit_client` v2.6.3) — SDK Flutter le plus adopte (48 600 DL/semaine), $50/mois Ship (150K min incluses), Egress recording, open source Apache 2.0 | CallKit NON NECESSAIRE (participants toujours dans l'app pour Blink Dates + appels programmes). ZEGOCLOUD elimine (surpaye CallKit inutile, 5-10x plus cher a scale). Analyse comparative de 12 providers. |

### Correctifs resilience (v3.4.0 — audit 6 agents, 200+ sources web)

| # | Correctif | Impact |
|---|----------|--------|
| C1 | **Push hybride iOS** — webhook Stream → Edge Function → APNs visible | Notifications chat fiables sur iOS (contourne throttle Apple data-only) |
| C2 | **Abstraction audio + failover Agora** — `AudioRoomProvider` interface | Resilience si bugs LiveKit iOS (#351, #712, #714) |
| C3 | **PowerSync offline-first** — sync bidirectionnel Supabase ↔ SQLite | App fonctionne si Supabase down (0 SLA sur Pro, 27 incidents/90j) |
| C4 | **Circuit breakers par service** — closed/open/halfOpen | Pas de cascading failures entre Supabase, Stream, LiveKit |
| C5 | **Sentry remplace Crashlytics** — meilleur support Flutter/Dart | Monitoring + 5 couches d'erreur (defense en profondeur) |
| C6 | **Feature flags + kill switches** — table Supabase `feature_flags` | Desactiver une feature buggee pendant un evenement live sans redeploy |
| C7 | **DPIA RGPD obligatoire** — donnees categorie speciale (precedent Grindr 5.8M EUR) | Conformite legale avant lancement |

---

# TABLE DES MATIERES

1. [Contexte & Vision](#1-contexte--vision)
2. [Analyse de l'existant](#2-analyse-de-lexistant)
3. [Architecture technique recommandee](#3-architecture-technique-recommandee)
4. [Stack technologique](#4-stack-technologique)
5. [Schema de base de donnees](#5-schema-de-base-de-donnees)
6. [Architecture de l'application Flutter](#6-architecture-de-lapplication-flutter)
7. [Ecrans & Parcours utilisateur](#7-ecrans--parcours-utilisateur)
8. [Systeme de chat & messaging](#8-systeme-de-chat--messaging)
9. [Appels audio & Blink Dates](#9-appels-audio--blink-dates)
10. [Notifications push](#10-notifications-push)
11. [Matching & Export](#11-matching--export)
12. [Securite & Conformite](#12-securite--conformite)
13. [Design system](#13-design-system)
14. [Plan d'implementation phase](#14-plan-dimplementation-phase)
15. [Infrastructure & Deploiement](#15-infrastructure--deploiement)
16. [Estimation des couts](#16-estimation-des-couts)
17. [Risques & Mitigations](#17-risques--mitigations)
18. [Audit orchestrateur existant](#18-audit-orchestrateur-existant)
19. [Intelligence competitive (audit v3.4.0)](#intelligence-competitive-audit-v340)

---

---

# 1. CONTEXTE & VISION

## 1.1 Le probleme

Les applications de rencontre musulmanes existantes (Muzz, Salaam, Muzmatch) reproduisent le paradigme toxique du swipe : choix base sur le physique, gratification instantanee, ghosting facile, zero accompagnement. Resultat : frustration chronique, desillusion, blessures repetees.

## 1.2 La solution My Muqabala

My Muqabala est une **agence de rencontre en ligne** (PAS une app de dating) qui :
- Construit la connexion emotionnelle AVANT l'attraction physique
- Accompagne de la premiere voix au mariage (4 phases structurees)
- S'appuie sur des fondements scientifiques (Aron, Gottman, Fisher, Johnson, Chapman, Tatkin, Perel, Hendrix)
- Utilise un rythme Dimanche/Mercredi (action + integration, effet Zeigarnik)
- Integre un "Mahram numerique" (toutes les conversations enregistrees pour coaching)

## 1.3 Pourquoi une app mobile (et pas web)

| Critere | App Web | App Mobile Native (Flutter) |
|---------|---------|---------------------------|
| Push notifications | Limitees (PWA) | Natives, fiables, VoIP |
| Appels audio | WebRTC (qualite variable) | CallKit/ConnectionService natifs |
| Messages audio | Possible mais friction | Natif (micro toujours pret) |
| Enregistrement audio | API MediaRecorder (bugs) | Platform channels natifs |
| Biometrie | Non | Face ID / Fingerprint |
| Hors-ligne | Service Workers (limite) | SQLite + sync |
| Store presence | Non | App Store + Play Store = credibilite |
| Engagement | Onglet navigateur (oubliable) | Icone sur l'ecran d'accueil |

**Verdict** : L'app mobile est le bon choix pour My Muqabala. Le format audio/appels/notifications est fondamental au process.

## 1.4 Scale cible

| Metrique | Court terme (6 mois) | Moyen terme (18 mois) | Long terme (3+ ans) |
|----------|---------------------|----------------------|-------------------|
| Utilisateurs totaux | 100-500 | 5 000-10 000 | 50 000-100 000 |
| Utilisateurs simultanes | 20-50 | 500-1 000 | 5 000-10 000 |
| Messages/jour | 1 000 | 50 000 | 500 000 |
| Appels audio/semaine | 10-50 | 500-1 000 | 5 000-10 000 |

---

---

# 2. ANALYSE DE L'EXISTANT

## 2.1 Inventaire complet des systemes

| Systeme | Localisation | Fonction | Statut |
|---------|-------------|----------|--------|
| Pipeline publication | `AUTOMATIONS MISE EN LIGNE CR/` | Genere pages HTML + deploy Vercel | Actif (485 clients) |
| Agent Cartographie | `AGENTS_UN_THERAPEUTE_MUSULMAN/` | 5 agents IA, 5300 lignes orchestrateur | Actif |
| WhatsApp Evenement | `AUTOMATION_WHATSAPP_CR_EVENEMENT/` | Extraction conversations WhatsApp evenements | Actif |
| WhatsApp Support | `AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT/` | Extraction conversations WhatsApp support | Actif |
| Site web | `my-muqabala.fr` (Vercel) | Pages statiques HTML avec auth 6 chiffres | Actif |
| Supabase | `eawmathizvtxdtdgrwsg.supabase.co` | PostgreSQL, tables clients partiellement configurees | En setup |
| Next.js | `CascadeProjects/my-muqabala-nextjs/` | Template minimal Next.js + Supabase | Non deploye |

## 2.2 Ce qu'on garde

- **Supabase** comme backend principal (auth, DB, storage, edge functions)
- **Design system** (couleurs, typos, philosophie UX)
- **Pipeline cartographie** (les 21 docs HTML sont integres dans l'app)
- **Base de donnees clients** (migration JSON → Supabase)
- **Domaine my-muqabala.fr** (pour l'API et le site vitrine)

## 2.3 Ce qu'on remplace (Decision D15 — l'app remplace TOUT)

- **Auth client-side JavaScript** → Supabase Auth avec OTP telephone (sur invitation coach)
- **Pages HTML statiques** → Contenu servi via API dans l'app
- **Dashboard web my-muqabala.fr** → Admin panel dans l'app mobile
- **WhatsApp comme canal principal** → Chat in-app + push notifications (Decision D11)
- **JSON plat** → PostgreSQL (Supabase)
- **Typeform/Google Forms** → Formulaire 147Q natif in-app style Typeform (Decision D4)
- **Inscription publique** → Invitation uniquement par le coach (Decision D9)

---

---

# 3. ARCHITECTURE TECHNIQUE RECOMMANDEE

## 3.1 Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                    APP FLUTTER (iOS + Android)                    │
│                                                                  │
│  ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Chat UI  │ │ Calls UI   │ │ Forms UI │ │ Dashboard/Profile│  │
│  │(Stream)  │ │(LiveKit)   │ │(Custom)  │ │ (Custom)         │  │
│  └────┬─────┘ └─────┬──────┘ └────┬─────┘ └────────┬─────────┘  │
│       │              │             │                 │            │
│  ┌────▼──────────────▼─────────────▼─────────────────▼─────────┐ │
│  │              Domain Layer (Use Cases)                        │ │
│  └────────────────────────┬────────────────────────────────────┘ │
│                           │                                      │
│  ┌────────────────────────▼────────────────────────────────────┐ │
│  │              Data Layer (Repositories)                       │ │
│  └────┬──────────┬──────────┬──────────┬───────────────────────┘ │
│       │          │          │          │                          │
└───────┼──────────┼──────────┼──────────┼─────────────────────────┘
        │          │          │          │
┌───────▼────┐ ┌──▼────────┐ ┌▼───────┐ ┌▼─────────────────┐
│ Supabase   │ │ Stream    │ │ FCM /  │ │ LiveKit Cloud    │
│ (Auth +    │ │ Chat      │ │ APNs   │ │ (Audio Rooms +   │
│  DB +      │ │ (Messages │ │ (Push  │ │  Blink Dates +   │
│  Storage + │ │  Texte +  │ │  non-  │ │  Egress Record + │
│  Edge Fn)  │ │  Audio +  │ │  chat) │ │  TURN/STUN)      │
│            │ │  Typing + │ │        │ │                  │
│            │ │  Presence)│ │        │ │                  │
└────────────┘ └───────────┘ └────────┘ └──────────────────┘
```

## 3.2 Architecture definitive : Supabase + Stream Chat + LiveKit Cloud (Decisions D1, D16, D18)

```
Supabase (Auth, Profils, Matching, Events, Forms, Storage, Edge Functions)
    +
Stream Chat (Messages texte + audio, typing, presence, read receipts, moderation, push chat)
    +
LiveKit Cloud (Audio rooms Blink Dates 10 min, appels Phase 2/3, Egress recording Mahram)
    +
Firebase FCM (Push notifications NON-chat : events, documents, formulaires)
    +
APNs (Push notifications NON-chat iOS)
    +
WebinarJam (Coaching de groupe — 100% externe, aucun chat de groupe dans l'app)
```

**Separation des responsabilites** :
- **Supabase** = source de verite pour les donnees metier (profils, matchs, events, 147Q, documents)
- **Stream Chat** = tout ce qui est messaging (texte, audio, typing, read receipts, presence, push chat, offline sync, moderation)
- **LiveKit Cloud** = tout ce qui est appels audio en temps reel (audio rooms Blink Dates, appels directs Phase 2/3, Egress recording)
- **FCM/APNs** = push pour les notifications non-chat (nouveau document, rappel evenement, formulaire a remplir)

### Pourquoi LiveKit Cloud (Decision D18) — et pas ZEGOCLOUD

#### Contexte : pourquoi CallKit est NON NECESSAIRE dans My Muqabala

L'analyse initiale de 12 providers avait selectionne ZEGOCLOUD grace a son **CallKit iOS built-in** (ecran d'appel natif quand l'app est fermee). Mais cette analyse partait d'une hypothese fausse : que les participants pourraient recevoir des appels quand l'app est fermee.

**Realite du process My Muqabala** : les participants sont **TOUJOURS dans l'app** quand un appel se produit :

| Scenario | Ou sont les participants | CallKit necessaire ? |
|----------|--------------------------|---------------------|
| **Blink Dates (dimanche soir)** | Deja dans l'app pendant l'evenement. Le coaching se fait sur WebinarJam (externe), puis les participants reviennent dans l'app pour les Blink Dates. L'app les connecte directement a la room audio. | **NON** — appel in-app |
| **Appels Phase 2/3 (semaine)** | Creneaux programmes par le coach (ex: mercredi 20h). Push de rappel 15 min avant. Les 2 ouvrent l'app et rejoignent la room. | **NON** — rendez-vous programme |
| **Appel spontane** | N'existe PAS dans le process My Muqabala. Les appels sont toujours programmes par le coach. | **N/A** |

**Zero scenario** ou un participant doit recevoir un appel alors que l'app est fermee. Donc CallKit = feature inutile.

#### Consequence : ZEGOCLOUD elimine, LiveKit Cloud selectionne

Sans CallKit, ZEGOCLOUD perd son **unique avantage** (CallKit built-in) et coute **5-10x plus cher a scale** :

| Critere | **LiveKit Cloud** (choisi) | ZEGOCLOUD (elimine) |
|---------|---------------------------|---------------------|
| SDK Flutter | `livekit_client` v2.6.3 | `zego_uikit_prebuilt_call` v4.22.3 |
| Likes pub.dev | **254** | 177 |
| DL/semaine | **48 600** | 5 580 |
| Pub points | 140/160 | 140/160 |
| Derniere MAJ | Fev 2026 | Fev 2026 |
| Open source | **Apache 2.0** (self-hostable) | Non (proprietary) |
| Plateformes | **6** (Android, iOS, Web, macOS, Windows, Linux) | 2 (Android, iOS) |
| Cout lancement | **$0** (Build plan, 5K min free) | ~$4-14/mois |
| Cout Ship ($50/mois) | 150K min incluses (largement suffisant) | N/A |
| Cout 5K MAU | **$50/mois** | $330-580/mois |
| Egress recording | **Built-in** (audio-only, save vers S3/Supabase) | Built-in |
| CallKit | NOT_PLANNED → **NON PERTINENT** | Built-in → **INUTILE** |
| GDPR | Choix region cloud | Geofencing Europe |

#### Historique complet de l'analyse (12 providers evalues)

| Provider | Raison d'elimination |
|----------|---------------------|
| **LiveKit Cloud** | **SELECTIONNE** — plus adopte, moins cher, open source |
| ZEGOCLOUD | CallKit built-in = inutile pour notre use case, 5-10x plus cher a scale |
| Agora | 60/160 pub points, iOS crash iPhone 16 (#2453), +37MB APK, derniere MAJ sept 2025 |
| 100ms | Derniere MAJ oct 2025, seulement Android+iOS, CallKit DIY |
| Stream Video | 42 likes, bug Android #1124, call rejection broken #1170 |
| MirrorFly | $299/mois minimum |
| Sendbird | $500/mois minimum pour les appels |
| VideoSDK | CallKit DIY, adoption faible |
| Vonage | Pas de SDK Flutter audio dedie |
| Twilio | Sunset en cours, pricing eleve |
| Dyte / Daily | Adoption Flutter negligeable |
| flutter_webrtc DIY | Bug CallKit #1996 (irrelevant ici), mais aussi : pas de SFU, pas de TURN manage, pas de recording, 4-8 semaines de dev |

Source verification : pub.dev, GitHub issues (GetStream, AgoraIO, livekit, 100mslive, ZEGOCLOUD), docs officiels — Fevrier 2026.

## 3.3 Architecture de resilience (Audit v3.4.0 — 6 agents de recherche, 200+ sources)

> **Contexte** : Un audit exhaustif a ete mene via 6 agents de recherche paralleles (Flutter architecture 2026, Supabase production, Stream Chat reliability, LiveKit Cloud reliability, mobile app resilience patterns, dating app competitive intelligence). Les sections ci-dessous documentent les **7 correctifs critiques** identifies et integres dans le spec.

### 3.3.1 Architecture Push Hybride (CORRECTIF CRITIQUE #1)

**Probleme decouvert** : Apple limite les pushes "data-only" (silencieux) a **2-3/heure** (throttling sans avertissement). Stream Chat envoie principalement des pushes data-only pour synchroniser les messages. Resultat : sur iOS, les notifications de messages arrivent en **retard de plusieurs minutes**, voire pas du tout.

**Solution implementee** : Architecture push a deux canaux :

```
NOTIFICATIONS CHAT — ARCHITECTURE HYBRIDE :

Canal 1 : Sync silencieuse (Stream Chat natif)
┌──────────────┐     ┌────────────────┐
│ Stream Chat  │────▶│ Data-only push │──── Sync messages en background
│ (messages)   │     │ (throttle iOS) │     (fonctionne SI app recente en background)
└──────────────┘     └────────────────┘

Canal 2 : Notification visible (Supabase Edge Function — contourne le throttle)
┌──────────────┐     ┌──────────────────────┐     ┌──────────────┐
│ Stream Chat  │────▶│ Webhook → Supabase   │────▶│ FCM (Android)│
│ message.new  │     │ Edge Function         │     │ APNs VISIBLE │──── iOS (PAS throttle)
│ (webhook)    │     │ (construit payload    │     └──────────────┘
└──────────────┘     │  notification VISIBLE │
                     │  avec titre + body)   │
                     └──────────────────────┘
```

**Implementation** :
1. Configurer un webhook `message.new` dans Stream Chat dashboard → appelle Edge Function Supabase
2. L'Edge Function construit un payload **notification** (PAS data-only) avec `title: "Prenom"`, `body: "Nouveau message"`
3. Envoi direct via Firebase Admin SDK (FCM) et APNs
4. iOS recoit une notification **visible** qui n'est PAS soumise au throttle data-only

### 3.3.2 Abstraction Audio + Failover (CORRECTIF CRITIQUE #2)

**Probleme decouvert** : Le SDK Flutter LiveKit a des bugs actifs sur iOS :
- Bug #351 : `mute/unmute` casse l'audio sur iOS
- Bug #712 : Echecs audio silencieux (pas d'erreur, juste du silence)
- Bug #714 : App freeze au toggle micro

**Solution implementee** : Couche d'abstraction `AudioRoomProvider` :

```dart
// core/audio/audio_room_provider.dart
abstract class AudioRoomProvider {
  Future<void> connect(String roomId, String token);
  Future<void> disconnect();
  Future<void> toggleMute();
  Stream<AudioRoomState> get stateStream;
  Stream<List<AudioParticipant>> get participantsStream;
}

// Primary: LiveKit
class LiveKitAudioProvider implements AudioRoomProvider { ... }

// Fallback: Agora (cold standby, activable en < 30 secondes)
class AgoraAudioProvider implements AudioRoomProvider { ... }
```

**Strategie failover** :
1. LiveKit est le provider par defaut
2. Si echec connexion 3x consecutif OU erreur audio detectee → bascule automatique vers Agora
3. Feature flag `audio_provider` permet de forcer Agora globalement (kill switch evenement live)
4. Le compte Agora est pre-configure mais inactif ($0 tant que non utilise)

### 3.3.3 Offline-First avec PowerSync (CORRECTIF CRITIQUE #3)

**Probleme decouvert** : Supabase Pro n'a **aucun SLA formel** (27 incidents sur 90 jours, ~6.3/mois). Seul le plan Enterprise a un SLA 99.9%.

**Solution implementee** : PowerSync + Supabase pour offline-first :

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Flutter App  │────▶│ PowerSync    │────▶│ Supabase    │
│ (drift/      │     │ (sync engine │     │ PostgreSQL  │
│  SQLite)     │◀────│  bidirec-    │◀────│             │
│              │     │  tionnel)    │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
        │
        │ Si Supabase down :
        │ App fonctionne en lecture locale
        │ Ecritures mises en queue
        │ Sync auto au retour
```

**Tables synchronisees offline** : profiles, events, matchs, documents_coach (metadonnees).
**Tables PAS synchronisees** : messages (Stream Chat gere son propre offline), audio recordings (trop volumineux).

### 3.3.4 Circuit Breakers par service (CORRECTIF #4)

```dart
// core/network/circuit_breaker.dart
enum CircuitState { closed, open, halfOpen }

class CircuitBreaker {
  final int failureThreshold; // 3
  final Duration resetTimeout; // 30 secondes
  CircuitState state = CircuitState.closed;
  int failureCount = 0;

  Future<T> call<T>(Future<T> Function() action) async {
    if (state == CircuitState.open) {
      throw ServiceUnavailableException();
    }
    try {
      final result = await action();
      _onSuccess();
      return result;
    } catch (e) {
      _onFailure();
      rethrow;
    }
  }
}
```

**Un circuit breaker par service** : Supabase, Stream Chat, LiveKit, FCM.
**Degrade gracieux** : si un service est `open`, l'UI affiche un bandeau "fonctionnalite temporairement indisponible" au lieu de crasher.

### 3.3.5 Retry avec backoff exponentiel + jitter (CORRECTIF #5)

```yaml
# pubspec.yaml addition
dependencies:
  dio_smart_retry: ^7.0.0
```

Configuration : 3 retries max, backoff exponentiel (1s → 2s → 4s) + jitter aleatoire (evite thundering herd). Applique sur toutes les requetes Supabase et les webhooks.

### 3.3.6 Monitoring Sentry (CORRECTIF #6 — remplace Crashlytics)

**Probleme** : Firebase Crashlytics ne supporte pas bien les source maps Dart et manque de contexte pour les erreurs Flutter.

**Solution** : Sentry Flutter SDK — meilleur support Flutter natif, breadcrumbs, performance monitoring, release health.

```dart
// 5 couches d'erreur (defense en profondeur)
// 1. FlutterError.onError → Sentry
// 2. PlatformDispatcher.instance.onError → Sentry
// 3. ErrorWidget.builder → UI de fallback par ecran
// 4. Per-feature error boundaries (widget wrapping)
// 5. Isolate.current.addErrorListener → Sentry
```

### 3.3.7 Feature Flags + Kill Switches (CORRECTIF #7)

Pour les evenements live (dimanches soirs), pouvoir desactiver une feature buggee SANS redeploy :

```
┌─────────────────────────────────────────────┐
│           ServiceHealthRegistry              │
│                                              │
│  audio_calls: ENABLED / DISABLED             │
│  audio_provider: LIVEKIT / AGORA             │
│  stream_chat: ENABLED / DEGRADED             │
│  blink_dates: ENABLED / PAUSED               │
│  push_notifications: ENABLED / DISABLED      │
│                                              │
│  Source: Supabase table `feature_flags`      │
│  Refresh: toutes les 60 secondes             │
│  Fallback: cache local si Supabase down      │
└─────────────────────────────────────────────┘
```

### 3.3.8 Pre-event Checklist (recommandation operationnelle)

Avant chaque evenement live (dimanche soir) :
- [ ] Verifier status LiveKit Cloud (status.livekit.io)
- [ ] Verifier status Supabase (status.supabase.com)
- [ ] Verifier status Stream Chat (status.getstream.io)
- [ ] Tester un appel audio complet (connexion + mute/unmute + recording)
- [ ] Verifier que les feature flags sont a `ENABLED`
- [ ] JAMAIS deployer un update le jour d'un evenement
- [ ] Avoir le kill switch Agora pret en cas de probleme LiveKit

**Pourquoi Stream Chat (Decision D16)** :

| Critere | Stream Chat | Supabase Realtime |
|---------|------------|------------------|
| Messages texte | Natif, optimise | Faisable mais custom |
| Messages audio | Natif depuis SDK v9.3.0 (waveform, record, play) | Bug iOS: Supabase Storage ne supporte pas HTTP Range headers → AVPlayer ne fonctionne pas |
| Typing indicators | Natif | Custom + limite a 50 msg/sec sur Pro |
| Read receipts | Natif | Entierement custom |
| Offline sync | SQLite natif via `stream_chat_persistence` (drift) | Aucun support natif (PowerSync requis) |
| Push notifications | Integre (FCM + APNs) | Custom via Edge Functions (cold start 1-3s) |
| Moderation | Signalement, blocage, filtres integres | Entierement custom |
| UI widgets | Pre-construits, personnalisables (Flutter SDK 120 pub points) | Tout a construire from scratch |
| Scalabilite | 5M+ connexions simultanees prouvees | 10K max (Postgres Changes = single thread) |
| Temps d'implementation | ~1-2 semaines | ~8-10 semaines |
| Compliance | SOC 2 Type II, ISO 27001:2022, GDPR, data center Dublin (EU) | SOC 2 Type II |

**Pricing Stream Chat (verifie le 2026-02-20 sur getstream.io/chat/pricing/)** :

| Plan | Prix | MAU | Connexions simultanees | Conditions |
|------|------|-----|----------------------|------------|
| **Build** | Gratuit | 1 000 | 100 | Dev uniquement |
| **Maker Account** | Gratuit | 2 000 | 100 | < 5 personnes, < $10K/mois revenu, < $100K funding |
| **Start** | $499/mois ($399/mois annuel) | 10 000 | 500 | Production |
| **Elevate** | $675/mois ($599/mois annuel) | 10 000 | 500 | + Multi-tenant, HIPAA, advanced search |

Source : https://getstream.io/chat/pricing/ et https://getstream.io/maker-account/

**Overages Start plan** : $0.09/user MAU, $0.99/connexion simultanee, $0.17/GB bande passante media, $0.07/GB stockage media.

**Limites acceptees** :
- Vendor lock-in modere (export possible mais cap 10K messages/user, UI couplee au SDK)
- Pas de E2E encryption (TLS en transit, AES-256 at rest via AWS KMS)
- Cout $499/mois au-dela de 2 000 MAU (pas de tier intermediaire)

---

---

# 4. STACK TECHNOLOGIQUE

## 4.1 Frontend (App Mobile)

| Composant | Technologie | Version | Justification |
|-----------|------------|---------|---------------|
| **Framework** | Flutter | 3.27+ | Cross-platform iOS/Android, un seul codebase, performance native |
| **Langage** | Dart | 3.6+ | Null safety, records, patterns, sealed classes |
| **State Management** | Riverpod | 3.0+ | Type-safe, testable, offline persistence, auto-retry, consensus 2025-2026 |
| **Navigation** | go_router | 14.x | Declaratif, deep links, redirects auth |
| **DI** | Riverpod (auto) | — | Riverpod IS the DI container |
| **HTTP** | dio + dio_smart_retry | 5.x + 7.x | Interceptors, retry exponentiel + jitter, logging, circuit breakers |
| **Local Storage** | drift (SQLite) | 2.x | Offline-first, typed queries |
| **Offline Sync** | powersync | latest | Sync bidirectionnel Supabase ↔ SQLite, fonctionne si Supabase down |
| **Secure Storage** | flutter_secure_storage | 9.x | Keychain iOS / EncryptedSharedPrefs Android |
| **Chat SDK** | stream_chat_flutter | 9.23.x | UI widgets pre-construits (bulles, input, conversations, audio messages, typing) |
| **Chat Persistence** | stream_chat_persistence | latest | Offline sync SQLite via drift |
| **Audio Record** | record | 5.x | Multi-platform, WAV/AAC (pour Blink Dates / hors-chat) |
| **Audio Play** | just_audio | 0.9.x | Background, streaming (pour Blink Dates / hors-chat) |
| **Push (non-chat)** | firebase_messaging + flutter_local_notifications | latest | FCM Android + APNs iOS (events, docs, forms) |
| **Audio Calls** | livekit_client | 2.6.x | WebRTC SFU manage, TURN/STUN integres, quality adaptative, Egress recording |
| **Supabase** | supabase_flutter | 2.x | Auth, DB, Realtime, Storage |
| **Forms** | reactive_forms | 17.x | Validation, groupes, dynamic fields |
| **Images** | cached_network_image | 3.x | Cache, placeholder, blur hash |
| **Animations** | rive | 0.13.x | Animations vectorielles performantes |
| **Internationalization** | flutter_localizations + intl | native | FR uniquement |
| **Code Gen** | freezed + json_serializable + build_runner | latest | Immutable models, JSON serialization |
| **Testing** | flutter_test + mockito + integration_test | native | Unit + Widget + Integration |
| **RASP** | freerasp | 6.6+ | Tamper detection, root/jailbreak, hooking (Frida/Xposed) |
| **Screenshot Block** | screen_protector | latest | FLAG_SECURE Android, secure text iOS |
| **Biometrie** | local_auth | 2.3+ | Face ID, Fingerprint, device passcode |
| **Linting** | very_good_analysis | 6.x | Strict, consistency |

## 4.2 Backend

| Composant | Technologie | Justification |
|-----------|------------|---------------|
| **Auth** | Supabase Auth | Inscription sur invitation (coach cree le compte), login OTP telephone |
| **Database** | Supabase PostgreSQL | RLS, realtime, triggers, functions |
| **Storage** | Supabase Storage | Photos (floutees/nettes), documents coach, cartographies |
| **Edge Functions** | Supabase Edge Functions (Deno) | Webhooks (Stream Chat → push hybride), cron jobs, push non-chat. **ATTENTION** : CPU limit 2s → l'algorithme de matching DOIT tourner en pgSQL (pg_cron) ou worker dedie, PAS en Edge Function |
| **Chat** | Stream Chat (GetStream) | Messages texte + audio, typing, read receipts, presence, offline, moderation, push chat |
| **Audio Calls** | LiveKit Cloud | WebRTC SFU manage, TURN/STUN integre, Egress recording audio-only, open source Apache 2.0 |
| **Push (non-chat)** | Firebase Admin SDK + APNs | Events, documents, formulaires — via Edge Functions |
| **Push (chat)** | Stream Chat | Push integre pour messages chat (FCM + APNs configures dans Stream dashboard) |

## 4.3 Infrastructure

| Composant | Service | Cout estime |
|-----------|---------|-------------|
| **Backend** | Supabase Pro | $25/mois |
| **Chat** | Stream Chat Maker Account | $0/mois (gratuit < 2 000 MAU, < 100 connexions simultanées) |
| **Chat (au-dela 2K MAU)** | Stream Chat Start | $499/mois ($399 annuel) pour 10 000 MAU |
| **Audio Calls** | LiveKit Cloud Ship | $50/mois (150K min WebRTC incluses, overage $0.0005/min). Build plan gratuit (5K min, 100 connexions) pour dev/staging |
| **Push (non-chat)** | Firebase | Gratuit |
| **CDN / Media** | Supabase Storage + Cloudflare | Inclus Supabase |
| **Monitoring + Crash** | Sentry (Flutter) | Gratuit dev (5K events/mois), $26/mois Team (50K events) — remplace Crashlytics (meilleur support Dart source maps, breadcrumbs, performance) |
| **Offline Sync** | PowerSync | Gratuit dev, $49/mois Pro | Sync bidirectionnel Supabase ↔ SQLite, offline-first |
| **Feature Flags** | Supabase table `feature_flags` | $0 (inclus Supabase) | Kill switches pour evenements live |
| **CI/CD** | GitHub Actions | Gratuit (2000 min/mois) |
| **App Store** | Apple Developer | $99/an |
| **Play Store** | Google Play Console | $25 (one-time) |
| **Subscriptions** | RevenueCat | $0 (free < $2500 MTR) |

**Total lancement (< 2 000 MAU)** : ~$85/mois + $124/an stores (Supabase $25 + LiveKit Ship $50 + Stream Chat $0 + Firebase $0 + Sentry $0 + PowerSync $0)
**Total growth (2K-10K MAU)** : ~$585/mois + $124/an stores (Supabase $25 + Stream Chat $499 + LiveKit Ship $50 + Firebase $0 + Sentry $0)
**Total scale (10K-50K MAU)** : ~$1K-1.5K/mois (Stream Chat overages + Sentry $26 + PowerSync $49)
**Total full scale (100K MAU)** : ~$5K-8K/mois (Stream Chat $4K-7K = poste principal. Negocier custom ou evaluer Sendbird)

---

---

# 5. SCHEMA DE BASE DE DONNEES

## 5.1 Tables principales (PostgreSQL via Supabase)

```sql
-- ============================================================
-- UTILISATEURS & AUTH
-- ============================================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    prenom TEXT NOT NULL,
    nom TEXT,                          -- JAMAIS affiche en entier aux participants — affichage: "Prenom N." (initiale + point)
    telephone TEXT UNIQUE NOT NULL,
    email TEXT,
    date_naissance DATE NOT NULL,
    ville TEXT NOT NULL,
    genre TEXT NOT NULL CHECK (genre IN ('homme', 'femme')),
    bio TEXT,
    photo_floue_url TEXT,             -- photo avec blur
    photo_nette_url TEXT,             -- photo claire (acces restreint)
    role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('participant', 'coach', 'admin')),
    statut_parcours TEXT NOT NULL DEFAULT 'inscription'
        CHECK (statut_parcours IN (
            'inscription',
            'formulaire_en_cours',
            'formation',
            'matching_pool',
            'phase_1_matching',
            'phase_2_decouverte',
            'phase_3_approfondie',
            'phase_4_engagement',
            'termine',
            'desactive'
        )),
    date_inscription TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    derniere_connexion TIMESTAMPTZ,
    is_high_ticket BOOLEAN NOT NULL DEFAULT FALSE,   -- programme high ticket (priorite matching)
    nb_events_participes INTEGER NOT NULL DEFAULT 0,  -- compteur evenements pour file de priorite
    metadata JSONB DEFAULT '{}',      -- donnees flexibles
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_telephone ON profiles(telephone);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_statut ON profiles(statut_parcours);
CREATE INDEX idx_profiles_ville ON profiles(ville);
CREATE INDEX idx_profiles_priority
    ON profiles(is_high_ticket DESC, nb_events_participes ASC)
    WHERE statut_parcours = 'matching_pool';

-- ============================================================
-- INVITATIONS (Decision D9 — inscription sur invitation uniquement)
-- ============================================================

CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telephone TEXT NOT NULL,
    prenom TEXT NOT NULL,
    nom TEXT,
    email TEXT,
    created_by UUID NOT NULL REFERENCES profiles(id),  -- le coach qui invite
    statut TEXT NOT NULL DEFAULT 'envoyee'
        CHECK (statut IN ('envoyee', 'acceptee', 'expiree', 'annulee')),
    user_id UUID REFERENCES profiles(id),              -- lie au profil une fois inscrit
    lien_telechargement TEXT,                           -- deep link vers l'app
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invitations_telephone ON invitations(telephone);
CREATE INDEX idx_invitations_statut ON invitations(statut);

-- ============================================================
-- FORMULAIRE 147 QUESTIONS (COMPATIBILITE)
-- ============================================================

CREATE TABLE questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,       -- 1 a 147
    categorie TEXT NOT NULL,            -- 'attachement', 'valeurs', 'communication', 'conflits', 'projections'
    reponse JSONB NOT NULL,             -- format flexible (texte, echelle, choix multiple)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

CREATE INDEX idx_questionnaire_user ON questionnaire_responses(user_id);
CREATE INDEX idx_questionnaire_categorie ON questionnaire_responses(categorie);

-- ============================================================
-- EVENEMENTS DE MATCHING
-- ============================================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    description TEXT,
    date_evenement TIMESTAMPTZ NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('matching', 'coaching_groupe', 'blink_date')),
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    max_participants INTEGER,
    config JSONB DEFAULT '{}',          -- timer blink date, sujets, etc.
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    statut TEXT NOT NULL DEFAULT 'inscrit'
        CHECK (statut IN ('inscrit', 'confirme', 'present', 'absent')),
    role_evenement TEXT DEFAULT 'participant'
        CHECK (role_evenement IN ('participant', 'coach', 'observateur')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- ============================================================
-- NOTE (Decision D17 v3.4.0) : Plus de table waitlist.
-- Le pool n'a plus de cap fixe. Tous les eligibles avec score compatibilite >= 45%
-- sont selectionnes. La priorite (high ticket first, nb passages) determine l'ordre
-- d'attribution des matchs, pas l'inclusion dans le pool.

-- ============================================================
-- MATCHS & COMPATIBILITE
-- ============================================================

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id),              -- evenement d'origine
    user_1_id UUID NOT NULL REFERENCES profiles(id),
    user_2_id UUID NOT NULL REFERENCES profiles(id),
    score_compatibilite NUMERIC(5,2),                  -- 0.00 a 100.00
    statut TEXT NOT NULL DEFAULT 'propose'
        CHECK (statut IN (
            'propose',          -- propose par l'algorithme/coach
            'valide_coach',     -- valide par le coach
            'confirme_mutuel',  -- feedback positif des deux
            'phase_2',          -- passe en decouverte
            'phase_3',          -- passe en decouverte approfondie
            'phase_4',          -- passe en engagement
            'termine_positif',  -- mariage ou engagement
            'termine_negatif',  -- separation
            'annule'
        )),
    analyse_compatibilite JSONB,       -- points convergence, complementarites
    notes_coach TEXT,
    feedback_user_1 JSONB,             -- reactions post-blink date
    feedback_user_2 JSONB,
    photo_selection_user_1 JSONB,      -- IDs photos selectionnees
    photo_selection_user_2 JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (user_1_id < user_2_id)      -- eviter les doublons inverses
);

CREATE INDEX idx_matches_users ON matches(user_1_id, user_2_id);
CREATE INDEX idx_matches_statut ON matches(statut);
CREATE INDEX idx_matches_event ON matches(event_id);

-- ============================================================
-- BLINK DATES
-- ============================================================

CREATE TABLE blink_dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id),
    ordre INTEGER NOT NULL,             -- 1er, 2eme, 3eme tour
    duree_secondes INTEGER DEFAULT 600, -- 10 minutes
    date_debut TIMESTAMPTZ,
    date_fin TIMESTAMPTZ,
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    sujets_proposes JSONB,              -- sujets de conversation affiches
    enregistrement_url TEXT,            -- URL audio enregistre (Mahram)
    feedback_user_1 JSONB,
    feedback_user_2 JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CHAT — Gere par Stream Chat (Decision D16)
-- ============================================================
-- Les tables conversations, messages, conversation_members
-- ne sont PAS dans Supabase. Stream Chat gere :
--   - Stockage des messages (texte + audio + media)
--   - Channels (conversations 1-to-1 et groupe)
--   - Members (participants par channel)
--   - Typing indicators, read receipts, presence
--   - Offline sync (SQLite local via stream_chat_persistence)
--   - Push notifications pour les messages
--   - Moderation (signalement, blocage, filtres)
--
-- Lien Supabase ↔ Stream Chat :
--   - A la creation d'un match, une Edge Function cree un channel Stream
--     avec l'ID du match comme channel_id (type: "messaging")
--   - A l'inscription d'un participant, une Edge Function cree le channel
--     coach ↔ participant (type: "coaching")
--   - Le token Stream est genere cote serveur (Edge Function) avec le
--     user_id Supabase comme identifiant Stream
--   - Le coach a le role "admin" sur tous les channels (Mahram numerique)
-- ============================================================

-- ============================================================
-- FORMULAIRES DE RESSENTI
-- ============================================================

CREATE TABLE feedback_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    match_id UUID REFERENCES matches(id),
    event_id UUID REFERENCES events(id),
    type_formulaire TEXT NOT NULL
        CHECK (type_formulaire IN (
            'post_blink_date',
            'post_audio',
            'post_appel',
            'post_rdv_physique',
            'bilan_hebdomadaire',
            'bilan_mensuel'
        )),
    reponses JSONB NOT NULL,            -- toutes les reponses au formulaire
    commentaire_coach TEXT,             -- notes du coach sur ce feedback
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feedback_user ON feedback_forms(user_id);
CREATE INDEX idx_feedback_match ON feedback_forms(match_id);

-- ============================================================
-- DOCUMENTS DU COACH (compte-rendu, preparations, etc.)
-- ============================================================

CREATE TABLE coach_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destinataire_id UUID NOT NULL REFERENCES profiles(id),
    match_id UUID REFERENCES matches(id),
    type_document TEXT NOT NULL
        CHECK (type_document IN (
            'compte_rendu_matching',
            'analyse_compatibilite',
            'compte_rendu_audio',
            'compte_rendu_appel',
            'compte_rendu_rdv',
            'preparation_audio',
            'preparation_appel',
            'preparation_rdv',
            'bilan_hebdomadaire',
            'bilan_mensuel',
            'boucle_engagement',
            'cartographie_emotionnelle'
        )),
    titre TEXT NOT NULL,
    contenu_html TEXT,                  -- contenu HTML riche
    contenu_url TEXT,                   -- URL vers fichier HTML externe
    is_read BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coach_docs_destinataire ON coach_documents(destinataire_id);
CREATE INDEX idx_coach_docs_type ON coach_documents(type_document);

-- ============================================================
-- SESSIONS DE COACHING
-- ============================================================

CREATE TABLE coaching_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id),
    titre TEXT NOT NULL,
    description TEXT,
    date_session TIMESTAMPTZ NOT NULL,
    duree_minutes INTEGER DEFAULT 45,
    type TEXT NOT NULL CHECK (type IN ('groupe', 'individuel')),
    video_url TEXT,                      -- replay video
    audio_url TEXT,                      -- replay audio
    guide_url TEXT,                      -- guide ecrit
    statut TEXT DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PHOTOS POUR SELECTION (avec leurres)
-- ============================================================

CREATE TABLE photo_selections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id),
    selecteur_id UUID NOT NULL REFERENCES profiles(id),  -- qui selectionne
    photo_user_id UUID NOT NULL REFERENCES profiles(id),  -- de qui est la photo
    is_leurre BOOLEAN NOT NULL DEFAULT FALSE,              -- photo d'un non-match
    is_selected BOOLEAN DEFAULT FALSE,                     -- le selecteur a-t-il choisi cette photo ?
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    titre TEXT NOT NULL,
    corps TEXT NOT NULL,
    data JSONB DEFAULT '{}',            -- deep link data
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE is_read = FALSE;

-- ============================================================
-- DEVICE TOKENS (pour push notifications)
-- ============================================================

CREATE TABLE device_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, token)
);

-- ============================================================
-- FEATURE FLAGS (audit resilience v3.4.0 — kill switches)
-- ============================================================

CREATE TABLE feature_flags (
    key TEXT PRIMARY KEY,                    -- ex: 'audio_calls', 'stream_chat', 'blink_dates'
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    value TEXT,                               -- valeur optionnelle (ex: 'livekit' ou 'agora' pour audio_provider)
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES profiles(id)  -- quel coach a modifie le flag
);

-- Flags par defaut
INSERT INTO feature_flags (key, enabled, value, description) VALUES
    ('audio_calls', TRUE, 'livekit', 'Provider audio: livekit ou agora'),
    ('stream_chat', TRUE, NULL, 'Chat messaging actif'),
    ('blink_dates', TRUE, NULL, 'Blink Dates actifs'),
    ('push_notifications', TRUE, NULL, 'Push notifications actives'),
    ('photo_selection', TRUE, NULL, 'Selection photos actif');
```

## 5.2 Row Level Security (RLS) — Exemples critiques

```sql
-- Participants voient uniquement LEUR profil en detail
-- Voient prenom + photo floue des autres (jamais photo nette)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own full profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can view basic info of others"
    ON profiles FOR SELECT
    USING (
        auth.uid() != id
        AND EXISTS (
            SELECT 1 FROM matches
            WHERE (user_1_id = auth.uid() AND user_2_id = profiles.id)
               OR (user_2_id = auth.uid() AND user_1_id = profiles.id)
        )
    );

CREATE POLICY "Coaches can view all profiles"
    ON profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid() AND p.role IN ('coach', 'admin')
        )
    );

-- PERFORMANCE RLS (audit v3.4.0) : Utiliser le wrapper (select auth.uid()) au lieu de auth.uid()
-- directement dans les policies. Cela evite la re-evaluation de la fonction a chaque ligne
-- et donne un gain de performance de ~100x sur les tables volumineuses.
-- Exemple : USING ((select auth.uid()) = id) au lieu de USING (auth.uid() = id)

-- Messages : geres par Stream Chat (Decision D16)
-- La securite des messages (qui peut lire/ecrire dans quel channel)
-- est geree par Stream Chat via les channel permissions et les roles.
-- Le coach a le role "admin" sur tous les channels (acces Mahram numerique).
-- Les participants ne voient que leurs propres channels (match + coach).
```

---

---

# 6. ARCHITECTURE DE L'APPLICATION FLUTTER

## 6.1 Structure des dossiers (Clean Architecture + Feature-First)

```
lib/
├── main.dart                          # Entry point
├── app.dart                           # MaterialApp, routing, theme
├── bootstrap.dart                     # Init: Supabase, Stream Chat, Firebase, etc.
│
├── core/                              # Shared, transversal
│   ├── constants/
│   │   ├── app_colors.dart
│   │   ├── app_typography.dart
│   │   ├── app_spacing.dart
│   │   └── api_constants.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   └── dark_theme.dart
│   ├── router/
│   │   └── app_router.dart            # go_router config
│   ├── network/
│   │   ├── supabase_client.dart
│   │   ├── api_interceptors.dart
│   │   ├── circuit_breaker.dart          # Circuit breaker par service (v3.4.0)
│   │   └── retry_config.dart             # dio_smart_retry config (v3.4.0)
│   ├── audio/
│   │   ├── audio_room_provider.dart      # Interface abstraite (v3.4.0)
│   │   ├── livekit_audio_provider.dart   # Primary: LiveKit Cloud
│   │   └── agora_audio_provider.dart     # Fallback: Agora (cold standby)
│   ├── resilience/
│   │   ├── service_health_registry.dart  # Feature flags + kill switches (v3.4.0)
│   │   ├── error_boundaries.dart         # 5 couches d'erreur (v3.4.0)
│   │   └── offline_sync_config.dart      # PowerSync config (v3.4.0)
│   ├── storage/
│   │   ├── secure_storage.dart
│   │   └── local_database.dart        # drift
│   ├── utils/
│   │   ├── date_utils.dart
│   │   ├── validators.dart
│   │   └── logger.dart
│   └── widgets/                       # Reusable widgets
│       ├── muqabala_button.dart
│       ├── muqabala_text_field.dart
│       ├── avatar_circle.dart
│       ├── blurred_photo.dart
│       ├── audio_player_widget.dart       # Pour audio HORS chat (Blink Dates, replays)
│       ├── audio_recorder_widget.dart     # Pour audio HORS chat (notes vocales admin)
│       ├── loading_skeleton.dart
│       └── empty_state.dart
│
├── features/                          # Feature modules
│   ├── auth/
│   │   ├── data/
│   │   │   ├── auth_repository.dart
│   │   │   └── models/
│   │   ├── domain/
│   │   │   └── entities/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── login_screen.dart
│   │   │   │   ├── otp_screen.dart
│   │   │   │   └── onboarding_screen.dart
│   │   │   ├── widgets/
│   │   │   └── providers/
│   │   │       └── auth_provider.dart
│   │
│   ├── profile/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── profile_screen.dart
│   │       │   └── edit_profile_screen.dart
│   │       └── providers/
│   │
│   ├── chat/                          # Powered by Stream Chat SDK
│   │   ├── data/
│   │   │   ├── stream_chat_service.dart    # Init client, connect user, generate token
│   │   │   └── channel_factory.dart        # Create channels for match/coach/groupe
│   │   ├── domain/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── conversations_list_screen.dart  # StreamChannelListView (widget Stream)
│   │       │   └── chat_screen.dart                # StreamMessageListView + StreamMessageInput
│   │       ├── widgets/
│   │       │   ├── muqabala_channel_preview.dart   # Custom channel preview (theme My Muqabala)
│   │       │   └── coach_badge_builder.dart         # Badge "Coach" sur les messages du coach
│   │       └── providers/
│   │           └── stream_chat_provider.dart        # StreamChatClient via Riverpod
│   │
│   ├── calls/
│   │   ├── data/
│   │   │   └── call_repository.dart
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── call_screen.dart
│   │   │   │   ├── incoming_call_screen.dart
│   │   │   │   └── blink_date_screen.dart  # Timer + sujets
│   │   │   └── providers/
│   │   │       └── call_provider.dart
│   │
│   ├── matching/
│   │   ├── data/
│   │   │   └── matching_repository.dart
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── match_reveal_screen.dart
│   │   │   │   ├── compatibility_screen.dart
│   │   │   │   └── photo_selection_screen.dart
│   │   │   └── providers/
│   │
│   ├── events/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── upcoming_events_screen.dart
│   │   │   │   ├── event_detail_screen.dart
│   │   │   │   └── live_coaching_screen.dart
│   │   │   └── providers/
│   │
│   ├── forms/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── questionnaire_screen.dart    # 147 questions
│   │   │   │   ├── feedback_form_screen.dart    # Post-event feedback
│   │   │   │   └── weekly_checkin_screen.dart
│   │   │   └── providers/
│   │
│   ├── documents/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   ├── documents_list_screen.dart
│   │   │   │   ├── document_viewer_screen.dart  # HTML viewer
│   │   │   │   └── cartographie_dashboard.dart  # 21 docs nav
│   │   │   └── providers/
│   │
│   ├── notifications/
│   │   ├── data/
│   │   │   └── notification_repository.dart
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   └── notifications_screen.dart
│   │   │   └── providers/
│   │
│   └── admin/                         # Coach/Admin only
│       ├── data/
│       ├── presentation/
│       │   ├── screens/
│       │   │   ├── admin_dashboard.dart
│       │   │   ├── participants_list.dart
│       │   │   ├── create_event_screen.dart
│       │   │   ├── manage_matches_screen.dart
│       │   │   ├── import_export_screen.dart
│       │   │   └── send_document_screen.dart
│       │   └── providers/
│
├── l10n/                              # Localizations
│   └── app_fr.arb                     # Francais uniquement (Decision D8)
│
└── gen/                               # Generated code
    ├── assets.gen.dart
    └── l10n/
```

## 6.2 Principes architecturaux

### Clean Architecture (adapte Flutter)

```
┌──────────────────────────────────────┐
│  PRESENTATION (Screens + Providers)  │  ← Depend du Domain
├──────────────────────────────────────┤
│  DOMAIN (Entities + Use Cases)       │  ← Zero dependance
├──────────────────────────────────────┤
│  DATA (Repositories + Models)        │  ← Implemente le Domain
└──────────────────────────────────────┘
```

### Conventions de code

- **Fichiers** : snake_case (`chat_screen.dart`)
- **Classes** : PascalCase (`ChatScreen`)
- **Variables** : camelCase (`messageList`)
- **Constantes** : camelCase ou SCREAMING_SNAKE (`maxBlinkDateDuration`)
- **Freezed** pour tous les models (immutability, copyWith, JSON)
- **Riverpod providers** suffixes : `Provider`, `NotifierProvider`, `FutureProvider`
- **1 fichier = 1 widget/classe** (sauf widgets prives)

---

---

# 7. ECRANS & PARCOURS UTILISATEUR

## 7.1 Navigation principale (Bottom Navigation Bar)

```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  Accueil │  Chat   │ Evenem. │  Docs   │ Profil  │
│   🏠    │   💬   │   📅    │   📄   │   👤    │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

## 7.2 Arbre des ecrans

```
Splash Screen
├── Onboarding (3-4 slides — concept My Muqabala)
├── Login (identifiants fournis par le coach → telephone + OTP)
│
├── [AUTH GATE]
│
├── TAB: Accueil
│   ├── Dashboard personnalise
│   │   ├── Statut parcours (badge phase actuelle)
│   │   ├── Prochain evenement (countdown)
│   │   ├── Actions en attente (formulaire a remplir, doc a lire)
│   │   └── Message du coach
│   └── Carte de match (si match actif)
│       ├── Prenom + photo floue/nette selon phase
│       ├── Score compatibilite
│       └── Bouton "Voir analyse"
│
├── TAB: Chat
│   ├── Liste conversations
│   │   ├── Chat avec match (1-to-1)
│   │   └── Chat avec le coach (1-to-1)
│   └── Ecran de chat
│       ├── Messages texte
│       ├── Messages audio (enregistrer + play)
│       ├── Typing indicator
│       ├── Read receipts
│       └── Bouton appel audio
│
├── TAB: Evenements
│   ├── Evenements a venir
│   │   ├── Coaching groupe dimanche (lien WebinarJam externe)
│   │   ├── Blink Dates
│   │   └── Appel programme
│   ├── Ecran Blink Date
│   │   ├── Fiche personne (prenom, photo floue, hobbies)
│   │   ├── Timer 10:00 decompte
│   │   ├── Sujets de conversation
│   │   └── Feedback rapide post-blink
│   └── Ecran Selection Photos
│       ├── 5 photos (matchs + leurres)
│       ├── Selection multi
│       └── Confirmation
│
├── TAB: Documents
│   ├── Compte-rendus du coach
│   ├── Documents de preparation
│   ├── Analyses de compatibilite
│   ├── Cartographie emotionnelle (21 docs)
│   │   └── [WebView ou HTML renderer]
│   └── Boucles d'engagement (Phase 4)
│
├── TAB: Profil
│   ├── Informations personnelles
│   ├── Photo (modifier)
│   ├── Parametres
│   │   ├── Notifications
│   │   ├── Securite (biometrie)
│   │   └── Deconnexion
│   └── Aide & Contact
│
└── [ADMIN ONLY — Coach]
    ├── Dashboard admin
    │   ├── Stats globales (participants actifs, events, matchs)
    │   └── Alertes (formulaires en attente, matchs < 3)
    ├── Inviter un participant (creer compte + envoyer lien)
    ├── Liste participants (avec statut parcours, is_high_ticket, nb_events)
    ├── Creer evenement
    ├── Gerer le pool de matching (Decision D17)
    │   ├── Voir les eligibles (147Q complete, statut matching_pool)
    │   ├── Ordre de priorite (high ticket first, puis nb passages croissant)
    │   ├── Seuil compatibilite : 45% (modifiable par le coach)
    │   └── Retirer manuellement (exclure une personne)
    ├── Lancer l'algorithme de matching
    │   ├── Resultats : chaque personne avec ses 3 matchs + scores
    │   ├── Alertes : personnes avec < 3 matchs
    │   ├── Modifier manuellement (echanger, forcer, retirer)
    │   ├── Recalculer apres modifications
    │   └── Valider tout → notifications + channels Stream + rooms LiveKit
    ├── Planification des tours (round-robin, 3 tours sans conflit)
    ├── Export matchs (CSV, JSON, PDF avec analyse)
    ├── Ecran profil de scoring (voir le 147Q de chaque participant)
    ├── Envoyer document
    └── Voir tous les chats (Mahram numerique)
```

---

---

# 8. SYSTEME DE CHAT & MESSAGING (Decision D16 — Stream Chat)

## 8.1 Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     FLUTTER APP                                 │
│                                                                │
│   StreamChat (widget racine, fournit le client a tout l'arbre) │
│   │                                                            │
│   ├── StreamChannelListView (liste conversations)              │
│   │   ├── Channel "match:{match_id}" (chat 1-to-1 match)      │
│   │   └── Channel "coach:{user_id}" (chat 1-to-1 coach)       │
│   │                                                            │
│   └── StreamMessageListView + StreamMessageInput (ecran chat)  │
│       ├── Messages texte (bulles, reactions, reply)            │
│       ├── Messages audio (voice recording natif SDK v9.3.0+)  │
│       ├── Typing indicator (natif)                             │
│       ├── Read receipts (natif)                                │
│       └── Presence en ligne (natif)                            │
│                                                                │
│   StreamChatPersistence (offline sync SQLite via drift)        │
└─────────────────────┬──────────────────────────────────────────┘
                      │ WebSocket
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STREAM CHAT (getstream.io)                    │
│                                                                 │
│   Infrastructure geree :                                        │
│   ├── Stockage messages (texte + audio + media)                 │
│   ├── CDN global (285+ villes) pour les medias                  │
│   ├── Push notifications chat (FCM + APNs)                      │
│   ├── Moderation (signalement, blocage, filtres)                │
│   ├── Presence et typing indicators                             │
│   └── Export messages (API server-side)                         │
│                                                                 │
│   Data center : Dublin, Irlande (EU — GDPR)                    │
│   Certifications : SOC 2 Type II, ISO 27001:2022               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE (orchestration)                      │
│                                                                 │
│   Edge Function: create_stream_channel                          │
│   ├── Appelee a la creation d'un match → cree channel Stream    │
│   └── Appelee a l'inscription → cree channel coach-participant  │
│                                                                 │
│   Edge Function: generate_stream_token                          │
│   ├── Genere un token JWT Stream pour le user_id Supabase       │
│   └── Appelee au login de l'app                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 8.2 Types de channels Stream

| Type Stream | Usage My Muqabala | Membres | Creation |
|-------------|------------------|---------|----------|
| `messaging` | Chat 1-to-1 entre match | 2 participants + coach (admin) | A la validation du match par le coach |
| `coaching` | Chat participant ↔ coach | 1 participant + coach | A l'inscription du participant |

## 8.3 Messages audio (natif Stream Chat)

Le SDK `stream_chat_flutter` v9.3.0+ inclut nativement l'enregistrement et la lecture de messages vocaux :

```
Workflow audio (gere par le SDK Stream, aucun code custom) :
1. L'utilisateur appuie et maintient le bouton micro (long press > 1 seconde)
2. Vue d'enregistrement avec waveform + options (ajouter, slide-to-cancel, lock)
3. En mode lock : stop, envoyer, ou annuler sans maintenir
4. Au relachement/envoi : upload automatique sur le CDN Stream
5. Le message apparait avec waveform + bouton play chez le destinataire
6. Push notification automatique (geree par Stream)
7. Option : sendVoiceRecordingAutomatically = true pour envoi direct

Personnalisation via StreamVoiceRecordingAttachmentTheme (couleurs, icones).
```

## 8.4 Chat avec le coach

- Channel `coaching:{user_id}` cree automatiquement a l'inscription du participant
- Le coach a le role `admin` sur TOUS les channels → acces Mahram numerique
- Les messages du coach ont un custom builder avec badge "Coach" (via `messageBuilder`)
- Le coach peut partager des fichiers/documents dans le chat (upload natif Stream)
- Vue admin : le coach liste tous les channels avec `StreamChannelListController` filtre

## 8.5 Coaching de groupe (Decision D3 — 100% WebinarJam, externe)

Le coaching de groupe du dimanche soir se fait **entierement sur WebinarJam**. Il n'y a **aucun chat de groupe dans l'app**. L'app affiche uniquement le lien WebinarJam et les rappels.

```
┌──────────────────────────────────────┐
│  COACHING GROUPE — DIMANCHE 19H      │
│                                      │
│  Le coaching se deroule sur          │
│  WebinarJam (100% externe).          │
│                                      │
│  [Rejoindre le live sur WebinarJam]  │
│  (ouvre le navigateur / app WebinarJam)│
│                                      │
│  Rappel : Push J-2 + J-0            │
└──────────────────────────────────────┘
```

- Le webinar est lance par le coach sur WebinarJam
- L'app affiche uniquement un **bouton lien** vers le webinar (ouverture externe)
- Le chat, les reactions, les Q&A se font **dans WebinarJam** (pas dans l'app)
- Push notification J-2 + J-0 pour rappeler le coaching (via Edge Function Supabase)

## 8.6 Initialisation Stream Chat dans l'app

```dart
// bootstrap.dart — simplifie, pas le code final
// 1. Init StreamChatClient avec la cle API (PAS le secret)
final client = StreamChatClient('STREAM_API_KEY');

// 2. Au login, generer un token via Edge Function Supabase
final token = await supabase.functions.invoke('generate_stream_token');

// 3. Connecter l'utilisateur Stream avec le meme user_id que Supabase
await client.connectUser(
  User(id: supabaseUser.id, name: profile.prenom),
  token.data['stream_token'],
);

// 4. Activer l'offline persistence
final chatPersistenceClient = StreamChatPersistenceClient(
  logLevel: Level.INFO,
  connectionMode: ConnectionMode.background, // sync en background isolate
);
await client.chatPersistenceClient = chatPersistenceClient;
```

## 8.7 Theming Stream Chat (Design My Muqabala)

Le SDK Stream offre 3 niveaux d'integration :
1. **UI widgets complets** (`stream_chat_flutter`) — le plus rapide, widgets pre-construits personnalisables via theme
2. **Controllers** (`stream_chat_flutter_core`) — tu gardes le controle de l'UI mais les controllers gerent la logique
3. **Low-level** (`stream_chat`) — client pur, tu construis toute l'UI

**Pour My Muqabala : niveau 1 (UI widgets) avec theme custom** :

```dart
// Theme Stream Chat adapte au design system My Muqabala
StreamChatThemeData(
  channelListHeaderTheme: StreamChannelListHeaderThemeData(
    color: AppColors.violet,
  ),
  ownMessageTheme: StreamMessageThemeData(
    messageBackgroundColor: AppColors.violet.withOpacity(0.1),
    messageTextStyle: AppTypography.bodyLarge,
  ),
  otherMessageTheme: StreamMessageThemeData(
    messageBackgroundColor: AppColors.surface,
    messageTextStyle: AppTypography.bodyLarge,
  ),
  // ... autres tokens
);
```

---

---

# 9. APPELS AUDIO & BLINK DATES (Decision D18 — LiveKit Cloud)

## 9.1 Stack audio : LiveKit Cloud

**LiveKit Cloud** (`livekit_client` v2.6.3 — Apache 2.0) :
- **SDK Flutter le plus adopte** : 254 likes, 48 600 DL/semaine, 140 pub points, 377 GitHub stars
- **WebRTC SFU manage** : TURN/STUN integres, quality adaptative, pas de serveur a gerer
- **Egress recording built-in** : enregistrement audio-only cote serveur (Mahram numerique), save vers S3/GCS/Supabase Storage
- **Audio rooms** : mode audio-only natif (pas de camera, pas de video)
- **6 plateformes** : Android, iOS, Web, macOS, Windows, Linux
- **Open source Apache 2.0** : code source dispo, self-hostable si besoin futur
- **Derniere MAJ** : fevrier 2026 (developpement actif, 801 commits, 24+ contributeurs)
- Source : https://pub.dev/packages/livekit_client et https://livekit.io/pricing

**Pourquoi CallKit N'EST PAS necessaire** (point critique, voir aussi section 3.2) :
- **Blink Dates** : les 2 participants sont deja dans l'app pendant l'evenement → connexion directe a la room
- **Appels Phase 2/3** : creneaux programmes par le coach → push de rappel → les 2 ouvrent l'app → rejoignent la room
- **Zero appel spontane** dans le process My Muqabala → zero besoin de sonner comme un vrai appel telephone

**Pricing LiveKit Cloud (verifie le 2026-02-20 sur livekit.io/pricing)** :

| Plan | Prix | Min WebRTC incluses | Overage | Connexions | Support |
|------|------|---------------------|---------|------------|---------|
| **Build** (dev) | $0/mois | 5 000 | — | 100 | Community |
| **Ship** (prod) | $50/mois | 150 000 | $0.0005/min | 1 000 | Email |
| **Scale** | $500/mois | 1 500 000 | $0.0004/min | 5 000 | Priority |

**Volume estime My Muqabala** :

| Phase | Participants/event | Blink Dates | Min audio/event | Events/mois | Min/mois | Couvert par Ship ? |
|-------|-------------------|-------------|-----------------|-------------|----------|--------------------|
| Lancement | 50 | 75 | 1 500 | 4 | 6 000 | **OUI** (150K incluses) |
| Croissance | 100 | 150 | 3 000 | 4 | 12 000 | **OUI** |
| + Appels Phase 2/3 | 100 | 150 | 3 000 + ~2 250 | 4 | ~14 250 | **OUI** |
| Scale 5K MAU | — | — | — | — | ~50K-100K | **OUI** |

**Conclusion pricing** : Le plan Ship a $50/mois avec 150 000 min incluses couvre LARGEMENT tous les scenarios jusqu'a 5K+ MAU. Pas de surprise, pas de facturation variable. Cout fixe et previsible.

## 9.2 Blink Date — Flow technique

```
1. AVANT L'EVENEMENT
   - Le coach cree l'evenement + les pairings dans l'admin
   - L'app affiche "Prochain Blink Date: Dimanche 19h" avec countdown

2. DIMANCHE 19H — COACHING GROUPE (100% WebinarJam, Decision D3)
   - Le coach lance le webinar sur WebinarJam (externe)
   - Les participants rejoignent via le lien dans l'app (ouverture navigateur/WebinarJam)
   - Le chat se fait dans WebinarJam (pas dans l'app)
   - Apres le coaching, les participants reviennent dans l'app pour les Blink Dates

3. BLINK DATES START
   - L'app affiche: "Ton Blink Date #1 commence dans 30 secondes"
   - Ecran Blink Date:
     ┌────────────────────────────────┐
     │  BLINK DATE #1                 │
     │                                │
     │       [Photo floue]            │
     │       Prenom, 28 ans           │
     │       Casablanca               │
     │       Lecture, cuisine, sport  │
     │                                │
     │       ⏱️ 09:45                │
     │                                │
     │  💡 Sujet: "Raconte-moi une   │
     │     experience qui t'a         │
     │     transforme(e)"             │
     │                                │
     │  [🔇 Mute] [📞 Fin d'appel]  │
     └────────────────────────────────┘

4. TIMER A ZERO
   - "Votre Blink Date est termine ! Comment c'etait ?"
   - Formulaire rapide inline (2 questions)
   - Transition vers Blink Date #2

5. TOUS LES BLINK DATES TERMINES
   - Ecran Selection Photos (5 photos, matchs + leurres)
   - Confirmation

6. APRES L'EVENEMENT
   - Formulaire de ressenti complet (in-app)
   - Push notification: "N'oublie pas de remplir ton ressenti"
```

## 9.3 CallKit — NON NECESSAIRE (Decision D18)

**CallKit est la fonctionnalite qui affiche l'ecran d'appel natif iOS quand l'app est fermee** (comme un vrai appel telephone). C'etait le critere principal de l'analyse initiale des providers audio.

**Pourquoi CallKit est inutile pour My Muqabala** :
- Les participants sont **TOUJOURS dans l'app** quand un appel se produit
- **Blink Dates** : l'app les connecte directement a la room audio pendant l'evenement
- **Appels Phase 2/3** : creneaux programmes → push de rappel → les 2 ouvrent l'app
- **Aucun appel spontane** : le coach programme TOUS les creneaux

**Consequence** : LiveKit (CallKit NOT_PLANNED) est parfaitement adapte. Les providers avec CallKit built-in (ZEGOCLOUD) n'apportent aucun avantage pour ce use case.

## 9.4 Integration LiveKit dans l'app

```dart
// bootstrap.dart — connexion LiveKit (simplifie)
// 1. Generer un token LiveKit via Edge Function Supabase
final tokenResponse = await supabase.functions.invoke(
  'generate_livekit_token',
  body: {'room_name': 'blink_date_${blinkDateId}', 'identity': supabaseUserId},
);

// 2. Se connecter a la room LiveKit
final room = Room();
await room.connect(
  'wss://mymuqabala.livekit.cloud',  // URL LiveKit Cloud
  tokenResponse.data['token'],
  roomOptions: RoomOptions(
    defaultAudioPublishOptions: AudioPublishOptions(
      audioBitrate: AudioPreset.speech,  // optimise pour la voix
    ),
    defaultVideoPublishOptions: VideoPublishOptions(enabled: false),  // audio-only
  ),
);

// 3. Publier l'audio local
await room.localParticipant?.setMicrophoneEnabled(true);

// 4. Timer cote app (10 min) + auto-disconnect
Timer(Duration(minutes: 10), () => room.disconnect());
```

**Edge Function `generate_livekit_token`** (Supabase Deno) :
```typescript
// Token genere cote serveur avec le LiveKit Server SDK
import { AccessToken } from 'livekit-server-sdk';

const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
  identity: userId,
  ttl: 660,  // 11 min (10 min + 1 min buffer)
});
token.addGrant({
  room: roomName,
  roomJoin: true,
  canPublish: true,
  canSubscribe: true,
});
return token.toJwt();
```

## 9.5 Egress Recording (Mahram numerique)

LiveKit Egress permet l'enregistrement cote serveur des appels audio :

```
BLINK DATE EN COURS
    │
    │ Audio des 2 participants
    │ mixe cote serveur par LiveKit
    │
    ▼
EGRESS (audio-only, format OGG/WAV)
    │
    │ Upload automatique vers
    │ S3-compatible (Supabase Storage)
    │
    ▼
TABLE blink_dates.enregistrement_url
    │
    │ Le coach accede a l'audio
    │ depuis l'admin panel
    │
    ▼
MAHRAM NUMERIQUE ✅
```

L'Egress est declenche via l'API LiveKit (Edge Function) au debut de chaque Blink Date et arrete automatiquement a la fin.

---

---

# 10. NOTIFICATIONS PUSH

## 10.1 Architecture (deux sources de push)

```
NOTIFICATIONS CHAT (gerees par Stream Chat) :
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│ Stream Chat  │────▶│ Stream Push    │────▶│ Firebase FCM  │──── Android
│ (nouveau msg │     │ Gateway        │     │              │
│  envoyé)     │     │ (configure     │────▶│ APNs         │──── iOS
└──────────────┘     │  dans Stream   │     └──────────────┘
                     │  dashboard)    │
                     └────────────────┘

NOTIFICATIONS NON-CHAT (gerees par Supabase) :
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│ Supabase DB  │────▶│ Edge Function  │────▶│ Firebase FCM  │──── Android
│ (trigger on  │     │ (send_push)    │     │              │
│  INSERT)     │     │                │────▶│ APNs         │──── iOS
└──────────────┘     └────────────────┘     └──────────────┘
```

**ATTENTION — DECOUVERTE CRITIQUE (audit resilience v3.4.0)** :
Apple throttle les pushes "data-only" a **2-3/heure** sur iOS. Stream Chat envoie des pushes data-only par defaut pour synchroniser les messages. Cela signifie que les notifications de messages **arrivent en retard ou pas du tout** sur iOS si on utilise uniquement le push natif Stream.

**Solution implementee — Push Hybride** :
1. **Stream Chat push natif** : conserve pour la sync silencieuse en background (Android : fonctionne bien, iOS : throttle)
2. **Webhook `message.new` → Supabase Edge Function → FCM/APNs VISIBLE** : envoie une notification **visible** (avec titre + body) directement via Firebase Admin SDK. Les notifications visibles ne sont PAS soumises au throttle Apple data-only.

Resultat : les notifications arrivent en **< 1 seconde** sur Android ET iOS.

**Separation des responsabilites** :
- Stream Chat push natif = sync background des messages (offline catch-up)
- Edge Function webhook = notification **visible** immediate a l'utilisateur
- Supabase Edge Functions = push pour tout le reste (events, docs, formulaires)

## 10.2 Categories de notifications

| Categorie | Android Channel | iOS Category | Priority |
|-----------|----------------|--------------|----------|
| Message | `messages` | `MESSAGE` | High |
| Audio message | `messages` | `AUDIO_MESSAGE` | High |
| Appel entrant | `calls` (VoIP) | `INCOMING_CALL` | Critical |
| Evenement | `events` | `EVENT` | Default |
| Document coach | `documents` | `DOCUMENT` | High |
| Formulaire | `reminders` | `FORM_REMINDER` | Default |
| Systeme | `system` | `SYSTEM` | Low |

## 10.3 Deep linking

Chaque notification contient un `data` payload avec une route :
```json
{
  "route": "/chat/conversation_id",
  "type": "new_message",
  "conversation_id": "uuid",
  "sender_name": "Prenom"
}
```

L'app utilise go_router pour naviguer directement vers le bon ecran.

---

---

# 11. MATCHING & EXPORT (Decision D17)

## 11.1 Vue d'ensemble du systeme de matching

```
PARTICIPANTS REMPLISSENT LE 147Q
    ↓
CHAQUE PERSONNE A UN PROFIL DE SCORING (automatique)
    ↓
ALGORITHME DE COMPATIBILITE (toutes les paires F × H)
    ↓
FILTRE : SEUIL DE COMPATIBILITE >= 45%
    (seules les paires au-dessus de 45% sont considerees)
    ↓
PRIORITE : HIGH TICKET FIRST + NB PASSAGES (moins = plus prioritaire)
    ↓
ATTRIBUTION GREEDY : EXACTEMENT 3 MATCHS PAR PERSONNE
    (tout le monde eligible est selectionne, pas de cap pool)
    ↓
LE COACH VOIT LES RESULTATS, PEUT MODIFIER
    ↓
LE COACH VALIDE → NOTIFICATIONS + CHANNELS STREAM + ROOMS LIVEKIT
    ↓
PLANIFICATION ROUND-ROBIN : 3 TOURS SANS CONFLIT
    ↓
DIMANCHE SOIR : 3 TOURS DE BLINK DATES (10 min chacun)
    ↓
SELECTION PHOTOS + FEEDBACK
    ↓
nb_events_participes += 1 POUR LES PARTICIPANTS
    ↓
MERCREDI : COACH CROISE 5 SOURCES → MATCH FINAL
    (feedback conversation + photos + score algo + ressenti + observations live)
```

## 11.2 Profil de scoring automatique (147Q → 5 categories)

Les 147 questions sont reparties en 5 categories. Le score de chaque categorie est calcule automatiquement a partir des reponses (Edge Function `calculate_scoring_profile`).

| Categorie | Nb questions | Poids compatibilite | Score |
|-----------|-------------|--------------------:|------:|
| Valeurs & spiritualite | 30 | 25% | 0-100 |
| Style d'attachement | 25 | 20% | 0-100 |
| Communication | 30 | 20% | 0-100 |
| Gestion conflits | 25 | 15% | 0-100 |
| Projections de vie | 37 | 20% | 0-100 |
| **TOTAL** | **147** | **100%** | — |

**Ce que le coach voit dans l'admin** (profil de scoring par personne) :
- Score par categorie (barre de progression + valeur numerique)
- Style d'attachement identifie (Securisant, Anxieux, Evitant, Desorganise)
- Dealbreakers extraits automatiquement (nb enfants souhaites, ville, niveau de pratique)

**Calcul du score par categorie** : moyenne ponderee des reponses normalisees sur 100. Les questions a echelle de Likert sont directement normalisees. Les questions a choix sont mappees vers des valeurs numeriques definies par le coach.

## 11.3 Constitution du pool de matching (seuil compatibilite + priorite)

### Pas de cap fixe — pool dynamique

Il n'y a **pas de limite** au nombre de participants dans le pool. Tout le monde qui remplit les criteres d'eligibilite est selectionne.

### Criteres d'eligibilite

```
✅ 147Q complete (toutes les 147 questions)
✅ statut_parcours = 'matching_pool'
✅ Pas deja en couple (pas en phase 2/3/4)
✅ Pas desactivee
```

### Seuil de compatibilite : >= 45%

Seules les paires avec un **score de compatibilite >= 45%** sont considerees pour l'attribution de matchs. Les paires en dessous de 45% sont exclues meme si les deux personnes sont eligibles.

### Ordre de priorite pour l'attribution

L'ordre de priorite determine **quel match est attribue en premier** (pas qui entre dans le pool — tout le monde eligible y entre).

```
score_priorite = (is_high_ticket × 10000) + (999 - nb_events_participes)
```

| Personne | Type | Nb passages | Score priorite |
|----------|------|-------------|---------------:|
| Fatima C. | High Ticket | 0 | 10 999 |
| Ahmed M. | High Ticket | 2 | 10 997 |
| Leila D. | Standard | 0 | 999 |
| Rachid A. | Standard | 1 | 998 |
| Amine T. | Standard | 3 | 996 |

Les High Ticket sont **toujours** traites en premier (leurs 3 matchs sont attribues avant les autres). Ensuite, les personnes ayant fait le **moins de passages** sont servies en priorite. Tiebreaker : `date_inscription ASC`.

### Algorithme de selection (pgSQL worker, PAS Edge Function)

```
ETAPE 0 — Filtrer les eligibles
    SELECT * FROM profiles
    WHERE statut_parcours = 'matching_pool'
    AND (SELECT COUNT(*) FROM questionnaire_responses
         WHERE user_id = profiles.id) = 147

ETAPE 1 — Calculer la compatibilite pour TOUTES les paires eligibles (F × H)
    Filtrer : garder UNIQUEMENT les paires avec score >= 45%

ETAPE 2 — Trier les paires par priorite
    Pour chaque paire, la priorite = score_priorite(F) + score_priorite(H)
    Puis par score compatibilite decroissant en cas d'egalite
    Les paires impliquant des High Ticket remontent naturellement

ETAPE 3 — Attribution greedy : exactement 3 matchs par personne
    (voir section 11.5)
    Aucune liste d'attente : tout le monde eligible est dans le pool
```

### Point mathematique : la contrainte "exactement 3"

La contrainte "exactement 3 matchs par personne" n'est satisfaisable pour TOUS **que si le nombre de femmes = le nombre d'hommes** dans le pool.

**Preuve** : chaque match consomme 1 slot femme + 1 slot homme. Si F femmes × 3 matchs = total matchs, et H hommes × 3 matchs = total matchs, alors F × 3 = H × 3, donc F = H.

Si F ≠ H (ex: 40F / 60H) :
- 40 femmes × 3 = 120 matchs cote femmes
- 120 matchs / 60 hommes = **2 matchs/homme en moyenne**
- Certains hommes n'auront que 2 matchs → **alerte coach**

**En pratique** : avec le seuil 45%, certaines personnes peuvent avoir < 3 paires eligibles. Le coach est alerte et peut ajuster manuellement.

## 11.4 Algorithme de compatibilite (scoring pairwise)

Pour chaque paire (femme, homme) du pool, un score de compatibilite est calcule (pgSQL worker ou service dedie — PAS Edge Function, CPU limit 2s).

### Formule de compatibilite par paire

```
score_paire(F, H) = Σ (poids_categorie × similarite_categorie(F, H))

Ponderation :
    Valeurs & spiritualite : 25%
    Style d'attachement    : 20%
    Communication          : 20%
    Gestion conflits       : 15%
    Projections de vie     : 20%
```

**Note sur le style d'attachement** : la similarite n'est PAS lineaire. Un couple (Securisant, Anxieux) peut etre plus compatible qu'un couple (Anxieux, Evitant). La matrice de compatibilite des styles d'attachement est definie par le coach selon la litterature (Tatkin, Johnson).

### Dealbreakers

Avant le calcul de compatibilite, les dealbreakers sont verifies. Si un dealbreaker est incompatible (ex: elle veut 3 enfants, il en veut 0), la paire est exclue (score = 0).

### Output

Matrice de scores : F femmes × H hommes, triee par score decroissant. **Seules les paires >= 45% sont conservees.**

Exemple (pool 50F × 50H = 2 500 paires, 1 200 au-dessus du seuil 45%) :

```
Rang 1    : Fatima C. ↔ Ahmed M.    → 92.3%  ✅
Rang 2    : Sara T.   ↔ Youssef B.  → 89.7%  ✅
Rang 3    : Fatima C. ↔ Youssef B.  → 87.5%  ✅
...
Rang 1200 : Leila D.  ↔ Omar K.     → 45.2%  ✅ (dernier au-dessus du seuil)
--- SEUIL 45% ---
Rang 1201 : Nadia R.  ↔ Amine T.    → 44.8%  ❌ EXCLU
...
Rang 2500 : Samia H.  ↔ Rachid B.   → 12.1%  ❌ EXCLU
```

## 11.5 Attribution des matchs (greedy, exactement 3 par personne)

### Algorithme greedy (pgSQL worker `assign_matches`)

```
ENTREE : liste de paires avec score >= 45%, triees par :
         1. Priorite combinee (high ticket first, nb passages)
         2. Score compatibilite decroissant (en cas d'egalite)
SORTIE : attribution de matchs (exactement 3 par personne)

compteur = {}   // nombre de matchs par personne (initialise a 0)
matchs = []

POUR CHAQUE paire (femme, homme) dans l'ordre de priorite :
    SI compteur[femme] < 3 ET compteur[homme] < 3 :
        matchs.push({femme, homme, score})
        compteur[femme] += 1
        compteur[homme] += 1

// Verification post-attribution
POUR CHAQUE personne eligible :
    SI compteur[personne] < 3 :
        alertes.push({personne, nb_matchs: compteur[personne]})
        // Raisons possibles : pas assez de paires >= 45%, ou
        // toutes les paires compatibles ont deja 3 matchs
```

### Complexite

- Calcul des scores : O(F × H) — taille du pool dynamique
- Filtrage seuil 45% : O(F × H)
- Tri : O(n log n) ou n = nombre de paires >= 45%
- Attribution greedy : O(n)
- **ATTENTION** : pour un pool de 500 personnes, F × H = 62 500 paires. Tourne en pgSQL worker (pg_cron), PAS en Edge Function (CPU limit 2s).

### Gestion des cas ou < 3 matchs

Le coach est alerte et a 3 options :
1. **Accepter < 3 matchs** pour cette personne (pas assez de paires >= 45%)
2. **Abaisser le seuil** manuellement pour cette personne (ex: 40% au lieu de 45%)
3. **Reporter** cette personne au prochain evenement (sans incrementer nb_events)

## 11.6 Planification round-robin des 3 tours

Une fois les 3 matchs par personne attribues, l'algorithme organise les Blink Dates en 3 tours sans conflit d'horaire (Edge Function `schedule_tours`).

### Contrainte

Chaque personne participe a **exactement 1 Blink Date par tour**. Aucun conflit : une personne ne peut pas etre dans deux appels en meme temps.

### Algorithme (edge-coloring d'un graphe biparti 3-regulier)

Par le **theoreme de Konig**, un graphe biparti k-regulier peut toujours etre decompose en k couplages parfaits. Puisque notre graphe d'attribution est 3-regulier (chaque sommet a degre 3 quand F = H), il se decompose en exactement 3 couplages = 3 tours.

```
ENTREE : graphe biparti G = (Femmes, Hommes, Matchs)
         ou chaque sommet a degre exactement 3

Tour 1 : Trouver un couplage parfait M1 dans G
          (algorithme de Hopcroft-Karp ou simple parcours)
Tour 2 : Trouver un couplage parfait M2 dans G - M1
Tour 3 : Les aretes restantes forment automatiquement M3

SORTIE :
  Tour 1 : [(Fatima, Ahmed), (Sara, Youssef), (Nadia, Karim), ...]
  Tour 2 : [(Fatima, Youssef), (Sara, Karim), (Nadia, Omar), ...]
  Tour 3 : [(Fatima, Omar), (Sara, Ahmed), (Nadia, Mehdi), ...]
```

**Note** : quand certaines personnes ont < 3 matchs (pool desequilibre), elles n'ont pas de Blink Date a un ou plusieurs tours. Elles sont en "pause" pendant ce tour.

### Priorite des tours

L'algorithme attribue les matchs aux tours en priorisant les scores les plus eleves au Tour 1. Ainsi, le meilleur match de chaque personne est (dans la mesure du possible) au Tour 1.

## 11.7 Validation et override du coach

Apres le calcul automatique, le coach voit les resultats dans l'admin panel et peut :

| Action | Description |
|--------|-------------|
| **Echanger un match** | Remplacer un match par un autre (l'algo recalcule les tours) |
| **Forcer un match** | Ajouter un match que l'algo n'avait pas choisi (intuition coaching) |
| **Retirer du pool** | Exclure une personne (pas prete, probleme signale) |
| **Recalculer** | Relancer l'algorithme apres modifications manuelles |
| **Valider tout** | Confirmer → notifications + channels Stream + rooms LiveKit |

### Flux de validation

```
Algorithme calcule les matchs
    ↓
Coach examine les resultats (admin panel)
    ↓
[OPTIONNEL] Coach modifie manuellement
    ↓
Coach appuie sur "Valider tout"
    ↓
Edge Function `finalize_event_matches` :
    1. Creer les entrees dans `matches` (Supabase)
    2. Creer les entrees dans `blink_dates` (3 par match, un par tour)
    3. Creer les channels Stream Chat pour chaque match (type `messaging:{match_id}`)
    4. Planifier les rooms LiveKit pour chaque Blink Date
    5. Envoyer les push notifications aux participants
    6. Mettre a jour les statuts participants → 'phase_1_matching'
```

## 11.8 Post-evenement (mise a jour des priorites)

Apres l'evenement de matching (tous les Blink Dates termines + feedback recueilli) :

```sql
-- Incrementer le compteur d'evenements pour tous les participants presents
UPDATE profiles
SET nb_events_participes = nb_events_participes + 1
WHERE id IN (
    SELECT user_id FROM event_participants
    WHERE event_id = '{event_id}' AND statut = 'present'
);

-- Les personnes qui n'ont pas eu 3 matchs (pas assez de paires >= 45%) gardent
-- un nb_events_participes bas → elles remontent en priorite au prochain evenement
```

### Effet auto-equilibrant (via nb_events_participes)

```
EVENEMENT 1 (fevrier) :
    32 High Ticket + 155 Standard — TOUS dans le pool (pas de cap)
    L'algo attribue en priorite les matchs des High Ticket (score priorite max)
    Puis les Standard avec 0 passage, puis ceux avec 1 passage, etc.

EVENEMENT 2 (mars) :
    Les participants de l'event 1 ont maintenant nb_events = 1
    Les nouveaux inscrits (nb_events = 0) sont servis en priorite
    Les High Ticket restent VIP (score_priorite = 10000+)
    Les High Ticket matches (passes en phase 2/3) sortent du pool automatiquement

EVENEMENT 3 (avril) :
    Rotation naturelle : personne n'attend trop longtemps
    Ceux qui n'ont pas eu 3 matchs (pas assez de paires >= 45%) remontent
```

Le systeme est auto-equilibrant : plus tu fais de passages, plus tu descends dans l'ordre de priorite d'attribution. Les High Ticket sont toujours servis en premier. Le seuil 45% garantit la qualite des matchs.

## 11.9 Export

Le coach peut exporter les resultats a tout moment.

| Format | Contenu | Usage |
|--------|---------|-------|
| **CSV** | participant_1, participant_2, score, tour, statut, notes_coach | Import dans Excel/Sheets |
| **JSON** | Structure complete avec event, matchs, tours, feedbacks | Integration API |
| **PDF** | Rapport detaille : matchs, scores, analyses, alertes | Archivage, reference |

```json
{
  "event_id": "...",
  "date": "2026-02-23",
  "pool_size": 187,
  "high_ticket_count": 32,
  "standard_count": 155,
  "seuil_compatibilite": 45,
  "paires_au_dessus_seuil": 4200,
  "matches": [
    {
      "user_1": {"id": "...", "prenom": "Fatima", "initiale": "C."},
      "user_2": {"id": "...", "prenom": "Ahmed", "initiale": "M."},
      "score": 87.5,
      "tour": 1,
      "analysis": {
        "valeurs": {"score_f": 72, "score_h": 78, "similarite": 94},
        "attachement": {"score_f": 88, "score_h": 82, "similarite": 94},
        "communication": {"score_f": 81, "score_h": 75, "similarite": 94},
        "conflits": {"score_f": 65, "score_h": 70, "similarite": 95},
        "projections": {"score_f": 91, "score_h": 87, "similarite": 96}
      }
    }
  ],
  "participants_moins_de_3_matchs": [
    {"id": "...", "prenom": "Karim", "initiale": "N.", "nb_matchs": 2, "raison": "pas assez de paires >= 45%"}
  ]
}
```

---

---

# 12. SECURITE & CONFORMITE

## 12.1 OWASP Mobile Top 10 — Checklist

| # | Risque | Mitigation |
|---|--------|-----------|
| M1 | Improper Credential Usage | Supabase Auth (tokens JWT, refresh auto), flutter_secure_storage |
| M2 | Inadequate Supply Chain | Dependances verrouillees (pubspec.lock), audit regulier |
| M3 | Insecure Authentication | OTP telephone, biometrie optionnelle, rate limiting |
| M4 | Insufficient Input Validation | Validation cote serveur (RLS + Edge Functions), reactive_forms |
| M5 | Insecure Communication | TLS 1.3 partout, certificate pinning (optionnel) |
| M6 | Inadequate Privacy Controls | RGPD, consentement explicite, droit a l'effacement |
| M7 | Insufficient Binary Protections | Code obfuscation (--obfuscate --split-debug-info) |
| M8 | Security Misconfiguration | Env variables, pas de secrets dans le code |
| M9 | Insecure Data Storage | flutter_secure_storage, encryption at rest (Supabase) |
| M10 | Insufficient Cryptography | TLS, bcrypt pour hashes, pas de crypto custom |

## 12.2 Protection des photos

```
- Photos stockees sur Supabase Storage avec RLS
- Photos floues: generees cote serveur (Edge Function avec sharp/jimp)
- Photos nettes: acces UNIQUEMENT apres validation du match par le coach
- Metadata EXIF strippee automatiquement a l'upload
- Anti-screenshot: FLAG_SECURE (Android), capture bloquer (iOS — limite)
- Watermark invisible optionnel (trace en cas de leak)
```

## 12.3 RGPD — Actions requises (renforce audit v3.4.0)

> **ALERTE PRECEDENT JURIDIQUE** : Grindr a ete condamne a **5.8M EUR** pour partage de donnees de "categorie speciale" (orientation sexuelle) sans consentement granulaire. My Muqabala traite des donnees **encore plus sensibles** : blessures d'enfance, styles d'attachement, histoires personnelles, reponses psychologiques (147 questions). Ces donnees sont de **categorie speciale RGPD** (Art. 9 — donnees relatives a la sante / vie sexuelle / convictions religieuses).

| Action | Priorite | Statut | Detail audit v3.4.0 |
|--------|----------|--------|---------------------|
| **DPIA** (Data Protection Impact Assessment) | **CRITIQUE — AVANT LANCEMENT** | A realiser | **OBLIGATOIRE** pour traitement a grande echelle de donnees de categorie speciale (Art. 35 RGPD). Ne pas lancer sans. |
| Politique de confidentialite | Lancement | A rediger | Doit etre granulaire : un consentement SEPARE pour chaque type de donnee (profil, 147Q, messages, audio, photos) |
| Consentement **granulaire** (pas un seul checkbox) | Lancement | A implementer | Consentement distinct pour : (1) profil de base, (2) 147Q, (3) enregistrement audio Mahram, (4) photos, (5) messages coaching |
| Droit d'acces (export donnees) | Lancement | A implementer | Inclure : profil, reponses 147Q, messages, audios, formulaires de ressenti |
| Droit a l'effacement (suppression compte) | Lancement | A implementer | Suppression TOTALE : Supabase + Stream Chat + LiveKit recordings + Supabase Storage |
| Duree de retention definie | Lancement | A definir | Recommande : 6 mois apres fin de parcours, puis anonymisation |
| Registre des traitements | Lancement | A rediger | |
| **DPO** (Data Protection Officer) | Lancement | A nommer | Recommande des le lancement vu la sensibilite des donnees (pas attendre 5000 personnes) |
| Base legale : consentement explicite (Art. 9.2.a) | Lancement | A valider juridiquement | Le "legitimate interest" NE suffit PAS pour les donnees de categorie speciale |
| Stream Chat — region Dublin EU | Lancement | A configurer | Utiliser la region **EU West (Dublin)** dans le dashboard Stream pour la conformite RGPD |

---

---

# 13. DESIGN SYSTEM

## 13.1 Tokens de design (continuite avec my-muqabala.fr)

```dart
// app_colors.dart
abstract class AppColors {
  // Primary
  static const violet = Color(0xFF6B46C1);
  static const violetLight = Color(0xFF8B5CF6);
  static const violetDark = Color(0xFF553B9C);

  // Accents
  static const rose = Color(0xFFE8B4B8);
  static const sage = Color(0xFF7D9A8C);
  static const gold = Color(0xFFC9A962);
  static const purpleDeep = Color(0xFF6B5A9C);
  static const azure = Color(0xFF6B8CAE);
  static const strongEmphasis = Color(0xFF5A4A7C);

  // Neutrals
  static const background = Color(0xFFFAF9F7);
  static const surface = Color(0xFFFFFFFF);
  static const textPrimary = Color(0xFF1A1A2E);
  static const textSecondary = Color(0xFF4A4A6A);
  static const textMuted = Color(0xFF8A8AA0);
  static const border = Color(0xFFE8E8F0);

  // Semantic
  static const success = Color(0xFF4CAF50);
  static const warning = Color(0xFFFF9800);
  static const error = Color(0xFFE53935);
  static const info = Color(0xFF2196F3);
}

// app_typography.dart
abstract class AppTypography {
  // Display (Cormorant — serif elegant)
  static const displayLarge = TextStyle(
    fontFamily: 'Cormorant',
    fontSize: 32,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
  );

  // Body (Outfit — sans-serif clean)
  static const bodyLarge = TextStyle(
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  // Arabic (Amiri)
  static const arabicDisplay = TextStyle(
    fontFamily: 'Amiri',
    fontSize: 24,
    fontWeight: FontWeight.w700,
  );
}
```

## 13.2 Composants UI specifiques

| Composant | Description | Utilisation |
|-----------|------------|------------|
| `BlurredPhoto` | Photo avec gaussian blur + silhouette | Blink Dates, profils pre-match |
| `CompatibilityScore` | Cercle avec pourcentage + couleur | Ecran match, admin |
| `AudioMessageBubble` | Fourni par Stream Chat SDK (StreamVoiceRecordingAttachment) — personnalisable via theme | Chat |
| `TimerCountdown` | Decompte circulaire anime | Blink Dates (10:00) |
| `PhaseProgressBar` | 4 etapes avec etat actuel | Dashboard accueil |
| `CoachBadge` | Badge distinctif "Coach" | Messages du coach |
| `FeedbackCard` | Card avec emoji + texte + selection | Formulaires post-event |
| `DocumentCard` | Preview doc + badge nouveau | Section documents |
| `EventCountdown` | Countdown avec pulsation | Accueil, evenements |
| `IslamicQuote` | Verset / du'a style calligraphie | Accueil, documents |

---

---

# 14. PLAN D'IMPLEMENTATION — PRODUIT COMPLET (Decision D2)

> **Approche** : Toutes les features sont implementees AVANT le premier lancement.
> Pas de MVP iteratif. L'app sort complete avec : auth, chat, appels, Blink Dates,
> formulaire 147Q, documents, matching, admin panel, notifications, coaching (WebinarJam externe).

## Phase 0 : Fondations (Semaine 1-2)

- [ ] Init projet Flutter (flutter create --org com.mymuqabala)
- [ ] Config linting (very_good_analysis)
- [ ] Config CI/CD (GitHub Actions)
- [ ] Setup Supabase projet dedie (nouveau ou existant)
- [ ] Schema DB COMPLET (toutes les tables + RLS + indexes + triggers)
- [ ] Setup Firebase (FCM + Crashlytics)
- [ ] Config flavors (dev, staging, prod)
- [ ] Design system tokens complets (couleurs, typos, spacing, composants de base)
- [ ] Setup LiveKit Cloud (compte sur livekit.io, plan Ship $50/mois, API key + secret, configurer Egress pour recording audio)
- [ ] Setup Stream Chat (Maker Account sur getstream.io, API key + secret)
- [ ] Configurer Stream Push (FCM server key + APNs certificate dans le Stream dashboard)
- [ ] Setup RevenueCat (si paiement in-app prevu)
- [ ] Comptes Apple Developer ($99) + Google Play Console ($25) si pas deja fait
- [ ] Google Play closed testing : recruter 12 testeurs DES MAINTENANT (R11)

## Phase 1 : Auth, Profil & Navigation (Semaines 3-4)

- [ ] Systeme d'invitation : le coach cree le compte participant (Edge Function admin)
- [ ] Login telephone + OTP (Supabase Auth) — identifiants fournis par le coach (Decision D9)
- [ ] Ecran onboarding (3-4 slides presentant le concept My Muqabala)
- [ ] Creation/completion profil (prenom, age, ville, photo) — le prenom + initiale nom s'affiche ("Fatima C.")
- [ ] Upload photo + generation blur cote serveur (Edge Function)
- [ ] Ecran profil (vue + edition)
- [ ] Biometrie optionnelle (Face ID / Fingerprint via local_auth)
- [ ] Navigation principale (bottom nav bar 5 onglets)
- [ ] Dashboard accueil (statut parcours, prochains evenements, actions en attente)
- [ ] freeRASP integration (anti-tamper, root/jailbreak detection)
- [ ] screen_protector integration (anti-screenshot)

## Phase 2 : Formulaire 147 Questions In-App — Style Typeform (Semaines 5-7) — Decision D4

> **UX** : Le formulaire doit avoir la meme fluidite qu'un Typeform — une question a la fois,
> transition smooth, progression visible, feeling agreable. Les data sont recues UNIQUEMENT par
> l'admin (coach). Le participant ne voit JAMAIS les reponses des autres ni les scores.

- [ ] Architecture du formulaire : 5 categories, progression sauvegardee
- [ ] UI style Typeform : **1 question a la fois**, plein ecran, swipe/bouton pour avancer
- [ ] Barre de progression en haut (X/147 — ou par section : "Valeurs 3/30")
- [ ] Transitions animees entre les questions (slide, fade)
- [ ] Types de questions implementes :
  - [ ] Echelle de Likert (1-5, 1-7, 1-10) — slider ou boutons
  - [ ] Choix unique (radio) — cards cliquables
  - [ ] Choix multiple (checkbox) — chips selectionnables
  - [ ] Texte libre (court + long) — avec placeholder inspirant
  - [ ] Classement (drag & drop) — reordonner des items
- [ ] Sauvegarde locale progressive (drift) — pas de perte si l'app ferme
- [ ] Sync avec Supabase a chaque section completee
- [ ] Resume : reprendre la ou on s'est arrete (meme apres fermeture app)
- [ ] Validation cote serveur (toutes les questions obligatoires remplies)
- [ ] Ecran recapitulatif avant soumission finale (resume par categorie)
- [ ] Calcul score de compatibilite par categorie (Edge Function) — visible uniquement par le coach
- [ ] Animation de completion + message motivant ("Barakallah oufik, ton profil est complet !")
- [ ] Admin recoit notification quand un participant termine le 147Q

## Phase 3 : Chat Complet via Stream Chat (Semaines 8-10) — Decision D16

> **Gain de temps majeur** : Stream Chat fournit UI widgets, offline sync, typing,
> read receipts, audio messages, push, et moderation out-of-the-box.
> Le gros du travail est l'integration (token, channels) et le theming.

- [ ] Integration `stream_chat_flutter` (v9.23.x) + `stream_chat_persistence`
- [ ] Edge Function `generate_stream_token` : genere un token JWT Stream a partir du user_id Supabase
- [ ] Connexion Stream Chat au login (connectUser avec token)
- [ ] Edge Function `create_stream_channel` : cree les channels a la creation d'un match / inscription
- [ ] StreamChannelListView : liste conversations customisee (theme My Muqabala)
- [ ] StreamMessageListView + StreamMessageInput : ecran chat (texte + audio natif)
- [ ] Activer voice recording (desactive par defaut dans le SDK, activation explicite)
- [ ] Custom message builder pour le badge "Coach" sur les messages du coach
- [ ] Theming complet : couleurs, typos, bulles, selon le design system My Muqabala
- [ ] Channel `coaching:{user_id}` cree automatiquement a l'inscription participant
- [ ] Channel `messaging:{match_id}` cree automatiquement a la validation du match
- [ ] Ecran coaching groupe : bouton lien WebinarJam (ouverture externe, pas de chat in-app)
- [ ] Push notifications chat : configurer FCM server key + APNs cert dans Stream dashboard
- [ ] Offline persistence : activer `StreamChatPersistenceClient` (SQLite via drift)
- [ ] Admin/Coach : lister tous les channels (Mahram numerique) via `StreamChannelListController`

## Phase 4 : Evenements, Matching & Admin Panel (Semaines 11-14) — Decision D17

### 4a. Admin general (Semaine 11)

- [ ] Admin dashboard (stats globales, participants actifs, evenements a venir, alertes)
- [ ] Admin : inviter un participant (creer compte Supabase + envoyer lien de telechargement)
- [ ] Admin : import batch participants (CSV upload → creation comptes en masse)
- [ ] Admin : marquer un participant comme `is_high_ticket` (toggle dans le profil)
- [ ] Admin : voir le profil de scoring 147Q de chaque participant (5 barres + style attachement + dealbreakers)
- [ ] Admin : voir les formulaires remplis (147Q + ressentis)
- [ ] Admin : vue sur tous les chats (Mahram numerique)
- [ ] Admin : envoyer document a un participant

### 4b. Evenements (Semaine 12)

- [ ] CRUD evenements (admin panel)
- [ ] Ecran liste evenements (participant)
- [ ] Ecran detail evenement (countdown, infos)
- [ ] Notifications evenement (push J-2 + J-0)

### 4c. Systeme de matching — Pool & Priorite (Semaine 13)

- [ ] pgSQL worker `select_matching_pool` (PAS Edge Function — CPU limit 2s) :
  - [ ] Filtrer eligibles (147Q complete, statut matching_pool, pas en couple)
  - [ ] Calculer score_priorite = (is_high_ticket × 10000) + (999 - nb_events_participes)
  - [ ] Pas de cap : TOUS les eligibles sont dans le pool
  - [ ] Calculer compatibilite toutes paires F × H
  - [ ] Filtrer : garder uniquement paires avec score >= 45%
- [ ] Admin : ecran constitution du pool
  - [ ] Vue eligibles avec ordre de priorite (high ticket en haut, puis par nb passages croissant)
  - [ ] Indicateur equilibre H/F (barre visuelle)
  - [ ] Seuil compatibilite configurable (defaut 45%, modifiable par le coach)
  - [ ] Actions : retirer une personne du pool, ajuster seuil individuel

### 4d. Systeme de matching — Algorithme & Attribution (Semaine 13-14)

- [ ] pgSQL worker `calculate_compatibility` (PAS Edge Function) :
  - [ ] Scoring pairwise : ponderation 5 categories (valeurs 25%, attachement 20%, communication 20%, conflits 15%, projections 20%)
  - [ ] Matrice de compatibilite des styles d'attachement (non lineaire, definie par le coach)
  - [ ] Verification dealbreakers (paire exclue si incompatible)
  - [ ] Filtre seuil >= 45% (configurable par le coach)
  - [ ] Output : paires eligibles triees par priorite (high ticket + nb passages) puis par score
- [ ] pgSQL worker `assign_matches` :
  - [ ] Algorithme greedy : pour chaque paire par priorite, assigner si les deux ont < 3 matchs
  - [ ] Verification post-attribution : alerter si une personne a < 3 matchs (pas assez de paires >= 45%)
  - [ ] Options coach : accepter < 3, abaisser seuil pour cette personne, reporter
- [ ] pgSQL worker `schedule_tours` :
  - [ ] Planification round-robin : decomposer le graphe biparti 3-regulier en 3 couplages (Konig)
  - [ ] Prioriser les meilleurs scores au Tour 1
  - [ ] Gerer les cas < 3 matchs (personne en "pause" sur un tour)
- [ ] Admin : ecran resultats algorithme
  - [ ] Vue par personne : ses 3 matchs + scores + tours
  - [ ] Alertes : personnes avec < 3 matchs
  - [ ] Actions : echanger un match, forcer un match, retirer du pool, recalculer
- [ ] Admin : bouton "Valider tout" → Edge Function `finalize_event_matches` :
  - [ ] Creer entrees dans `matches` (Supabase)
  - [ ] Creer entrees dans `blink_dates` (3 tours)
  - [ ] Creer channels Stream Chat (type `messaging:{match_id}`)
  - [ ] Planifier rooms LiveKit pour chaque Blink Date (audio-only, token TTL 660s)
  - [ ] Envoyer push notifications aux participants
  - [ ] Mettre a jour statuts → 'phase_1_matching'
- [ ] Ecran match reveal (animation, score, analyse de compatibilite) — cote participant
- [ ] Export matchs (CSV, JSON, PDF avec analyse detaillee)

### 4e. Post-evenement (apres chaque event)

- [ ] Edge Function `post_event_update` :
  - [ ] Incrementer nb_events_participes pour tous les participants presents
  - [ ] Les personnes avec < 3 matchs gardent nb_events bas → priorite au prochain event
  - [ ] Marquer les personnes matchees (passees en phase 2) hors du pool

## Phase 5 : Blink Dates & Appels Audio (Semaines 15-18) — Decision D18 LiveKit Cloud

- [ ] Integration LiveKit SDK Flutter (`livekit_client` v2.6.x)
- [ ] Edge Function `generate_livekit_token` : genere token avec identity + room + TTL 660s
- [ ] Edge Function `start_blink_date_egress` : demarre l'enregistrement audio Egress au debut du Blink Date
- [ ] Edge Function `stop_egress` : arrete l'enregistrement et sauve l'URL dans `blink_dates.enregistrement_url`
- [ ] Connexion a une room LiveKit audio-only (video desactive, AudioPreset.speech)
- [ ] Appel audio 1-to-1 (entre matchs Phase 2/3) — meme mecanique : push rappel → les 2 ouvrent l'app → room LiveKit
- [ ] PAS de CallKit (non necessaire — participants toujours dans l'app, voir Decision D18)
- [ ] Push notification rappel 15 min avant chaque appel programme (Edge Function Supabase)
- [ ] Ecran Blink Date complet (UI custom Flutter) :
  - [ ] Photo floue + prenom + ville + hobbies
  - [ ] Timer decompte 10:00 (circulaire anime) — timer cote app + token TTL cote serveur (double securite)
  - [ ] Sujets de conversation (affiches progressivement)
  - [ ] Boutons mute / fin d'appel
  - [ ] LiveKit Room widget integre dans l'UI custom
- [ ] Enchainement automatique des tours (Blink Date #1 → #2 → #3)
- [ ] Feedback rapide post-blink (formulaire inline 2 questions)
- [ ] Selection photos avec leurres (5 photos, matchs + decoys)
- [ ] Enregistrement appels cote serveur (Mahram numerique via LiveKit Egress → Supabase Storage)
- [ ] Ecran coaching groupe (Decision D3) :
  - [ ] Bouton "Rejoindre le live" → ouvre lien WebinarJam (externe, pas de chat in-app)
  - [ ] Countdown avant debut + notification push J-2 et J-0

## Phase 6 : Documents & Formulaires de Ressenti (Semaines 19-21)

- [ ] Formulaires de ressenti :
  - [ ] Post-Blink Date
  - [ ] Post-audio
  - [ ] Post-appel
  - [ ] Post-RDV physique
  - [ ] Bilan hebdomadaire
  - [ ] Bilan mensuel
- [ ] Ecran liste documents (triable par type)
- [ ] Viewer HTML pour cartographie emotionnelle (20 docs)
  - [ ] WebView ou flutter_html pour rendu fidele
  - [ ] Navigation inter-docs (precedent/suivant)
- [ ] Documents du coach (compte-rendus, preparations, analyses)
- [ ] Notifications nouveau document (push + in-app)
- [ ] Badge "nouveau" sur documents non lus
- [ ] Integration orchestrateur cartographie → Supabase Storage → app

## Phase 7 : Polish, Tests & Securite (Semaines 22-24)

- [ ] Tests unitaires (>80% coverage domain layer)
- [ ] Tests widget (tous les ecrans critiques)
- [ ] Tests integration (auth flow, chat flow, blink date flow, 147Q flow)
- [ ] Performance profiling (Flutter DevTools)
- [ ] Accessibility audit (contrastes, taille texte, screen reader)
- [ ] Dark mode (Decision D12 — inclus des le lancement)
- [ ] Animations et transitions (Rive pour les moments cles : match reveal, completion 147Q)
- [ ] Error handling global (retry, offline graceful, error boundaries)
- [ ] Crash reporting (Firebase Crashlytics)
- [ ] Analytics evenements cles
- [ ] Audit securite final (OWASP Mobile Top 10)
- [ ] RGPD : politique de confidentialite, consentement, droit effacement, DPIA

## Phase 8 : Deploiement & Lancement (Semaines 25-26)

- [ ] Build iOS (Xcode, signing, provisioning profiles)
- [ ] Build Android (keystore, signing, app bundle)
- [ ] TestFlight (iOS beta) — test avec premiers participants
- [ ] Play Console internal track (Android beta)
- [ ] Test complet avec participants reels (un evenement test)
- [ ] Iterations basees sur feedback
- [ ] Soumission App Store (preparer docs moderation + signalement)
- [ ] Soumission Play Store (age rating, content declaration)
- [ ] Monitoring post-lancement (Sentry, Crashlytics, analytics)

---

---

# 15. INFRASTRUCTURE & DEPLOIEMENT

## 15.1 Environnements

| Env | Supabase | Stream Chat | Firebase | LiveKit | URL API |
|-----|----------|------------|---------|---------|---------|
| **Dev** | Projet dev (gratuit) | App dev (Build plan gratuit) | Projet dev | Build plan (gratuit, 5K min) | api-dev.my-muqabala.fr |
| **Staging** | Projet staging | App staging (Build plan) | Projet staging | Build plan (gratuit) | api-staging.my-muqabala.fr |
| **Prod** | Projet prod (Pro $25) | App prod (Maker → Start) | Projet prod | Ship plan ($50/mois, 150K min) | api.my-muqabala.fr |

## 15.2 CI/CD Pipeline

```
Push to main
    │
    ├── GitHub Actions: Lint + Tests
    │   ├── flutter analyze
    │   ├── flutter test --coverage
    │   └── Fail if coverage < 80%
    │
    ├── Build iOS (via Codemagic ou GitHub Actions + macOS runner)
    │   ├── flutter build ipa
    │   └── Upload to TestFlight
    │
    └── Build Android
        ├── flutter build appbundle
        └── Upload to Play Console internal track
```

---

---

# 16. ESTIMATION DES COUTS

## 16.1 Infrastructure mensuelle (mise a jour audit v3.4.0)

| Composant | Lancement (< 2K MAU) | Growth (2K-10K MAU) | Scale (10K-50K MAU) | Full Scale (100K MAU) |
|-----------|---------------------|--------------------|--------------------|----------------------|
| Supabase Pro | $25/mois | $25/mois | $25 + $75 compute | $25 + $150 compute |
| **Stream Chat** | $0 (Maker Account) | $499/mois (Start) | $499 + overages (~$1K-2K) | **$4K-7K/mois** (overages: $0.09/MAU) |
| LiveKit Cloud Ship | $50/mois (150K min incluses) | $50/mois | $50/mois | $50 + overages |
| PowerSync | $0 (dev) | $0 (dev) | $49/mois (Pro) | $49/mois |
| Firebase | $0 | $0 | $0 | $0 |
| Sentry | $0 | $0 | $26/mois | $80/mois |
| Apple Developer | $99/an ($8/mois) | $8/mois | $8/mois | $8/mois |
| Play Console | $25 one-time | — | — | — |
| Domaine | ~$12/an ($1/mois) | $1/mois | $1/mois | $1/mois |
| **TOTAL** | **~$85/mois** | **~$585/mois** | **~$1K-1.5K/mois** | **~$5K-8K/mois** |

> **ALERTE COUT (audit v3.4.0)** : Stream Chat est le poste le plus explosif a scale. A 100K MAU, les overages ($0.09/MAU × 90K surplus) representent $8,100/mois en sus du $499 base. **Action** : Negocier un contrat custom avec GetStream des 5K MAU. Alternative a evaluer si les couts deviennent prohibitifs : **Sendbird** (utilise par Hinge, Salams a migre dessus apres des problemes Firebase).

**Detail calcul LiveKit Cloud** : Ship plan = $50/mois fixe, 150 000 min WebRTC incluses. Volume estime My Muqabala : Blink Date 10 min × 2 personnes = 20 min/Blink Date. 75 Blink Dates/event × 4 events/mois = 6 000 min/mois. + Appels Phase 2/3 (~30 min × 2 personnes × 50 paires × 4/mois) = ~12 000 min/mois. Total = ~18 000 min/mois. **Largement couvert** par les 150 000 min incluses. Cout fixe et previsible : **$50/mois a toutes les phases de croissance** jusqu'a ~150K min/mois.

## 16.2 Justification du cout Stream Chat

| Critere | Sans Stream (Supabase Realtime) | Avec Stream Chat |
|---------|-------------------------------|-----------------|
| Cout mensuel (< 2K users) | $25/mois | $25/mois (Maker = gratuit) |
| Cout mensuel (> 2K users) | $25-35/mois | $525/mois |
| Temps dev chat | 8-10 semaines | 1-2 semaines |
| Bug iOS audio (Supabase Storage) | Bloquant, workaround requis | Pas de probleme (CDN Stream) |
| Offline sync | A construire (PowerSync ou custom) | Natif (stream_chat_persistence) |
| Push notifications chat | Custom Edge Functions (cold start 1-3s) | Natif (latence < 500ms) |
| Moderation | A construire entierement | Natif (signalement, blocage, filtres) |
| Scalabilite prouvee | Aucun cas documente > 1K concurrent | 5M+ connexions simultanees prouvees |
| **Economie dev** | — | **~6-8 semaines de dev economisees** |

A $100/h de dev, 6-8 semaines = $24K-32K economises. Stream Chat se rentabilise en ~4-5 ans meme au tarif Start ($499/mois).
Au Maker Account (gratuit < 2K MAU), c'est de l'economie pure tant que la croissance ne depasse pas 2 000 utilisateurs actifs par mois.

---

---

# 17. RISQUES & MITIGATIONS

| # | Risque | Impact | Probabilite | Mitigation |
|---|--------|--------|-------------|-----------|
| R1 | Rejet App Store (contenu dating) | Bloquant | Moyenne | Preparer docs moderation + signalement avant soumission |
| R2 | RGPD non-conforme (donnees psycho) | Legal | Haute | Consulter juriste AVANT le lancement |
| R3 | LiveKit Cloud down pendant Blink Date | UX catastrophique | Faible | Fallback vers appel telephonique classique. LiveKit = open source (Apache 2.0), infra cloud multi-region, 99.99% SLA (Ship plan). Architecture abstraite (`AudioCallService` interface) permet de switcher de provider en 2-3 semaines si necessaire |
| R4 | Stream Chat : passage de Maker ($0) a Start ($499/mois) au-dela de 2 000 MAU | Cout | Haute | Anticiper le budget, negocier un plan intermediaire avec Stream, ou migrer si necessaire |
| R14 | Stream Chat vendor lock-in | Technique | Moyenne | Utiliser `stream_chat_flutter_core` (pas les UI widgets) pour faciliter une migration future. Export API disponible (cap 10K messages/user) |
| R5 | Photos leakees | Reputation | Faible | Watermark + anti-screenshot + moderation |
| R6 | Participant toxique / harcelement | Legal + UX | Moyenne | Systeme de signalement + blocage + moderation coach |
| R7 | Scalabilite matching algo | Performance | Moyenne | Pool dynamique sans cap → O(F×H) paires. Pour 500 personnes = 62K paires. Tourner en pgSQL worker (pg_cron), PAS Edge Function |
| R8 | Incompatibilite Flutter/SDK updates | Technique | Moyenne | Verrouiller les versions, tester avant upgrade |
| R9 | Perte de donnees | Catastrophique | Faible | Backups auto Supabase + export regulier |
| R10 | Coach surcharge (1 personne pour tout) | Business | Haute | Automatiser max (formulaires, notifications), recruter |
| R11 | Google Play 12 testers x 14 jours (nouveau compte) | Bloquant | Haute | Commencer le closed testing IMMEDIATEMENT |
| R12 | Apple age rating questionnaire deadline 31 jan 2026 | Bloquant | Moyenne | Remplir des la creation de l'app record |
| R13 | Google Age-Restricted Content enforcement 28 jan 2026 | Bloquant | Haute | Integrer age screening avant soumission |
| R15 | **iOS push throttle** — notifications chat arrivent en retard sur iOS | UX critique | **Certaine** (sans correctif) | Architecture push hybride (section 3.3.1) — webhook Stream → Edge Function → APNs visible |
| R16 | **LiveKit Flutter bugs iOS** — mute/unmute casse audio (#351, #712, #714) | UX critique | Moyenne | Abstraction `AudioRoomProvider` + failover Agora (section 3.3.2). Tester chaque build iOS avant evenement |
| R17 | **Edge Function CPU limit 2s** — algo matching timeout | Bloquant | **Certaine** (si matching en Edge Fn) | Matching en pgSQL (pg_cron) ou worker dedie, PAS en Edge Function |
| R18 | **Supabase 0 SLA sur Pro** — 27 incidents/90j | UX degrade | Haute | PowerSync offline-first (section 3.3.3) + circuit breakers (section 3.3.4) |
| R19 | **Stream Chat cout a scale** — $4K-7K/mois a 100K MAU | Business | Haute a scale | Negocier contrat custom des 5K MAU. Evaluer Sendbird comme alternative |
| R20 | **RGPD categorie speciale** — donnees psychologiques non-conformes | Legal BLOQUANT | **Certaine** (sans DPIA) | DPIA obligatoire, consentement granulaire, DPO, region Dublin EU (section 12.3) |
| R21 | **Verification age** — lois Texas (jan 2026), Utah (mai 2026), Louisiana (juil 2026) | Legal | Moyenne (si users US) | Age verification a implementer si ouverture marche US |

---

---

# 18. AUDIT ORCHESTRATEUR EXISTANT

## 18.1 Analyse de l'approche SDK actuelle

L'orchestrateur (`orchestrator_cartographie_sdk.py`, ~5300 lignes) utilise le **Claude Agent SDK** en mode in-process (pas de CLI externe). C'est l'approche correcte pour les raisons suivantes :

### Pourquoi l'approche actuelle est bonne :

1. **Sessions isolees + fichiers comme source de verite** : Chaque agent demarre avec un contexte frais, lit ses inputs depuis le disque, ecrit ses outputs sur le disque. Pas d'accumulation de contexte = pas d'hallucination.

2. **Gates de validation** : Entre chaque agent, une fonction de validation verifie l'existence + taille + marqueurs des fichiers produits. Si la gate echoue, l'agent precedent est relance.

3. **Mode 2 phases (Plan → Execute)** : L'Agent 1 utilise un mode ou il lit d'abord tout (mode plan, ecriture bloquee), puis execute avec le contexte complet.

4. **Parallelisation** : Les Agents 2, 4, 5 lancent des sous-sessions paralleles (max 7 concurrentes) pour traiter les 20 DOCs.

### Alternative evaluee : CLI relance entre agents

L'idee de relancer le CLI entre chaque agent pour "rafraichir le contexte" est inutile car :
- Le SDK gere deja les sessions isolees
- Relancer le CLI ajouterait un overhead de ~10-30s par agent
- L'orchestrateur perdrait son etat en memoire (metrics, config, timings)
- Les gates de validation devraient etre reimplementees dans un script wrapper

### Recommandation : Garder l'approche actuelle (SDK in-process)

L'architecture est saine. Les seules ameliorations possibles :
- **Checkpointing** : Sauvegarder l'etat (metrics, phase completee) toutes les 15 min pour recovery en cas de crash
- **Resume** : Detecter les phases deja completees (gates passees) et les skipper au redemarrage

---

## 18.2 Migration complete : app mobile remplace tout (Decision D15)

L'app mobile remplace l'ensemble du systeme existant :
- **Dashboard web my-muqabala.fr** → Admin panel dans l'app
- **WhatsApp** → Chat in-app avec push notifications
- **Pages HTML statiques** → Documents servis via Supabase Storage dans l'app
- **JSON plat** → PostgreSQL (Supabase)
- **Typeform/Google Forms** → Formulaire 147Q natif in-app
- **Inscription publique** → Invitation par le coach

La cartographie emotionnelle (orchestrateur existant) continue de fonctionner et publie dans l'app :

## 18.3 Integration orchestrateur ↔ app mobile

```
ORCHESTRATEUR CARTOGRAPHIE (existant)
    │
    │ Genere 21 docs HTML
    │ par client
    │
    ▼
SUPABASE STORAGE
    │
    │ Upload via Edge Function
    │ ou script Python
    │
    ▼
TABLE coach_documents
    │
    │ INSERT avec type='cartographie_emotionnelle'
    │ + notification push
    │
    ▼
APP MOBILE
    │
    │ WebView ou flutter_html
    │ pour afficher les docs
    │
    ▼
PARTICIPANTE VOIT SA CARTOGRAPHIE DANS L'APP
```

---

---

# SYNTHESE

## Decisions validees (2026-02-19 / 2026-02-20)

| # | Decision | Choix definitif |
|---|---------|----------------|
| D1 | Architecture | **Supabase + Stream Chat + LiveKit Cloud** |
| D2 | Approche | **Produit complet** — toutes features au lancement |
| D3 | Coaching groupe | **WebinarJam** — 100% externe, aucun chat de groupe dans l'app |
| D4 | Formulaire 147Q | **In-app** — formulaire natif complet style Typeform |
| D16 | Chat SDK | **Stream Chat (GetStream)** — messaging dedie |
| D17 | Matching Algorithm | **Seuil >= 45% + high ticket first + nb passages + greedy + round-robin** — pas de cap pool |
| D18 | Audio Calling SDK | **LiveKit Cloud** — `livekit_client` v2.6.3, SDK Flutter le plus adopte (48 600 DL/semaine), $50/mois Ship (150K min incluses), Egress recording, open source Apache 2.0. CallKit NON NECESSAIRE (participants toujours dans l'app). |

## Audit de resilience (v3.4.0 — 2026-02-20)

6 agents de recherche paralleles, 200+ recherches web, 300+ sources analysees.

| # | Decouverte critique | Impact | Correctif integre |
|---|--------------------|---------|--------------------|
| C1 | iOS push throttle (Apple limite data-only a 2-3/h) | Notifications chat broken sur iOS | Push hybride : webhook Stream → Edge Function → APNs visible (section 3.3.1) |
| C2 | LiveKit Flutter bugs iOS (#351, #712, #714) | Audio casse sur iOS | Abstraction `AudioRoomProvider` + failover Agora (section 3.3.2) |
| C3 | Edge Functions CPU limit 2s | Matching timeout | Matching en pgSQL/pg_cron, PAS en Edge Function (section 3.3.3) |
| C4 | Supabase Pro = 0 SLA (27 incidents/90j) | App down si Supabase down | PowerSync offline-first (section 3.3.3) |
| C5 | Stream Chat $4K-7K/mois a 100K MAU | Budget explose a scale | Negocier custom, evaluer Sendbird (section 16) |
| C6 | RGPD categorie speciale (precedent Grindr 5.8M EUR) | Legal BLOQUANT | DPIA obligatoire + consentement granulaire (section 12.3) |
| C7 | App Store Guideline 1.2 (UGC) = #1 rejet dating apps | Rejet store | Moderation + signalement dans le MVP (section 17) |

**Ajouts au stack** : PowerSync (offline), Sentry (remplace Crashlytics), dio_smart_retry, circuit breakers, feature flags, push hybride, abstraction audio.

## Intelligence competitive (audit v3.4.0)

| App | Stack technique | Ce que My Muqabala peut en apprendre |
|-----|----------------|--------------------------------------|
| **Muzz** | PHP → Go (migration), Kubernetes/AWS, 2000 RPS | Go pour les services critiques si scale au-dela de 100K |
| **Hinge** | Gale-Shapley + deep learning, **Sendbird** (chat+appels, integre en 5 semaines) | L'algo Gale-Shapley est valide (Hinge l'utilise aussi). Sendbird = alternative credible a Stream Chat |
| **Bumble** | Swift/Kotlin natif, Node.js, DynamoDB + Redis | Redis pour le cache matching temps reel |
| **Salams** | Migre DE Firebase VERS **Sendbird** apres drops de messages a scale | Firebase chat ne scale PAS au-dela de quelques milliers d'utilisateurs |
| **Tinder** | AI photo verification (Face Check) | Reduit 60% les faux profils. La verification photo par IA devient standard |

**Enseignement cle** : Le choix Stream Chat est valide pour le lancement. A scale (50K+ MAU), Sendbird est l'alternative la plus credible (utilisee par Hinge, adoptee par Salams apres echec Firebase). LiveKit est utilise par OpenAI, Spotify, Meta, Tesla, et 25% des centres 911 US — infrastructure fiable.

## Toutes les questions strategiques ont ete tranchees (2026-02-20)

Voir le detail complet des 18 decisions (D1-D18) en haut de ce document.

Les questions d'origine sont archivees dans `QUESTIONS_STRATEGIQUES_MUQABALA_APP.md`.

> **Note** : RGPD/CGU geres par le client directement. **ATTENTION** : DPIA obligatoire avant lancement (donnees de categorie speciale RGPD).

---

**PROCHAINE ETAPE** : Commencer le code — Phase 0 (Fondations).


TO DO LIST

# My Muqabala — Todo List Complète de l'App

---

## Authentification & Onboarding

- Le coach crée le compte du participant depuis son admin panel
- Le participant reçoit un lien de téléchargement par SMS
- Écran de bienvenue avec 3 slides qui expliquent le concept My Muqabala
- Connexion par numéro de téléphone + code OTP reçu par SMS
- Activation optionnelle de la biométrie (Face ID ou empreinte digitale)
- Affichage du prénom + initiale du nom partout dans l'app (ex : Fatima C.)
- Protection anti-screenshot activée dès le lancement

---

## Profil Participant

- Remplissage du profil : prénom, date de naissance, ville, bio courte
- Upload de la photo de profil
- Génération automatique de la version floue de la photo côté serveur
- Modification du profil possible à tout moment
- Affichage du statut du parcours avec la phase actuelle clairement indiquée
- Vue sur son propre score de compatibilité par catégorie après le 147Q

---

## Section Ressources Pédagogiques

- Section dédiée aux documents envoyés par le coach
- Compte-rendus après chaque étape du parcours (Blink Date, appel, rendez-vous)
- Analyses de compatibilité avec le match en texte + scores visuels
- Documents de préparation avant chaque étape : comment aborder l'appel, quoi observer
- Bilans hebdomadaires et mensuels rédigés par le coach
- Boucles d'engagement en Phase 4 vers le mariage
- Badge "Nouveau" visible sur chaque document non lu
- Notification push à chaque nouveau document disponible
- Lecteur HTML intégré pour afficher les documents riches et mis en forme

---

## Section Formulaire Exploratoire — 147 Questions

- Formulaire en plein écran style Typeform : une question à la fois
- Barre de progression visible (ex : Valeurs 3 sur 30)
- Transitions animées et fluides entre chaque question
- Questions à échelle avec curseur ou boutons de 1 à 10
- Questions à choix unique avec cartes cliquables
- Questions à choix multiple avec chips sélectionnables
- Questions à texte libre court et long
- Questions à classement par glisser-déposer
- Sauvegarde automatique locale : jamais de perte si l'app se ferme
- Reprise exactement où on s'était arrêté, même après fermeture complète de l'app
- Synchronisation progressive avec le serveur à chaque section terminée
- Écran récapitulatif avant la soumission finale
- Animation de félicitations à la complétion du formulaire
- Le coach reçoit une notification quand un participant termine le 147Q
- Les réponses et scores ne sont jamais visibles par les autres participants

---

## Section Cartographie Émotionnelle

- Section dédiée aux 21 documents de cartographie personnalisée
- Navigation entre les documents avec boutons précédent et suivant
- Affichage HTML fidèle avec le rendu exact des documents générés
- Documents générés automatiquement par l'orchestrateur existant et publiés dans l'app
- Accès progressif : certains documents débloqués selon la phase du parcours
- Notification push à chaque nouvelle cartographie disponible

---

## Section Matching

### Constitution du pool

- Le coach constitue le pool de participants éligibles, maximum 100 personnes
- Priorité automatique : les High Ticket d'abord, puis les moins expérimentés
- Équilibre hommes et femmes vérifié automatiquement, objectif 50/50
- Liste d'attente générée automatiquement pour les personnes non retenues, prioritaires au prochain événement
- Le coach peut déplacer manuellement des personnes dans la file ou la liste d'attente

### Algorithme de matching

- Calcul du score de compatibilité pour chaque paire possible selon 5 catégories pondérées
- Attribution automatique de 3 matchs par personne
- Alerte si une personne se retrouve avec moins de 3 matchs
- Planification des 3 tours sans conflit d'horaire : personne dans deux appels en même temps
- Le coach peut modifier, échanger ou forcer des matchs manuellement
- Recalcul possible après chaque modification manuelle
- Le coach valide tout en un clic : notifications envoyées, chats créés, rooms audio planifiées

### Côté participant

- Écran de révélation du match avec animation, score et analyse de compatibilité
- Accès à la fiche du match : prénom, ville, centres d'intérêt, photo floue

### Export

- Export des résultats de matching en CSV, JSON et PDF avec analyses détaillées

---

## Session de Coaching Groupe (Dimanche soir)

- Notification push rappel 2 jours avant et le jour même
- Lien vers le webinar externe (Zoom ou YouTube Live) intégré dans l'app
- Chat de groupe en temps réel affiché sous le stream vidéo, directement dans l'app
- Réactions emoji dans le chat de groupe
- Messages audio courts possibles dans le chat de groupe
- Le coach voit le chat et gère le webinar en parallèle
- Compteur avant le début de la session visible sur l'écran d'accueil

---

## Blink Dates — Les 3 Rencontres Audio (10 minutes chacune)

- Message dans l'app : ton Blink Date numéro 1 commence dans 30 secondes
- Affichage de la fiche de la personne : prénom, âge, ville, centres d'intérêt
- Photo floue de l'interlocuteur pendant toute la durée de l'appel
- Timer décompte 10 minutes en cercle animé
- Sujets de conversation affichés progressivement pendant l'appel
- Bouton mute et reprendre le micro
- Bouton pour terminer l'appel manuellement
- Enregistrement audio côté serveur automatique (Mahram numérique)
- Enchaînement automatique vers le Blink Date numéro 2 puis numéro 3
- Formulaire rapide inline après chaque Blink Date avec 2 questions courtes

---

## Sélection de Photos (après les 3 Blink Dates)

- Écran de sélection de photos affiché automatiquement après les 3 tours
- 5 photos proposées : les vrais matchs plus des leurres qui sont des personnes non matchées
- Sélection multiple possible
- Le participant ne sait pas lesquelles sont des leurres
- Confirmation de la sélection avant envoi
- Le coach voit les sélections de chaque participant

---

## Formulaires de Suivi

- Formulaire de ressenti complet après les Blink Dates
- Formulaire après chaque message audio en Phase 2
- Formulaire après chaque appel programmé en Phase 2 et 3
- Formulaire après chaque rendez-vous physique en Phase 3 et 4
- Bilan hebdomadaire envoyé chaque semaine
- Bilan mensuel
- Notification push rappel si un formulaire n'est pas rempli dans les 24 heures
- Le coach voit toutes les réponses et peut ajouter ses propres notes

---

## Phases du Parcours (2, 3 et 4)

- Le mercredi, le coach croise 5 sources pour décider du match final : feedback conversation, photos sélectionnées, score algorithmique, ressenti formulaire, observations live
- Phase 2 — Découverte : appels audio programmés entre les deux matchés
- Notification push rappel 15 minutes avant chaque appel
- Les deux participants ouvrent l'app et rejoignent la room audio
- Enregistrement audio de chaque appel côté serveur (Mahram numérique)
- Phase 3 — Approfondissement : appels plus longs sur des sujets plus profonds
- Phase 4 — Engagement : boucles d'engagement et préparation au mariage
- À chaque phase, nouveaux documents du coach débloqués automatiquement
- Formulaire de suivi spécifique à chaque phase

---

## Chat & Messagerie

- Chat 1 à 1 avec son match
- Chat 1 à 1 avec le coach
- Chat de groupe pour les sessions de coaching
- Messages texte avec indicateur de frappe et accusé de lecture
- Messages vocaux : enregistrement, écoute avec waveform, envoi
- Présence en ligne visible avec un point vert
- Synchronisation hors ligne : les messages reçus pendant l'absence s'affichent au retour
- Notifications push instantanées pour chaque nouveau message, y compris sur iOS
- Le coach a accès à tous les chats pour le Mahram numérique

---

## Notifications

- Nouveau message reçu
- Nouveau document disponible
- Rappel événement coaching (J-2 et J-0)
- Rappel appel programmé (15 minutes avant)
- Formulaire à remplir non complété dans les 24h
- Match révélé après validation du coach
- Nouvelle cartographie émotionnelle disponible
- Bilan hebdomadaire à compléter
- Toutes les notifications pointent directement vers le bon écran dans l'app

---

## Admin Panel (Coach uniquement)

### Gestion des participants

- Inviter un participant : créer le compte et envoyer le lien de téléchargement
- Marquer un participant comme High Ticket pour lui donner la priorité maximale au matching
- Voir le profil de scoring complet de chacun : 5 catégories, style d'attachement, dealbreakers
- Voir le statut de chaque participant dans le parcours
- Voir les formulaires remplis (147Q et ressentis)
- Désactiver un compte si nécessaire

### Gestion des événements

- Créer, modifier et annuler des événements de matching et de coaching
- Suivre les présents et absents en temps réel pendant un événement
- Voir la liste d'attente et promouvoir manuellement

### Gestion du matching

- Voir la file de priorité avec les scores de chaque participant
- Lancer le calcul du matching en un clic
- Modifier les résultats manuellement avant validation
- Valider tout en un clic pour déclencher les notifications, chats et rooms
- Voir les alertes pour les personnes avec moins de 3 matchs

### Suivi des échanges

- Voir tous les chats (Mahram numérique)
- Écouter les enregistrements audio des Blink Dates et des appels
- Envoyer des documents à un ou plusieurs participants
- Ajouter des notes privées sur chaque participant

### Export et reporting

- Exporter les résultats de matching en CSV, JSON ou PDF
- Voir les statistiques globales : participants actifs, événements, matchs en cours

---

## Sécurité & Conformité

- Connexion sécurisée par OTP téléphone uniquement, pas de mot de passe
- Biométrie optionnelle en complément
- Photos floues générées automatiquement, photos nettes accessibles uniquement après validation du match
- Anti-screenshot activé sur tous les écrans sensibles
- Toutes les données chiffrées en transit et au repos
- DPIA à réaliser avant le lancement, obligatoire selon le RGPD
- Consentement granulaire à l'inscription : un consentement séparé pour le profil, le 147Q, les enregistrements audio, les photos et les messages
- Droit d'export des données personnelles
- Droit à l'effacement complet du compte incluant chats, enregistrements et photos
- Durée de rétention des données définie à 6 mois après fin de parcours