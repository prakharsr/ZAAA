import { PaymentReceipt } from "./payment-receipt";
import { ReceiptsApiService } from "./receipts-api.service";
import { NotificationService, DialogService } from "../services";

export function generate(receipt: PaymentReceipt,
  api: ReceiptsApiService,
  notifications: NotificationService,
  callback?) {
  
  api.generate(receipt).subscribe(data => {
    if (data.msg) {
      notifications.show(data.msg);
    }
    else {
      console.log(data);
      
      let blob = new Blob([data], { type: 'application/pdf' });
      let url = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = 'receipt.pdf';
      a.href = url;
      a.click();

      if (callback) {
        callback();
      }
    }
  });
}

export function sendMsg(receipt: PaymentReceipt,
  api: ReceiptsApiService,
  notifications: NotificationService,
  dialog: DialogService,
  callback?) {

  dialog.getMailingDetails().subscribe(mailingDetails => {
    if (mailingDetails) {
      api.sendMail(receipt, mailingDetails).subscribe(data => {
        if (data.success) {
          notifications.show("Sent Successfully");

          if (callback) {
            callback();
          }
        }
        else {
          console.log(data);

          notifications.show(data.msg);
        }
      });
    }
  });
}

export function cancel(receipt: PaymentReceipt,
  api: ReceiptsApiService,
  notifications: NotificationService,
  dialog: DialogService,) {

  dialog.showYesNo("Confirm Cancellation", "Do you want to cancel this Receipt? This cannot be undone.").subscribe(confirm => {
    if (confirm) {
      api.cancel(receipt).subscribe(data => {
        if (data.success) {
          notifications.show('Cancelled');
        }
        else {
          console.log(data);

          notifications.show(data.msg);
        }
      });
    }
  });
}