-- Migration: Add missing theme columns for complete dynamic theming
-- Purpose: Add navbar_settings, cta_settings, card_settings, website_logo_url, fav_icon_url, show_client_site_name
-- Date: 2025-01-XX
-- Phase: Dynamic Theme Migration
-- 
-- IMPORTANT: Run this in Supabase Dashboard → SQL Editor
-- The anon key doesn't have permission for DDL statements

-- Add navbar_settings JSONB column
ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS navbar_settings JSONB DEFAULT NULL;

-- Add cta_settings JSONB column
ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS cta_settings JSONB DEFAULT NULL;

-- Add card_settings JSONB column
ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS card_settings JSONB DEFAULT NULL;

-- Add logo and favicon columns
ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS website_logo_url TEXT DEFAULT NULL;

ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS fav_icon_url TEXT DEFAULT NULL;

ALTER TABLE client_theme_settings
ADD COLUMN IF NOT EXISTS show_client_site_name BOOLEAN DEFAULT true;

-- Add comments for documentation
COMMENT ON COLUMN client_theme_settings.navbar_settings IS 'JSONB settings for header/navigation bar: bg_color, text_color, bg_opacity, height, phone, text, show_icon';
COMMENT ON COLUMN client_theme_settings.cta_settings IS 'JSONB settings for CTA buttons: bg_color, text_color, hover_bg_color, border settings';
COMMENT ON COLUMN client_theme_settings.card_settings IS 'JSONB settings for card styling: background, border, badge colors, text colors';
COMMENT ON COLUMN client_theme_settings.website_logo_url IS 'URL to the agency logo image';
COMMENT ON COLUMN client_theme_settings.fav_icon_url IS 'URL to the favicon';
COMMENT ON COLUMN client_theme_settings.show_client_site_name IS 'Whether to show agency name in header next to logo';

-- Seed theme data for client_id: 2ba68935-b346-44e0-a713-f8f1b582945e
INSERT INTO client_theme_settings (
  client_id,
  color_primary,
  color_primary_foreground,
  color_accent,
  color_accent_foreground,
  color_secondary,
  color_secondary_foreground,
  color_background,
  color_background_alt,
  color_text_primary,
  color_text_body,
  color_text_muted,
  divider_color,
  divider_thickness,
  divider_style,
  font_heading,
  font_body,
  font_accent,
  heading_size_multiplier,
  body_size_multiplier,
  heading_weight,
  body_weight,
  navbar_settings,
  cta_settings,
  card_settings,
  hero_divider_settings,
  location_policies_section_settings,
  popup_settings,
  website_logo_url,
  fav_icon_url,
  show_client_site_name,
  section_overrides
) VALUES (
  '2ba68935-b346-44e0-a713-f8f1b582945e',
  '#364f6b',
  '#FFFFFF',
  '#364f6b',
  '#FFFFFF',
  '#64748b',
  '#FFFFFF',
  '#FFFFFF',
  '#f8fafc',
  '#1e293b',
  '#475569',
  '#94a3b8',
  '#e2e8f0',
  1,
  'solid',
  'Playfair Display',
  'Inter',
  'Caveat',
  1.0,
  1.0,
  '700',
  '400',
  '{"bg_color": "#364f6b", "bg_opacity": 0.9, "height": null, "text_color": "#FFFFFF", "text_hover_color": "#FFFFFF", "agency_name_color": "#FFFFFF", "phone": null, "text": "Call Today", "show_icon": true}'::jsonb,
  '{"bg_color": null, "text_color": null, "hover_bg_color": null, "border_color": null, "border_width": 0, "border_radius": 9999}'::jsonb,
  '{"background": "#FFFFFF", "border": "#e2e8f0", "badge_bg": "#64748b", "badge_text": "#FFFFFF", "badge_opacity": 0.2, "text_primary": "#1e293b", "text_secondary": "#475569"}'::jsonb,
  '{"type": "solid", "badges": [], "badge_bg_color": null, "badge_text_color": null, "badge_icon_color": null, "divider_bg_color": null, "badge_size": "md", "badge_spacing": "normal", "divider_padding": "md"}'::jsonb,
  '{"section_bg_color": null, "badge_bg_color": null, "badge_text_color": null, "heading_color": null, "subheading_color": null, "card_bg_color": null, "card_border_color": null, "card_heading_color": null, "card_body_color": null, "accent_line_color": null, "button_bg_color": null, "button_text_color": null, "link_color": null}'::jsonb,
  '{"bg_color": "#FFFFFF", "overlay_color": "#000000", "overlay_opacity": 0.5, "border": {"color": "#e2e8f0", "width": 1, "radius": 16, "style": "solid"}, "button": {"bg_color": null, "text_color": null, "border_color": null, "border_width": 0, "border_radius": 9999}}'::jsonb,
  '/logo-removebg-preview.png',
  null,
  true,
  '{}'::jsonb
) ON CONFLICT (client_id) DO UPDATE SET
  color_primary = EXCLUDED.color_primary,
  color_primary_foreground = EXCLUDED.color_primary_foreground,
  color_accent = EXCLUDED.color_accent,
  color_accent_foreground = EXCLUDED.color_accent_foreground,
  color_secondary = EXCLUDED.color_secondary,
  color_secondary_foreground = EXCLUDED.color_secondary_foreground,
  color_background = EXCLUDED.color_background,
  color_background_alt = EXCLUDED.color_background_alt,
  color_text_primary = EXCLUDED.color_text_primary,
  color_text_body = EXCLUDED.color_text_body,
  color_text_muted = EXCLUDED.color_text_muted,
  divider_color = EXCLUDED.divider_color,
  divider_thickness = EXCLUDED.divider_thickness,
  divider_style = EXCLUDED.divider_style,
  font_heading = EXCLUDED.font_heading,
  font_body = EXCLUDED.font_body,
  font_accent = EXCLUDED.font_accent,
  heading_size_multiplier = EXCLUDED.heading_size_multiplier,
  body_size_multiplier = EXCLUDED.body_size_multiplier,
  heading_weight = EXCLUDED.heading_weight,
  body_weight = EXCLUDED.body_weight,
  navbar_settings = EXCLUDED.navbar_settings,
  cta_settings = EXCLUDED.cta_settings,
  card_settings = EXCLUDED.card_settings,
  hero_divider_settings = EXCLUDED.hero_divider_settings,
  location_policies_section_settings = EXCLUDED.location_policies_section_settings,
  popup_settings = EXCLUDED.popup_settings,
  website_logo_url = EXCLUDED.website_logo_url,
  fav_icon_url = EXCLUDED.fav_icon_url,
  show_client_site_name = EXCLUDED.show_client_site_name,
  section_overrides = EXCLUDED.section_overrides,
  updated_at = NOW();

