# ESL Resource Index Hub

A complete MVP website for a large ESL teaching resource index. The site organizes ESL materials by main category, topic group, fine-grained topic, and curated resource links.

This is intentionally an index hub, not a lesson-content website. Topic pages show metadata, resource counts, filters, curated links, related topics, and short teacher notes.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local JSON data
- No database
- No authentication

## Data Files

- `data/categories.json` contains main categories and topic groups.
- `data/topics.json` contains all generated fine-grained topic pages.
- `data/resources.json` contains sample curated resource links.

Current dataset:

- 7 main categories
- 60 topic/toolkit groups
- 468 topic records
- 303 sample resource records
- 37 real Listening Courses resource records
- 260 real curated resource records across the Speaking, Travel, Business, Foreign Trade, and Native Phrases batches
- 135 resource-ready topic records

## Level Rules

- Speaking Topics: A1-A2
- Listening Courses: A1-A2
- Travel English: A1-A2
- Business English: A2-B1
- Foreign Trade English: A1-A2
- Native Phrases: A1-A2
- Teacher Toolkit: A1-A2

## Resource Types

General resource types:

- PDF
- Word
- PPT
- Image
- External Website
- Article
- Worksheet
- Lesson Plan

Listening-specific resource types:

- ESL Listening Website
- Audio Page
- Audio File
- Downloadable Audio
- Transcript
- Script
- Listening Questions
- Interactive Quiz
- Answer Key
- Vocabulary Notes
- Knowledge Points
- YouTube Supplement

Each resource item supports:

- `id`
- `topicId`
- `type`
- `title`
- `url`
- `source`
- `level`
- `notes`
- `isLocal`
- `downloadable`
- `resourceFeatures`
- `priority`

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run TypeScript checks:

```bash
npm run typecheck
```

Build for production:

```bash
npm run build
```

## Regenerate Data

The JSON files are generated from `scripts/generate-data.mjs` so the large topic list stays consistent:

```bash
npm run generate:data
```

## Main Pages

- `/`
- `/speaking-topics`
- `/listening-courses`
- `/travel-english`
- `/business-english`
- `/foreign-trade-english`
- `/native-phrases`
- `/teacher-toolkit`
- `/all-topics`
- `/topics/[slug]`

## MVP Notes

The local resource URLs are placeholders for version 1. Add real files later under a public resource folder or replace the URLs with external links.
Placeholder local resource paths are handled by `/resources/[...path]` so sample links do not lead to a blank page during MVP review.

Listening Courses use ESL listening websites as primary resources. YouTube links, when used, are stored as `YouTube Supplement` resources and are not embedded by default.
The site should stay a resource index hub: topic pages should not contain long explanations, full lesson scripts, complete lesson flows, or full mini-dialogues.
