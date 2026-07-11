# Implementation Plan: AI Agent & LLM Readiness

## Goal
Make [aktechnologies.online](https://aktechnologies.online) fully discoverable and "agent-ready" so that search/chat agents (like ChatGPT, Gemini, Grok, and Perplexity) can crawl, read, understand, and cite our AI Automation agency's services.

## Tasks

- [x] **Create `.well-known` Directories**:
  - Set up folders: `/.well-known/mcp/` and `/.well-known/agent-skills/`
  - *Verify*: Folders are created in the project root.

- [x] **Configure MCP Discovery Card (`/.well-known/mcp.json` and `/.well-known/mcp/server-card.json`)**:
  - Create these files to provide metadata about the website's agency capabilities.
  - *Verify*: Files contain valid JSON schema headers.

- [x] **Create Agent Skills Profile (`/.well-known/agent-skills/index.json`)**:
  - Outline core agency skills (WhatsApp automation, custom chatbots, custom software, ERP) with precise keywords.
  - *Verify*: File is accessible via local URL parser.

- [x] **Create API Catalog (`/.well-known/api-catalog`) & OpenAPI Doc**:
  - Add `api-catalog` pointing to the public contact endpoint definition.
  - Create `/.well-known/api-catalog/openapi.json` to define the contact query endpoint structure.
  - *Verify*: Valid OpenAPI 3.0 specification.

- [x] **Update Sitemap & Robots.txt**:
  - Add the new files to `sitemap.xml` and ensure `robots.txt` does not restrict crawlers from scanning `/.well-known/`.
  - *Verify*: Running `seo_checker.py` and `geo_checker.py` returns 100% success.

## Done When
- [x] AI agents can request and parse `/.well-known/mcp.json` and `/.well-known/agent-skills/index.json`.
- [x] All validation scripts run successfully.

