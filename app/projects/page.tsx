import Link from "next/link";
import Image from "next/image";

export default function Projects() {
	const projects = [
		{
			title: "The Infinite Library",
			link: "/projects/the-infinite-library",
			image: "/images/infinite-library.png",
		},
	];

	return (
		<main className='min-h-screen flex flex-col justify-center py-2 gap-2'>
			{projects.map((project) => (
				<Link key={project.title} href={project.link}>
					<Image
						src={project.image}
						alt={project.title}
						width={500}
						height={300}
					/>
				</Link>
			))}
		</main>
	);
}
