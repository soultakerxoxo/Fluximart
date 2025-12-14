# Fluximart / SnapStockX

Fluximart is an AI-powered image marketplace with a built-in store called SnapStockX. It generates 15 images daily based on web trends, creates automatic metadata, offers a Shutterstock-style marketplace, and includes a secure admin panel with analytics, social auto-posting, and merchant settings.

## Features
- AI image generation with trend scanning and automatic titles, descriptions, tags, categories, and pricing
- Customer-facing pages: homepage, marketplace, image details, daily AI drops, account with AI chat support
- Admin panel with 3-factor login (email, password, secret code) accessible via a small bottom-left icon
- Trend logs, social auto-post toggles, merchant settings (PayPal email, card number, SMS number)
- Checkout flow (stub) supporting PayPal or card selection and SMS notification simulation
- Sales tracking with charts by day and by method

## Tech Stack
- Node.js, Express, TypeScript
- EJS templates with `ejs-mate` layouts
- `node-cron` for daily generation scheduling

## Quick Start
- Requirements: Node.js v18+ and npm
- Install dependencies: `npm install`
- Development: `npm run dev`
- Build: `npm run build`
- Start (production): `npm start`

## Environment Variables
- Set these in `.env` or in your hosting provider:
  - `ADMIN_EMAIL` admin login email
  - `ADMIN_PASSWORD` admin login password
  - `ADMIN_CODE` admin secret code
  - `SESSION_SECRET` a long random string
  - `PORT` default `3000`

## Routes
- `/` homepage with featured images
- `/marketplace` search, tags, categories, filters, price range
- `/image/:id` image details and “Purchase” button
- `/checkout/:id` checkout with method selection and buyer contact fields
- `/chat` AI chat support
- `/admin-login` admin login (email + password + secret code)
- `/admin` admin panel (requires admin session)
- `/admin/generate` trigger manual daily batch (admin only)
- `/admin/social` social posting toggles (admin only)
- `/admin/settings` merchant settings (admin only)

## Admin Access
- Click the small circular icon at the bottom-left of any page to open `/admin-login`
- Provide `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_CODE`
- Once authenticated, the admin panel shows generation logs, social settings, merchant settings, and sales charts

## Docker
- Build: `docker build -t fluximart .`
- Run: `docker run -e ADMIN_EMAIL=... -e ADMIN_PASSWORD=... -e ADMIN_CODE=... -e SESSION_SECRET=... -p 3000:3000 fluximart`
- Open: `http://localhost:3000`

