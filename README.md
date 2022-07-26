# pc-products-store

A searchable products store with product details

## FrontEnd

### React v18

- `cd client`
- Typescript
- useState, useEffect, react-dom hooks
  - I would have use Suspense for loading state
  - I would also use redux to maintain global state to better implement a cart and checkout feature (add items to cart global store, persist item count on header)
- StyledComponents CSS in JS styling
- Responsive mobile/tablet/desktop design
- react testing library unit tests
- routes
- Search products by title text search and/or category dropdown from header including home page link
- Product List page displays results
- fetch AJAX call to NestJS backend for product results

## BackEnd

### NestJS

- `cd server`
- My first time using NestJS. I like the module controller service model.
  - I think seperating service from controller helps to create seperate layers for endpoint gateway, data fetching and data processing.
  - I would like to further expand on best practices and understand how to build a scalable API
- I would like to implement a swagger doc API and joi schema validation to improve dev experience.
- DTO and Pipes also seem like an extremely useful feature of NestJS to better define data schemas as I researched but however I didn't get a chance to actually implement
