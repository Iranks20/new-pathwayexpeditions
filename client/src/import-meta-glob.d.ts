declare global {
  interface ImportMeta {
    globEager: (pattern: string) => Record<string, { default: string }>;
    glob: (pattern: string) => Record<string, () => Promise<any>>;
  }
}

export {};
