import { useHttp } from '../hooks/http.hooks';

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();
	//!! такой вид создания переменных дает сигнал другим программистам,что это нельзя менять
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	// ключ сервиса Марвел, !! личный !!
	const _apiKey = 'apikey=27aab3ed755206bc6f75732c7b12b0be';
	const _baseOffset = 210;

	// метод для получения персонажей
	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};
	// метод для получения одного персонажа
	const getOneCharacter = async id => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const _transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};
	return { loading, error, clearError, getAllCharacters, getOneCharacter };
};
export default useMarvelService;
