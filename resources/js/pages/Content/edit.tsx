import { useForm, usePage } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface PageProps {
    post: any;
    source: string;
}

export default function EditPost({ post, source }: PageProps) {
    const form = useForm({
        title: post.title || '',
        content: post.content || '',
        is_draft: post.is_draft || 0,
    });

    const handleSubmit = (e: React.FormEvent, draftValue: number) => {
        e.preventDefault();
        form.setData('is_draft', draftValue);

        form.put(`/datas/${post.id}?source=${source}`, {
            preserveScroll: true,
        });

    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: source === 'draf' ? 'Draf' : 'Datas', href: `/${source}` },
        { title: 'Edit Data', href: '#' },
    ];

    const backRoute = route(source === 'draf' ? 'drafs.index' : 'datas.index');
    const titleHeader = source === 'draf' ? 'Edit Data Draf' : 'Edit Data Post';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titleHeader} />
            <h1 className="text-xl font-bold mb-4">{titleHeader}</h1>

            <div className="container mx-auto px-4">
                            <form className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={form.data.title}
                        onChange={(e) => form.setData('title', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {form.errors.title && (
                        <div className="text-red-500 text-sm mt-1">{form.errors.title}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={form.data.content}
                        onChange={(e) => form.setData('content', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    ></textarea>
                    {form.errors.content && (
                        <div className="text-red-500 text-sm mt-1">{form.errors.content}</div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        disabled={form.processing}
                        onClick={(e) => handleSubmit(e, form.data.is_draft)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>

                    <Link
                        href={backRoute}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back
                    </Link>
                </div>
            </form>

            </div>


        </AppLayout>
    );
}
