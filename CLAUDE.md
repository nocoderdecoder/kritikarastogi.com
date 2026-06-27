# kritikarastogi.com — Design Reference

## Design Aesthetic
Editorial, minimal, professional. Generous whitespace. Let typography do the work.
Serif for display and personality. Sans for body and function. Coral used sparingly as accent only.

## Colour Tokens
| Token | Role | Usage |
|-------|------|-------|
| `--ink` | Near-black | All primary text, borders |
| `--coral` | Accent | Links, highlights, timeline dates, arrows — use sparingly |
| `--muted` | Mid-grey | Secondary text, captions |
| `--green` | Lime green | Section backgrounds (superpowers, manifesto) |
| `--paper` | Off-white | Page background |
| `--white` | White | Card/section backgrounds |

## Font Tokens
| Token | Stack | Use for |
|-------|-------|---------|
| `--serif` | Iowan Old Style, Palatino, Georgia | Hero headings, display text, section h2s, timeline |
| `--sans` | Inter, system-ui | Body copy, nav, kickers, labels, UI elements |

## Typography Scale (current)
| Element | Size | Weight | Font |
|---------|------|--------|------|
| Kicker | 9px | 750 | sans, all-caps, letter-spacing 0.12em |
| Body small | 12–13px | 400 | sans |
| Body | 15px | 400 | sans |
| Body large | 18px | 400 | sans |
| Nav | 14px | 400 | sans |
| Timeline year | 22px | 400 | serif |
| Timeline company | 25px | 400 | serif |
| Education name | 16px | 400 | serif |
| Principles h2 | 35px | 400 | serif |
| Section h2 (work/writing) | 57px | 400 | serif |
| Method h2 | 55px | 400 | serif |
| Manifesto h2 | 65px | 400 | serif |
| About h1 | 74px desktop / 55px mobile | 400 | serif |
| Index h1 | 82px → 70px → 66px → 43px | 400 | serif |

## Spacing Principles
- Section padding: 85–120px top/bottom
- Hero padding: 95px top
- Grid gaps: 35–100px depending on context
- Don't crowd — if it feels tight, add space

## Design Rules
1. **Always state the current value before changing it.** ("Currently 15px, bumping to 18px")
2. **Serif = display, personality, big moments.** Sans = everything functional.
3. **Coral is an accent, not a theme.** One or two uses per section max.
4. **Font sizes should follow a ratio** — avoid arbitrary increments. Prefer the scale above.
5. **Alignment should be intentional** — left-aligned body, centered only for pull quotes or closing statements.
6. **Don't mix too many sizes in one section** — 2–3 sizes max per block.
7. **Bold sparingly** — if everything is bold, nothing is bold.
8. **Line length matters** — body text should sit at 60–80 characters per line ideally.
