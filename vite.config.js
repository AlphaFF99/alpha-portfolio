plugins: [
  react(),
  runtimeErrorOverlay(),
  ...(process.env.NODE_ENV !== "production" &&
  process.env.REPL_ID !== undefined
    ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer()
        ),
      ]
    : []),
],
