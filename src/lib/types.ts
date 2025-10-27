type RgbType = `#${string}`;
interface IColor {
  rgb: RgbType;
  id: number;
}
type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type { RgbType, IColor, StatusesType };
