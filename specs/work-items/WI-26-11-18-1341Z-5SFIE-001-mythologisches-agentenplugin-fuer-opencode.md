---
id: "WI-26-11-18-1341Z-5SFIE-001"
title: "Mythologisches Agentenplugin für OpenCode"
status: "approved"
created: "2026-11-18"
updated: "2026-11-18"
version: "10"
approved_at: "2026-11-18"
supersedes: "null"
superseded_by: "null"
---

# Mythologisches Agentenplugin für OpenCode

> Vorlagenprovenienz: `/app/.ai-tools/template/specs/work-item.md`, Schema-Version 3, auf ausdrücklichen Nutzerwunsch provisorisch verwendet. Im Worktree fehlt die lokale Vorlage; beim gemeinsamen Kandidaten ist der Versionssprung von 1 auf 3 ohne separate, nachweisbare Version-2-Revision nicht als kanonische Transition validierbar. Bei verfügbarer kanonischer Vorlage Kompatibilität prüfen, ohne diesen Entwurf stillschweigend umzuschreiben.

## Problem

Softwareentwickler nutzen OpenCode für unterschiedliche Arbeitsaufträge. Die Rollen sollen aktuelle Modelle passend zu ihren Stärken einsetzen, ohne freie Prompts durch umfangreiche, dauerhaft geladene Anweisungen oder starre Abläufe einzuschränken.

## Goal and Value

Ein neu entworfenes, aus dem Upstream-GitHub-Repository installierbares OpenCode-Plugin bietet einen gemeinsamen Gesprächseinstieg. Es bringt für unterschiedliche Arbeitsaufträge passende Fachrollen und Modell-/Reasoning-Zuordnungen mit, ohne Nutzer an bestimmte Git-Hoster oder Techstacks zu binden.

## Stakeholders

- Softwareentwickler, die OpenCode für arbeitsbezogene Tätigkeiten einsetzen, etwa für Umsetzung, Arbeitsfragen, Reviews oder die Übergabe von Änderungen.

## In Scope

- Gemeinsamer Einstieg für frei formulierte Aufträge; Fachrollen kommen je nach Auftrag hinzu.
- Die Tätigkeiten sind Beispiele, keine abschliessende Liste: Requirements Engineering und Refinement, Applikationsarchitektur, Refactorings, Implementierungen, Recherche und allgemeine Arbeitsfragen, unabhängige Reviews und die Bearbeitung von Review-Feedback sowie die Übergabe von Änderungen.
- Die Beispiele veranschaulichen die Einsatzbreite. Sie definieren weder einen festen Tätigkeitskatalog noch eine eigene Fachrolle oder einen Pflichtablauf pro Tätigkeit.
- Alle vorgeschlagenen Rollen können mit ihrem fachlichen Kern in V1 enthalten sein. Namensvorschläge: Sphinx für den gemeinsamen Einstieg, Athene für Arbeitsfragen, Daidalos für Umsetzung, Themis für unabhängige Prüfung, Hermes für die Übergabe von Änderungen, Ariadne für Requirements Engineering inklusive Refinement und Metis für Applikationsarchitektur.
- Automatische Versionierung und Release-Vorbereitung für die Distribution des Plugins über das Upstream-GitHub-Repository.

## Out of Scope

- Übernahme der bisherigen Agentenanweisungen als Grundlage; vorhandene Rollen sind nur grobe Orientierung.
- Abhängigkeit des Arbeitsablaufs von GitHub, einem anderen bestimmten Git-Hoster oder einem bestimmten Techstack.
- Eigene Sicherheitsmechanismen oder Berechtigungsregeln des Plugins. Die Agenten liefern fachliche Fähigkeiten und Anleitung; Sicherheit und Durchsetzung von Berechtigungen liegen ausserhalb des Plugins.

## Functional Requirements

