<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Interfaces\ProductInterface;
use App\Models\Category;
class ProductController extends Controller
{
    public $productRepo;
    public function __construct(ProductInterface $productRepo)
    {
        $this->productRepo = $productRepo;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
     public function index(Request $request)
        {
        $products = $this->productRepo->all();
        $categories = Category::all(); 

            return response()->json(['message' => 'Product Fetched successfully','products'  => $products, 'categories' => $categories]);
        }
    

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         try {
            // Validate request with custom messages
            $validatedData = $request->validate([
                'product_name'    => 'required',
                'cat_id' => 'required',
                'price' => 'required',
                'quantity' => 'required',
            ], [
                'product_name.required'    => 'Email is required',
                'cat_id.required' => 'Category is required',
                'price.required' => 'Price is required',
                'quantity.required' => 'Quantity is required',
            ]);
        } catch (ValidationException $e) {
            // Return JSON response for validation errors
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }

        $this->productRepo->store($request->all());
        return response()->json(['message' => 'Product Added successfully','products'=>$request->all()]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product=$this->productRepo->find($id);
        if(empty($product)){
            return response()->json(['id'=>$id,'message' => 'Product not found']);
        }
        $product = $this->productRepo->find($id);
         return response()->json(['message' => 'Product Fetched successfully','product'=>$product]);
    }
  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id,Request $request, )
    {
        
        $product=$this->productRepo->find($id);
        if(empty($product)){
            return response()->json(['id'=>$id,'message' => 'Product not found']);
        }
        $this->productRepo->update($id,$request->all());
        return response()->json(['message' => 'Product Updated successfully','product'=>$product]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product=$this->productRepo->find($id);
        if(empty($product)){
            return response()->json(['id'=>$id,'message' => 'Product not found']);
        }
        $this->productRepo->destroy($id);
        return response()->json(['message' => 'Product deleted successfully','id'=>$id]);
    }
}
