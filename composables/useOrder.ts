export const useOrder = () => {
  const order = useState("order", () => ({
    product: null as any,
    variant: "",
    size: "",
    quantity: 1,
    buyer: {
      name: "",
      email: "",
      whatsapp: "",
      province: "",
      city: "",
      district: "",
      postalCode: "",
      address: "",
    },
    paymentMethod: "", // 'transfer' | 'qris'
    expedition: "",
  }));

  return { order };
};
