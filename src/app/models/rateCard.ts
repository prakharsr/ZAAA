export class RateCard {
    mediaType = "";
    adType = "";
    rateCardType = "";
    
    mediaHouseName = "";
    pullOutName = "";
    specPullOutName = "";
    bookingEdition = "";
    
    freqPeriod = "";
    freqRemark = "";
    
    fixSizes: FixSize[] = [];
    schemes: Scheme[] = [];
    premiums: Premium[] = [];
    covered: Covered[] = [];
    remarks: Remark[] = [];

    categories: string[];
    
    unit = "";
    position = "";
    hue: "";
    
    minLength = 0;
    minWidth = 0;
    maxLength = 0;
    maxWidth = 0; 
    
    taxIncluded = "";
    taxRate = "";
    validFrom = "";
    validTill = "";
    
    rate = 0;
}

export class FixSize {
    width = "";
    length = "";
    amount = 0;
}

export class Scheme {
    paid = "";
    Free = "";
    timeLimit = "";
}

export class Premium {
    premType = "";
    premAmount = "";
}

export class Covered {
    covMediaHouse = "";
    covEdition = "";
}

export class Remark {
    remark = "";
}

export class Category {
    constructor(public name: string, public subcategories: Category[] = []) {}
}