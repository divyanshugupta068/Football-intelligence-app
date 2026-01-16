/* ================================
   Football Intelligence – Theme
   ================================ */

export const darkTheme = {
  colors: {
    bg: "#0a0a0f",
    bgGradient: "linear-gradient(135deg, #0f172a 0%, #020617 50%, #0a0a0f 100%)",
    surface: "rgba(15, 23, 42, 0.6)",
    surfaceGlass: "rgba(30, 41, 59, 0.4)",
    border: "#1e293b",
    borderLight: "#334155",

    textPrimary: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textMuted: "#64748b",

    accent: "#3b82f6",
    accentHover: "#2563eb",
    accentGradient: "linear-gradient(135deg, #3b82f6, #2563eb)",

    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",

    chartGreen: "#22c55e",
    chartBlue: "#3b82f6",
    chartPurple: "#a78bfa",
    chartPink: "#ec4899",
    chartOrange: "#f97316",

    // League colors
    premierLeague: "#38003c",
    laLiga: "#ee8707",
    bundesliga: "#d20515",
    serieA: "#024494",
    ligue1: "#dae025"
  },

  fonts: {
    main: "'Inter', system-ui, -apple-system, sans-serif"
  },

  sizes: {
    h1: "32px",
    h2: "24px",
    h3: "18px",
    body: "15px",
    small: "13px"
  },

  spacing: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },

  radius: {
    sm: "10px",
    md: "14px",
    lg: "18px",
    pill: "999px"
  },

  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
    md: "0 4px 16px rgba(0, 0, 0, 0.4)",
    lg: "0 8px 32px rgba(0, 0, 0, 0.5)",
    glow: "0 0 20px rgba(59, 130, 246, 0.3)"
  }
};

export const lightTheme = {
  ...darkTheme,
  colors: {
    bg: "#f8fafc",
    surface: "#ffffff",
    border: "#e2e8f0",

    textPrimary: "#020617",
    textSecondary: "#334155",
    textMuted: "#64748b",

    accent: "#2563eb",
    chartGreen: "#16a34a",
    chartBlue: "#2563eb"
  }
};

/* ✅ IMPORTANT: RESTORE theme EXPORT */
export const theme = darkTheme;

/* Theme resolver */
export const getTheme = mode =>
  mode === "light" ? lightTheme : darkTheme;

/* ---------- LAYOUT ---------- */

export const layout = {
  page: {
    width: "100%",
    overflow: "hidden",
    background: theme.colors.bgGradient,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    minHeight: "100vh"
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: theme.spacing.xl,
    height: "100%",
    overflowY: "auto",
    paddingBottom: "90px"
  }
};

/* ---------- CARD ---------- */

export const card = {
  base: {
    background: theme.colors.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.sm,
    transition: "all 0.3s ease"
  },
  elevated: {
    background: theme.colors.surfaceGlass,
    backdropFilter: "blur(20px)",
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.borderLight}`,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.md,
    transition: "all 0.3s ease"
  },
  hover: {
    background: theme.colors.surfaceGlass,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.sm,
    transition: "all 0.3s ease",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows.md,
      borderColor: theme.colors.accent
    }
  }
};

export const text = {
  muted: {
    color: theme.colors.textSecondary,
    fontSize: theme.sizes.body
  },
  gradient: {
    background: "linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 700
  }
};