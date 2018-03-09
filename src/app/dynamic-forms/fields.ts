export class FieldBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    controlType: string;
}

export class TextField<T> extends FieldBase<T> {
    controlType = 'textbox';
    type: string;

    constructor(key: string, label: string, value: T, required: boolean = false, type: 'text' | 'date' | 'email' | 'number' = 'text') {
        super();

        this.key = key;
        this.label = label;
        this.value = value;
        this.required = required;
        this.type = type;
    }
}

export class DropdownField<T> extends FieldBase<T> {
    controlType = 'dropdown';
    options: { key: string, value: T }[] = [];
}

export class CheckField extends FieldBase<boolean> {
    controlType = 'checkbox';
}