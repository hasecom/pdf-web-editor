'use client'

import { Archivo_Black, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../thema";

const archivoBlack = Archivo_Black({
	subsets: ['latin'],
	weight: ['400'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<ThemeProvider theme={theme}>
				<body className={`${archivoBlack.className}`}>
					<Header />
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
