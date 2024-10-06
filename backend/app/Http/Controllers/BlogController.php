<?php

namespace App\Http\Controllers;

use App\Http\Services\UploadImage;
use App\Models\Blog;
use App\Models\Categorie;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->only === null){
            $blogs = Blog::all();
            foreach($blogs as $blog){
                $blog['categorie_title'] = Categorie::find($blog['categorie_id'])->title;
            }
            return $blogs;
        }
        else {
            $titles = Blog::select("title")->get();
            return response()->json($titles);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
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
        // i want to return a response when $blog is not found in the database
        $blog['categorie_title'] = Categorie::find($blog->categorie_id)->title;
        return $blog;

        $blog['categorie_title'] = Categorie::find($blog->categorie_id)->title;
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
