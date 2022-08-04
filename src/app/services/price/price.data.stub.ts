import {Price} from "../../models/price.model";

export const PRICE_DATA_SUB: Price[] = [
  {
    id: 1,
    price: 120,
    competitors: {
      "Booking.com": 125,
      "Hotels.com": 121,
      "Expedia": 120,
      "getaroom": 140,
      "AMOMA.com": 132.77
    },
    taxes_and_fees: {
      "tax": 92,
      "hotel_fees": 115
    }
  },
  {
    id: 2,
    price: 100,
  },
  {
    id: 3,
    price: 200,
    taxes_and_fees: {
      "tax": 100,
      "hotel_fees": 20
    }
  }
]
