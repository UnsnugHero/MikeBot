import {
  boldText,
  italicizeText,
  singleLineCode,
  strikethroughText,
  underlineText,
} from './helpers';

export class MessageBuilder {
  // this will hold each line of the message and in the end will be joined by newlines
  private _message = [];

  // these methods say 'line' but the text will spill
  //into multiple lines if text is long enough

  public addLine(text: string): void {
    this._message.push(text);
  }

  public addBoldLine(text: string): void {
    this._message.push(boldText(text));
  }

  public addItalic(text: string): void {
    this._message.push(italicizeText(text));
  }

  public addUnderlinedLine(text: string): void {
    this._message.push(underlineText(text));
  }

  public addStrikethroughLine(text: string): void {
    this._message.push(strikethroughText(text));
  }

  public addSingleLineCodeBlock(text: string): void {
    this._message.push(singleLineCode(text));
  }

  public addNewLine(): void {
    this._message.push('\n');
  }

  public getMessage(): string {
    // using reduce to skip over the newlines
    return this._message.reduce((accum: string, currValue: string) => {
      if (currValue !== '\n') {
        return accum + currValue + '\n';
      }
      return accum + currValue;
    }, '');
  }

  public clear(): void {
    this._message = [];
  }
}
