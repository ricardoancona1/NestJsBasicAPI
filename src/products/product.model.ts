import * as mongoose from 'mongoose'
export const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
})
export interface Product {
    id: number,
    title: string,
    description: string,
    price: number
};

