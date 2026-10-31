# Precious Hart – Personal Portfolio Monorepo

Production-ready personal portfolio for **Precious Hart**, a software developer and engineer from Nigeria (Computer Science student at Rivers State University and software engineer at Technoville Innovation Nigeria).

Built as a full-stack monorepo featuring a **Vite + React + TypeScript + Tailwind CSS** client and an **Express + TypeScript** backend that dynamically fetches and caches GitHub projects tagged with the `portfolio` topic.

---

## Architecture & Monorepo Structure

```text
├── client/                     # Standalone Vite client package
│   ├── public/
│   │   └── resume.pdf          # Downloadable PDF résumé
│   ├── .env.example            # Client environment template
│   ├── package.json            # Client dependencies & scripts
│   └── vite.config.ts          # Standalone Vite configuration
│
├── server/                     # Standalone Express backend package
│   ├── src/
│   │   ├── middleware/         # Helmet, CORS, Rate Limiter (5 req/hr), Error Handler
│   │   ├── routes/             # /api/projects & /api/contact
│   │   ├── services/           # GitHub REST service (10m SWR cache) & Resend mailer
│   │   ├── validators/         # Zod schemas with honeypot spam detection
│   │   ├── app.ts              # Express application factory
│   │   ├── index.ts            # Standalone server runner (PORT 5000)
│   │   └── types.ts            # Typed interfaces
│   ├── .env.example            # Server environment template
│   └── package.json            # Server dependencies & scripts
│
├── src/                        # React Application source code
│   ├── assets/                 # High-resolution generated images
│   ├── components/             # Navbar, Hero, Services, Projects, Skills, About, Contact, Footer
│   ├── context/                # ThemeContext (Light & Dark mode)
│   ├── services/               # Typed frontend API client
│   └── types/                  # Shared client types
│
├── server.ts                   # Full-stack root entry point (Express API + Vite Dev Middleware)
├── package.json                # Monorepo root scripts & unified dependencies
└── README.md                   # Complete documentation
```

---

## Sections Included

1. **Navbar**: Sticky header with brand wordmark, smooth anchor links (`#services`, `#projects`, `#skills`, `#about`, `#contact`), dark/light theme switch, and mobile drawer.
2. **Hero**: Headline, narrative intro, professional portrait, and 3 actions:
   - *View my GitHub* (`https://github.com/PreciousHtech`)
   - *Hire me* (smooth-scrolls to Contact)
   - *Download résumé* (direct download of `/resume.pdf`)
   - Unboxed social proof metrics strip below the split.
3. **Services**: 4 distinct engineering offerings:
   - Web Development
   - App Development
   - Video Editing
   - AI Automation & Multi-Agent Workflows
   - Each card includes a *"Get a quote"* button that smooth-scrolls to Contact and preselects that service in the dropdown.
4. **Projects**: Dynamically retrieved from GitHub via Express API:
   - Topic filtering: only shows repos tagged with `portfolio` (or active user repos if untagged).
   - Cards display repository title, description, language, tags, stars, **Code** link, and **Live demo** link.
   - Interactive language filter segmented controls.
   - Click any card or the book icon to open a modal displaying the **repository README**.
   - Elegant loading skeletons, error state with retry, and empty state.
5. **Skills**: Grouped into Frontend, Backend, AI & Automation, and Creative, styled without static pill clutter.
6. **About**: Details Precious's background, studies in Computer Science at Rivers State University, and engineering work at Technoville Innovation Nigeria, with one-click email copy.
7. **Contact**: Fully functional inquiry form:
   - Fields: Name, Email, Service dropdown, Message.
   - Invisible honeypot field (`hp`) to trap automated bots.
   - Validated on the server with **Zod**.
   - Protected with **express-rate-limit** (5 requests/hour per IP).
   - Emails dispatched directly to your inbox via **Resend**.
   - Direct mailto link and GitHub link.
8. **Footer**: Clean copyright, quick links, and smooth back-to-top button.

---

## How to Tag GitHub Repositories

The backend pulls repositories directly from GitHub and filters them so you can control which repositories show up on your website:

1. Go to your repository on GitHub (`https://github.com/PreciousHtech/<repo-name>`).
2. Click the gear icon next to **About** on the top right of the repo page.
3. In the **Topics** field, type `portfolio` and press Enter.
4. (Optional) Provide a **Description** and a **Website URL** (which will become the *Live demo* button).
5. Click **Save changes**.

