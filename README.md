# Jawla Tours · OTA Documentation Hub

Single-page React site presenting the complete documentation package for the Jawla Tours OTA project — three pricing tiers across four document types.

## Contents

- **Client Proposals** (Arabic, RTL) — Basic / Professional / Enterprise
- **Product Requirements (PRD)** — Basic / Professional / Enterprise
- **Software Requirements (SRS)** — Basic / Professional / Enterprise
- **Maintenance Contracts** (Arabic) — Basic / Professional / Enterprise

12 documents total.

## Local view

Open `index.html` directly in any browser. No server required.

## Rebuild

Edit any `docs/*.md`, then:

```bash
node build.mjs
```

This regenerates `index.html` with all docs inlined.

## Stack

Tailwind + React 18 (UMD) + marked.js + DOMPurify. All via CDN. No build pipeline.
