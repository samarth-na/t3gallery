// import { desc } from "drizzle-orm";
import { Show, SignInButton } from '@clerk/nextjs';
import { db } from '../server/db';
// import { useAuth } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

async function Images() {
    const posts = await db.query.images.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    return (
        <div className="flex flex-wrap place-items-center justify-center gap-2 text-center">
            {[...posts, ...posts].map((image) => (
                <div key={image.id} className="flex w-48 flex-col bg-green-50">
                    <img src={image.url} />
                    <div>{image.name}</div>
                </div>
            ))}
        </div>
    );
}

export default async function HomePage() {
    return (
        <main className="mt-4 flex flex-col items-center justify-center gap-4 text-center">
            <div>hello gallery in work</div>
            <Show when="signed-in" fallback={<SignInButton />}>
                <Images />
            </Show>
        </main>
    );
}
