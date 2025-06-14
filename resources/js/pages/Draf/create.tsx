import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Datas', href: '/datas' },
    { title: 'Tambah Data', href: '/datas/create' },
];

export default function CreatePost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        is_draft: 0, // default: publish
    });

    const handleSubmit = (isDraft: boolean) => (e: React.FormEvent) => {
        e.preventDefault();
        setData('is_draft', isDraft ? 1 : 0);
        post('/datas');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Post" />

            <h1 className="text-xl font-bold mb-4">Tambah Data Post</h1>

            <form onSubmit={handleSubmit(false)} className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.title && (
                        <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    ></textarea>
                    {errors.content && (
                        <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit(false)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Simpan
                    </button>

                    <button
                        type="button"
                        disabled={processing}
                        onClick={handleSubmit(true)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Simpan sebagai Draft
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
