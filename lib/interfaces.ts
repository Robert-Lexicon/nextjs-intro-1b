//use interface if more than one/two prop
//this is a bad example since it belongs with a page and nothing else
export interface HeroProps {
  title: string;
  text?: string;
  id?: number;
}

export interface Products {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
