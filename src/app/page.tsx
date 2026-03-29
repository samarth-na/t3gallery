// import { desc } from "drizzle-orm";
import { Show, SignInButton } from '@clerk/nextjs';
import { db } from '../server/db';
import { useAuth } from '@clerk/nextjs';

export const dynamic = 'force-dynamic';

async function Images() {
    const posts = await db.query.images.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    return (
        <div className="flex flex-wrap">
            {[...posts, ...posts].map((image) => (
                <div
                    key={image.id}
                    className="w-48 flex flex-col m-2 bg-green-50"
                >
                    <img src={image.url} />
                    <div>{image.name}</div>
                </div>
            ))}
        </div>
    );
}

export default async function HomePage() {
    return (
        <main className="">
            <div>hello gallery in work</div>
            <Show when="signed-in" fallback={<SignInButton />}>
                <Images />
            </Show>
        </main>
    );
}
