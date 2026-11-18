---
id: "TSK-26-11-18-1341Z-5SFIE-001-06"
title: "Plugin Release automatisieren"
status: "approved"
created: "2026-11-18"
updated: "2026-11-18"
version: "1"
approved_at: "2026-11-18"
supersedes: "null"
superseded_by: "null"
primary_requirement: "WI-26-11-18-1341Z-5SFIE-001"
related_requirements: "none"
covers: "AC-WI-26-11-18-1341Z-5SFIE-001-010"
---

# Plugin Release automatisieren

> Provisorische Vorlage: `/app/.ai-tools/template/specs/task.md` (Schema-Version 3), auf Nutzerwunsch. Lokale Vorlage fehlt; der Versionssprung von 1 auf 3 ist ohne nachweisbare Zwischenrevision nicht als kanonische Transition validierbar. Bei verfügbarer kanonischer Vorlage Kompatibilität prüfen, ohne den Entwurf stillschweigend umzuschreiben.

## Outcome and Value

Die nächste Plugin-Version und der Changelog sind vor der Veröffentlichung als Release-PR prüfbar. Das GitHub-Release entspricht dem gemergten Stand dieses PRs.

## Scope

- SemVer-Version des Plugins anhand der Conventional Commits im Plugin-Upstream seit dem letzten Release automatisch bestimmen.
- Version und Changelog in einem Release-PR vorbereiten und nach dessen Merge das zugehörige GitHub-Release mit Release Notes veröffentlichen.

## Out of Scope

- Releases oder Versionierungsregeln für Projekte, in denen das Plugin eingesetzt wird.
- Eine tatsächliche Veröffentlichung als Teil der Spezifikationsarbeit oder allein aufgrund der Freigabe dieses Tasks.

## Acceptance Criteria

- **AC-TSK-26-11-18-1341Z-5SFIE-001-06-001** — `fix`, `feat` und Breaking Changes im Plugin-Repository ergeben Patch, Minor und Major. Treffen mehrere Stufen zusammen, bestimmt die höchste die nächste Plugin-Version.
- **AC-TSK-26-11-18-1341Z-5SFIE-001-06-002** — Der Release-PR enthält die ermittelte Version und den aktualisierten Plugin-Changelog. Vor seinem Merge erscheint kein zugehöriges GitHub-Release. Nach seinem Merge erscheint das Plugin-Release im selben Repository mit derselben Version und den zugehörigen Release Notes.
- **COVERS: AC-WI-26-11-18-1341Z-5SFIE-001-010** — SemVer-Berechnung, Release-PR und Veröffentlichung nach Merge für das Plugin selbst.

## Dependencies

- Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001; das Upstream-GitHub-Repository des Plugins mit den erforderlichen Release-Funktionen.

## Risks

- Falsch klassifizierte Commit-Nachrichten führen zu einem unpassenden Versionsvorschlag; der Release-PR macht Version und Changelog vor der Veröffentlichung prüfbar.

## Version Log

### Version 1

- Date: 2026-11-18
- Summary: Entwurf für die automatische Plugin-Veröffentlichung über Release-PR anlegen
- Reason: SemVer, Changelog und das nachgelagerte GitHub-Release als eigenständiges Ergebnis prüfen.
- Evidence:
  - Freigegebenes Work Item WI-26-11-18-1341Z-5SFIE-001, Version 10.
