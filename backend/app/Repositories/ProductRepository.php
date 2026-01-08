<?php

namespace App\Repositories;
use App\Models\Product;
use DB;
use App\Repositories\Interfaces\ProductInterface;
class ProductRepository implements ProductInterface{
    protected $model;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }
    public function all(){
       return $products = DB::table('products')
        ->join('categories', 'products.cat_id', '=', 'categories.id')
        ->select('products.*', 'categories.id as cat_id','categories.cat_name as category_name')
        ->orderBy('id','desc')
        ->get();
    }
    public function store(array $data){
        return $this->product->create($data);
    }
    public function find($id){
        return $this->product->find($id);
    }
    public function update($id, array $data){
        return $this->product->find($id)->update($data);
    }
    public function destroy($id){
        return $this->product->find($id)->delete();
    }
}