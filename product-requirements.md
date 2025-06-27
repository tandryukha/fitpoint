

# Fitpoint AI Smart Finder Mock – Product Requirements

---

### 1  Objective
Create a high-fidelity mock clone of the existing Fitpoint.ee e‑commerce site that showcases a guided, AI‑powered shopping experience. The mock should demonstrate **three** key capabilities:  
1. **Streamlined product search & comparison** via a central “Smart Finder” bar.  
2. **Guided shopping** (AI auto‑filters results, clarifies intent, compares products).  
3. **Intelligent upsell / cross‑sell** bundle suggestions at key moments (PDP, add‑to‑cart).

> *Note: This mock is a demo/prototype and does **not** need live data or production integrations.*

---

### 2  Scope & Constraints

| In Scope | Out of Scope |
|---|---|
| Re‑creation of primary Fitpoint UX (home, PLP, PDP, cart, checkout) with placeholder data | Real payment gateway, order fulfilment, shipping carrier integrations |
| Smart Finder experience (search bar + quick‑tag chips) | Backend or database technology choices |
| Mock AI logic **described** through placeholder responses (no live LLM calls) | Detailed implementation of AI model, hosting, or privacy controls |
| Comparison overlay UI and bundle suggestion panels | Performance optimisation, SEO, or mobile PWAs |
| Copy in Estonian **and** English samples | Deep internationalisation / localisation frameworks |

---

### 3  Target Personas
1. **New Fitness Enthusiast** – Age 20‑35, first‑time supplement buyer, needs guidance.  
2. **Returning Loyalty Member** – Regular buyer, values speed, wants quick re‑ordering and discovery.  
3. **Goal‑Focused Shopper** – Has a specific objective (e.g. fat loss) and wants evidence‑based products.

---

### 4  Primary User Journey (happy path)
1. Visitor lands on homepage.  
2. Sees Smart Finder bar with quick‑tag chips.  
3. Clicks *“Looking for Protein”* chip.  
4. Results grid instantly refreshes with top 8 protein SKUs (filtered + ranked).  
5. Shopper selects two items → clicks *Compare* → side‑by‑side overlay appears.  
6. Chooses one item → PDP opens; sees bundle suggestion (*whey + creatine + shaker*).  
7. Adds bundle to cart.  
8. Cart page shows free‑shipping message → proceeds to checkout.

---

### 5  Core Screens & Components

| Screen / Component | Purpose & Behaviour | Key Content / CTAs |
|---|---|---|
| **Home – Hero with Smart Finder** | Central search input + 4 quick‑tag chips. Chips auto‑trigger preset queries. Input accepts free text. | Chips: Protein ▪ BCAA ▪ Lose Weight ▪ Gear.<br>Helper text: *“Type anything… e.g. vegan protein under €30”* |
| **AI Intent Capture Layer** | Invisible. On each input/chip click, capture query, language preference, any mock profile trait. | Stores in session object for demo. |
| **Personalised Results Grid (PLP)** | Displays 12 products (3 × 4). Grid header shows query recap (*“Results for: Protein”*). Each card includes product name, price, tag ribbon, CTA *“Compare”*. | Filters rail: price slider, brand list, dietary tags. |
| **Comparison Overlay** | Modal overlay with up to 3 items. Columns = SKU; rows = key attributes (protein g, carbs g, servings, cost/serving, rating). CTA per column: *“Select”*. | Close icon top‑right. |
| **Product Detail Page** | Standard PDP layout mirroring Fitpoint. New bundle strip under price: thumbnails + combined price + *“Add Bundle”* CTA. | Placeholder description, macros table, reviews. |
| **Bundle & Cross‑Sell Panel** | On Add‑to‑Cart, slide‑over suggests 2 complementary items with checkboxes and *“Add Selected”* CTA. | Savings badge (e.g. *“Save €3”*). |
| **Cart Page** | Standard cart list + promotional banner: *“Spend €X more for free shipping (free at €69)”*. If bundle selected, show bundle line + discount row. | Buttons: *Continue Shopping* and *Checkout*. |
| **Checkout Mock** | Simplified single‑page checkout with dummy fields and *“Place Order (Demo)”* button. | Confirmation page shows order summary + *“Restart Demo”* link. |

---

### 6  Content & Copy Guidelines
* Tone: Friendly, motivational, fitness‑savvy.  
* Languages: Estonian primary, English fallback.  
* Disclaimers: Small footer on PDP and comparison overlay – *“Informational only. Not medical advice.”*

---

### 7  Mock AI Behaviour Rules
1. **Autocomplete** – Top 5 suggestion pills appear as user types.  
2. **Clarifying question** – If query ambiguous (e.g. “supplement”), show inline bubble with two quick buttons.  
3. **Ranking** – Products ordered by (a) relevance keyword match, (b) hard‑coded “Personal Fit Score”, (c) price ascending.  
4. **Comparison** overlay triggers when exactly 2‑3 items selected.  
5. **Bundle rules** – If product tag contains `protein`, suggest SKUs tagged `creatine` + `shaker`, discount −5 %.  
6. **Free‑shipping prompt** – Show only if cart subtotal €49–€69 (free shipping threshold is €69).

---

### 8  Personalisation Demo Scenarios

| Scenario | Behaviour |
|---|---|
| **New visitor** | Default chips only. |
| **Returning visitor** | Greeting: *“Welcome back, your usual whey is in stock!”* and brand pre‑sorted. |
| **Goal = weight‑loss** | Adds extra chip *“Low‑carb”*; auto‑filter by `low-carb` tag. |

---

### 9  Analytics & Success Criteria
* Track clicks on chips, compare, add‑bundle, free‑shipping banner.  
* Debug overlay counters: total queries, comparisons opened, bundles added, checkout completions.

---

### 10  Acceptance Checklist
- [ ] Smart Finder bar & chips visible on home (desktop & mobile).  
- [ ] Typing a query scrolls/navigates to personalised results grid.  
- [ ] Comparison overlay shows up to 3 items with attribute rows.  
- [ ] PDP displays bundle strip per rules.  
- [ ] Slide‑over upsell appears on Add‑to‑Cart and can add/remove suggested items.  
- [ ] Free‑shipping banner logic triggers at €49–€69 subtotal.  
- [ ] End‑to‑end flow: home → query → compare → PDP → add bundle → cart → checkout → confirmation.  
- [ ] Copy appears in Estonian with English fallback.  
- [ ] Disclaimers visible on PDP and comparison overlay.

---

### 11  Next Steps for Cursor Team
1. Build static JSON catalogue (20‑30 SKUs: proteins, BCAAs, fat burners, gear) with mock images & tags.  
2. Lay out pages following above components; use stub data + simple JS state to satisfy AI behaviour rules.  
3. Implement minimal routing for home, PLP, PDP, cart, checkout.  
4. Add debug overlay counters and confirm all acceptance items.

---