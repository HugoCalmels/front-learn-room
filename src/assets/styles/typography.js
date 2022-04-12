
import { createGlobalStyle } from "styled-components";

export const Typography = createGlobalStyle`

@font-face {
	font-family: 'Sk-Modernist';
	src:url('../SkModernist/Sk-Modernist-Regular.woff2') format('woff2'),
		url('../SkModernist/Sk-Modernist-Regular.woff') format('woff'),
		url('../SkModernist/Sk-Modernist-Regular.otf') format("opentype");
	font-weight:500;
	font-style: normal;
}
@font-face {
	font-family: 'Sk-Modernist';
	src:url('../SkModernist/Sk-Modernist-Bold.woff2') format('woff2'),
		url('../SkModernist/Sk-Modernist-Bold.woff') format('woff'),
		url('../SkModernist/Sk-Modernist-Bold.otf') format("opentype");
	font-weight:700;
	font-style: normal;
}
`;
