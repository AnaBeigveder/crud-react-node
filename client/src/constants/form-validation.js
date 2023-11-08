const messages = {
	name: 'El nombre no puede contener dígitos',
	nameRequired: 'El nombre es obligatorio',
	passwordRequired: 'Password obligatorio',
	email: 'Debe ser un email válido',
	emailRequired: 'El email es obligatorio'
};

const patterns = {
	name: /^[A-Za-z]*$/,
	email:
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
};

export const FORM_VALIDATIONS = {
	name: {
		require: messages.nameRequired,
		pattern: patterns.name,
		message: messages.name
	},
	password: {
		require: messages.passwordRequired
	},
	email: {
		require: messages.emailRequired,
		pattern: patterns.email,
		message: messages.email
	}
};
