export class RGBColor {
  public readonly r: number;
  public readonly g: number;
  public readonly b: number;

  public constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public getGrayscale(): number {
    const nr = this.r / 256.0;
    const ng = this.g / 256.0;
    const nb = this.b / 256.0;
    const linear = 0.2126 * nr + 0.7152 * ng + 0.0722 * nb;
    if (linear <= 0.0031308) {
      return 12.92 * linear;
    } else {
      return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
    }
  }

  public toCSS(): string {
    const rs = this.r.toString(16).padStart(2, '0');
    const gs = this.g.toString(16).padStart(2, '0');
    const bs = this.g.toString(16).padStart(2, '0');
    return `#${rs}${gs}${bs}`;
  }
}
