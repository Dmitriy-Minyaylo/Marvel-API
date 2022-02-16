import img from './error.gif';

const ErrorMessage = () => {
	//!! использование статической картинки из папки public
	// return <img src={process.env.PUBLIC_URL + '/error.gif'} />;
	//!! более популярный вариант
	return (
		<img
			style={{
				display: 'block',
				width: '250px',
				height: '250px',
				objectFit: 'contain',
				margin: '0 auto',
			}}
			src={img}
			alt='Error'
		/>
	);
};

export default ErrorMessage;
