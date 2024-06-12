---
geometry: margin=3cm
---

# API

## Get user plans

#### Request:
```js
GET /users/:id/plans
```

#### Response: 
```js
{
  plans: [
    {
      id,
      created,
      title,
      description,
      start,
      estimated_end,
      total_clients,
      total_orders,
      total_routes
    },
    // ...
  ]
}
```

\pagebreak

## Get full plan

#### Request:
```js
GET /plans/:id
```

#### Response:
```js
{
  routes: [
    {
      vehicle: {
        id,
        name,
        capacity,
        instances
      },
      waypoints: [
        {
          id,
          client: {
            id,
            name,
            address,
            lat,
            lng,
            time_window_start,
            time_window_end      
          }
          orders: [
            {
              id,
              product: {
                id,
                name,
                unit_weight,
                amount_available
              },
              amount_requested
            },
            // ...
          ]
        },
        // ...
      ]
    }
    // ...
  ]
}
```