## Deploy (Render, recommended)
- Push the repo to GitHub
- Create a Render “Web Service” and connect the repo
- Dockerfile is included and auto-detected
- Add environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_CODE`, `SESSION_SECRET`)
- Deploy and visit the public URL

## Payments & SMS (Production)
- Current checkout simulates payments and SMS for demonstration
- For real payments, integrate PayPal Checkout and/or Stripe with secure server-side capture and webhooks
- For SMS, integrate Twilio or Vonage and send a confirmation on successful payment

## Directory Structure
- `src/server.ts` Express app, routes, AI stubs, admin logic, checkout and sales tracking
- `src/views/*` EJS templates for pages and admin panel
- `src/public/styles.css` site styling
- `package.json`, `tsconfig.json` TypeScript and scripts
- `Dockerfile`, `.dockerignore`, `.gitignore` deployment and housekeeping

---

Below is the full code listing for convenience.

## package.json
```json
{
  "name": "fluximart",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "ejs-mate": "^4.0.0",
    "express": "^4.21.1",
    "express-session": "^1.17.3",
    "node-cron": "^3.0.3",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/ejs": "^3.1.5",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.8",
    "@types/node": "^20.11.30",
    "@types/node-cron": "^3.0.8",
    "@types/uuid": "^9.0.7",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.6.3"
  }
}
```

## tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
ENV PORT=3000
EXPOSE 3000
CMD ["npm","start"]
```

## .dockerignore
```text
node_modules
dist
.git
.gitignore
.DS_Store
```

## .gitignore
```text
node_modules/
dist/
.env
.DS_Store
.env.*
*.log
coverage/
```

## src/server.ts
```ts
import express from "express";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import cron from "node-cron";
import { v4 as uuidv4 } from "uuid";
import ejsMate from "ejs-mate";

dotenv.config();

type Image = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  price: number;
  url: string;
  createdAt: Date;
};

type TrendLog = {
  timestamp: Date;
  sources: string[];
  topics: string[];
};

type SocialSettings = {
  instagram: boolean;
  facebook: boolean;
  tiktok: boolean;
  pinterest: boolean;
  twitter: boolean;
};

type Sale = {
  id: string;
  imageId: string;
  price: number;
  method: "paypal" | "card";
  buyerEmail: string;
  phone: string;
  timestamp: Date;
};

type MerchantSettings = {
  paypalEmail: string;
  cardNumber: string;
  smsNumber: string;
};

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change_me_password";
const ADMIN_CODE = process.env.ADMIN_CODE || "00000";
const SESSION_SECRET = process.env.SESSION_SECRET || "fluximart-session";

const images: Image[] = [];
const trendLogs: TrendLog[] = [];
let socialSettings: SocialSettings = {
  instagram: true,
  facebook: true,
  tiktok: true,
  pinterest: true,
  twitter: true,
};
const sales: Sale[] = [];
let merchantSettings: MerchantSettings = {
  paypalEmail: "",
  cardNumber: "",
  smsNumber: "",
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(process.cwd(), "src", "public")));

function pick<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  const r: T[] = [];
  for (let i = 0; i < n && a.length > 0; i++) {
    const idx = Math.floor(Math.random() * a.length);
    r.push(a[idx]);
    a.splice(idx, 1);
  }
  return r;
}

function scanTrends(): string[] {
  const sources = [
    "Google Trends",
    "Instagram",
    "TikTok",
    "Pinterest",
    "Twitter",
    "Reddit",
    "News",
    "Gaming",
    "Tech",
    "Photography",
  ];
  const topicsPool = [
    "minimalist",
    "abstract",
    "wallpapers",
    "nature",
    "city",
    "portrait",
    "macro",
    "cyberpunk",
    "premium",
    "neon",
    "monochrome",
    "aerial",
    "wildlife",
    "architecture",
    "fantasy",
    "space",
    "sunset",
    "bokeh",
    "branding",
    "product",
  ];
  const topics = pick(topicsPool, 6);
  trendLogs.push({ timestamp: new Date(), sources, topics });
  return topics;
}

function generateImageFromTrend(topic: string): Image {
  const id = uuidv4();
  const title = `AI ${topic} ${id.slice(0, 6)}`;
  const description = `High-quality ${topic} image generated by AI.`;
  const tags = [topic, "ai", "trending", "snapstockx", "fluximart"];
  const category = topic;
  const price = Math.floor(Math.random() * 20) + 5;
  const url = `https://picsum.photos/seed/${id}/1200/800`;
  return {
    id,
    title,
    description,
    tags,
    category,
    price,
    url,
    createdAt: new Date(),
  };
}

function autoPost(image: Image): void {
  const caption = `${image.title} ${image.tags.map((t) => `#${t}`).join(" ")}`;
  if (socialSettings.instagram) console.log("Post to Instagram", caption);
  if (socialSettings.facebook) console.log("Post to Facebook", caption);
  if (socialSettings.tiktok) console.log("Post to TikTok", caption);
  if (socialSettings.pinterest) console.log("Post to Pinterest", caption);
  if (socialSettings.twitter) console.log("Post to Twitter", caption);
}

function generateDailyBatch(): Image[] {
  const topics = scanTrends();
  const batch: Image[] = [];
  for (let i = 0; i < 15; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const img = generateImageFromTrend(topic);
    images.unshift(img);
    batch.push(img);
    autoPost(img);
  }
  return batch;
}

function isAuthed(req: express.Request): boolean {
  return Boolean((req.session as any).userEmail);
}

function isAdmin(req: express.Request): boolean {
  return Boolean((req.session as any).isAdmin === true);
}

app.use((req, res, next) => {
  res.locals.authed = isAuthed(req);
  res.locals.admin = isAdmin(req);
  res.locals.brand = { site: "Fluximart", store: "SnapStockX" };
  next();
});

app.get("/", (req, res) => {
  const featured = images.slice(0, 12);
  res.render("home", { featured });
});

app.get("/marketplace", (req, res) => {
  const { q, tag, category, min, max } = req.query as Record<string, string>;
  let list = [...images];
  if (q) list = list.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()));
  if (tag) list = list.filter((i) => i.tags.includes(tag));
  if (category) list = list.filter((i) => i.category === category);
  if (min) list = list.filter((i) => i.price >= Number(min));
  if (max) list = list.filter((i) => i.price <= Number(max));
  res.render("marketplace", { list, q: q || "", tag: tag || "", category: category || "", min: min || "", max: max || "" });
});

app.get("/image/:id", (req, res) => {
  const img = images.find((i) => i.id === req.params.id);
  if (!img) return res.status(404).send("Not found");
  const similar = images.filter((i) => i.category === img.category && i.id !== img.id).slice(0, 8);
  res.render("image", { img, similar });
});

app.get("/checkout/:id", (req, res) => {
  const img = images.find((i) => i.id === req.params.id);
  if (!img) return res.status(404).send("Not found");
  res.render("checkout", { img, merchantSettings });
});

app.get("/daily", (req, res) => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const drops = images.filter((i) => i.createdAt >= start).slice(0, 15);
  res.render("daily", { drops, date: start });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  (req.session as any).userEmail = email;
  return res.redirect("/account");
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/account", (req, res) => {
  if (!isAuthed(req)) return res.redirect("/login");
  res.render("account");
});

app.get("/admin", (req, res) => {
  if (!isAdmin(req)) return res.redirect("/");
  const logs = trendLogs.slice(-10).reverse();
  const latest = images.slice(0, 30);
  const salesRecent = sales.slice(-20).reverse();
  const summary = aggregateSales(sales);
  res.render("admin", { logs, latest, socialSettings, merchantSettings, salesRecent, summary });
});

app.post("/admin/social", (req, res) => {
  if (!isAdmin(req)) return res.status(403).send("Forbidden");
  const { instagram, facebook, tiktok, pinterest, twitter } = req.body;
  socialSettings = {
    instagram: Boolean(instagram),
    facebook: Boolean(facebook),
    tiktok: Boolean(tiktok),
    pinterest: Boolean(pinterest),
    twitter: Boolean(twitter),
  };
  res.redirect("/admin");
});

app.post("/admin/generate", (req, res) => {
  if (!isAdmin(req)) return res.status(403).send("Forbidden");
  generateDailyBatch();
  res.redirect("/admin");
});

app.get("/admin-login", (req, res) => {
  res.render("admin_login");
});

app.post("/admin-login", (req, res) => {
  const { email, password, code } = req.body as Record<string, string>;
  const e = String(email || "").trim().toLowerCase();
  const p = String(password || "").trim();
  const c = String(code || "").trim();
  if (e === ADMIN_EMAIL && p === ADMIN_PASSWORD && c === ADMIN_CODE) {
    (req.session as any).isAdmin = true;
    return res.redirect("/admin");
  }
  return res.status(401).render("admin_login", { error: "Invalid credentials" });
});

app.post("/admin/settings", (req, res) => {
  if (!isAdmin(req)) return res.status(403).send("Forbidden");
  const { paypalEmail, cardNumber, smsNumber } = req.body as Record<string, string>;
  merchantSettings = {
    paypalEmail: String(paypalEmail || ""),
    cardNumber: String(cardNumber || ""),
    smsNumber: String(smsNumber || ""),
  };
  res.redirect("/admin");
});

app.post("/pay", (req, res) => {
  const { imageId, method, buyerEmail, phone } = req.body as Record<string, string>;
  const img = images.find((i) => i.id === imageId);
  if (!img) return res.status(404).send("Not found");
  const m = method === "paypal" ? "paypal" : "card";
  const sale: Sale = {
    id: uuidv4(),
    imageId: img.id,
    price: img.price,
    method: m,
    buyerEmail: String(buyerEmail || ""),
    phone: String(phone || ""),
    timestamp: new Date(),
  };
  sales.push(sale);
  console.log("SMS", sale.phone, "Paid", sale.price, "method", sale.method);
  return res.render("checkout_success", { img, sale });
});

app.post("/chat", (req, res) => {
  const { message } = req.body as { message: string };
  const m = String(message || "").toLowerCase();
  if (m.includes("refund")) return res.json({ reply: "Refunds are processed within 3-5 days." });
  if (m.includes("download")) return res.json({ reply: "Download links are available on your purchases page." });
  if (m.includes("price")) return res.json({ reply: "Prices vary per image category." });
  return res.json({ reply: "How can I help you today?" });
});

cron.schedule("0 0 * * *", () => {
  generateDailyBatch();
});

if (images.length === 0) {
  generateDailyBatch();
}

app.listen(PORT, () => {
  console.log(`Fluximart running on http://localhost:${PORT}`);
});

function aggregateSales(list: Sale[]) {
  const byDay: Record<string, { total: number; count: number }> = {};
  const byMethod: Record<string, { total: number; count: number }> = {};
  for (const s of list) {
    const d = s.timestamp.toISOString().slice(0, 10);
    byDay[d] = byDay[d] || { total: 0, count: 0 };
    byDay[d].total += s.price;
    byDay[d].count += 1;
    byMethod[s.method] = byMethod[s.method] || { total: 0, count: 0 };
    byMethod[s.method].total += s.price;
    byMethod[s.method].count += 1;
  }
  return { byDay, byMethod };
}
```

## src/views/layout.ejs
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%= brand.site %> • <%= brand.store %></title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="header">
    <div class="container header-inner">
      <a href="/" class="brand"><span class="site"><%= brand.site %></span> <span class="divider">/</span> <span class="store"><%= brand.store %></span></a>
      <nav class="nav">
        <a href="/marketplace">Marketplace</a>
        <a href="/daily">Daily AI Drops</a>
        <% if (!authed) { %>
          <a href="/login" class="button">Sign In</a>
        <% } else { %>
          <% if (admin) { %>
            <a href="/admin" class="button">Admin Panel</a>
          <% } else { %>
            <a href="/account" class="button">Account</a>
          <% } %>
          <form action="/logout" method="post" class="inline">
            <button type="submit">Logout</button>
          </form>
        <% } %>
      </nav>
    </div>
  </header>
  <main class="main container">
    <%- body %>
  </main>
  <footer class="footer">
    <div class="container footer-inner">
      <div>© <%= new Date().getFullYear() %> <%= brand.site %>. All rights reserved.</div>
      <div>Powered by AI</div>
    </div>
  </footer>
  <a href="/admin-login" class="admin-fab" title="Admin"></a>
  </body>
</html>
```

## src/views/home.ejs
```ejs
<% layout('layout') -%>
<section class="hero">
  <h1>Featured Images</h1>
  <p>Premium AI-generated visuals curated daily.</p>
</section>
<section class="grid">
  <% featured.forEach(function(img){ %>
    <a class="card" href="/image/<%= img.id %>">
      <img src="<%= img.url %>" alt="<%= img.title %>" />
      <div class="card-body">
        <div class="card-title"><%= img.title %></div>
        <div class="card-tags"><%= img.tags.join(' • ') %></div>
        <div class="card-price">$<%= img.price %></div>
      </div>
    </a>
  <% }) %>
</section>
```

## src/views/marketplace.ejs
```ejs
<% layout('layout') -%>
<section class="filters">
  <form class="filters-form" method="get">
    <input type="text" name="q" placeholder="Search" value="<%= q %>" />
    <input type="text" name="tag" placeholder="Tag" value="<%= tag %>" />
    <input type="text" name="category" placeholder="Category" value="<%= category %>" />
    <input type="number" name="min" placeholder="Min Price" value="<%= min %>" />
    <input type="number" name="max" placeholder="Max Price" value="<%= max %>" />
    <button type="submit">Apply</button>
  </form>
</section>
<section class="grid">
  <% list.forEach(function(img){ %>
    <a class="card" href="/image/<%= img.id %>">
      <img src="<%= img.url %>" alt="<%= img.title %>" />
      <div class="card-body">
        <div class="card-title"><%= img.title %></div>
        <div class="card-tags"><%= img.tags.join(' • ') %></div>
        <div class="card-price">$<%= img.price %></div>
      </div>
    </a>
  <% }) %>
</section>
```

## src/views/image.ejs
```ejs
<% layout('layout') -%>
<section class="image-detail">
  <div class="image-preview">
    <img src="<%= img.url %>" alt="<%= img.title %>" />
  </div>
  <div class="image-meta">
    <h1><%= img.title %></h1>
    <p><%= img.description %></p>
    <div class="tags"><%= img.tags.join(' • ') %></div>
    <div class="price">$<%= img.price %></div>
    <a class="button" href="/checkout/<%= img.id %>">Purchase</a>
  </div>
</section>
<section class="similar">
  <h2>Similar Images</h2>
  <div class="grid">
    <% similar.forEach(function(s){ %>
      <a class="card" href="/image/<%= s.id %>">
        <img src="<%= s.url %>" alt="<%= s.title %>" />
        <div class="card-body">
          <div class="card-title"><%= s.title %></div>
          <div class="card-tags"><%= s.tags.join(' • ') %></div>
          <div class="card-price">$<%= s.price %></div>
        </div>
      </a>
    <% }) %>
  </div>
</section>
```

## src/views/daily.ejs
```ejs
<% layout('layout') -%>
<section class="hero">
  <h1>Daily AI Drops</h1>
  <p><%= date.toDateString() %></p>
</section>
<section class="grid">
  <% drops.forEach(function(img){ %>
    <a class="card" href="/image/<%= img.id %>">
      <img src="<%= img.url %>" alt="<%= img.title %>" />
      <div class="card-body">
        <div class="card-title"><%= img.title %></div>
        <div class="card-tags"><%= img.tags.join(' • ') %></div>
        <div class="card-price">$<%= img.price %></div>
      </div>
    </a>
  <% }) %>
</section>
```

## src/views/login.ejs
```ejs
<% layout('layout') -%>
<section class="auth">
  <h1>Sign In</h1>
  <form method="post" action="/login" class="auth-form">
    <label>Email</label>
    <input type="email" name="email" placeholder="you@example.com" required />
    <button type="submit" class="button">Continue</button>
  </form>
</section>
```

## src/views/account.ejs
```ejs
<% layout('layout') -%>
<section class="account">
  <h1>Your Account</h1>
  <p>View purchases, favorites, and support.</p>
  <section class="chat">
    <h2>Chat Support</h2>
    <form class="chat-form" method="post" action="/chat" onsubmit="return sendChat(event)">
      <input type="text" name="message" id="chat-input" placeholder="Type a message" />
      <button type="submit" class="button">Send</button>
    </form>
    <div id="chat-reply" class="chat-reply"></div>
  </section>
</section>
<script>
  async function sendChat(e){
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const res = await fetch('/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:input.value})});
    const data = await res.json();
    document.getElementById('chat-reply').textContent = data.reply;
    input.value = '';
    return false;
  }
</script>
```

## src/views/admin.ejs
```ejs
<% layout('layout') -%>
<section class="admin">
  <h1>Admin AI Control Panel</h1>
  <div class="admin-grid">
    <div class="panel">
      <h2>Daily Generation</h2>
      <form method="post" action="/admin/generate">
        <button class="button">Generate Now</button>
      </form>
      <div class="list">
        <% latest.forEach(function(img){ %>
          <div class="row">
            <img src="<%= img.url %>" alt="<%= img.title %>" />
            <div class="meta">
              <div class="title"><%= img.title %></div>
              <div class="tags"><%= img.tags.join(' • ') %></div>
              <div class="price">$<%= img.price %></div>
            </div>
          </div>
        <% }) %>
      </div>
    </div>
    <div class="panel">
      <h2>Trend Monitoring Logs</h2>
      <div class="list">
        <% logs.forEach(function(l){ %>
          <div class="row">
            <div class="meta">
              <div class="title"><%= l.timestamp.toLocaleString() %></div>
              <div class="tags"><%= l.sources.join(' • ') %></div>
              <div class="tags"><%= l.topics.join(' • ') %></div>
            </div>
          </div>
        <% }) %>
      </div>
    </div>
    <div class="panel">
      <h2>Social Auto-Posting</h2>
      <form method="post" action="/admin/social" class="social-form">
        <label><input type="checkbox" name="instagram" <%= socialSettings.instagram ? 'checked' : '' %> /> Instagram</label>
        <label><input type="checkbox" name="facebook" <%= socialSettings.facebook ? 'checked' : '' %> /> Facebook</label>
        <label><input type="checkbox" name="tiktok" <%= socialSettings.tiktok ? 'checked' : '' %> /> TikTok</label>
        <label><input type="checkbox" name="pinterest" <%= socialSettings.pinterest ? 'checked' : '' %> /> Pinterest</label>
        <label><input type="checkbox" name="twitter" <%= socialSettings.twitter ? 'checked' : '' %> /> X/Twitter</label>
        <button class="button">Save</button>
      </form>
    </div>
    <div class="panel">
      <h2>Merchant Settings</h2>
      <form method="post" action="/admin/settings" class="settings-form">
        <label>PayPal Email</label>
        <input type="email" name="paypalEmail" value="<%= merchantSettings.paypalEmail %>" placeholder="your-paypal@example.com" />
        <label>Card Number</label>
        <input type="text" name="cardNumber" value="<%= merchantSettings.cardNumber %>" placeholder="1234 5678 9012 3456" />
        <label>SMS Number</label>
        <input type="tel" name="smsNumber" value="<%= merchantSettings.smsNumber %>" placeholder="+1234567890" />
        <button class="button">Save</button>
      </form>
    </div>
    <div class="panel">
      <h2>Sales Charts</h2>
      <div class="charts">
        <div>
          <h3>By Day</h3>
          <div class="bar-chart">
            <% Object.keys(summary.byDay).sort().forEach(function(day){ %>
              <% const v = summary.byDay[day].total; %>
              <div class="bar-row"><span class="label"><%= day %></span><span class="bar" style="width:<%= Math.min(100, v*4) %>px"></span><span class="value">$<%= v %></span></div>
            <% }) %>
          </div>
        </div>
        <div>
          <h3>By Method</h3>
          <div class="bar-chart">
            <% Object.keys(summary.byMethod).forEach(function(m){ %>
              <% const v = summary.byMethod[m].total; %>
              <div class="bar-row"><span class="label"><%= m %></span><span class="bar" style="width:<%= Math.min(100, v*4) %>px"></span><span class="value">$<%= v %></span></div>
            <% }) %>
          </div>
        </div>
      </div>
      <h3>Recent Sales</h3>
      <div class="list">
        <% salesRecent.forEach(function(s){ %>
          <div class="row">
            <% const i = latest.find(function(x){ return x.id === s.imageId }) %>
            <img src="<%= i ? i.url : '' %>" alt="" />
            <div class="meta">
              <div class="title">$<%= s.price %> • <%= s.method %></div>
              <div class="tags"><%= s.timestamp.toLocaleString() %></div>
            </div>
          </div>
        <% }) %>
      </div>
    </div>
  </div>
</section>
```

## src/views/checkout.ejs
```ejs
<% layout('layout') -%>
<section class="checkout">
  <h1>Checkout</h1>
  <div class="checkout-grid">
    <div class="preview">
      <img src="<%= img.url %>" alt="<%= img.title %>" />
      <div class="title"><%= img.title %></div>
      <div class="price">$<%= img.price %></div>
    </div>
    <div class="pay">
      <form method="post" action="/pay" class="pay-form">
        <input type="hidden" name="imageId" value="<%= img.id %>" />
        <label>Payment Method</label>
        <select name="method">
          <option value="paypal">PayPal</option>
          <option value="card">Credit/Debit Card</option>
        </select>
        <div class="merchant">
          <div>
            <label>Your PayPal (admin)</label>
            <input type="text" value="<%= merchantSettings.paypalEmail %>" placeholder="Admin PayPal (set in Admin > Settings)" readonly />
          </div>
          <div>
            <label>Your Card Number (admin)</label>
            <input type="text" value="<%= merchantSettings.cardNumber %>" placeholder="Admin Card (set in Admin > Settings)" readonly />
          </div>
        </div>
        <label>Buyer Email</label>
        <input type="email" name="buyerEmail" placeholder="you@example.com" required />
        <label>SMS Phone</label>
        <input type="tel" name="phone" placeholder="+1234567890" required />
        <button class="button">Pay $<%= img.price %></button>
      </form>
    </div>
  </div>
}</section>
```

## src/views/checkout_success.ejs
```ejs
<% layout('layout') -%>
<section class="checkout">
  <h1>Payment Successful</h1>
  <p>Thank you. Your payment of $<%= sale.price %> has been recorded.</p>
  <div class="preview">
    <img src="<%= img.url %>" alt="<%= img.title %>" />
    <div class="title"><%= img.title %></div>
  </div>
  <a class="button" href="/image/<%= img.id %>">Back to Image</a>
</section>
```

## src/views/admin_login.ejs
```ejs
<% layout('layout') -%>
<section class="auth">
  <h1>Admin Login</h1>
  <% if (typeof error !== 'undefined') { %>
    <div class="error"><%= error %></div>
  <% } %>
  <form method="post" action="/admin-login" class="auth-form">
    <label>Email</label>
    <input type="email" name="email" placeholder="admin@example.com" required />
    <label>Password</label>
    <input type="password" name="password" placeholder="Password" required />
    <label>Secret Code</label>
    <input type="text" name="code" placeholder="Code" required />
    <button type="submit" class="button">Login</button>
  </form>
</section>
```

## src/views/daily.ejs
```ejs
<% layout('layout') -%>
<section class="hero">
  <h1>Daily AI Drops</h1>
  <p><%= date.toDateString() %></p>
</section>
<section class="grid">
  <% drops.forEach(function(img){ %>
    <a class="card" href="/image/<%= img.id %>">
      <img src="<%= img.url %>" alt="<%= img.title %>" />
      <div class="card-body">
        <div class="card-title"><%= img.title %></div>
        <div class="card-tags"><%= img.tags.join(' • ') %></div>
        <div class="card-price">$<%= img.price %></div>
      </div>
    </a>
  <% }) %>
</section>
```

## src/views/login.ejs
```ejs
<% layout('layout') -%>
<section class="auth">
  <h1>Sign In</h1>
  <form method="post" action="/login" class="auth-form">
    <label>Email</label>
    <input type="email" name="email" placeholder="you@example.com" required />
    <button type="submit" class="button">Continue</button>
  </form>
</section>
```

## src/public/styles.css
```css
* { box-sizing: border-box }
body { margin: 0; font-family: Inter, system-ui, Arial, sans-serif; color: #0b0c0f; background: #ffffff }
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px }
.header { border-bottom: 1px solid #e5e7eb; background: #ffffff }
.header-inner { display: flex; align-items: center; justify-content: space-between; padding: 14px 0 }
.brand { text-decoration: none; font-weight: 600; color: #0b0c0f; font-size: 18px }
.brand .divider { opacity: 0.3; padding: 0 8px }
.nav { display: flex; gap: 12px; align-items: center }
.nav a { color: #0b0c0f; text-decoration: none; padding: 6px 10px; border-radius: 8px }
.nav .button { background: #0b0c0f; color: #fff }
.inline { display: inline-block }
.inline button { background: transparent; border: 1px solid #0b0c0f; padding: 6px 10px; border-radius: 8px }
.main { padding: 24px 0 }
.footer { border-top: 1px solid #e5e7eb; background: #fafafa }
.footer-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; color: #4b5563 }
.hero h1 { margin: 0 0 6px; font-size: 28px }
.hero p { margin: 0 0 20px; color: #4b5563 }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr) } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr } }
.card { display: flex; flex-direction: column; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit; background: #fff }
.card img { width: 100%; height: 200px; object-fit: cover }
.card-body { padding: 12px }
.card-title { font-weight: 600; margin-bottom: 6px }
.card-tags { color: #6b7280; font-size: 14px; margin-bottom: 8px }
.card-price { font-weight: 600 }
.filters-form { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 16px }
.filters-form input { padding: 8px; border: 1px solid #e5e7eb; border-radius: 8px }
.filters-form button { padding: 8px 12px; border-radius: 8px; background: #0b0c0f; color: #fff; border: none }
.image-detail { display: grid; grid-template-columns: 2fr 1fr; gap: 20px }
.image-preview img { width: 100%; border: 1px solid #e5e7eb; border-radius: 12px }
.image-meta h1 { margin: 0 0 10px }
.image-meta .tags { color: #6b7280; margin-bottom: 12px }
.image-meta .price { font-weight: 700; margin-bottom: 12px }
.button { display: inline-block; padding: 10px 14px; border-radius: 10px; background: #0b0c0f; color: #fff; border: none; cursor: pointer }
.auth { max-width: 420px; margin: 0 auto }
.auth-form { display: grid; gap: 8px }
.auth-form input { padding: 10px; border: 1px solid #e5e7eb; border-radius: 10px }
.account .chat { margin-top: 20px }
.chat-form { display: grid; grid-template-columns: 1fr auto; gap: 8px }
.chat-form input { padding: 10px; border: 1px solid #e5e7eb; border-radius: 10px }
.chat-reply { margin-top: 10px; padding: 10px; background: #fafafa; border: 1px solid #e5e7eb; border-radius: 10px }
.admin .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px }
.admin .panel { border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; background: #fff }
.admin .list { display: grid; gap: 10px; max-height: 420px; overflow: auto }
.admin .row { display: grid; grid-template-columns: 80px 1fr; gap: 10px; align-items: center }
.admin .row img { width: 80px; height: 60px; object-fit: cover; border-radius: 8px }
.social-form { display: grid; gap: 8px }
.settings-form { display: grid; gap: 8px }
.charts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px }
.bar-chart { display: grid; gap: 6px }
.bar-row { display: grid; grid-template-columns: 120px 1fr 60px; align-items: center; gap: 8px }
.bar-row .label { color: #6b7280 }
.bar-row .bar { height: 8px; background: #0b0c0f; border-radius: 999px }
.admin-fab { position: fixed; left: 18px; bottom: 18px; width: 40px; height: 40px; background: #0b0c0f; border-radius: 999px; box-shadow: 0 8px 24px rgba(0,0,0,0.18) }
.admin-fab::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle at 50% 45%, #fff 2px, transparent 3px), linear-gradient(transparent, transparent); border-radius: 999px }
```
