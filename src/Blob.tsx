import * as blobs2 from "blobs/v2";
import { useSpring, animated } from "react-spring";
import { useEffect, useState, type SVGProps } from "react";

function getRandomPath() {
    return blobs2.svgPath({
        seed: Math.random(),
        extraPoints: 6,
        randomness: 4,
        size: 500,
    });
}

export default function Blob(props: SVGProps<SVGSVGElement>) {
    const [targetPath, setTargetPath] = useState(() => getRandomPath());
    const duration = 2_000;

    useEffect(() => {
        const timeout = setTimeout(() => setTargetPath(getRandomPath()), duration);
        return () => clearTimeout(timeout);
    }, [targetPath]);

    return (
        <svg {...props} viewBox="0 0 500 500" width="100%" className="text-pulse-accent transition duration-500 ease-in-out">
            <defs>
                <radialGradient id="blobGradient" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                    <stop offset="40%" stopColor="currentColor" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="1.0" />
                </radialGradient>
            </defs>
            <animated.path
                d={useSpring({
                    to: { path: targetPath },
                    from: { path: getRandomPath() },
                    config: { duration },
                }).path}
                fill="url(#blobGradient)"
            />
        </svg>
    );
}