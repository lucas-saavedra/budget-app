<?php

namespace App\Http\Controllers\Api;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::whereBelongsTo(auth()->user())->get();
        return response()->json([
            "success" => true,
            "message" => "Category list",
            "data" => $category
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'type' => [new Enum(CategoryType::class)],
            'parent_category' => 'sometimes:integer'
        ]);

        $user_id = auth()->user()->id;
        $category = Category::create([
            'name' => $request->name,
            'user_id' => $user_id,
            'type' => $request->type,
            'description' => $request->description,
            'parent_category' => $request->parent_category,
        ]);

        $category->save();

        return response()->json([
            "success" => true,
            "message" => "Category successfully created!",
            "data" => $category
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
