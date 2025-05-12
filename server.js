(async () => {
	const response = await fetch('app.wasm');
	const wasmModule = await WebAssembly.instantiateStreaming(response);
	const { instance } = wasmModule;

	console.log('Wasm loaded: ',instance.exports);
})();
