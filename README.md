# Pathway Expeditions Uganda

A modern, full-stack web application for Pathway Expeditions Uganda, offering both **Tours & Travel** and **Car Hire** services across East Africa.

## 🚀 Features

- **Tours & Travel**: Browse and book adventure tours, wildlife safaris, gorilla trekking, and cultural experiences
- **Car Hire**: Rent vehicles with transparent pricing, availability calendars, and detailed specifications
- **Responsive Design**: Mobile-first design optimized for travelers on-the-go
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS using shadcn/ui components

## 📁 Project Structure

```
pathway-expeditions/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   └── public/             # Static assets
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── email.ts           # Email service (Brevo)
├── shared/                 # Shared code between client and server
│   ├── data/              # Static data (routes, locations, districts)
│   └── schema.ts          # Database schemas
├── attached_assets/        # Image and media assets
│   ├── generated_images/   # Generated/optimized images
│   └── pricing/            # Pricing data files
└── scripts/                # Utility scripts
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **Backend**: Express.js, Node.js
- **Database**: Drizzle ORM (PostgreSQL/Neon)
- **Email**: Brevo (formerly Sendinblue)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Iranks20/pathway-expeditions.git
cd pathway-expeditions
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
PORT=5003
DATABASE_URL=your_database_url
BREVO_API_KEY=your_brevo_api_key
```

4. Run database migrations:
```bash
npm run db:push
```

## 🚦 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5003`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## ✅ Type Checking

Run TypeScript type checking:
```bash
npm run check
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## 🎨 Design Guidelines

See `design_guidelines.md` for comprehensive design system documentation including:
- Typography system
- Color palette
- Component patterns
- Layout guidelines
- Image requirements

## 📄 License

MIT

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure TypeScript checks pass (`npm run check`)
4. Submit a pull request

## 📧 Contact

For questions or support, please contact the Pathway Expeditions team.

