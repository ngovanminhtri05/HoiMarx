# Design System: Hoi Marx

## 1. Visual Theme & Atmosphere
Hoi Marx is a friendly study companion for Vietnamese university students learning MLN111. The interface should feel calm, clear, and supportive: a modern reading desk rather than a political poster. Density is balanced for daily study, with enough structure for quizzes and flashcards but enough whitespace for long AI answers.

Design dials:
- Variance: 5. Use gentle asymmetry and layered study panels, but keep workflows predictable.
- Motion: 4. Use subtle transitions for feedback, loading, and page changes.
- Density: 5. Student-friendly, scannable, not sparse.

## 2. Color Palette & Roles
- Study Canvas (#F6F8FB): primary app background.
- Surface White (#FFFFFF): message bubbles, cards, input panels.
- Soft Panel (#EEF3F8): secondary surfaces and navigation.
- Charcoal Ink (#17212B): primary text.
- Steel Text (#64748B): secondary copy, metadata, hints.
- Quiet Border (#D8E1EA): dividers, input borders, inactive controls.
- Marx Red (#B4232A): the single accent for CTAs, active states, focus rings, and progress.
- Red Wash (#F9E8EA): subtle accent background for selected or important states.
- Success Green (#1F7A4D): correct answer and mastered states only.
- Warning Amber (#B7791F): source confidence states only.

No neon purple, no blue-purple AI gradients, no pure black.

## 3. Typography Rules
- Display: Outfit, system sans fallback. Use 700 weight for page titles and 600 for section headings.
- Body: Outfit, system sans fallback. Body copy uses relaxed line height and max readable widths.
- Mono: Consolas, SFMono-Regular, Menlo, monospace for counts, percentages, and small metadata.
- Use sentence case for visible UI text.
- Avoid all-caps except tiny metadata labels where scanning benefits.
- No emojis in UI. Icons must come from lucide-react only.

## 4. Component Stylings
- Buttons: 12px radius, clear hover, active translateY(1px), visible focus ring in Marx Red.
- Icon buttons: lucide-react only, 20px or 22px, strokeWidth 2.
- Cards: 18px radius, soft border, minimal shadow. Use cards for study modules, quiz answers, sources, and flashcard surfaces.
- Inputs: label or aria-label, 14px radius, white surface, 1px border, red focus ring. No floating labels.
- Chat bubbles: assistant bubbles are white with border; user bubbles are Marx Red with white text.
- Loading: skeleton or pulsing dots, not circular spinners.
- Empty states: composed with a Lucide icon, short student-centered copy, and suggested next actions.

## 5. Layout Principles
- App shell uses a fixed top header, scrollable main content, and bottom navigation.
- Keep core routes stable: Chat, Ôn thi, Thẻ học, Mindmap.
- Use CSS Grid for page layout and responsive controls.
- Desktop content max width is 1120px for study pages and 860px for chat reading.
- Mobile under 768px collapses all multi-column controls and keeps tap targets at least 44px.
- Never use overlapping text. Avoid cards inside cards unless it represents a real nested object such as sources inside an AI answer.

## 6. Motion & Interaction
- Transitions use transform and opacity only where possible.
- Hover lifts are subtle: translateY(-1px) max.
- Active press uses translateY(1px) or scale(0.98).
- Respect prefers-reduced-motion by removing animations.
- Streaming, answer reveal, and flashcard flip are the only prominent motion moments.

## 7. Anti-Patterns (Banned)
- No generated icons or hand-drawn SVG icons.
- No emoji icons.
- No pure black backgrounds.
- No neon glows or purple AI gradients.
- No unreadable decorative typography.
- No long all-caps headers.
- No political poster aesthetic as the primary UI language.
- No broken Vietnamese encoding in visible UI text.
- No generic "three equal feature cards" pattern for the app frame.
- No hidden focus states.
