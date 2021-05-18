
import bcrypt from 'bcryptjs'

const { compare } = bcrypt

export async function authorizeUser(email, password) {
	// import user collection
	const { user } = await import('../user/user.js')
	// look up user
	const userData = await user.findOne({
		'email.address': email
	})
	// get user pass
	const savedPassword = userData.password
	// compare password with database password
	const isAuthorized = await compare(password, savedPassword)
	console.log('👋isAuthorized', isAuthorized)
	// return boolean if password is correct
	return isAuthorized
}
