/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_CARD_LIST_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
