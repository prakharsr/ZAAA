export class RateCard {
    mediaType = "";
    adType = "";
    AdTime = "";
    rateCardType = "";
    
    mediaHouseName = "";
    pullOutName = "";
    bookingEdition = "";
    
    fixSizes: FixSize[] = [];
    schemes: Scheme[] = [];
    covered: Covered[] = [];
    remarks: Remark[] = [];
    taxes: Tax[] = [];

    categories: string[];
    
    unit = "";
    position = "";
    hue = "";
    
    minLength = 0;
    minWidth = 0;
    maxLength = 100;
    maxWidth = 100;

    validFrom: Date;
    validTill: Date;
    
    rate = 0;
    global: boolean;

    AdWordsMax = 0;

    PremiumCustom = {
        PremiumType: "",
        Amount: 0,
        Percentage: false
    };

    PremiumBox = 0;
    PremiumBaseColour = 0;
    PremiumCheckMark = 0;
    PremiumEmailId = 0;
    PremiumWebsite = 0;
    PremiumExtraWords = 0;

    id: string;
}

export class FixSize {
    width = 0;
    length = 0;
    amount = 0;
}

export class Scheme {
    paid = 1;
    Free = 0;
    timeLimit = 0;
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
    constructor(public name: string, public subcategories: Category[] = []) {
        subcategories.forEach(elememt => elememt.parent = this);
    }

    parent: Category;
}