- Ein gemeinsamer Einstieg nimmt frei formulierte Arbeitsaufträge an und zieht je nach Auftrag passende Fachrollen hinzu, ohne dass der Nutzer sie vorher auswählen muss.
- Die Auswahl passender Fachrollen richtet sich nach dem konkreten Auftrag, nicht nach einer abschliessenden Liste von Tätigkeiten. Das Plugin liefert pro Fachrolle ein konkretes voreingestelltes Modell und eine konkrete Reasoning-Voreinstellung, die auf die benötigten Fähigkeiten der Rolle abgestimmt sind. Nutzer können beide Einstellungen pro Fachrolle überschreiben.
- Die Requirements-Engineering-Rolle unterstützt dabei, Anforderungen und offene Fragen zu klären, Stakeholder-Perspektiven einzubeziehen und Anforderungen zu verfeinern. Je nach Auftrag kann sie etwa einen Stakeholder-Roundtable, einen sokratischen Dialog oder einen anderen geeigneten Ansatz unterstützen. Kein Format ist Pflicht.
- Die Architekturrolle unterstützt beim Entwurf von Applikationsarchitekturen und beim Abwägen von Architekturentscheidungen.
- Bei Umsetzungsaufträgen legt der Agent standardmässig eng geschnittene Commits an. Gehört die Übergabe zum initialen Auftrag, führt er die dazugehörigen Schritte mit den geeigneten verfügbaren Werkzeugen selbstständig aus. Der initiale Auftrag bestimmt den Umfang der Handlungen und genügt ohne separaten Folgeauftrag.
- Jede Rolle trägt den Namen einer Figur aus der griechischen Mythologie, der zu ihrer Aufgabe passt. Die Agentenbeschreibung (`description`) jedes Agenten, einschliesslich des Einstiegsagenten, benennt seine fachliche Aufgabe und beschreibt kurz seine mythologische Figur. Gelegentliche mythologische Anspielungen ergänzen die fachliche Antwort.
- Für die Plugin-Distribution ermittelt die Automatisierung die nächste SemVer-Version aus den Conventional Commits seit dem letzten Release: `fix` ergibt Patch, `feat` Minor und ein Breaking Change Major; bei mehreren Änderungen zählt die höchste Stufe. Ein Release-PR enthält die neue Version und den aktualisierten Changelog. Das zugehörige GitHub-Release mit Release Notes wird erst nach dem Merge dieses Release-PRs veröffentlicht.

## Non-Functional Requirements

- Dauerhaft hinterlegte Rollenhinweise bleiben sehr kurz und beschränken sich auf die wichtigsten allgemeinen Anweisungen. Auftragsbezogene Einzelheiten gehören in den Arbeitsauftrag, nicht in einen für jede Anfrage geladenen Ablauf.
- Die Agenten orientieren sich am jeweiligen Projekt und seinen verfügbaren Werkzeugen. GitHub ist ausschließlich der Distributionsweg des Plugins, keine Laufzeitvoraussetzung für die Arbeit in Nutzerprojekten.

## Acceptance Criteria

- **AC-WI-26-11-18-1341Z-5SFIE-001-001** — Ein Entwickler kann das Plugin in OpenCode aus dem Upstream-GitHub-Repository installieren und den gemeinsamen Einstieg für einen frei formulierten Arbeitsauftrag nutzen.
- **AC-WI-26-11-18-1341Z-5SFIE-001-002** — Repräsentative, frei formulierte Arbeitsaufträge unterschiedlicher Art ziehen die jeweils passende Fachrolle hinzu, ohne vorherige manuelle Agentenauswahl oder Bindung an eine abschliessende Tätigkeitsliste.
- **AC-WI-26-11-18-1341Z-5SFIE-001-003** — Bei einem repräsentativen Umsetzungsauftrag werden Änderungen in eng geschnittenen Commits festgehalten. Vom initialen Auftrag gedeckte Übergabeschritte werden mit geeigneten verfügbaren Werkzeugen ohne separaten Folgeauftrag durchgeführt. Die Übergabe ist nicht auf einen bestimmten Hoster beschränkt. Ein reiner Analyseauftrag löst weder Commits noch eine Übergabe aus.
- **AC-WI-26-11-18-1341Z-5SFIE-001-004** — Beim Aufruf einer Fachrolle gelten das voreingestellte Modell und die voreingestellte Reasoning-Einstellung, sofern sie verfügbar sind. Gültige Nutzereinstellungen haben für die jeweils überschriebenen Werte Vorrang.
- **AC-WI-26-11-18-1341Z-5SFIE-001-005** — Die Rollennamen passen zur Aufgabe der jeweiligen Figur. Bei Durchsicht der festen Rollenhinweise beschränken sich diese auf allgemeine, für die Rolle wesentliche Hinweise; eine mythologische Anspielung ergänzt die fachliche Antwort, statt sie zu ersetzen.
- **AC-WI-26-11-18-1341Z-5SFIE-001-006** — Ein repräsentativer Auftrag zum Requirements Engineering oder Refinement zieht die dafür vorgesehene Fachrolle hinzu. Die Rolle unterstützt eine Klärungsmethode, die zum jeweiligen Auftrag passt.
- **AC-WI-26-11-18-1341Z-5SFIE-001-007** — Ein repräsentativer Auftrag zum Entwurf einer Applikationsarchitektur zieht die Architekturrolle hinzu. Die Antwort erläutert den Entwurf und die für den Auftrag relevanten Abwägungen.
- **AC-WI-26-11-18-1341Z-5SFIE-001-009** — Die `description` jedes Agenten enthält neben seiner fachlichen Aufgabe eine kurze Beschreibung der mythologischen Figur; dies gilt auch für den Einstiegsagenten.
- **AC-WI-26-11-18-1341Z-5SFIE-001-010** — Repräsentative Conventional-Commit-Verläufe im Upstream-Repository des Plugins ergeben für Patch, Minor und Major jeweils die erwartete nächste SemVer-Version des Plugins. Der Release-PR enthält diese Version und den aktualisierten Plugin-Changelog. Vor dem Merge erscheint kein zugehöriges GitHub-Release; nach dem Merge erscheint das Plugin-Release im selben Repository mit derselben Version und den zugehörigen Release Notes.

