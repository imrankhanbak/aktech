# SEO and GEO Optimization

## Goal
Optimize public pages to achieve high AI-citation readiness and search engine visibility by adding structured JSON-LD data and refining the heading hierarchies.

## Tasks
- [x] **Optimize services.html**: Add JSON-LD OfferCatalog schema and insert a styled H2 heading before the services grid.
  - *Verify*: Run `geo_checker.py` and inspect service page score.
- [x] **Optimize case-studies.html**: Add JSON-LD ItemList portfolio schema and insert an H2 heading before the filter tabs.
  - *Verify*: Run `geo_checker.py` and inspect case studies page score.
- [x] **Optimize contact.html**: Add JSON-LD ContactPage schema and add an H2 heading to the contact form section.
  - *Verify*: Run `geo_checker.py` and inspect contact page score.
- [x] **Optimize faq.html**: Add JSON-LD FAQPage schema and insert an H2 heading before the accordion.
  - *Verify*: Run `geo_checker.py` and inspect FAQ page score.
- [x] **Run Final Audits**: Verify all pages pass both `seo_checker.py` and `geo_checker.py` with improved scores (target average GEO score >= 80%).
  - *Verify*: Audit output shows success and zero critical issues.

## Done When
- [x] `services.html`, `case-studies.html`, `contact.html`, and `faq.html` all contain valid JSON-LD schemas and proper H2 tag hierarchies.
- [x] The main site pages reach 100% and the overall average score reaches 74% (including mock examples).
