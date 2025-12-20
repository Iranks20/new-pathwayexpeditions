# Design Guidelines: Pathway Expeditions Uganda

## Design Approach

**Reference-Based Approach**: Drawing from premium travel and car rental platforms including Airbnb (booking experience, imagery treatment), Booking.com (search/filter functionality), Turo (vehicle showcase), and Intrepid Travel (adventure tour presentation). This dual-service website demands visual storytelling that inspires wanderlust while maintaining professional car rental standards.

**Core Design Principles**:
- Immersive visual storytelling through high-impact photography
- Seamless dual-service integration (Tours & Car Hire)
- Trust-building through transparent pricing and detailed service information
- Mobile-first responsive design for travelers on-the-go

## Typography System

**Font Families**:
- Primary (Headings): 'Outfit' or 'Poppins' - Modern, clean sans-serif conveying adventure and professionalism
- Secondary (Body): 'Inter' or 'Source Sans Pro' - Excellent readability for descriptions and details

**Type Scale**:
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Titles: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal
- Body Regular: text-base, font-normal
- Captions/Labels: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, and 24 for consistent rhythm.

**Section Padding**:
- Mobile: py-12 px-4
- Desktop: py-20 md:py-24 lg:py-32, px-6 md:px-8

**Container Widths**:
- Full-width sections: w-full with inner max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Text-focused areas: max-w-4xl mx-auto

**Grid System**:
- Tour cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
- Vehicle fleet: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Features/Activities: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Destination highlights: grid-cols-1 md:grid-cols-2 gap-8 md:gap-12

## Component Library

### Navigation
- Sticky header with dual-service toggle/dropdown (Tours & Travel | Car Hire)
- Logo placement: left-aligned
- Main navigation: right-aligned with CTA button
- Mobile: Hamburger menu with full-screen overlay
- Service switcher: Prominent toggle allowing users to switch between Tours and Car Hire sections

### Hero Section
- Full-width immersive hero with high-quality safari/landscape imagery
- Height: min-h-screen on desktop, min-h-[600px] on mobile
- Overlay gradient for text readability
- Dual CTAs: "Explore Tours" and "Rent a Vehicle"
- Integrated search bar with tabs for Tours/Car Hire
- Search inputs: Destination/Vehicle Type, Date Range, Guests/Passengers, Budget

### Tour Components
**Tour Package Cards**:
- Image-first design with rounded corners (rounded-lg)
- Overlay badge for duration and pricing
- Content: Title, location, brief description, key activities icons
- Footer: Price, availability calendar indicator, "View Details" CTA
- Hover state: subtle scale transform and shadow elevation

**Tour Detail View**:
- Gallery carousel at top
- Itinerary breakdown with day-by-day cards
- Includes/Excludes lists with checkmark icons
- Pricing breakdown table
- "Book Now" sticky CTA bar on mobile

**Activity Showcase**:
- Icon cards with illustrations (Wildlife Safaris, Gorilla Trekking, etc.)
- 2-column on mobile, 3-column on tablet, 6-column grid on desktop
- Hover reveals additional details

### Car Hire Components
**Vehicle Fleet Cards**:
- Large vehicle image with multiple angle thumbnails
- Specifications grid: Seats, Transmission, Fuel Type, Luggage
- Features list with icons: AC, GPS, Insurance, etc.
- Daily/Weekly pricing display
- Availability calendar integration
- "Reserve Now" CTA button

**Vehicle Categories**:
- Tabs or filter chips: All Vehicles, Safari 4x4, SUVs, Sedans, Luxury
- Quick filter sidebar: Price range, Capacity, Features

**Booking Form**:
- Multi-step wizard for both tours and car rentals
- Step indicators at top
- Form sections: Personal details, Travel dates, Special requests, Payment
- Summary sidebar showing selection and total cost

### Destination Explorer
- Interactive region cards for Uganda (Western, Central, Eastern, Northern), Kenya, Rwanda, Tanzania
- Each card: Large background image, region name, key highlights
- Click reveals detailed destination page with tours available in that region

### Social Proof
- Client testimonial cards with photos
- Rating display with star icons
- Stats counter: Satisfied clients, Tours completed, Countries covered
- Partner/certification logos

### Information Sections
**Why Choose Us**:
- 3-column grid: Expert Guides, Tailored Experiences, Sustainable Travel
- Icon + Title + Description format
- Subtle background differentiation

**FAQ Accordion**:
- Separate sections for Tour FAQs and Car Hire FAQs
- Expandable cards with smooth transitions
- Question in bold, answer in regular weight

### Footer
- Multi-column layout: Company Info, Quick Links, Contact Details, Newsletter Signup
- Social media icons
- WhatsApp integration button
- Trust badges and payment method icons
- Copyright and legal links

## Images

### Critical Image Placements

**Hero Section**: 
- Full-width, high-quality landscape showing Uganda's natural beauty - gorillas in mist, savanna sunset, or Murchison Falls
- Must evoke adventure and wanderlust
- Resolution: Minimum 1920x1080, optimized for web

**Tour Package Cards** (12-15 images):
- Wildlife safari scenes: Lions, elephants, rhinos in natural habitat
- Gorilla trekking: Close-up of mountain gorillas
- Cultural experiences: Traditional dance, local communities
- Landscapes: Lake Victoria, Queen Elizabeth National Park, Rwenzori Mountains
- Each image: 800x600px, consistent aspect ratio 4:3

**Vehicle Fleet** (8-12 images):
- Clean, professional vehicle photos on white or neutral backgrounds
- Multiple angles per vehicle: Front 3/4 view, interior, side profile
- Safari vehicles in natural settings
- Each image: 600x450px, consistent styling

**Destination Cards** (8 images):
- Regional highlights: Western Uganda (safari plains), Central (cultural sites), Eastern (mountains), Northern (waterfalls)
- Kenya, Rwanda, Tanzania iconic landmarks
- Each image: 1000x667px, landscape orientation

**Activity Icons/Illustrations**:
- Use icon library (Heroicons outline style)
- Activities: Binoculars (bird watching), Mountain (trekking), Ship (boat cruise), Users (cultural tours), Camera (wildlife safari)

**Gallery Section**:
- Masonry grid of authentic safari experiences
- Mix of wildlife, landscapes, happy travelers, cultural moments
- 15-20 curated images

**Blurred Button Backgrounds**: All CTAs placed over images use backdrop-blur-sm with semi-transparent background (bg-white/20 or bg-black/30).

## Interaction Patterns

- Smooth scroll behavior for anchor links
- Lazy loading for images below the fold
- Skeleton loaders for dynamic content
- Form validation with inline feedback
- Hover states: Subtle elevation (shadow-lg) and scale (scale-105)
- Transition timing: transition-all duration-300 ease-in-out

## Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states with visible outlines (focus:ring-2)
- Minimum contrast ratio 4.5:1 for text
- Alt text for all images describing content

## Mobile Optimization

- Touch-friendly tap targets (minimum 44x44px)
- Swipeable carousels for image galleries
- Collapsible filters/search on mobile
- Fixed bottom CTA bar for booking actions
- Optimized image sizes for mobile bandwidth

This design creates a premium, trustworthy dual-service platform that showcases Pathway Expeditions' unique position in both adventure tourism and reliable transportation services across East Africa.