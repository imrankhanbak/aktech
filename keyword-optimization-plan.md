# Task Plan: Keyword & Search Intent Optimization (SEO & GEO)

## Goal
Optimize `index.html`, `services.html`, and `faq.html` to integrate targeted buying-intent and informational keywords. This will boost ranking on Google Search and citation potential on AI search engines (ChatGPT, Gemini, Grok, Perplexity).

## Proposed Changes

### 1. `index.html` (Homepage)
- [x] Update `<title>` to: `AK Technologies | Leading AI Automation Agency & Custom Software Developers`
- [x] Update `<meta name="description">` to include: `AI automation agency`, `custom AI agents`, and `workflow automation consulting` targeting Lahore, Dubai, Riyadh, London, and New York.
- [x] Add a sub-headline or localized service badge section containing localized targets: `Karachi`, `Lahore`, `Dubai`, `Riyadh`, `Doha`, `London`, `New York`.
- *Verification*: Meta tags updated, SEO score check passes.

### 2. `services.html` (Services Page)
- [x] Update `<title>` to: `AI Automation, Custom Chatbots & n8n Workflow Services | AK Technologies`
- [x] Update `<meta name="description">` to include core service buying-intent keywords: `custom AI agent development services`, `Make.com workflow automation agency`, `n8n certified automation consultant`, and `WhatsApp Business API integration company`.
- [x] Update Section headers to use exact matching search phrases.
- *Verification*: Service descriptions updated, GEO schema continues to validate 100%.

### 3. `faq.html` (FAQ Page)
- [x] Update `<title>` to: `AI Automation FAQ | Model Context Protocol, n8n & Custom Chatbots`
- [x] Add three new FAQ questions answering:
  - "What is Model Context Protocol (MCP) and how does it make a website AI-ready?"
  - "How does n8n compare to Zapier for B2B enterprise automation?"
  - "How much does it cost to hire an AI automation agency or build a custom AI agent?"
- [x] Update the JSON-LD `FAQPage` schema to map these new questions for AI crawlers.
- *Verification*: Runs `geo_checker.py` and returns 100%.

## Done When
- [x] Meta tags and copy on all three pages are updated.
- [x] Validation scripts pass.
- [x] Changes committed and pushed to git.
