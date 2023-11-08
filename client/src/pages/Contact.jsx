import { useForm } from 'react-hook-form';
import { FORM_VALIDATIONS } from '../constants/form-validation';

const Contact = () => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();
	console.log(errors);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='username'>Name</label>
					<input
						type='text'
						{...register('username', {
							required: FORM_VALIDATIONS.name.require,
							pattern: {
								value: FORM_VALIDATIONS.name.pattern,
								message: FORM_VALIDATIONS.name.message
							}
						})}
					/>
				</div>
				<span>{errors?.username?.message}</span>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						{...register('password', {
							required: FORM_VALIDATIONS.password.require
						})}
					/>
				</div>
				<span>{errors?.password?.message}</span>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						{...register('email', {
							required: FORM_VALIDATIONS.email.require,
							pattern: {
								value: FORM_VALIDATIONS.email.pattern,
								message: FORM_VALIDATIONS.email.message
							}
						})}
					/>
				</div>
				<span>{errors?.email?.message}</span>
				<input type='submit' value='AÑADIR' />
			</form>
		</>
	);
};

const onSubmit = (data, event) => {
	fetchData(data);
	// console.log(data);
};

const fetchData = async data => {
	console.log(data);
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const dataResp = await response.json();
		console.log(dataResp);
	} catch (err) {
		console.log(err);
	}
};
export default Contact;

// onBlur={} cuando el campo pierde el foco
// <input type='range' />
// <input type='number' />
// <input type='date' />
// <input type='time' />
// <input type='password' />
// <input type='datetime-local' /> No funciona en IExplorer
// <label htmlFor='blanco'>Blanco</label>
// <input type='radio' name='color' id='blanco' />
// <label htmlFor='negro'>Negro</label>
// <input type='radio' name='color' id='negro' />
// <input type='checkbox' />
// <select name='country' id='country'>
//    <option value='ES'>España</option>
//    <option value='PT'>Portugal</option>
//    <option value='CH'>Suiza</option>
// </select>
// <input type='color' />