## Accepted Assumptions

- Keine zusätzlichen Annahmen akzeptiert.

## Dependencies

- OpenCode und die in der jeweiligen Umgebung verfügbaren Modelle und Reasoning-Varianten.
- Für Übergabeschritte: geeignete Werkzeuge und Berechtigungen der jeweiligen Umgebung.
- Für die Plugin-Veröffentlichung: das Upstream-GitHub-Repository und die dort verfügbaren Release-Funktionen.

## Risks

- Verfügbare Modelle und Reasoning-Varianten unterscheiden sich zwischen OpenCode-Umgebungen; eine feste Zuordnung kann andernfalls nutzbare Rollen einschränken.
- Spezifische Werkzeugannahmen können Hosterneutralität unterlaufen, auch wenn die Rollennamen und Prompts neutral formuliert sind.

## Open Questions

- Konkrete Modelle und Reasoning-Varianten sind in diesem Work Item nicht vorgegeben.

## Version Log

### Version 10

- Date: 2026-11-18
- Summary: Vorrang von Modell- und Reasoning-Einstellungen als Verhalten formulieren
- Reason: Das Kriterium beschreibt das erwartete Ergebnis statt eines Prüfschritts.
- Evidence:
  - Nutzerfrage zur prüfenden Instanz und zum Zweck der bisherigen Formulierung von AC-WI-26-11-18-1341Z-5SFIE-001-004.

### Version 9

- Date: 2026-11-18
- Summary: Modellkriterium auf beobachtbare Nutzung der Voreinstellung und Overrides zuschneiden
- Reason: Die tatsächliche Einstellung ist prüfbar; ein separates Kriterium zur Begründung der Modellwahl für einzelne Rollen entfällt.
- Evidence:
  - Nutzerkommentare zur Prüfbarkeit von AC-WI-26-11-18-1341Z-5SFIE-001-004 und zur Streichung von AC-WI-26-11-18-1341Z-5SFIE-001-008.

### Version 8

- Date: 2026-11-18
- Summary: Methodenwahl neutral formulieren und Modell- sowie Release-Kriterien präzisieren
- Reason: Die Eignung für den Auftrag statt eines festen Methoden- oder Modellvergleichs prüfen und den Release-Bezug zum Plugin eindeutig machen.
- Evidence:
  - Nutzerkommentare zu den Akzeptanzkriterien für Klärungsmethoden, Modellvoreinstellungen und Plugin-Versionierung.

### Version 7

