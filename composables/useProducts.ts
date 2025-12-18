export const useProducts = () => {
  // Data dummy awal
  const products = useState("products", () => {
    const initialProducts = [
      {
        id: 1,
        name: "Mousepad Genshin Impact - Raiden Shogun",
        price: 150000,
        fandom: "Genshin Impact",
        image: "https://via.placeholder.com/300?text=Raiden+Shogun",
        category: "Mousepad",
        preOrderEstimate: "7 Hari",
        description: "Mousepad speed type ukuran 40x90cm.",
        variants: {
          "5mm_90x40": true,
          "3mm_90x40": true,
          "3mm_90x30": true,
          "3mm_80x40": true,
          "3mm_80x30": true,
          "3mm_70x30": true,
          "3mm_60x30": true,
        },
      },
      {
        id: 2,
        name: "Mousepad Hololive - Gura",
        price: 165000,
        fandom: "Hololive",
        category: "Mousepad",
        preOrderEstimate: "7 Hari",
        branch: "Hololive EN",
        generation: "Myth",
        image: "https://via.placeholder.com/300?text=Gura",
        description: "Mousepad control type, anti air.",
        variants: {
          "5mm_90x40": false, // Contoh stok habis
          "3mm_90x40": true,
          "3mm_90x30": true,
          "3mm_80x40": true,
          "3mm_80x30": true,
          "3mm_70x30": true,
          "3mm_60x30": true,
        },
      },
      {
        id: 3,
        name: "Mousepad Valorant - Jett",
        price: 120000,
        fandom: "Valorant",
        category: "Mousepad",
        preOrderEstimate: "7 Hari",
        image: "https://via.placeholder.com/300?text=Jett",
        description: "Mousepad standard ukuran 30x80cm.",
        variants: {
          "5mm_90x40": true,
          "3mm_90x40": true,
          "3mm_90x30": true,
          "3mm_80x40": true,
          "3mm_80x30": true,
          "3mm_70x30": true,
          "3mm_60x30": true,
        },
      },
    ];

    // Generate Dummy Hololive Products (20+ items)
    const dummyHololive = [];
    const branches = [
      { name: "Hololive JP", gens: ["Gen 0", "Gen 3", "holoX", "Gamers"] },
      { name: "Hololive EN", gens: ["Myth", "Council", "Advent"] },
      { name: "Hololive ID", gens: ["Gen 1", "Gen 2", "Gen 3"] },
    ];

    let idCounter = 100;
    branches.forEach((b) => {
      b.gens.forEach((g) => {
        for (let i = 1; i <= 3; i++) {
          dummyHololive.push({
            id: idCounter++,
            name: `Mousepad ${b.name} ${g} - Character ${i}`,
            price: 150000 + i * 5000,
            fandom: "Hololive",
            category: "Mousepad",
            preOrderEstimate: "7 Hari",
            branch: b.name,
            generation: g,
            image: `https://via.placeholder.com/300?text=${
              b.name.split(" ")[1]
            }+${g.replace(" ", "+")}+${i}`,
            description: `Edisi spesial ${b.name} ${g} dengan kualitas print high definition.`,
            variants: { "5mm_90x40": true, "3mm_90x40": true },
          });
        }
      });
    });

    return [...initialProducts, ...dummyHololive];
  });

  const addProduct = (item: any) => {
    products.value.push({ ...item, id: Date.now() });
  };

  const removeProduct = (id: number) => {
    products.value = products.value.filter((p) => p.id !== id);
  };

  const updateProduct = (updatedItem: any) => {
    const index = products.value.findIndex((p) => p.id === updatedItem.id);
    if (index !== -1) {
      products.value[index] = updatedItem;
    }
  };

  return { products, addProduct, removeProduct, updateProduct };
};
