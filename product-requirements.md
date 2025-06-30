# Fitpoint AI Demo – Lean Product Requirements

## Objective
Demonstrate in under 3 minutes how an AI chat assistant embedded on Fitpoint.ee can lift conversion and average order value. The demo is aimed at Fitpoint's owner and prospective SaaS buyers.

## Must‑Have Capabilities
1. **Conversational search & add‑to‑cart**  
   - The user can ask in English for a product (e.g. "vanilla whey").  
   - The assistant returns up to 3 mock SKUs, each with an "Add to cart" button.  
   - Cart count visibly updates in the UI.

2. **Smart upsell suggestion**  
   - After the first item is added, the assistant suggests one complementary SKU that increases the potential order value by at least 15 %.  
   - One‑click **Add bundle** button adds both items.

3. **Checkout hand‑off**  
   - A **Go to checkout** button opens the existing Fitpoint.ee cart page pre‑filled with the selected mock items.

4. **Mini metrics overlay (read‑only)**  
   - Displays: **Sessions**, **Items added**, **Bundles accepted**.  
   - Values are seeded via script so they are greater than zero for the demo.

## Scope

| In Scope | Out of Scope |
| --- | --- |
| Floating chat widget styled with Fitpoint brand colours | Full site clone or page re‑layout |
| Static JSON catalogue (~15 SKUs) with images & tags | Live inventory sync |
| Hard‑coded assistant logic (if/else) | Real LLM calls |
| Basic click tracking to console / overlay | Integration with GA, Mixpanel, etc. |
| English copy samples | Estonian copy samples, Deep i18n framework |

## Acceptance Checklist
- [ ] Assistant loads on the home page within 2 s.  
- [ ] A user can add at least one SKU to the cart entirely through chat.  
- [ ] The upsell suggestion appears only once per session and can be added with 1 click.  
- [ ] **Go to checkout** opens the real Fitpoint.ee cart page with correct SKU IDs in the URL (mock prices are acceptable).  
- [ ] Metrics overlay shows non‑zero counters.

## Nice‑to‑Have (Demo Only)
- Automatic language detection.  
- **Restart demo** button resets cart & counters.

> Anything not listed above is considered out of scope for the first demo.