import { mockImages } from "./lib/data";
import { db } from "../server/db";



export default async function HomePage() {
    const posts = await db.query.posts.findMany();
    console.log(posts);

	return (
		<main className="">
			hello gallery in work
			<div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.id}>{post.name}</div>
                ))}
				{mockImages.map((image) => (
					<div key={image.id} className="w-48">
						<img src={image.url} />
					</div>
				))}
			</div>
		</main>
	);
}
