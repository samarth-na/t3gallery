import { mockImages } from "./lib/data";

export default function HomePage() {
	return (
		<main className="">
			hello gallery in work
			<div className="flex flex-wrap">
				{mockImages.map((image) => (
					<div key={image.id} className="w-48">
						<img src={image.url} />
					</div>
				))}
			</div>
		</main>
	);
}
