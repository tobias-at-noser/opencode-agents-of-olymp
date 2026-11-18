---
id: "TSK-26-11-18-1341Z-5SFIE-001-05"
title: "Übergabe von Änderungen"
status: "approved"
created: "2026-11-18"
updated: "2026-11-18"
version: "2"
approved_at: "2026-11-18"
supersedes: "null"
superseded_by: "null"
primary_requirement: "WI-26-11-18-1341Z-5SFIE-001"
related_requirements: "none"
covers: "AC-WI-26-11-18-1341Z-5SFIE-001-003, AC-WI-26-11-18-1341Z-5SFIE-001-004, AC-WI-26-11-18-1341Z-5SFIE-001-005, AC-WI-26-11-18-1341Z-5SFIE-001-009"
---

# Übergabe von Änderungen

> Provisorische Vorlage: `/app/.ai-tools/template/specs/task.md` (Schema-Version 3), auf Nutzerwunsch. Lokale Vorlage fehlt; der Versionssprung von 1 auf 3 ist ohne nachweisbare Zwischenrevision nicht als kanonische Transition validierbar. Bei verfügbarer kanonischer Vorlage Kompatibilität prüfen, ohne den Entwurf stillschweigend umzuschreiben.

## Outcome and Value

Ein initialer Umsetzungsauftrag genügt, damit Änderungen standardmässig in eng geschnittenen Commits festgehalten und im Rahmen des Auftrags ohne Folgeauftrag als Pull oder Merge Request übergeben werden.

## Scope

- Eng geschnittene Commits als Standard bei der Umsetzung; selbstständige Erstellung eines Pull oder Merge Requests, soweit vom initialen Auftrag gedeckt und ein geeignetes Werkzeug der Umgebung verfügbar ist.
- Fachrolle für die Übergabe mit passendem mythologischem Namen und kurzer Figurenbeschreibung, knappen allgemeinen Hinweisen und überschreibbaren Modell- und Reasoning-Voreinstellungen.

## Out of Scope

- Eigene Hoster-Integrationen, Sicherheits- oder Berechtigungsmechanismen; Aktivitäten ausserhalb des initialen Auftrags.

## Acceptance Criteria

- **AC-TSK-26-11-18-1341Z-5SFIE-001-05-001** — Ein repräsentativer Umsetzungsauftrag mit Übergabe hält Änderungen in eng geschnittenen Commits fest und legt über ein geeignetes Werkzeug der Umgebung einen Pull oder Merge Request im vorgesehenen Zielrepository an, ohne separaten Folgeauftrag. Die Fähigkeit ist auch ausserhalb von GitHub demonstrierbar.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-05-002** — Ein reiner Analyseauftrag legt weder Commits noch Pull oder Merge Requests an. Ist kein geeignetes Werkzeug verfügbar, wird keine erfolgreiche Pull-/Merge-Request-Erstellung behauptet.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-05-003** — Beim Aufruf gelten die verfügbaren Modell- und Reasoning-Voreinstellungen, sofern die jeweiligen Werte nicht durch gültige Nutzereinstellungen überschrieben werden. Die Fachrolle hat einen passenden mythologischen Namen und knappe, allgemeine Anweisungen.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-05-004** — Die Agentenbeschreibung nennt die fachliche Aufgabe und beschreibt kurz die mythologische Figur.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-003** — Auftragsbezogene, hosterneutrale Übergabe mit eng geschnittenen Commits und selbstständiger Pull-/Merge-Request-Erstellung.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-004** — Aufgabenbezogene Voreinstellungen der Fachrolle.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-005** — Mythologischer Name und knappe Rollenhinweise.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-009** — Figurenbeschreibung für die Übergabe.

## Dependencies

- Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001; geeignete Werkzeuge und Berechtigungen der Umgebung für tatsächliche Übergabe.

## Risks

- Verfügbarkeit von Werkzeugen unterscheidet sich nach Umgebung; ein Entwurf ist kein tatsächlich erstellter Pull oder Merge Request.

## Version Log

### Version 2

- Date: 2026-11-18
- Summary: Figurenbeschreibung und Vorrang der Modelleinstellungen bei der Übergabe ergänzen
- Reason: Die Fachrolle an den freigegebenen Work-Item-Umfang angleichen.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 10.

### Version 1

- Date: 2026-11-18
- Summary: Entwurf für die hosterneutrale Übergabe von Änderungen anlegen
- Reason: Den initialen Auftrag als Rahmen für Commits und die selbstständige Übergabe abbilden.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 6.
