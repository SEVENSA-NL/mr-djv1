declare module '@vitejs/plugin-react' {
  const plugin: any;
  export default plugin;
}

declare module '@testing-library/react' {
  export const cleanup: () => void;
}

declare module '@testing-library/jest-dom/vitest' {
  const matchers: any;
  export default matchers;
}

