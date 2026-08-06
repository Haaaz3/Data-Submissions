# Changelog

## v26

- Changed measure routing to use one customer-level enabled measure inventory.
- Removed EH/hospital measures and handoff UI from app-facing prototype paths.
- Distinguished enabled-only measures from submission-selected measures.
- Updated routing cards to derive MVP, APP Plus, MIPS transition, and QRDA from submission-selected measures.

## v25

- Added CMS-style subgroup composition inputs to MVP setup.
- Captures single-specialty vs multispecialty subgroup composition.
- Adds subgroup composition narrative and rationale before registration/assignment.
- Threads subgroup narrative requirements into MVP reporting-level decision copy.

## v24

- Removed Hospital Quality Reporting as a top-line in-app submission path.
- Kept EH/hospital measures visible as a separate out-of-app handoff signal.
- Added MVP reporting-level rules for group, subgroup, individual, and APM Entity selection.
- Changed MVP setup so specialty is facility-selected, not inferred from TIN/NPI.
- Added provider-level MVP performance forecasting before assignment.

## v23

- Restored Production Today so the measure inventory is not the first production screen.
- Restored the production pathway selector to the original broad card behavior.
- Kept measure-driven routing inside the design lab variants with distinct command-center, pathway-hub, and smart-scan treatments.

## v22

- Added a first-screen Enabled Measure Inventory intake flow.
- Classifies EC, EH, APM, eCQM, and CQM measure coverage before showing submission paths.
- Narrows the pathway selector by applicable programs for each customer/site measure profile.
- Added the same measure-driven routing signal to Redwood/OJET lab variants.

## v21

- Converted Provider Assignment Planner from large cards into a compact table.
- Kept Production Today as the screenshot-faithful control.
- Preserved Redwood/OJET styling for experimental variants only.
- Dynamic MVP specialty filter updates recommended MVPs using real MVP names.

## v20

- Made Customer Action Plan the single primary workflow sequencer.
- Added locked future steps and clearer step labels.
- Treated provider-specialty mapping as a preloaded input.

## v19

- Removed competing numeric step badges from experimental variants.
- Clarified first action as reviewing pre-mapped specialty cohorts.
