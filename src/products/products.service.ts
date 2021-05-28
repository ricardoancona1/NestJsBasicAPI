import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
    products: Product[] = [];
    productID = 0
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) { }
    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title, description: desc, price })
        const result = await newProduct.save()
        return result.id
    }

    async getProducts() {
        const products = await this.productModel.find().exec()
        return products as Product[]
    }
    async getOneProduct(productID): Promise<any> {
        let product;
        try {
            product = await this.productModel.findById(productID).exec()
        } catch (error) {
            throw new NotFoundException('Product not found')
        }
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        return product
    }
   async  updateProduct(productID: number, title: string, description: string, price: number) {
        const updatedProduct = await this.getOneProduct(productID)
        if (title) {
            updatedProduct.title = title;
          }
          if (description) {
            updatedProduct.description = description;
          }
          if (price) {
            updatedProduct.price = price;
          }
          updatedProduct.save();
          return "successfully updated"
    }
   async deleteProduct(productID) {
        const result = await this.productModel.deleteOne({_id: productID}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find product.');
        }else{
            return "successfully deleted"
        }
    }
}