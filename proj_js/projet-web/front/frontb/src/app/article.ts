import { Category } from "./category";

export class Article {
    
    id!: number;
  title!: string;
  content!: string;
  image!: string;
  createdAt!: Date;
  updatedAt!: Date;
  published!: boolean;
  
  userId!: number;
  categories!: Category[];
  comments!: Comment[];
    

}
