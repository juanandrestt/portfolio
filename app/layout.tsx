import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	title: "Juan Trujillo",
	description: "Juan Trujillo's portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<div className='min-h-screen flex'>
					<aside className='w-1/2 p-8 flex flex-col justify-between'>
						<div>
							<nav className='space-y-1'>
								<Link
									href='/about'
									className='link block text-sm hover:text-gray-600 transition-colors'>
									about
								</Link>
								<Link
									href='/projects'
									className='link block text-sm hover:text-gray-600 transition-colors'>
									projects
								</Link>
								<Link
									href='/contact'
									className='link block text-sm hover:text-gray-600 transition-colors'>
									contact
								</Link>
							</nav>

							<div className='mt-32 ml-4'>
								<Link href='/' className='block'>
									<h1 className='text-6xl text-gray-900'>Juan</h1>
									<h1 className='text-6xl ml-15 -mt-4 text-gray-900'>
										Trujillo
									</h1>
								</Link>
							</div>
						</div>

						<div className='flex space-x-1 text-sm text-gray-600'>
							<Link
								href='/'
								className='link hover:text-gray-900 transition-colors'>
								en
							</Link>
							<span>/</span>
							<Link
								href='/fr'
								className='link hover:text-gray-900 transition-colors'>
								fr
							</Link>
						</div>
					</aside>

					<main className='flex-1'>{children}</main>
				</div>
			</body>
		</html>
	);
}
