import { useMediaQuery } from "@mui/material";

/**
 * Unified breakpoint hook for the branding page.
 *
 * Uses hardcoded media queries — does NOT depend on or affect
 * the MUI theme breakpoints. Other pages are unaffected.
 *
 * Tiers:
 *   mobile:  < 600px   (phones)
 *   tablet:  600–1199px (tablets / small laptops)
 *   desktop: >= 1200px  (desktops)
 *
 * For MUI `sx` responsive objects, use the default MUI keys:
 *   xs = mobile, sm = tablet (600+), lg = desktop (1200+)
 */
export type Tier = "mobile" | "tablet" | "desktop";

export type BreakpointResult = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Current tier — use for lookup tables: SIZES[tier] */
  tier: Tier;
};

const useBreakpoint = (): BreakpointResult => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isTabletUp = useMediaQuery("(min-width:600px)");

  const isMobile = !isTabletUp;
  const isTablet = isTabletUp && !isDesktop;

  const tier: Tier = isDesktop ? "desktop" : isTablet ? "tablet" : "mobile";

  return { isMobile, isTablet, isDesktop, tier };
};

export default useBreakpoint;
