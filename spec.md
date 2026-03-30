# Lucky Paper and Stationery Mart

## Current State
The site shows 8 category cards on the main page. Clicking a category expands an accordion below the card showing a product list (text + price, no product images). Products can be added to cart.

## Requested Changes (Diff)

### Add
- Individual product images for all 32 products (4 per category × 8 categories)
- Category detail pages: full-page view per category showing all products as cards with image, name, and price
- Back navigation from category page to main page

### Modify
- Category cards on home page: clicking now navigates to the category detail page instead of expanding an accordion
- Product display: each product is now a card with image on top, name and price below, and Add to Cart button

### Remove
- Expandable accordion product list on category cards (replaced by dedicated pages)
- `expandedCategory` state and `toggleCategory` logic
- ChevronUp/ChevronDown icons on category cards

## Implementation Plan
1. Add `currentPage` state: `'home'` or `{ type: 'category', name: string }` for simple routing without React Router
2. Generate 32 product images (4 per category)
3. Add image paths to each product object in the categories data
4. Build `CategoryPage` component: header with back button, grid of product cards (image + name + price + Add to Cart)
5. Update home page category cards to navigate to category page on click (remove accordion toggle)
6. Render either home view or category page based on `currentPage` state
