import { Injectable } from '@angular/core';

@Injectable()
export class OptionsService {

  constructor() { }

  positions= ['Any Page', 'Front Page', 'Front Inside Page', 'Back Page', 'Back Inside Page',
             'Fixed Page', '2nd Page', '3rd Page', '5th Page', 'Sports','Bussiness','Regional',
             'Entertainment','Automobile','Education','Health','Editorial','World','National',
             'City Page','Appointment','Classified Page','Obituary Page','Matrimonial','Tender/Notice',
             'Right Hand Side','Left Hand Side' ];

  amountToWords(num) {
    if (!num) {
      return "Zero Only";
    }

    let a = [
      '',
      'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
      'Ten ',
      'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    
    let b = [
      '', '',
      'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    
    let c = ['Crore ', 'Lakh ', 'Thousand ', 'Hundred '];
  
    if ((num = num.toString()).length > 9)
      return 'overflow';

    let n : any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    
    if (!n)
      return;
      
    let str = '';

    for (let i = 0; i < 4; ++i) {
      str += (n[i + 1] != 0) ? (a[Number(n[i + 1])] || b[n[i + 1][0]] + ' ' + a[n[i + 1][1]]) + c[i] : '';
    }

    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    
    return str + "Only";
  }

}
