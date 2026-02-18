import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

/*
 * Per-image layout configs — mobile-first, with sm: overrides for desktop.
 * Index 0 = center hero image; 1-6 = surrounding images.
 */
const imageStyles: string[] = [
	/* 0 – centre */
	'h-[30vh] w-[70vw] sm:h-[25vh] sm:w-[25vw]',
	/* 1 – top-right */
	'-top-[18vh] left-[5vw] h-[20vh] w-[40vw] sm:-top-[30vh] sm:left-[5vw] sm:h-[30vh] sm:w-[35vw]',
	/* 2 – top-left */
	'-top-[8vh] -left-[18vw] h-[22vh] w-[35vw] sm:-top-[10vh] sm:-left-[25vw] sm:h-[45vh] sm:w-[20vw]',
	/* 3 – right */
	'left-[18vw] h-[18vh] w-[35vw] sm:left-[27.5vw] sm:h-[25vh] sm:w-[25vw]',
	/* 4 – bottom-left */
	'top-[20vh] left-[5vw] h-[18vh] w-[32vw] sm:top-[27.5vh] sm:left-[5vw] sm:h-[25vh] sm:w-[20vw]',
	/* 5 – bottom-right */
	'top-[20vh] -left-[18vw] h-[18vh] w-[38vw] sm:top-[27.5vh] sm:-left-[22.5vw] sm:h-[25vh] sm:w-[30vw]',
	/* 6 – small corner */
	'top-[16vh] left-[16vw] h-[14vh] w-[28vw] sm:top-[22.5vh] sm:left-[25vw] sm:h-[15vh] sm:w-[15vw]',
];

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[200vh] sm:h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];
					const posClass = imageStyles[index] ?? imageStyles[0];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className="absolute top-0 flex h-full w-full items-center justify-center"
						>
							<div className={`relative ${posClass}`}>
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover rounded-lg"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
