import { Controller, Post, Body, Get, Param, Patch,Delete } from '@nestjs/common';
import { title } from 'process';
import { ProductsService } from './products.service'
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }
    @Post()
    async addProduct(@Body() body: {
        title: string,
        description: string,
        price: number
    }) {
        const generatedID = await this.productsService.insertProduct(body.title, body.description, body.price);
        return generatedID
    }
    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts()
        return products
    }
    @Get(':id')
    getOneProduct(@Param('id') productID) {
        const  product = this.productsService.getOneProduct(productID);
        return product
    }
    @Patch(':id')
    updateProduct(@Param('id') productID,@Body() body: {
        title: string,
        description: string,
        price: number
    }){
        return this.productsService.updateProduct(productID,body.title, body.description, body.price)
    }
    @Delete(':id')
    deleteProduct(@Param('id') productID){
        return this.productsService.deleteProduct(productID)
    }
}