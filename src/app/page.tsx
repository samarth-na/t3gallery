import { desc } from "drizzle-orm";
import { db } from "../server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const posts = await db.query.images.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    console.log(posts);

    return (
        <main className="">
            hello gallery in work
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
        </main>
    );
}
