
import bcrypt from 'bcryptjs'

const { genSalt, hash } = bcrypt

export async function registerUser(email, password) {
	// dynamic import
	const { user } = await import('../user/user.js')
	// generate salt
	const salt = await genSalt(10)
	// console.log('👋salt', salt)
	// hash with salt
	const hashedPassword = await hash(password, salt)
	// console.log('👋hashedPassword', hashedPassword)
	// store in database
	const result = await user.insertOne({
		email: {
			address: email,
			verified: false
		},
		password: hashedPassword,
	})
	// return user from database
	return result.insertedId
}
