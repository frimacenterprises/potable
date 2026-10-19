
export async function sendTransactionalSMS(phone: string, message: string){
  // Beem Africa webhook ready - replace with real call
  console.log(`[SMS] to ${phone}: ${message}`);
  // await fetch("https://apisms.beem.africa/v1/send", {method:"POST", body: JSON.stringify({source_addr:"POTABLE", dest_addr:phone, message})})
  return true;
}

export const SMS_TEMPLATES = {
  DISPATCHED: (id:string) => `Potable: Order #${id.slice(0,6)} dispatched. Track live in app.`,
  ARRIVED: (id:string) => `Potable: Your order #${id.slice(0,6)} has arrived at your pin. Karibu!`,
  FEEDBACK: (id:string) => `Potable: How was delivery #${id.slice(0,6)}? Rate us to earn 500 TZS off next.`,
}
