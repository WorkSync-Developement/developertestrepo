---
name: schema-trace
description: Mandatory end-to-end schema verification. Never guess table/column/types/RLS behavior.
---

# Verify Schema Routing End-to-End (Mandatory)

## Before implementation
Trace full data path:
- UI field
- Payload
- API handler
- DB query
- DB column

Verify:
- table names
- column names
- types
- RLS behavior

## Hard rule
- Never guess schema

## Output requirement (plan)
Write the trace explicitly in one line per field:
UI -> payload -> handler -> table.column (type) + RLS note
