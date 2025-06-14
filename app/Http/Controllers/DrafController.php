<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DrafController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $posts = DB::table('posts')
        ->join('users', 'posts.user_id', '=', 'users.id')
        ->select('posts.*', 'users.name')
        ->where('posts.is_draft', 1)
        ->orderBy('id', 'desc')
        ->paginate(20);


        return Inertia::render("Draf/index", ['posts' => $posts, 'auth' => ['user' => auth()->user(),],]);
    }

    public function publish(string $id)
    {
      $post = DB::table('posts')->where('id', $id)->first();

    // Optional: Cek apakah user yang sedang login adalah pemilik post
    if (auth()->id() !== $post->user_id) {
        abort(403, 'Unauthorized');
    }

DB::table('posts')->where('id', $id)->update([
    'is_draft' => 0,
    'published_at' => now(),
]);

    return redirect()->back()->with('success', 'The content has been successfully published');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        DB::table('posts')->where('id', $id)->delete();

        return redirect()->route('drafs.index')->with('success', 'Data successfully deleted');
    }
}
