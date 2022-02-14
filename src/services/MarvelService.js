class MarvelService {
	//!! такой вид создания переменных дает сигнал другим программистов,что это нельзя менять
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	// ключ сервиса Марвел, !! личный !!
	_apiKey = 'apikey=27aab3ed755206bc6f75732c7b12b0be';
	getResource = async url => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	// метод для получения персонажей
	getAllCharacters = async () => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=270&${this._apiKey}`
		);
		return res.data.results.map(this._transformCharacter);
	};
	// метод для получения одного персонажа
	getOneCharacter = async id => {
		const res = await this.getResource(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = char => {
		return {
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		};
	};
}
export default MarvelService;
