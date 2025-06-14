import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react'; // Tambahkan usePage

interface Post {
  id: number;
  title: string;
  content: string;
  name: string;
  user_id: number;
}

interface PaginationProps {
  posts: {
    data: Post[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

interface PageProps {
  flash: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Datas', href: '/datas' },
];

const handleUpload = (id: number) => {
  if (confirm('Are you sure you want to publish this post?')) {
    router.put(route('datas.publish', id));
  }
};

const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this data?')) {
    router.delete(route('drafs.destroy', id));
  }
};

export default function ContentIndex({ posts, auth }: PaginationProps) {
  const { props } = usePage<PageProps>();
  const flashSuccess = props.flash?.success;
  const flashError = props.flash?.error;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Datas" />

      {/* Flash messages */}
      {flashSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {flashSuccess}
        </div>
      )}
      {flashError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {flashError}
        </div>
      )}

      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-xl font-bold text-center absolute left-1/2 transform -translate-x-1/2">
          Drafts
        </h1>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.data.map((post, index) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">
                {index + 1 + (posts.current_page - 1) * 20}
              </td>
              <td className="border px-4 py-2">{post.name}</td>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.content}</td>
              <td className="border px-4 py-2">
                {auth.user.id === post.user_id ? (
                  <>
                    <button
                      onClick={() => handleUpload(post.id)}
                      className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-green-500 mr-2 rounded hover:bg-green-600"
                    >
                      Upload
                    </button>

                    <Link
                      href={route('datas.edit', [post.id]) + '?source=draf'}
                      className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-blue-500 mr-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Denied for you</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        {posts.prev_page_url && (
          <a href={posts.prev_page_url} className="text-sm text-blue-600">
            Previous
          </a>
        )}
        {posts.next_page_url && (
          <a href={posts.next_page_url} className="text-sm text-blue-600 ml-auto">
            Next
          </a>
        )}
      </div>
    </AppLayout>
  );
}
