const mockuser = {
  id: 'u0',
  name: 'Benjalact',
  email: 'logistica@benjalact.com',
  depot: {
    id: 'd0',
    lat: -12.022547226140922,
    lng: -76.98634892523226,
    products: [
      // products with unit_weight equal to zero are sold by weight rather than by unit
      // amount: amount of units (or total weight in kg if the product is sold by weight)
      { id: 'p0', name: 'Six-pack de leche entera', unit_weight: 3.2, amount: 10 },
      { id: 'p1', name: 'Queso fresco', unit_weight: 0, amount: 28 },
      { id: 'p2', name: 'Botella de yogurt de 1L', unit_weight: 1, amount: 20 },
      { id: 'p3', name: 'Botella de yogurt de 500ml', unit_weight: 0.5, amount: 30 },
      { id: 'p4', name: 'Botella de yogurt de 250ml', unit_weight: 0.25, amount: 40 },
      { id: 'p5', name: 'Barra de manteca', unit_weight: 0.5, amount: 20 },
      { id: 'p6', name: 'Queso fresco', unit_weight: 0, amount: 30 },
      { id: 'p7', name: 'Queso mantecoso', unit_weight: 0, amount: 24 },
      { id: 'p8', name: 'Queso andino', unit_weight: 0, amount: 23 },
      { id: 'p9', name: 'Bolsa de crema de leche de 1L', unit_weight: 1, amount: 17 },
      { id: 'p10', name: 'Tarro de cremas de leche de 500ml', unit_weight: 0.5, amount: 30 },
      { id: 'p11', name: 'Queso fresco', unit_weight: 0, amount: 28 },
      { id: 'p12', name: 'Botella de yogurt de 1L', unit_weight: 1, amount: 20 },
      { id: 'p13', name: 'Botella de yogurt de 500ml', unit_weight: 0.5, amount: 30 },
      { id: 'p14', name: 'Botella de yogurt de 250ml', unit_weight: 0.25, amount: 40 },
      { id: 'p15', name: 'Barra de manteca', unit_weight: 0.5, amount: 20 },
      { id: 'p16', name: 'Queso fresco', unit_weight: 0, amount: 30 },
      { id: 'p17', name: 'Queso mantecoso', unit_weight: 0, amount: 24 },
      { id: 'p18', name: 'Queso andino', unit_weight: 0, amount: 23 },
      { id: 'p19', name: 'Bolsa de crema de leche de 1L', unit_weight: 1, amount: 17 },
    ]
  },
  vehicles: [
    { id: 'v0', name: 'Camioneta', capacity: 1000, instances: 4 },
    { id: 'v1', name: 'Camión', capacity: 2000, instances: 3 },
    { id: 'v2', name: 'Motocicleta', capacity: 100, instances: 8 },
    { id: 'v3', name: 'Camioneta', capacity: 1000, instances: 4 },
    { id: 'v4', name: 'Camión', capacity: 2000, instances: 3 },
    { id: 'v5', name: 'Motocicleta', capacity: 100, instances: 8 },
    { id: 'v6', name: 'Camioneta', capacity: 1000, instances: 4 },
    { id: 'v7', name: 'Camión', capacity: 2000, instances: 3 },
    { id: 'v8', name: 'Motocicleta', capacity: 100, instances: 8 },
  ],
  plans: [
    {
      id: 'p0',
      name: 'Entrega Lima',
      desc: 'Entrega de productos en Lima Metropolitana',
      total_clients: 10,
      vehicles_used: 3,
      start: '5 de mayo',
      end: '21 de mayo'
    },
    {
      id: 'p1',
      name: 'Encargo provincias',
      desc: 'Entrega de productos en provincias',
      total_clients: 15,
      vehicles_used: 4,
      start: '27 de mayo',
      end: '7 de junio'
    },
    {
      id: 'p2',
      name: 'Entrega por menor',
      desc: 'Entrega de productos por menor',
      total_clients: 20,
      vehicles_used: 6,
      start: '11 de junio',
      end: '24 de junio'
    },
    {
      id: 'p3',
      name: 'Encargo provincias',
      desc: 'Entrega de productos en provincias',
      total_clients: 15,
      vehicles_used: 4,
      start: '27 de mayo',
      end: '7 de junio'
    },
    {
      id: 'p4',
      name: 'Entrega por menor',
      desc: 'Entrega de productos por menor',
      total_clients: 20,
      vehicles_used: 6,
      start: '11 de junio',
      end: '24 de junio'
    },
    {
      id: 'p5',
      name: 'Encargo provincias',
      desc: 'Entrega de productos en provincias',
      total_clients: 15,
      vehicles_used: 4,
      start: '27 de mayo',
      end: '7 de junio'
    },
    {
      id: 'p6',
      name: 'Entrega por menor',
      desc: 'Entrega de productos por menor',
      total_clients: 20,
      vehicles_used: 6,
      start: '11 de junio',
      end: '24 de junio'
    },
  ]
}

export default mockuser