import { router, useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Datas', href: '/datas' },
    { title: 'Tambah Data', href: '/datas/create' },
];

export default function CreatePost() {
    const form = useForm({
        title: '',
        content: '',
        scheduled_at: '', // ✅ Tambahkan properti ini
    });

    const handleSubmit = (e: React.FormEvent, draftValue: number) => {
        e.preventDefault();

        router.post('/datas', {
            ...form.data,
            is_draft: draftValue, // 0 = langsung publish, 1 = draft
        }, {
            preserveScroll: true,
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Post" />

            <h1 className="text-xl font-bold mb-4">Add Data Content</h1>

            <div className="container mx-auto px-4">
                <form className="space-y-4 max-w-xl">

                    <div>
                        <label className="block text-sm font-medium mb-1">Schedule (optional):</label>
                        <input
                            type="datetime-local"
                            name="scheduled_at"
                            value={form.data.scheduled_at}
                            onChange={e => form.setData('scheduled_at', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {form.errors.scheduled_at && (
                            <div className="text-red-500 text-sm mt-1">{form.errors.scheduled_at}</div>
                        )}
                    </div>

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
                            onClick={(e) => handleSubmit(e, 0)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            disabled={form.processing}
                            onClick={(e) => handleSubmit(e, 1)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Save as Draft
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
