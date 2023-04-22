export class ToggleFilter {
  static readonly type = '[Filter] Toggle Filter';
  constructor(public name: string, public category: string) {}
}
