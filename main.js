/* main.js */

import * as Magick from 'https://knicknic.github.io/wasm-imagemagick/magickApi.js';
//import * as Magick from './magickApi.js';

const main = async () => {
	const arrayBuffer = await fetch(
		"./sample.jpg"
	).then(res => res.arrayBuffer());

	const commands = [
		["convert", "src.jpg", "-rotate", "-45"],
		["convert", "src.jpg", "-monochrome"]
	].map((x,i) => [...x, `output${i}.jpg`]);

	for (let command of commands) {
		const files = [
			{
				name: "src.jpg",
				content: new Uint8Array(arrayBuffer.slice())
			}
		];
		// ImageMagickで処理
		const processedFiles = await Magick.Call(files, command);
		// URLを発行してimgタグに貼る
		const url = URL.createObjectURL(processedFiles[0]["blob"]);
		const wrap = document.createElement("figure");
		const cap = document.createElement("figcaption");
		const pre = document.createElement("pre");
		pre.innerText = command.join(" ");
		const img = document.createElement("img");
		img.setAttribute("src", url);
		img.setAttribute("style", "width: 100px");
		// １つづつappendChildするのではなく、まとめてから#galleryに投下
		cap.append(pre);
		wrap.append(img);
		wrap.append(cap);
		document.getElementById("gallery").append(wrap);
	};
};

main();
