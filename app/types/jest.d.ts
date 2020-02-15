import jest from 'app/types/jest'

declare global {
	namespace jest {
		interface Matchers<R, T> {
			toBeUUID (): R
		}
	}
}
