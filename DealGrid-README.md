# DealGrid Component

A responsive React component for displaying deals in a grid layout with loading states and empty state handling.

## Features

- **Responsive Design**: Automatically adjusts columns based on screen size (1-4 columns)
- **Loading State**: Animated skeleton placeholders during data loading
- **Empty State**: User-friendly message when no deals are available
- **Smooth Transitions**: CSS animations for better UX

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deals` | `Array` | `[]` | Array of deal objects to display |
| `loading` | `Boolean` | `false` | Shows loading skeletons when true |

## Responsive Breakpoints

- **Mobile**: 1 column (< 640px)
- **Tablet**: 2 columns (640px - 1023px)
- **Desktop**: 3 columns (1024px - 1279px)
- **Large Desktop**: 4 columns (≥ 1280px)

## Usage

```jsx
import DealGrid from './components/deals/DealGrid';

// Basic usage
<DealGrid deals={dealsArray} />

// With loading state
<DealGrid deals={dealsArray} loading={isLoading} />

// Empty state (no deals)
<DealGrid deals={[]} />
```

## Dependencies

- React (hooks: useState, useEffect)
- DealCard component

## Styling

Uses inline styles with CSS-in-JS approach. Includes:
- Gradient backgrounds
- Hover effects
- Pulse animation for loading skeletons
- Responsive grid layout

## Deal Object Structure

Each deal in the `deals` array should have an `id` property for React keys. Additional properties depend on the DealCard component requirements.