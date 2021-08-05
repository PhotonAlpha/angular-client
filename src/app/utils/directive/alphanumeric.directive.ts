import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appAlphaNumeric]' })
export class AlphaNumericDirective {
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ]
  private reg = /^[a-zA-Z0-9]/g
  inputElement!: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if(this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === 'a' && e.ctrlKey === true) ||
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'x' && e.ctrlKey === true) ||
      (e.key === 'a' && e.metaKey === true) ||
      (e.key === 'c' && e.metaKey === true) ||
      (e.key === 'v' && e.metaKey === true) ||
      (e.key === 'x' && e.metaKey === true)){
        return;
    }
    const res = this.isEn(e.key);
    // console.log('res', res)
    if(res === false) {
      // console.log('---', e.key)
      e.stopPropagation();
      e.preventDefault();
    }
  }
  isEn(key: string) {
    return this.reg.test(key);
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.stopPropagation();
    e.preventDefault();
    const pasteInput: string = e.clipboardData
      ?.getData('text/plain').replace(this.reg, '') || ''
    document.execCommand('insertText', false, pasteInput)
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    const pasteInput: string = e.dataTransfer
      ?.getData('text/plain').replace(this.reg, '') || ''
    document.execCommand('insertText', false, pasteInput)
  }
}