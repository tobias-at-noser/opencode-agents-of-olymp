---
id: "TSK-26-11-18-1341Z-5SFIE-001-02"
title: "Arbeitsfragen Umsetzung und Review"
status: "approved"
created: "2026-11-18"
updated: "2026-11-18"
version: "2"
approved_at: "2026-11-18"
supersedes: "null"
superseded_by: "null"
primary_requirement: "WI-26-11-18-1341Z-5SFIE-001"
related_requirements: "none"
covers: "AC-WI-26-11-18-1341Z-5SFIE-001-002, AC-WI-26-11-18-1341Z-5SFIE-001-004, AC-WI-26-11-18-1341Z-5SFIE-001-005, AC-WI-26-11-18-1341Z-5SFIE-001-009"
---

# Arbeitsfragen Umsetzung und Review

> Provisorische Vorlage: `/app/.ai-tools/template/specs/task.md` (Schema-Version 3), auf Nutzerwunsch. Lokale Vorlage fehlt; der Versionssprung von 1 auf 3 ist ohne nachweisbare Zwischenrevision nicht als kanonische Transition validierbar. Bei verfügbarer kanonischer Vorlage Kompatibilität prüfen, ohne den Entwurf stillschweigend umzuschreiben.

## Outcome and Value

Entwickler erhalten je nach Auftrag fundierte Antworten, umgesetzte Änderungen oder unabhängige Befunde, ohne sich auf einen Techstack oder festen Ablauf festlegen zu müssen.

## Scope

- Fachrollen für allgemeine Arbeitsfragen und Recherche, Umsetzung und Einarbeitung von Review-Feedback sowie unabhängige Prüfung.
- Passende mythologische Namen und kurze Figurenbeschreibungen, knappe allgemeine Anweisungen sowie überschreibbare Modell- und Reasoning-Voreinstellungen.

## Out of Scope

- Spezialisierte Rollen für Requirements Engineering, Architektur und Übergabe von Änderungen.

## Acceptance Criteria

- **AC-TSK-26-11-18-1341Z-5SFIE-001-02-001** — Repräsentative Aufträge zu einer Arbeitsfrage, zur Umsetzung eines Bugfixes oder einer Story, zur Einarbeitung von Review-Feedback und zur unabhängigen Prüfung werden durch die jeweils passende Rolle bearbeitet; die unabhängige Prüfung liefert konkrete Befunde statt einer Umsetzung.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-02-002** — Jede Rolle hat einen passenden mythologischen Namen und ihre festen Hinweise enthalten nur allgemeine, für die Rolle wesentliche Anweisungen. Beim Aufruf gelten ihre verfügbaren Voreinstellungen, sofern die jeweiligen Werte nicht durch gültige Nutzereinstellungen überschrieben werden.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-02-003** — Die Agentenbeschreibung jeder dieser Rollen nennt ihre fachliche Aufgabe und beschreibt kurz die jeweilige mythologische Figur.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-002** — Fachliche Abdeckung repräsentativer Arbeitsfragen, Umsetzungs- und Reviewfälle.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-004** — Aufgabenbezogene Voreinstellungen der drei Fachrollen.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-005** — Mythologische Namen und knappe Rollenhinweise.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-009** — Figurenbeschreibungen für Arbeitsfragen, Umsetzung und Review.

## Dependencies

- Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001; gemeinsamer Einstieg für die rollenübergreifende Abnahme.

## Risks

- Zu stark auf einzelne Beispiele zugeschnittene Anweisungen schränken freie Anfragen ein.

## Version Log

### Version 2

- Date: 2026-11-18
- Summary: Figurenbeschreibungen und Verhalten der Modelleinstellungen ergänzen
- Reason: Den Task an den freigegebenen Work-Item-Umfang angleichen.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 10.

### Version 1

- Date: 2026-11-18
- Summary: Entwurf für Arbeitsfragen Umsetzung und Review anlegen
- Reason: Recherche, Änderungen und unabhängige Prüfung als verschiedene Ergebnisse abdecken.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 6.
