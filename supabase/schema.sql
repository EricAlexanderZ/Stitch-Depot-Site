-- Run this in Supabase → SQL Editor

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz NOT NULL    DEFAULT now(),
  order_number     text        NOT NULL    UNIQUE,
  customer_name    text        NOT NULL,
  customer_email   text        NOT NULL,
  customer_phone   text,
  hat_style        text        NOT NULL,
  hat_color        text        NOT NULL,
  stitch_type      text        NOT NULL,
  placement        text[]      NOT NULL    DEFAULT '{}',
  quantity         integer     NOT NULL    CHECK (quantity > 0),
  total            numeric(10, 2) NOT NULL,
  per_hat          numeric(10, 2) NOT NULL,
  artwork_urls     text[]      NOT NULL    DEFAULT '{}',
  instructions     text,
  status           text        NOT NULL    DEFAULT 'new'
    CHECK (status IN ('new','proof_sent','proof_approved','in_production','shipped','complete','cancelled')),
  notes            text
);

-- Row-level security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Anon (order submission) can insert
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT TO anon WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email      ON orders(customer_email);

-- Storage bucket for artwork (run in Supabase dashboard → Storage)
-- Create a bucket named "artwork" with public access enabled
