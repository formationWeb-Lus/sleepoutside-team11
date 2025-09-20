export default class Alerts {
  constructor(jsonPath, containerSelector) {
    this.jsonPath = jsonPath;
    this.container = document.querySelector(containerSelector);
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      const alerts = await response.json();
      this.render(alerts);
    } catch (error) {
      console.error("Erreur de chargement des alertes :", error);
    }
  }

  render(alerts) {
    if (!this.container) return;

    alerts.forEach(alert => {
      const div = document.createElement("div");
      div.textContent = alert.message;
      div.style.backgroundColor = alert.background;
      div.style.color = "#000";
      div.style.padding = "10px";
      div.style.margin = "5px 0";
      div.style.borderRadius = "5px";
      div.style.fontWeight = "bold";
      this.container.appendChild(div);
    });
  }
}
