export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.cartItems = JSON.parse(localStorage.getItem(this.key)) || [];
  }

  init() {
    // ici tu calcules ton total, taxes etc.
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    let subtotal = 0;
    this.cartItems.forEach(item => {
      subtotal += item.FinalPrice;
    });

    const tax = subtotal * 0.1; // exemple taxe 10%
    const shipping = subtotal > 0 ? 20 : 0;
    const orderTotal = subtotal + tax + shipping;

    document.querySelector("#num-items").textContent = this.cartItems.length;
    document.querySelector("#cartTotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
    document.querySelector("#shipping").textContent = `$${shipping.toFixed(2)}`;
    document.querySelector("#orderTotal").textContent = `$${orderTotal.toFixed(2)}`;
  }

  checkout() {
    const form = document.forms["checkout"];

    // validation simple : tous les champs requis doivent être remplis
    if (!form.checkValidity()) {
      alert("⚠️ Merci de remplir tous les champs du formulaire !");
      return;
    }

    // créer un objet commande
    const order = {
      orderDate: new Date(),
      items: this.cartItems,
      customer: {
        fname: form.fname.value,
        lname: form.lname.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
      },
      payment: {
        cardNumber: form.cardNumber.value,
        expiration: form.expiration.value,
        code: form.code.value,
      }
    };

    // éventuellement, envoyer au serveur :
    // await externalServices.checkout(order);

    // vider le panier après commande
    localStorage.removeItem(this.key);

    // ✅ redirection vers success.html
    window.location.href = "../checkout/success.html";
  }
}
