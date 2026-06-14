---
title: Comparison Frameworks for Obsidian and Frontend
tags: [comparison, obsidian, digital-garden, static-site]
---

# Comparison Frameworks for Obsidian and Frontend

A side-by-side comparison of the main frameworks used to publish an Obsidian
vault as a website (digital garden), and how they differ on hosting, Obsidian
feature support, site features, and technical output.

| Feature                      | Forestry.md + Digital Garden plugin (open source plugin) | Obsidian Publish (official hosted, paid) |  Quartz 4 (self-hosted SSG)  | Flowershow (hosted / self-host, freemium) | HTML Export (local plugin, open source) |
| ---------------------------- | :------------------------------------------------------: | :--------------------------------------: | :--------------------------: | :---------------------------------------: | :-------------------------------------: |
| **SETUP & HOSTING**          |                                                          |                                          |                              |                                           |                                         |
| No-code setup                |                   ✓ (via forestry.md)                    |                    ✓                     |              ✗               |                     ✓                     |                    ✓                    |
| One-click cloud hosting      |                   ✓ (via forestry.md)                    |                    ✓                     |              ✗               |                     ✓                     |                    ✗                    |
| Self-hostable                |                            ✓                             |                    ✗                     |              ✓               |                     ✓                     |                    ✓                    |
| Free tier available          |                            ✓                             |                    ✗                     |             n/a              |                     ✓                     |                   n/a                   |
| **OBSIDIAN FEATURE SUPPORT** |                                                          |                                          |                              |                                           |                                         |
| Canvas support               |                            ✓                             |                    ✗                     |              ✗               |                     ✗                     |                    ✓                    |
| Obsidian Bases support       |                            ✓                             |                    ✗                     |              ✗               |                   beta                    |                    ✗                    |
| Wikilinks                    |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| Dataview queries             |                            ✓                             |                    ✗                     | ✓ (via Quartz Syncer plugin) |                     ✗                     |                    ✓                    |
| Callouts / admonitions       |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| Transclusion / embeds        |                            ✓                             |                    ✓                     |              ✓               |                  partial                  |                    ✓                    |
| Frontmatter properties       |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| Obsidian themes              |                            ✓                             |                    ✓                     |              ✗               |                     ✗                     |                    ✓                    |
| Embedded Gists               |                            ✓                             |                    ✗                     |              ✗               |                     ✗                     |                    ✗                    |
| **SITE FEATURES**            |                                                          |                                          |                              |                                           |                                         |
| Stacked pages                |                            ✗                             |                    ✓                     |              ✗               |                     ✗                     |                    ✗                    |
| Password protection          |                            ✗                             |                    ✓                     |              ✗               |                     ✗                     |                    ✗                    |
| Customizable UI text         |                            ✓                             |                    ✗                     |              ✓               |                     ✓                     |                    ✓                    |
| Graph view                   |                            ✓                             |                    ✓                     |              ✓               |                     ✗                     |                    ✓                    |
| Backlinks                    |                            ✓                             |                    ✓                     |              ✓               |                     ✗                     |                    ✓                    |
| Full-text search             |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| Custom domain                |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| Selective publishing         |                            ✓                             |                    ✓                     | ✓ (via Quartz Syncer plugin) |                  manual                   |                 manual                  |
| Draft / preview mode¹        |                   ✓ (via forestry.md)                    |                    ✗                     |              ✗               |                     ✗                     |                    ✗                    |
| Page link previews           |                            ✓                             |                    ✓                     |              ✓               |                     ✗                     |                    ✗                    |
| Comments                     |                            ✓                             |                    ✗                     |            plugin            |                     ✓                     |                    ✗                    |
| Custom CSS / styling         |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |
| **TECHNICAL**                |                                                          |                                          |                              |                                           |                                         |
| Static output                |                            ✓                             |                    ✗                     |              ✓               |                     ✓                     |                    ✓                    |
| Open source                  |                            ✓                             |                    ✗                     |              ✓               |                 partially                 |                    ✓                    |
| LaTeX / math                 |                            ✓                             |                    ✓                     |              ✓               |                     ✓                     |                    ✓                    |

> Preview your entire site with unpublished changes — notes, settings, and themes — before going live.

## Notes

- **Forestry.md** (with the Digital Garden plugin) is the most balanced option:
  no-code setup, one-click hosting, broad Obsidian feature support, and a true draft/preview mode.
- **Obsidian Publish** is the official paid, hosted service. It uniquely
  supports stacked pages and password protection, but is not self-hostable, not open source, and produces no static output.
- **Quartz 4** is a self-hosted static-site generator. Dataview and selective publishing rely on the Quartz Syncer plugin.
- **Flowershow** is freemium (hosted or self-host) but drops several site features like graph view, backlinks, and page link previews.
- **HTML Export** is a local, open-source plugin focused on producing static HTML; it lacks hosting and several site-level features.
