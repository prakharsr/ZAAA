export class RateCard {
    mediaType: 'Air' | 'Print' | 'Electronic' = 'Air';
    adType: 'Text Classified' | 'Display' | 'Display Classified' | 'RJ Mentions' | 'Radio Commercials' | 'Sponsorship Tags' | 'Road Block' | 'VJ Mentions' | 'Banner' | 'Scroll' | 'Commercial' = 'Text Classified';
    rateCardType: 'Regional' | 'Corporate' | 'Local' = 'Regional';
    
    mediaHouseName = "";
    pullOutName = "";
    specPullOutName = "";
    bookingEdition = "";
    
    freqPeriod: 'Daily' | 'Weekly' | 'BiWeekly' | 'Monthly' = 'Daily';
    
    fixSizes: FixSize[] = [];
    schemes: Scheme[] = [];
    premiums: Premium[] = [];
    covered: Covered[] = [];
    remarks: Remark[] = [];

    categories: Category[];
    
    unit: 'Words' | 'Sqcm' | 'Sec' = 'Words';
    position: 'Classified' | 'Back Page' | '1st Page' | 'Jacket' | 'Prime Time' = 'Classified' ;
    hue: "Colored" | "Black & White" = "Colored" ;
    
    minLength = 0;
    minWidth = 0;
    maxLength = 0;
    maxWidth = 0; 
    
    taxIncluded = "";
    taxRate = "";
    validFrom = "";
    validTill ="";
    
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