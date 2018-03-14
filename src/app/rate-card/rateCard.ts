export class RateCard {
    mediaType = "";
    adType = "";
    rateCardType = "";
    
    mediaHouseName = "";
    pullOutName = "";
    bookingEdition = "";
    
    freqPeriod = "";
    freqRemark = "";
    
    fixSizes: FixSize[] = [];
    schemes: Scheme[] = [];
    premiums: Premium[] = [];
    covered: Covered[] = [];
    remarks: Remark[] = [];
    taxes: Tax[] = [];

    categories: string[];
    
    unit = "";
    position = "";
    hue = "";
    
    minLength = 0;
    minWidth = 0;
    maxLength = 0;
    maxWidth = 0; 

    validFrom: Date;
    validTill: Date;
    
    rate = 0;
    global: boolean;

    id: string;
}

export class FixSize {
    width = 0;
    length = 0;
    amount = 0;
}

export class Scheme {
    paid = 0;
    Free = 0;
    timeLimit = 0;
}

export class Premium {
    premType = "";
    premAmount = 0;
}

export class Covered {
    covMediaHouse = "";
    covEdition = "";
}

export class Remark {
    remark = "";
}

export class Tax {
    included = true;
    rate = 0;
}

export class Category {
    constructor(public name: string, public subcategories: Category[] = []) {}
}