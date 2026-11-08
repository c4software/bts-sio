// Les produits de la boutique. Les prix sont en centimes (1290 = 12,90 €).
export const products = [
  { id: "usb64", name: "Clé USB 64 Go", price: 1290 },
  { id: "rj45", name: "Câble RJ45 3 m", price: 490 },
  { id: "souris", name: "Souris sans fil", price: 1990 },
  { id: "clavier", name: "Clavier mécanique", price: 5490 },
  { id: "rpi5", name: "Raspberry Pi 5", price: 8990 },
  { id: "casque", name: "Casque audio", price: 2990 },
];

export function findProduct(id) {
  return products.find((product) => product.id === id);
}
