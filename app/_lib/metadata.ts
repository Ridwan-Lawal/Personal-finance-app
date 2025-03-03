export interface Metadata {
  title:
    | {
        template: string;
        default: string;
      }
    | string;
  description?: string;
}
