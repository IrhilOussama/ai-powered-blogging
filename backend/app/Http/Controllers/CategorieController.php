<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Mockery\Undefined;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Categorie::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formData = $request->validate([
            'title' => 'required|min:4|unique:categories'
        ]);

        Categorie::create($formData);

        return $formData;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $myCategorie = Categorie::find($id);
        if ($myCategorie === null) return ['error' => 'no categorie with this id'];
        return $myCategorie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $myCategorie = Categorie::find($id);
        if ($myCategorie === null) return ['error' => 'no categorie with this id'];

        $formData = $request->validate([
            'title' => 'required|min:4|unique:categories'
        ]);
        $myCategorie = $myCategorie->update($formData);
        return $formData;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $myCategorie = Categorie::find($id);
        if ($myCategorie === null) return ['error' => 'no categorie with this id'];
        return $myCategorie->delete();
    }
}
