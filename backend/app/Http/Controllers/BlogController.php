<?php

namespace App\Http\Controllers;

use App\Http\Services\UploadImage;
use App\Models\Blog;
use App\Models\Categorie;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::all();
        foreach($blogs as $blog){
            $blog['categorie_title'] = Categorie::find($blog['categorie_id'])->title;
        }
        return $blogs;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formData = $request->validate([
            'title' => 'required|min:6|max:50|unique:blogs',
            'description' => 'required|min:20',
            'categorie_id' => 'required',
            'image' => ''
        ]);
        UploadImage::upload($request, $formData, true);
        Blog::create($formData);
        return $formData;
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return $blog; 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $formData = $request->validate([
            'title' => 'required|min:4|unique:blogs',
            'description' => 'required|min:20',
            'categorie_id' => 'required'
        ]);
        $blog->update($formData);
        return $blog;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        return $blog->delete();
    }
}