- Date: 2026-11-18
- Summary: Release-PR und Figurenbeschreibungen ergänzen sowie Aufgabenwahl und Übergabe verallgemeinern
- Reason: Die Plugin-Veröffentlichung nachvollziehbar automatisieren und den Work-Item-Umfang ohne unnötige Einzelheiten zur Übergabe beschreiben.
- Evidence:
  - Nutzerentscheidung: SemVer aus Conventional Commits mit Changelog und GitHub-Release über einen Release-PR.
  - Nutzeranforderung: kurze Beschreibung der mythologischen Figur in der Agentenbeschreibung jedes Agenten.
  - Nutzerkommentare: Beispielfälle zur Rollenwahl verallgemeinern und Details einzelner Übergabeschritte nicht auf Work-Item-Ebene festlegen.
  - Version 6 wurde am 2026-11-18 freigegeben; die erweiterte Version 7 liegt zur Freigabe als Entwurf vor.

### Version 6

- Date: 2026-11-18
- Summary: Die Rollenvorschläge in einer gemeinsamen Auflistung zusammenfassen
- Reason: Den fachlichen Umfang ohne Bezug auf die Reihenfolge der Diskussion beschreiben.
- Evidence:
  - Nutzerkommentare: kontextbezogene Abgrenzung weglassen und die Rollennamen in einer gemeinsamen Auflistung führen.

### Version 5

- Date: 2026-11-18
- Summary: V1-Rollenrahmen öffnen und auftragsbezogene selbstständige Übergabe festlegen
- Reason: Das Plugin soll fachliche Arbeit flexibel unterstützen, ohne einen geschlossenen Tätigkeits- oder Methodenkatalog und ohne eigene Sicherheitszuständigkeit.
- Evidence:
  - Nutzerkommentare: alle diskutierten Rollen können bereits als MVP in V1 enthalten sein; Einsatzbereiche und Methoden sind nicht abschliessend.
  - Nutzerkommentar: Sicherheitsaspekte sind extern; das Plugin liefert fachliche Fähigkeiten und Anleitung.
  - Nutzerkorrektur: eng geschnittene Commits und selbstständige PR-Erstellung sind der Standard im Rahmen des initialen Auftrags; ein separater Auftrag ist nicht erforderlich.

### Version 4

- Date: 2026-11-18
- Summary: Requirements Engineering und Architektur als eigenständige Fachrollen aufnehmen
- Reason: Beide Tätigkeiten gehören sicher zum ersten Umfang und benötigen leistungsfähigere Modelle für ihre Analyse- und Abwägungsaufgaben.
- Evidence:
  - Nutzerentscheidung: beide Fachrollen bereits aufnehmen und mit stärkeren Modellen vorkonfigurieren; Stakeholder-Roundtable und sokratischer Dialog sind Beispiele für Requirements Engineering.

### Version 3

- Date: 2026-11-18
- Summary: Die Tätigkeitsliste als nicht abschliessende Beispielsammlung kennzeichnen und ergänzen
- Reason: Die Einsatzbreite sichtbar machen, ohne Aufträge auf eine feste Liste oder einen Pflichtablauf zu beschränken.
- Evidence:
  - Nutzerpräzisierung: Requirements Engineering, Refinement, Applikationsarchitektur, Refactorings, Implementierungen und Recherche sind weitere Beispiele, keine vollständige Tätigkeitsliste.

### Version 2

- Date: 2026-11-18
- Summary: Überschreibbare Modell- und Reasoning-Voreinstellungen für Fachrollen festlegen
- Reason: Fachrollen mit passenden Voreinstellungen nutzbar machen, ohne Nutzer an ein bestimmtes Modell zu binden.
- Evidence:
  - Nutzerentscheidung: konkrete, überschreibbare Voreinstellungen pro Fachrolle mitliefern.

### Version 1

- Date: 2026-11-18
- Summary: Initialen Entwurf für das hoster- und stackneutrale OpenCode-Agentenplugin festhalten
- Reason: Bestätigte Produktziele und Entscheidungen von noch offenen Rollendetails und Modellzuordnungen trennen.
- Evidence:
  - Nutzerdialog: Neubau, GitHub als Distributionsweg, kurze flexible Rollenhinweise und griechisch-mythologisches Thema.
  - Nutzerentscheidung: hoster- und technologieneutral; Pull oder Merge Requests auf ausdrücklichen Auftrag über ein vorhandenes Werkzeug tatsächlich anlegen; gemeinsamer Einstieg.
  - Nutzerentscheidung: die zuvor benannte gemeinsame Work-Item-Vorlage trotz offengelegter Historienlücke provisorisch verwenden.
