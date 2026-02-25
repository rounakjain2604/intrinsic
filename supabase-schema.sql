-- =============================================
-- INTRINSIC — Phase 3 Database Schema
-- Run this entire file in Supabase SQL Editor
-- =============================================

-- 1. Users table (synced from Clerk via JIT pattern)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Chapters master list
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER,
  is_free BOOLEAN DEFAULT FALSE,
  price_tier TEXT CHECK (price_tier IN ('free', 'standard', 'premium')),
  price_usd DECIMAL(5,2),
  lemon_product_id TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Purchases table (one row per user per chapter — forever)
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  chapter_id UUID REFERENCES chapters(id),
  lemon_order_id TEXT UNIQUE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

-- 4. Email subscribers (for landing page email capture)
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User progress tracking (Phase 3.5)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  chapter_id UUID REFERENCES chapters(id) NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

-- 6. Auto-update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER chapters_updated_at
  BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- SEED DATA — 8 chapters
-- =============================================

INSERT INTO chapters (slug, title, description, order_index, is_free, price_tier, price_usd, published) VALUES
  ('ethics', 'Ethics and Professional Standards', 'The foundation of everything in CFA — understand the code, standards, and how they apply under exam pressure.', 1, true, 'free', 0.00, true),
  ('quantitative-methods', 'Quantitative Methods', 'Statistical foundations, hypothesis testing, and regression — the quantitative toolkit every analyst needs.', 2, true, 'free', 0.00, true),
  ('economics', 'Economics: Macro and Monetary Policy', 'Interest rates, currency effects, and what central banks actually do to markets.', 3, true, 'free', 0.00, true),
  ('equity-basics', 'Equity Valuation: Concepts and Basic Tools', 'DCF, multiples, and how to think about what a company is actually worth.', 4, true, 'free', 0.00, true),
  ('fixed-income-overview', 'Fixed Income: Overview and Bond Markets', 'Bond pricing, yield measures, and the mechanics of fixed income markets.', 5, true, 'free', 0.00, true),
  ('financial-statement-analysis', 'Financial Statement Analysis', 'Reading between the lines of income statements, balance sheets, and cash flow statements.', 6, false, 'standard', 9.99, true),
  ('derivatives', 'Derivatives: Options, Futures, Swaps', 'How derivatives are priced, used for hedging, and tested on the CFA exam.', 7, false, 'premium', 14.99, true),
  ('alternative-investments', 'Alternative Investments', 'Real estate, hedge funds, private equity, and commodities — the alternative universe.', 8, false, 'premium', 14.99, true);
