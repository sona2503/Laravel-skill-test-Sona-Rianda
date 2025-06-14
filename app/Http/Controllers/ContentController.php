<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use Illuminate\Support\Carbon;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Jalankan update otomatis untuk post yang dijadwalkan
        $update = DB::table('posts')
            ->where('is_draft', 0)
            ->where('is_published', 0)
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', now())
            ->update([
                'is_published' => 1,
                'published_at' => \DB::raw('scheduled_at'),
            ]);


        // Ambil daftar post yang sudah dipublish
        $posts = \DB::table('posts')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name')
            ->where('posts.is_draft', 0)
            ->where('posts.is_published', 1)
            ->orderBy('posts.published_at', 'desc')
            ->paginate(20);

        return Inertia::render("Content/index", [
            'posts' => $posts,
            'update' => $update,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Content/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'is_draft'     => 'required|boolean',
            'scheduled_at' => 'nullable|date|after_or_equal:now',
        ]);

        $isDraft = $request->boolean('is_draft');
        $scheduledAt = $request->input('scheduled_at');

        $isImmediate = !$isDraft && empty($scheduledAt);

        DB::table('posts')->insert([
            'user_id'      => auth()->id(),
            'title'        => $request->title,
            'content'      => $request->content,
            'is_draft'     => $isDraft ? 1 : 0,
            'is_published' => $isImmediate ? 1 : 0,
            'published_at' => $isImmediate ? now() : null,
            'scheduled_at' => $scheduledAt ? date('Y-m-d H:i:s', strtotime($scheduledAt)) : null,
            'created_at'   => now(),
            'updated_at'   => now(),
        ]);

        return redirect()->route('datas.index')->with('success', 'Content successfully added');
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
    public function edit($id, Request $request)
    {
        $post = Post::findOrFail($id);
        $source = $request->query('source', 'datas'); // default 'datas'

        return Inertia::render('Content/edit', [
            'post' => $post,
            'source' => $source,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'is_draft'     => 'required|boolean',
            'scheduled_at' => 'nullable|date|after_or_equal:now',
        ]);

        $isDraft = $request->boolean('is_draft');
        $scheduledAt = $request->input('scheduled_at');
        $isImmediate = !$isDraft && empty($scheduledAt);

        DB::table('posts')
            ->where('id', $id)
            ->update([
                'title'        => $request->title,
                'content'      => $request->content,
                'is_draft'     => $isDraft ? 1 : 0,
                'is_published' => $isImmediate ? 1 : 0,
                'published_at' => $isImmediate ? now() : null,
                'scheduled_at' => $scheduledAt ? date('Y-m-d H:i:s', strtotime($scheduledAt)) : null,
                'updated_at'   => now(),
            ]);

        $source = $request->query('source', 'datas');

        if ($source === 'draf') {
            return redirect()->route('drafs.index')->with('success', 'Draft successfully updated');
        }

        return redirect()->route('datas.index')->with('success', 'Content successfully updated');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::table('posts')->where('id', $id)->delete();

        return redirect()->route('datas.index')->with('success', 'Content successfully deleted');
    }
}
