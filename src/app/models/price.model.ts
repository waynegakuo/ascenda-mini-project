export interface Price {
  id: number;
  price: number;
  competitors?: {}
}

interface Competitors <T> {
  data: {
    type: string;
    attributes: T;
  }
}
