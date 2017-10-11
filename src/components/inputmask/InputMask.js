import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DomHandler from '../utils/DomHandler';
import { InputText } from '../inputtext/InputText';

export class InputMask extends Component {

    static defaultProps = {
        id: null,
        type: 'text',
        mask: null,
        slotChar: '_',
        autoClear: true,
        unmask: false,
        style: null,
        className: null,
        placeholder: null,
        size: null,
        maxlength: null,
        tabindex: null,
        disabled: false,
        readonly: false,
        name: null,
        onComplete: null,
        onClick: null,
    }

    static propsTypes = {
        id: PropTypes.string,
        type: PropTypes.string,
        mask: PropTypes.string,
        slotChar: PropTypes.string,
        autoClear: PropTypes.bool,
        unmask: PropTypes.bool,
        style: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.number,
        maxlength: PropTypes.number,
        tabindex: PropTypes.number,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        name: PropTypes.string,
        onComplete: PropTypes.func,
        onClick: PropTypes.func,
    }

    caret(first, last) {
        let range, begin, end;

        if (!this.input.offsetParent || this.input !== document.activeElement) {
            return;
        }

        if (typeof first === 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.input.setSelectionRange) {
                this.input.setSelectionRange(begin, end);
            }
            else if (this.input['createTextRange']) {
                range = this.input['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.input.setSelectionRange) {
                begin = this.input.selectionStart;
                end = this.input.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }

            return { begin: begin, end: end };
        }
    }

    isCompleted() {
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }

        return true;
    }

    getPlaceholder(i) {
        if (i < this.props.slotChar.length) {
            return this.props.slotChar.charAt(i);
        }
        return this.props.slotChar.charAt(0);
    }

    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }

    shiftL(begin, end) {
        let i, j;

        if (begin < 0) {
            return;
        }

        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                } else {
                    break;
                }

                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }

    shiftR(pos) {
        let i, c, j, t;

        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                } else {
                    break;
                }
            }
        }
    }

    handleAndroidInput(e) {
        var curVal = this.input.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            this.caret(pos.begin, pos.begin);
        } else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;

            this.caret(pos.begin, pos.begin);
        }

        if (this.props.onComplete && this.isCompleted()) {
            this.props.onComplete({
                originalEvent: e
            })
        }
    }

    onBlur(e) {
        this.focus = false;
        this.checkVal();
        this.updateModel(e);
        this.updateFilledState();

        if (this.input.value !== this.focusText) {
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.input.dispatchEvent(event);
        }
    }

    onKeyDown(e) {
        if (this.props.readonly) {
            return;
        }

        let k = e.which || e.keyCode,
            pos,
            begin,
            end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.input.value;

        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;


            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }

            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.updateModel(e);

            e.preventDefault();
        } else if (k === 13) { // enter
            this.onBlur(e);
            this.updateModel(e);
        } else if (k === 27) { // escape
            this.input.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }

    onKeyPress(e) {
        if (this.props.readonly) {
            return;
        }

        var k = e.which || e.keyCode,
            pos = this.caret(),
            p,
            c,
            next,
            completed;

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {//Ignore
            return;
        } else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }

            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);

                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);

                    if (/android/i.test(DomHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = function () {
                            this.caret.bind(this, next)();
                        };

                        setTimeout(proxy, 0);
                    } else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                }
            }
            e.preventDefault();
        }

        this.updateModel(e);

        if (this.props.onComplete && completed) {
            this.props.onComplete({
                originalEvent: e
            })
        }
    }

    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }

    writeBuffer() {
        this.input.value = this.buffer.join('');
    }

    checkVal(allow) {
        //try to place characters where they belong
        let test = this.input.value,
            lastMatch = -1,
            i,
            c,
            pos;

        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            } else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        } else if (lastMatch + 1 < this.partialPosition) {
            if (this.props.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.input.value) this.input.value = '';
                this.clearBuffer(0, this.len);
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            this.input.value = this.input.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }

    onFocus(event) {
        if (this.props.readonly) {
            return;
        }

        this.focus = true;

        clearTimeout(this.caretTimeoutId);
        let pos;

        this.focusText = this.input.value;

        pos = this.checkVal();

        this.caretTimeoutId = setTimeout(() => {
            if (this.input !== document.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos === this.props.mask.replace("?", "").length) {
                this.caret(0, pos);
            } else {
                this.caret(pos);
            }
            this.updateFilledState();
        }, 10);
    }

    onInput(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
    }

    handleInputChange(event) {
        if (this.props.readonly) {
            return;
        }

        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.props.onComplete && this.isCompleted()) {
                this.props.onComplete({
                    originalEvent: event
                })
            }
        }, 0);
    }

  onClick(e) {
    if(this.props.onClick) {
      this.props.onClick();
    } else {
      e.stopPropagation();
    }
  }

    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c !== this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }

        return unmaskedBuffer.join('');
    }

    updateModel(e) {
        if (this.props.onChange) {
            var val = this.props.unmask ? this.getUnmaskedValue() : e.target.value;
            this.props.onChange({
                originalEvent: e,
                value: (this.defaultBuffer !== val) ? val : ''
            })
        }
    }

    updateFilledState() {
        this.filled = this.input && this.input.value !== '';
    }

    componentWillMount() {
        this.tests = [];
        this.partialPosition = this.props.mask.length;
        this.len = this.props.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        };

        let ua = DomHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);

        let maskTokens = this.props.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c === '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }

        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c !== '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');        
    }

    componentDidMount() {
        var _this = this;
        this.value = this.props.value;

        if (this.input) {
            if (this.value === undefined || this.value === null) {
                this.input.value = '';
            }
            else {
                this.input.value = this.value;
                this.checkVal();
            }

            setTimeout(() => {
                _this.writeBuffer();
                _this.checkVal();
            }, 10);

            this.focusText = this.input.value;
        }
        
        this.updateFilledState();
    }

    render() {
        return (
            <InputText id={this.props.id} ref={(el) => this.input = ReactDOM.findDOMNode(el)} type={this.props.type} name={this.props.name} style={this.props.style} className={this.props.className} placeholder={this.props.placeholder}
                size={this.props.size} maxLength={this.props.maxlength} tabIndex={this.props.tabindex} disabled={this.props.disabled} readOnly={this.props.readonly}
                onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)} onKeyPress={this.onKeyPress.bind(this)}
                onInput={this.onInput.bind(this)} onPaste={this.handleInputChange.bind(this)} onClick={this.handleInputChange.bind(this)} />
        );
    }

}