# Onboarding Wizard 🚀

A beautiful, multi-step onboarding form built with Next.js, shadcn/ui, and Firebase Firestore.

## 🌐 Live Demo

**Deployed App:** [https://onboarding-wizard-619e3.web.app](https://onboarding-wizard-619e3.web.app)

## ✨ Features

- **Multi-step Form**: 4-step wizard with validation
  - Personal Information (Name, Email)
  - Company Details (Company Name, Size, Role)
  - Use Case Selection (Multiple options)
  - Communication Preferences
- **Real-time Validation**: Form validation ensures all required fields are filled before proceeding
- **Firebase Integration**: Form submissions are saved to Firestore
- **Beautiful UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🔥 Firebase Integration

This project uses **Firebase Firestore** to store form submissions:

- **Collection**: `form-submission`
- **Data Stored**: First name, last name, email, company details, use cases, preferences, and timestamps
- **Real-time Database**: All submissions are stored in Firestore with auto-generated document IDs
- **Security Rules**: Configured to allow public writes to the form-submission collection

### Firebase Console

View submissions at: [Firebase Console](https://console.firebase.google.com/project/onboarding-wizard-619e3/firestore)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account (for database access)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alipri92/Onboarding-wizard.git
cd Onboarding-wizard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
onboarding-wizard/
├── app/                      # Next.js app directory
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── onboarding-wizard.tsx # Main wizard component
├── lib/
│   ├── firebase.ts           # Firebase configuration
│   ├── firestore-utils.ts    # Firestore helper functions
│   └── utils.ts              # Utility functions
├── firestore.rules           # Firestore security rules
├── firestore.indexes.json    # Firestore indexes
└── firebase.json             # Firebase configuration
```

## 🔨 Build & Deploy

### Build for production:
```bash
npm run build
```

### Deploy to Firebase:
```bash
npx firebase deploy
```

This will deploy both the hosting and Firestore rules.

## 🎨 Customization

### Modify Form Steps

Edit `components/onboarding-wizard.tsx` to customize:
- Form fields
- Validation rules
- Step content
- Success message

### Update Firestore Collection

Change the collection name in the `handleSubmit` function:
```typescript
const docRef = await addDoc(collection(db, "your-collection-name"), submissionData)
```

### Firestore Utility Functions

Use the helper functions in `lib/firestore-utils.ts`:
```typescript
import { addDocument, getDocument, subscribeToCollection } from "@/lib/firestore-utils"

// Add document
await addDocument("collection-name", { data: "value" })

// Real-time listener
subscribeToCollection("collection-name", (data) => {
  console.log("Updated data:", data)
})
```

## 📝 Environment Variables

Firebase configuration is currently hardcoded in `lib/firebase.ts`. For production, consider using environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Alissa Prinsloo** - [GitHub](https://github.com/alipri92)

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.app) for initial UI design
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