Your repository will now automatically appear in the Projects section!

### Excluding Forks & Archived Repos
By default, all forks and archived repositories are ignored automatically by the backend.

### Pinning Project Display Order
To force specific projects to the front of the list, set `PROJECT_ORDER` in your server `.env` file with comma-separated repository names:
```bash
PROJECT_ORDER="Great_Star_Gem_Technologies_Limited,Suxul-E-commerce,Machine-Translator,Movie-Website"
```

---

### Email Delivery Setup (How to receive inquiries in your email)

Inquiries submitted through your portfolio are addressed to `CONTACT_TO_EMAIL=precioushart205@gmail.com`. You have two primary options for automated delivery:

#### Option A: Resend (Recommended)
1. Sign up for a free account at [Resend.com](https://resend.com).
2. Generate an API Key under **API Keys**.
3. Add it to your server `.env` or deployment environment:
   ```bash
   RESEND_API_KEY=re_123456789...
   CONTACT_TO_EMAIL=precioushart205@gmail.com
   ```
4. Inquiries will immediately arrive in your inbox formatted with client details and message.

#### Option B: Direct Gmail SMTP (Free with your Google account)
1. In your Google Account, enable 2-Step Verification.
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
3. Create a new App Password named "Portfolio".
4. Copy the generated 16-character password and set:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=precioushart205@gmail.com
   SMTP_PASS=your-16-character-app-password
   CONTACT_TO_EMAIL=precioushart205@gmail.com
   ```

### Frontend (`/client/.env` or Vercel/Netlify environment)
| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `/api` (monorepo) or `http://localhost:5000/api` |
| `VITE_GITHUB_URL` | Your GitHub profile URL | `https://github.com/PreciousHtech` |
| `VITE_CONTACT_EMAIL` | Your primary contact email address | `precioushart205@gmail.com` |

---

## Local Development

### Option 1: Unified Full-Stack Runner (Recommended)
Runs both the Express API and the Vite frontend on a single port (`http://localhost:3000`):
```bash
# 1. Install dependencies
npm install

# 2. Start the unified development server
npm run dev
```

### Option 2: Running Standalone Client & Server Independently
```bash
# Terminal 1: Backend API (runs on port 5000)
cd server
npm install
npm run dev

# Terminal 2: Frontend Client (runs on port 3000)
cd client
npm install
npm run dev
```

---

## Production Deployment

### 1. Deploy Backend (Render or Railway)

#### On Render:
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure the service:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add the environment variables:
   - `PORT`: `5000` (or leave default)
   - `GITHUB_USERNAME`: `PreciousHtech`
   - `GITHUB_TOKEN`: *your GitHub personal access token*
   - `GITHUB_FEATURED_TOPIC`: `portfolio`
   - `RESEND_API_KEY`: *your Resend API key*
   - `CONTACT_TO_EMAIL`: `precioushart205@gmail.com`
   - `CLIENT_ORIGIN`: `https://your-portfolio-frontend.vercel.app` (your frontend domain)
5. Deploy and copy your backend URL (e.g., `https://precioushart-api.onrender.com`).

#### On Railway:
1. Create a new project on [Railway](https://railway.app) from the GitHub repo.
2. Under Settings, set **Root Directory** to `/server`.
3. Set **Start Command** to `npm run build && npm start`.
4. Add the environment variables as above.

---

### 2. Deploy Frontend (Vercel or Netlify)

#### On Vercel:
1. Import your repository into [Vercel](https://vercel.com).
2. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `.` (or `client` if deploying client only)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables:
   - `VITE_API_URL`: `https://precioushart-api.onrender.com/api` (your deployed backend URL + `/api`)
   - `VITE_GITHUB_URL`: `https://github.com/PreciousHtech`
   - `VITE_CONTACT_EMAIL`: `precioushart205@gmail.com`
4. Deploy!

#### On Netlify:
1. Link your repository on [Netlify](https://netlify.com).
2. Build settings:
   - **Base directory**: `.`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add the `VITE_*` environment variables in Netlify Site Settings.

---

## License
MIT License. Built for Precious Hart.
