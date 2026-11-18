---
id: "TSK-26-11-18-1341Z-5SFIE-001-01"
title: "Plugin und gemeinsamer Einstieg"
status: "approved"
created: "2026-11-18"
updated: "2026-11-18"
version: "3"
approved_at: "2026-11-18"
supersedes: "null"
superseded_by: "null"
primary_requirement: "WI-26-11-18-1341Z-5SFIE-001"
related_requirements: "none"
covers: "AC-WI-26-11-18-1341Z-5SFIE-001-001, AC-WI-26-11-18-1341Z-5SFIE-001-002, AC-WI-26-11-18-1341Z-5SFIE-001-004, AC-WI-26-11-18-1341Z-5SFIE-001-005, AC-WI-26-11-18-1341Z-5SFIE-001-009"
---

# Plugin und gemeinsamer Einstieg

> Provisorische Vorlage: `/app/.ai-tools/template/specs/task.md` (Schema-Version 3), auf Nutzerwunsch. Lokale Vorlage fehlt; der Versionssprung von 1 auf 3 ist ohne nachweisbare Zwischenrevision nicht als kanonische Transition validierbar. Bei verfügbarer kanonischer Vorlage Kompatibilität prüfen, ohne den Entwurf stillschweigend umzuschreiben.

## Outcome and Value

Entwickler können das Plugin aus seinem Upstream-GitHub-Repository installieren und Aufträge frei formulieren, statt vorab eine Fachrolle auswählen zu müssen.

## Scope

- Installierbares Plugin und gemeinsamer Einstieg, der je nach Auftrag Fachrollen hinzuzieht.
- Überschreibbare Modell- und Reasoning-Voreinstellungen pro Fachrolle sowie knappe allgemeine Einstiegsanweisungen mit mythologischem Namen und gelegentlichen thematischen Anspielungen.

## Out of Scope

- Fachliche Ausgestaltung einzelner Fachrollen und tatsächliche Veröffentlichung eines Plugin-Releases.
- Eigene Sicherheits- oder Berechtigungsmechanismen.

## Acceptance Criteria

- **AC-TSK-26-11-18-1341Z-5SFIE-001-01-001** — Das Plugin lässt sich aus seinem Git-Repository in OpenCode installieren; über den gemeinsamen Einstieg wird ein frei formulierter Auftrag an die passende verfügbare Fachrolle gegeben.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-01-002** — Beim Aufruf jeder Fachrolle gelten deren verfügbare Modell- und Reasoning-Voreinstellungen; gültige Nutzereinstellungen haben für die jeweils überschriebenen Werte Vorrang.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-01-003** — Der Einstieg trägt einen zur Rolle passenden mythologischen Namen; seine festen Anweisungen beschränken sich auf wesentliche allgemeine Hinweise und schreiben keinen Tätigkeitskatalog vor.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-01-004** — Eine exemplarische Antwort mit mythologischer Anspielung ergänzt das fachliche Ergebnis, ohne fachlichen Inhalt zu ersetzen.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-01-005** — Die Agentenbeschreibung des Einstiegsagenten nennt seine fachliche Aufgabe und beschreibt kurz die mythologische Figur.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-001** — Installierbarkeit und gemeinsamer Einstieg.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-002** — Fachrollenauswahl ohne manuelle Vorauswahl.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-004** — Nutzung und Überschreibbarkeit der Modell- und Reasoning-Voreinstellungen.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-005** — Mythologischer Name, kurze Einstiegsanweisungen und thematische Anspielung als Ergänzung.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-009** — Figurenbeschreibung des Einstiegsagenten.

## Dependencies

- Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001; einbindungstaugliche Fachrollen für die gemeinsame Abnahme.

## Risks

- Die Installierbarkeit aus einem Git-Repository und die tatsächliche Modellwahl müssen in OpenCode beobachtbar sein.

## Version Log

### Version 3

- Date: 2026-11-18
- Summary: Figurenbeschreibung und Vorrang der Modelleinstellungen für den Einstieg präzisieren
- Reason: Den Einstieg an den freigegebenen Work-Item-Umfang angleichen.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 10.

### Version 2

- Date: 2026-11-18
- Summary: Mythologische Anspielungen an einem Antwortbeispiel prüfen
- Reason: Die thematische Gestaltung soll die fachliche Antwort ergänzen, nicht ersetzen.
- Evidence:
  - AC-WI-26-11-18-1341Z-5SFIE-001-005 im freigegebenen Work Item WI-26-11-18-1341Z-5SFIE-001.

### Version 1

- Date: 2026-11-18
- Summary: Entwurf für Plugin und gemeinsamen Einstieg anlegen
- Reason: Installation und flexible Rollenwahl als eigenständiges Ergebnis prüfen.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 6.
