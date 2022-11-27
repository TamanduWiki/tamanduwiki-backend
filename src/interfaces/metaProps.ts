export interface MetaProps {
  page: number;
  per: number;
  total: number;
}

export type WithMetaProps<T> = T & { meta: MetaProps };
